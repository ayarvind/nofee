const brevo = require('@getbrevo/brevo');
let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = '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';

let sendSmtpEmail = new brevo.SendSmtpEmail();

sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = { "name": "Arvind", "email": "ayarvind9812@gmail.com" };
sendSmtpEmail.to = [
  { "email": "ayarvind9812@gmail.com", "name": "Arvind Yadav" }
];
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
  console.error(error);
});