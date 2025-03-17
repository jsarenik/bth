var e, d, s, y = 0;

function selectText() {
  $('#log').select();
}
function selectNum() {
  $('#number').select();
}

function readyFn( jQuery ) {
  $("#number").focus();
  log("Hello!");
  log("");
  log("This is Bit Trade Helper.");
  log("Click the OK button to");
  log("recompute with current");
  log("values.");
}

$(window).on("load", readyFn);

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
  mynumber = $('#number').val().replace(new RegExp("[^\.0-9]", "g"), "");

  eurer=0
  usder=0
  $.get("https://display.anyone.eu.org/api/strike.json", function(data){
    for (e of data) {
      if (e["sourceCurrency"] === "BTC") {
        switch(e["targetCurrency"]) {
        case "EUR":
          eurer=e["amount"];
          break;
        case "USD":
          usder=e["amount"];
          break;
        }
      }
    }
    log("```")
    log("  Bit Trade Helper");
    log(" bth.patocka.eu.org");
    log("====================");
    log("Timestamp:", Math.floor(time/1000));
    log("  USD: " + usder);
    log("  EUR: " + eurer);
    if(mynumber != 0) {
    switch(mywhat) {
      case "EUR":
        y=eurer;
        log("And " + mynumber + " EUR is ...");
        result = (1 / y * mynumber).toFixed(8)
        log("  " + result + " BTC");
        log("  " + (result * 100000000).toFixed(0) + " sat");
        break;
      case "USD":
        y=usder;
        log("And " + mynumber + " USD is ...");
        result = (1 / y * mynumber).toFixed(8)
        log("  " + result + " BTC");
        log("  " + (result * 100000000).toFixed(0) + " sat");
        break;
      case "satoshi":
        y=usder;
        log(mynumber + " sat is ...");
        resultd = (usder.replace(',','')/100000000*mynumber).toFixed(2)
        resulte = (eurer.replace(',','')/100000000*mynumber).toFixed(2)
        log("  USD: " + resultd);
        log("  EUR: " + resulte);
        break;
    }
    } // if mynumber != 0
    log("```");
  }, "json");
}
