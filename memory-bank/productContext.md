# Product Context: The Great Indian Circus

## Problem Solved

Political-accountability data in India — declared assets, pending criminal cases, parliamentary attendance, audit findings — is real but scattered across MyNeta, ADR, ECI, PRS India, and CAG. Citizens have no single, engaging place to see it, and no easy, safe way to report the corruption they personally encounter.

## How It Should Work

The platform reframes this data through a circus metaphor:
- **Ringmasters** = politicians; **tents** = states/UTs; **Silent Partners** = corporate interests; **The Audience** = citizens (with a self-deprecating quiz).
- A **"Drama Score"** is a satirical composite (documented on `/sources`) used to color states by how much of a "show" they are.
- The **state explorer** (`RingmasterMap` → `StateDrawer`) lets users tap a tent to see its ringmasters and "greatest hits" (notable scams).
- The **`/report` map** lets anyone anonymously pin a corruption sighting (category, location, description, optional amount). Submissions go through a rate-limited edge function; approved reports appear on the live map and the homepage **ReportsTicker**.

## User Experience Goals
- **Engaging & thematic** — the circus framing makes dry public-record data memorable.
- **Credible** — every stat is tied to a real source; a `/sources` page documents methodology and disclaimers. Satire only works if the underlying facts are real.
- **Low-friction & safe to report** — no login, no tracking; describe roles/offices, not individuals without evidence.
