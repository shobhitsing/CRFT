# CRFT · Cosmetic & Fragrance Regulatory, Packaging & Compliance Platform

> **100% Client-Side React 19 Application** built with TypeScript, Vite, React Compiler, and Lucide React. Designed for luxury cosmetic and fragrance brands (e.g., *Dkhoon The Emirates*) to manage product dossiers, formula safety, packaging digital twins, claims substantiation, and Digital Product Passports (DPP).

---

## 📑 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [Complete Frontend Functionality Breakdown](#-complete-frontend-functionality-breakdown)
   - [1. Portfolio & Product Catalog Management](#1-portfolio--product-catalog-management)
   - [2. Universal Product Editor & Local Persistence](#2-universal-product-editor--local-persistence)
   - [3. Product 360 & The 6 Regulatory Architecture Layers](#3-product-360--the-6-regulatory-architecture-layers)
   - [4. Digital Product Passport (DPP) & Vector GS1 QR Engine](#4-digital-product-passport-dpp--vector-gs1-qr-engine)
   - [5. Interactive Task Resolver & Readiness Score Simulator](#5-interactive-task-resolver--readiness-score-simulator)
   - [6. Specialized Domain Compliance Hubs](#6-specialized-domain-compliance-hubs)
   - [7. CRFT Genie AI Regulatory Copilot](#7-crft-genie-ai-regulatory-copilot)
   - [8. Supplier & Partner Engagement Modals](#8-supplier--partner-engagement-modals)
   - [9. Scroll-Aware Sticky Header & Adaptive Mobile Layout](#9-scroll-aware-sticky-header--adaptive-mobile-layout)
   - [10. Authentication Portal Flow](#10-authentication-portal-flow)
3. [Client-Side Routing Architecture](#-client-side-routing-architecture)
4. [State Management & Data Persistence](#-state-management--data-persistence)
5. [Project Structure](#-project-structure)
6. [Tech Stack](#-tech-stack)
7. [Getting Started & Local Development](#-getting-started--local-development)

---

## 🌟 Executive Summary

CRFT is an all-in-one frontend web application simulating enterprise-grade regulatory, toxicology, packaging, and commercial compliance workflows for luxury personal care and fragrance portfolios.

Everything runs entirely in the user's browser without requiring an external backend API:
- **Zero-backend dependency**: All product catalogs, audit tasks, layer states, and dossier edits are handled via reactive React 19 state and synchronized to browser `localStorage`.
- **Standards-aligned**: Built around real-world regulatory frameworks including **EU PPWR Article 11** (Packaging and Packaging Waste Regulation), **EU Cosmetic Regulation 1223/2009**, **US FDA MoCRA**, **UK pEPR**, **ISO 11930**, and **GS1 Digital Link** standards.

---

## 🛠 Complete Frontend Functionality Breakdown

### 1. Portfolio & Product Catalog Management
*Route: `/products` | File: [`src/pages/ProductsPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/ProductsPage.tsx)*

- **Portfolio KPI Metrics**: Displays real-time executive rollups:
  - *Total Products* in the brand portfolio.
  - *Active Regulatory Audits*.
  - *Portfolio-Wide Average Readiness Score* (dynamically computed).
  - *Critical Compliance Blockers* count.
- **Dual View Modes (Grid & List)**:
  - **Grid View**: Luxury cards featuring custom procedural SVG product illustrations (Bottles, Droppers, Jars, Tubes, Sprayers), live circular readiness rings, category chips, and urgency-coded missing action badges.
  - **List View**: Dense tabular data view displaying Product name, fill size, category, markets, progress bar, outstanding actions count, and action buttons.
- **Live Search & Category Filtering**: Instant client-side filtering by product name, fragrance/formula variant, brand, or category (*All Categories*, *Skincare*, *Haircare*, *Fragrance*, *Body Care*).
- **New Product Dossier Creation**: Quick launcher button opening a comprehensive creation modal.
- **Direct Dossier Navigation**: One-click transition from portfolio items into the deep-dive Product 360 workspace.

---

### 2. Universal Product Editor & Local Persistence
*Component: [`src/components/Modals.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/Modals.tsx)*

- **Universal Edit Modal (`EditProductModal`)**:
  - Accessible from the **Products Page cards** (pencil icon), **Products Page table rows** (quick edit), and the **Header breadcrumbs**.
  - Allows full editing of:
    - Product Title & Brand Identity.
    - Fill Size & Unit (e.g. `50 ml`, `100 ml`, `30 ml`).
    - Formulation Variant (e.g. *Eau de Parfum*, *Concentrate*, *Standard*).
    - Category Classification.
    - Target Regulatory Markets (EU, UK, US FDA, GCC/GSO, ASEAN).
    - Target Market Launch Deadline.
    - 3D Packaging Model Type (Serum Dropper, Perfume Flacon, Cream Jar, Cleanser Pump, Tube, Spray).
- **Instant Persistence**: Any modification updates the reactive state and immediately commits to `localStorage` under the key `'crft_products'`, preserving custom data across page refreshes.

---

### 3. Product 360 & The 6 Regulatory Architecture Layers
*Route: `/overview` | File: [`src/pages/ProductOverviewPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/ProductOverviewPage.tsx)*

- **Product Hero Card**:
  - Procedural vector rendering of the product packaging based on its assigned packaging type.
  - High-precision SVG circular progress meter displaying total dossier completion percentage.
  - Metadata badges: Brand, Category, Variant, Volume, Target Jurisdictions, and Last Timestamped Audit.
  - Quick action buttons to launch the Digital Product Passport (DPP) or edit product metadata.
- **The 6 Regulatory Architecture Layers**:
  Every cosmetic dossier is structured across 6 critical compliance pillars:
  1. **Layer 1: Formula Composition** (CAS registry, INCI listing, allergen breakdowns).
  2. **Layer 2: Toxicology & Safety Dossier** (CPSR Part A & B sign-off, MoCRA safety substantiation).
  3. **Layer 3: Packaging Digital Twin** (Component BOM, PPWR recyclability, barrier materials).
  4. **Layer 4: Artwork & Claims Proof** (On-pack claims verification, labeling symbols, warnings).
  5. **Layer 5: Commercialization & Trade** (GTIN / EAN barcodes, HS tariff codes, master carton specs).
  6. **Layer 6: Market Approvals** (EU CPNP, UK SCNP, US MoCRA, GSO conformity certificates).
- **Interactive Layer Editing (`handleOpenEdit`)**:
  - Each layer card features an **"Edit details"** action.
  - Opens a dedicated modal to update layer metadata, save working drafts, or mark an incomplete layer as **Complete**.
  - Marking a layer as complete dynamically updates the global readiness score and re-evaluates the dossier status.

---

### 4. Digital Product Passport (DPP) & Vector GS1 QR Engine
*Modal: `PassportModal` in [`src/components/Modals.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/Modals.tsx) | Page: [`src/pages/GenericProductPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/GenericProductPage.tsx)*

- **EU PPWR Article 11 & Ecodesign Compliant**: Generates a standardized, statutory Digital Product Passport.
- **Compact & Balanced Dialog Geometry**:
  - Engineered with a balanced 620px max-width container and reduced vertical footprint (`space-y-3.5`, `p-4 sm:p-5`), fitting cleanly into viewport heights without awkward scrolling.
- **Streamlined Typography Hierarchy**:
  - Compact title (`text-[13px] font-bold`) and micro-typography on metric headings (`text-[8.5px] uppercase tracking-wider`) with `text-xs` values, eliminating text crowding and wrapping.
- **Embedded Vector QR Code Generator**:
  - Renders a crisp 80×80px GS1 Digital Link vector QR Code directly in SVG.
  - Encodes the standard GS1 Digital Link URI: `https://dpp.crft.io/01/{GTIN}/21/{Serial}`.
- **One-Click Vector Export & Quick Copy**:
  - **Download QR (.svg)**: Exports the clean vector QR code directly to the user's filesystem as a standalone `.svg`.
  - **Public Link Bar**: Displays a truncated passport link with an inline quick-copy clipboard button.
- **DPP Transparency Metrics Grid**:
  - **Recyclability**: Grade A (94% mechanical recyclability, flint glass stream).
  - **CO2 Footprint**: 0.142 kg CO2e per unit lifecycle.
  - **Batch Registry**: Certified batch identifier (`#DX-8841-B`, Exp: Aug 2029).
  - **EU CPNP**: Official notification status (`#4109823`, UK OPSS Active).
- **Cryptographic Evidence Proof**:
  - Single-line verified evidence banner displaying immutable proof logged in the CRFT Evidence Vault under hash `0x98f2...b71c`.

---

### 5. Interactive Task Resolver & Readiness Score Simulator
*Component: [`src/pages/ProductOverviewPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/ProductOverviewPage.tsx)*

- **"What's Missing" Action Center**:
  - Renders urgent blockers standing between the formulation and international customs/retail approval.
  - Urgency categorization: `immediate`, `high`, and `normal`.
  - Contextual action triggers:
    - **"Ask my supplier"**: Opens the pre-filled supplier inquiry email modal.
    - **"Nudge lab"**: Opens the automated lab follow-up reminder modal.
    - **"Resolve"**: Instantly simulates resolving and uploading the required compliance evidence.
- **Real-Time Score Recalculator**:
  - Clicking **"Resolve"** increments the readiness score in real time (e.g., *91% → 96% → 100% Ready*) and decrements the pending missing items counter.
- **Celebratory Completion State**:
  - When all pending items are resolved, the card dynamically transforms into an **"All requirements verified"** celebratory banner with a green badge and full clearance confirmation.
  - Includes an interactive **"Re-audit Tasks"** button to reset the audit simulation for testing and demonstration.

---

### 6. Specialized Domain Compliance Hubs
*Files: [`src/pages/PackagingPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/PackagingPage.tsx), [`src/pages/LabPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/LabPage.tsx), [`src/pages/ClaimsPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/ClaimsPage.tsx), [`src/pages/VerifiedPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/VerifiedPage.tsx), [`src/pages/GenericProductPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/GenericProductPage.tsx)*

1. **Packaging Digital Twin (`/packaging`)**:
   - Bill of Materials (BOM) component explorer (Flacon bottle, collar, actuator pump, overcap, folding box).
   - Material breakdowns, post-consumer recycled (PCR) content percentages, and component tare weights.
   - Heavy metal migration declarations renewal status and direct supplier outreach triggers.
2. **Lab & LIMS Testing Hub (`/testing`)**:
   - Stability testing matrix (3-month accelerated 40°C, freeze-thaw cycles).
   - Preservative Efficacy Testing (PET / Challenge Test) adhering to ISO 11930.
   - Patch testing, repeat insult patch testing (RIPT), and toxicological heavy metal screening.
3. **Automated Claims Substantiation (`/claims`)**:
   - On-pack marketing claims scanner (e.g., *"72-Hour Hydration"*, *"Clean & Dermatologist Tested"*).
   - Cross-referencing against EU Regulation 655/2013 and US FTC Green Guides.
   - High-risk vs Low-risk claim categorization with linked clinical trial evidence IDs.
4. **Verified Regulatory Vault (`/verified`)**:
   - Live immutable regulatory audit trail with cryptographic-style verification hashes.
   - Government authority filing status across EU CPNP, UK SCNP, US FDA MoCRA, and GCC/GSO.
   - One-click export simulation for the Complete Cosmetic Product Safety Report (CPSR).
5. **ESG, Trade & Horizon Hubs**:
   - `/sustainability`: ESG metrics, packaging carbon footprint analysis, and recyclability audits.
   - `/horizon`: Proactive regulatory scanning for upcoming chemical bans (e.g., microplastics, PFAS, fragrance allergen expansions).
   - `/commerce` & `/retail`: Barcode compliance (EAN-13, GS1-128) and retailer clean lists (Sephora Clean, Ulta Conscious Beauty, Harrods).
   - `/borderpass`: Cross-border customs customs declarations, HS code classifications, and certificate of origin registry.
   - `/authentic`: Anti-counterfeit NFC serialisation and packaging authenticity verification.

---

### 7. CRFT Genie AI Regulatory Copilot
*Component: [`src/components/GenieDrawer.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/GenieDrawer.tsx)*

- **Context-Aware Sliding Drawer**:
  - Floats smoothly from the right side of the screen; triggered from the persistent floating action button, header quick button, or in-page prompts.
  - Automatically receives the active product context, current readiness percentage, and pending regulatory blockers.
- **Suggested Regulatory Prompts**:
  - Provides instant prompt pills (e.g., *"What is missing for EU CPNP?"*, *"Draft declaration request for Vetro Verde"*, *"Explain PPWR Grade A criteria"*).
- **Interactive Chat Interface**:
  - Users can ask regulatory questions and receive simulated expert answers regarding cosmetic compliance, toxicological requirements, and packaging recycling laws.

---

### 8. Supplier & Partner Engagement Modals
*File: [`src/components/Modals.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/Modals.tsx)*

- **Supplier Outreach Modal (`SupplierModal`)**:
  - Pre-fills formal technical correspondence for packaging or raw ingredient suppliers (e.g., *Vetro Verde SRL*).
  - Configurable recipient, subject line, and detailed regulatory inquiry body requesting EN 13428 / heavy metal migration certificates.
  - Dispatches with an internal audit tracking reference (`TX-VV-8841`).
- **Partner Nudge Modal (`NudgeModal`)**:
  - Automated follow-up reminder generator for testing laboratories and third-party safety assessors.
- **AI Compliance Sweep Modal (`AISweepModal`)**:
  - Simulated automated compliance scanner that scans formulation and packaging data across multi-jurisdiction rulebooks.
- **New Product Modal (`NewProductModal`)**:
  - Streamlined product dossier creation wizard that configures name, brand, volume, category, target markets, and packaging illustration.

---

### 9. Scroll-Aware Sticky Header & Adaptive Mobile Layout
*Files: [`src/components/Header.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/Header.tsx), [`src/components/Sidebar.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/components/Sidebar.tsx), [`src/index.css`](file:///c:/Users/HP/Desktop/crft/crft/src/index.css)*

- **Scroll-Aware Floating Header**:
  - Floats as a rounded luxury card (`border-radius: 20px`, soft shadow) with transparent background when at the top of the page.
  - Detects scroll movement (`scrollTop > 8px`) and transitions smoothly to a solid background (`var(--bg-main)`), preventing page content from bleeding through behind the header.
- **Breadcrumb Navigation**:
  - Displays `Portfolio > [Product Name]` with an interactive inline pencil button to trigger immediate editing.
- **Secondary Tab Strip**:
  - Clean secondary navigation tabs (`Overview`, `Packaging`, `Testing & LIMS`, `Claims`, `Passport`, etc.) with active pill indicators.
- **Mobile-First Header Refinement**:
  - Removed cumbersome 3-line hamburger text and replaced it with a modern, compact 32x32px menu icon button visible only on mobile/tablet screens (`< 1024px`).
  - Slide-over mobile drawer sidebar with smooth backdrop blur and swipe-away behavior.

---

### 10. Authentication Portal Flow
*File: [`src/pages/SignInPage.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/pages/SignInPage.tsx)*

- Luxury login portal adhering to CRFT's brand identity.
- Single-click **"Sign In"** simulation that logs the user into the regulatory console and returns to the active portfolio.
- Dedicated `/signin` URL route with quick navigation back to the application.

---

## 🧭 Client-Side Routing Architecture
*File: [`src/utils/router.ts`](file:///c:/Users/HP/Desktop/crft/crft/src/utils/router.ts)*

The application uses a custom, lightweight client-side router leveraging the native **HTML5 History API (`pushState` / `popstate`)**:
- **Clean Semantic URLs**: Navigates without messy query strings.
- **Supported Paths**:
  - `/` or `/products` — Master Portfolio Dashboard
  - `/overview` — Product 360 Architecture Overview
  - `/packaging` — Packaging BOM & Recyclability Twin
  - `/testing` (or `/lab`) — Lab & LIMS Testing Hub
  - `/claims` — Claims Substantiation & Artwork Verifier
  - `/verified` — Compliance Audit Vault & Registrations
  - `/passport` — Digital Product Passport & GS1 QR Code
  - `/sustainability` — Sustainability & ESG Metrics
  - `/horizon` — Regulatory Horizon Scanner
  - `/commerce` — Commercialization & Barcode Verification
  - `/retail` — Retailer Compliance Standards (Sephora, Ulta, Harrods)
  - `/borderpass` — Customs & Border Clearance Declarations
  - `/authentic` — Anti-Counterfeit Serialisation
  - `/signin` — Regulatory Portal Login
- **Full Browser History Support**: Back and forward browser buttons work seamlessly, maintaining active product context and scroll position.

---

## 💾 State Management & Data Persistence

1. **Reactive State**: Root state managed in [`src/App.tsx`](file:///c:/Users/HP/Desktop/crft/crft/src/App.tsx) using React 19 hooks (`useState`, `useEffect`, `useRef`).
2. **`localStorage` Synchronization**:
   - Initialized from `localStorage.getItem('crft_products')`.
   - Defaults to the luxury catalog in [`src/data/mockData.ts`](file:///c:/Users/HP/Desktop/crft/crft/src/data/mockData.ts) (*Night Repair Serum*, *Amber Oud EDP*, *Hydra-Plump Cream*, *Velvet Body Wash*, *Gentle Cleanser*, etc.).
   - Automatically synchronizes on every product edit, creation, or layer completion.
3. **Real-Time Score Computation**:
   - Dossier readiness percentages are recalculated when missing items are marked as resolved or when layer details are updated.

---

## 📂 Project Structure

```text
crft/
├── index.html                   # HTML entry point with luxury typography & viewport meta
├── package.json                 # Project configuration & scripts
├── vite.config.ts               # Vite configuration with React Compiler plugin
├── src/
│   ├── main.tsx                 # React application mounting point
│   ├── App.tsx                  # Root state, layout shell, routing coordinator & modals
│   ├── index.css                # Luxury design tokens, CSS variables, responsive styles
│   ├── types.ts                 # TypeScript type definitions (Product, Layer, MissingItem, etc.)
│   ├── components/
│   │   ├── Header.tsx           # Floating scroll-aware header & mobile menu button
│   │   ├── Sidebar.tsx          # Desktop navigation & mobile slide-over drawer
│   │   ├── Modals.tsx           # Universal Edit, DPP QR, Supplier, Nudge, New Product modals
│   │   ├── GenieDrawer.tsx      # AI Regulatory Copilot drawer
│   │   ├── ProductIllustration.tsx # Procedural vector luxury packaging illustrations
│   │   ├── CircularProgress.tsx # High-precision SVG circular readiness meters
│   │   └── AIBanner.tsx         # AI summary and audit banners
│   ├── pages/
│   │   ├── ProductsPage.tsx     # Master Portfolio (Grid & List views, metrics, search)
│   │   ├── ProductOverviewPage.tsx # Product 360, 6 Regulatory Layers & Task Resolver
│   │   ├── PackagingPage.tsx    # Packaging BOM, PPWR Recyclability & Material explorer
│   │   ├── LabPage.tsx          # Lab & LIMS Testing Hub (Stability, PET, Patch, Tox)
│   │   ├── ClaimsPage.tsx       # Claims Substantiation & Artwork verification
│   │   ├── VerifiedPage.tsx     # Regulatory Vault & Authority filings
│   │   ├── GenericProductPage.tsx # Universal handler for Passport, ESG, Horizon, Commerce
│   │   └── SignInPage.tsx       # Luxury authentication portal
│   ├── data/
│   │   └── mockData.ts          # Comprehensive luxury cosmetics mock dataset
│   └── utils/
│       └── router.ts            # HTML5 History API client-side routing utilities
```

---

## ⚡ Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript 7
- **Bundler & Dev Server**: Vite 8 with HMR
- **Compiler**: React Compiler (`babel-plugin-react-compiler`)
- **Icons**: Lucide React (`lucide-react`)
- **Linter**: Oxlint (`oxlint`)
- **Styling**: Modern CSS3 Custom Properties (Design Tokens), Flexbox, CSS Grid, Media Queries
- **Storage**: Client-Side HTML5 `localStorage`

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js (v18.0 or later recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository (if applicable) and navigate to the project directory:
cd crft

# Install dependencies:
npm install
```

### Running the Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### Linting
```bash
npm run lint
```
Runs high-speed linting via `oxlint`.

### Building for Production
```bash
npm run build
```
Compiles TypeScript and creates an optimized production bundle in the `dist/` directory.

### Previewing the Production Build
```bash
npm run preview
```
Previews the built application locally.
