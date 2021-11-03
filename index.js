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

function timestamp(){
 var datum = new Date(Date.UTC(year, month, day + days + weeks*7, hour + hours, minute + minutes, second))
 // return datum.getTime()/1000
 document.getElementById("special").innerHTML = `&lt;t:${datum.getTime()/1000}:R>`
}
function timestampglobal(){
  var global_year = document.getElementById("year").value
  var global_month = document.getElementById("month").value
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

document.getElementById("weeks").onmousedown = function(event) {
  if (event.which == 3) {
      weeks = weeks - 1
  }
  if (event.which == 1) {
      weeks = weeks + 1
  }
	document.getElementById("weeks").innerHTML = `${weeks} weeks`
	timestamp()
}
document.getElementById("days").onmousedown = function(event) {
  if (event.which == 3) {
      days = days - 1
  }
  if (event.which == 1) {
      days = days + 1
  }
	document.getElementById("days").innerHTML = `${days} days`
	timestamp()
}
document.getElementById("hours").onmousedown = function(event) {
  if (event.which == 3) {
      hours = hours - 1
  }
  if (event.which == 1) {
      hours = hours + 1
  }
	document.getElementById("hours").innerHTML = `${hours} hours`
	timestamp()
}
document.getElementById("minutes").onmousedown = function(event) {
  if (event.which == 3) {
      minutes = minutes - 1
  }
  if (event.which == 1) {
      minutes = minutes + 1
  }
	document.getElementById("minutes").innerHTML = `${minutes} minutes`
	timestamp()
}

document.getElementById("mode").onchange = function (e) {
  var relative = document.getElementById("relative")
  var nonrelative = document.getElementById("nonrelative")

  if (document.getElementById("mode").value == "timeframe") {
	relative.hidden = false
	nonrelative.hidden = true
  } else {
	relative.hidden = true
	nonrelative.hidden = false
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
	d = new Date()
	year = d.getUTCFullYear()
	month = d.getUTCMonth()
	day = d.getUTCDate()
	hour = d.getUTCHours()
	minute = d.getUTCMinutes()
	second = d.getUTCSeconds()

	timestamp()
}, 10000)
