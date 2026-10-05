# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite (static single-page app, plain JavaScript, no meta-framework). Deploy target: a static host such as Vercel or Netlify (exact host not yet chosen). RSVP responses are written to Google Sheets; no custom backend.

## Users

- **Guests (primary):** friends and family in Brazil who receive a personal invitation link, most likely opened on a phone from WhatsApp. Their job is to open their invite, see that it is addressed to them, learn where and when to go, and confirm attendance.
- **The couple (secondary):** the hosts, who need to know how many people confirmed.

## Product Purpose

A personalized digital wedding invitation, in Brazilian Portuguese (pt-BR). Each guest has their own invitation with a 4-digit code and sees their name on it. The invitation tells guests where to go and lets them confirm attendance. Success means every invited guest can open their invite, understand the day's plan, and confirm, and the couple ends up with an accurate confirmed headcount.

## Positioning

This is a single, intimate wedding, not a template or platform. The ceremony is a civil ceremony at the cartório, followed by a relaxed celebration at a pizzeria hosted by the couple. The invite should feel personal and elegant while staying honest about that informal, warm plan.

## Operating Context

- **Two invitation types:**
  - *Cerimônia + celebração:* shows both locations (the cartório for the civil ceremony, then the pizzeria).
  - *Somente celebração:* shows only the pizzeria.
- **Per-guest invitations:** every invite has a 4-digit code and the guest's name. The code determines who the guest is and which invitation type they see.
- **RSVP:** guests confirm attendance on the site, and responses go to a Google Sheet that the couple reads.
- **The celebration is on the couple:** the copy should say this gracefully, in pt-BR, e.g. "a celebração é por nossa conta", and never sound transactional.

## Capabilities and Constraints

- Guest lookup by 4-digit code, showing the guest's name and the matching invitation type.
- Location details for each invitation type (the cartório and/or the pizzeria).
- RSVP confirmation stored in Google Sheets, with a confirmed headcount available to the couple.
- All guest-facing copy is pt-BR.
- Very smooth animations and transitions are a stated product requirement, not optional polish.
- **Open decisions:**
  - Can one code cover several people (a couple or family with N seats), or is it strictly one person per code? This determines how headcount is counted.
  - How the code reaches the page (URL path/query parameter vs. typed in by the guest).
  - Where the guest list and code mapping live (in the same Google Sheet vs. a bundled data file).
  - Date, times, couple's names, and exact addresses have not been provided yet.

## Brand Commitments

The user specified these and they are binding:

- **Opening:** the first view is an envelope, or a sheet of paper tied with a ribbon bow (laço). A bow-untying animation reveals the paper, which then expands to fill the whole page.
- **Frame:** the invitation has a simulated 3D border in a wedding style. Confirmed on 2026-10-05 with two reference photos: this means **blind embossing (relevo seco / alto-relevo)**, floral arabesques and scrolls pressed into the paper itself, tone on tone. It must be delicate, never heavy.
- **Palette:** tone on tone, as in the references: light off-white/greige paper, relief in the paper's own colour, text in grey-taupe. No strong colour.
- **Paper texture:** eggshell finish, a fine and soft granular surface.
- **Ornament:** a frame of floral arabesques (scrolls and small roses) around the page, with the centre left free.
- **Content:** a succinct, restrained design for the information itself.
- **Motion:** all animations and transitions must be very smooth.
- **Voice:** pt-BR, warm and gracious. Mention that the celebration is hosted by the couple in a smooth, elegant way.

## Evidence on Hand

None yet. No names, date, addresses, photos, guest list, or codes have been provided. Future work must use clearly marked placeholders and must not invent real-looking names, venues, or dates.

## Product Principles

1. **Personal first:** the guest's own name and the right invitation type are the core of the experience. A wrong name or wrong locations is the worst possible failure.
2. **Ceremony in the reveal, clarity in the details:** the opening moment can be theatrical, but the information (where, when, confirm) must be instantly readable afterward.
3. **Honest and warm:** a cartório plus a pizzeria, hosted by the couple, presented with elegance rather than disguised as something else.
4. **Phone-first and smooth:** most guests open the link from WhatsApp on a phone, so motion must stay fluid on mid-range devices.
5. **A reliable headcount:** confirmation must be simple for guests and produce a count the couple can trust.

## Accessibility & Inclusion

Guests span all ages, including older relatives. Text must be legible on phones, the RSVP must be easy to complete, and the opening animation must be skippable or should simplify under `prefers-reduced-motion`.
