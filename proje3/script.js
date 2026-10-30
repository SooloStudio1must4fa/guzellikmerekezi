/* ═══════════════════════════════════════════════════════════════════
   ADANA GÜZELLİK MERKEZİ ADİOS — script.js
   ───────────────────────────────────────────────────────────────────
   İÇİNDEKİLER
   00. ⚙️ CONFIG — İşletme bilgileri (BURADAN ÖZELLEŞTİRİN)
   01. Yardımcılar
   02. Header (kaydırma efekti)
   03. Mobil menü
   04. Aktif menü öğesi
   05. Scroll-reveal animasyonları
   06. SSS akordeonu
   07. Galeri lightbox
   08. Hizmet detay modalı (+ SERVICES verisi)
   09. Randevu formu doğrulama (DEMO — veri kaydedilmez)
   10. WhatsApp / Telefon / Instagram bağlantıları
   11. Güzellik Asistanı (önceden tanımlı cevaplar — harici API yok)
   12. Yıl & tarih alanı
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════════════════
   00. ⚙️ CONFIG — YENİ MÜŞTERİ İÇİN SADECE BU BÖLÜMÜ DÜZENLEYİN
   ═══════════════════════════════════════════════════════════════════ */
const CONFIG = {
  // Telefon: hem görünen metin hem tıklanabilir tel: bağlantısı
  phoneDisplay: '+90 531 676 30 80',
  phoneRaw: '+905316763080',            // boşluksuz, + ile başlamalı

  // WhatsApp: ülke koduyla, boşluksuz
  whatsappNumber: '905316763080',

  // Site genelindeki varsayılan WhatsApp mesajı
  whatsappMessage:
    'Merhaba! Adana Güzellik Merkezi Adios hakkında bilgi almak ve randevu oluşturmak istiyorum.',

  facebookUrl: 'https://www.facebook.com/p/Adana-G%C3%BCzellik-Salonu-Adios-61578037889472/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Adana Güzellik Merkezi Adios Reşatbey Beş Ocak Cd. No:41/a Seyhan Adana'),

  address: 'Reşatbey, Beş Ocak Cd. No: 41/a, 01080 Seyhan / Adana',
  hours: 'Kapanış saati: 22.00',
};

/* Hizmet kartları & modal içeriği (⚙️ düzenlenebilir) */
const SERVICES = {
  'lazer-epilasyon': {
    title: 'Lazer Epilasyon',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d975eea396ab.jpg',
    text:
      'Adana Güzellik Merkezi Adios\'ta lazer epilasyon uygulamaları, istenmeyen tüylerden kurtulmak isteyenler için hijyenik bir ortamda uzman ellerle yapılır. Seans ve uygulama bölgeleri hakkında bilgi için bize ulaşabilirsiniz.',
    bullets: [
      'Hijyenik uygulama ortamı',
      'Profesyonel dokunuş',
      'Seans ve bölge bilgisi için kolay danışma',
      'WhatsApp ile hızlı randevu',
    ],
  },
  'cilt-bakimi': {
    title: 'Cilt Bakımı',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/aba9a17b4d3d.jpg',
    text:
      'Cildinizi arındırmayı ve yenilemeyi hedefleyen cilt bakımı uygulamalarımız, ihtiyacınıza göre yapılır. Hijyenik ortamda, özenli bir bakım deneyimi sunuyoruz.',
    bullets: [
      'İhtiyacınıza göre cilt bakımı',
      'Arındırıcı ve yenileyici uygulamalar',
      'Hijyenik ortam',
      'Rahat ve özenli bir deneyim',
    ],
  },
  'protez-tirnak': {
    title: 'Protez Tırnak & Nail Art',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b61e0c3f37fa.jpg',
    text:
      'Protez tırnak, nail art ve tırnak bakımı hizmetlerimizle ellerinize şık ve bakımlı bir görünüm kazandırıyoruz. Ayak bakımı hizmetimiz de mevcuttur.',
    bullets: [
      'Protez tırnak uygulaması',
      'Nail art tasarımları',
      'Tırnak bakımı',
      'Ayak bakımı',
    ],
  },
  'kirpik': {
    title: 'Kirpik Uygulamaları',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d8e56989fbeb.jpg',
    text:
      'Takma kirpik, kirpik lifting ve kirpik kıvırma uygulamalarıyla bakışlarınıza zarif bir çerçeve kazandırıyoruz.',
    bullets: [
      'Takma kirpik (kirpik uzatma)',
      'Kirpik lifting',
      'Kirpik kıvırma',
      'Bakımlı ve etkileyici bakışlar',
    ],
  },
  'kas-kalici-makyaj': {
    title: 'Kaş & Kalıcı Makyaj',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/10104d7796c9.jpg',
    text:
      'Yüz hatlarınıza uygun kaş tasarımı, kaş laminasyonu, kaş tattoo tekniği ve kalıcı makyaj uygulamalarıyla doğal ve bakımlı bir görünüm elde edebilirsiniz.',
    bullets: [
      'Kaş tasarımı',
      'Kaş laminasyonu',
      'Kaş tattoo tekniği',
      'Kalıcı makyaj',
    ],
  },
  'agda-iplik': {
    title: 'Ağda & İplik',
    img: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e18010c414f.jpg',
    text:
      'Vücut ağdası, ağda ile tüy alma ve iplik ile yüz-kaş tüyü alma hizmetlerimizle pürüzsüz bir görünüm elde edebilirsiniz. Ayrıca masaj, makyaj, saç tasarımı ve saç eklemesi hizmetlerimiz de mevcuttur.',
    bullets: [
      'Vücut ağdası',
      'Ağda ile tüy alma',
      'İplik ile tüy alma',
      'Masaj, makyaj ve saç hizmetleri',
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════
   01. YARDIMCILAR
   ═══════════════════════════════════════════════════════════════════ */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const waLink = (msg = CONFIG.whatsappMessage) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

/* Uzun işleri rAF ile kısa aralıklara böler (performans) */
function onScrollPassive(fn) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { fn(); ticking = false; });
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════════
   02. HEADER — kaydırınca zemin değiştirir
   ═══════════════════════════════════════════════════════════════════ */
(function initHeader() {
  const header = $('#header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 40);
  update();
  onScrollPassive(update);
})();

/* ═══════════════════════════════════════════════════════════════════
   03. MOBİL MENÜ
   ═══════════════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const header    = $('#header');
  const hamburger = $('#hamburger');
  const nav       = $('#nav');
  if (!hamburger || !nav) return;

  /* Küçük ekranlar için "Randevu Al" butonunu menünün içine klonla */
  const cta = $('.header-cta', header);
  if (cta) {
    const clone = cta.cloneNode(true);
    clone.classList.add('mobile-cta');
    clone.removeAttribute('id');
    nav.appendChild(clone);
  }

  const setState = (open) => {
    nav.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  };

  hamburger.addEventListener('click', () =>
    setState(!nav.classList.contains('open')));

  /* Menü bağlantısına tıklanınca kapat */
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setState(false);
  });

  /* Ekran genişlerse menüyü sıfırla */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) setState(false);
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   04. AKTİF MENÜ ÖĞESİ — görünür bölümü vurgular
   ═══════════════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const links = $$('.nav-link');
  if (!links.length) return;
  const map = new Map();
  links.forEach((l) => {
    const id = l.getAttribute('href');
    if (id && id.startsWith('#')) {
      const sec = $(id);
      if (sec) map.set(sec, l);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        const link = map.get(en.target);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  map.forEach((_, sec) => io.observe(sec));
})();

/* ═══════════════════════════════════════════════════════════════════
   05. SCROLL-REVEAL
   ═══════════════════════════════════════════════════════════════════ */
(function initReveal() {
  const items = $$('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('revealed');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el) => io.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════════
   06. SSS AKORDEONU
   ═══════════════════════════════════════════════════════════════════ */
(function initFaq() {
  const items = $$('.faq-item');
  if (!items.length) return;

  /* Açılışta "open" sınıflı öğeyi gerçek yüksekliğiyle aç */
  const applyHeight = (item, open) => {
    const answer = $('.faq-a', item);
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
  };

  items.forEach((item) => {
    const btn  = $('.faq-q', item);
    const open = item.classList.contains('open');
    btn.setAttribute('aria-expanded', String(open));
    applyHeight(item, open);
  });

  items.forEach((item) => {
    $('.faq-q', item).addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');

      /* Tek açık soru davranışı: diğerlerini kapat */
      items.forEach((other) => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          $('.faq-q', other).setAttribute('aria-expanded', 'false');
          applyHeight(other, false);
        }
      });

      item.classList.toggle('open', willOpen);
      $('.faq-q', item).setAttribute('aria-expanded', String(willOpen));
      applyHeight(item, willOpen);
    });
  });

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (item.classList.contains('open')) applyHeight(item, true);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   07. GALERİ LIGHTBOX
   ═══════════════════════════════════════════════════════════════════ */
(function initLightbox() {
  const box      = $('#lightbox');
  const imgEl    = $('#lbImg');
  const capEl    = $('#lbCaption');
  const items    = $$('.gallery-item');
  if (!box || !items.length) return;

  let index = 0;

  const render = () => {
    const item = items[index];
    const img  = $('img', item);
    imgEl.src  = img.src;
    imgEl.alt  = img.alt || '';
    capEl.textContent = item.dataset.caption || '';
  };

  const open = (i) => {
    index = i;
    render();
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('show'));
    document.body.classList.add('no-scroll');
    $('#lbClose').focus();
  };

  const close = () => {
    box.classList.remove('show');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { box.hidden = true; }, 300);
  };

  const step = (dir) => {
    index = (index + dir + items.length) % items.length;
    render();
  };

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));

  /* Karartma alanına tıklayınca kapat */
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  /* Klavye desteği */
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   08. HİZMET DETAY MODALI
   ═══════════════════════════════════════════════════════════════════ */
(function initServiceModal() {
  const modal   = $('#serviceModal');
  if (!modal) return;
  const imgEl   = $('#modalImg');
  const titleEl = $('#modalTitle');
  const textEl  = $('#modalText');
  const listEl  = $('#modalList');
  let currentService = '';

  const open = (key) => {
    const data = SERVICES[key];
    if (!data) return;
    currentService = key;
    imgEl.src = data.img;
    imgEl.alt = data.title;
    titleEl.textContent = data.title;
    textEl.textContent  = data.text;
    /* Modal içindeki WhatsApp butonuna hizmete özel mesaj ver */
    const waBtn = $('.modal-actions .js-wa', modal);
    if (waBtn) {
      waBtn.dataset.waText = `Merhaba! ${data.title} hizmeti hakkında bilgi almak istiyorum.`;
      waBtn.href = waLink(waBtn.dataset.waText);
    }
    listEl.innerHTML = data.bullets
      .map((b) => `<li><span class="check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg>
        </span>${b}</li>`)
      .join('');
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('show'));
    document.body.classList.add('no-scroll');
    $('#modalClose').focus();
  };

  const close = () => {
    modal.classList.remove('show');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { modal.hidden = true; }, 300);
  };

  /* Kartlardaki "Detaylı Bilgi" butonları */
  $$('.service-link').forEach((btn) =>
    btn.addEventListener('click', () => open(btn.dataset.service)));

  $('#modalClose').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') close();
  });

  /* "Bu Hizmet İçin Randevu Al" → formu doldur ve kaydır */
  $('#modalBook').addEventListener('click', () => {
    const select = $('#f-service');
    if (select) select.value = currentService;
    close();
    setTimeout(() => {
      $('#randevu').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('#f-name').focus({ preventScroll: true });
    }, 320);
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   09. RANDEVU FORMU — doğrulama + WhatsApp'a yönlendirme
   ═══════════════════════════════════════════════════════════════════ */
(function initForm() {
  const form = $('#appointmentForm');
  if (!form) return;

  const fields = {
    name:    { el: $('#f-name'),    error: 'Lütfen adınızı ve soyadınızı girin.' },
    phone:   { el: $('#f-phone'),   error: 'Geçerli bir telefon numarası girin (ör. 0531 676 30 80).' },
    service: { el: $('#f-service'), error: 'Lütfen bir hizmet seçin.' },
    date:    { el: $('#f-date'),    error: 'Lütfen bugünden sonraki bir tarih seçin.' },
  };

  const setError = (field, message = '') => {
    const wrap   = field.el.closest('.form-field');
    const errEl  = $('.field-error', wrap);
    wrap.classList.toggle('invalid', Boolean(message));
    errEl.textContent = message || '';
  };

  const validators = {
    name: (v) => v.trim().length >= 3,
    phone: (v) => {
      const digits = v.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 13;
    },
    service: (v) => v !== '',
    date: (v) => {
      if (!v) return false;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const chosen = new Date(v + 'T00:00:00');
      return chosen >= today;
    },
  };

  const validateField = (key) => {
    const field = fields[key];
    const ok = validators[key](field.el.value);
    setError(field, ok ? '' : field.error);
    return ok;
  };

  /* Geçmiş tarihi seçemesin */
  const dateInput = fields.date.el;
  const todayISO = new Date().toISOString().split('T')[0];
  dateInput.min = todayISO;

  /* Düzenleme anında hatayı temizle */
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const clear = () => setError(field, '');
    field.el.addEventListener('input',  clear);
    field.el.addEventListener('change', clear);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const firstInvalid = Object.keys(fields)[results.indexOf(false)];

    if (firstInvalid) {
      fields[firstInvalid].el.focus();
      return;
    }

    /* Form bilgilerini WhatsApp mesajına çevirip salonun numarasına yönlendir */
    const data = Object.fromEntries(new FormData(form));
    const svcLabel = fields.service.el.selectedOptions[0].textContent;
    const [y, m, d] = data.date.split('-');
    const msg =
      'Merhaba! Randevu talep etmek istiyorum.' +
      `\nAd Soyad: ${data.name}` +
      `\nTelefon: ${data.phone}` +
      `\nHizmet: ${svcLabel}` +
      `\nTercih edilen tarih: ${d}.${m}.${y}` +
      (data.message && data.message.trim() ? `\nNot: ${data.message.trim()}` : '');
    window.open(waLink(msg), '_blank', 'noopener');

    const success = $('#formSuccess');
    success.hidden = false;
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   10. WHATSAPP / TELEFON / INSTAGRAM / ADRES bağlantıları
   ═══════════════════════════════════════════════════════════════════ */
(function initLinks() {
  /* WhatsApp bağlantıları (isteğe bağlı özel mesaj: data-wa-text) */
  $$('.js-wa').forEach((a) => {
    a.href = waLink(a.dataset.waText || CONFIG.whatsappMessage);
  });

  /* Telefon */
  $$('.js-tel').forEach((a) => { a.href = `tel:${CONFIG.phoneRaw}`; });
  $$('.js-phone-display').forEach((el) => { el.textContent = CONFIG.phoneDisplay; });

  /* Facebook / Harita / Adres / Saatler */
  $$('.js-fb').forEach((a) => { a.href = CONFIG.facebookUrl; });
  $$('.js-maps').forEach((a) => { a.href = CONFIG.mapsUrl; });
  $$('.js-address-text').forEach((el) => { el.textContent = CONFIG.address; });
  $$('.js-hours-text').forEach((el) => { el.textContent = CONFIG.hours; });
})();

/* ═══════════════════════════════════════════════════════════════════
   11. GÜZELLİK ASİSTANI — TAMAMEN ÖN YÜZDE ÇALIŞAN DEMO
   ⚠️ Harici bir yapay zekâ servisine bağlanmaz; cevaplar aşağıda
      önceden tanımlıdır. Görsel ve etkileşim prototipidir.
   ═══════════════════════════════════════════════════════════════════ */
(function initAssistant() {
  const toggle  = $('#assistantToggle');
  const panel   = $('#chatPanel');
  const closeEl = $('#chatClose');
  const body    = $('#chatBody');
  const form    = $('#chatForm');
  const input   = $('#chatInput');
  const chips   = $$('#chatChips button');
  if (!toggle || !panel) return;

  let greeted = false;

  const escapeHTML = (str) => {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  };

  const addMsg = (html, who = 'bot') => {
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    div.innerHTML = who === 'user' ? escapeHTML(html) : html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  };

  const showTyping = () => {
    const t = document.createElement('div');
    t.className = 'msg bot';
    t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
    return t;
  };

  /* ⚙️ Bot cevapları — buradan kolayca düzenleyebilirsiniz */
  const replies = [
    {
      match: /(hizmet|lazer|epilasyon|cilt|tırnak|tirnak|nail|protez|ağda|agda|iplik|masaj|kaş|kas|kirpik|makyaj)/i,
      html:
        'Hizmetlerimiz: <b>Lazer Epilasyon, Cilt Bakımı, Protez Tırnak & Nail Art, ' +
        'Kirpik, Kaş & Kalıcı Makyaj, Ağda & İplik</b>; ayrıca masaj, ayak bakımı, makyaj ve ' +
        'saç hizmetleri. Hangisi hakkında detay istersiniz? ✦',
    },
    {
      match: /(randevu|rezervasyon|kayıt|kayit)/i,
      html:
        'Randevu için randevu formunu doldurabilir, WhatsApp üzerinden yazabilir ya da bizi arayabilirsiniz.',
    },
    {
      match: /(fiyat|ücret|ucret|kaç para|kampanya|indirim)/i,
      html:
        'Fiyatlarımız uygulamaya göre değişmektedir. Güncel fiyat bilgisi için bizi arayabilir ' +
        'veya WhatsApp üzerinden yazabilirsiniz.',
    },
    {
      match: /(saat|açık|acik|kaçta|kacta|pazar)/i,
      html:
        `<b>${CONFIG.hours}</b>. Güncel çalışma saatleri ve uygun randevu saatleri için ` +
        'bizi arayabilir veya WhatsApp’tan yazabilirsiniz. ✦',
    },
    {
      match: /(adres|nerede|konum|yol)/i,
      html:
        'Adresimiz: <b>' + CONFIG.address + '</b>. Haritada görmek için ' +
        '<a href="' + CONFIG.mapsUrl + '" target="_blank" rel="noopener">yol tarifi alabilirsiniz</a>.',
    },
    {
      match: /(telefon|ara|ulaş|ulas|mail)/i,
      html:
        'Bize <a href="tel:' + CONFIG.phoneRaw + '"><b>' + CONFIG.phoneDisplay + '</b></a> ' +
        'numarasından ulaşabilirsiniz. Dilerseniz WhatsApp üzerinden de yazabilirsiniz.',
    },
    {
      match: /(lazer.*(acı|agri|ağrı)|ağrı|acı)/i,
      html:
        'Uygulama sırasındaki his kişiden kişiye ve bölgeye göre değişebilir. Detaylı bilgi için ' +
        'bize WhatsApp’tan yazabilir veya salonda uzman ekibimize danışabilirsiniz.',
    },
    {
      match: /(teşekkür|tesekkur|sağol|sagol)/i,
      html: 'Biz teşekkür ederiz! Güzel günler dileriz. ✦',
    },
    {
      match: /(merhaba|selam|günaydın|gunaydin|iyi akşamlar|hey|hello)/i,
      html: 'Merhaba! Sizi görmek güzel. Hizmetler, randevu, fiyat ya da adres hakkında sorabilirsiniz. ✦',
    },
  ];

  const fallback =
    'Bunu tam anlayamadım. <b>"Hizmetler", "Randevu", "Fiyat", "Saatler" veya "Adres"</b> ' +
    'diye yazabilir ya da randevu formunu kullanabilirsiniz.';

  const botReply = (userText) => {
    const typing = showTyping();
    const found  = replies.find((r) => r.match.test(userText));
    const html   = found ? found.html : fallback;

    /* Randevu cevabına tıklanabilir buton ekle */
    const withBtn = /randevu/i.test(html) && found
      ? html + '<br><a href="#randevu" class="msg-btn">Randevu Formuna Git</a>'
      : html;

    setTimeout(() => {
      typing.remove();
      addMsg(withBtn, 'bot');
    }, 750 + Math.random() * 450);
  };

  const openChat = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    $('.assistant-dot', toggle)?.classList.add('off');
    input.focus();

    if (!greeted) {
      greeted = true;
      const typing = showTyping();
      setTimeout(() => {
        typing.remove();
        addMsg(
          'Merhaba! Ben <b>Adios Güzellik Asistanı</b>’yım. Hizmetlerimiz, randevu, ' +
          'fiyat bilgisi ve çalışma saatleri hakkında size yardımcı olabilirim. ✦',
          'bot'
        );
      }, 650);
    }
  };

  const closeChat = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () =>
    panel.hidden ? openChat() : closeChat());
  closeEl.addEventListener('click', closeChat);

  /* Sohbet içindeki bağlantılara tıklanınca panel kapansın (sayfa görünür olsun) */
  body.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"], a.msg-phone');
    if (link) closeChat();
  });

  /* Hazır cevap çipleri */
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      addMsg(chip.dataset.chip, 'user');
      botReply(chip.dataset.chip);
    });
  });

  /* Serbest mesaj */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    botReply(text);
  });

  /* ESC ile kapatma */
  document.addEventListener('keydown', (e) => {
    if (!panel.hidden && e.key === 'Escape') closeChat();
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   12. YIL & KÜÇÜK DOKUNUŞLAR
   ═══════════════════════════════════════════════════════════════════ */
(function initMisc() {
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
