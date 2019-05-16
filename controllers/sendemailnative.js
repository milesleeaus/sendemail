/** This is the native implementation;
 *  No offical/3rd-party libraries of SendGrid and MailGun at all.
 * 
 */
const https = require("https");

var opt = {
    host: 'api.sendgrid.com',
    method: 'POST',
    path: '/v3/mail/send',
    headers: {
        "Content-Type": 'application/json',
        "Content-Length": 0,
        "Authorization": 'Bearer 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'
    }
}

var sendemailPostNativeSG = function (ctx) {
    var data = {
        personalizations: [{
            to: [],
            cc: [],
            bcc: [],
            subject: ''
        }],
        from: {},
        content: [{}]
    };

    let to = ctx.request.body.to,
        from = ctx.request.body.from,
        cc = ctx.request.body.cc || ['none@gmail.com'],
        bcc = ctx.request.body.bcc || ['none@gmail.com'],
        subject = ctx.request.body.subject || 'default subject ~~',
        text = ctx.request.body.text || 'default test ~~';

    to.forEach(function (toe) {
        data.personalizations[0].to.push({ email: toe });
    });

    cc.forEach(function (cce) {
        data.personalizations[0].cc.push({ email: cce });
    });

    bcc.forEach(function (bcce) {
        data.personalizations[0].bcc.push({ email: bcce });
    });

    data.personalizations[0].subject = subject;
    data.from = { email: from };
    data.content[0].type = 'text/plain';
    data.content[0].value = text;

    var data = JSON.stringify(data);
    opt.headers["Content-Length"] = data.length;

    var req = https.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            console.log("data to be post: " + data);
        }).on('end', function () {
            console.log("post ended");
        });
    }).on('error', function (e) {
        console.log("error: " + e.message);
    })

    req.write(data);
    req.end();
    ctx.rest({ result: "successful" });

};

var sendemailPostNative = async (ctx, next) => {
    try {
        /* native implementation of SendGrid, no official or 3rd party libraries at all */
        await sendemailPostNativeSG(ctx);
    } catch (err) {
        /* Due to my other arrangements, I can't spend that much time on this,
        /* So the native version of MailGun is ignored, which I think its implementation is 
        * similar to that of SendGrid Native version
        */ 

        const borrowMG = require("./sendemail").borrowMG;
        await borrowMG(ctx);
    }
}

module.exports = {
    'POST /api/sendemailnative': sendemailPostNative
};