# Musician Design System Guidelines

## Purpose
This document defines the visual design system, typography, motion, and layout principles for the `musician-ds` project. It ensures consistency in layout, visual hierarchy, UI framing, typography, spacing, and component presentation across the application and any landing pages.

---

## Core Design Principles

### Clarity & Whitespace
Every section should communicate one idea clearly. Interfaces must avoid density. Whitespace is an essential design tool—allow elements room to breathe.

### Visual Hierarchy
Large ideas deserve large space. Headlines and key visuals should dominate the page. Avoid stacking many equally-sized small UI elements. 

### Interactive Product as Hero
Screens and interactive UI components should be large and immersive. Treat the interface elements (like Profile Cards and Audio Previews) as the primary visual focus.

---

## Typography

The design system utilizes a clear, geometric scale optimized for legibility and modern aesthetics.

**Recommended Fonts:**
* Primary: Outfit, Inter, or SF Pro

**Scale:**
* **Display / Hero Title:** 56–64px (Heavy/Bold)
* **Heading 1:** 40–48px
* **Section Title (Heading 2):** 28–32px
* **Heading 3:** 20–24px
* **Body (Paragraph):** 16–20px (Comfortable line-height: 1.5 - 1.6)
* **Caption / Label:** 14px

*Line length for readable blocks (Context blocks) should be constrained to 60–75 characters.*

---

## Spacing System

Our spacing scale is built on an **8px grid**.

**Scale:**
* 4px (Micro)
* 8px (Base)
* 16px
* 24px
* 32px
* 48px
* 64px
* 96px
* 120px (Major section gaps)

---

## Layout Components & Rhythm

Layouts should guide readers through a narrative flow. The maximum content width is **1200px** with fluid, responsive gutters.

### Key Layout Architectures

**Hero Section**
* **Purpose:** Introduce the project and establish visual tone.
* **Structure:** Headline → Subheadline → Metadata Row → Large Immersive Visual.

**Feature Spotlight**
* **Purpose:** Highlight one meaningful feature.
* **Layout:** Two-column split on desktop. Left side: Text explanation. Right side: Large UI visual or interactive component. Stacks vertically on mobile.

**Metrics / Impact Grid**
* **Purpose:** Present distinct outcomes.
* **Layout:** A grid of 3–4 numeric cards featuring large (+40%) numbers with small sublabels.

**Context Block**
* **Purpose:** Provide central narrative or project background.
* **Layout:** Centered text block with a strict maximum width of 700px. May include a prominent pull quote. 

---

## Motion System

Motion should enhance storytelling without distracting from the content.

### Principles
* **Subtlety:** Motion must be minimal, purposeful, and never purely decorative.
* **Performance:** Utilize CSS transitions and native APIs (like Intersection Observer) instead of heavy JS physics libraries.

### Core Animations
1. **Section Reveal:** Fade in as elements enter the viewport.
   * `opacity: 0 -> 1`
   * `transform: translateY(20px) -> translateY(0)`
   * Duration: 400–600ms, `ease-out`.
2. **Hover Elevation:** Interactive cards (like ProfileCards) lift slightly.
   * `transform: translateY(-4px)` with an enhanced soft shadow.
   * Duration: 200-300ms, `ease-out`. 
3. **Image / UI Hover Zoom:** Large visuals scale subtly when interacted with.
   * `transform: scale(1) -> scale(1.03)`. 
