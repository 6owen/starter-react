# Design System: Workflow.design

## 1. Visual Theme & Atmosphere

Workflow's marketing site is calm, editorial, and deliberately understated. The system avoids loud SaaS gradients and instead leans on a mostly monochrome palette, roomy full-width bands, and flat product-demo surfaces that let the message and motion carry the page.

- Overall feeling: Quiet, precise, product-led, and reviewer-friendly.
- Visual density: Spacious sections with long vertical breathing room and sparse chrome.
- Brand posture: Confident but not flashy; more considered studio tool than growth-hack landing page.
- Signature motifs: Full-width sections, flat off-white controls, light-weight display type, serif cameos for trust-building moments, and demo modules with soft utility-card styling.

### Key Characteristics

- Near-monochrome interface with one muted approval green accent.
- Flat surfaces and hairline dividers instead of shadow-heavy depth.
- Light-weight Inter display paired with selective Crimson Pro editorial moments.
- Full-width composition with consistent 16px side gutters and large vertical section gaps.

## 2. Color Palette & Roles

Use semantic roles first. Workflow is light-mode-first, with dark ink used as the primary brand anchor and pale neutrals doing most of the UI work.

| Role           | Semantic Name     | Value                    | Usage                                                |
| -------------- | ----------------- | ------------------------ | ---------------------------------------------------- |
| Primary action | Soft Utility Fill | `#F6F6F6`                | Main CTA fill, quiet controls, off-white chips       |
| Accent         | Approval Green    | `#547E69`                | Approval states, positive micro-signals inside demos |
| Surface        | Pure Surface      | `#FFFFFF`                | Page base, nav background, mobile menu backing       |
| Text           | Ink               | `#1A1A1A`                | Headlines, active tabs, navigation, dividers         |
| Border         | Hairline Ink      | `rgba(26, 26, 26, 0.12)` | Subtle section rules, tab rails, utility outlines    |

### Primary

- `#FFFFFF` is the dominant canvas and keeps the page bright, clinical, and calm.
- `#1A1A1A` is used everywhere meaningful: headlines, rules, icons, active states, and progress bars.

### Interactive

- Primary CTAs use `#F6F6F6` with dark text; hover shifts to `#ECECEC`.
- Inactive tabs and secondary text drop to roughly 65% ink opacity instead of changing hue.

### Neutral Scale

- `#F9F9F9` for very light supporting surfaces.
- `#F6F6F6` for controls and quiet callouts.
- `#ECECEC` for stronger utility cards and hovered controls.
- `rgba(26, 26, 26, 0.65)` for muted body copy.
- `rgba(26, 26, 26, 0.30)` and `rgba(26, 26, 26, 0.12)` for rails, dividers, and soft borders.

### Surface & Overlay

- Main page surface: `#FFFFFF`
- Elevated card and control surface: `#F6F6F6`
- Strong utility card surface: `#ECECEC`
- Warm blur layer: `#F6F4F0`
- Inverted surface for occasional internal UI moments: `#1A1A1A`

### Shadows & Depth

- Ring border: `0 0 0 1px rgba(26, 26, 26, 0.12)`
- Card shadow: `none`
- Focus treatment: Mostly minimal; emphasis comes from tone shifts, rails, and spacing rather than glow.

## 3. Theme Modes

No user-facing light/dark toggle was observed on `https://www.workflow.design/`. The site behaves as a single light theme with occasional inverted dark surfaces inside embedded product imagery and nav states.

### Light Mode

- Background: `#FFFFFF`
- Surface: `#F6F6F6`
- Text: `#1A1A1A`
- Accent: `#547E69`
- Notes: This is the primary and only explicit mode; the whole marketing system is tuned around pale neutrals and dark ink.

### Dark Mode

- Background: Not observed as a first-class site mode.
- Surface: Occasional inverted internal surfaces use `#1A1A1A`.
- Text: Inverted copy tokens exist in CSS as pale off-white.
- Accent: Approval green remains the same family when used.
- Notes: Treat dark usage as isolated component inversion, not a full theme.

## 4. Typography Rules

The system is restrained and typographically opinionated without being expressive-for-its-own-sake. Inter does nearly all of the work, then Crimson Pro appears only when the page wants to feel more editorial or more human.

### Font Family

- Primary: `Inter, Arial, sans-serif`
- Monospace: No product-specific monospace family was observed in the public page UI.
- OpenType Features: None visibly emphasized; the feel comes from weight and spacing, not feature styling.

### Hierarchy

| Role            | Font  | Size                                 | Weight         | Line Height      | Letter Spacing | Notes                                                  |
| --------------- | ----- | ------------------------------------ | -------------- | ---------------- | -------------- | ------------------------------------------------------ |
| Hero headline   | Inter | `32px` desktop/tablet, `24px` mobile | `300`          | `32px` / `24px`  | `normal`       | Centered, low-drama, almost anti-marketing in tone     |
| Section heading | Inter | `32px` desktop/tablet, `24px` mobile | `300`          | `32px` / `24px`  | `normal`       | Reuses the hero class for visual consistency           |
| Body            | Inter | `14px`                               | `400`          | `21px`           | `normal`       | Muted dark ink at about 65% opacity                    |
| Label / Eyebrow | Inter | `12px` to `14px`                     | `400` to `700` | `12px` to `21px` | `normal`       | Used for recording chips, banners, and micro-status UI |
| Caption / Meta  | Inter | `14px`                               | `400`          | `21px`           | `normal`       | Names, attribution, nav links, quiet metadata          |

### Principles

- Keep display text light in weight and short in line count.
- Reserve the serif voice for pull quotes and end-cap persuasion moments.
- Let muted opacity handle hierarchy before introducing additional colors.

## 5. Component Stylings

### Buttons and Links

**Primary CTA**

- Background: `#F6F6F6`
- Text: `#1A1A1A`
- Common size: `40px` tall with `8px 16px` internal padding
- Radius: `8px`
- Text style: `14px / 400 Inter`

**Secondary CTA**

- Background: `#FFFFFF`
- Text: `#1A1A1A`
- Ring: `rgba(26, 26, 26, 0.12)`
- Radius: `8px`
- Text style: `14px / 400 Inter`

- Text links: Plain dark or muted-dark text with no decorative flourish; nav links stay flat and rely on placement.
- Hover and active feel: Tone shifts only; no lift, no scale, no blur, no neon outline.

### Cards and Containers

- Surface style: Mostly borderless layouts with a few soft utility cards in `#ECECEC`.
- Radius: Standard controls use `8px`; demo tiles sometimes use asymmetrical `8px 0 0`.
- Border: Dividers are subtle ink hairlines rather than heavy container strokes.
- Shadow or elevation: Nearly always none.
- Internal spacing: Utility components favor `16px`, `24px`, and `48px`; quote containers use `48px` vertical padding with `24px` gaps.

### Inputs and Interactive Controls

- Input treatment: No public form field system is meaningfully exposed on this page.
- Focus behavior: Observed focus styling is understated; tabs explicitly keep the shared radius on `:focus-visible`.
- Selection states: Tabs switch from muted text to solid ink and reveal a 1px timer/progress rule.

### Navigation

- Structure: Fixed top header with stacked announcement capability, inline desktop nav, and a menu-button takeover below desktop widths.
- Background treatment: White primary layer; mobile open state adds a warm `#F6F4F0` blur veil over a white backing plane.
- Link style: `14px` Inter, regular weight, no ornament, no underlines.
- Sticky or scroll behavior: The header is fixed and slides upward on scroll rather than gaining shadow or shrinking.

### Image Treatment

- Screenshot treatment: Crisp product mockups inside flat or off-white cards; no glossy browser chrome.
- Photography or illustration style: Real people appear mainly in testimonial avatars; product imagery dominates.
- Border and radius treatment: Media stays clean and mostly square, with asymmetrical rounding used selectively for standout demo tiles.

### Distinctive Components

- Auto-rotating format tabs that use a thin timer bar instead of a filled pill state.
- Reviewer demo tiles that combine soft-gray surfaces with asymmetrical rounding.
- Serif pull quotes that interrupt the otherwise system-font-heavy page.

## 6. Layout Principles

### Spacing System

- Base unit: `8px`
- Repeated spacing values: `8px`, `16px`, `24px`, `40px`, `48px`, `112px`, `144px`

### Grid & Container

- Grid logic: Full-width bands with content aligned to a near-edge gutter rather than a narrow centered column.
- Max content width: Effectively viewport width minus about `16px` side gutters at desktop, tablet, and mobile.
- Section spacing: Repeated `144px` vertical gaps on desktop and `112px` on tablet/mobile.

### Whitespace Philosophy

- Whitespace philosophy: Let the page breathe; each story beat gets its own band of vertical air.
- Alignment tendencies: Sections run full width, but key copy clusters stay centered and visually quiet.
- Content width behavior: Text can span unusually wide on desktop, which reinforces the editorial calm and avoids card-over-card clutter.

### Border Radius Scale

- Micro: `4px`
- Standard: `8px`
- Large: `8px 0 0`
- Pill: Rarely used; prefer soft rectangles over capsules

## 7. Depth & Elevation

| Level | Treatment                                    | Use                                                                 |
| ----- | -------------------------------------------- | ------------------------------------------------------------------- |
| Flat  | Transparent or white surfaces with no shadow | Most sections, nav links, page background                           |
| Ring  | `1px` soft ink divider or rail               | Tab rails, subtle utility edges, quiet separation                   |
| Card  | `#ECECEC` or `#F6F6F6` fill with no shadow   | Demo tiles, quiet controls, utility shells                          |
| Focus | Minimal visual shift, mostly structural      | Keyboard states and active tabs rely on rails/radius more than glow |

### Depth Principles

- Surface hierarchy: Mostly two layers, white page and soft-gray utility surfaces.
- Shadow language: Avoided almost entirely.
- Blur, glass, or overlay behavior: Only the mobile navigation overlay meaningfully uses blur.
- When depth is used versus avoided: Use blur for full-screen state change, not for ordinary component emphasis.

## 8. Do's and Don'ts

### Do

- Use ink, white, and pale-gray neutrals as the dominant vocabulary.
- Keep CTA styling flat and calm, with hover handled through small fill changes.
- Introduce the serif voice only where trust, emotion, or reflection matters.

### Don't

- Don't introduce saturated multi-color gradients or glossy SaaS chrome.
- Don't rely on heavy shadows to separate layers.
- Don't over-round everything into pills; Workflow prefers restrained rectangles and occasional asymmetry.

## 9. Responsive Behavior

### Breakpoints

| Name    | Width           | Key Changes                                                                                               |
| ------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| Mobile  | `<= 767px`      | Headings compress from `32px` to `24px`; overlay menu takes over; stacked feature compositions get taller |
| Tablet  | `768px - 991px` | Desktop-scale typography remains, but nav switches to a menu button and overlay navigation                |
| Desktop | `>= 992px`      | Inline nav returns, header height expands to `83px`, and section rhythm opens to `144px`                  |

### Touch Targets

- Primary nav menu button is `48px` square.
- Tabs are `48px` tall and CTAs are `40px` tall; preserve the observed proportions even if you choose to enlarge the tap comfort slightly in implementation.

### Collapsing Strategy

- Navigation breaks first at `991px`, moving to a full-screen overlay with grouped link columns and a blurred warm backdrop.
- Typography holds steady through tablet, then compresses only once the layout hits mobile widths.
- Section gutters remain close to `16px` across all breakpoints; the page compresses by stacking, not by squeezing content into dense cards.

## 10. Agent Prompt Guide

### Quick Color Reference

- Background: `#FFFFFF`
- Elevated surface: `#F6F6F6`
- Heading text: `#1A1A1A`
- Body text: `rgba(26, 26, 26, 0.65)`
- Ring / border: `rgba(26, 26, 26, 0.12)`
- Accent / focus: `#547E69`

### Example Component Prompts

- Hero section: Build a full-width white hero with 16px page gutters, a centered light-weight Inter headline, muted 14/21 body copy, and one flat 8px-radius CTA in pale gray.
- Format tabs: Create a five-item tab row with 48px-tall text tabs, muted inactive labels, a current tab in solid ink, and a thin animated progress bar under the active item instead of a filled chip.
- Mobile menu: Design a full-screen overlay menu with a warm blurred scrim, a white backing plane, 16px side padding, 112px top padding, and grouped vertical link clusters separated by 40px gaps.

### Ready-to-Use Prompt

Design a landing page in the style of Workflow.design: light-mode-first, near-monochrome, full-width sections, Inter for most UI, Crimson Pro only for quotes or closing persuasion, flat off-white CTAs with 8px radius, no heavy shadows, and large vertical spacing bands that feel quiet and editorial rather than growth-marketing loud.

### Quick Summary

Workflow.design is a restrained product-marketing system built from ink, white, and soft grays, with serif accents and flat utility surfaces replacing the usual startup gradient-and-shadow stack.

### Iteration Guide

- If a composition feels too decorative, remove color before removing content.
- If a component feels too generic, introduce asymmetry or a thin timer rail instead of another border or shadow.
- If a section feels too busy, widen the vertical gap before shrinking typography.

## Interaction Patterns

- The top header is fixed and scroll-reactive; it translates upward instead of thickening or casting shadow.
- Primary CTA hover changes only the fill from `#F6F6F6` to `#ECECEC`.
- The tab system communicates activity through a 1px timer bar and muted-versus-solid text, not pill fills.
- Mobile navigation locks body scroll, adds a warm blur layer, and reveals grouped links in a full-screen overlay.

## Content & Messaging Patterns

- Headlines are short, literal, and problem-solution oriented.
- CTA language is concise and low-friction.
- Social proof appears often, but it is embedded into the flow instead of isolated as a loud trust wall.
- Product framing stays practical: feedback, revisions, approval, simplification, and reviewer ease.

## Observed Pages

- Source: https://www.workflow.design/
- Sample widths: `1440px`, `768px`, and `390px`
- Extraction mode: live Chrome CDP session with DOM, computed-style, and interaction-state sampling

## Evidence Notes

- Observed: section-to-section vertical gaps repeat at `144px` on desktop and `112px` on tablet/mobile.
- Observed: the major nav breakpoint occurs at `991px`, and the headline scale drops at `767px`.
- Observed: CSS variables expose the same neutral palette seen in rendering, including `#1A1A1A`, `#F6F6F6`, `#ECECEC`, and `#F6F4F0`.
- Inferred: the site prefers tonal state changes over explicit borders for most controls, except where rails or utility outlines communicate selection.
