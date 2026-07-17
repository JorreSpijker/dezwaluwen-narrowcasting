# Product

## Register

product

## Users

Leden en bezoekers van korfbalvereniging KV de Zwaluwen, in het clubhuis. Bekijken TV-scherm op afstand (kiosk mode, geen muis/toetsenbord/interactie). Willen snel actuele standen, uitslagen en programma scannen terwijl ze langslopen of aan de bar zitten.

## Product Purpose

Narrowcasting dashboard toont actuele standen (jeugd/senioren), wedstrijduitslagen en programma van KV de Zwaluwen. Draait als kiosk-app op Raspberry Pi, cyclet automatisch elke 10 seconden door secties (Resultaten & Programma, Standen jeugd, Standen senioren). Data komt uit Airtable. Succes = altijd actuele info, in één oogopslag leesbaar op afstand, zonder enige input nodig.

## Brand Personality

Helder, rustig, betrouwbaar. Club-vertrouwd zonder overdaad — geen interactieve UI-ruis, directe leesbaarheid staat voorop.

## Anti-references

Geen generieke SaaS-dashboard-clichés: geen kaarten-grid voor tabeldata, geen gradient-tekst, geen kleine grijze tekst, geen dichte info-dichtheid die van dichtbij gelezen moet worden.

## Design Principles

- Leesbaar op afstand: grote type, hoog contrast, geen fijne details die van dichtbij nodig zijn.
- Scanbaar, niet doorzoekbaar: geen interactie mogelijk, dus hiërarchie en groepering moeten in één blik werken.
- Rust boven decoratie: data is de content, styling ondersteunt scanbaarheid, geen versiering die afleidt.
- Altijd correct: dashboard staat onbeheerd te draaien, dus foutstaten/lege staten moeten net zo gepolijst zijn als de hoofdflow.

## Accessibility & Inclusion

Groot/leesbaar op afstand als primaire eis (belangrijker dan standaard WCAG AA voor close-up gebruik). Hoog contrast, ruime letterafmetingen, minimale kleine tekst. Reduced-motion overweging voor de auto-cycle/progress-animaties.
