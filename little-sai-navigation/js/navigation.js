/* Little Sai Village — shared three-level sliding navigation. No dependencies. */
(function () {
  'use strict';
  if (window.__littleSaiNavLoaded) return;
  window.__littleSaiNavLoaded = true;
  var root = document.currentScript && document.currentScript.getAttribute('data-root') || './';
  var to = function (path) { return root + path; };
  var tree = [
    {title:'Utilities', chinese:'实用工具', subtitle:'Everyday care & helpful tools', children:[
      {title:'Nanny Guide', chinese:'保姆指南', href:'nanny.html', children:[
        {title:'Open full guide', href:'nanny.html'},
        {title:'Arrival & parking', href:'nanny.html#arrival'},
        {title:'Feeding', href:'nanny.html#feeding'},
        {title:'Sleep & wake windows', href:'nanny.html#sleep'},
        {title:'Diaper changes', href:'nanny.html#diapers'},
        {title:'Daily tasks', href:'nanny.html#tasks'}
      ]},
      {title:'First Foods', chinese:'辅食计划', href:'starting-solid.html', children:[
        {title:'Today’s meal', href:'starting-solid.html#today'},
        {title:'100-day plan', href:'starting-solid.html#plan'},
        {title:'Grocery lists', href:'starting-solid.html#grocery'},
        {title:'The book & guide', href:'starting-solid.html#guide'},
        {title:'Family settings', href:'starting-solid.html#settings'}
      ]},
      {title:'Baby Tracker', chinese:'成长记录', href:'tools/baby-tracker/', children:[
        {title:'Open tracker', href:'tools/baby-tracker/'}
      ]}
    ]},
    {title:'People', chinese:'我们爱的人', subtitle:'The people in Sai’s story', children:[
      {title:'Great-Grandpa Yin Xiuli', chinese:'祖外公殷修力', href:'great-grandpa-yin-xiuli-memorial.html', children:[
        {title:'His memorial & story', href:'great-grandpa-yin-xiuli-memorial.html'}
      ]}
    ]},
    {title:'Events', chinese:'重要日子', subtitle:'Gatherings & celebrations', children:[
      {title:'Sai’s 100 Days', chinese:'百日宴', href:'event-100-days.html', children:[
        {title:'Celebration details', href:'event-100-days.html'},
        {title:'All events', href:'events.html'}
      ]},
      {title:'All events', chinese:'活动总览', href:'events.html', children:[
        {title:'Browse celebrations', href:'events.html'}
      ]}
    ]},
    {title:'Memories', chinese:'成长记忆', subtitle:'Moments shared by the village', children:[
      {title:'Monthly Videos', chinese:'每月视频', href:'videos.html', children:[
        {title:'Watch monthly videos', href:'videos.html'}
      ]},
      {title:'Photos', chinese:'照片', href:'photos.html', children:[
        {title:'Open photos', href:'photos.html'}
      ]},
      {title:'Wishes', chinese:'祝福', href:'wishes.html', children:[
        {title:'Read & share wishes', href:'wishes.html'}
      ]}
    ]}
  ];
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = to('css/navigation.css');
  document.head.appendChild(style);
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function init() {
    var existing = document.querySelector('nav.site-nav');
    var customHead = document.querySelector('.site-head');
    var host = existing || customHead;
    var bar = el('nav','village-navigation');
    bar.setAttribute('aria-label','Main site navigation');
    var brand = el('a','village-navigation__brand');
    brand.href = to('index.html');
    brand.innerHTML = 'Little Sai <span>&amp; His Village of Love</span>';
    var button = el('button','village-navigation__trigger');
    button.type = 'button';
    button.setAttribute('aria-label','Open site menu');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-controls','village-menu');
    button.innerHTML = '<span class="village-navigation__hamburger" aria-hidden="true"><i></i><i></i><i></i></span><span>Explore</span>';
    bar.append(brand,button);
    if (host) host.replaceWith(bar);
    else document.body.insertBefore(bar,document.body.firstChild);
    var overlay = el('div','village-menu-overlay');
    overlay.hidden = true;
    var shade = el('button','village-menu-shade');
    shade.type = 'button';shade.setAttribute('aria-label','Close navigation menu');
    var panel = el('div','village-menu');
    panel.id='village-menu';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Explore Little Sai Village');
    var top = el('div','village-menu__top');
    var back = el('button','village-menu__back','← Back');back.type='button';back.setAttribute('aria-label','Go back one menu level');
    var trail = el('span','village-menu__trail','The Village');
    var close = el('button','village-menu__close','×');close.type='button';close.setAttribute('aria-label','Close navigation menu');
    top.append(back,trail,close);
    var viewport = el('div','village-menu__viewport');
    var track = el('div','village-menu__track');
    viewport.appendChild(track);panel.append(top,viewport);
    overlay.append(shade,panel);document.body.appendChild(overlay);
    var path = [], lastFocus = null, closeTimer = null;
    function page(title, subtitle, entries, level) {
      var frame = el('section','village-menu__page');
      frame.setAttribute('aria-label',title);
      var head=el('div','village-menu__page-head');
      head.append(el('span','village-menu__eyebrow','Little Sai · His Village of Love'),el('h2','',title));
      if(subtitle)head.append(el('p','',subtitle));
      frame.appendChild(head);
      var list=el('div','village-menu__list');
      entries.forEach(function(item,index){
        var expandable = !!(item.children && item.children.length);
        var row = el(expandable?'button':'a','village-menu__item');
        if(expandable){ row.type='button'; row.addEventListener('click',function(){path=path.slice(0,level);path.push(index);render();}); }
        else row.href = to(item.href);
        var copy=el('span','village-menu__item-copy');
        copy.append(el('strong','',item.title));
        if(item.chinese)copy.append(el('small','',item.chinese));
        row.append(copy,el('span','village-menu__arrow',expandable?'›':'↗'));
        list.appendChild(row);
      });
      frame.appendChild(list);
      if(level===0){
        var home=el('a','village-menu__home','← Back to homepage');home.href=to('index.html');frame.appendChild(home);
      }
      return frame;
    }
    function render(){
      var frames=[page('Explore the Village','Everything in Sai’s little world, in one place.',tree,0)];
      if(path.length>0){var group=tree[path[0]];frames.push(page(group.title,group.subtitle,group.children,1));}
      if(path.length>1){var leaf=tree[path[0]].children[path[1]];frames.push(page(leaf.title,leaf.chinese || 'Explore this part of Sai’s story',leaf.children,2));}
      track.replaceChildren.apply(track,frames);
      track.style.transform='translateX(-'+(path.length*100)+'%)';
      back.hidden=path.length===0;
      trail.textContent=path.length===0?'The Village':path.length===1?tree[path[0]].title:tree[path[0]].title+' / '+tree[path[0]].children[path[1]].title;
      viewport.scrollTop=0;
      var active=frames[frames.length-1];
      frames.forEach(function(f){var isActive=f===active;f.setAttribute('aria-hidden',String(!isActive));f.querySelectorAll('a, button').forEach(function(x){x.tabIndex=isActive?0:-1;});});
      requestAnimationFrame(function(){var b=active.querySelector('button, a');if(b && !overlay.hidden)b.focus({preventScroll:true});});
    }
    function open(){
      if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}
      lastFocus=document.activeElement;path=[];overlay.hidden=false;document.body.classList.add('village-menu-open');button.setAttribute('aria-expanded','true');render();
    }
    function closeMenu(){
      if(overlay.hidden)return;
      overlay.hidden=true;document.body.classList.remove('village-menu-open');button.setAttribute('aria-expanded','false');path=[];
      if(lastFocus && document.contains(lastFocus))lastFocus.focus();else button.focus();
    }
    button.addEventListener('click',open);
    close.addEventListener('click',closeMenu);
    shade.addEventListener('click',closeMenu);
    back.addEventListener('click',function(){if(path.length){path.pop();render();}else closeMenu();});
    panel.addEventListener('keydown',function(e){
      if(e.key==='Escape'){e.preventDefault();closeMenu();}
      if(e.key==='ArrowLeft' && path.length && e.target.tagName!=='INPUT'){e.preventDefault();path.pop();render();}
      if(e.key==='Tab'){
        var nodes=Array.from(panel.querySelectorAll('button:not([hidden]), a')).filter(function(x){return x.tabIndex!==-1 && x.getClientRects().length;});
        if(!nodes.length)return;
        var first=nodes[0],last=nodes[nodes.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
        if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    /* Existing First Foods tabs are SPA views: route deep links to the matching tab. */
    if(location.pathname.endsWith('/starting-solid.html')){
      function routeTab(){var tab=location.hash.slice(1);if(['today','plan','grocery','guide','settings'].indexOf(tab)>=0 && typeof window.switchTab==='function')window.switchTab(tab);}
      window.addEventListener('hashchange',routeTab);
      routeTab();
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
