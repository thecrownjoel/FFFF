# TODO — Quote Rotator — FFFF

Outstanding work to get the plugin published on the WordPress.org directory.
Detailed commands for the SVN steps are in [RELEASING.md](RELEASING.md).

## Before submitting

- [ ] Install the latest `ffff.zip` on a real site and confirm it works end to end:
      add quotes in the **FFFF** admin menu → drop the **Quote Rotator** block →
      reload the front end a few times to see it randomize and center correctly.
- [ ] Set `readme.txt` → `Tested up to:` to the actual WordPress version you tested on.
- [ ] Confirm the WordPress.org account username `joelkendall` is correct
      (matches `Contributors:` in `readme.txt`). Register at wordpress.org/register if needed.
- [ ] Capture 3 real screenshots from the live site and save to `assets/`:
  - [ ] `screenshot-1.png` — FFFF admin page with a few quotes
  - [ ] `screenshot-2.png` — Quote Rotator block in the editor
  - [ ] `screenshot-3.png` — a quote shown on the front end

## Submit for review (one time)

- [ ] Sign in at wordpress.org as `joelkendall`.
- [ ] Upload `ffff.zip` at https://wordpress.org/plugins/developers/add/
- [ ] Respond to any Plugin Review Team feedback until approved.
- [ ] Save the assigned plugin **slug** + **SVN URL** from the approval email.

## First publish via SVN (one time, after approval)

See [RELEASING.md](RELEASING.md) for exact commands.

- [ ] `svn checkout` the assigned repo.
- [ ] Copy plugin files into `trunk/` (excludes `assets/`, dev docs, `.git`).
- [ ] Copy `icon-*`, `banner-*`, and the 3 screenshots into SVN `assets/`.
- [ ] `svn commit` trunk + assets.
- [ ] Tag the release: `svn copy trunk tags/2.2.0` then commit.
- [ ] Verify it's live at `https://wordpress.org/plugins/YOUR-SLUG/` and searchable
      in **Plugins → Add New**.

## Done

- [x] Build the plugin (FFFF admin menu + Quote Rotator block, random per load).
- [x] Block alignment options + default centering.
- [x] Rename to "Quote Rotator — FFFF" for search visibility.
- [x] WordPress.org `readme.txt` with SEO tags and description.
- [x] Generate plugin icon + banner in `assets/`.
- [x] Public GitHub repo: https://github.com/thecrownjoel/FFFF
