/* ============================================================
   Icônes de services — style trait fin, cohérent avec le site
   ============================================================ */
export const SERVICE_ICONS = {
  bathtub:
    '<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"/><path d="M4 12V8a2 2 0 0 1 2-2c1 0 1.5.6 1.5 1.5"/><line x1="7" y1="20" x2="7" y2="22"/><line x1="17" y1="20" x2="17" y2="22"/>',
  tv: '<rect x="3" y="5" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/>',
  wifi:
    '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 15.8a5.5 5.5 0 0 1 7 0"/><path d="M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
  airwrap:
    '<path d="M3 9a5 5 0 0 1 5-5h5a5 5 0 0 1 0 10H9"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/><path d="M9 14v6"/><path d="M6 20h6"/>',
  snowflake:
    '<line x1="12" y1="2" x2="12" y2="22"/><line x1="4.5" y1="6" x2="19.5" y2="18"/><line x1="19.5" y1="6" x2="4.5" y2="18"/><path d="M12 4.5L10 6.5"/><path d="M12 4.5L14 6.5"/><path d="M12 19.5L10 17.5"/><path d="M12 19.5L14 17.5"/>',
  minibar:
    '<path d="M8 3h8l-1 6a3 3 0 0 1-3 3 3 3 0 0 1-3-3L8 3z"/><line x1="12" y1="12" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/>',
  sauna:
    '<path d="M12 2c2 3 1 5-.5 6.5C10 10 9 11.5 9 13.5A3 3 0 0 0 12 16.5 3 3 0 0 0 15 13.5c0-1-.3-1.8-1-2.5"/><path d="M8 15a5 5 0 0 0 8 4 5 5 0 0 0 1.5-6.5"/>',
  hammam: '<path d="M12 3c2 3 5 6 5 10a5 5 0 0 1-10 0c0-4 3-7 5-10z"/>',
  pool:
    '<path d="M2 8c1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0"/><path d="M2 14c1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0"/><path d="M2 20c1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0 1.2-1 2.5-1 3.7 0 1.2 1 2.5 1 3.7 0"/>',
  terrace:
    '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"/>',
  coffee:
    '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v7a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="5"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="14" y1="2" x2="14" y2="5"/>',
  lounge:
    '<path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 11h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z"/><line x1="5" y1="17" x2="5" y2="20"/><line x1="19" y1="17" x2="19" y2="20"/>',
}

export function serviceIconSvg(key) {
  const paths = SERVICE_ICONS[key] || ''
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`
}
