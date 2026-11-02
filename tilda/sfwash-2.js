
/* SF Wash — общий скрипт сайта (v2) */
(function () {
  'use strict';

  /* ===== 1. Контакты ===== */
  var SF = window.SF = {
    phone: '+7 (900) 990-24-24',
    phoneHref: 'tel:+79009902424',
    tg: 'https://t.me/sfwash',
    max: 'https://max.ru/u/f9LHodD0cOLB5k7YNMhze-McfrvaezyHvN5QjLgtwCglrTCfZ6ix05x9pig',
    vk: 'https://vk.ru/sfwash',
    gplay: 'https://play.google.com/store/apps/details?id=me.rocketsoft.rocketwash.individual.sfwash&hl=ru',
    appstore: 'https://apps.apple.com/ru/app/sf-wash/id6745258881',
    maps: 'https://yandex.ru/maps/org/sf_wash/30212913396/',
    reviews: 'https://yandex.ru/maps/org/sf_wash/30212913396/reviews/',
    navi: 'https://yandex.ru/navi/?whatshere%5Bpoint%5D=28.295432%2C57.830911&whatshere%5Bzoom%5D=17',
    gis: 'https://2gis.ru/pskov/search/SF%20Wash',
    endpoint: '' // заявки: при переносе в Tilda формы подключаются к amoCRM штатно
  };

  /* ===== 2. Фото. Файлы кладём в assets/photos/, имя слота = имя файла.
     Пока файла нет, показывается тёмная подложка. ===== */
  var PHOTOS = window.SF_PHOTOS || {};

  /* ===== 3. Услуги (прайс SF Wash; цены: седан / кроссовер / джип) ===== */
  var SERVICES = [
    {id:'light', cat:'wash', catName:'Детейлинг-мойка', name:'Детейлинг-мойка LIGHT', d:'Чистый кузов и салон: влажная уборка, двухфазная мойка, ковры, пылесос и стёкла.', time:'60–80 мин', p:[3000,3600,4000]},
    {id:'optimum', cat:'wash', catName:'Детейлинг-мойка', name:'Детейлинг-мойка OPTIMUM', d:'Плюс багажник, антибитум и кварц: кузов блестит и дольше остаётся чистым.', time:'80–110 мин', p:[4800,5700,6400], hit:1},
    {id:'premium', cat:'wash', catName:'Детейлинг-мойка', name:'Детейлинг-мойка PREMIUM', d:'Полный уход: химчистка дисков, проёмов и резины, кондиционер кожи, полироль пластика.', time:'120–140 мин', p:[7800,9300,10200]},
    {id:'unlim', cat:'wash', catName:'Детейлинг-мойка', name:'Безлимитная детейлинг-мойка', d:'Приезжайте сколько нужно в течение месяца. Кузов и салон, кварц включён.', time:'абонемент на месяц', p:[8990,9990,11490], per:'/мес', hit:1},
    {id:'engine', cat:'wash', catName:'Детейлинг-мойка', name:'Детейлинг-мойка двигателя', d:'Мотор остывает, клеммы защищаем диэлектриком, моем без высокого давления и консервируем.', time:'2,5–4,5 часа', p:[2650,2650,2650]},
    {id:'discs', cat:'wash', catName:'Детейлинг-мойка', name:'Чистка дисков', d:'Диски без колодочной пыли и рыжего налёта. Цена за 1 диск.', time:'за 1 диск', p:[300,300,300]},
    {id:'fary', cat:'protect', catName:'Защита плёнкой', name:'Защита фар плёнкой', d:'Фары не мутнеют от песка и не ловят сколы. Для новых машин — бесплатно.', time:'≈ 1 час', p:[8000,8900,10300], free:1},
    {id:'zones', cat:'protect', catName:'Защита плёнкой', name:'Оклейка зон риска', d:'Капот, бампер, фары и пороги без сколов — лак остаётся заводским.', time:'1,5 дня', p:[90000,100000,119000], hit:1},
    {id:'full', cat:'protect', catName:'Защита плёнкой', name:'Полная оклейка кузова', d:'Весь кузов под плёнкой: цвет и лак как в день покупки.', time:'≈ 4 дня', p:[270000,300000,355000]},
    {id:'rear', cat:'protect', catName:'Защита плёнкой', name:'Защита задних фонарей', d:'Фонари без царапин и сколов.', time:'≈ 1 час', p:[8000,8900,10300]},
    {id:'ceramic', cat:'polish', catName:'Керамика и полировка', name:'Керамика кузова', d:'Грязь и реагенты не прилипают к лаку — машина дольше чистая и блестит.', time:'от 1 дня', p:[11100,12800,14500], hit:1},
    {id:'polish', cat:'polish', catName:'Керамика и полировка', name:'Полировка кузова', d:'Без мелких царапин и кругов от мойки. Глубокий цвет, как у новой.', time:'от 1 дня', p:[22300,25600,28900]},
    {id:'polfar', cat:'polish', catName:'Керамика и полировка', name:'Полировка фар', d:'Прозрачные фары и яркий свет вместо мутного пластика.', time:'≈ 1 час', p:[2300,2300,2300]},
    {id:'glass', cat:'polish', catName:'Керамика и полировка', name:'Антидождь на стёкла', d:'Дождь скатывается с лобового — обзор лучше даже в ливень.', time:'≈ 1 час', p:[3000,3000,3000]},
    {id:'chip', cat:'polish', catName:'Керамика и полировка', name:'Ремонт скола на лобовом', d:'Скол не превратится в трещину, стекло менять не придётся.', time:'≈ 1 час', p:[3150,3150,3150]},
    {id:'himch', cat:'salon', catName:'Салон', name:'Химчистка салона', d:'Чистый салон без пятен и запахов. Если пятно проявится в течение 48 часов — уберём бесплатно.', time:'1 день', p:[18000,20500,22800], hit:1},
    {id:'bodyclean', cat:'salon', catName:'Кузов', name:'Очистка кузова от металла', d:'Кузов без рыжих точек: удаляем металлические вкрапления.', time:'≈ 20 мин', p:[1350,1500,1700]},
    {id:'bitum', cat:'salon', catName:'Кузов', name:'Удаление битума', d:'Кузов без чёрных точек после дороги, лак не страдает.', time:'≈ 15 мин', p:[1000,1200,1350]},
    {id:'noise', cat:'noise', catName:'Шумоизоляция', name:'Комплексная шумоизоляция', d:'Тише дорога и меньше вибраций. Можно сделать за один заезд с оклейкой.', time:'по согласованию', p:[180000,180000,180000]},
    {id:'nfloor', cat:'noise', catName:'Шумоизоляция', name:'Шумоизоляция пола', d:'Меньше гула от дороги через днище.', time:'по согласованию', p:[50000,50000,50000]},
    {id:'ntrunk', cat:'noise', catName:'Шумоизоляция', name:'Багажник и арки', d:'Тише в задней части салона, меньше шума от колёс.', time:'по согласованию', p:[38900,38900,38900]},
    {id:'ndoor', cat:'noise', catName:'Шумоизоляция', name:'Шумоизоляция дверей', d:'Двери закрываются глуше, музыка звучит чище.', time:'по согласованию', p:[33350,37800,null]}
  ];
  SF.services = SERVICES;
  var cls = 0;
  try { cls = +(localStorage.getItem('sf_cls') || 0); } catch (e) {}

  var I = {
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  var CAT_ICON = {
    wash:'<path d="M24 8s-10 11.5-10 18a10 10 0 0 0 20 0C34 19.5 24 8 24 8z"/><path d="M19 27a5 5 0 0 0 5 5"/>',
    protect:'<path d="M24 7l14 5v10c0 9-6 15.5-14 19-8-3.5-14-10-14-19V12z"/><path d="M18 24l4.5 4.5L31 20"/>',
    polish:'<path d="M24 8l2.6 8.4L35 19l-8.4 2.6L24 30l-2.6-8.4L13 19l8.4-2.6z"/><path d="M35 30l1.2 3.8L40 35l-3.8 1.2L35 40l-1.2-3.8L30 35l3.8-1.2z"/>',
    salon:'<path d="M16 8h10l-2 18h11l2 14H13l3-14h8"/>',
    noise:'<path d="M10 20v8h6l9 7V13l-9 7z"/><path d="M31 19c2 3 2 7 0 10M36 15c4 5 4 13 0 18"/>'
  };
  function catIcon(c) { return '<svg class="svc-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (CAT_ICON[c] || '') + '</svg>'; }
  function fmt(n) { return n == null ? 'по запросу' : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'; }
  SF.fmt = fmt;

  /* ===== 4. Карточки услуг ===== */
  function priceHtml(s) {
    var v = s.p[cls];
    if (s.free) return '<s>' + fmt(v) + '</s><span class="free">0 ₽</span>';
    return v == null ? 'по запросу' : '<small>от</small>' + fmt(v) + (s.per ? '<small>' + s.per + '</small>' : '');
  }
  function card(s) {
    var badge = s.hit ? '<span class="badge badge--hit">Хит</span>' : (s.free ? '<span class="badge badge--free">0 ₽ новым авто</span>' : '');
    return '<article class="svc' + (s.hit ? ' is-hit' : '') + '">' +
      '<div class="svc-top"><span class="svc-cat">' + s.catName + '</span>' + badge + '</div>' +
      catIcon(s.cat) + '<h3>' + s.name + '</h3><p>' + s.d + '</p>' +
      '<div class="svc-foot"><div><div class="time">' + s.time + '</div><div class="price" data-price="' + s.id + '">' + priceHtml(s) + '</div></div>' +
      '<button class="svc-add" data-open="lead" data-service="' + s.name + '" aria-label="Записаться: ' + s.name + '">' + I.arrow + '</button></div></article>';
  }
  function byIds(ids) { return ids.split(',').map(function (id) { return SERVICES.find(function (s) { return s.id === id; }); }).filter(Boolean); }
  function renderGrids() {
    document.querySelectorAll('[data-services]').forEach(function (g) { g.innerHTML = byIds(g.getAttribute('data-services')).map(card).join(''); });
    document.querySelectorAll('[data-cat]').forEach(function (g) {
      var c = g.getAttribute('data-cat').split(',');
      g.innerHTML = SERVICES.filter(function (s) { return c.indexOf(s.cat) > -1; }).map(card).join('');
    });
    document.querySelectorAll('[data-ptable]').forEach(function (t) {
      var cats = t.getAttribute('data-ptable').split(',');
      var rows = SERVICES.filter(function (s) { return cats.indexOf(s.cat) > -1; }).map(function (s) {
        var c = function (v) { return '<td class="n">' + (v == null ? 'по запросу' : 'от ' + fmt(v) + (s.per || '')) + '</td>'; };
        return '<tr' + (s.hit ? ' class="is-hit"' : '') + '><td><b>' + s.name + (s.hit ? '<span class="badge badge--hit">Хит</span>' : '') + (s.free ? '<span class="badge badge--free">0 ₽ новым</span>' : '') + '</b><small>' + s.time + '</small></td>' + c(s.p[0]) + c(s.p[1]) + c(s.p[2]) + '</tr>';
      }).join('');
      t.innerHTML = '<thead><tr><th>Услуга</th><th>Седан</th><th>Кроссовер</th><th>Джип, минивэн</th></tr></thead><tbody>' + rows + '</tbody>';
    });
    updPP();
  }
  function updPP() {
    document.querySelectorAll('[data-pp]').forEach(function (el) {
      var s = SERVICES.find(function (x) { return x.id === el.getAttribute('data-pp'); });
      if (s) el.textContent = fmt(s.p[cls]);
    });
    document.querySelectorAll('[data-pk]').forEach(function (el) {
      var arr = el.getAttribute('data-pk').split('/'); el.textContent = fmt(+arr[cls]);
    });
  }
  function bindFilters() {
    document.querySelectorAll('[data-filter-for]').forEach(function (bar) {
      var grid = document.getElementById(bar.getAttribute('data-filter-for'));
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-f]'); if (!b) return;
        bar.querySelectorAll('[data-f]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        var f = b.getAttribute('data-f');
        var list = f === 'hit' ? SERVICES.filter(function (s) { return s.hit; }) : f === 'all' ? SERVICES : SERVICES.filter(function (s) { return f.split(',').indexOf(s.cat) > -1; });
        grid.innerHTML = list.map(card).join('');
        grid.querySelectorAll('.svc').forEach(function (c, i) { c.animate([{opacity:0, transform:'translateY(14px)'}, {opacity:1, transform:'none'}], {duration:500, delay:i * 40, easing:'cubic-bezier(.2,.8,.2,1)', fill:'backwards'}); });
      });
    });
    document.querySelectorAll('.classes').forEach(function (bar) {
      bar.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-on', +b.getAttribute('data-cls') === cls); });
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        cls = +b.getAttribute('data-cls'); try { localStorage.setItem('sf_cls', cls); } catch (er) {}
        document.querySelectorAll('.classes button').forEach(function (x) { x.classList.toggle('is-on', +x.getAttribute('data-cls') === cls); });
        document.querySelectorAll('.svc .price').forEach(function (el) {
          var s = SERVICES.find(function (x) { return x.id === el.getAttribute('data-price'); });
          el.innerHTML = priceHtml(s);
          el.animate([{opacity:0, transform:'translateY(6px)'}, {opacity:1, transform:'none'}], {duration:300});
        });
        updPP();
      });
    });
  }

  /* ===== 5. Фото-слоты ===== */
  function photos() {
    document.querySelectorAll('.photo[data-ph]').forEach(function (el) {
      var key = el.getAttribute('data-ph'), src = PHOTOS[key];
      if (!src) { el.classList.add('is-empty'); return; }
      var img = new Image(); img.alt = el.getAttribute('data-alt') || ''; img.loading = 'lazy'; img.decoding = 'async';
      img.onerror = function () { img.remove(); el.classList.add('is-empty'); };
      img.src = src; el.prepend(img);
    });
  }

  /* ===== 6. Появление, счётчики, шапка ===== */
  function reveal() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in'); io.unobserve(en.target);
        if (en.target.hasAttribute('data-count')) countUp(en.target);
        en.target.querySelectorAll && en.target.querySelectorAll('[data-count]').forEach(countUp);
      });
    }, {threshold: .15, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.rv,.steps,[data-count],.film-viz').forEach(function (el) { io.observe(el); });
  }
  function countUp(el) {
    if (el._done) return; el._done = 1;
    var raw = el.getAttribute('data-count'), to = parseFloat(raw), dec = (raw.split('.')[1] || '').length;
    var t0 = performance.now(), d = 1600;
    (function f(t) {
      var k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (to * e).toFixed(dec).replace('.', ',');
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  function header() {
    var h = document.querySelector('.header'), bar = document.querySelector('.mbar');
    function on() { var y = window.scrollY; if (h) h.classList.toggle('is-scrolled', y > 10); if (bar) bar.classList.toggle('is-on', y > 400); }
    window.addEventListener('scroll', on, {passive: true}); on();
    var bg = document.querySelector('.burger'), mn = document.querySelector('.mnav');
    if (bg && mn) {
      bg.addEventListener('click', function () { var o = mn.classList.toggle('is-open'); bg.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
      mn.addEventListener('click', function (e) { if (e.target.closest('a,button')) { mn.classList.remove('is-open'); document.body.style.overflow = ''; } });
    }
  }

  /* ===== 7. Ссылки ===== */
  function links() {
    var ext = function (sel, url) { document.querySelectorAll(sel).forEach(function (a) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }); };
    document.querySelectorAll('[data-phone]').forEach(function (a) { a.href = SF.phoneHref; if (!a.children.length && !a.textContent.trim()) a.textContent = SF.phone; });
    ext('[data-tg]', SF.tg); ext('[data-max]', SF.max); ext('[data-vk]', SF.vk);
    ext('[data-gplay]', SF.gplay); ext('[data-appstore]', SF.appstore);
    document.querySelectorAll('[data-maps]').forEach(function (a) { a.href = SF[a.getAttribute('data-maps')] || SF.maps; a.target = '_blank'; a.rel = 'noopener'; });
  }

  /* ===== 8. Формы, модалка, квиз ===== */
  function phoneMask(inp) {
    inp.addEventListener('input', function () {
      var d = inp.value.replace(/\D/g, '');
      if (d[0] === '8') d = '7' + d.slice(1);
      if (d && d[0] !== '7') d = '7' + d;
      d = d.slice(0, 11);
      var r = d ? '+7' : '';
      if (d.length > 1) r += ' (' + d.slice(1, 4);
      if (d.length >= 4) r += ') ' + d.slice(4, 7);
      if (d.length >= 7) r += '-' + d.slice(7, 9);
      if (d.length >= 9) r += '-' + d.slice(9, 11);
      inp.value = r;
    });
  }
  /* Режим Tilda: все кнопки записи открывают попап-форму Tilda (#popup:lead),
     которая сама отправляет заявки в amoCRM. Свои формы на странице заменяются кнопкой. */
  function tildaPopup(svc) {
    try { sessionStorage.setItem('sf_service', svc || ''); } catch (e) {}
    var a = document.createElement('a'); a.href = '#popup:lead'; a.style.display = 'none';
    document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); }, 500);
    setTimeout(function () {
      document.querySelectorAll('.t-popup input[name="service"], .t-popup input[name="Услуга"]').forEach(function (i) { i.value = svc || ''; });
    }, 300);
  }
  function forms() {
    if (window.SF_TILDA) {
      document.querySelectorAll('.form form[data-lead]').forEach(function (f) {
        var box = f.closest('.form'); if (box.closest('#lead')) return;
        var svc = (f.querySelector('input[name=service]') || {}).value || 'Консультация';
        var h = f.querySelector('h3'), p = f.querySelector('.fsub');
        box.innerHTML = (h ? '<h3>' + h.textContent + '</h3>' : '') + (p ? '<p class="fsub">' + p.textContent + '</p>' : '') +
          '<button class="btn btn--primary" type="button" data-open="lead" data-service="' + svc + '">Оставить заявку</button>';
      });
      document.addEventListener('click', function (e) {
        var o = e.target.closest('[data-open]'); if (!o) return;
        e.preventDefault(); tildaPopup(o.getAttribute('data-service') || o.getAttribute('data-title') || '');
      });
      return;
    }
    document.querySelectorAll('input[type=tel]').forEach(phoneMask);
    document.querySelectorAll('form[data-lead]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var tel = f.querySelector('input[type=tel]');
        if (tel && tel.value.replace(/\D/g, '').length < 11) { tel.focus(); tel.style.borderColor = '#E5484D'; return; }
        var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
        data.page = location.pathname;
        if (SF.endpoint) { try { fetch(SF.endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}); } catch (er) {} }
        f.closest('.form').classList.add('is-sent');
      });
    });
    var modal = document.getElementById('lead');
    var close = function () { modal.classList.remove('is-open'); document.body.style.overflow = ''; };
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open]');
      if (o && modal) {
        e.preventDefault();
        var svc = o.getAttribute('data-service') || '';
        modal.querySelector('.form').classList.remove('is-sent');
        modal.querySelector('[data-mtitle]').textContent = o.getAttribute('data-title') || (svc ? svc + ': запись' : 'Записаться в SF Wash');
        modal.querySelector('input[name=service]').value = svc;
        modal.classList.add('is-open'); document.body.style.overflow = 'hidden';
      }
      if (modal && (e.target.closest('[data-close]') || e.target === modal)) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal) close(); });

    var q = document.querySelector('[data-quiz]');
    if (q) {
      var steps = q.querySelectorAll('.qs'), bars = q.querySelectorAll('.quiz-steps i'), k = 0;
      var show = function (n) { k = n; steps.forEach(function (s, i) { s.classList.toggle('is-on', i === k); }); bars.forEach(function (b, i) { b.classList.toggle('on', i <= k); }); };
      q.addEventListener('click', function (e) {
        if (e.target.closest('[data-next]')) {
          e.preventDefault();
          var req = steps[k].querySelector('[required]');
          if (req && !req.value) { req.focus(); return; }
          if (steps[k].querySelector('input[type=radio]') && !steps[k].querySelector('input:checked')) { steps[k].animate([{transform:'translateX(-6px)'}, {transform:'translateX(6px)'}, {transform:'none'}], {duration:250}); return; }
          show(k + 1);
        }
        if (e.target.closest('[data-prev]')) { e.preventDefault(); show(k - 1); }
      });
      q.addEventListener('change', function (e) { if (e.target.type === 'radio' && e.target.closest('.qs') === steps[1]) setTimeout(function () { show(2); }, 250); });
      show(0);
    }
  }

  /* ===== 9. Калькулятор безлимита ===== */
  function calc() {
    var c = document.querySelector('[data-calc]'); if (!c) return;
    var r = c.querySelector('input'), out = c.querySelectorAll('[data-o]');
    function upd() {
      var n = +r.value, one = SERVICES[0].p[cls], sub = SERVICES[3].p[cls];
      out[0].textContent = n; out[1].textContent = fmt(n * one); out[2].textContent = fmt(sub);
      var diff = n * one - sub;
      out[3].textContent = diff > 0 ? 'Экономия ' + fmt(diff) + ' в месяц' : 'Безлимит окупается с ' + Math.ceil(sub / one) + '-й мойки в месяц';
    }
    r.addEventListener('input', upd);
    document.addEventListener('click', function (e) { if (e.target.closest('.classes')) setTimeout(upd, 10); });
    upd();
  }

  /* ===== 10. Капли воды (гидрофобный эффект) ===== */
  function beads() {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('canvas[data-beads]').forEach(function (cv) {
      var ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, drops = [], visible = true;
      var dense = cv.getAttribute('data-beads') === 'dense';
      function mk(y) {
        var r = Math.pow(Math.random(), 2.2) * (dense ? 9 : 11) + 1.6;
        return {x: Math.random() * W, y: y == null ? Math.random() * H : y, r: r, vy: 0, slide: r > 7 && Math.random() < .35, wait: Math.random() * 600};
      }
      function size() {
        var b = cv.getBoundingClientRect(); W = b.width; H = b.height;
        cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.round(W * H / (dense ? 2600 : 4200)); drops = []; for (var i = 0; i < n; i++) drops.push(mk());
      }
      function bead(d) {
        var x = d.x, y = d.y, r = d.r;
        ctx.beginPath(); ctx.ellipse(x + r * .15, y + r * .35, r, r * .92, 0, 0, 6.283); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill();
        var g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .1, x, y, r);
        g.addColorStop(0, 'rgba(210,230,255,.10)'); g.addColorStop(.7, 'rgba(120,170,230,.10)'); g.addColorStop(1, 'rgba(200,225,255,.45)');
        ctx.beginPath(); ctx.ellipse(x, y, r, r * .92, 0, 0, 6.283); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.ellipse(x - r * .35, y - r * .4, r * .28, r * .18, -.6, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill();
        ctx.beginPath(); ctx.arc(x + r * .35, y + r * .45, r * .12, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fill();
      }
      function frame() {
        if (!visible) return requestAnimationFrame(frame);
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < drops.length; i++) {
          var d = drops[i];
          if (d.slide && !reduce) {
            if (d.wait > 0) d.wait--; else { d.vy = Math.min(d.vy + .02, 1.6); d.y += d.vy; d.x += Math.sin(d.y / 40) * .15;
              ctx.strokeStyle = 'rgba(160,200,255,.08)'; ctx.lineWidth = d.r * 1.1; ctx.beginPath(); ctx.moveTo(d.x, d.y - d.r); ctx.lineTo(d.x, d.y - d.r - 30 * d.vy); ctx.stroke(); }
            if (d.y - d.r > H) drops[i] = mk(-12);
          }
          bead(d);
        }
        if (!reduce) requestAnimationFrame(frame);
      }
      size(); window.addEventListener('resize', size);
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(cv);
      requestAnimationFrame(frame);
    });
  }


  /* ===== 10b. Этапы мойки по пакетам ===== */
  function proc() {
    var p = document.querySelector('[data-proc]'), tabs = document.querySelector('.ptabs'); if (!p || !tabs) return;
    var set = function (k) {
      tabs.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-p') === k); });
      p.querySelectorAll('.ps').forEach(function (s, i) {
        var on = s.getAttribute('data-in').indexOf(k) > -1;
        if (s.classList.contains('is-off') === on) s.animate([{transform:'scale(.98)'}, {transform:'none'}], {duration:350, delay:i * 18});
        s.classList.toggle('is-off', !on);
      });
    };
    tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) set(b.getAttribute('data-p')); });
    set('l');
  }
  function autoVideos() {
    var vs = document.querySelectorAll('video[data-autoplay]'); if (!vs.length) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target, f = v.closest('.vc');
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); if (f) f.classList.add('is-playing'); }
        else { v.pause(); if (f) f.classList.remove('is-playing'); }
      });
    }, {threshold: .45});
    vs.forEach(function (v) { v.preload = 'metadata'; io.observe(v); });
  }
  function gallery() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gal]'); if (!b) return;
      var g = b.closest('.gal-wrap').querySelector('.gal'), it = g.querySelector('.g-item');
      g.scrollBy({left: (+b.getAttribute('data-gal')) * (it ? it.offsetWidth + 16 : 300), behavior: 'smooth'});
    });
  }

  /* ===== 11. Анимация заголовков по словам ===== */
  function splitHeads() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.sec .h-l, .page-hero .h-xl').forEach(function (h) {
      var i = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              var w = document.createElement('span'); w.className = 'w';
              var s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
              w.appendChild(s); frag.appendChild(w);
            });
            n.parentNode.replaceChild(frag, n);
          } else if (n.nodeType === 1) walk(n);
        });
      })(h);
      h.classList.add('split');
      if (!h.classList.contains('rv')) h.classList.add('rv');
      if (h.closest('.page-hero')) setTimeout(function () { h.classList.add('is-in'); }, 150);
    });
  }

  /* ===== 12. Световое пятно за курсором ===== */
  function spots() {
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest('.spot'); if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    var mark = function () { document.querySelectorAll('.svc.is-hit,.pack.is-hit,.get,.ppf-card').forEach(function (x) { x.classList.add('spot'); }); };
    mark(); document.addEventListener('click', function () { setTimeout(mark, 50); });
  }

  /* ===== 13. До / после ===== */
  function beforeAfter() {
    document.querySelectorAll('[data-ba]').forEach(function (ba) {
      var inp = ba.querySelector('input');
      var set = function (v) { ba.style.setProperty('--pos', v + '%'); inp.value = v; };
      inp.addEventListener('input', function () { set(inp.value); ba._touched = 1; });
      new IntersectionObserver(function (es, o) {
        if (!es[0].isIntersecting) return; o.disconnect();
        if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var t0 = performance.now();
        (function f(t) {
          if (ba._touched) return;
          var k = Math.min(1, (t - t0) / 2200);
          set(50 + Math.sin(k * Math.PI * 2) * 28 * (1 - k));
          if (k < 1) requestAnimationFrame(f);
        })(t0);
      }, {threshold: .5}).observe(ba);
    });
  }

  /* ===== 14. Параллакс фото первого экрана ===== */
  function heroParallax() {
    var hero = document.querySelector('.hero'); if (!hero || !matchMedia('(pointer:fine)').matches) return;
    hero.addEventListener('pointermove', function (e) {
      var img = hero.querySelector('.photo>img'); if (!img) return;
      var r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      img.style.animation = 'none'; img.style.transform = 'scale(1.06) translate(' + (-x * 14) + 'px,' + (-y * 10) + 'px)';
    });
  }

  function init() {
    if (init.done) return; init.done = 1;
    splitHeads(); beads();
    renderGrids(); bindFilters(); photos(); reveal(); header(); links(); forms(); calc(); spots(); beforeAfter(); heroParallax(); proc(); gallery(); autoVideos();
    document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

