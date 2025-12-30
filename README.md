# OpenForge

OpenForge builds reliable POS systems, modern websites, and practical security upgrades for businesses that care about speed, trust, and uptime.

This repository contains the OpenForge marketing site (static HTML/CSS/JS) used to present our offers, pricing ranges, and contact flow.

## What OpenForge Does

### 1) POS Systems (OpenForge POS)
Built for day-to-day retail workflows where downtime is expensive.

Typical outcomes:
- Faster billing (UI optimized for counter speed)
- Real-time stock tracking and low-stock alerts
- Daily / monthly reporting and operational visibility
- Optional user roles and custom workflows (discounts, returns, approvals)
- Backup and restore setup for resilience

Pricing ranges are shown on the site under the **POS pricing** section.

### 2) Web Development
Clean, modern websites built for clarity and performance.

Typical outcomes:
- Mobile-first landing pages and multi-page business sites
- Basic SEO setup and copy structure improvements
- Lead capture forms and routing (email)
- Performance pass (loading + images) and deployment support (domain/hosting)

Pricing ranges are shown on the site under the **Web development pricing** section.

### 3) Cyber Security
Security foundations designed to be practical (not overwhelming).

Typical outcomes:
- Baseline hardening recommendations (accounts, patching, backups, access control)
- Monitoring / SIEM planning for visibility and alerting
- Guidance that scales with your business (start small, grow maturity over time)

## Pricing (On-Site)

The landing page contains the current pricing tables:
- POS pricing: `#pricing`
- Web pricing: `#web-pricing`

Final pricing depends on scope, number of users, shop size, content readiness, and any custom requirements.

## How We Work

1. You request a demo or quote (choose POS / Web / Security)
2. We ask a couple of quick questions (only if needed)
3. We share a clear scope + timeline
4. We provide a straightforward quote (no lock-in pressure)

## Contact

Use the site’s contact section (`#demo`) to request a demo/quote.

Current email (temporary):
- `lakshan.sam28@gmail.com`

WhatsApp:
- `+94 77 81 77 435`

## Run Locally

This is a static site — no build step.

Option A: simple local server
```bash
python3 -m http.server 5173
```
Then open `http://localhost:5173`.

Option B: open directly
- Open `index.html` in your browser.

## Configure Analytics (Optional)

The site includes a Google Analytics snippet with a placeholder measurement ID:
- Update `G-XXXXXXXXXX` in `index.html` if you want analytics enabled.

## Project Structure

- `index.html` — single-page marketing site (POS + Web + Cyber Security + pricing + contact)
- `styles.css` — design system + section styling
- `script.js` — navigation behavior + gallery + contact form logic
- `assets/`
	- `assets/screenshots/` — SVG previews used across sections (POS/Web/Security)
	- `assets/logos/` — locally stored tech logos used in the Tech Stack section

## Tech Logos / Attribution

Tech stack logos are sourced from:
- `simple-icons` (CC0-1.0)
- `devicon` (MIT) — see `assets/logos/DEVICON_LICENSE.txt`
- Wazuh official logo asset from `wazuh.com` (brand/trademark owned by Wazuh, Inc.)

Brand names/logos remain trademarks of their respective owners.
