const nodemailer = require('nodemailer');
const email = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6062e38b035d16",
    pass: "eed56a9b579893"
  },
}
const send = async (option) => {
  nodemailer.createTransport(email).sendMail(option, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info);
      return info.response;
    }
  });
}
let email_data = {
  from: 'devduhanmo@gmail.com',
  to: 'devduhanmo@gmail.com',
  subject: '테스트 메일 입니다.',
  text: 'nodejs 한시간만에 끝내보자.'
}

send(email_data);