function finishPageLoader() {
    const markLoaded = () => {
        document.body.classList.add("is-loaded");
        document.body.classList.remove("page-exiting");
    };

    if (document.readyState === "complete") {
        window.setTimeout(markLoaded, 260);
    } else {
        window.addEventListener("load", () => window.setTimeout(markLoaded, 260), { once: true });
        window.setTimeout(markLoaded, 1800);
    }
}

finishPageLoader();

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getHeaderOffset() {
    return siteHeader ? Math.ceil(siteHeader.getBoundingClientRect().height + 18) : 86;
}

function updateHeaderState() {
    if (!siteHeader) return;

    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

let headerTicking = false;

window.addEventListener("scroll", () => {
    if (headerTicking) return;

    headerTicking = true;
    window.requestAnimationFrame(() => {
        updateHeaderState();
        headerTicking = false;
    });
}, { passive: true });

window.addEventListener("resize", updateHeaderState);
updateHeaderState();

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        navToggle.classList.toggle("is-active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            navToggle.classList.remove("is-active");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        });
    });
}

const currentPage = document.body.dataset.page;

if (currentPage) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === currentPage);
    });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -12% 0px", threshold: 0.16 });

        revealItems.forEach((item) => revealObserver.observe(item));
    }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const offset = getHeaderOffset();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
});

document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target && link.target !== "_self") return;
        if (link.hasAttribute("download")) return;

        const rawHref = link.getAttribute("href");
        if (!rawHref || rawHref.startsWith("#")) return;

        const url = new URL(rawHref, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) return;

        document.body.classList.add("page-exiting");
    });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;

        const list = item.closest(".faq-list");
        if (!list) return;

        list.querySelectorAll("details").forEach((other) => {
            if (other !== item) other.open = false;
        });
    });
});

const contactForm = document.querySelector("[data-contact-form]");
const whatsappLink = document.querySelector("[data-whatsapp-link]");

function encodeLine(label, value) {
    const clean = String(value || "").trim();
    return clean ? `${label}: ${clean}` : "";
}

function buildContactMessage(form) {
    const data = new FormData(form);
    const lines = [
        "OpenForge security review request",
        "",
        encodeLine("Name", data.get("name")),
        encodeLine("Business", data.get("business")),
        encodeLine("Website", data.get("website")),
        encodeLine("Email", data.get("email")),
        encodeLine("Phone", data.get("phone")),
        encodeLine("Service interest", data.get("service")),
        encodeLine("Email platform", data.get("platform")),
        encodeLine("Main concern", data.get("concern")),
        "",
        "Message:",
        String(data.get("message") || "").trim()
    ];

    return lines.filter((line, index) => line || index === 1).join("\n");
}

function updateWhatsappLink() {
    if (!contactForm || !whatsappLink) return;

    const message = buildContactMessage(contactForm);
    whatsappLink.href = `https://wa.me/94778177435?text=${encodeURIComponent(message)}`;
}

if (contactForm) {
    contactForm.addEventListener("input", updateWhatsappLink);
    contactForm.addEventListener("change", updateWhatsappLink);

    contactForm.addEventListener("submit", () => {
        updateWhatsappLink();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.disabled = true;
        submitButton.textContent = "Sending request...";
    });

    updateWhatsappLink();
}
