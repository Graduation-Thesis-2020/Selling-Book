
const { nextTick } = require('async');
const nodemailer = require('nodemailer');

generalRandomCode = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

verifyEmail = (email) => {
  // const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });

  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Thông tin đăng ký tài khoản tại The Book Store ✔",
    html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
      + "</br>"
      + "<p style='color:black' >Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>"
      + `<p style='color:black'>Địa chỉ email đã dùng để đăng ký tài khoản: ${email} </p>`
      + "<p style='color:black'>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ http://localhost:4200/setting để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>"
      + "<p style='color:black'>Truy cập vào cửa hàng để tiếp tục mua sắm với chúng tôi</p>"
      + "<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
      + `<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ${process.env.EMAIL}</p></p>`
      + "<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
      + "<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      return res.status(500).json(error);
    } else {
      //  console.log("Email sent: ", info.response);
      return res.status(200).json({ Email_sent: info.response });
    }
  })
}

verifyEmailAdmin = (email) => {
  // const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });

  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Thông tin đăng ký tài khoản tại The Book Store ✔",
    html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
      + "</br>"
      + "<p style='color:black' >Người dùng đăng ký tài khoản thành công.</p>"
      + `<p style='color:black'>Địa chỉ email đã dùng để đăng ký tài khoản: ${email} </p>`
      + "<p style='color:black'>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ http://localhost:4200/login/admin để đăng nhập tài khoản.</p>"
      // + "<p style='color:black'>Truy cập vào cửa hàng để tiếp tục mua sắm với chúng tôi</p>"
      //+ "<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
      + `<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ${process.env.EMAIL}</p></p>`
      + "<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
      + "<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      return res.status(500).json(error);
    } else {
      //  console.log("Email sent: ", info.response);
      return res.status(200).json({ Email_sent: info.response });
    }
  })
}

mailVefiryNotification = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });

  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Bạn đã đăng ký nhận thông báo tại The Book Store ✔",
    html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
      + "</br>"
      + "<p style='color:black' >Người dùng đăng ký nhận báo thành công.</p>"
      + `<p style='color:black'>Địa chỉ email đang dùng : ${email} </p>`
      + "<p style='color:black'>Chúng tôi sẽ gửi những thông tin cập nhật mới nhất vào hộp thư của bạn, nhớ theo dõi và ủng hộ nhé.</p>"
      + "<p style='color:black'>Truy cập vào cửa hàng để tiếp tục mua sắm với chúng tôi</p>"
      + "<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
      + `<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ${process.env.EMAIL}</p></p>`
      + "<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
      + "<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      return res.status(500).json(error);
    } else {
      //  console.log("Email sent: ", info.response);
      return res.status(200).json({ Email_sent: info.response });
    }
  })
}

forgetPassWord = (email, name, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });

  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Thiết lập lại mật khẩu của tài khoản khách hàng ✔",
    html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
      + "</br>"
      + `<p style='color:black' >Xin chào ${name}.</p>`
      + `<p style='color:black'>Địa chỉ email đang dùng : ${email} </p>`
      + "<p style='color:black'>Anh/chị đã yêu cầu đổi mật khẩu tại.</p>"
      + `<p style='color:black'> ${code} là mã xác minh tài khoản của bạn.</p>`
      //  + "<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
      + `<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ${process.env.EMAIL}</p></p>`
      + "<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
      + "<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // return res.status(500).json(error);
    } else {
      //  console.log("Email sent: ", info.response);
      return res.status(200).json({ Email_sent: info.response });
    }
  })
}

notificationCreateOrder = (email, name, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });

  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Xác nhận đơn hàng",
    html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
      + "</br>"
      + `<p style='color:black' >Xin chào ${name}.</p>`
      + `<p style='color:black'>Địa chỉ email đang dùng : ${email} </p>`
      + "<p style='color:black'>Anh/chị đã yêu cầu đổi mật khẩu tại.</p>"
      + `<p style='color:black'> ${code} là mã xác minh tài khoản của bạn.</p>`
      //  + "<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
      + `<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ${process.env.EMAIL}</p></p>`
      + "<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
      + "<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // return res.status(500).json(error);
    } else {
      //  console.log("Email sent: ", info.response);
      return res.status(200).json({ Email_sent: info.response });
    }
  })
}
module.exports = {
  verifyEmail,
  verifyEmailAdmin,
  mailVefiryNotification,
  forgetPassWord,
  generalRandomCode,
  notificationCreateOrder
}