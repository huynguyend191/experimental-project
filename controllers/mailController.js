const mailer = require("nodemailer");

const username = "carbc";
const password = "thangbn";

exports.sendMail = (req, res, next) => {
    const smtpTransport = mailer.createTransport({
      host: 'uetmail.vnu.edu.vn',
      port: 25,
      auth: {
        user: username,
        pass: password
      },
      secure: false,
      tls: {rejectUnauthorized: false}
    });
  
    const mail = {
        from: "Quan ly dao tao <carbc@vnu.edu.vn>",
        to: "icy12389@gmail.com",
        subject: "Thông báo",
        text: "Node.js New world for me",
        html: "<b>Node.js New world for me</b>"
    }
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.json({
              message: 'Success'
            });
        }
    
        smtpTransport.close();
    });
}