# OpenForge

OpenForge is a static marketing site for a cybersecurity-first small business service brand.

The site positions OpenForge around practical website security, email security, Microsoft 365 / Google Workspace review, website hardening, and monthly security care for Sri Lankan SMEs and small businesses.

## Primary Offer

- Free 1-page Mini Security Review
- Security Health Check: LKR 25,000
- Business Security Review: LKR 50,000
- Monthly Security Care: LKR 35,000-75,000/month

Web development and POS systems remain available as supporting services, but cybersecurity is the primary offer.

## Site Structure

- `index.html` - Home page with cybersecurity-first positioning
- `security.html` - Security Health Check sales page
- `monthly-care.html` - Monthly Security Care recurring support page
- `web.html` - Secondary web development service page
- `pos.html` - Secondary POS systems service page
- `customers.html` - Experience Highlights / proof page
- `sample-report.html` - Sample Security Report preview
- `contact.html` - Lead-generation contact form
- `styles.css` - Shared matte black / off-white design system with 3D depth styling
- `script.js` - Mobile nav, FAQ behavior, and contact form mail/WhatsApp routing
- `openforge-scene.js` - Three.js-powered 3D security command-center hero scene
- `assets/vendor/three.module.min.js` - Local Three.js module used by the 3D scene

## Contact

Email:
- `contact@getopenforge.net`

WhatsApp:
- `+94 77 81 77 435`

## Run Locally

This is a static site with no build step.

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

You can also open `index.html` directly in a browser, though the local server is better for testing page links.

## Safety Positioning

Security copy should stay calm, practical, and permission-based:

- Authorized checks only
- No destructive testing
- No exploitation without written permission
- Clear written scope
- Confidential handling of findings
- NDA available if required
