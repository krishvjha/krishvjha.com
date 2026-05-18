/* ============================================================
   tracker.js — Visitor analytics + PIN-protected admin panel
   for krishvjha.com
   ------------------------------------------------------------
   To use: add <script src="tracker.js" defer></script>
           to the <head> of index.html (or any page).
   Open the admin panel by:
     • visiting /#admin
     • typing the word "admin" anywhere on the page
   ============================================================ */

(function () {
    'use strict';

    /* ───────── CONFIG ───────── */
    const ADMIN_PIN = '8392';
    const TRACKING_ENDPOINT = 'https://webhook.site/41dbbc37-7a29-4efc-bb51-7e99e5e7926c';
    const JSONBIN_ID  = '6a0b02c911c8435a0d443672';
    const JSONBIN_KEY = '$2a$10$DPG/uCkTB86fpdLSdON/m./DuzTppH/d8bm4K4b/hdKZU847SjIS2';
    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/' + JSONBIN_ID;

    /* ───────── INJECT STYLES ───────── */
    const styles = `
        .admin-overlay {
            position: fixed; inset: 0;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 10000;
            display: none;
            align-items: center; justify-content: center;
            padding: 24px;
            font-family: 'Inter', sans-serif;
        }
        .admin-overlay.active { display: flex; }
        .admin-card {
            background: #0f1419;
            border: 1px solid rgba(93, 224, 216, 0.2);
            border-radius: 16px;
            padding: 40px;
            width: 100%; max-width: 880px; max-height: 88vh;
            overflow: hidden;
            display: flex; flex-direction: column;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            color: #fff;
        }
        .admin-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 24px; flex-shrink: 0;
        }
        .admin-title {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            background: linear-gradient(135deg, #5de0d8, #4facfe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .admin-close {
            background: none; border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 28px; cursor: pointer; line-height: 1;
            transition: color 0.2s;
        }
        .admin-close:hover { color: #fff; }
        .admin-pin-wrap { text-align: center; padding: 40px 0; }
        .admin-pin-label {
            color: rgba(255, 255, 255, 0.6);
            font-size: 13px; letter-spacing: 3px; text-transform: uppercase;
            margin-bottom: 20px;
        }
        .admin-pin-inputs {
            display: flex; justify-content: center; gap: 12px; margin-bottom: 16px;
        }
        .admin-pin-input {
            width: 56px; height: 64px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.03);
            color: #fff;
            font-size: 28px; font-weight: 600; text-align: center;
            transition: border 0.2s, box-shadow 0.2s;
            font-family: inherit;
            -moz-appearance: textfield;
        }
        .admin-pin-input::-webkit-outer-spin-button,
        .admin-pin-input::-webkit-inner-spin-button {
            -webkit-appearance: none; margin: 0;
        }
        .admin-pin-input:focus {
            outline: none;
            border-color: #5de0d8;
            box-shadow: 0 0 0 3px rgba(93, 224, 216, 0.15);
        }
        .admin-pin-input.error {
            border-color: #ff6b6b;
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.15);
        }
        .admin-pin-msg {
            color: #ff6b6b; font-size: 13px;
            min-height: 18px; margin-top: 12px;
        }
        .admin-stats {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 16px; margin-bottom: 24px;
        }
        .admin-stat {
            background: rgba(93, 224, 216, 0.05);
            border: 1px solid rgba(93, 224, 216, 0.15);
            border-radius: 12px; padding: 16px; text-align: center;
        }
        .admin-stat-num {
            font-family: 'Playfair Display', serif;
            font-size: 32px; color: #5de0d8; line-height: 1;
        }
        .admin-stat-lbl {
            font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
            color: rgba(255, 255, 255, 0.5); margin-top: 6px;
        }
        .admin-toolbar {
            display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
        }
        .admin-btn {
            padding: 8px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            font-size: 12px; cursor: pointer;
            transition: all 0.2s; font-family: inherit;
        }
        .admin-btn:hover {
            background: rgba(93, 224, 216, 0.1);
            border-color: rgba(93, 224, 216, 0.3);
            color: #5de0d8;
        }
        .admin-btn.danger:hover {
            background: rgba(255, 107, 107, 0.1);
            border-color: rgba(255, 107, 107, 0.3);
            color: #ff6b6b;
        }
        .admin-table-wrap {
            flex: 1; overflow: auto;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.3);
        }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .admin-table th {
            text-align: left; padding: 12px 14px;
            background: rgba(255, 255, 255, 0.03);
            color: rgba(255, 255, 255, 0.5);
            font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
            font-size: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            position: sticky; top: 0;
            backdrop-filter: blur(10px);
        }
        .admin-table td {
            padding: 12px 14px;
            color: rgba(255, 255, 255, 0.85);
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .admin-table tr:hover td { background: rgba(93, 224, 216, 0.04); }
        .admin-empty {
            text-align: center; padding: 48px;
            color: rgba(255, 255, 255, 0.4); font-size: 14px;
        }
        .admin-hint {
            margin-top: 16px; font-size: 11px;
            color: rgba(255, 255, 255, 0.35);
            text-align: center; line-height: 1.6;
        }
        @media (max-width: 768px) {
            .admin-card { padding: 24px; }
            .admin-stats { grid-template-columns: 1fr; }
            .admin-pin-input { width: 48px; height: 56px; font-size: 22px; }
        }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    /* ───────── INJECT PANEL HTML ───────── */
    const panelHTML = `
        <div class="admin-overlay" id="admin-overlay">
            <div class="admin-card">
                <div class="admin-header">
                    <h2 class="admin-title">Visitor Analytics</h2>
                    <button class="admin-close" id="admin-close" aria-label="Close">&times;</button>
                </div>
                <div class="admin-pin-wrap" id="admin-pin-wrap">
                    <div class="admin-pin-label">Enter PIN</div>
                    <div class="admin-pin-inputs">
                        <input type="password" inputmode="numeric" maxlength="1" class="admin-pin-input" data-i="0">
                        <input type="password" inputmode="numeric" maxlength="1" class="admin-pin-input" data-i="1">
                        <input type="password" inputmode="numeric" maxlength="1" class="admin-pin-input" data-i="2">
                        <input type="password" inputmode="numeric" maxlength="1" class="admin-pin-input" data-i="3">
                    </div>
                    <div class="admin-pin-msg" id="admin-pin-msg"></div>
                </div>
                <div id="admin-dashboard" style="display:none; flex-direction:column; flex:1; overflow:hidden;">
                    <div class="admin-stats">
                        <div class="admin-stat"><div class="admin-stat-num" id="stat-total">0</div><div class="admin-stat-lbl">Total Visits</div></div>
                        <div class="admin-stat"><div class="admin-stat-num" id="stat-unique">0</div><div class="admin-stat-lbl">Unique Visitors</div></div>
                        <div class="admin-stat"><div class="admin-stat-num" id="stat-avg">0s</div><div class="admin-stat-lbl">Avg. Time</div></div>
                    </div>
                    <div class="admin-toolbar">
                        <button class="admin-btn" id="admin-refresh">Refresh</button>
                        <button class="admin-btn" id="admin-export">Export CSV</button>
                        <button class="admin-btn danger" id="admin-clear">Clear all</button>
                    </div>
                    <div class="admin-table-wrap">
                        <table class="admin-table">
                            <thead><tr>
                                <th>When</th><th>Location</th><th>Device</th>
                                <th>Browser</th><th>Referrer</th><th>Time on site</th>
                            </tr></thead>
                            <tbody id="admin-tbody"></tbody>
                        </table>
                    </div>
                    <div class="admin-hint">Loading…</div>
                </div>
            </div>
        </div>
    `;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = panelHTML;
    document.body.appendChild(wrapper.firstElementChild);

    /* ───────── VISITOR TRACKING ───────── */
    function detectBrowser(ua) {
        if (/Edg\//.test(ua)) return 'Edge';
        if (/OPR\//.test(ua)) return 'Opera';
        if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'Chrome';
        if (/Firefox\//.test(ua)) return 'Firefox';
        if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
        return 'Other';
    }
    function detectOS(ua) {
        if (/Windows/.test(ua)) return 'Windows';
        if (/Mac OS X/.test(ua)) return 'macOS';
        if (/Android/.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
        if (/Linux/.test(ua)) return 'Linux';
        return 'Unknown';
    }
    function detectDevice(ua) {
        if (/iPad|Tablet/.test(ua)) return 'Tablet';
        if (/Mobile|iPhone|Android.*Mobile/.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    // Stable per-browser visitor id
    let visitorId = localStorage.getItem('kj_visitor_id');
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
        localStorage.setItem('kj_visitor_id', visitorId);
    }

    const visitStart = Date.now();
    const ua = navigator.userAgent;
    const visit = {
        id: 'visit_' + visitStart.toString(36) + Math.random().toString(36).slice(2, 6),
        visitorId,
        timestamp: new Date().toISOString(),
        browser: detectBrowser(ua),
        os: detectOS(ua),
        device: detectDevice(ua),
        screen: window.screen.width + 'x' + window.screen.height,
        language: navigator.language || 'unknown',
        referrer: document.referrer || 'direct',
        country: '?',
        city: '?',
        durationSec: 0
    };

    function loadLocalVisits() {
        try { return JSON.parse(localStorage.getItem('kj_visits') || '[]'); } catch { return []; }
    }
    function saveLocalVisits(arr) {
        localStorage.setItem('kj_visits', JSON.stringify(arr));
    }

    // Save locally immediately
    const localVisits = loadLocalVisits();
    localVisits.push(visit);
    saveLocalVisits(localVisits);

    function sendToTracker(payload) {
        if (!TRACKING_ENDPOINT) return;
        fetch(TRACKING_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(() => {});
    }

    /* ───────── JSONBIN HELPERS ───────── */
    async function jsonbinFetch() {
        try {
            const res = await fetch(JSONBIN_URL + '/latest', {
                headers: { 'X-Access-Key': JSONBIN_KEY, 'X-Master-Key': JSONBIN_KEY }
            });
            if (!res.ok) throw new Error('GET ' + res.status);
            const data = await res.json();
            return (data && data.record && Array.isArray(data.record.visits)) ? data.record.visits : [];
        } catch (e) {
            console.warn('[tracker] JSONBin read failed:', e);
            return null;
        }
    }
    async function jsonbinWrite(visits, opts) {
        opts = opts || {};
        try {
            await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Key': JSONBIN_KEY,
                    'X-Master-Key': JSONBIN_KEY
                },
                body: JSON.stringify({ visits: visits.slice(-500) }),
                keepalive: !!opts.keepalive
            });
        } catch (e) {
            console.warn('[tracker] JSONBin write failed:', e);
        }
    }
    async function jsonbinUpsertVisit(v) {
        const remote = await jsonbinFetch();
        if (remote === null) return;
        const idx = remote.findIndex(r => r.id === v.id);
        if (idx >= 0) remote[idx] = v; else remote.push(v);
        await jsonbinWrite(remote);
    }

    /* ───────── KICK OFF VISIT RECORDING ───────── */
    fetch('https://ipapi.co/json/').then(r => r.json()).then(geo => {
        if (geo && geo.country_name) {
            visit.country = geo.country_name;
            visit.city = geo.city || '?';
            visit.region = geo.region || '';
            visit.ip = geo.ip || '';
            const all = loadLocalVisits();
            const i = all.findIndex(v => v.id === visit.id);
            if (i >= 0) { all[i] = visit; saveLocalVisits(all); }
        }
        sendToTracker({ event: 'visit_started', ...visit });
        jsonbinUpsertVisit(visit);
    }).catch(() => {
        sendToTracker({ event: 'visit_started', ...visit });
        jsonbinUpsertVisit(visit);
    });

    /* ───────── DURATION TRACKING ───────── */
    let totalActiveMs = 0;
    let lastActiveAt = Date.now();
    let isVisible = !document.hidden;

    function flushDuration() {
        if (isVisible) {
            totalActiveMs += Date.now() - lastActiveAt;
            lastActiveAt = Date.now();
        }
        visit.durationSec = Math.round(totalActiveMs / 1000);
        const all = loadLocalVisits();
        const i = all.findIndex(v => v.id === visit.id);
        if (i >= 0) { all[i] = visit; saveLocalVisits(all); }
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { flushDuration(); isVisible = false; }
        else { lastActiveAt = Date.now(); isVisible = true; }
    });

    setInterval(flushDuration, 5000);
    setInterval(() => {
        if (!document.hidden && visit.durationSec > 0) jsonbinUpsertVisit(visit);
    }, 30000);

    window.addEventListener('beforeunload', () => {
        flushDuration();
        if (TRACKING_ENDPOINT) {
            try {
                const body = JSON.stringify({ event: 'visit_ended', ...visit });
                navigator.sendBeacon(TRACKING_ENDPOINT, new Blob([body], { type: 'application/json' }));
            } catch {}
        }
        try {
            fetch(JSONBIN_URL + '/latest', {
                headers: { 'X-Access-Key': JSONBIN_KEY, 'X-Master-Key': JSONBIN_KEY },
                keepalive: true
            }).then(r => r.json()).then(data => {
                const remote = (data && data.record && Array.isArray(data.record.visits)) ? data.record.visits : [];
                const idx = remote.findIndex(r => r.id === visit.id);
                if (idx >= 0) remote[idx] = visit; else remote.push(visit);
                return fetch(JSONBIN_URL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Access-Key': JSONBIN_KEY,
                        'X-Master-Key': JSONBIN_KEY
                    },
                    body: JSON.stringify({ visits: remote.slice(-500) }),
                    keepalive: true
                });
            }).catch(() => {});
        } catch {}
    });

    /* ───────── ADMIN PANEL LOGIC ───────── */
    const adminOverlay = document.getElementById('admin-overlay');
    const adminPinWrap = document.getElementById('admin-pin-wrap');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminPinMsg = document.getElementById('admin-pin-msg');
    const pinInputs = document.querySelectorAll('.admin-pin-input');

    function openAdmin() {
        adminOverlay.classList.add('active');
        adminPinWrap.style.display = 'block';
        adminDashboard.style.display = 'none';
        pinInputs.forEach(p => { p.value = ''; p.classList.remove('error'); });
        adminPinMsg.textContent = '';
        setTimeout(() => pinInputs[0].focus(), 50);
    }
    function closeAdmin() { adminOverlay.classList.remove('active'); }

    document.getElementById('admin-close').addEventListener('click', closeAdmin);
    adminOverlay.addEventListener('click', e => { if (e.target === adminOverlay) closeAdmin(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAdmin(); });

    pinInputs.forEach((inp, idx) => {
        inp.addEventListener('input', () => {
            inp.value = inp.value.replace(/\D/g, '').slice(0, 1);
            if (inp.value && idx < pinInputs.length - 1) pinInputs[idx + 1].focus();
            const full = Array.from(pinInputs).map(p => p.value).join('');
            if (full.length === 4) checkPin(full);
        });
        inp.addEventListener('keydown', e => {
            if (e.key === 'Backspace' && !inp.value && idx > 0) pinInputs[idx - 1].focus();
        });
    });

    function checkPin(pin) {
        if (pin === ADMIN_PIN) {
            adminPinWrap.style.display = 'none';
            adminDashboard.style.display = 'flex';
            renderDashboard();
        } else {
            pinInputs.forEach(p => p.classList.add('error'));
            adminPinMsg.textContent = 'Incorrect PIN';
            setTimeout(() => {
                pinInputs.forEach(p => { p.value = ''; p.classList.remove('error'); });
                pinInputs[0].focus();
                adminPinMsg.textContent = '';
            }, 800);
        }
    }

    function fmtTime(iso) {
        const d = new Date(iso);
        const diff = (Date.now() - d.getTime()) / 1000;
        if (diff < 60) return Math.floor(diff) + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return d.toLocaleString();
    }
    function fmtDur(s) {
        if (s < 60) return s + 's';
        const m = Math.floor(s / 60), r = s % 60;
        return m + 'm ' + r + 's';
    }
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    async function renderDashboard() {
        const tbody = document.getElementById('admin-tbody');
        tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty">Loading from cloud…</div></td></tr>';

        let data = await jsonbinFetch();
        let source = 'cloud';
        if (data === null) { data = loadLocalVisits(); source = 'local'; }
        data = data.slice().reverse();

        document.getElementById('stat-total').textContent = data.length;
        document.getElementById('stat-unique').textContent = new Set(data.map(v => v.visitorId)).size;
        const avg = data.length ? Math.round(data.reduce((s, v) => s + (v.durationSec || 0), 0) / data.length) : 0;
        document.getElementById('stat-avg').textContent = fmtDur(avg);

        if (!data.length) {
            tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty">No visits recorded yet. Visit your site from another browser/incognito to test.</div></td></tr>';
        } else {
            tbody.innerHTML = data.map(v => `
                <tr>
                    <td>${escapeHtml(fmtTime(v.timestamp))}</td>
                    <td>${escapeHtml((v.city || '?') + ', ' + (v.country || '?'))}</td>
                    <td>${escapeHtml((v.device || '?') + ' · ' + (v.os || '?'))}</td>
                    <td>${escapeHtml(v.browser || '?')}</td>
                    <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(v.referrer || '')}">${escapeHtml(v.referrer || 'direct')}</td>
                    <td>${escapeHtml(fmtDur(v.durationSec || 0))}</td>
                </tr>
            `).join('');
        }

        const hintEl = document.querySelector('.admin-hint');
        if (hintEl) {
            hintEl.innerHTML = source === 'cloud'
                ? 'Data loaded from <strong style="color:#5de0d8;">JSONBin cloud</strong> — visits from all browsers worldwide.'
                : '<strong style="color:#ff9c5d;">Could not reach JSONBin</strong> — showing local visits only.';
        }
    }

    document.getElementById('admin-refresh').addEventListener('click', renderDashboard);
    document.getElementById('admin-clear').addEventListener('click', async () => {
        if (confirm('Delete ALL recorded visits (cloud + local)? This cannot be undone.')) {
            localStorage.removeItem('kj_visits');
            await jsonbinWrite([]);
            renderDashboard();
        }
    });
    document.getElementById('admin-export').addEventListener('click', async () => {
        const data = (await jsonbinFetch()) || loadLocalVisits();
        const cols = ['timestamp','visitorId','country','city','device','os','browser','language','screen','referrer','durationSec'];
        const csv = [cols.join(',')].concat(
            data.map(v => cols.map(c => JSON.stringify(v[c] || '')).join(','))
        ).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'visits-' + new Date().toISOString().slice(0,10) + '.csv';
        a.click();
    });

    /* ───────── PANEL TRIGGERS ───────── */
    if (window.location.hash === '#admin') openAdmin();
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#admin') openAdmin();
    });

    let typedBuffer = '';
    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        typedBuffer = (typedBuffer + e.key).slice(-5).toLowerCase();
        if (typedBuffer.endsWith('admin')) openAdmin();
    });
})();
