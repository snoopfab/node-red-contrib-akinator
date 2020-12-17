# Node-RED node for Akinator

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

Run the following command in the root directory of your Node-RED installation
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
