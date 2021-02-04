const express = require('express')
const app = express()
// const http = require('http').createServer(app);
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

  const containerLogsSchema = new mongoose.Schema({
    _id:String,
    data:[{
      _id:Number,
      temp: Number,
      lat: Number,
      long: Number}]
})

  const User = mongoose.model('User',userSchema)

  const Container = mongoose.model('Container',containerSchema)

  const ContainerLogs = mongoose.model('ContainerLogs',containerLogsSchema)
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

// const containerLogsA1 = new ContainerLogs({
//   _id:"conA1",
//   data:[]
// })
// const containerLogsA2 = new ContainerLogs({
//   _id:"conA2",
//   data:[]
// })
// const containerLogsA3 = new ContainerLogs({
//   _id:"conA3",
//   data:[]
// })
// const containerLogsA4 = new ContainerLogs({
//   _id:"conA4",
//   data:[]
// })
// const containerLogsA5 = new ContainerLogs({
//   _id:"conA5",
//   data:[]
// })
// const containerLogsB1 = new ContainerLogs({
//   _id:"conB1",
//   data:[]
// })
// const containerLogsB2 = new ContainerLogs({
//   _id:"conB2",
//   data:[]
// })

// containerLogsA1.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsA2.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsA3.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsA4.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsA5.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsB1.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })
// containerLogsB2.save((err,result)=>{
//   if(err){
//     console.log("err",err)
//   }
//   console.log(JSON.stringify(result))

// })

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
  const getContainers = new Promise(async (resolve,reject)=>{
    let conObj = []
    for(let container of allArr.containers){
      await Container.find({_id:container._id}).then((con)=>{
        conObj.push(con[0])
      }).catch((err)=>{
        return reject(err)
      })
      
    }
    resolve(conObj)
  })
  getContainers.then((conObj)=>{
    res.status(200).send({uid:req.body.uid,containers:conObj})
  }).catch((err)=>{
    res.status(500).send("error",err)
    console.log("err",err)
  })

//   const loop = async _=>{
//   for(let i=0;i<allArr.containers.length;i++){
//       const container = await Container.find({_id:allArr.containers[i]._id},(err,result)=>{
//         if(err){
//           console.log(err)
//         }
//         console.log(result)
//       })
//       console.log("container")
//   }
// }
// loop()
})


app.get('/containerdata',(req,res)=>{
  
  ContainerLogs.updateOne({_id:req.query.cid},{$push:{data:{_id:new Date().getTime(),temp:(req.query.temp || 0 ),lat:(req.query.lat || 0),long:(req.query.long || 0)}}},(err,result)=>{
    if(err){
        res.status(501).send(err)
        return
  
    }
    console.log("added logs")
  })
  Container.updateOne({_id:req.query.cid},{$set:{temp:(req.query.temp || 0 ),lat:(req.query.lat || 0),long:(req.query.long || 0),timeStamp:new Date().getTime()}},(err,result)=>{
    if(err){
      res.status(500).send(err)
      return

    }
    res.status(200).send(result)
  })
  

})

app.get('/getlogs',(req,res)=>{
  ContainerLogs.find({_id:req.query.cid},(err,result)=>{
    if(err){
      res.status(400).send("err",err)
    }
    res.status(200).send(result[0])
  })
})

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})