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
    const tabs = Array.from(document.querySelectorAll('.gallery-tab'));
    const image = document.querySelector('.gallery-image');

    if (!tabs.length || !image) return;

    function setActiveTab(nextTab) {
        tabs.forEach(tab => {
            const isActive = tab === nextTab;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function swapImage(nextSrc, nextLabel) {
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

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveTab(tab);
            const label = tab.textContent.trim();
            const src = tab.getAttribute('data-src') || '';
            swapImage(src, label);
        });
    });
})();

// Demo Flow -> WhatsApp Prefill
(function initDemoFlow() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    const shopTypeEl = document.getElementById('shopType');
    const waNumberEl = document.getElementById('waNumber');
    const itemCountEl = document.getElementById('itemCount');
    const painTodayEl = document.getElementById('painToday');
    const waMessageEl = document.getElementById('waMessage');
    const demoErrorEl = document.getElementById('demoError');

    function setError(message) {
        if (!demoErrorEl) return;
        demoErrorEl.textContent = message || '';
        demoErrorEl.style.display = message ? 'block' : 'none';
    }

    function buildDemoScript({ shopType, itemCount, painToday, contactNumber, extraMessage }) {
        const lines = [
            'OpenForge Demo Request',
            '',
            'What kind of shop is this?',
            `- ${shopType}`,
            '',
            'How many items roughly?',
            `- ${itemCount}`,
            '',
            'Any pain today?',
            `- ${painToday}`,
            contactNumber ? '' : null,
            contactNumber ? 'Contact number (optional):' : null,
            contactNumber ? `- ${contactNumber}` : null,
            '',
            'Show 2 screenshots max:',
            '- Stock',
            '- Invoice',
        ];

        if (extraMessage) {
            lines.push('', 'Extra notes:', `- ${extraMessage}`);
        }

        lines.push(
            '',
            'I can set this up exactly like your shop. One-time setup, no lock-in.'
        );

        return lines.filter(Boolean).join('\n');
    }

    function openEmail({ subject, body }) {
        const to = 'lakshan.sam28@gmail.com';
        const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const shopType = (shopTypeEl?.value || '').trim();
        const contactNumber = (waNumberEl?.value || '').trim();
        const itemCount = (itemCountEl?.value || '').trim();
        const painToday = (painTodayEl?.value || '').trim();
        const message = (waMessageEl?.value || '').trim();

        if (!shopType) {
            setError('Please select your shop type.');
            shopTypeEl?.focus();
            return;
        }

        if (!itemCount || Number(itemCount) <= 0) {
            setError('Please enter how many items you have (roughly).');
            itemCountEl?.focus();
            return;
        }

        if (!painToday) {
            setError('Please select your biggest pain today.');
            painTodayEl?.focus();
            return;
        }

        setError('');

        const body = buildDemoScript({
            shopType,
            itemCount,
            painToday,
            contactNumber,
            extraMessage: message
        });

        openEmail({
            subject: 'OpenForge Demo Request',
            body
        });
    });
})();
