# Releasing to the WordPress.org Plugin Directory

Step-by-step for getting **Quote Rotator — FFFF** into the official directory so
it shows up in **Plugins → Add New** search and in Google. Do these in order.

WordPress.org username: **joelkendall**
GitHub repo: https://github.com/thecrownjoel/FFFF

---

## Part 1 — One-time: submit the plugin for review

You only do this once, for the very first submission.

1. Make sure you're logged in at **https://wordpress.org/** as `joelkendall`.
   (No account yet? Register at https://wordpress.org/register and update the
   `Contributors:` line in `readme.txt` if the username differs.)
2. Build a clean zip of the plugin (see "Building the zip" below) — or use
   `/Users/joel/Projects/ffff.zip`.
3. Go to **https://wordpress.org/plugins/developers/add/** and upload the zip.
4. Wait for the **Plugin Review Team** email. Review is manual and can take
   anywhere from a few days to a few weeks. They may ask for changes — reply in
   the same email thread, fix, and re-send the zip.
5. On approval you'll get an email with your **SVN repository URL**, like:
   `https://plugins.svn.wordpress.org/YOUR-SLUG/`
   The slug is assigned by WordPress.org (likely `quote-rotator-ffff`). Note it —
   you need it for Part 2.

> The plugin is NOT live until you push code to SVN in Part 2. Approval just
> gives you the empty SVN repo.

---

## Part 2 — One-time: first push to SVN

WordPress.org hosts plugin code in **Subversion (SVN)**, not Git. You need the
`svn` command-line tool (macOS: `brew install svn` if it's missing — check with
`svn --version`).

The SVN repo has three standard folders:

- `trunk/` — the current development version of the plugin code.
- `tags/` — a frozen copy per released version (e.g. `tags/2.2.0`).
- `assets/` — directory listing images (banner, icon, screenshots). NOT shipped
  to users; only used on the wordpress.org plugin page.

### 1. Check out your SVN repo

Replace `YOUR-SLUG` with the slug from your approval email.

```bash
cd ~/Projects
svn checkout https://plugins.svn.wordpress.org/YOUR-SLUG svn-quote-rotator
cd svn-quote-rotator
```

### 2. Copy the plugin files into trunk

Copy only the plugin's runtime files — leave out dev-only files
(`.git/`, `.gitignore`, `README.md`, `RELEASING.md`, any `*.zip`).

```bash
# from inside svn-quote-rotator/
rsync -av --delete \
  --exclude='.git' --exclude='.gitignore' \
  --exclude='README.md' --exclude='RELEASING.md' --exclude='*.zip' \
  ~/Projects/ffff/ trunk/
```

Files that should end up in `trunk/`:
`ffff.php`, `block.json`, `render.php`, `index.js`, `index.asset.php`,
`view.js`, `style.css`, `admin.js`, `admin.css`, `readme.txt`.

### 3. Add the plugin-page images (optional but recommended for SEO/clicks)

Put these in `assets/` (create it if needed). PNG or JPG.

- `icon-128x128.png` and `icon-256x256.png` — the icon in search results.
- `banner-772x250.png` and `banner-1544x500.png` — the header on the plugin page.
- `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png` — these match the
  three entries under `== Screenshots ==` in `readme.txt`, in order.

```bash
mkdir -p assets
# copy your images into assets/
```

### 4. Tell SVN about the new files and commit

```bash
svn add trunk/* assets/* --force
svn status                      # review what will be committed
svn commit -m "Initial release 2.2.0" --username joelkendall
```

### 5. Tag the release

`Stable tag: 2.2.0` in `readme.txt` must match a folder in `tags/`.

```bash
svn copy trunk tags/2.2.0
svn commit -m "Tag 2.2.0" --username joelkendall
```

Within a few minutes the plugin goes live at
`https://wordpress.org/plugins/YOUR-SLUG/` and becomes searchable in the
dashboard. Done.

---

## Releasing an update later

Every time you ship a new version:

1. Bump the version in **all four** places so they match:
   - `ffff.php` header `Version:` and the `FFFF_VERSION` constant
   - `block.json` `"version"`
   - `index.asset.php` `'version'`
   - `readme.txt` `Stable tag:` plus a new `== Changelog ==` entry
2. Copy the updated files into `trunk/` (step 2 above) and commit.
3. Tag the new version: `svn copy trunk tags/X.Y.Z && svn commit -m "Tag X.Y.Z"`.

WordPress reads the **`Stable tag`** in `trunk/readme.txt` to decide which
tagged version users get. Always update it to the new version number.

Keep pushing to GitHub too (that's your source history); SVN is only for the
WordPress.org directory.

---

## Building the zip

From `~/Projects` (the parent of the `ffff` folder):

```bash
cd ~/Projects
rm -f ffff.zip
zip -r ffff.zip ffff \
  -x "ffff/.git/*" "ffff/.gitignore" "*.DS_Store" "ffff/ffff.zip"
```

The zip must contain `ffff/ffff.php` at the top level. Use this zip for the
initial review upload and for manual installs.

---

## Pre-submission checklist

- [ ] `readme.txt` `Tested up to:` matches a WordPress version you actually ran it on.
- [ ] `Contributors:` is your real WordPress.org username (`joelkendall`).
- [ ] Plugin activates with no PHP warnings/notices.
- [ ] FFFF admin page saves quotes; block shows a random quote on the front end.
- [ ] Version numbers match across `ffff.php`, `block.json`, `index.asset.php`, `readme.txt`.
