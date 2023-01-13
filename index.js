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
  document.querySelector("#timezone").innerText = timezone/-60 + "h"
  document.querySelector("#fake-hour").innerText = timezone/-60
} else if (timezone < 0) {
  document.querySelector("#timezone").innerText = "+" + timezone/-60 + "h"
  document.querySelector("#fake-hour").innerText = "+" + timezone/-60
} else {
  document.querySelector("#timezone").innerText = ""
  document.querySelector("#fake-hour").innerText = ""
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

var newYears = new Date(Date.UTC(2023, 0, 1, 0, 0, 0))
// var newYears = new Date(Date.UTC(2022, 11, 27, 0, 0, 0))
newYears.addHours(timezone/60)
// document.querySelector("#special-new-years").innerText = `<t:${newYears.getTime()/1000}:R>`



function timestamp(){
 var datum = new Date(Date.UTC(year, month, day + days + weeks*7, hour + hours, minute + minutes, second))
 // return datum.getTime()/1000
 document.querySelector("#special").innerText = `<t:${datum.getTime()/1000}:R>`
}
function timestampglobal(){
  var global_year = document.querySelector("#year").value
  var global_month = document.querySelector("#month").value-1 // edit here
  var global_day = document.querySelector("#day").value
  var global_hour = document.querySelector("#hour").value
  var global_minute = document.querySelector("#minute").value
  var datum = new Date(Date.UTC(global_year, global_month, global_day, global_hour, global_minute, 0))
  // return datum.getTime()/1000
  document.querySelector("#special").innerText = `<t:${datum.getTime()/1000}:R>`
}

timestamp()

document.querySelector("#year").addEventListener("change", (event) => timestampglobal);
document.querySelector("#month").addEventListener("change", (event) => timestampglobal);
document.querySelector("#day").addEventListener("change", (event) => timestampglobal);
document.querySelector("#hour").addEventListener("change", (event) => timestampglobal);
document.querySelector("#minute").addEventListener("change", (event) => timestampglobal);

function AdjustWeeks(amount) {
  if(amount < 0 && weeks < 1) return
  weeks += amount
  document.querySelector("#weeks").innerText = `${weeks} weeks`
  timestamp()
}

function AdjustDays(amount) {
  if(amount < 0 && days < 1) return
  days += amount
  if(days > 6) {
    weeks += Math.floor(days / 7)
    days = days % 7
  }
  document.querySelector("#days").innerText = `${days} days`
  document.querySelector("#weeks").innerText = `${weeks} weeks`
  timestamp()
}

function AdjustHours(amount) {
  if(amount < 0 && hours < 1) return
  hours += amount
  if(hours > 23) {
    days += Math.floor(hours / 24)
    hours = hours % 24
  }
  document.querySelector("#hours").innerText = `${hours} hours`
  document.querySelector("#days").innerText = `${days} days`
  timestamp()
}

function AdjustMinutes(amount) {
  if(amount < 0 && minutes < 1) return
  minutes += amount
  if(minutes > 59) {
    hours += Math.floor(minutes / 60)
    minutes = minutes % 60
  }
  document.getElementById("minutes").innerHTML = `${minutes} minutes`
  document.querySelector("#hours").innerText = `${hours} hours`
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

document.querySelector("#weeks").onmousedown = event => HandleMouseClick(event, AdjustWeeks)
document.querySelector("#days").onmousedown = event => HandleMouseClick(event, AdjustDays)
document.querySelector("#hours").onmousedown = event => HandleMouseClick(event, AdjustHours)
document.querySelector("#minutes").onmousedown = event => HandleMouseClick(event, AdjustMinutes)

document.querySelector("#weeks").onwheel = event => HandleWheel(event, AdjustWeeks)
document.querySelector("#days").onwheel = event => HandleWheel(event, AdjustDays)
document.querySelector("#hours").onwheel = event => HandleWheel(event, AdjustHours)
document.querySelector("#minutes").onwheel = event => HandleWheel(event, AdjustMinutes)

document.querySelector("#mode").onchange = function (e) {
  var relative = document.querySelector(".relative")
  var nonrelative = document.querySelector(".nonrelative")

  if (document.querySelector("#mode").value == "timeframe") {
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

//document.getElementByClass("reset").onmousedown = function(event) { // getElementsByClassName is the function just sayin, queryselector is better for single element
function reset() {
  weeks = 0
  document.querySelector("#weeks").innerText = `${weeks} weeks`
  minutes = 0
  document.querySelector("#minutes").innerText = `${minutes} minutes`
  hours = 0
  document.querySelector("#hours").innerText = `${hours} hours`
  days = 0
  document.querySelector("#days").innerText = `${days} days`

  document.querySelector("#year").value = d.getUTCFullYear()
  document.querySelector("#month").value = d.getUTCMonth() +1 //edit here
  document.querySelector("#day").value = d.getUTCDate()
  document.querySelector("#hour").value = d.getUTCHours()
  document.querySelector("#minute").value = d.getUTCMinutes()

  timestamp()
}

function copy(copyable) {
  navigator.clipboard.writeText(document.querySelector("#" + copyable).innerText)
}

setInterval(() => {
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
}, 1000)

document.querySelector(".minus-week").onclick = function() {
 AdjustWeeks(-1) 
}
document.querySelector(".minus-day").onclick = function() {
 AdjustDays(-1) 
}
document.querySelector(".minus-hour").onclick = function() {
 AdjustHours(-1) 
}
document.querySelector(".minus-minute").onclick = function() {
 AdjustMinutes(-1) 
}

document.querySelector(".plus-week").onclick = function() {
 AdjustWeeks(1) 
}
document.querySelector(".plus-day").onclick = function() {
 AdjustDays(1) 
}
document.querySelector(".plus-hour").onclick = function() {
 AdjustHours(1) 
}
document.querySelector(".plus-minute").onclick = function() {
 AdjustMinutes(1) 
}

fetch("https://api.github.com/repos/Dot32IsCool/discord-timestamp-generator")
.then(response => response.json())
.then(data => {
  console.log(data.stargazers_count)
  document.querySelector(".stars").innerText = `${data.stargazers_count} Stars`
})

fetch("https://discord.com/api/guilds/922185010205822976/widget.json")
.then(response => response.json())
.then(data => {
  console.log(data.presence_count)
  document.querySelector(".members").innerText = `${data.presence_count} Online`
})
