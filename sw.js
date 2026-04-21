const CACHE = 'chillax-v7';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icon.svg',
  'fonts/fonts.css',
  'fonts/bebasneue_v16_JTUSjIg69CK48gW7PXoo9Wdhyzbi.woff2',
  'fonts/bebasneue_v16_JTUSjIg69CK48gW7PXoo9Wlhyw.woff2',
  'fonts/cormorantgaramond_v21_co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6KnDOiss4.woff2',
  'fonts/cormorantgaramond_v21_co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6KnTOig.woff2',
  'fonts/cormorantgaramond_v21_co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6KnnOiss4.woff2',
  'fonts/cormorantgaramond_v21_co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6KnrOiss4.woff2',
  'fonts/cormorantgaramond_v21_co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6KnvOiss4.woff2',
  'fonts/dmserifdisplay_v17_-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0ujy.woff2',
  'fonts/dmserifdisplay_v17_-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2',
  'fonts/inconsolata_v37_QldKNThLqRwH-OJ1UHjlKGlW5qhWxg.woff2',
  'fonts/inconsolata_v37_QldKNThLqRwH-OJ1UHjlKGlX5qhWxg.woff2',
  'fonts/inconsolata_v37_QldKNThLqRwH-OJ1UHjlKGlZ5qg.woff2',
  'fonts/josefinsans_v34_Qw3aZQNVED7rKGKxtqIqX5EUA3x4RHw.woff2',
  'fonts/josefinsans_v34_Qw3aZQNVED7rKGKxtqIqX5EUAnx4RHw.woff2',
  'fonts/josefinsans_v34_Qw3aZQNVED7rKGKxtqIqX5EUDXx4.woff2',
  'fonts/majormonodisplay_v18_RWmVoLyb5fEqtsfBX9PDZIGr2tFubRh7A3eREnc.woff2',
  'fonts/majormonodisplay_v18_RWmVoLyb5fEqtsfBX9PDZIGr2tFubRh7AneREnc.woff2',
  'fonts/majormonodisplay_v18_RWmVoLyb5fEqtsfBX9PDZIGr2tFubRh7DXeR.woff2',
  'fonts/orbitron_v35_yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2',
  'fonts/oswald_v57_TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUJiZTaR.woff2',
  'fonts/oswald_v57_TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUZiZQ.woff2',
  'fonts/oswald_v57_TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUhiZTaR.woff2',
  'fonts/oswald_v57_TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUliZTaR.woff2',
  'fonts/oswald_v57_TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUtiZTaR.woff2',
  'fonts/playfairdisplay_v40_nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXt7A-W2r.woff2',
  'fonts/playfairdisplay_v40_nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-Q.woff2',
  'fonts/playfairdisplay_v40_nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtXA-W2r.woff2',
  'fonts/playfairdisplay_v40_nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXt_A-W2r.woff2',
  'fonts/poiretone_v18_UqyVK80NJXN4zfRgbdfbo55cVw.woff2',
  'fonts/poiretone_v18_UqyVK80NJXN4zfRgbdfbo5BcV_cx.woff2',
  'fonts/poiretone_v18_UqyVK80NJXN4zfRgbdfbo5pcV_cx.woff2',
  'fonts/raleway_v37_1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CFPrEHJA.woff2',
  'fonts/raleway_v37_1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CGPrEHJA.woff2',
  'fonts/raleway_v37_1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CHPrEHJA.woff2',
  'fonts/raleway_v37_1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrE.woff2',
  'fonts/raleway_v37_1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CMPrEHJA.woff2',
  'fonts/sharetechmono_v16_J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2',
  'fonts/syncopate_v24_pe0sMIuPIYBCpEV5eFdCBfe_.woff2',
  'fonts/syncopate_v24_pe0sMIuPIYBCpEV5eFdCC_e_O98.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
