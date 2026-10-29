/*
 * Little Sai and His Village of Love: shared site script (js/main.js)
 *
 * Does two things, each guarded so one failing can never break the other:
 *   1. Fills the live age pill   ([data-age-counter])
 *   2. Builds the timeline tree  ([data-tree]), edit TREE below to add branches
 *
 * Keep tracker / Apps Script code OUT of this file: every page on the site loads it.
 */
(function () {
  'use strict';

  // ---------- 1. Live age ----------
  // Sai's arrival, in Pacific time. Only used for the calculation; never displayed.
  var BORN = { y: 2026, m: 6, d: 12 }; // m is 1-12

  function plural(n, word) { return n + ' ' + word + (n === 1 ? '' : 's'); }

  function pacificToday() {
    try {
      var p = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' }).split('-').map(Number);
      if (p.length === 3 && !p.some(isNaN)) return { y: p[0], m: p[1], d: p[2] };
    } catch (e) { /* fall through to the device's own date */ }
    var n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
  }

  function ageText() {
    var t = pacificToday();
    var months = (t.y - BORN.y) * 12 + (t.m - BORN.m);
    var days = t.d - BORN.d;
    if (days < 0) {                        // borrow the length of last month
      months -= 1;
      days += new Date(t.y, t.m - 1, 0).getDate();
    }
    if (months < 0) return 'on his way';
    var parts = [];
    if (months >= 12) {
      parts.push(plural(Math.floor(months / 12), 'year'));
      if (months % 12) parts.push(plural(months % 12, 'month'));
    } else {
      if (months) parts.push(plural(months, 'month'));
      if (days) parts.push(plural(days, 'day'));
    }
    return parts.length ? parts.join(', ') + ' old' : 'just arrived';
  }

  function renderAge() {
    var els = document.querySelectorAll('[data-age-counter]');
    if (!els.length) return;
    var text = ageText();
    Array.prototype.forEach.call(els, function (el) {
      (el.querySelector('.age-counter__num') || el).textContent = text;
    });
  }

  // ---------- 2. The tree ----------
  // Oldest first. To add a branch, copy a line and fill it in.
  var TREE = [
    { when: 'Mid-June 2026', title: 'Sai arrives',
      text: 'The seed. Everything on this tree grows from here.' },
    { when: 'Month 1', title: 'The very beginning', href: 'videos.html',
      text: 'His first monthly video.' },
    { when: 'Month 2', title: 'Happy birthday daddy!', href: 'videos.html',
      text: 'The second monthly video.' },
    { when: 'Month 3', title: 'More of his cute smiles', href: 'videos.html',
      text: 'More of his cute smiles every day.' },
    { when: 'September 19, 2026', title: 'The first branch: Sai\u2019s 100 Days', href: 'event-100-days.html',
      text: 'At Maharaja in Downtown Issaquah: a red egg rolled over his feet, a cinnabar dot, and longevity noodles, with the village around him.' },
    { when: 'Month 4', title: 'Getting more curious', href: 'videos.html',
      text: 'Getting more curious about the world.' }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function nodeHtml(n) {
    var title = n.href ? '<a href="' + esc(n.href) + '">' + esc(n.title) + '</a>' : esc(n.title);
    return '<li class="tree__node">' +
      '<span class="tree__when" style="display:block; font-size:0.8rem; opacity:0.7; margin-bottom:2px;">' + esc(n.when) + '</span>' +
      '<h3 style="margin:0 0 6px;">' + title + '</h3>' +
      '<p style="margin:0;">' + esc(n.text) + '</p>' +
      '</li>';
  }

  function renderTree() {
    var lists = document.querySelectorAll('[data-tree]');
    if (!lists.length) return;
    var html = TREE.map(nodeHtml).join('');
    Array.prototype.forEach.call(lists, function (ul) { ul.innerHTML = html; });
  }

  // ---------- start ----------
  function safe(fn) {
    try { fn(); } catch (e) { if (window.console) console.error('[village] ' + fn.name + ' failed', e); }
  }

  function start() {
    safe(renderAge);
    safe(renderTree);
    setInterval(function () { safe(renderAge); }, 60 * 60 * 1000);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') safe(renderAge);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
