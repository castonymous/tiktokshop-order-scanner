function cleanUsername(username) { return (username || '').replace(/\./g, ''); }
function lastOrderId5(orderId) { const str = (orderId || '').trim(); return str.slice(-5); }
function copyText(text) { navigator.clipboard.writeText(text || ''); }
function qText(el, sel) { const n = el ? el.querySelector(sel) : null; return (n ? n.textContent : '').trim(); }

const STATUS_SEL  = '.zlSPumFkvZW6Bo9bdYu9, .pulse-overflow-text-single';
const CATatan_SEL = '[data-tid="m4b_overflow_text"].pulse-overflow-text-multiply, .pulse-overflow-text-multiply';

function getStatusClass(status) {
  switch ((status || '').toLowerCase()) {
    case 'dibatalkan': return 'tos-status-cancel';
    case 'menunggu diproses': return 'tos-status-pending';
    case 'sedang dikirim': return 'tos-status-shipping';
    case 'menunggu pickup': return 'tos-status-pickup';
    case 'selesai': return 'tos-status-done';
    default: return 'tos-status-default';
  }
}

function findNearestStatus(orderIdEl) {
  let el = orderIdEl;
  for (let hops = 0; el && hops < 6; hops++, el = el.parentElement) {
    const found = el.querySelector(STATUS_SEL);
    if (found) return found.textContent.trim();
  }
  const container = orderIdEl.parentElement;
  if (container && container.parentElement) {
    let sib = container.nextElementSibling;
    for (let i = 0; sib && i < 8; i++, sib = sib.nextElementSibling) {
      const found2 = sib.querySelector(STATUS_SEL) || (sib.matches(STATUS_SEL) ? sib : null);
      if (found2) return (found2.textContent || '').trim();
    }
  }
  const allStatus = Array.from(document.querySelectorAll(STATUS_SEL));
  const allOrder = Array.from(document.querySelectorAll('.VwXwEtYfZtpyUUSmErsw span'));
  const idx = allOrder.indexOf(orderIdEl);
  if (idx >= 0 && idx < allStatus.length) { return (allStatus[idx].textContent || '').trim(); }
  return '';
}

function findNearestCatatan(orderIdEl) {
  let el = orderIdEl;
  for (let hops = 0; el && hops < 6; hops++, el = el.parentElement) {
    const found = el.querySelector(CATatan_SEL);
    if (found) return found.textContent.trim();
  }
  const container = orderIdEl.parentElement;
  if (container && container.parentElement) {
    let sib = container.nextElementSibling;
    for (let i = 0; sib && i < 10; i++, sib = sib.nextElementSibling) {
      const found2 = sib.querySelector(CATatan_SEL) || (sib.matches(CATatan_SEL) ? sib : null);
      if (found2) return (found2.textContent || '').trim();
    }
  }
  const allNotes = Array.from(document.querySelectorAll(CATatan_SEL));
  const allOrder = Array.from(document.querySelectorAll('.VwXwEtYfZtpyUUSmErsw span'));
  const idx = allOrder.indexOf(orderIdEl);
  if (idx >= 0 && idx < allNotes.length) { return (allNotes[idx].textContent || '').trim(); }
  return '';
}

function findOrderContainer(orderIdEl) {
  let el = orderIdEl; let hops = 0;
  while (el && hops < 8) {
    const hasTanggal = el.querySelector('.yORCgx3HUgbxX1Ms0aOW');
    if (hasTanggal) return el;
    el = el.parentElement; hops++;
  }
  return orderIdEl.parentElement || orderIdEl;
}

function scanOrders() {
  const usernameGlobal = document.querySelector('.a4C3AoFqPE0aPQ6vnFx0');
  const usernameFromPage = cleanUsername(usernameGlobal ? usernameGlobal.textContent.trim() : '');
  const orderIdSpans = Array.from(document.querySelectorAll('.VwXwEtYfZtpyUUSmErsw span'));
  const rawOrders = [];
  for (const span of orderIdSpans) {
    const container = findOrderContainer(span);
    const tanggal  = qText(container, '.yORCgx3HUgbxX1Ms0aOW');
    const orderId  = (span.textContent || '').trim();
    const status   = findNearestStatus(span);
    const catatan  = findNearestCatatan(span);
    rawOrders.push({ tanggal, username: usernameFromPage, orderId, catatan, status });
  }
  const byId = new Map();
  for (const o of rawOrders) {
    const key = o.orderId || '';
    if (!key) continue;
    if (!byId.has(key)) { byId.set(key, o); }
    else {
      const t = byId.get(key);
      t.tanggal = t.tanggal || o.tanggal;
      t.catatan = t.catatan || o.catatan;
      t.status  = t.status  || o.status;
      byId.set(key, t);
    }
  }
  return Array.from(byId.values());
}

function renderOrders(orders) {
  let container = document.getElementById('tiktok-order-scanner');
  if (!container) { container = document.createElement('div'); container.id = 'tiktok-order-scanner'; document.body.appendChild(container); }
  container.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'tos-header';
  header.innerHTML = `
    <div class="tos-title-wrap"><div class="tos-title">TikTok Shop</div>
    <div class="tos-username">${orders[0] ? orders[0].username : ''}</div></div>
    <div><button class="tos-toggle" title="Collapse">▲</button>
    <button class="tos-toggle" title="Debug" id="tos-debug">?</button></div>`;
  container.appendChild(header);
  const body = document.createElement('div'); body.className = 'tos-body'; container.appendChild(body);
  const toggleBtn = header.querySelector('.tos-toggle');
  toggleBtn.addEventListener('click', () => {
    const collapsed = container.classList.toggle('tos-collapsed');
    toggleBtn.textContent = collapsed ? '▼' : '▲';
  });
  header.querySelector('#tos-debug').addEventListener('click', () => { console.table(orders); });
  orders.forEach((order) => {
    const usernameClean = order.username; const last5 = lastOrderId5(order.orderId);
    const btn1 = `${usernameClean} ${last5}`;
    const btn2 = `${usernameClean} ${last5}\n\n${order.tanggal}\n${order.orderId}\n${usernameClean}`;
    const btn3 = `${order.status}\n${order.tanggal}\n${order.orderId}\n${usernameClean}`;
    const btn4 = order.catatan || '';
    const box = document.createElement('div'); box.className = 'tos-order-box';
    box.innerHTML = `
      <div class="tos-status-bar ${getStatusClass(order.status)}">${order.status || 'STATUS'}</div>
      <div class="tos-order-info">
        <div class="tos-row"><span class="tos-k">Tanggal</span><span class="tos-v">${order.tanggal || '-'}</span></div>
        <div class="tos-row"><span class="tos-k">Order ID</span><span class="tos-v">${order.orderId || '-'}</span></div>
        <div class="tos-row"><span class="tos-k">Username</span><span class="tos-v">${usernameClean || '-'}</span></div>
        <div class="tos-row"><span class="tos-k">Catatan</span><span class="tos-v">${btn4 || '-'}</span></div>
      </div>
      <div class="tos-copy-buttons">
        <button class="tos-copy-btn" data-num="1"></button>
        <button class="tos-copy-btn" data-num="2"></button>
        <button class="tos-copy-btn" data-num="3"></button>
        <button class="tos-copy-btn" data-num="4"></button>
      </div>`;
    body.appendChild(box);
    const btns = box.querySelectorAll('.tos-copy-btn'); const payloads = [btn1, btn2, btn3, btn4];
    btns.forEach((b, i) => { b.textContent = b.getAttribute('data-num'); b.title = `Copy ${b.textContent}`;
      b.addEventListener('click', () => { navigator.clipboard.writeText(payloads[i] || ''); const old = b.textContent;
        b.textContent = '✔'; setTimeout(() => b.textContent = old, 700); }); });
  });
}

let lastRenderKey = '';
function refreshIfChanged() { const orders = scanOrders(); const key = JSON.stringify(orders);
  if (key !== lastRenderKey) { lastRenderKey = key; renderOrders(orders); } }
function startObservers() { const obs = new MutationObserver(() => refreshIfChanged());
  obs.observe(document.documentElement, { childList: true, subtree: true }); setInterval(refreshIfChanged, 2000); }
window.addEventListener('load', () => { refreshIfChanged(); startObservers(); });