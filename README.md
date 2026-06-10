# FFFF — Quote Rotator

A small WordPress plugin. You manage one global list of quotes from an **FFFF**
item in the left admin menu, then drop the **Quote Rotator** block on any page or
post. On the front end it shows **one random quote per page load**.

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

1. In the left admin sidebar, open **FFFF**.
2. Type a quote into a text field. Use **+ Add quote** (or the per-row **+**) to add
   more rows, and **−** to remove one. Put attribution right in the text, e.g.
   `"Stay hungry." — Steve Jobs`.
3. Click **Save quotes**.
4. Edit any page or post (or a template in the Site Editor) and add the
   **Quote Rotator** block (search "quote rotator" in the inserter). It shows a
   preview; the published page shows a random quote on each load.

Edit the list once in the FFFF menu and every Quote Rotator block updates.

## How it works

- The quote list is stored as a single WordPress option (`ffff_quotes`), managed
  on the FFFF admin page via the Settings API.
- The block is **dynamic**: `render.php` reads the option and writes all quotes
  into the page (each in a `<blockquote class="ffff-quote-item">`).
- `style.css` hides all but the first quote — so even with JavaScript disabled a
  visitor still sees one quote.
- `view.js` runs on load, picks a random quote, and shows only that one. Because
  selection happens in the browser, full-page caching/CDNs don't pin it to a
  single quote.

## Files

| File | Purpose |
| --- | --- |
| `ffff.php` | Plugin header, FFFF admin menu + settings, block registration. |
| `block.json` | Block metadata, FSE `supports`, asset references. |
| `render.php` | Server render of the block from the global quote list. |
| `index.js` | Editor preview of the block (ServerSideRender). |
| `index.asset.php` | Declares editor script dependencies (no build step). |
| `view.js` | Front-end random-quote selection. |
| `style.css` | Front-end styles + no-JS fallback. |
| `admin.js` | FFFF admin repeater (+ / − rows). |
| `admin.css` | FFFF admin page styles. |

## License

GPL-2.0-or-later.
