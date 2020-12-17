module.exports = function (RED) {
    const { Aki } = require('aki-api');

    function AkinatorNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        node.config = RED.nodes.getNode(config);
        node.region = config.region;
        const region = node.region;

        node.on('input', function (msg) {
            let promise = null;
            if (!Number.isInteger(msg.payload.answer)) {
                const aki = new Aki(msg.payload.region ? msg.payload.region : region);
                node.aki = aki;
                promise = node.aki.start();
            }
            let akistep = node.aki.step(msg.payload.answer);
            if (promise) {
                promise = promise.then(akistep);
            } else {
                promise = akistep;
            }
            promise.then(() => {
                if (node.aki.progress >= 70 || node.aki.currentStep >= 78) {
                    node.aki.win().then(() => {
                        msg.payload.answers = node.aki.answers;
                        msg.payload.progress = node.aki.progress;
                        msg.payload.win = true;
                        node.send(msg);
                    }).catch(err => {
                        msg.err = err;
                        node.send(msg);
                    })
                } else {
                    msg.payload.question = node.aki.question;
                    msg.payload.answers = node.aki.answers;
                    msg.payload.progress = node.aki.progress;
                    msg.payload.win = false;
                    node.send(msg);
                }
            }).catch(err => {
                msg.err = err;
                node.send(msg);
            })
        });
    }
    RED.nodes.registerType("akinator", AkinatorNode);
};
