// document.addEventListener('contextmenu', event => event.preventDefault())

var days = 0
var hours = 0
var minutes = 0
var weeks = 0


var d = new Date()
var year = d.getUTCFullYear()
var month = d.getUTCMonth()
var day = d.getUTCDate()
var hour = d.getUTCHours()
var minute = d.getUTCMinutes()
var second = d.getUTCSeconds()

var timezone = d.getTimezoneOffset()
if (timezone > 0) {
  document.getElementById("timezone").innerHTML = timezone/-60 + "h"
} else if (timezone < 0) {
  document.getElementById("timezone").innerHTML = "+" + timezone/-60 + "h"
} else {
  document.getElementById("timezone").innerHTML = ""
}

function timestamp(){
 var datum = new Date(Date.UTC(year, month, day + days + weeks*7, hour + hours, minute + minutes, second))
 // return datum.getTime()/1000
 document.getElementById("special").innerHTML = `&lt;t:${datum.getTime()/1000}:R>`
}
function timestampglobal(){
  var global_year = document.getElementById("year").value
  var global_month = document.getElementById("month").value-1 // edit here
  var global_day = document.getElementById("day").value
  var global_hour = document.getElementById("hour").value
  var datum = new Date(Date.UTC(global_year, global_month, global_day, global_hour, 0, 0))
  // return datum.getTime()/1000
  document.getElementById("special").innerHTML = `&lt;t:${datum.getTime()/1000}:R>`
}

timestamp()

document.getElementById("year").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("month").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("day").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("hour").addEventListener("onchange", (event) => timestampglobal);

function AdjustWeeks(amount) {
  weeks += amount
  document.getElementById("weeks").innerHTML = `${weeks} weeks`
  timestamp()
}

function AdjustDays(amount) {
  days += amount
  document.getElementById("days").innerHTML = `${days} days`
  timestamp()
}

function AdjustHours(amount) {
  hours += amount
  document.getElementById("hours").innerHTML = `${hours} hours`
  timestamp()
}

function AdjustMinutes(amount) {
  minutes += amount
  document.getElementById("minutes").innerHTML = `${minutes} minutes`
  timestamp()
}

function HandleMouseClick(event, adjustFunction)
{
  event.preventDefault();
  if (event.which == 3) {
    adjustFunction(-1)
  }
  if (event.which == 1) {
    adjustFunction(1)
  }
  return false;
}

function HandleWheel(event, adjustFunction)
{
  event.preventDefault();
  if (event.deltaY > 0) {
    adjustFunction(-1)
  }
  if (event.deltaY < 0) {
    adjustFunction(1)
  }
  return false;
}

document.getElementById("weeks").onmousedown = event => HandleMouseClick(event, AdjustWeeks)
document.getElementById("days").onmousedown = event => HandleMouseClick(event, AdjustDays)
document.getElementById("hours").onmousedown = event => HandleMouseClick(event, AdjustHours)
document.getElementById("minutes").onmousedown = event => HandleMouseClick(event, AdjustMinutes)

document.getElementById("weeks").onwheel = event => HandleWheel(event, AdjustWeeks)
document.getElementById("days").onwheel = event => HandleWheel(event, AdjustDays)
document.getElementById("hours").onwheel = event => HandleWheel(event, AdjustHours)
document.getElementById("minutes").onwheel = event => HandleWheel(event, AdjustMinutes)

document.getElementById("mode").onchange = function (e) {
  var relative = document.querySelector(".relative")
  var nonrelative = document.querySelector(".nonrelative")

  if (document.getElementById("mode").value == "timeframe") {
    relative.hidden = false
    nonrelative.hidden = true
    reset()
  } else {
    relative.hidden = true
    nonrelative.hidden = false
    reset()
  }

  reset()
}

//document.getElementByClass("reset").onmousedown = function(event) {
function reset() {
  weeks = 0
  document.getElementById("weeks").innerHTML = `${weeks} weeks`
  minutes = 0
  document.getElementById("minutes").innerHTML = `${minutes} minutes`
  hours = 0
  document.getElementById("hours").innerHTML = `${hours} hours`
  days = 0
  document.getElementById("days").innerHTML = `${days} days`

  document.getElementById("year").value = d.getUTCFullYear()
  document.getElementById("month").value = d.getUTCMonth() +1 //edit here
  document.getElementById("day").value = d.getUTCDate()
  document.getElementById("hour").value = d.getUTCHours()

  timestamp()
}

function copy(){
  navigator.clipboard.writeText(htmlDecode(document.getElementById("special").innerHTML));
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

setInterval( ()=>{
  var relative = document.querySelector(".relative")
  
  d = new Date()
  year = d.getUTCFullYear()
  month = d.getUTCMonth()
  day = d.getUTCDate()
  hour = d.getUTCHours()
  minute = d.getUTCMinutes()
  second = d.getUTCSeconds()

  if (relative.hidden == false) {
    timestamp()
  }
}, 10000)