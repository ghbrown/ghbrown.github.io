function newColor() {
  var colorArray=["#eb1717","#23bff7","#3de215","#ed9e00","#f2e600"];
  var randIndex=Math.round(Math.random()*(colorArray.length-1));
  document.documentElement.style.setProperty('--main-color',colorArray[randIndex])
}

function getScreenWindowInformation() {
  const screenWidth=window.screen.width;
  const screenHeight=window.screen.height;
    document.documentElement.style.setProperty('--screen-width',screenWidth);
    document.documentElement.style.setProperty('--screen-height',screenHeight);
}

function cornerMatrix() {
  // writes KaTeX formatted text into the page with dynamically
  // colored text, which then gets caught by the KaTeX autorenderer
  var col = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
  var beginb = "$$ \\begin{bmatrix} ";
  var row1 = "\\color{" + col + "}{\\mathbf{G}} & \\color{" + col + "}{\\mathbf{H}} \\\\ ";
  var row2 = "\\mathbf{0} & \\color{" + col + "}{\\mathbf{B}} \\\\ ";
  var endb = "\\end{bmatrix} $$";
  var text = beginb + row1 + row2 + endb;
  var paragraph = document.getElementById("corner_matrix");
  var textNode = document.createTextNode(text);
  paragraph.appendChild(textNode);
}
