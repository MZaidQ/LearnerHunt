const sendmail = async (req, res) => {
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'developmentlearnerhunt@gmail.com',
        pass: 'qysrgppuejycdids',
      },
      secure: true,
    })
    const mailData = {
      from: 'developmentlearnerhunt@gmail.com',
      to: `${req.body.to}`,
      subject: `${req.body.subject}`,
      text: `${req.body.message}`,
      html: `${req.body.html}`
    }
  
    try{
      await transporter.sendMail(mailData)
    }catch(error){
      return res.status(error.statusCode || 500).json({ command:0,msg: error.message });
    }
    
    return res.status(200).json({ command: 1,msg:'Mail submitted succesfully' });
  }
  
  export default sendmail;