var e, d, s, y = 0;

function selectText() {
  const input = document.getElementById('log');
  input.focus();
  input.select();
}
function readyFn( jQuery ) {
  $("#number").focus();
}

$( window ).on( "load", readyFn );
$( document ).ready( readyFn );

    // simple logging function
    function log() {
      var args = Array.prototype.slice.call(arguments);
      console.log.apply(null, args);
      args = args.map(function(a) { if (typeof(a) == "string") return a; else return JSON.stringify(a); });
      document.getElementById("log").textContent += args.join(" ") + "\n";
    }

function genoutput() {
var time = (new Date()).getTime();
document.getElementById("log").textContent = "";
e=d=s=y=0;
mywhat = $('#what').val();
mynumber = $('#number').val().replace(/[0-9]/g, "");

    $.get("https://api.coindesk.com/v1/bpi/currentprice.json", function(data){
      log("```")
      log("  Bit Trade Helper");
      log(" bth.patocka.eu.org");
      log("====================");
      log("Timestamp:", Math.floor(time/1000));
      log("  USD: " + data.bpi.USD.rate);
      log("  EUR: " + data.bpi.EUR.rate);
switch(mywhat) {
  case "EUR":
    y = data.bpi.EUR.rate;
    y = y.replace(',','');
    log("And " + mynumber + " EUR is ...");
    result = (1 / y * mynumber).toFixed(8)
    log("  " + result + " BTC");
    log("  " + (result * 100000000).toFixed(0) + " sat");
    break;
  case "USD":
    y = data.bpi.USD.rate;
    y = y.replace(',','');
    log("And " + mynumber + " USD is ...");
    result = (1 / y * mynumber).toFixed(8)
    log("  " + result + " BTC");
    log("  " + result * 100000000 + " sat");
    break;
  case "satoshi":
    y = data.bpi.USD.rate;
    y = y.replace(',','');
    log(mynumber + " sat is ...");
    resultd = (data.bpi.USD.rate.replace(',','')/100000000*mynumber).toFixed(2)
    resulte = (data.bpi.EUR.rate.replace(',','')/100000000*mynumber).toFixed(2)
    log("  USD: " + resultd);
    log("  EUR: " + resulte);
    break;
}
      $.get("https://mempool.space/api/v1/fees/recommended", function(data){
        fee = data.hourFee;
        log("Recommended fee is");
        log("  " + fee + " sat/vB");
        log("```");
      }, "json");
    }, "json");
}
