const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000



app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://deepanshu:W1UQvFfEtSNOt8xCEzQuleV5uW2mQyeBQ9MAnscRDA18MUBONFxI8yymhrlftQYQ2lW8YKY7BK7gWcL8YH4EdA==@deepanshu.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@deepanshu@&retrywrites=false', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));;

const db = mongoose.connection;
console.log(db)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
  
  const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    containers : [{
      _id:String,
      temp: String,
      lat: String,
      long: String,
      timeStamp: Number
    }],

  })

//   const containerSchema = new mongoose.Schema({
//     _id:String,
//     data:[{
//       temp: String,
//       lat: String,
//       long: String,
//       timeStamp: Number
//     }]
    
//   })

  const User = mongoose.model('User',userSchema)

//   const Container = mongoose.model('Container',containerSchema)

//   const user1 = new User({
//     username: "user@123",
//     password: "user@123",
//     containers: [{_id:"conA1",temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},
//     {_id:"conA2",temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134},
//     {_id:"conA3",temp:"16.3",lat:"37.5",long:"86.3",timeStamp:2342345324234},
//     {_id:"conA4",temp:"17.3",lat:"38.5",long:"88.3",timeStamp:2342345324234},
//     {_id:"conA5",temp:"12.3",lat:"33.5",long:"8793",timeStamp:2342345324234}
//   ]
//   })

//   const user2 = new User({
//     username: "user@456",
//     password: "user@456",
//     containers: [{_id:"conB1",temp:"17.3",lat:"33.5",long:"80.3",timeStamp:2342344565324234},{_id:"conB2",temp:"41.3",lat:"67.5",long:"19.3",timeStamp:234246534345134}]
//   })
// const containerA1 = new Container({
//   _id:"conA1",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerA2 = new Container({
//   _id:"conA2",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerA3 = new Container({
//   _id:"conA3",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerA4 = new Container({
//   _id:"conA4",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerA5 = new Container({
//   _id:"conA5",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerB1 = new Container({
//   _id:"conB1",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// const containerB2 = new Container({
//   _id:"conB2",
//   data:[{temp:"12.3",lat:"34.5",long:"87.3",timeStamp:2342345324234},{temp:"45.3",lat:"67.5",long:"17.3",timeStamp:234234345134}],
// })

// containerA1.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });

// containerA2.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });
// containerA3.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });
// containerA4.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });
// containerA5.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });

// containerB1.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });
// containerB2.save((err, saveFamily) => {
//   if(err){
//     console.log("error" + err)
//   }
//   console.log(JSON.stringify(saveFamily))
// });

//   user1.save((err, saveFamily) => {
//       if(err){
//         console.log("error" + err)
//       }
//       console.log(JSON.stringify(saveFamily))
//     });

//     user2.save((err, saveFamily) => {
//       if(err){
//         console.log("error" + err)
//       }
//       console.log(JSON.stringify(saveFamily))
//     });

  
app.post('/authuser',(req,res)=>{
  User.find({username:req.body.username,password:req.body.password},(err,result)=>{
    if(err || result.length==0){
      res.status(404).send()
      return
    }
    console.log(result)
    res.status(200).send(result)
    console.log("user authenticated")
  })    
})
  

});


app.get('/getdata',(req,res)=>{
  
  res.send({data:"this is data with cors"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})