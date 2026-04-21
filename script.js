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
    "'Space Mono', monospace",
    "'Audiowide', sans-serif",
    "'Oxanium', sans-serif",
    "'Electrolize', sans-serif",
    "'Iceland', sans-serif",
    "'Michroma', sans-serif",
    "'Exo 2', sans-serif",
    "'Nova Mono', monospace",
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

let clockOpacity = parseInt(localStorage.getItem('clockOpacity') || '100');
const opacitySlider = document.getElementById('opacity-slider');
opacitySlider.value = clockOpacity;
document.getElementById('clock').style.opacity = clockOpacity / 100;
opacitySlider.addEventListener('input', () => {
    clockOpacity = parseInt(opacitySlider.value);
    localStorage.setItem('clockOpacity', clockOpacity);
    document.getElementById('clock').style.opacity = clockOpacity / 100;
});

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

const TIMEZONES = [
    null,
    { city: 'New York',    tz: 'America/New_York' },
    { city: 'Los Angeles', tz: 'America/Los_Angeles' },
    { city: 'Chicago',     tz: 'America/Chicago' },
    { city: 'Toronto',     tz: 'America/Toronto' },
    { city: 'São Paulo',   tz: 'America/Sao_Paulo' },
    { city: 'London',      tz: 'Europe/London' },
    { city: 'Paris',       tz: 'Europe/Paris' },
    { city: 'Berlin',      tz: 'Europe/Berlin' },
    { city: 'Moscow',      tz: 'Europe/Moscow' },
    { city: 'Dubai',       tz: 'Asia/Dubai' },
    { city: 'Mumbai',      tz: 'Asia/Kolkata' },
    { city: 'Bangkok',     tz: 'Asia/Bangkok' },
    { city: 'Singapore',   tz: 'Asia/Singapore' },
    { city: 'Hong Kong',   tz: 'Asia/Hong_Kong' },
    { city: 'Seoul',       tz: 'Asia/Seoul' },
    { city: 'Tokyo',       tz: 'Asia/Tokyo' },
    { city: 'Sydney',      tz: 'Australia/Sydney' },
];

let tzIndex = parseInt(localStorage.getItem('tzIndex') || '0');

function updateTimezone() {
    const el = document.getElementById('timezone');
    const entry = TIMEZONES[tzIndex];
    if (!entry) { el.innerHTML = ''; return; }
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: entry.tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    el.innerHTML = `<span class="tz-city">${entry.city}</span><span class="tz-time">${timeStr}</span>`;
}

document.getElementById('timezone').addEventListener('click', () => {
    tzIndex = (tzIndex + 1) % TIMEZONES.length;
    localStorage.setItem('tzIndex', tzIndex);
    updateTimezone();
});

updateTimezone();
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
    updateTimezone();
}