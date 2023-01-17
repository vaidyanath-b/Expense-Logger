var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var port = 3100;
var admin = require("firebase-admin");
var serviceAccount = require("./private/prvivateAccessKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();


const corsOptions = {
  origin: ['http://localhost:3100', 'http://localhost:3000'  ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
}
)

app.post('/login', async function (req, res) {
  
  console.log("request recieved");
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  console.log(email);
  const colref = db.collection('users');
  const docref = colref.doc(username);
  const doc = await docref.get();
  if(doc.exists){
    console.log("UserName already exists");
    return res.json({status: 400});
  }
  else{
    await db.runTransaction(async (t) => {
    docref.set({
      username: username,
      email: email,
      password: password
    });
    await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username
    });
  }).then(() => {
    return res.json({status: 200 , });
  }).catch((err) => {
    return res.json({status: 500});
  });
  }

})

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`)
}
)


