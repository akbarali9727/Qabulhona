function Shifokor(ismSharifi,ishgaKelgan,kelganSana,koriklarSoni){
this.ismSharifi = ismSharifi;
this.ishgaKelgan = ishgaKelgan;
this.kelganSana = kelganSana;
this.koriklarSoni = koriklarSoni;
}
const shifokorlar=[];
let foydalanishSoni=0;



let date=new Date();
const zokirjon=new Shifokor("Zokirjon",false,date,0);
shifokorlar.push(zokirjon);
const maMing=new Shifokor("Ma Ming",false,date,0);
shifokorlar.push(maMing);
const akbarali=new Shifokor("Akbarali",false,date,0);
shifokorlar.push(akbarali);
const ahrorjon=new Shifokor("Ahrorjon",false,date,0);
shifokorlar.push(ahrorjon);
const dilmurodjon=new Shifokor("Dilmurodjon",false,date,0);
shifokorlar.push(dilmurodjon);
const hojimurod=new Shifokor("Hojimurod",false,date,0);
shifokorlar.push(hojimurod);

exports.getShifokorlar = function(){
  let today=new Date();
  shifokorlar.forEach(shifokor=>{
    if(shifokor.kelganSana.toDateString()!==today.toDateString()){
      shifokor.kelganSana=today;
      shifokor.koriklarSoni=0;
      shifokor.ishgaKelgan=false;
    }
  })
  return shifokorlar;
}

exports.shifokorKorigigaQoshish = function(shifokorName){
  shifokorlar.forEach(shifokor=>{
    if(shifokor.ismSharifi.toLowerCase()===shifokorName.toLowerCase()){
      shifokor.koriklarSoni++;
      return;
    }
  })
}


exports.shifokorKeldi = function(shifokorNum){
shifokorlar[shifokorNum].ishgaKelgan=true;
}
