setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    am_pm = "AM";
    if (h > 12) {
        h -= 12;
        am_pm = "PM";
    }
    if (h == 0) {
        h = 12;
        am_pm = "AM";
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById("time_h").innerHTML = h;
    document.getElementById("time_m").innerHTML = m;
    document.getElementById("time_s").innerHTML = s;
    document.getElementById("am_pm").innerHTML = am_pm;
}