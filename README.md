# FFFF — Quote Rotator

A small WordPress block plugin. It adds a **Quote Rotator** block to the block
inserter. You type in a list of quotes, drop the block on any page or post, and
on the front end it shows **one random quote per page load**.

Built for the block editor / Full Site Editing (FSE) — works in block themes and
the Site Editor, and supports the usual color, typography, and spacing controls.

## Install

No build tools required.

**Option A — upload a zip (easiest)**
1. Zip the `ffff` folder so the zip contains `ffff/ffff.php` at its top level.
2. In WP Admin go to **Plugins → Add New → Upload Plugin**, choose the zip, install, and **Activate**.

**Option B — copy the folder**
1. Copy this `ffff` folder into `wp-content/plugins/` on your site.
2. Go to **Plugins** in WP Admin and **Activate** "FFFF".

## Use

1. Edit a page or post (or a template in the Site Editor).
2. Add the **Quote Rotator** block (search "quote rotator" in the inserter).
3. Type a quote into the text box. Use **+** to add another row and **−** to
   remove one. Each box is resizable (drag the bottom-right corner) for longer
   quotes. Put any attribution right in the text, e.g. `"Stay hungry." — Steve Jobs`.
4. Save/publish. Each time the page loads, a random quote is shown.

## How it works

- The block stores your quotes as a list attribute and writes all of them into
  the saved page markup (each in a `<blockquote class="ffff-quote-item">`).
- `style.css` hides all but the first quote — so even with JavaScript disabled a
  visitor still sees one quote.
- `view.js` runs on load, picks a random quote, and shows only that one.

Note: if you use a full-page caching plugin/CDN, randomization still happens in
the visitor's browser on each load, so caching does not pin it to one quote.

## Files

| File | Purpose |
| --- | --- |
| `ffff.php` | Plugin header; registers the block from `block.json`. |
| `block.json` | Block metadata, FSE `supports`, and asset references. |
| `index.js` | Editor UI (repeater) + saved markup. |
| `index.asset.php` | Declares editor script dependencies (no build step). |
| `view.js` | Front-end random-quote selection. |
| `style.css` | Front-end styles + no-JS fallback. |
| `editor.css` | Editor-only styles for the repeater UI. |

## License

GPL-2.0-or-later.
