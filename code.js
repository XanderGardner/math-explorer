//back buttons
onEvent("checkBackButton", "click", function( ) {
  setScreen("menuScreen");
});
onEvent("findBackButton", "click", function( ) {
  setScreen("menuScreen");
});
onEvent("fibBack", "click", function( ) {
  setScreen("menuScreen");
});
onEvent("collatzBack", "click", function( ) {
  setScreen("menuScreen");
});
onEvent("piBack", "click", function( ) {
  setScreen("menuScreen");
});
onEvent("eulerBack", "click", function( ) {
  setScreen("menuScreen");
});

//menu buttons
onEvent("checkButton", "click", function( ) {
  setScreen("checkScreen");
});
onEvent("findButton", "click", function( ) {
  setScreen("findScreen");
});
onEvent("fibButton", "click", function( ) {
  setScreen("fibScreen");
});
onEvent("collatzButton", "click", function( ) {
  setScreen("collatzScreen");
});
onEvent("piButton", "click", function( ) {
  setScreen("piScreen");
  setActiveCanvas("piOutput");
  setStrokeColor("#ff81c5");
  rect(0, 0, 200, 200);
  setStrokeColor("#ffc3e6");
  circle(100, 100, 100);
});
onEvent("eulerButton", "click", function( ) {
  setScreen("eulerScreen");
});

//equate/calculate buttons
onEvent("checkEnterButton", "click", function( ) {
  var checkNum = getNumber("checkInput");
  if (checkPrime(checkNum)){
    setText("checkAnswer", checkNum + " is prime!");
  } else {
    setText("checkAnswer", checkNum + " is not prime.");
  }
});
onEvent("findEnterButton", "click", function( ) {
  var lower = getNumber("lowerInput");
  var upper = getNumber("upperInput");
  var primes = [];
  for (var i = lower; i <= upper; i++){
    if (checkPrime(i)){
      appendItem(primes, i);
    }
  }
  showIfPrimes(primes, lower, upper);
});
onEvent("fibEnter", "click", function( ) {
  var terms = getNumber("fibInput");
  setText("fibOutput", fibSeq(terms));
});
onEvent("collatzEnter", "click", function( ) {
  var givenNum = getNumber("collatzInput");
  var collatzSeq = [givenNum];
  while (collatzSeq[collatzSeq.length - 1] != 1){
    givenNum = collatzNextTerm(givenNum);
    appendItem(collatzSeq, givenNum);
  }
  setText("collatzOutput", collatzSeq + "\nThe sequence took " + collatzSeq.length + " terms to reach 1!");
});
onEvent("piEnter", "click", function( ) {
  var totalDarts = getNumber("piInput");
  var dartXLoc = [];
  var dartYLoc = [];
  var dis = -1;
  var distances = [];
  var numInCircle = 0;
  setActiveCanvas("piOutput");
  setStrokeColor("#ffc3e6");
  for (var i = 0; i < totalDarts; i++){
    appendItem(dartXLoc, randomNumber(0,200));
    appendItem(dartYLoc, randomNumber(0,200));
    dis = Math.sqrt((100 - dartXLoc[i])*(100 - dartXLoc[i]) + (100 - dartYLoc[i])*(100 - dartYLoc[i]));
    appendItem(distances, dis);
    circle(dartXLoc[i], dartYLoc[i], 2);
    if (dis <= 100){
      numInCircle++;
    }
  }
  var estimatedPi = 4 * numInCircle / totalDarts;
  setText("piOutputText", "Number darts in circle: " + numInCircle + "\n\nPi estimate: 4 times " + numInCircle + " divided by " + totalDarts + "\n\n= " + estimatedPi);
});
onEvent("eulerEnter", "click", function( ) {
  var e = finde(getNumber("eulerInput"));
  setText("eulerOutput", "e is about: " + e);
});

//algorithms
function checkPrime(num) {
  if (num <= 1){
    return false;
  } else if (num == 2){
    return true;
  } else {
    for (var i = 2; i < num/2 + 1; i++){
      if (num % i == 0){
        return false;
      }
    }
    return true;
  }
}
function fibSeq(length) {
  var seq = [1,1];
  for (var i = 2; i<length; i++){
    appendItem(seq, (seq[i-2] + seq[i-1]));
  }
  return seq;
}
function collatzNextTerm(startNum) {
  var result = -1;
  if (startNum % 2 == 0){
    result = startNum / 2;
  } else if (startNum % 2 == 1){
    result = 3 * startNum + 1;
  }
  return result;
}
function finde(n){
  var e = 1 + 1/n;
  var base = e;
  for (var i = 1; i < n; i++){
    e *= base;
  }
  return e;
}
function showIfPrimes(primesN, lowerN, upperN){
  if (primesN.length !=0){
    setText("findOutput", primesN + "\nFound: " + primesN.length + " primes between " + lowerN + " and " + upperN);
  } else {
    setText("findOutput", "There are no primes between " + lowerN + " and " + upperN);
  }
}
