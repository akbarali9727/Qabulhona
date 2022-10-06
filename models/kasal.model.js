const mongoose = require("mongoose");


const kasallarSchema = new mongoose.Schema({
  ismFamiliyasi: String,
  tugulganYili: Number,
  telRaqami: String,
  callCenter: String,
  viloyati: String,
  tumani: String,
  qaytaKorik: Boolean,
  naqd: Boolean,
  tolovSummasi: Number,
  kelganSana: String,
  shifokori: String,
  korildi: Boolean,
  diagnozi: String
});
const Kasal = mongoose.model("Kasal", kasallarSchema);
module.exports = Kasal;
