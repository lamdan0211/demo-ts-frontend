function GetCount() {
    dateNow = new Date;
    var amount = dateFuture.getTime() - dateNow.getTime() + 5;
    delete dateNow;
    if (amount < 0) {
        out = "<div id='days'><span></span>0<div id='days_text'></div></div>" + "<div id='hours'><span></span>0<div id='hours_text'></div></div>" + "<div id='mins'><span></span>0<div id='mins_text'></div></div>" + "<div id='secs'><span></span>0<div id='secs_text'></div></div>";
        document.getElementById("countbox").innerHTML = out
    } else {
        var days = 0;
        var hours = 0;
        var mins = 0;
        var secs = 0;
        var out = "";
        amount = Math.floor(amount / 1e3);
        days = Math.floor(amount / 86400);
        amount = amount % 86400;
        hours = Math.floor(amount / 3600);
        amount = amount % 3600;
        mins = Math.floor(amount / 60);
        amount = amount % 60;
        secs = Math.floor(amount);
        out = "<div id='days'><span></span>" + days + "<div id='days_text'></div></div>" + "<div id='hours'><span></span>" + hours + "<div id='hours_text'></div></div>" + "<div id='mins'><span></span>" + mins + "<div id='mins_text'></div></div>" + "<div id='secs'><span></span>" + secs + "<div id='secs_text'></div></div>";
        document.getElementById("countbox").innerHTML = out;
        setTimeout("GetCount()", 1e3);
    }
}

month = --month;
dateFuture = new Date(year, month, day, hour, min, sec);
window.onload = function () {
    GetCount()
}