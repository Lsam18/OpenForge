// ========================================
// OPENFORGE - MODERN JAVASCRIPT
// ========================================

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to feature boxes
document.querySelectorAll('.feature-box').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Event Tracking (Optional Analytics)
function trackEvent(action, label) {
    console.log(`Event: ${action} - ${label}`);
    // Add your analytics tracking here (GA, Mixpanel, etc.)
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const btnText = this.textContent.trim();
        const btnType = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
        trackEvent('Button Click', `${btnType}: ${btnText}`);
    });
});

// ========================================
// PRODUCT-LED SECTIONS
// ========================================

// Screenshots Gallery Tabs
(function initGalleryTabs() {
    const cards = Array.from(document.querySelectorAll('.gallery-card'));
    if (!cards.length) return;

    function setActiveTab(tabs, nextTab) {
        tabs.forEach(tab => {
            const isActive = tab === nextTab;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function swapImage(image, nextSrc, nextLabel) {
        const currentSrc = image.getAttribute('src');
        if (nextSrc && currentSrc === nextSrc) return;

        image.classList.add('is-fading');

        const fallbackTimer = window.setTimeout(() => {
            image.classList.remove('is-fading');
        }, 520);

        window.setTimeout(() => {
            if (nextSrc) image.setAttribute('src', nextSrc);
            if (nextLabel) image.setAttribute('alt', `OpenForge screenshot: ${nextLabel}`);

            image.addEventListener(
                'load',
                () => {
                    window.clearTimeout(fallbackTimer);
                    image.classList.remove('is-fading');
                },
                { once: true }
            );
        }, 160);
    }

    function swapVideo(video, nextSrc, fallbackSrc) {
        const source = video.querySelector('source');
        if (!source) return;

        const currentSrc = source.getAttribute('src') || '';
        if (nextSrc && currentSrc === nextSrc) return;

        video.pause();

        if (nextSrc) {
            source.setAttribute('src', nextSrc);
            source.setAttribute('type', 'video/mp4');
        }

        if (fallbackSrc) {
            let fallback = video.querySelector('source[data-fallback]');
            if (!fallback) {
                fallback = document.createElement('source');
                fallback.setAttribute('data-fallback', 'true');
                video.appendChild(fallback);
            }
            fallback.setAttribute('src', fallbackSrc);
            fallback.setAttribute('type', 'video/quicktime');
        }

        video.load();
    }

    cards.forEach(card => {
        const tabs = Array.from(card.querySelectorAll('.gallery-tab'));
        if (!tabs.length) return;

        const image = card.querySelector('.gallery-image');
        const video = card.querySelector('.gallery-video');
        if (!image && !video) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                setActiveTab(tabs, tab);
                const label = tab.textContent.trim();
                const kind = (tab.getAttribute('data-kind') || '').trim();
                const src = tab.getAttribute('data-src') || '';
                const fallback = tab.getAttribute('data-fallback') || '';

                if (kind === 'video' && video) {
                    swapVideo(video, src, fallback);
                    return;
                }

                if (image) {
                    swapImage(image, src, label);
                }
            });
        });
    });
})();

// Demo Flow -> WhatsApp Prefill
(function initDemoFlow() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    const OPENFORGE_WHATSAPP_NUMBER = '94778177435';

    const serviceTypeEl = document.getElementById('serviceType');
    const shopTypeEl = document.getElementById('shopType');
    const waNumberEl = document.getElementById('waNumber');
    const itemCountEl = document.getElementById('itemCount');
    const painTodayEl = document.getElementById('painToday');
    const waMessageEl = document.getElementById('waMessage');
    const demoErrorEl = document.getElementById('demoError');

    const sendWhatsAppEl = document.getElementById('sendWhatsApp');

    const webStatusEl = document.getElementById('webStatus');
    const webBusinessEl = document.getElementById('webBusiness');
    const securityFocusEl = document.getElementById('securityFocus');
    const securityEnvEl = document.getElementById('securityEnv');

    const serviceGroups = Array.from(form.querySelectorAll('.demo-group[data-service]'));

    function setError(message) {
        if (!demoErrorEl) return;
        demoErrorEl.textContent = message || '';
        demoErrorEl.style.display = message ? 'block' : 'none';
    }

    function setFieldRequired(el, isRequired) {
        if (!el) return;
        if (isRequired) {
            el.setAttribute('required', '');
            el.removeAttribute('disabled');
        } else {
            el.removeAttribute('required');
            el.setAttribute('disabled', '');
        }
    }

    function setService(service) {
        const nextService = (service || '').trim();

        serviceGroups.forEach(group => {
            const isActive = group.getAttribute('data-service') === nextService;
            group.classList.toggle('is-active', isActive);

            // Disable inputs inside inactive groups so they don't block validation.
            const groupInputs = Array.from(group.querySelectorAll('input, select, textarea'));
            groupInputs.forEach(input => {
                input.disabled = !isActive;
            });
        });

        // Required rules per service
        setFieldRequired(shopTypeEl, nextService === 'pos');
        setFieldRequired(itemCountEl, nextService === 'pos');
        setFieldRequired(painTodayEl, nextService === 'pos');

        setFieldRequired(webStatusEl, nextService === 'web');
        setFieldRequired(securityFocusEl, nextService === 'security');

        // Optional fields (kept enabled when group active)
        if (nextService === 'web') {
            if (webBusinessEl) webBusinessEl.disabled = false;
        }
        if (nextService === 'security') {
            if (securityEnvEl) securityEnvEl.disabled = false;
        }

        setError('');
    }

    function buildRequestBody({
        serviceType,
        shopType,
        itemCount,
        painToday,
        webStatus,
        webBusiness,
        securityFocus,
        securityEnv,
        contactNumber,
        extraMessage,
    }) {
        const lines = [
            'OpenForge Request',
            '',
            'Service:',
            `- ${serviceType || 'N/A'}`,
        ];

        if (serviceType === 'pos') {
            lines.push(
                '',
                'POS details:',
                `- Shop type: ${shopType || 'N/A'}`,
                `- Items (roughly): ${itemCount || 'N/A'}`,
                `- Biggest pain today: ${painToday || 'N/A'}`,
                '',
                'Suggested screenshots (2 max):',
                '- Stock',
                '- Invoice'
            );
        }

        if (serviceType === 'web') {
            lines.push(
                '',
                'Website details:',
                `- Status: ${webStatus || 'N/A'}`,
                webBusiness ? `- Business type: ${webBusiness}` : null
            );
        }

        if (serviceType === 'security') {
            lines.push(
                '',
                'Security details:',
                `- Focus: ${securityFocus || 'N/A'}`,
                securityEnv ? `- Environment: ${securityEnv}` : null
            );
        }

        if (contactNumber) {
            lines.push('', 'Contact number (optional):', `- ${contactNumber}`);
        }

        if (extraMessage) {
            lines.push('', 'Message:', `- ${extraMessage}`);
        }

        lines.push('', 'Please share timeline + a rough quote range.');

        return lines.filter(Boolean).join('\n');
    }

    function normalizeDigits(value) {
        return String(value || '').replace(/\D/g, '');
    }

    function openWhatsApp({ number, text }) {
        const digits = normalizeDigits(number);
        const baseUrl = `https://wa.me/${digits}`;
        const url = text ? `${baseUrl}?text=${encodeURIComponent(text)}` : baseUrl;

        const newWindow = window.open(url, '_blank', 'noopener');
        if (!newWindow) {
            window.location.href = url;
        }
    }

    function collectAndValidate() {
        const serviceType = (serviceTypeEl?.value || '').trim();
        const contactNumber = (waNumberEl?.value || '').trim();
        const message = (waMessageEl?.value || '').trim();

        if (!serviceType) {
            setError('Please select what you need.');
            serviceTypeEl?.focus();
            return null;
        }

        const shopType = (shopTypeEl?.value || '').trim();
        const itemCount = (itemCountEl?.value || '').trim();
        const painToday = (painTodayEl?.value || '').trim();
        const webStatus = (webStatusEl?.value || '').trim();
        const webBusiness = (webBusinessEl?.value || '').trim();
        const securityFocus = (securityFocusEl?.value || '').trim();
        const securityEnv = (securityEnvEl?.value || '').trim();

        if (serviceType === 'pos') {
            if (!shopType) {
                setError('Please select your shop type.');
                shopTypeEl?.focus();
                return null;
            }

            if (!itemCount || Number(itemCount) <= 0) {
                setError('Please enter how many items you have (roughly).');
                itemCountEl?.focus();
                return null;
            }

            if (!painToday) {
                setError('Please select your biggest pain today.');
                painTodayEl?.focus();
                return null;
            }
        }

        if (serviceType === 'web') {
            if (!webStatus) {
                setError('Please select whether you already have a website.');
                webStatusEl?.focus();
                return null;
            }
        }

        if (serviceType === 'security') {
            if (!securityFocus) {
                setError('Please select a security focus.');
                securityFocusEl?.focus();
                return null;
            }
        }

        setError('');

        return {
            serviceType,
            shopType,
            itemCount,
            painToday,
            webStatus,
            webBusiness,
            securityFocus,
            securityEnv,
            contactNumber,
            message,
        };
    }

    function openEmail({ subject, body }) {
        const to = 'contact@getopenforge.net';
        const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    }

    if (serviceTypeEl) {
        serviceTypeEl.addEventListener('change', () => {
            setService(serviceTypeEl.value);
        });
    }

    // Initialize state
    setService(serviceTypeEl?.value || '');

    if (sendWhatsAppEl) {
        sendWhatsAppEl.setAttribute('href', `https://wa.me/${OPENFORGE_WHATSAPP_NUMBER}`);
        sendWhatsAppEl.addEventListener('click', (e) => {
            e.preventDefault();

            const payload = collectAndValidate();
            if (!payload) return;

            const body = buildRequestBody({
                serviceType: payload.serviceType,
                shopType: payload.shopType,
                itemCount: payload.itemCount,
                painToday: payload.painToday,
                webStatus: payload.webStatus,
                webBusiness: payload.webBusiness,
                securityFocus: payload.securityFocus,
                securityEnv: payload.securityEnv,
                contactNumber: payload.contactNumber,
                extraMessage: payload.message,
            });

            openWhatsApp({ number: OPENFORGE_WHATSAPP_NUMBER, text: body });
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const payload = collectAndValidate();
        if (!payload) return;

        const serviceLabel =
            payload.serviceType === 'pos' ? 'POS Demo' :
            payload.serviceType === 'web' ? 'Web Quote' :
            payload.serviceType === 'security' ? 'Security Consult' :
            'Request';

        const body = buildRequestBody({
            serviceType: payload.serviceType,
            shopType: payload.shopType,
            itemCount: payload.itemCount,
            painToday: payload.painToday,
            webStatus: payload.webStatus,
            webBusiness: payload.webBusiness,
            securityFocus: payload.securityFocus,
            securityEnv: payload.securityEnv,
            contactNumber: payload.contactNumber,
            extraMessage: payload.message,
        });

        openEmail({ subject: `OpenForge ${serviceLabel} Request`, body });
    });
})();
