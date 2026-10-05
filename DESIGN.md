---
name: Convite
description: A personal wedding invitation built as a Luso-Brazilian azulejo panel, opened by untying a white satin laço.
colors:
  cobalt: "#1d3a94"
  cobalt-hover: "#2242a3"
  deep-cobalt: "#0f2260"
  wash: "#9db0de"
  ochre: "#d9a441"
  tin-glaze: "#f4f6fb"
  glaze-bright: "#fbfcfe"
  grout: "#c9d2e6"
  ink: "#14204a"
  ink-soft: "#3b4b7e"
  error: "#9b2c2c"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(3.25rem, 15vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2rem, 7.5vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.1
  salutation:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.45rem, 5.6vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.2
    fontFeature: "\"tnum\", \"lnum\""
  lede:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  hairline: "2px"
  glaze: "3px"
spacing:
  tile: "var(--t)"
  gutter: "1.25rem"
  stack-sm: "0.75rem"
  stack-md: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.glaze}"
    padding: "0.8rem 1.25rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-hover}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.glaze}"
    padding: "0.8rem 1.25rem"
    height: "3.25rem"
  button-tile:
    backgroundColor: "{colors.tin-glaze}"
    textColor: "{colors.deep-cobalt}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.glaze}"
    padding: "0.85rem 1.75rem"
  text-link:
    textColor: "{colors.cobalt}"
    typography: "{typography.body-strong}"
  input-message:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.glaze}"
    padding: "0.75rem 0.85rem"
  code-cell:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-cobalt}"
    rounded: "{rounded.glaze}"
    width: "3.5rem"
    height: "4.25rem"
  ornament-tile:
    rounded: "{rounded.hairline}"
---

# Design System: Convite

## Overview

**Creative North Star: "The Azulejo Panel"**

The invitation is a wall of Luso-Brazilian tin-glazed tiles. A cobalt tile field fills the whole viewport; on it rests a folded sheet of cool white glaze, crossed by a white satin laço. Untying the bow unfolds the sheet in true perspective, and the sheet then expands until it is the panel itself: white glaze recessed one tile deep inside a frame made of the same cobalt field. Every surface is either tile or glaze. There is no third material.

The tiles are authored, not sourced: one pattern painted nine times with seeded wobble and uneven cobalt load, set in a 3×3 repeat so no two neighbours match. Grout lines and the frame recess give all the depth the panel needs; nothing is painted with gloss. Inside the frame the content is quiet and centered, set on the same tile module as the frame, with Gloock carrying the names and Figtree carrying the facts.

The world refuses the ivory card, gold script and watercolor floral of the template wedding invite. The glaze is cool and never cream; the only warm note is an ochre dot at the centre of each tile.

**Key Characteristics:**
- Two glazes of one authored tile: cobalt ground with white reserve (field and frame), white ground with cobalt paint (ornaments).
- A tile module `t` computed so whole tiles span the viewport width; the paper inset, frame and vertical rhythm are all multiples of it.
- Physical depth only: raised frame over recessed paper, drop shadows on the loose sheet, grout as the only line.
- Gloock display over Figtree text, deep cobalt ink on cool white glaze.
- Motion is a ceremony: untie, unfold, expand, then content rises in a soft stagger.

## Colors

A two-colour tin-glaze palette: cobalt in three strengths on cool white, with ochre kept inside the tile paint.

### Primary
- **Cobalt** (`cobalt`): the tile ground, primary buttons, links, times, the date, the ampersand, focus outlines, the selo stamp, text selection. The page background behind everything.
- **Deep Cobalt** (`deep-cobalt`): the darkest paint. The couple's names, section titles, guest name on the sheet, stop titles, code digits, tile rings.
- **Wash Blue** (`wash`): the diluted cobalt. Link underlines at rest, quiet-button borders, the sheet's inner rule, tile leaves and edge dots.

### Tertiary
- **Ochre** (`ochre`): appears only at tile centres and corner hearts inside the authored tile SVG. Never used in UI chrome or type.

### Neutral
- **Tin Glaze** (`tin-glaze`): the paper, the sealed sheet, the tile-button face, the white reserve in cobalt tiles. Cool, slightly blue.
- **Glaze Highlight** (`glaze-bright`): the bright pole of the paper's radial gradient (lit from upper left).
- **Grout** (`grout`): grout lines between tiles, input and code-cell borders, the hairline ring around ornament tiles.
- **Ink** (`ink`): body text and labels.
- **Soft Ink** (`ink-soft`): ledes, addresses, story paragraphs, secondary lines.
- **Kiln Red** (`error`): error messages and the error state of code cells only.
- Pure white (`white`) is reserved for field interiors (textarea, code cells) and text on cobalt.

### Named Rules
**The Cool Glaze Rule.** The paper is cool tin glaze, never cream, ivory or warm off-white. If a neutral reads warm, it is wrong.

**The Ochre-In-The-Tile Rule.** Ochre lives only inside the painted tiles. It never becomes a button, a rule, a text colour or an accent.

## Typography

**Display Font:** Gloock (with Georgia, serif), weight 400 only
**Body Font:** Figtree (with system-ui, -apple-system, Segoe UI, sans-serif), weights 400, 500, 600

**Character:** Gloock is a high-contrast, slightly inky serif that reads like a painted name on a tile panel; Figtree is a clear, friendly sans for the practical facts older relatives need to read on a phone.

### Hierarchy
- **Display** (Gloock 400, `clamp(3.25rem, 15vw, 6rem)`, 0.95, -0.015em): the couple's names, stacked, with the ampersand at half size in cobalt.
- **Headline** (Gloock 400, `clamp(2rem, 7.5vw, 2.75rem)`, 1.1): section titles ("Como vai ser", "Você vem?") and, at 2.25rem, the code-entry title.
- **Salutation** (Gloock 400, `clamp(1.45rem, 5.6vw, 2rem)`, 1.2): the guest's name in cobalt at the top of the panel. The sheet cover sets the name in deep cobalt at 1.05 leading.
- **Title** (Gloock 400, 1.6rem, 1.2, tabular lining numerals): stop times and stop titles in the timeline; the closing signature at 2rem.
- **Lede** (Figtree 400, 1.125rem): the opening sentence and confirmation text, balanced, capped near 24ch.
- **Body** (Figtree 400, 1.0625rem, 1.6): addresses and story copy, story capped at 30ch, content column at 34rem.
- **Body Strong** (Figtree 600): venue names, the date (cobalt, 0.01em, tabular), buttons and links.
- **Label** (Figtree 500, 0.95rem): form labels and error lines; the "(opcional)" suffix drops to 400 in soft ink.

### Named Rules
**The Tabular Hours Rule.** Times, dates and code digits use tabular figures so they align like printed schedule entries.

**The Sentence Case Rule.** Interface text is sentence case at normal tracking. Uppercase letterspacing exists only around the edge of the selo stamp, where it belongs to the stamp itself.

## Layout

The tile module `t` is the unit of the whole layout. On load and on resize, `t` is the viewport width divided by a whole number of columns (minimum 5), with a target size between 34px and 72px (about W/11); it is written to `--t` (CSS fallback 36px). The paper sits exactly one tile in from every viewport edge and its height is a whole number of tile rows, so the paper edge always lands on a grout line.

- **Frame:** four fixed strips of the cobalt field around the paper, aligned to the viewport, so the border is the field showing through. The frame stays put while content scrolls underneath it.
- **Content column:** 34rem max, centered, padded `1.25t` top, `1.5t` bottom, with a 1.25rem gutter.
- **Vertical rhythm:** in tile fractions: the couple's names `0.9t` below the lede, the date `0.6t` below, ornaments `1.5t` above and below, timeline stops `0.9t` apart, form labels `0.8t`. Small in-line gaps use 0.35 to 0.75rem.
- **Opening:** the first block is centred vertically in the paper's visible height minus `2.5t`.
- **Sealed sheet:** centred on the field at 84% of viewport width, capped at 380px, with one tile-face button below it.
- **Code entry:** a single centred sheet, `min(100%, 23rem)`, on the same field.
- **Timeline:** a two-column grid (4.5rem time column, 1fr body), baseline aligned.

### Named Rules
**The Grout Line Rule.** Edges land on the tile grid. A new surface that floats at an arbitrary inset from the frame is off-module.

## Elevation & Depth

Depth is physical and comes from two sources: loose paper casting shadows onto the tile field, and the paper sitting recessed below the raised frame. All shadows use one cool navy shadow colour, `rgb(5, 14, 45)` at varying alpha, never black. Inside the panel, content is flat; only the ornament tiles and controls lift slightly.

### Shadow Vocabulary
- **Loose sheet** (`0 34px 60px -14px rgba(5,14,45,.65), 0 10px 20px -4px rgba(5,14,45,.4)`): the sealed sheet and the code-entry sheet, a paper lying on tiles.
- **Frame recess** (`inset 0 4px 10px -2px rgba(5,14,45,.4), inset 4px 0 8px -4px rgba(5,14,45,.25), inset -2px 0 6px -4px rgba(5,14,45,.2), inset 0 0 0 1px rgba(15,34,96,.25)`): the frame's shadow falling onto the paper; fades in over 0.6s.
- **Tile button** (`0 8px 18px -4px rgba(5,14,45,.55)`): the glaze-face button resting on the field.
- **Primary button** (`0 6px 14px -4px rgba(5,14,45,.45)`): cobalt button on paper.
- **Ornament** (`0 3px 6px -2px rgba(5,14,45,.25), 0 0 0 1px #c9d2e6`): a single glazed tile set into the paper, with a grout ring.
- **Ribbon** (`0 2px 4px rgba(5,14,45,.3)`) and **bow** (`drop-shadow(0 5px 6px rgba(5,14,45,.35))`): satin lying on the sheet.

### Named Rules
**The Kiln Shadow Rule.** Shadows are navy (`5, 14, 45`), never neutral black or grey.

**The No Gloss Rule.** Tiles get depth from grout and the recess only. No specular highlights, sheens or gradients are painted onto tiles.

## Shapes

Square and nearly sharp. Paper and controls use a 3px corner (`glaze`), the panel paper and ornament tiles a 2px corner (`hairline`); the painted tiles themselves clip at a 2-unit radius inside 1-unit grout. Borders are 1px grout or wash hairlines. The sealed sheet carries a double rule (1px wash line with a 3px glaze gap and a second faint wash line) inset 9px from its edges. The two organic forms in the system are the satin bow and the brushed tile paint, which wobbles by design.

## Components

### Buttons
Glazed and solid, pressed rather than clicked.
- **Shape:** 3px corners (`glaze`), minimum 3.25rem tall on paper.
- **Primary:** cobalt face, white Figtree 600 text, primary-button shadow. Hover lifts 1px and brightens to `cobalt-hover`; active presses down 1px with a shorter shadow. Transitions 0.25s on the out-expo curve.
- **Quiet:** transparent with a 1px wash border and cobalt text; hover tints with wash at 18%.
- **Tile button:** a tin-glaze face with deep-cobalt text, used only on the cobalt field (the "Desatar o laço" action). Hover lifts 2px; focus outline is white.
- **Disabled:** 55% opacity, default cursor; a busy button keeps full opacity.
- **Link button:** text-link styling with a little padding, for secondary actions like "Fechar o convite".

### Links
Cobalt, Figtree 600, with a 1px wash underline offset 0.28em that deepens to cobalt on hover. Outbound map links carry a 14px stroked arrow (a hand-drawn SVG, 1.6 stroke, round caps).

### Inputs / Fields
- **Textarea:** white interior, 1px grout border, 3px corners, a faint inset shadow like a shallow well; the border turns cobalt on focus.
- **Code cells:** four 3.5rem × 4.25rem white cells with grout borders and Gloock digits at 2.1rem. The active cell gets a cobalt border and a 3px cobalt halo at 18%; on error every cell turns kiln red. A transparent native input sits over the cells.
- **Focus (global):** 2px cobalt outline, 3px offset.

### Ornament Tile
One glazed tile (white ground, cobalt paint) drawn at two cells square, capped at 44px per cell, with a grout ring and soft shadow. It separates the sections of the panel; it is the only divider.

### Sealed Sheet and Laço (signature)
A folded sheet of tin glaze with a top flap, cover text ("Para" in soft ink, the guest name in deep cobalt Gloock), and a white satin ribbon of two bands meeting at an SVG bow drawn in parts (two loops, knot, two tails). The motion sequence:
1. **Untie** (`[0.65, 0, 0.35, 1]`): loops shrink and rotate away (0.6s), knot drops (0.4s, +0.3s), tails fall (0.7s, +0.15s), bands slide out sideways (0.8s, +0.4s).
2. **Unfold** (`[0.45, 0, 0.15, 1]`, 1.15s): the flap rotates in true 3D perspective (1600px), the shadow lengthens, a curved crease brightens then settles, and a glazed mark appears on the inside.
3. **Expand** (`[0.22, 1, 0.36, 1]`, 0.95s): the sheet grows into the full panel paper, one tile in from the edges, and the frame recess fades in.
4. **Content rise** (`[0.16, 1, 0.3, 1]`, 0.8s, 0.09s stagger): each block rises 14px out of a 6px blur.

Under reduced motion every step collapses to plain fades (about 0.3s).

### Selo
A cobalt rubber stamp (rings, petal rosette, "PRESENÇA CONFIRMADA" and the date around the edge, with an ink-wobble displacement filter) pressed onto the paper when presence is confirmed: it drops from 1.9× scale and -22° with blur to rest at -9° in 0.42s.

## Do's and Don'ts

### Do:
- **Do** derive every inset and vertical gap from the tile module `t`; the paper is one tile in from each edge.
- **Do** use the authored tile in its two glazes: cobalt for the field and frame, glaze for ornaments.
- **Do** keep the paper cool tin glaze (`tin-glaze` to `glaze-bright`, lit from the upper left).
- **Do** set names and titles in Gloock 400 and every practical fact in Figtree; times and digits tabular.
- **Do** cast shadows in navy `rgb(5, 14, 45)` and give loose paper the loose-sheet shadow.
- **Do** separate sections with a single ornament tile.
- **Do** give every theatrical motion a reduced-motion fade.

### Don't:
- **Don't** use ivory, cream, gold, script faces or watercolor florals.
- **Don't** use ochre outside the tile paint.
- **Don't** put cards, panels or boxed groups inside the frame; glazed tiles, form controls and the stamp are the only bounded shapes on the paper.
- **Don't** paint gloss or sheen highlights onto tiles; depth comes from grout and the recess.
- **Don't** add uppercase letterspaced labels or kickers above headings; the selo's edge text is the only tracked uppercase.
- **Don't** use black or grey shadows.
