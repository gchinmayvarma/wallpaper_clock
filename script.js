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

let scaleSaveTimer = null;
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    clockScale = Math.min(4, Math.max(0.2, clockScale - e.deltaY * 0.005));
    applyScale();
    clearTimeout(scaleSaveTimer);
    scaleSaveTimer = setTimeout(() => localStorage.setItem('clockScale', clockScale), 300);
}, { passive: false });

applyScale();

const TIMEZONES = [
    { city: 'India',         tz: 'Asia/Kolkata' },
    { city: 'Boston',        tz: 'America/New_York' },
    { city: 'San Francisco', tz: 'America/Los_Angeles' },
    { city: 'Sydney',        tz: 'Australia/Sydney' },
    { city: 'London',        tz: 'Europe/London' },
];

let tzIndex = parseInt(localStorage.getItem('tzIndex') || '0');

function updateTimezone() {
    const el = document.getElementById('timezone');
    const entry = TIMEZONES[tzIndex];
    el.textContent = entry.city;
}

document.getElementById('timezone').addEventListener('click', () => {
    tzIndex = (tzIndex + 1) % TIMEZONES.length;
    localStorage.setItem('tzIndex', tzIndex);
    showTime();
});

showTime();
setInterval(showTime, 1000);
function showTime() {
    const entry = TIMEZONES[tzIndex];
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    if (entry) opts.timeZone = entry.tz;
    const parts = new Intl.DateTimeFormat('en-US', opts).formatToParts(new Date());
    const get = type => parts.find(p => p.type === type)?.value || '';
    document.getElementById("time_h").innerHTML = get('hour');
    document.getElementById("time_m").innerHTML = get('minute');
    document.getElementById("time_s").innerHTML = get('second');
    document.getElementById("am_pm").innerHTML = get('dayPeriod');
    updateTimezone();

    const h = parseInt(get('hour')) % 12 + (get('dayPeriod') === 'PM' ? 12 : 0);
    const totalSeconds = h * 3600 + parseInt(get('minute')) * 60 + parseInt(get('second'));
    document.getElementById("day-progress-fill").style.width = (totalSeconds / 86400 * 100) + '%';
}