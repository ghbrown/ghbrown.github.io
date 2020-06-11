function newcolor() {
  var colorarray=["#eb1717","#23bff7","#3de215","#ed9e00","#f2e600"];
  var randindex=Math.round(Math.random()*(colorarray.length-1));
  document.documentElement.style.setProperty('--main-color',colorarray[randindex])
}

function handleForm(event) {
  event.preventDefault();
}

document.getElementById("primeform").addEventListener('submit', handleForm);

function determineifprime() {
  var t0=performance.now();
  var inputtext=document.getElementById("primeinput").value;
  var input=parseInt(inputtext,10);
  if (input==1) {
    var telapsedoutputstring=gettelapsedstrint(t0);
    document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>not prime</u>. <br>\
     "+telapsedoutputstring;
  } else if (input==2) {
    var telapsedoutputstring=gettelapsedstrint(t0);
    document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>prime</u>. <br>\
     "+telapsedoutputstring;
  } else {
  var primenessfound=false;
  var i=2;
  var sqrtinput=Math.ceil(Math.sqrt(input))
  var iltesqrtinput;
  if (i<=sqrtinput) {
    iltesqrtinput=true;
  } else {
    iltesqrtinput=false;
  }
  while (primenessfound==false && iltesqrtinput==true) {
    if (input%i==0) {
      var telapsedoutputstring=gettelapsedstrint(t0);
      document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>not prime</u>. <br>\
      Factorization with lowest factor: "+i+"&middot"+input/i+"<br>\
      "+telapsedoutputstring;
      primenessfound=true;
    }
    i++;
    if (i>sqrtinput) {
      iltesqrtinput=false;
    }
  }
  if (primenessfound==false) {
      var telapsedoutputstring=gettelapsedstrint(t0);
      document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>prime</u>. <br>\
      "+telapsedoutputstring;
  }
}
}

function gettelapsedstrint(t0) {
  var t1=performance.now();
  var telapsedms=t1-t0;
  if (telapsedms<1) {
    var telapsedmus=Math.round(telapsedms*1000);
    var telapsedoutputstring="Time elapsed: "+telapsedmus+" microseconds";
  } else if (telapsedms>1000) {
    var telapseds=Math.round(telapsedms/1000);
    var telapsedoutputstring="Time elapsed: "+telapseds+" seconds";
  } else {
    var telapsedoutputstring="Time elapsed: "+Math.round(telapsedms)+" milliseconds";
  }
  return telapsedoutputstring;
}
