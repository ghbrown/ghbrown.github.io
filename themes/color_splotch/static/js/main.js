function newColor() {
  var colorArray=["#eb1717","#23bff7","#3de215","#ed9e00","#f2e600"];
  var randIndex=Math.round(Math.random()*(colorArray.length-1));
  document.documentElement.style.setProperty('--main-color',colorArray[randIndex])
}

function getScreenWindowInformation() {
  const screenWidth=window.screen.width;
  const screenHeight=window.screen.height;
  document.documentElement.style.setProperty('--screen-width',screenWidth)
  document.documentElement.style.setProperty('--screen-height',screenHeight)
}

function handleForm(event) {
  event.preventDefault();
}

document.getElementById("primeform").addEventListener('submit', handleForm);

function determineIfPrime() {
  var t0=performance.now();
  var inputText=document.getElementById("primeinput").value;
  var input=parseInt(inputText,10);
  if (input<=1) {
    var tElapsedOutputString=gettElapsedString(t0);
    document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>not prime</u>. <br>\
     "+tElapsedOutputString;
  } else if (input==2) {
    var tElapsedOutputString=gettElapsedString(t0);
    document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>prime</u>. <br>\
     "+tElapsedOutputString;
  } else {
  var primenessFound=false;
  var i=2;
  var squareRootInput=Math.ceil(Math.sqrt(input))
  var iLTESquareRootInput;
  if (i<=squareRootInput) {
    iLTESquareRootInput=true;
  } else {
    iLTESquareRootInput=false;
  }
  while (primenessFound==false && iLTESquareRootInput==true) {
    if (input%i==0) {
      var tElapsedOutputString=gettElapsedString(t0);
      document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>not prime</u>. <br>\
      Factorization with lowest factor: "+i+"&middot"+input/i+"<br>\
      "+tElapsedOutputString;
      primenessFound=true;
    }
    i++;
    if (i>squareRootInput) {
      iLTESquareRootInput=false;
    }
  }
  if (primenessFound==false) {
      var tElapsedOutputString=gettElapsedString(t0);
      document.getElementById("primeresponse").innerHTML="The number "+input+" is <u>prime</u>. <br>\
      "+tElapsedOutputString;
  }
}
}


function gettElapsedString(t0) {
  var t1=performance.now();
  var tElapsedMilliseconds=t1-t0;
  if (tElapsedMilliseconds<1) {
    var tElapsedMicroseconds=Math.round(tElapsedMilliseconds*1000);
    var tElapsedOutputString="Time elapsed: "+tElapsedMicroseconds+" microseconds";
  } else if (tElapsedMilliseconds>1000) {
    var tElapsedSeconds=Math.round(tElapsedMilliseconds/1000);
    var tElapsedOutputString="Time elapsed: "+tElapsedSeconds+" seconds";
  } else {
    var tElapsedOutputString="Time elapsed: "+Math.round(tElapsedMilliseconds)+" milliseconds";
  }
  return tElapsedOutputString;
}
