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

timestamp()

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