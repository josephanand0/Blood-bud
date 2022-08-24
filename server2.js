var cors= require('cors');
var nodemailer = require('nodemailer');
var http =require('http');
var jwt=require("jsonwebtoken");
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err)
    {
        console.log("Error in connection"+err)
    }
    else{
        console.log("Connection established Successfully")
        db = client.db('bloodbud')
    }
});
app.get('/emps',(req,res)=>{
    db.collection('donorslist').find().toArray((err,items)=>
    {
        console.log(items);
        res.write(JSON.stringify(items))
        res.end()
    });
});
app.get('/empsp',(req,res)=>{
    db.collection('patientdetails').find().toArray((err,items)=>
    {
        console.log(items)
        res.write(JSON.stringify(items))
        res.end()
    });
});
app.post('/addemp',(req,res)=>{
    // console.log(req.body)
    db.collection('donorslist').insertOne(req.body);
    res.end('inserted');
});
app.post('/addempp',(req,res)=>{
    // console.log(req.body)
    db.collection('patientdetails').insertOne(req.body);
    res.end('inserted');
});
app.post('/sendmail',(req,res)=>{
    console.log("Send Mail end point")
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'raktabij123@gmail.com',
          pass: 'daokvsralxexjpes'
        }
      });
      
      var mailOptions = {
        from: 'bloodbud896@gmail.com',
        to: req.body,
        subject: 'Welcome to RAKTABīJ',
        text: `HI!
        Welcome to RAKTABīJ an online web application that will save many lives.
        WE congratulate you for taking part in a nobalsa deed.`,
        html:`<a href='Applied.html'><img src='buttons_PNG161.png' width='60' height='60'></img></a>`
      };
      
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
})
app.put('/updateemp/:id',verifyToken,(req,res)=>{
    db.collection('donorslist').updateOne({_id:parseInt(req.params.id)},{$set:{name:req.body.name,age:req.body.age}});
    res.write("Updated");
});
app.delete('/deleteemp/:id',(req,res)=>{

    db.collection('donorslist').remove({_id:parseInt(req.params.id)});
})
app.listen(4000,()=>{
   console.log("Server started....");
});
app.post("/login",(req,res)=>
{
    uname=req.body.username;
    pwd=req.body.password;
    db.collection('donorslist').findOne({username:uname,password:pwd}).then((result)=>
    {
        if(result)
        {
            const token=jwt.sign({username:uname,password:pwd},"cvrcollege")
            res.json({
                success:true,
                message:"The authentication is successful",
                token:token
            })
        }
        else{
            res.json({
            success:false,
            message:"Authenticaton failed"
        })
       }
    })
})
function verifyToken(req,res,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        token=token.split(' ')[1]
        console.log(token);
        jwt.verify(token,"cvrcollege",(err,decoded)=>
        {
            if(err)
            {
                return res.json({
                    success:false,
                    message:"Token is not valid"
                });
            }
            else{
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"A token is required for authentication"
        })
    }
}
