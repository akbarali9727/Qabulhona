const mongoose=require("mongoose");
const sqlite3=require("sqlite3").verbose();
mongoose.connect("mongodb+srv://admin-akbarali:Test123@atlascluster.7nja8qs.mongodb.net/kasallarDB",{ useNewUrlParser: true, useUnifiedTopology: true });

const db=new sqlite3.Database("kasallar.db",(err)=>{
  if(err){
    console.log("datbase error");
    throw err;
  } else {
    console.log("Db connected");
  }
});

const vrachNames=["Zokirjon","Ma Ming","Akbarali","Ahrorjon","Dilmurodjon","Hojimurod"];


const kasallarSchema=new mongoose.Schema({
  ismFamiliyasi: String,
  tugulganYili: Number,
  telRaqami: String,
  callCenter: String,
  viloyati: String,
  tumani: String,
  qaytaKorik: Boolean,
  naqd: Boolean,
  tolovSummasi: Number,
  kelganSana: Date,
  shifokori: String,
  korildi: Boolean,
  diagnozi: String
})

const Kasal=mongoose.model("Kasal",kasallarSchema);

function Kliyent(id,ismFamiliyasi,tugulganYili,telRaqami,callCenter,viloyati,tumani,qaytaKorik,naqd,tolovSummasi,kelganSana,shifokori,korildi,diagnozi){
  this.id=id;
  this.ismFamiliyasi=ismFamiliyasi;
  this.tugulganYili=tugulganYili;
  this.telRaqami=telRaqami;
  this.callCenter=callCenter;
  this.viloyati=viloyati;
  this.tumani=tumani;
  this.qaytaKorik=qaytaKorik;
  this.naqd=naqd;
  this.tolovSummasi=tolovSummasi;
  this.kelganSana=kelganSana;
  this.shifokori=shifokori;
  this.korildi=korildi;
  this.diagnozi=diagnozi;
}

  let kasallar=[];




exports.getBugungiKasallar = function(){
  readingFromDB();
  const bugungiKasallar=[];
  kasallar.forEach(kasal=>{
    let today=new Date();
    if(kasal.kelganSana===today.toLocaleDateString()){
      bugungiKasallar.push(kasal);
    }
  })
  return bugungiKasallar;
}

exports.vrachKasallari = function(vrachNum){
  let today=new Date();
  const vrachKasallari=[];
  kasallar.forEach(kasal=>{
    if(kasal.shifokori.toLowerCase()===vrachNames[vrachNum].toLowerCase() && kasal.kelganSana===today.toLocaleDateString() && kasal.korildi===false){
      vrachKasallari.push(kasal);
    }
  })
  return vrachKasallari;
}


    // Kasallarni databasedan yuklab olish
exports.getKasallar =function(){
  return readingFromDB();
}
//  function() {
// //
// //     var sql = "select * from kasallar"
// //         var params = [];
// //         db.all(sql, params, (err, rows) => {
// //             if (err) {
// //               res.status(400).json({"error":err.message});
// //               return;
// //             }
// //
// //             rows.forEach(row=>{
// //               let ismFamiliyasi=row.name;
// //               let tugulganYili=row.tugulganKuni;
// //               let telRaqami=row.phone;
// //               let callCenter=row.callCenter;
// //               let viloyati=row.viloyat;
// //               let tumani="yoq";
// //               let qaytaKorik=false;
// //               if(row.qaytaKorik===1){
// //                 qaytaKorik=true;
// //               }
// //               let naqd=true;
// //               let tolovSummasi=row.tolov;
// //               const [day, month, year]=row.kelganKuni.split(".");
// //               let kelganSana=new Date(year,month-1,day).toLocaleDateString();
// //               let shifokori=row.shifokor;
// //               const kliyent=new Kliyent(ismFamiliyasi,tugulganYili,telRaqami,callCenter,viloyati,tumani,qaytaKorik,naqd,tolovSummasi,kelganSana,shifokori);
// //               kasallar.push(kliyent);
// //
// //             })
// //             // res.json({
// //             //     "message":"success",
// //             //     "data":rows
// //             // })
// //           })
// // return kasallar;
//
//           // Kasallarni mongoose yordamida yuklash
//
// }


function readingFromDB(){
  Kasal.find(function(err,kasallarJami){
    const kasalIchki=[];
    if(err){
      console.log(err);
    } else {
      kasallarJami.forEach(row=>{
        let id=row.id;
        let ismFamiliyasi=row.ismFamiliyasi;
        let tugulganYili=row.tugulganYili;
        let telRaqami=row.telRaqami;
        let callCenter=row.callCenter;
        let viloyati=row.viloyati;
        let tumani=row.tumani;
        let qaytaKorik=row.qaytaKorik;
        let naqd=true;
        let tolovSummasi=row.tolovSummasi;
        let kelganSana=row.kelganSana.toLocaleDateString();
        let shifokori=row.shifokori;
        let korildi=row.korildi;
        let diagnozi=row.diagnozi;
        const kliyent=new Kliyent(id,ismFamiliyasi,tugulganYili,telRaqami,callCenter,viloyati,tumani,qaytaKorik,naqd,tolovSummasi,kelganSana,shifokori,korildi,diagnozi);
        kasalIchki.push(kliyent);
      })
      kasallar=kasalIchki;
    }
  })

  return kasallar;
}



    // Kasallarni databasega saqlash
exports.saveKasallar = function(){
kasallar.forEach(kasal=>{
  let kasalcha=new Kasal({
    ismFamiliyasi: kasal.ismFamiliyasi,
    tugulganYili: kasal.tugulganYili,
    telRaqami: kasal.telRaqami,
    callCenter: kasal.callCenter,
    viloyati: kasal.viloyati,
    tumani: kasal.tumani,
    qaytaKorik: kasal.qaytaKorik,
    naqd: kasal.naqd,
    tolovSummasi: kasal.tolovSummasi,
    kelganSana: kasal.kelganSana,
    shifokori: kasal.shifokori,
    korildi: kasal.korildi,
    diagnozi: kasal.diagnozi
  })
  kasalcha.save();
})
}


exports.kasalQoshish = function(ismFamiliyasi,tugulganYili,telRaqami,callCenter,viloyati,tumani,qaytaKorik,naqd,tolovSummasi,kelganSana,shifokori){
const kasal=new Kasal({
  ismFamiliyasi: ismFamiliyasi,
  tugulganYili: tugulganYili,
  telRaqami: telRaqami,
  callCenter: callCenter,
  viloyati: viloyati,
  tumani: tumani,
  qaytaKorik: qaytaKorik,
  naqd: naqd,
  tolovSummasi: tolovSummasi,
  kelganSana: kelganSana,
  shifokori: shifokori,
  korildi: false,
  diagnozi: ""
})
kasal.save();
readingFromDB();
console.log("Kasal qoshildi");
}


exports.bemorKorildi = function (id){
  Kasal.updateOne({_id: id},{korildi: true},function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Successfully updated");
    }
  })
}
