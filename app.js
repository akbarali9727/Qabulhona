const express=require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const md5=require("md5");
const database=require(__dirname+"/database.js");
const shifokorlar=require(__dirname+"/shifokorlar.js");
const _=require("lodash");
database.getKasallar();

const vrachNames=["Zokirjon","Ma Ming","Akbarali","Ahrorjon","Dilmurodjon","Hojimurod"];
let kasallar=[];



const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




      // firstPage functions
app.get("/",function(req,res){
  res.sendFile(__dirname+"/firstPage.html");
});

app.post("/",function(req,res){
  let vrachNum=req.body.vrachButton;
  res.redirect("/shifokorlar/"+vrachNames[vrachNum]);
});



      // Qabulhona
app.get("/qabulhona",function(req,res){
  let korikSoni=0;
    let shifokorArray=shifokorlar.getShifokorlar();
    shifokorArray.forEach(shifokor=>{
      korikSoni+=shifokor.koriklarSoni;
    })
  res.render("qabulhona",{shifokorArray: shifokorArray,korikSoni: korikSoni});
});

app.post("/qabulhona",function(req,res){
  let ismFamiliyasi=req.body.ism+" "+req.body.familiya;
  let tugulganYili = req.body.tugulganYili;
  let telRaqami = req.body.telRaqami;
  let callCenter =req.body.callCenter;
  let viloyati = req.body.viloyati;
  let tumani = req.body.tumani;
  let qaytaKorik= req.body.qaytaKorik;
  let tolovTuri = req.body.paymentMethod;
  let naqd=false;
  if(tolovTuri==="naqd"){
    naqd=true;
  }
  let tolovSummasi =req.body.summa;
  let kelganSana = req.body.sanasi;
  let shifokori = req.body.shifokori;
  database.kasalQoshish(ismFamiliyasi,tugulganYili,telRaqami,callCenter,viloyati,tumani,qaytaKorik,naqd,tolovSummasi,kelganSana,shifokori);
  shifokorlar.shifokorKorigigaQoshish(shifokori);
  res.redirect("/bemorlar");
});


app.get("/success",function(req,res){
  res.sendFile(__dirname+"/success.html");
})

app.post("/success",function(req,res){
  res.redirect("/");
});





      // Bemorlar
app.get("/bemorlar",function(req,res){
  kasallar=database.getBugungiKasallar();
res.render("bemorlar",{kasallarr: kasallar});
})




app.get("/mahsulotlar",function(req,res){
  res.redirect("/bemorlar");
})











    //Vrachlar
    app.get("/shifokorlar/:topic",function(req,res){
      database.getKasallar();
      let topic =  _.lowerCase(req.params.topic);
      let n=0;
      let doctors=shifokorlar.getShifokorlar();
      doctors.forEach(shifokor=>{
        const shifokorIsmi=_.lowerCase(shifokor.ismSharifi); // /char/g belgisi Stringdagi hamma charlarni ozgartiradi.
        if(topic===shifokorIsmi){
          let kasalData=database.vrachKasallari(n);
          shifokorlar.shifokorKeldi(n);
          if(kasalData.length===0){
            res.render("kasalsizVrach");
          } else {
            res.render("vrachlar",{kasalData: kasalData, vrachNum:n});
          }
        }
        n++;
      })

    })


  app.post("/vrachlar",function(req,res){
  let id=req.body.malumotniSaqlash;
  let diagnoz=req.body.bemorIzohi;

  database.bemorKorildi(id,diagnoz);
  res.redirect("back")
  })




  app.listen(process.env.PORT || 3000,function(){
    console.log("Server loaded");
  })
