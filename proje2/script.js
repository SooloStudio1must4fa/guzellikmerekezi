/* ============================================================
   LUMIÈRE BEAUTY STUDIO — Interactions
   ============================================================
   CUSTOMIZATION: Update CONFIG below for each client.
   ============================================================ */

// ============ CONFIGURATION — REPLACE FOR EACH CLIENT ============
const CONFIG = {
    whatsappNumber: '905316763080',           // WhatsApp number (country code + number, no + or spaces)
    whatsappDefaultMessage: 'Merhaba, bilgi ve randevu almak istiyorum.',
    phoneDisplay: '0531 676 30 80',
    businessName: 'Adana Güzellik Merkezi Adios'
};

// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
});

mobileClose.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
        closeLightbox();
        closeChat();
    }
});

// ============ SMOOTH SECTION NAVIGATION ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============ SCROLL REVEAL ANIMATIONS ============
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger siblings slightly for elegance
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============ FAQ ACCORDION ============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('active');
        }
    });
});

// ============ GALLERY LIGHTBOX ============
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const item = galleryItems[currentImageIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ============ WHATSAPP LINKS ============
function buildWhatsAppLink(message) {
    const encoded = encodeURIComponent(message || CONFIG.whatsappDefaultMessage);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
}

// Update all WhatsApp links dynamically
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = buildWhatsAppLink();
});

// Appointment section WhatsApp button with context
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.href = buildWhatsAppLink(`Merhaba, ${CONFIG.businessName} üzerinden randevu almak istiyorum.`);
}

// ============ APPOINTMENT FORM VALIDATION ============
// DEMO BEHAVIOR: This form performs client-side validation only.
// No data is sent to or stored on any server. Replace with a real
// backend endpoint when deploying for a client.
const appointmentForm = document.getElementById('appointmentForm');
const formSuccess = document.getElementById('formSuccess');

function validatePhone(phone) {
    // Accepts Turkish mobile formats: 05XX XXX XX XX, +905XX..., 5XX...
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^(\+?90|0)?5\d{9}$/.test(cleaned);
}

function setFieldError(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    const group = field.closest('.form-group');
    if (hasError) {
        group.classList.add('error');
    } else {
        group.classList.remove('error');
    }
    return !hasError;
}

if (appointmentForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;

        let isValid = true;

        isValid = setFieldError('fullName', fullName.length < 3) && isValid;
        isValid = setFieldError('phone', !validatePhone(phone)) && isValid;
        isValid = setFieldError('service', service === '') && isValid;

        if (isValid) {
            const date = document.getElementById('date').value;
            const note = document.getElementById('message').value.trim();
            const message = `Merhaba, ${CONFIG.businessName} için randevu talep ediyorum.\nAd Soyad: ${fullName}\nTelefon: ${phone}\nHizmet: ${service}\nTarih: ${date || 'Belirtilmedi'}\nNot: ${note || '-'}`;
            window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
        }
    });

    // Clear error state on input
    ['fullName', 'phone', 'service'].forEach(id => {
        const field = document.getElementById(id);
        field.addEventListener('input', () => {
            field.closest('.form-group').classList.remove('error');
        });
        field.addEventListener('change', () => {
            field.closest('.form-group').classList.remove('error');
        });
    });
}

// ============ DYNAMIC FOOTER YEAR ============
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ============ BEAUTY ASSISTANT CHAT ============
// DEMO: Predefined responses only. No external AI API is connected.
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatChips = document.querySelectorAll('.chat-chip');

const botResponses = {
    services: 'Hizmetlerimiz: Lazer Epilasyon, Cilt Bakımı, Protez Tırnak, Nail Art, Kirpik Lifting ve Kaş-Kirpik Uygulamaları. Detaylar için Hizmetlerimiz bölümüne göz atabilirsiniz.',
    appointment: 'Randevu almak için web sitemizdeki randevu formunu doldurabilir veya WhatsApp üzerinden bize yazabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır.',
    contact: `Bize şu kanallardan ulaşabilirsiniz:\nTelefon: ${CONFIG.phoneDisplay}\nWhatsApp: ${CONFIG.phoneDisplay}\nAdres: Reşatbey, Beş Ocak Cd. No: 41/A, Seyhan, Adana`,
    hours: 'Çalışma saatlerimiz: Google işletme kaydında kapanış 22:00 olarak görünüyor. Güncel saatleri telefonla teyit edebilirsiniz.',
    price: 'Fiyat bilgileri için lütfen bizi arayın veya WhatsApp üzerinden yazın. Size özel bilgi verelim.',
    default: 'Bu konuda size yardımcı olmak isterim. Dilerseniz telefon veya WhatsApp üzerinden bize ulaşabilirsiniz, ekibimiz detaylı bilgi verecektir.'
};

function getBotResponse(userText) {
    const text = userText.toLowerCase();

    if (text.includes('hizmet') || text.includes('servis') || text.includes('bakım') || text.includes('lazer') || text.includes('epilasyon')) {
        return botResponses.services;
    }
    if (text.includes('randevu') || text.includes('appointment') || text.includes('rezervasyon')) {
        return botResponses.appointment;
    }
    if (text.includes('iletişim') || text.includes('telefon') || text.includes('adres') || text.includes('nerede') || text.includes('ulaş')) {
        return botResponses.contact;
    }
    if (text.includes('saat') || text.includes('açık') || text.includes('kapalı') || text.includes('çalışma')) {
        return botResponses.hours;
    }
    if (text.includes('fiyat') || text.includes('ücret') || text.includes('kaç') || text.includes('tutar')) {
        return botResponses.price;
    }
    if (text.includes('merhaba') || text.includes('selam') || text.includes('hello')) {
        return 'Merhaba! Size nasıl yardımcı olabilirim? Hizmetlerimiz, randevu veya iletişim bilgileri hakkında sorabilirsiniz.';
    }
    return botResponses.default;
}

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendUserMessage(text) {
    const message = text.trim();
    if (!message) return;
    addMessage(message, true);
    chatInput.value = '';

    // Simulate typing delay for natural feel
    setTimeout(() => {
        addMessage(getBotResponse(message));
    }, 700);
}

function openChat() {
    chatBox.classList.add('active');
}

function closeChat() {
    chatBox.classList.remove('active');
}

chatToggle.addEventListener('click', () => {
    chatBox.classList.contains('active') ? closeChat() : openChat();
});

chatClose.addEventListener('click', closeChat);

chatSend.addEventListener('click', () => sendUserMessage(chatInput.value));

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendUserMessage(chatInput.value);
});

chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const topic = chip.dataset.topic;
        addMessage(chip.textContent, true);
        setTimeout(() => {
            addMessage(botResponses[topic] || botResponses.default);
        }, 700);
    });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-gold)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink, { passive: true });
