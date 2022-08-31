
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


function callCen(option,value){
  this.text=option;
  this.value=value;
  this.selected=false;
}

function addingList(id, list){
  var selectBox=$("#"+id)[0];
  for(var i=0;i<list.length;i++){
  var option= list[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
  }
}
function addingTuman(id, list){
  var selectBox=$("#"+id)[0];
  $("#"+id+" option").each(function(){
    this.remove();
  })
  selectBox.options.add(new Option("Tanlang...","0",true));
  for(var i=0;i<list.length;i++){
  var option= list[i];
  selectBox.options.add(new Option(option, option,false));
  }
}



          // Call-Center qoshish
var options=[];
var dilm=new callCen("Dilmurodjon","dilmurodjon");
options.push(dilm);
var akb=new callCen("Akbarali","akbarali");
options.push(akb);
var yangi=new callCen("yangiCAll","yangiCall");
options.push(yangi);
addingList("callCenter",options);


      //Viloyatlar qoshish

function viloyat(text,value){
  this.text=text;
  this.value=value;
  this.selected=false;
  this.tumanlar=[];
}
var vilOptions=[];
var fargona=new viloyat("Farg'ona","Fargona");
fargona.tumanlar.push("Qo'qon shahri");
fargona.tumanlar.push("Uchko'prik tumani");
fargona.tumanlar.push("Bag'dod tumani");
fargona.tumanlar.push("Buvayda tumani");
fargona.tumanlar.push("O`zbekiston tumani");
fargona.tumanlar.push("Farg'ona shahri");
fargona.tumanlar.push("Farg'ona tumani");
fargona.tumanlar.push("Dang'ara tumani");
fargona.tumanlar.push("Furqat tumani");
fargona.tumanlar.push("Oltiariq tumani");
fargona.tumanlar.push("Beshariq tumani");
fargona.tumanlar.push("Qo'shtepa tumani");
fargona.tumanlar.push("Quva tumani");
fargona.tumanlar.push("Rishton tumani");
fargona.tumanlar.push("So'x tumani");
fargona.tumanlar.push("Toshloq tumani");
fargona.tumanlar.push("Yozyovon tumani");
fargona.tumanlar.push("Quvasoy shahri");
vilOptions.push(fargona);

var namangan=new viloyat("Namangan","Namangan");
namangan.tumanlar.push("Namangan shahri");
namangan.tumanlar.push("Chust tumani");
namangan.tumanlar.push("Kosonsoy tumani");
namangan.tumanlar.push("To'raqo'rg'on tumani");
namangan.tumanlar.push("Pop tumani");
namangan.tumanlar.push("Namangan tumani");
namangan.tumanlar.push("Chortoq tumani");
namangan.tumanlar.push("Mingbuloq tumani");
namangan.tumanlar.push("Norin tumani");
namangan.tumanlar.push("Uchqo'rg'on tumani");
namangan.tumanlar.push("Uychi tumani");
namangan.tumanlar.push("Yangiqo'rg'on tumani");
vilOptions.push(namangan);

var andijon=new viloyat("Andijon","Andijon");
andijon.tumanlar.push("Andijon shahri");
andijon.tumanlar.push("Paxtaobod tumani");
andijon.tumanlar.push("Shahrixon tumani");
andijon.tumanlar.push("Ulug'nor tumani");
andijon.tumanlar.push("Asaka tumani");
andijon.tumanlar.push("Baliqchi tumani");
andijon.tumanlar.push("Andijon tumani");
andijon.tumanlar.push("Bo'z tumani");
andijon.tumanlar.push("Buloqboshi tumani");
andijon.tumanlar.push("Izboskan tumani");
andijon.tumanlar.push("Jalaquduq tumani");
andijon.tumanlar.push("Xo'jand tumani");
andijon.tumanlar.push("Qo'rg'ontepa tumani");
andijon.tumanlar.push("Marhamat tumani");
andijon.tumanlar.push("Oltinko'l tumani");
vilOptions.push(andijon);

var toshkent= new viloyat("Toshkent","Toshkent");
toshkent.tumanlar.push("Toshkent shahri");
vilOptions.push(toshkent);
var xorazm= new viloyat("Xorazm","Xorazm");
xorazm.tumanlar.push("Xorazm shahri");
vilOptions.push(xorazm);
var navoiy= new viloyat("Navoiy","Navoiy");
navoiy.tumanlar.push("Navoiy shahri");
vilOptions.push(navoiy);
var buxoro= new viloyat("Buxoro","Buxoro");
buxoro.tumanlar.push("Buxoro shahri");
vilOptions.push(buxoro);
var samarqand= new viloyat("Samarqand","Samarqand");
samarqand.tumanlar.push("Samarqand shahri");
vilOptions.push(samarqand);
var qashqadaryo= new viloyat("Qashqadaryo","Qashqadaryo");
qashqadaryo.tumanlar.push("Qashqadaryo shahri");
vilOptions.push(qashqadaryo);
var surxondaryo= new viloyat("Surxondaryo","Surxondaryo");
surxondaryo.tumanlar.push("Surxondaryo shahri");
vilOptions.push(surxondaryo);
var sirdaryo= new viloyat("Sirdaryo","Sirdaryo");
sirdaryo.tumanlar.push("Sirdaryo shahri");
vilOptions.push(sirdaryo);
var jizzah= new viloyat("Jizzah","Jizzah");
jizzah.tumanlar.push("Jizzah shahri");
vilOptions.push(jizzah);



addingList("viloyat",vilOptions);

$("#viloyat").click(function(){
  var tanlanganVil=$("#viloyat").val();
  let n=0;
switch (tanlanganVil){
  case "Fargona":
  n=0;
  break;
  case "Namangan":
  n=1;
  break;
  case "Andijon":
  n=2;
  break;
  case "Toshkent":
  n=3;
  break;
  case "Xorazm":
  n=4;
  break;
  case "Navoiy":
  n=5;
  break;
  case "Buxoro":
  n=6;
  break;
  case "Samarqand":
  n=7;
  break;
  case "Qashqadaryo":
  n=8;
  break;
  case "Surxondaryo":
  n=9;
  break;
  case "Sirdaryo":
  n=10;
  break;
  case "Jizzah":
  n=11;
  break;
  default:
  console.log("Ooops there is no such viloyat");
  break;
}


addingTuman("tuman",vilOptions[n].tumanlar);
})
