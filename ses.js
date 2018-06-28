

const setup = require('./setup');

var SES = require('aws-sdk/clients/ses');
var ses = new SES({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  apiVersion: '2010-12-01',
  region: "us-west-2",
});

function send_mail (form_data) {
  console.log(form_data.form_data.first_name1)
  var params = {
    Destination: {
      // BccAddresses: [
      //   'STRING_VALUE',
      //   /* more items */
      // ],
      // CcAddresses: [
      //   'STRING_VALUE',
      //   /* more items */
      // ],
      ToAddresses: [
        'team@kappainsure.com',
        // 'hector@kappainsure.com'
      ]
    },
    Message: {
      Body: {
        Html: {
          Data: setup.nunjucks.render('email.html', {form_data}),
          Charset: 'utf-8'
        },
        Text: {
          Data: setup.nunjucks.render('email.txt', {form_data}),
          Charset: 'utf-8'
        }
      },
      Subject: {
    Data: `${form_data.form_data.subject} ${form_data.form_data.first_name1}`,
        Charset: 'utf-8'
      }
    },
    Source: 'no-reply@kappainsure.com',
    // ConfigurationSetName: 'STRING_VALUE',
    // ReplyToAddresses: [
    //   'STRING_VALUE',
    //   /* more items */
    // ],
    // ReturnPath: 'STRING_VALUE',
    // ReturnPathArn: 'STRING_VALUE',
    // SourceArn: 'STRING_VALUE',
    // Tags: [
    //   {
    //     Name: 'STRING_VALUE',
    //     Value: 'STRING_VALUE'
    //   },
    //   /* more items */
    // ]
  };
  ses.sendEmail(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

exports.send_mail = send_mail;
