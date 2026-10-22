---
name: "Aman Kumar Sharma Portfolio"
description: "A cinematic technical self-portrait built from graphite stages, silver-white type, and restrained interaction."
colors:
  paper: "oklch(11.5% 0.003 260)"
  paper-raised: "oklch(16% 0.004 260)"
  paper-high: "oklch(22% 0.004 260)"
  ink: "oklch(97% 0.004 85)"
  ink-soft: "oklch(82% 0.008 85)"
  ink-muted: "oklch(65% 0.008 85)"
  rule: "oklch(28% 0.006 260)"
  rule-strong: "oklch(42% 0.007 260)"
  accent: "oklch(91% 0.015 83)"
  accent-ink: "oklch(12% 0.004 260)"
  focus: "oklch(88% 0.04 85)"
  success: "oklch(77% 0.18 155)"
  white: "oklch(99% 0.003 85)"
  silver: "oklch(86% 0.008 260)"
  glass: "oklch(18% 0.004 260 / 0.72)"
typography:
  display:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(2.65rem, 14vw, 14rem)"
    fontWeight: 950
    lineHeight: 1
    letterSpacing: "-0.04em"
  loader:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(3.4rem, 15vw, 13rem)"
    fontWeight: 950
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(3.2rem, 7vw, 6rem)"
    fontWeight: 950
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(1rem, 2.4vw, 1.45rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "0.02em"
  body:
    fontFamily: "IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.16em"
rounded:
  sm: "0.25rem"
  md: "0.75rem"
  xl: "1.5rem"
  full: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  3xl: "6rem"
  4xl: "9rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "2.75rem"
  round-control:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "2.75rem"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    height: "2.75rem"
  capability-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "1.5rem clamp(1rem, 4vw, 4rem)"
    height: "5.9rem"
  capability-row-open:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  tech-chip:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.3rem 0.65rem"
  tonal-card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.xl}"
    padding: "clamp(1.5rem, 4vw, 2.5rem)"
---

# Design System: Aman Kumar Sharma Portfolio

## Overview

**Creative North Star: "The Digital Self-Portrait"**

The system frames Aman's work as a cinematic, technical self-portrait. Near-black graphite fields let the portrait, oversized silver-white typography, and real project information carry the experience; restrained blue-white image highlights add atmosphere without becoming a competing accent system.

Its component language is architectural and restrained: compact controls, firm type, hairline divisions, measured tonal steps, and deliberate state changes. Expressive moments come from scale, image treatment, and motion rather than ornamental chrome. The result should feel authored and immersive while remaining legible, keyboard-operable, and composed on small screens.

**Key Characteristics:**

- Graphite-on-graphite surfaces with silver-white information hierarchy.
- One sans-serif family used through sharp contrasts in scale, weight, and tracking.
- Compact pill controls and squared media balanced by selectively rounded containers.
- Tonal depth, hairline rules, and a single soft text shadow instead of floating panels.
- Restrained, purposeful motion with complete reduced-motion behavior.
- A single authored loading sequence where loose silver pixels converge into the supplied AKS mark, resolve sharply, and hand off to a PORTFOLIO word reveal before releasing the portrait particles.

## Colors

The palette moves from near-black graphite through charcoal and silver-white, with blue-white highlights reserved for imagery and subtle atmospheric detail.

### Primary

- **Warm Silver Accent** (`oklch(91% 0.015 83)`): Inverts capability rows and fills primary actions; it is the system's brightest interactive surface.
- **Graphite Accent Ink** (`oklch(12% 0.004 260)`): Carries text and icons placed on the warm silver accent.

### Neutral

- **Graphite Stage** (`oklch(11.5% 0.003 260)`): The dominant page and control background.
- **Raised Charcoal** (`oklch(16% 0.004 260)`): Separates cards and hover states from the base stage without casting a shadow.
- **High Charcoal** (`oklch(22% 0.004 260)`): Supports large, deliberately quiet background lettering.
- **Silver-White Ink** (`oklch(97% 0.004 85)`): Primary text and icon color.
- **Soft Silver Ink** (`oklch(82% 0.008 85)`): Long-form copy and secondary interactive text.
- **Muted Silver Ink** (`oklch(65% 0.008 85)`): Metadata, labels, and supporting copy.
- **Graphite Rule** (`oklch(28% 0.006 260)`): Hairline dividers and low-emphasis boundaries.
- **Strong Graphite Rule** (`oklch(42% 0.007 260)`): Control outlines, chip borders, and higher-emphasis frames.
- **Display Silver** (`oklch(86% 0.008 260)`): Oversized display lettering.
- **Crisp White** (`oklch(99% 0.003 85)`): The primary-action hover lift.
- **Smoked Glass** (`oklch(18% 0.004 260 / 0.72)`): Translucent circular controls and compact status surfaces.
- **Focus Silver** (`oklch(88% 0.04 85)`): The visible two-pixel keyboard focus outline.
- **Signal Green** (`oklch(77% 0.18 155)`): The small availability indicator only.

### Named Rules

**The Silver Stage Rule.** Keep graphite dominant and use silver-white for hierarchy; imagery may carry restrained blue-white highlights, but interface chrome stays neutral.

**The Signal Discipline Rule.** Bright fills communicate interaction or status, never decoration.

## Typography

**Display Font:** IBM Plex Sans (with sans-serif fallback)  
**Body Font:** IBM Plex Sans (with Segoe UI and sans-serif fallbacks)  
**Label Font:** IBM Plex Sans (with Segoe UI and sans-serif fallbacks)

**Character:** A single neo-grotesque family creates cohesion while extreme weight and scale shifts supply the drama. Dense uppercase display forms feel structural; body copy stays calm, open, and readable.

### Hierarchy

- **Display** (950, `clamp(2.65rem, 14vw, 14rem)`, 1): Full-impact wordmarks and singular statements, set uppercase with tight tracking (`-0.04em`).
- **Loader** (950, `clamp(3.4rem, 15vw, 13rem)`, 1): The one-time name-to-PORTFOLIO sequence; it shares the display voice but owns its authored entry scale.
- **Headline** (950, `clamp(3.2rem, 7vw, 6rem)`, 0.94): Section-defining statements with tight tracking (`-0.04em`).
- **Title** (900, `clamp(1rem, 2.4vw, 1.45rem)`, 1.1): Compact component titles and capability labels, typically uppercase.
- **Body** (400, `1rem`, 1.75): Narrative copy, usually constrained to approximately 53–62 characters per line.
- **Label** (600, `0.72rem`, `0.16em`): Metadata and compact status language; uppercase is used where a control or status benefits from a technical cadence.

### Named Rules

**The One-Family Rule.** Build hierarchy with IBM Plex Sans weight, scale, case, and tracking before introducing another typeface.

**The Display Compression Rule.** Large type is heavy, tightly tracked, and close-set; reading copy is regular-weight with generous leading.

## Layout

Content sits inside a centered fluid shell capped at `96rem`, with a responsive gutter of `clamp(1rem, 4vw, 4rem)`. The spatial rhythm uses a compact `0.5rem`–`1.5rem` cadence inside components and expands to `2.5rem`, `6rem`, and `9rem` between major content beats.

The base layout is single-column and intentionally composed down to a `20rem` viewport. At `48rem`, navigation, project rows, capability detail, education, and footer content may form deliberate multi-column arrangements; at `80rem`, only large-stage spacing increases. Horizontal rails use snap alignment rather than shrinking cards beyond legibility, and coarse-pointer controls rise to a minimum `3rem` height.

**The Composed Breakpoint Rule.** Responsive changes reorganize hierarchy and reading order; they do not merely scale the desktop arrangement down.

## Elevation & Depth

Depth is tonal. The base stage, raised charcoal panels, stronger charcoal fields, translucent glass, borders, imagery, and overlap establish layers without card shadows. The sole recurring soft shadow is the display-wordmark drop shadow (`0 0.75rem 1.5rem oklch(3% 0.004 55 / 0.55)`), used to preserve separation over the portrait.

### Shadow Vocabulary

- **Display Text** (`0 0.75rem 1.5rem oklch(3% 0.004 55 / 0.55)`): A soft atmospheric shadow for oversized silver lettering over imagery; never a general container elevation.

### Named Rules

**The Tonal Depth Rule.** Separate interface layers with graphite steps and hairline rules; do not float ordinary cards with shadows.

**The One Shadow Rule.** Reserve the soft shadow for display text crossing image content.

## Shapes

The system combines exact rectangles with a small, purposeful radius vocabulary. Media frames and capability rows stay square and architectural. Content containers use a generous `1.5rem` radius when they need to feel held, while compact chips and controls use the full pill radius (`999px`). The `0.75rem` and `0.25rem` steps are reserved for intermediate geometry rather than applied indiscriminately.

Hairline boundaries are one pixel. Stronger two-pixel borders belong to rail cards that need a clear silhouette against the stage.

## Components

Components feel compact, structural, and calm at rest, then answer with precise tonal inversion or line movement.

### Buttons

- **Shape:** Pill actions use a full radius (`999px`) and a minimum height of `2.75rem`; circular icon controls are `2.75rem` square.
- **Primary:** Warm silver fill with graphite text and `1.5rem` horizontal padding.
- **Hover / Focus:** Primary actions brighten to crisp white; secondary and circular controls fill warm silver. Every interactive control uses a two-pixel focus outline with a four-pixel offset.
- **Secondary:** Transparent graphite-stage control with a strong graphite hairline and silver-white text.

### Chips

- **Style:** Transparent pill with a strong graphite hairline, soft silver text, `0.3rem 0.65rem` padding, and compact label sizing.
- **State:** Chips are informational rather than selectable; do not imply a filter state.

### Cards / Containers

- **Corner Style:** Content cards use the generous radius (`1.5rem`); project media and rail cards remain square.
- **Background:** Raised charcoal on the graphite stage.
- **Shadow Strategy:** No container shadow; depth comes from tone and border contrast.
- **Border:** One-pixel graphite rules for content cards; two-pixel strong graphite rules for rail cards.
- **Internal Padding:** `1.5rem` for compact cards and `clamp(1.5rem, 4vw, 2.5rem)` for reading containers.

### Navigation

Desktop links are compact, uppercase, and soft silver at rest. Hover and active states brighten the text, while the active item grows a warm silver one-pixel underline from the left. Below `48rem`, navigation becomes a full-screen graphite menu with large, heavy rows separated by hairline rules and a circular menu control.

### Capability Rows

Capability rows are square, full-width architectural controls. The closed state rests on graphite; hover rises one tonal step. The open state inverts the trigger and its expanding detail panel to warm silver with graphite ink over a `420ms` eased reveal.

## Do's and Don'ts

### Do:

- **Do** keep the visual field overwhelmingly graphite and let silver-white type establish hierarchy.
- **Do** use the shared fluid gutter, `96rem` content cap, and observed spacing rhythm for new sections.
- **Do** pair compact controls with complete hover, focus-visible, coarse-pointer, and reduced-motion states.
- **Do** use heavy type, scale, imagery, and tonal contrast to create drama.

### Don't:

- **Don't** introduce colorful interface accents; reserve blue-white variation for image highlights and the existing signal green for status.
- **Don't** add generic drop shadows to cards, buttons, navigation, or containers.
- **Don't** round every surface; preserve square media and rows so pills and held containers remain meaningful.
- **Don't** create decorative actions or unsupported links; visible controls must have a real destination or state change.
