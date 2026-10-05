---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface brief: the invitation (single page)

Scope: the whole guest-facing invitation (code entry, sealed sheet, opened invitation, RSVP). Visitor mode: Experience.
Audience/job: one named guest opens a personal link (?c=1234) from WhatsApp on a phone, sees their name, learns where/when, confirms presence. One code = one person; guest list in src/data/guests.js; RSVP to Google Sheets via Apps Script.
Memorable moment: the ivory laço unties, the sheet unfolds and fills the screen, and the floral relief rises out of the paper around it.
Unresolved: couple names, date, times, addresses, RSVP deadline (placeholders flagged in src/data/event.js).
History: the world was replaced on 2026-10-05. The first build was an azulejo panel; the user clarified with reference photos that the "3D border" means blind embossing, tone on tone, and is to be delicate.

## Direction contract

THESIS: The invitation is a sheet of eggshell paper with blind-embossed floral arabesques. The relief is the only ornament, and the paper is the only colour. It refuses printed florals, gold foil and any coloured frame.

OWN-WORLD: Greige eggshell paper (about #E9E5DE) with a fine granular grain. Relief is the same colour as the paper, read only through a light-from-the-top-left highlight and a soft taupe shadow. Text is taupe ink (#4F463F body, #6B6057 secondary). The couple's names are in a copperplate script (Pinyon Script) and the text in EB Garamond, using small caps for date and place lines. The satin laço is ivory. Nothing is boxed: no cards; dividers are small embossed flourishes.

STORY: The guest sees their own name, understands it is a civil ceremony at the cartório (complete invite) followed by a pizzaria celebration hosted by the couple, finds the addresses and times, and confirms.

FIRST VIEWPORT: A slightly deeper greige ground with grain. Centered at 84vw (max 380px), a folded eggshell sheet with small embossed corner arabesques, "Para {nome}", and an ivory ribbon and bow. One action below: "Desatar o laço". After opening: the full screen is paper, with a fixed embossed arabesque frame around it; the guest's name, the couple's names in script and the date in small caps are centred.

FORM: Brief-pinned by the user's references (blind-embossed wedding stationery, floral arabesque frame), replacing the rolled azulejo world from seed 9b83e76e. Signature interaction: bow untie, then the perspective unfold, then the sheet expanding to full screen, then the relief "pressing" up out of the paper (opacity of the emboss layers). Confirming presses a blind-embossed seal.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
