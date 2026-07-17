---
name: KV de Zwaluwen Narrowcasting Dashboard
description: Kiosk-scorebord voor korfbalvereniging KV de Zwaluwen — standen, uitslagen, programma, leesbaar op afstand.
colors:
  primary: "#0F61A5"
  primary-deep: "#0B4A80"
  neutral-bg: "#FAFAF9"
  neutral-surface: "#FFFFFF"
  neutral-border: "#E5E7EB"
  neutral-ink: "#1F2937"
  neutral-muted: "#6B7280"
  accent-highlight: "#E0F2FE"
  success-bg: "#BBF7D0"
  success-ink: "#16A34A"
  warning-bg: "#FEF08A"
  warning-ink: "#CA8A04"
  danger-bg: "#FECACA"
  danger-ink: "#DC2626"
typography:
  display:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  nav-pill:
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  nav-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  table-row-home:
    backgroundColor: "{colors.accent-highlight}"
  progress-track:
    backgroundColor: "{colors.neutral-border}"
    rounded: "{rounded.full}"
    height: "4px"
  progress-fill:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: "4px"
---

# Design System: KV de Zwaluwen Narrowcasting Dashboard

## 1. Overview

**Creative North Star: "Het Scorebord"**

Dit is geen app, het is een scorebord. Niemand tikt erop, niemand scrollt — het hangt aan de muur en moet in één blik kloppen, van vijf meter afstand, tussen de bar en het veld door. Elke ontwerpkeuze dient scanbaarheid op afstand: grote cijfers, hoog contrast, rust in de marges. Clubblauw (#0F61A5) is de enige plek waar het systeem zich manifesteert als "van De Zwaluwen" — verder blijft alles neutraal grijs/wit zodat de data zelf het scherm vult, niet de chrome eromheen.

Het systeem wijst generieke SaaS-dashboard-taal expliciet af: geen kaarten-grid voor tabeldata, geen gradient-tekst, geen kleine grijze tekst die van dichtbij gelezen moet worden, geen decoratieve drukte die afleidt van de standen.

**Key Characteristics:**
- Blauw is accent, niet basis — grijs/wit draagt het scherm.
- Type is groot by default; er is geen "klein lettertype voor bijzaken" op een TV-scherm.
- Vlak in rust; enige diepte zit in de sticky header, verder niets.
- Eén visuele "eigen club"-marker (sky-highlight rij) — geen tweede concurrerend accentsysteem.

## 2. Colors

Neutrale basis, één club-accent, drie semantische kleuren voor Alert-meldingen. Kleur wordt spaarzaam ingezet zodat blauw betekenis behoudt.

### Primary
- **Clubblauw** (#0F61A5): actieve navigatie-pill, progress-bar fill, primaire nadruk. Nergens gebruikt als achtergrond van grote vlakken — dat zou de rust van het scorebord breken.
- **Clubblauw Diep** (#0B4A80): hover/pressed-variant van clubblauw waar een donkerdere stap nodig is.

### Neutral
- **Scorebord Wit** (#FAFAF9): pagina-achtergrond (`bg-stone-50`).
- **Kaart Wit** (#FFFFFF): sticky header, tabel-achtergronden.
- **Lijn Grijs** (#E5E7EB): randen, dividers, progress-track.
- **Inkt Grijs** (#1F2937): primaire tekstkleur, actieve nav-tekst.
- **Gedempt Grijs** (#6B7280): secundaire tekst (klok, "bijgewerkt om").

### Semantic (Alerts)
- **Succes Groen** (bg #BBF7D0 / ink #16A34A): bevestigingsmeldingen.
- **Waarschuwing Geel** (bg #FEF08A / ink #CA8A04): standaard/informatieve meldingen.
- **Fout Rood** (bg #FECACA / ink #DC2626): foutmeldingen.

### Accent
- **Eigen-Club Highlight** (#E0F2FE, `sky-100`): markeert de rij van KV de Zwaluwen in de standentabel. De enige plek waar een tweede accentkleur naast blauw mag verschijnen, omdat het een functionele markering is, geen decoratie.

### Named Rules
**De Eén-Accent Regel.** Clubblauw is de enige merkkleur die interactie/nadruk aanduidt (actieve nav, progress-fill). Andere kleur = andere betekenis (semantisch alert, of eigen-club-markering), nooit decoratief.

## 3. Typography

**Display/Body Font:** Geist Sans (fallback: system-ui, sans-serif)
**Label/Mono Font:** Geist Mono (fallback: ui-monospace, monospace) — voor klok en tabulaire cijfers (`tabular-nums`)

**Character:** Eén geometrische sans-familie, in gewicht gevarieerd voor hiërarchie. Geen tweede lettertype nodig — het scherm heeft geen ruimte voor typografisch onderscheid van dichtbij, wél voor groot-versus-klein op afstand.

### Hierarchy
- **Display** (700, `clamp(2rem, 3.5vw, 3rem)`, 1.1): sectietitels die van across-the-room leesbaar moeten zijn (bijv. "Standen Jeugd").
- **Title** (700, 1.5rem, 1.2): tabelkoppen, teamnamen in uitslagen.
- **Body** (400, 1.125rem, 1.5): standaard tabelcellen, standen-cijfers. Nooit kleiner — dit is de kleinste toegestane leesmaat op dit scherm.
- **Label** (500, 0.875rem, letter-spacing 0.02em, Geist Mono): klok, "Bijgewerkt: xx:xx", tijdstempels. Enige plek waar kleiner dan Body mag, omdat het bijzaak-info is, geen primaire data.

### Named Rules
**De Geen-Kleine-Data Regel.** Standen, uitslagen en programma-cijfers zijn nooit kleiner dan Body (1.125rem). Alleen metadata (klok, cache-timestamp) mag Label-formaat gebruiken. Huidige `text-xs`/`text-sm` op body-niveau is een bekende afwijking van deze regel en moet omhoog bij volgende implementatie.

## 4. Elevation

Vlak in rust. De enige schaduw in het systeem zit op de sticky header (`0 14px 24px rgba(0,0,0,0.1)` + `backdrop-filter: blur`), die zich scheidt van de scrollende content eronder. Tabellen, kaarten en alerts hebben geen eigen schaduw — hun scheiding komt van whitespace en achtergrondkleur (wit op `neutral-bg`), niet van diepte.

### Shadow Vocabulary
- **Header Ambient** (`box-shadow: 0 14px 24px rgba(0,0,0,0.1)` + `backdrop-filter: blur(12px)`): enige toegestane schaduw, uitsluitend op de sticky header.

### Named Rules
**De Vlak-Tenzij-Sticky Regel.** Schaduw is gereserveerd voor de sticky header. Alle andere oppervlakken zijn vlak; diepte zou op een TV-scherm ruis toevoegen zonder functie.

## 5. Components

### Navigation (pills)
- **Shape:** volledig afgerond (`rounded-full`, 9999px).
- **Default:** transparante achtergrond, `neutral-ink` tekst, icoon + label.
- **Active:** `primary` achtergrond, witte tekst — enige plek waar clubblauw een vlak vult, bewust klein (padding 8px/12px) om de Eén-Accent Regel te respecteren.
- **Gedrag:** navigatie is niet klikbaar voor de kijker; de actieve state wordt automatisch gezet door de 10-seconden auto-cycle, niet door hover/focus.

### Progress Bar (auto-cycle indicator)
- **Style:** track `neutral-border` (4px, `rounded-full`), fill `primary` (4px, `rounded-full`), `transition: width 100ms`.
- **Doel:** enige animatie op het scherm die continu loopt; toont hoeveel tijd rest tot de volgende sectie.

### Alerts
- **Style:** volledig afgerond (`rounded-full`), gevulde achtergrond in semantische kleur, witte ronde label-badge (uppercase, bold) + boodschap.
- **Varianten:** succes (groen), waarschuwing (geel, default), fout (rood).

### Standings Table
- **Style:** geen kaartomlijsting, volle breedte, cellen `padding: 4px` (`p-1`).
- **Eigen-club rij:** achtergrond `accent-highlight` (#E0F2FE) — enige rij-markering in het systeem.
- **Koppen:** bold, links uitgelijnd.

### Skeleton Loading
- **Style:** `neutral-border`-achtige grijze vlakken (`bg-gray-100`/`bg-gray-200`), `rounded-xl`, shimmer-animatie (`before:animate-[shimmer_2s_infinite]`) van transparant naar wit en terug.
- **Doel:** voorkomt lege flits tijdens data-fetch; moet net zo rustig ogen als de gevulde staat.

## 6. Do's and Don'ts

### Do:
- **Do** houd clubblauw (#0F61A5) gereserveerd voor actieve nav, progress-fill en toekomstige primaire nadruk — spaarzaam, herkenbaar.
- **Do** gebruik Body-formaat (1.125rem) of groter voor elk cijfer/naam dat de kernboodschap van een sectie is (standen, uitslagen, programma).
- **Do** houd de sticky header als enige plek met schaduw/blur; de rest blijft vlak.
- **Do** gebruik de sky-highlight uitsluitend voor de eigen-club rij in tabellen — geen tweede betekenis eraan hangen.

### Don't:
- **Don't** gebruik kaarten-grid voor tabeldata — dit is een scorebord, geen SaaS-dashboard.
- **Don't** gebruik gradient-tekst of decoratieve gradients — geen enkele plek in dit systeem.
- **Don't** laat primaire data-tekst (standen/uitslagen) onder 1.125rem zakken; dat is niet leesbaar op afstand.
- **Don't** voeg een tweede accentkleur naast clubblauw toe voor decoratie — elke extra kleur moet semantisch zijn (alert-status of eigen-club-markering).
- **Don't** voeg schaduwen toe aan tabellen/kaarten om "diepte" te suggereren — de Vlak-Tenzij-Sticky Regel staat dat alleen toe op de sticky header.
