# AURA-delivery-app
AURA is a premium, mobile-first 5-in-1 on-demand beauty ecosystem built for South Africa (React 18 &amp; Tailwind). Features 60-min express delivery, midnight campus runs, stylist bookings, and luxury imports. LLMs used Google Gemini-2.5-Flash, it includes an integrated AI Beauty Matcher for routines and viral dupe curation in ZAR. 
# AURA 👑 — The Unified South African On-Demand Beauty Ecosystem

AURA is a premium, mobile-first 5-in-1 on-demand beauty ecosystem built for South Africa (React 18 & Tailwind). Features 60-min express delivery, midnight campus runs, stylist bookings, and luxury imports. Powered by Google Gemini-2.5-Flash, it includes an integrated AI Beauty Matcher for routines and viral dupe curation in ZAR.

## The South African Opportunity (The Problem)

South Africa boasts massive, highly active cosmetics and wig/hair industries driven by social media influence and a thriving skincare culture. However, the market still lacks a dominant, consolidated on-demand beauty-delivery tech player.
* Traditional online stores suffer from long shipping times.
* Beauty services (makeup artists, nail techs, wig installers) are highly fragmented and lack centralized booking.
* Students face late-night beauty/hygiene emergencies with zero rapid-delivery recourse.

## 🚀 The Solution: 5-in-1 Integrated Ecosystem
Aura solves this fragmentation by combining 5 distinctive business models into one high-performance application:

1. ⚡ **Sixty60 Express ("Beauty in 60 Minutes")**
   * *Concept:* Checkers Sixty60 meets Sephora. Delivers premium cosmetics, high-end skincare, and luxury perfumes to major SA hubs (Johannesburg, Sandton, Rosebank, Pretoria East, Cape Town) in 60 minutes or less.
2. 🎓 **Campus Run (Midnight Emergencies)**
   * *Concept:* Hyper-localized, rapid delivery catering to university student residences (Wits, UP, UJ, and UNISA) up to 2:00 AM for edge control, wig glue, individual lashes, and feminine hygiene products.
3. 💄 **AURA Go ("Uber for Beauty Professionals")**
   * *Concept:* Connects vetted makeup artists (MUAs), precision nail technicians, lash architects, and wig installers directly to clients' homes, offices, or dorm rooms.
4. 💎 **Luxury Concierge**
   * *Concept:* Services affluent neighborhoods (Sandton, Waterfall City, Pretoria East) by sourcing rare imported products, providing personal beauty shoppers, and premium tier-based subscription boxes.
5. 🌸 **TikTok & K-Beauty Hub**
   * *Concept:* Fast-trend social retail showcasing viral social media skincare (like COSRX and Beauty of Joseon) alongside high-quality, budget-friendly "dupes".

## 🛠️ Tech Stack & Architecture

AURA is engineered as a unified, single-file monolithic client application (`AuraEcosystem.jsx`). This approach houses the entire reactive ecosystem context inside a centralized state machine, enabling instantaneous view switching between users and logistics providers without loading delays.

* **Frontend Framework:** React 18
* **Styling Engine:** Tailwind CSS (Optimized for dark mode with premium pink, purple, and slate glassmorphism)
* **Intelligence Layer:** Google Gemini-2.5-Flash (Integrated with exponential backoff for resilient API calling)

### 🎛️ App View States
* **Consumer Portal (User View):** Handles Sixty60 Express ordering, Midnight Campus Run delivery requests, and real-time package mapping tracking.
* **Driver Dispatch (Logistics View):** Real-time order step-tracker interface (Confirmed → Packing → Departed → Arrived) simulating active fleet management.
* **AI Consultant Layer:** Powered by the Gemini API, featuring an interactive, real-time AI consultant that acts as a virtual beauty expert to identify skin types, suggest routines tailored for the SA climate, and recommend viral dupes available in the store.

## 🔒 Security Architecture & Hardening

AURA is built following industry-standard OWASP security guidelines to protect user data, secure automated logistics, and safeguard AI infrastructure.

* **Environment Isolation:** Zero hardcoded secrets. All runtime credentials and Google Gemini keys are managed via isolated `.env` configurations, strictly managed by a comprehensive `.gitignore` protocol to prevent accidental credential leaks.
* **Input Sanitization:** Implemented context-validation boundaries on the `Gemini-2.5-Flash` integration layer. User queries are validated to enforce character limits and strip executable code tags, eliminating malicious script execution and preventing system prompt overrides.
