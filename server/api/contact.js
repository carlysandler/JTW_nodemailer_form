
const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/contact', (req, res)=>{
  let data = req.body;

  // if the fields are empty we want to appear a message
  if(data.name.length===0 || data.email.length===0 || data.message.length===0){

  return res.json({msg:"Please fill all the fields"})

  }

  //   we create a transporter
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,

    // authenticate
    auth:{
        user:'carly.sandler@gmail.com',
        pass: 'Gracehopper1108$'
    }
})

  // deifne mailoptions
  let mailOptions = {
    from:data.email,
    to:'carly.sandler@gmail.com',
    subject:`Message from ${data.name}`,
    html:`

    <h3>Informations</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>

    </ul>

    <h3>Message</h3>
    <p>${data.message}</p>

    `
  }

  // send message with sendmail

  smtpTransport.sendMail(mailOptions, (err)=>{

    try {

      if(err) return res.status(400).json({msg:'Please fill all the fields'})

      res.status(200).json({msg:'Message was sent succesfullly'})


    } catch (err) {
        if(err) return res.status(500).json({msg:'There is server error'})
    }

    })



  })




  module.exports=router;
