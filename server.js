const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
const port = 3000
var nodemailer = require('nodemailer');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

/*transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/

router.get('/', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname })
})

router.get('/public/favicon-32x32.png', (req, res) => {
  res.sendFile('public/favicon-32x32.png', {root: __dirname })
})

router.get('/public/favicon-16x16.png', (req, res) => {
  res.sendFile('public/favicon-16x16.png', {root: __dirname })
})

router.post('/login',(req, res) => {
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});

app.use("/", router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});