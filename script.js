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
    document.documentElement.style.setProperty('--clock-font', FONTS[fontIndex]);
}

document.getElementById('font-btn').addEventListener('click', () => {
    fontIndex = (fontIndex + 1) % FONTS.length;
    localStorage.setItem('fontIndex', fontIndex);
    applyFont();
    layoutGrid();
});

applyFont();

let clockOpacity = parseFloat(localStorage.getItem('clockOpacity') || '100');
const opacitySlider = document.getElementById('opacity-slider');

function applyOpacity() {
    opacitySlider.value = clockOpacity;
    document.documentElement.style.setProperty('--clock-opacity', clockOpacity / 100);
}

opacitySlider.addEventListener('input', () => {
    clockOpacity = parseInt(opacitySlider.value);
    localStorage.setItem('clockOpacity', clockOpacity);
    applyOpacity();
});

applyOpacity();

let clockScale = parseFloat(localStorage.getItem('clockScale') || '1');

function applyScale() {
    document.documentElement.style.setProperty('--clock-scale', clockScale);
}

let gridOn = localStorage.getItem('gridOn') === '1';

const mainClock = document.getElementById('clock');
const controls = document.getElementById('controls');
let opacitySaveTimer = null;
let scaleSaveTimer = null;
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (controls.contains(e.target)) {
        clockOpacity = Math.min(100, Math.max(10, clockOpacity - e.deltaY * 0.05));
        applyOpacity();
        clearTimeout(opacitySaveTimer);
        opacitySaveTimer = setTimeout(() => localStorage.setItem('clockOpacity', clockOpacity), 300);
        return;
    }
    // Only the clock zooms; everywhere else is for dragging the window.
    if (!mainClock.contains(e.target)) return;
    clockScale = Math.min(4, Math.max(0.2, clockScale - e.deltaY * 0.005));
    applyScale();
    clearTimeout(scaleSaveTimer);
    scaleSaveTimer = setTimeout(() => localStorage.setItem('clockScale', clockScale), 300);
}, { passive: false });

applyScale();

const CITIES = [
    { city: 'Auckland',      tz: 'Pacific/Auckland' },
    { city: 'Bangkok',       tz: 'Asia/Bangkok' },
    { city: 'Berlin',        tz: 'Europe/Berlin' },
    { city: 'Boston',        tz: 'America/New_York' },
    { city: 'Buenos Aires',  tz: 'America/Argentina/Buenos_Aires' },
    { city: 'Cairo',         tz: 'Africa/Cairo' },
    { city: 'Chicago',       tz: 'America/Chicago' },
    { city: 'Denver',        tz: 'America/Denver' },
    { city: 'Dubai',         tz: 'Asia/Dubai' },
    { city: 'Hong Kong',     tz: 'Asia/Hong_Kong' },
    { city: 'Honolulu',      tz: 'Pacific/Honolulu' },
    { city: 'India',         tz: 'Asia/Kolkata' },
    { city: 'Istanbul',      tz: 'Europe/Istanbul' },
    { city: 'Jakarta',       tz: 'Asia/Jakarta' },
    { city: 'Johannesburg',  tz: 'Africa/Johannesburg' },
    { city: 'Lagos',         tz: 'Africa/Lagos' },
    { city: 'London',        tz: 'Europe/London' },
    { city: 'Madrid',        tz: 'Europe/Madrid' },
    { city: 'Mexico City',   tz: 'America/Mexico_City' },
    { city: 'Moscow',        tz: 'Europe/Moscow' },
    { city: 'New York',      tz: 'America/New_York' },
    { city: 'Paris',         tz: 'Europe/Paris' },
    { city: 'San Francisco', tz: 'America/Los_Angeles' },
    { city: 'São Paulo',     tz: 'America/Sao_Paulo' },
    { city: 'Seoul',         tz: 'Asia/Seoul' },
    { city: 'Shanghai',      tz: 'Asia/Shanghai' },
    { city: 'Singapore',     tz: 'Asia/Singapore' },
    { city: 'Sydney',        tz: 'Australia/Sydney' },
    { city: 'Tokyo',         tz: 'Asia/Tokyo' },
    { city: 'Toronto',       tz: 'America/Toronto' },
];

const DEFAULT_CITIES = ['India', 'Boston', 'San Francisco', 'Sydney', 'London'];

function cityByName(name) {
    return CITIES.find(c => c.city === name);
}

// The cities picked in the + menu, in the order they were added.
let cities = (JSON.parse(localStorage.getItem('cities')) || DEFAULT_CITIES).map(cityByName).filter(Boolean);
if (!cities.length) cities = DEFAULT_CITIES.map(cityByName);

let tzIndex = parseInt(localStorage.getItem('tzIndex') || '0') % cities.length;

mainClock.querySelector('.timezone').addEventListener('click', () => {
    tzIndex = (tzIndex + 1) % cities.length;
    localStorage.setItem('tzIndex', tzIndex);
    showTime();
});

const grid = document.getElementById('grid');
let gridCells = [];

function buildGrid() {
    gridCells = cities.map(() => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        const clock = mainClock.cloneNode(true);
        clock.removeAttribute('id');
        cell.append(clock);
        return cell;
    });
    grid.replaceChildren(...gridCells);
}

// How many clocks go in each row: as even as possible, with the longer rows
// mirrored around the middle so the layout is symmetric top-to-bottom too.
function rowCounts(n, rows) {
    const counts = Array(rows).fill(Math.floor(n / rows));
    let extra = n % rows;
    const mid = (rows - 1) / 2;
    if (extra % 2 === 1) {
        counts[mid]++;
        extra--;
    }
    for (let i = Math.floor((rows - 1) / 2) - (rows % 2); extra > 0; i--) {
        counts[i]++;
        counts[rows - 1 - i]++;
        extra -= 2;
    }
    return counts;
}

function layoutGrid() {
    if (!gridOn) return;

    // Measure every clock at 100px, including the city label hanging below it.
    grid.style.setProperty('--grid-font', '100px');
    let clockW = 0, clockH = 0;
    for (const cell of gridCells) {
        const box = cell.firstChild.getBoundingClientRect();
        const label = cell.querySelector('.timezone').getBoundingClientRect();
        clockW = Math.max(clockW, box.width, label.width);
        clockH = Math.max(clockH, label.bottom - box.top);
    }

    // Pick the row count that gives the biggest clocks, skipping any that
    // can't be mirrored (an odd number of leftovers across an even number of rows).
    const n = gridCells.length;
    let best = null;
    for (let rows = 1; rows <= n; rows++) {
        if (rows % 2 === 0 && (n % rows) % 2 === 1) continue;
        const cols = Math.ceil(n / rows);
        const fit = Math.min(grid.clientWidth / cols / clockW, grid.clientHeight / rows / clockH);
        if (!best || fit > best.fit) best = { rows, cols, fit };
    }

    grid.replaceChildren();
    let i = 0;
    for (const count of rowCounts(n, best.rows)) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        row.append(...gridCells.slice(i, i + count));
        i += count;
        grid.append(row);
    }
    grid.style.setProperty('--grid-cols', best.cols);
    grid.style.setProperty('--grid-font', best.fit * 0.85 * 100 + 'px');
}

function applyGrid() {
    document.body.classList.toggle('grid-on', gridOn);
    if (!gridOn) setMenu(false);
    layoutGrid();
}

document.getElementById('grid-btn').addEventListener('click', () => {
    gridOn = !gridOn;
    localStorage.setItem('gridOn', gridOn ? '1' : '0');
    applyGrid();
});

window.addEventListener('resize', layoutGrid);
// Clock widths change once a newly picked font finishes loading.
document.fonts.addEventListener('loadingdone', layoutGrid);

const cityList = document.getElementById('city-list');
cityList.style.setProperty('--menu-rows', Math.ceil(CITIES.length / 3));
const cityOptions = CITIES.map(entry => {
    const option = document.createElement('button');
    option.className = 'city-option';
    option.textContent = entry.city;
    option.addEventListener('click', () => toggleCity(entry));
    cityList.append(option);
    return option;
});

function markCities() {
    CITIES.forEach((entry, i) => cityOptions[i].classList.toggle('on', cities.includes(entry)));
}

function toggleCity(entry) {
    const current = cities[tzIndex];
    const i = cities.indexOf(entry);
    if (i >= 0) {
        if (cities.length === 1) return;
        cities.splice(i, 1);
    } else {
        cities.push(entry);
    }
    // Keep the single clock on the same city if it is still picked.
    tzIndex = Math.max(0, cities.indexOf(current));
    localStorage.setItem('cities', JSON.stringify(cities.map(c => c.city)));
    localStorage.setItem('tzIndex', tzIndex);
    markCities();
    buildGrid();
    showTime();
    layoutGrid();
}

function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
}

document.getElementById('city-btn').addEventListener('click', () => {
    setMenu(!document.body.classList.contains('menu-open'));
});
// Clicks outside can't close it: they land on the window drag area, not the page.
document.getElementById('left-controls').addEventListener('mouseleave', () => setMenu(false));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

markCities();
buildGrid();
showTime();
setInterval(showTime, 1000);
applyGrid();

function fillClock(clock, entry) {
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    if (entry) opts.timeZone = entry.tz;
    const parts = new Intl.DateTimeFormat('en-US', opts).formatToParts(new Date());
    const get = type => parts.find(p => p.type === type)?.value || '';
    clock.querySelector('.time_h').innerHTML = get('hour');
    clock.querySelector('.time_m').innerHTML = get('minute');
    clock.querySelector('.time_s').innerHTML = get('second');
    clock.querySelector('.am_pm').innerHTML = get('dayPeriod');
    clock.querySelector('.timezone').textContent = entry.city;

    const h = parseInt(get('hour')) % 12 + (get('dayPeriod') === 'PM' ? 12 : 0);
    const totalSeconds = h * 3600 + parseInt(get('minute')) * 60 + parseInt(get('second'));
    clock.querySelector('.day-progress-fill').style.width = (totalSeconds / 86400 * 100) + '%';
}

function showTime() {
    fillClock(mainClock, cities[tzIndex]);
    gridCells.forEach((cell, i) => fillClock(cell.firstChild, cities[i]));
}
