# Node-RED node for Akinator
[![Platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
![License](https://img.shields.io/github/license/snoopfab/node-red-contrib-akinator.svg)
[![Downloads](https://img.shields.io/npm/dm/node-red-contrib-akinator.svg)](https://www.npmjs.com/package/node-red-contrib-akinator)
[![NPM](https://img.shields.io/npm/v/node-red-contrib-akinator?logo=npm)](https://www.npmjs.org/package/node-red-contrib-akinator)
[![Known Vulnerabilities](https://snyk.io/test/npm/node-red-contrib-akinator/badge.svg)](https://snyk.io/test/npm/node-red-contrib-akinator)

This node for Node-RED is a wrapper for [aki-api](https://github.com/jgoralcz/aki-api).

It can be used to play the classical 20Q game Akinator which is a computer game and mobile app by French company Elokence.
During gameplay, it attempts to determine what fictional or real-life character, object, or animal the player is thinking of by asking a series of questions

## Features

The package contains only one node with one input and one output.

### Node Input :
one payload with an answer integer parameter that can take the following values:
- null for starting/restarting the game
- 0 : for answering 'yes' to the question
- 1 : for answering 'no' to the question
- 2 : for answering 'i don't know' to the question
- 3 : for answering 'probably' to the question
- 4 : for answering 'probably not' to the question

```javascript
{
   "payload": {
       "answer": integer,
       "region": string  //  [This one is optionnal and can be used to override the region selected in the node settings]
   }
}
```
### Node Output:
the output message will contain the following parameters:
- question : the question that akinator asks you to guess the character
- answers: Can be either
    - the set of possible answers internationalized as an array of string
    - the set of guesses as an array of objects
- progress : the progression in percent of the game.
- win : boolean flag indicating that the game ended and the results are given in the answers array
```javascript
{
    "question":"Is your character real ?",
    "answers":["Yes","No","I don't know","Probably","Probably not"],
    "progress":0,
    "win":false
}
```

## How to install

[![NPM](https://nodei.co/npm/node-red-contrib-akinator.png?downloads=true)](https://nodei.co/npm/node-red-contrib-akinator/)

You can install the nodes using node-red's "Manage palette" in the side bar.

Or run the following command in the root directory of your Node-RED installation
```
npm install node-red-contrib-akinator
```
or
```
yarn add node-red-contrib-akinator
```

## Configuration
The only configurable option is the region of the game
the supported regions are those supported by the aki-api

```javascript
[
  'en',
  'en_objects',
  'en_animals',
  'ar',
  'cn',
  'de',
  'de_animals',
  'es',
  'es_animals',
  'fr',
  'fr_objects',
  'fr_animals',
  'il',
  'it',
  'it_animals',
  'jp',
  'jp_animals',
  'kr',
  'nl',
  'pl',
  'pt',
  'ru',
  'tr',
  'id'
]
```

Note the two region variants :
- "_objects" to make akinator guess objects instead of characters
- "_animals" to make akinator guess animals instead of characters

## Example flow

See this node in action in an example flow : [Basic usage of node-red-contrib-akinator](https://flows.nodered.org/flow/96ced658e7b1ab2cb3f5dd7a143cf127)

```javascript
[{"id":"9f850821.bfd5d8","type":"akinator","z":"c21b1bba.93c518","name":"","region":"en_objects","x":400,"y":300,"wires":[["45750051.4fba4"]]},{"id":"e200bae4.bb9bb8","type":"inject","z":"c21b1bba.93c518","name":"YES","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"answer\":0}","payloadType":"json","x":150,"y":240,"wires":[["9f850821.bfd5d8"]]},{"id":"998a77c8.866d68","type":"inject","z":"c21b1bba.93c518","name":"NO","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"answer\":1}","payloadType":"json","x":150,"y":280,"wires":[["9f850821.bfd5d8"]]},{"id":"76e7381b.64aa68","type":"inject","z":"c21b1bba.93c518","name":"DON'T KNOW","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"answer\":2}","payloadType":"json","x":170,"y":320,"wires":[["9f850821.bfd5d8"]]},{"id":"ff6ef220.0825c","type":"inject","z":"c21b1bba.93c518","name":"PROBABLY","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"answer\":3}","payloadType":"json","x":170,"y":360,"wires":[["9f850821.bfd5d8"]]},{"id":"b5202279.9e395","type":"inject","z":"c21b1bba.93c518","name":"PROBABLY NOT","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"answer\":4}","payloadType":"json","x":180,"y":400,"wires":[["9f850821.bfd5d8"]]},{"id":"d81f8324.cacd6","type":"inject","z":"c21b1bba.93c518","name":"Start","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{}","payloadType":"json","x":150,"y":200,"wires":[["9f850821.bfd5d8"]]},{"id":"45750051.4fba4","type":"debug","z":"c21b1bba.93c518","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":570,"y":300,"wires":[]}]
```
