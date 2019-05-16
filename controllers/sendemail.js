/** This is the implementation using offical libraries of SendGrid and MailGun.
 * 
 *  The native implementation without offical/3rd-party libraries can be found in
 *  sendemailnative.js
 */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: '0478686ee1d29fbdc3fc3017c966d1ff-4a62b8e8-0a2c9f08', domain: 'miles.sfinder.com.au' });

var testAPI = async (ctx, next) => {
    console.log('test successed');
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Server Runs Well</h1>';
};

var arrToString = function (arr) {
    if (!(arr instanceof Array)) return arr;
    var temp = '';
    var index = arr.length - 1;

    arr.forEach(function (toe) {
        temp += toe;
        if (index !== 0) temp += ',';
        index -= 1;
    });
    console.log(temp);
    return temp;
}

var sendemailPostMG = function (ctx) { //MailGun
    let to = ctx.request.body.to,
        from = ctx.request.body.from,
        cc = ctx.request.body.cc || 'gsa.mileslee@gmail.com',
        bcc = ctx.request.body.bcc || 'gsa.mileslee@gmail.com',
        subject = ctx.request.body.subject || 'default subject ~~',
        text = ctx.request.body.text || 'default test ~~';

    var msg = {
        to: arrToString(to),
        from: from,
        cc: arrToString(cc),
        subject: subject,
        text: text
    };

    console.log(msg);
    mg.messages().send(msg, function (error, body) {
        console.log(body);
    });
    ctx.rest({ result: 'successful' });
};

var sendemailPostSG = function (ctx) { //sendGrid
    let to = ctx.request.body.to,
        from = ctx.request.body.from,
        cc = ctx.request.body.cc || 'none@gmail.com',
        bcc = ctx.request.body.bcc || 'none@gmail.com',
        subject = ctx.request.body.subject || 'default subject ~~',
        text = ctx.request.body.text || 'default test ~~';

    const msg = {
        to: to,
        from: from,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: text
    };

    sgMail.send(msg);
    console.log("successful");
    ctx.rest({ result: 'successful' });

};

var sendemailPost = async (ctx, next) => {
    try {
        await sendemailPostSG(ctx);
    } catch (err) {
        await sendemailPostMG(ctx);
    }
}

module.exports = {
    'GET /api/test': testAPI,

    'POST /api/sendemail': sendemailPost,

    borrowMG: sendemailPostMG
};