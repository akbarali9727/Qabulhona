const mongoose = require("mongoose");
const cron=require('node-cron');

mongoose.connect("mongodb+srv://admin-akbarali:Test123@atlascluster.7nja8qs.mongodb.net/kasallarDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const doctorSchema = new mongoose.Schema({
  _id: Number,
  ismi: String,
  ishgaKelgan: Boolean,
  koriklarSoni: Number,
  honaRaqami: Number
});


const Doctor=mongoose.model("Doctor",doctorSchema);
  let today = new Date().toISOString().split('T')[0];


cron.schedule('0 0 * * *',()=>{
  Doctor.updateMany({},{koriklarSoni: 0,ishgaKelgan: false },function(err,callback){
    if(!err){
    }
  });
});



exports.getShifokorlar = function(){
return Doctor;
};

exports.shifokorKorigigaQoshish = function(shifokorName){
Doctor.findOneAndUpdate({ismi: shifokorName},{$inc:{koriklarSoni: +1}},function(err,callback){
});
}

exports.shifokorKetdi = function(shifokorName){
Doctor.findOneAndUpdate({ismi:shifokorName},{ishgaKelgan: false},function(err,callback){
if(!err){
}
});
}


exports.shifokorKeldi = function(shifokorNum){
Doctor.findOneAndUpdate({_id:shifokorNum},{ishgaKelgan: true},function(err,callback){
if(!err){
}
});
}
