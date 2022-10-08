const app = require("express").Router();
const User = require(__dirname + "/models/user.model.js");
const passport = require("passport");
const shifokorlar = require(__dirname + "/shifokorlar.js");
const Kasal = require(__dirname + "/models/kasal.model.js");
const _ = require("lodash");

const vrachNames = ["Zokirjon", "Ma Ming", "Akbarali", "Ahrorjon", "Dilmurodjon", "Hojimurod"];

app.use((req, res, next) => {
  next()
})

// homepage va login pagelar
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/firstPage.html");
}); //homepageni ochadi
app.post("/", function(req, res) {
  const name = "/login/" + req.body.vrachButton;
  res.redirect(name);
}); //homepagedagi vrachlardan biri tanlanganda vrach uchun login pageka junatadi

app.get("/login/:topic", function(req, res) {
  const name = req.params.topic;
  if (req.isAuthenticated()) {
    res.redirect("/shifokorlar/" + name);
  } else {
    res.render("login", {
      email: name.replace(/\s/g, '') + "@gmail.com",
      img: name.replace(' ', '') + ".png",
      siteName: "shifokorlar/" + name
    });
  }
}); //agar user auth bolmasa login page ochadi, auth bolsa shifokorlar pagega junatadi

app.post("/login", passport.authenticate("local", {
  failureRedirect: "back",
  failureMessage: true
}), function(req, res) {
  res.redirect(req.body.siteName);
}); // login pagedagi kirish tugmasi bosilganda userni auth qiladi

app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      })
    }
  })
}); //hozirda ishlamaydi, yangi ishchini registr qilish uchun login.ejsda form post yonalishini shunga ozgartirish lozim




// Qabulhona
app.get("/qabulhona", function(req, res) {
  var mail = "notogri"
  if (req.user !== undefined) {
    mail = req.user.username;
  }
  if (req.isAuthenticated() && mail === "qabulhona@gmail.com") {
    let korikSoni = 0;
    const shifokor = shifokorlar.getShifokorlar();
    shifokor.find(function(err, shifokorArray) {

      shifokorArray.forEach(shifokor => {
        korikSoni += shifokor.koriklarSoni;
      })
      res.render("qabulhona", {
        shifokorArray: shifokorArray,
        korikSoni: korikSoni
      });
    })
  } else {
    res.render("login", {
      email: "qabulhona@gmail.com",
      img: "receptionist.png",
      siteName: "/qabulhona"
    });
  }
}); //qabulhona pageni yuklaydi(auth bosa)
app.post("/qabulhona", function(req, res) {
  let tolovTuri = req.body.paymentMethod;
  let naqd = false;
  if (tolovTuri === "naqd") {
    naqd = true;
  }
  const kasal = new Kasal({
    ismFamiliyasi: req.body.ism + " " + req.body.familiya,
    tugulganYili: req.body.tugulganYili,
    telRaqami: req.body.telRaqami,
    callCenter: req.body.callCenter,
    viloyati: req.body.viloyati,
    tumani: req.body.tumani,
    qaytaKorik: req.body.qaytaKorik,
    naqd: naqd,
    tolovSummasi: req.body.summa,
    kelganSana: req.body.sanasi,
    shifokori: req.body.shifokori,
    korildi: false,
    diagnozi: ""
  });
  kasal.save(function(err) {
    if (!err) {
      shifokorlar.shifokorKorigigaQoshish(kasal.shifokori);

      const doctors = shifokorlar.getShifokorlar();
      doctors.findOne({
        ismi: kasal.shifokori
      }, function(err, doctor) {
        res.render("printer", {
          ismFamiliyasi: kasal.ismFamiliyasi,
          navbatRaqami: doctor.koriklarSoni,
          shifokori: kasal.shifokori,
          honaRaqami: doctor.honaRaqami
        });
      });
    } else {
      console.log("Kasalni databasega saqlab bolmadi");
    }
  });
}); //qabulhonadagi zangor tugma bosganda ishlaydi, kasalni db ga saqlaydi
app.get("/qabulhona/yakunlash", function(req, res) {

  req.logout(function(err) {
    if (err) {
      console.log(err);
    } else {
      shifokorlar.kunniYakunlash();
      res.redirect("/");
    }
  })
}); //qabuldagi qizil tugmaga ishlaydi, ish kunini yakunlaydi(shifokor korik soni va ishga kelganini 0 qiladi, sign out qiladi)




// Bemorlar
app.get("/bemorlar", function(req, res) {
  var mail = "notogri"
  if (req.user !== undefined) {
    mail = req.user.username;
  }
  if (req.isAuthenticated() && mail === "qabulhona@gmail.com") {
    let today = new Date().toISOString().split('T')[0];
    Kasal.find({
      kelganSana: today
    }, function(err, topilganKasallar) {
      if (!err && topilganKasallar) {
        res.render("bemorlar", {
          kasallar: topilganKasallar,
          vaqti: "Jami"
        });
      } else {
        console.log(err + " yoki kasallar topilmadi");
      }
    })
  } else {
    res.render("login", {
      email: "qabulhona@gmail.com",
      img: "receptionist.png",
      siteName: "/bemorlar"
    });
  }
}); //faqat bugungi bemorlarni yuklaydi

app.get("/bemorlarJami", function(req, res) {
  Kasal.find(function(err, topilganKasallar) {
    if (!err) {
      res.render("bemorlar", {
        kasallar: topilganKasallar,
        vaqti: "Bugungi"
      });
    }
  }).sort({
    kelganSana: 'desc'
  });
}); //jami bemorlarni yuklaydi

app.post("/vaqti", function(req, res) {
  if (req.body.vaqti === "Bugungi") {
    res.redirect("/bemorlar");
  } else {
    res.redirect("/bemorlarJami");
  }
}); // bemorlar pagedagi ortadagi tugma bosganda ishlaydi bugungi->jami->bugungi rejimida

app.post("/bemorlar", function(req, res) {
  const id = req.body.myId;
  const button = req.body.myButton;
  if (button === "delete") {
    Kasal.findByIdAndDelete(id, function(err, callback) {
      if (!err) {
        res.redirect("back");
      }
    })
  }
}); //row dagi delete tugmasini bosganda ishlaydi, hozircha pravit ishlagani yoq


//Vrachlar
app.get("/shifokorlar/:topic", function(req, res) {
  const shifName = req.user.username.split('@')[0];
  if (req.isAuthenticated() && shifName === _.lowerCase(req.params.topic).replace(' ', '')) {
    let topic = _.lowerCase(req.params.topic);
    let n = 0;
    vrachNames.forEach(vrachName => {
      if (_.lowerCase(vrachName) === topic) {
        shifokorlar.shifokorKeldi(n);
        const doctors = shifokorlar.getShifokorlar();
        Kasal.find({
          shifokori: vrachName,
          korildi: false
        }, function(err, kasallar) {
          if (kasallar.length === 0) {
            res.render("kasalsizVrach", {
              docName: vrachName
            });
          } else {
            res.render("vrachlar", {
              kasalData: kasallar,
              shifokori: vrachName
            })
          }
        })
      }
      n++;
    });
  } else {
    res.redirect("/");
  }


}); // agar user auth bolsa shifokor pageni ochadi, bolmasa homepagega junatadi

app.post("/shifokorlar", function(req, res) {
  let id = req.body.malumotniSaqlash;
  let diagnoz = req.body.bemorIzohi;
  const shifokori = req.body.shifokori;
  diagnoz += " " + new Date().toDateString();
  Kasal.updateOne({
    _id: id
  }, {
    diagnozi: diagnoz,
    korildi: true
  }, function(err, callback) {
    if (!err && callback) {
      shifokorlar.kasalKorildi(shifokori);
      res.redirect("back");
    }
  });
}); // korildi tugmasa bosilganda bemorni diagnoz bolimiga malumot qoshib uni korildi true qiladi

app.post("/vrachYakunlash", function(req, res) {
  const docName = req.body.button;
  shifokorlar.shifokorKetdi(docName);
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
  })
  res.redirect("/");
});// Shifokor Yakunlash tugmasini bosganda uni ishga kelmagan holatga o`tkizadi. Koriklar sonini nol qilmaydi!





module.exports = app;
