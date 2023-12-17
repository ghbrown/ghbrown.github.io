// todo: insert random selection into proper element
function newQuote() {
  var iRand=Math.round(Math.random()*(quotesArray.length-1));
  alert(quotesArray[iRand]);
  // document.documentElement.style.setProperty('--main-color',colorArray[randIndex])
}

