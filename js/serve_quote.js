function newQuote() {
  $.ajax({
    url: "/topics/quotes",
    type: "GET",
    success: function(html) {
      // first pass to compute number of hr elements and select random number
      // if there are n <hr> elements in the body, there are n-1 quotes
      var hrList = $(html).find('.page__body').find('hr');
      // -1 for 0-based indexing, -1 since n_quotes = n_hr - 1
      var i=Math.round(Math.random()*(hrList.length-1-1));

      // production pass to get ith quote
      var hr_i = $(html).find('hr').eq(i);
      var content = hr_i.nextUntil('hr');
      console.log(content);

      // insert quote content
      $("#quote").append(content);
    },
  });
}
// function newQuote0() {
//   var i=Math.round(Math.random()*(quotesArray.length-1));
//   var quoteElement = document.getElementById("quote");
//   var par = document.createElement("P");
//   var quote = quotesArray[i];
//   var quoteTextNode = document.createTextNode(quote);
//   par.appendChild(quoteTextNode);
//   quoteElement.appendChild(par);
// }

// I think what I can do is put all the quotes in their own divs or whatever on a md page that will get rendered by Hugo.
//   Then at runtime I randomly select a div from this page (which is never linked to) and reproduce it inside of the id="quote" div)

