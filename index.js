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
  document.getElementById("fake-hour").innerHTML = timezone/-60
} else if (timezone < 0) {
  document.getElementById("timezone").innerHTML = "+" + timezone/-60 + "h"
  document.getElementById("fake-hour").innerHTML = "+" + timezone/-60
} else {
  document.getElementById("timezone").innerHTML = ""
  document.getElementById("fake-hour").innerHTML = ""
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

// var newYears = new Date(Date.UTC(2024, 0, 1, 0, 0, 0))
// var newYears = new Date(Date.UTC(2023, 0, 1, 0, 0, 0))
// var newYears = new Date(Date.UTC(2022, 11, 27, 0, 0, 0))
// newYears.addHours(timezone/60)
// document.getElementById("special-new-years").innerHTML = `&lt;t:${newYears.getTime()/1000}:R>`

function getTimestampType() {
  switch (document.getElementById("type").value) {
    case "coutdown": return "R>"
    case "hour-short": return "t>"
    case "hour-long": return "T>"
    case "date-short": return "d>"
    case "date-long": return "D>"
    case "date-time": return "f>"
    case "date-week": return "F>"
  }
  return "R>"
}

function timestamp() {
 var datum = new Date(Date.UTC(year, month, day + days + weeks*7, hour + hours, minute + minutes, second))
 // return datum.getTime()/1000
 document.getElementById("special").innerHTML = `&lt;t:${datum.getTime()/1000}:${getTimestampType()}`
}

function timestampglobal() {
  var global_year = document.getElementById("year").value
  var global_month = document.getElementById("month").value-1 // edit here
  var global_day = document.getElementById("day").value
  var global_hour = document.getElementById("hour").value
  var global_minute = document.getElementById("minute").value
  var datum = new Date(Date.UTC(global_year, global_month, global_day, global_hour, global_minute, 0))
  // return datum.getTime()/1000
  document.getElementById("special").innerHTML = `&lt;t:${datum.getTime()/1000}:${getTimestampType()}`
}

timestamp()

document.getElementById("year").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("month").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("day").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("hour").addEventListener("onchange", (event) => timestampglobal);
document.getElementById("minute").addEventListener("onchange", (event) => timestampglobal);

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

document.querySelector("#type").onchange = function (e) {
  timestamp()

  // update example image
  var example = document.querySelector("img")
  switch (document.getElementById("type").value) {
    case "coutdown": example.src = "timestamp examples/relative.png"; break;
    case "hour-short": example.src = "timestamp examples/time.png"; break;
    case "hour-long": example.src = "timestamp examples/long-time.png"; break;
    case "date-short": example.src = "timestamp examples/date.png"; break;
    case "date-long": example.src = "timestamp examples/long-date.png"; break;
    case "date-time": example.src = "timestamp examples/date-time.png"; break;
    case "date-week": example.src = "timestamp examples/date-weekday.png"; break;
  }
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
  document.getElementById("minute").value = d.getUTCMinutes()

  timestamp()
}

function copy(copyable){
  navigator.clipboard.writeText(htmlDecode(document.getElementById(copyable).innerHTML))
  .then(() => {
    let a = document.getElementById("copy-banner")
    a.classList.add('show')
    setTimeout(function() {
      a.classList.remove('show')
    }, 2000)
  });
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
  document.querySelector(".stars").innerHTML = `${data.stargazers_count} Stars`
})

fetch("https://discord.com/api/guilds/922185010205822976/widget.json")
.then(response => response.json())
.then(data => {
  console.log(data.presence_count)
  document.querySelector(".members").innerHTML = `${data.presence_count} Online`

  // Show offline if bot is offline
  // var members = data.members
  // var online = 0
  // for (var i = 0; i < members.length; i++) {
  //   var member = members[i]
  //   if (member.username == "Timer Bot") {
  //     console.log("Found timer bot")
  //     if (member.status == "online") {
  //       online = 1
  //     } else {
  //       online = 0
  //     }
  //   } 
  // }
  // if (online == 0) {
  //   var el = document.querySelector(".server-count")
  //   el.innerHTML = "Offline"
  //   el.style.backgroundColor = "#808080"
  // }
})