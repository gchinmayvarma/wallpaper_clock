const FONTS = [
    "'Inconsolata', monospace",
    "'Orbitron', sans-serif",
    "'Share Tech Mono', monospace",
    "'Major Mono Display', monospace",
    "'Syncopate', sans-serif",
    "'Bebas Neue', cursive",
    "'Oswald', sans-serif",
    "'Josefin Sans', sans-serif",
    "'Raleway', sans-serif",
    "'Poiret One', cursive",
    "'Cormorant Garamond', serif",
    "'Playfair Display', serif",
    "'DM Serif Display', serif",
];

let fontIndex = parseInt(localStorage.getItem('fontIndex') || '0');

function applyFont() {
    document.getElementById('clock').style.fontFamily = FONTS[fontIndex];
}

document.getElementById('font-btn').addEventListener('click', () => {
    fontIndex = (fontIndex + 1) % FONTS.length;
    localStorage.setItem('fontIndex', fontIndex);
    applyFont();
});

applyFont();

let clockScale = parseFloat(localStorage.getItem('clockScale') || '1');

function applyScale() {
    document.documentElement.style.setProperty('--clock-scale', clockScale);
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    clockScale = Math.min(4, Math.max(0.2, clockScale - e.deltaY * 0.001));
    localStorage.setItem('clockScale', clockScale);
    applyScale();
}, { passive: false });

applyScale();
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