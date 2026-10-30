/* MÜŞTERİYE GÖRE DEĞİŞTİR: tüm iletişim bilgileri burada */
const CONFIG = {
  whatsapp: "905316763080",            // ülke kodu ile, + ve boşluk olmadan
  phoneText: "0531 676 30 80",
  address: "Reşatbey Mah. Beş Ocak Cd. No: 41/a, 01080 Seyhan / Adana",
  hours: "Akşam 22:00'ye kadar açık · Güncel saatler için arayın",
  instagram: "https://www.facebook.com/p/Adana-G%C3%BCzellik-Salonu-Adios-61578037889472/", // Facebook sayfası
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adana Güzellik Merkezi Adios, Reşatbey Beş Ocak Cd. No: 41/a Seyhan Adana")
};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wa = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;

// İletişim bilgilerini doldur
$$("[data-c]").forEach(el => {
  const k = el.dataset.c;
  if (k === "address" || k === "hours") el.textContent = CONFIG[k];
  if (k === "tel") { el.textContent = CONFIG.phoneText; el.href = "tel:+" + CONFIG.whatsapp; }
  if (k === "wa") el.href = wa("Merhaba, Adana Güzellik Merkezi Adios hakkında bilgi almak istiyorum.");
  if (k === "ig") el.href = CONFIG.instagram;
  if (k === "map") el.href = CONFIG.map;
});
$("#year").textContent = new Date().getFullYear();

// Mobil menü
const nav = $("#nav"), burger = $("#burger");
const setMenu = o => { nav.classList.toggle("open", o); burger.classList.toggle("on", o); burger.setAttribute("aria-expanded", o); };
burger.onclick = () => setMenu(!nav.classList.contains("open"));
$$("#nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Hizmetleri forma ekle; "Detaylı Bilgi" seçilen hizmetle randevuya götürür
const sel = $("select[name=hizmet]");
$$("#services .card").forEach(c => {
  const name = c.dataset.service;
  sel.add(new Option(name, name));
  $(".link", c).onclick = () => { sel.value = name; $("#randevu").scrollIntoView({ behavior: "smooth" }); };
});

// SSS akordeonu
$$(".qa button").forEach(b => b.onclick = () => {
  const q = b.parentElement, open = !q.classList.contains("open");
  $$(".qa").forEach(x => { x.classList.remove("open"); $("button", x).setAttribute("aria-expanded", false); });
  q.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
});

// Galeri lightbox
const lb = $("#lb"), lbImg = $("img", lb);
$$("#gallery img").forEach(i => i.onclick = () => { lbImg.src = i.src.replace("w=800", "w=1600"); lbImg.alt = i.alt; lb.hidden = false; });
const closeLb = () => lb.hidden = true;
lb.onclick = e => { if (e.target !== lbImg) closeLb(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeLb(); $("#bot").hidden = true; setMenu(false); } });

// Form doğrulama — DEMO: veri hiçbir yere gönderilmez/kaydedilmez
const form = $("#form"), field = n => form.elements[n];
const rules = {
  ad: v => v.trim().split(/\s+/).filter(Boolean).length >= 2 || "Lütfen adınızı ve soyadınızı yazın.",
  tel: v => /^(\+?90|0)?\s?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v.trim()) || "Geçerli bir cep telefonu girin (05XX XXX XX XX).",
  hizmet: v => !!v || "Lütfen bir hizmet seçin.",
  tarih: v => (v && v >= new Date().toISOString().slice(0, 10)) || "Bugün veya sonraki bir tarih seçin."
};
const check = n => { const f = field(n), r = rules[n](f.value); f.classList.toggle("bad", r !== true); f.parentElement.querySelector("em").textContent = r === true ? "" : r; return r === true; };
Object.keys(rules).forEach(n => field(n).addEventListener("change", () => check(n)));
const msg = () => `Merhaba, randevu talep etmek istiyorum.\nAd Soyad: ${field("ad").value}\nTelefon: ${field("tel").value}\nHizmet: ${field("hizmet").value}\nTarih: ${field("tarih").value}\nMesaj: ${field("mesaj").value}`;
form.onsubmit = e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  $("#ok").hidden = !ok;
  if (ok) $("#ok").scrollIntoView({ block: "nearest", behavior: "smooth" });
};
$("#wa-form").onclick = e => { e.currentTarget.href = wa(msg()); };

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".rv").forEach(el => io.observe(el));

// Güzellik Asistanı — hazır cevaplar, harici yapay zekâ yok (DEMO)
const answers = {
  "Hizmetler": "Cilt bakımı, lazer epilasyon, protez tırnak, nail art, kirpik, kaş tasarımı, kalıcı makyaj, ağda, masaj, ayak bakımı, makyaj ve saç hizmetleri sunuyoruz.",
  "İletişim": `Bize ${CONFIG.phoneText} numarasından, WhatsApp'tan ya da Facebook'tan ulaşabilirsiniz. ${CONFIG.hours}.`,
  "Randevu": "WhatsApp'tan yazabilir ya da bizi arayabilirsiniz. Ekibimiz size dönüş yapar.",
  "Adres": CONFIG.address
};
const bm = $("#botMsgs"), say = (t, u) => { const p = document.createElement("p"); p.textContent = t; if (u) p.className = "u"; bm.append(p); bm.scrollTop = bm.scrollHeight; };
Object.keys(answers).forEach(k => { const b = document.createElement("button"); b.textContent = k; b.onclick = () => { say(k, 1); setTimeout(() => say(answers[k]), 350); }; $("#botQ").append(b); });
say("Merhaba! Size nasıl yardımcı olabilirim? Aşağıdan bir konu seçin.");
$("#botBtn").onclick = () => { const b = $("#bot"); b.hidden = !b.hidden; };
