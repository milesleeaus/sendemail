#Local Deployment Steps

# Installation
1. Install Nodejs and NPM first
2. Then install with cmd -> npm install

# Use
1. Run by cmd -> node app.js
2. Then the app is listening on port 3332


# Endpoints
The endpoints are:
official libraries implementation: 127.0.0.1:3332/api/sendemail
native (no libraries) implementation: 127.0.0.1:3332/api/sendemailnative

# command to test
You can use the following similar format to post request:

curl --request POST --url http://127.0.0.1:3332/api/sendemail --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","ozscamping@gmail.com"], "subject": "hello!", "text": "good morning"}'

curl --request POST --url http://127.0.0.1:3332/api/sendemailnative --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","ozscamping@gmail.com"], "subject": "hello!", "text": "good morning"}'

# Test on Remote Server
The remote deployed AWS EC2 ip is 3.104.245.93, so you can use the commands:

curl --request POST --url http://3.104.245.93:3332/api/sendemail --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","ozscamping@gmail.com"], "subject": "hello!", "text": "good morning"}'

curl --request POST --url http://3.104.245.93:3332/api/sendemailnative --header 'Content-Type: application/json' --data '{"to": ["gsa.mileslee@gmail.com","milesleejob@gmail.com"], "from": "miles@sfinder.com.au", "cc": ["ozsmartfinder@gmail.com","ozscamping@gmail.com"], "subject": "hello!", "text": "good morning"}'

