'use strict';

/*** 
 * Start of chanllenging
 * Core Logic is in Controllers Folder ->
 * where there are native implementation (sendemailnative.js) and non-native implementation (sendemail.js), respectively
***/

/**
 *  You can use the the format like this to test the abstraction (native and non-native): 
 *  curl --request POST --url http://127.0.0.1:3332/api/sendemail --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","mileslee1987@gmal.com"], "subject":"hello", "text":"a test text"}'
 *  curl --request POST --url http://127.0.0.1:3332/api/sendemailnative --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","mileslee1987@gmal.com"], "subject":"hello", "text":"a test text"}'
 */

const Koa = require('koa');
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
    console.log('reserve some operations here!');
}

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const rest = require('./rest');
app.use(rest.restify());

const controller = require('./controller');
app.use(controller());

app.listen(3332);
console.log('listening on 3332....');