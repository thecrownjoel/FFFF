=== Quote Rotator — FFFF ===
Contributors: thecrownjoel
Tags: quotes, quote, rotator, random quote, testimonials
Requires at least: 6.1
Tested up to: 6.7
Requires PHP: 7.0
Stable tag: 2.2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A random quote rotator block. Manage one list of quotes in wp-admin and display a random one on each page load. Built for the block editor and FSE.

== Description ==

**Quote Rotator** lets you keep a single list of quotes and show a random one every time a page loads. Add the **Quote Rotator** block to any page, post, or template — it picks a fresh quote on each visit.

You manage all your quotes from one place: the **FFFF** menu in your WordPress admin sidebar. Add quotes with simple text fields and + / − buttons, save once, and every Quote Rotator block on your site stays in sync.

Built for the block editor (Gutenberg) and Full Site Editing (FSE), so it works in block themes and the Site Editor, and supports the standard color, typography, spacing, and alignment controls.

= Features =

* A **random quote** displays on each page load.
* One **global quote list** managed from the FFFF admin menu — edit once, updates everywhere.
* Simple **add/remove** text fields for building short or long quote lists.
* A native **block** for the block editor / Full Site Editing — just search "quote rotator" in the inserter.
* Put attribution right in the quote text, e.g. `"Stay hungry." — Steve Jobs`.
* **Color, typography, spacing, and alignment** controls via the block editor.
* Works with **full-page caching / CDNs** — the random pick happens in the visitor's browser, so caching never pins it to one quote.
* **No-JavaScript fallback** — visitors without JS still see a quote.
* **No build step, no external services, no tracking.** Lightweight and self-contained.

== Installation ==

1. Upload the plugin through **Plugins → Add New → Upload Plugin**, or copy the `quote-rotator-ffff` folder to `wp-content/plugins/`.
2. Activate the plugin through the **Plugins** screen.
3. Open the **FFFF** menu in your admin sidebar and add your quotes, then **Save quotes**.
4. Edit any page or post, add the **Quote Rotator** block (search "quote rotator"), and publish.

== Frequently Asked Questions ==

= Where do I add my quotes? =

In the **FFFF** menu in the left admin sidebar. It's one global list — every Quote Rotator block on your site shows from it.

= Does it rotate automatically while the page is open? =

No. It picks one random quote when the page loads and shows that one. Reloading or revisiting the page may show a different quote.

= Can I add an author or attribution? =

Yes — just type it into the quote, for example `"Stay hungry." — Steve Jobs`.

= Will caching break the randomization? =

No. The random quote is chosen in the visitor's browser on load, so full-page caching and CDNs don't lock it to a single quote.

= What happens if JavaScript is disabled? =

The visitor still sees one quote (the first in your list), so there's never a blank space.

== Screenshots ==

1. The FFFF admin page where you manage your global list of quotes.
2. The Quote Rotator block in the editor.
3. A random quote displayed on the front end.

== Changelog ==

= 2.2.0 =
* Renamed to "Quote Rotator — FFFF" and added a WordPress.org readme.
* Added left/center/right block alignment; quotes center by default.

= 2.1.0 =
* Added block alignment options and default centering.

= 2.0.0 =
* Moved quote management to a central FFFF admin menu; the block now displays from one global list.

= 1.0.0 =
* Initial release: per-block quote list with random display on page load.

== Upgrade Notice ==

= 2.0.0 =
Quotes are now managed in the FFFF admin menu instead of inside each block.
