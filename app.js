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
    }],

  })

  const containerSchema = new mongoose.Schema({
      _id:String,
      temp: String,
      lat: String,
      long: String,
      timeStamp: Number
    
  })

  const User = mongoose.model('User',userSchema)

  const Container = mongoose.model('Container',containerSchema)

//   const user1 = new User({
//     username: "user@123",
//     password: "user@123",
//     containers: [{_id:"conA1"},
//     {_id:"conA2"},
//     {_id:"conA3"},
//     {_id:"conA4"},
//     {_id:"conA5"}
//   ]
//   })

//   const user2 = new User({
//     username: "user@456",
//     password: "user@456",
//     containers: [{_id:"conB1"},{_id:"conB2"},{_id:"conA1"}]
//   })
// const containerA1 = new Container({
//   _id:"conA1",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerA2 = new Container({
//   _id:"conA2",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerA3 = new Container({
//   _id:"conA3",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerA4 = new Container({
//   _id:"conA4",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerA5 = new Container({
//   _id:"conA5",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerB1 = new Container({
//   _id:"conB1",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
// })
// const containerB2 = new Container({
//   _id:"conB2",
//   temp:"12.3",
//   lat:"34.5",
//   long:"87.3",
//   timeStamp:2342345324234
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
    if(err || result.length !==1){
      res.status(404).send('authentication failed!')
      return
    }
    console.log(result[0]._id)
    res.status(200).send({uid:result[0]._id})
    console.log("user authenticated")
  })    
})

app.post('/getcontainers',async (req,res)=>{
  const allArr = await User.findById(req.body.uid) 
  let conObj = []
  for await (let container of allArr.containers){
    // async ()=>{
      await Container.find({_id:container._id},(err,result)=>{
        if(err){
          console.log(err)
        }
        console.log(result)
        conObj.push(result[0])
      })
    // }
    // console.log(container)
  }
  // await Container.find({_id:allArr.containers._id},(err,result)=>{
  //   console.log(result)
  // })

  res.status(200).send({uid:req.body.uid,containers:conObj})
  console.log("hehe")
})

app.patch('/containerdata',(req,res)=>{
  Container.updateOne({_id:req.query.cid},{$set:{temp:req.query.temp,lat:req.query.lat,long:req.query.long}},(err,result)=>{
    if(err){
      res.status(500).send(err)
      return

    }
    res.status(200).send(result)
  })
  

})

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})