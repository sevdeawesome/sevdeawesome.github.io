# Website Style Guide

A reference for building new pages that match the look and feel of the front page (`index.html`). Hand this file to any tool/agent and it should be able to produce a second page in the same style.

## Vibe
Dark, minimal, single-column academic/personal portfolio. Centered content on a near-black background, warm red-coral accents, subtle "hacker" glitch effect on link hovers. Quiet and text-forward — no images, no nav bar, lots of breathing room.

## Color Scheme
| Role | Value |
|------|-------|
| Background | `#1a1a1a` (near-black) |
| Primary text | `#ffffff` |
| Accent / links | `#ff6b6b` (coral red) |
| Link hover text | `#ff8787` (lighter coral) |
| Award / highlight | `#ffd700` (gold) |
| Surface (button bg) | `rgba(255,255,255,0.04)` |
| Borders | `rgba(255,255,255,0.10)` |
| Accent glow (hover bg) | `rgba(255,107,107,0.10)` |

Opacity is used heavily for hierarchy instead of new colors: `0.9` for de-emphasized headings/authors, `0.7` for venue, `0.6` for years, `0.5` for footer.

## Typography
- **Font:** `'Rubik', serif` (Google Fonts), weight `400` body / `500` headings. Loaded via:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  ```
- **Base:** `16px`, `line-height: 1.6`.
- **Sizes:** `h1` → `1.8rem`/weight 500; `h2` → `1.4rem`/weight 500, `opacity: 0.9`, `letter-spacing: 0.5px`; body links `1.1rem`.

## Layout
- `body` is a centered flex column (`justify-content: center; align-items: center`), `min-height: 100vh`, padding `40px 20px`.
- Content lives in `.container` with `max-width: 700px; width: 100%`.
- Universal reset: `* { margin:0; padding:0; box-sizing:border-box; }`.
- Vertical rhythm: `.header` and each `section` use `margin-bottom: 50px`; list items `margin-bottom: 16px`.
- Lists are unstyled (`list-style: none`).

## Signature Components

### Header (name, tagline, link buttons)
The links are pill-shaped buttons that lift on hover.
```html
<div class="header">
    <h1>Name Here</h1>
    <p>One-line bio / tagline.</p>
    <div class="links">
        <a href="#" target="_blank">Substack</a>
        <a href="#" target="_blank">GitHub</a>
        <a href="mailto:x@y.com">Email</a>
    </div>
</div>
```
```css
.header { margin-bottom: 50px; text-align: center; }
.header h1 { font-size: 1.8rem; font-weight: 500; margin-bottom: 10px; }
.header .links { display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; margin-top: 14px; }
.header .links a {
    color: #ff6b6b; font-size: 1.1rem; padding: 13px 22px;
    background: rgba(255,255,255,0.04); border-radius: 6px;
    font-weight: 500; letter-spacing: 0.01em;
    border: 1px solid rgba(255,255,255,0.10);
    transition: background .18s ease, border-color .18s ease, transform .18s ease, color .18s ease;
}
.header .links a:hover {
    background: rgba(255,107,107,0.10); border-color: #ff6b6b;
    color: #ff8787; transform: translateY(-1px);
}
.header .links a:active { transform: translateY(0); background: rgba(255,107,107,0.16); }
.header .links a:focus-visible { outline: 2px solid #ff6b6b; outline-offset: 2px; }
@media (max-width: 600px) {
    .header .links a { font-size: 1rem; padding: 12px 18px; }
}
```

### Section
```html
<section>
    <h2>Section Title</h2>
    <ul> ... </ul>
</section>
```
```css
section { margin-bottom: 50px; }
h2 { font-size: 1.4rem; font-weight: 500; margin-bottom: 20px; opacity: 0.9; letter-spacing: 0.5px; }
ul { list-style: none; }
li { margin-bottom: 16px; line-height: 1.7; }
```

### Inline links + glitch hover (the signature interaction)
Body links (outside `.header`) are coral and do an RGB chromatic-aberration "glitch" on hover.
```css
a {
    color: #ff6b6b; text-decoration: none; position: relative;
    display: inline-block; transition: all 0.3s ease;
}
a:hover { animation: glitch 0.3s ease; }
@keyframes glitch {
    0%, 100% { text-shadow: 0.02em 0 0 rgba(255,0,0,.75), -0.02em 0 0 rgba(0,255,0,.75), 0.025em 0.05em 0 rgba(0,0,255,.75); }
    15%      { text-shadow: 0.5em 0 0 rgba(255,0,0,.75), -0.5em 0 0 rgba(0,255,0,.75), 0.25em 0.05em 0 rgba(0,0,255,.75); }
    50%      { text-shadow: -0.02em 0.02em 0 rgba(255,0,0,.75), 0.02em -0.02em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); }
}
```

### Helper text spans (used in publication lists)
```css
.year    { opacity: 0.6; font-size: 0.9rem; margin-left: 8px; }
.venue   { opacity: 0.7; font-style: italic; }   /* journal/conference */
.authors { opacity: 0.9; }                         /* bold own name with <strong> */
.award   { color: #ffd700; font-size: 0.85rem; margin-left: 8px; }  /* prefix ✨ */
```
Example list item:
```html
<li>
    <span class="authors"><strong>Field, S.</strong>, Coauthor, A.</span>
    "Paper Title."
    <span class="venue">Venue Name</span>, 2026.
    <a href="paper.pdf" target="_blank">[pdf]</a>
    <span class="award">✨ Award Name</span>
</li>
```

### Footer signature
```css
.claude-signature { text-align: center; margin-top: 40px; font-size: 0.75rem; opacity: 0.5; }
.claude-signature a { color: #ffffff; font-size: 0.75rem; }
```
```html
<div class="claude-signature">
    <a href="https://claude.ai" target="_blank">made with ♥ by claude</a>
</div>
```

## Conventions
- All CSS lives inline in a single `<style>` block in `<head>` (no external stylesheet).
- External links use `target="_blank"`; email uses `mailto:`.
- Favicon: `<link rel="icon" type="image/x-icon" href="favicon.ico">`.
- Keep it single-column, centered, text-only. Use opacity — not new colors — to create hierarchy. Coral (`#ff6b6b`) is the only accent; gold (`#ffd700`) is reserved for awards/highlights.

## Minimal page skeleton
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            font-family: 'Rubik', serif; font-weight: 400; font-size: 16px; line-height: 1.6;
            background: #1a1a1a; color: #fff; min-height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: 40px 20px;
        }
        .container { width: 100%; max-width: 700px; }
        /* + component CSS from above */
    </style>
</head>
<body>
    <div class="container">
        <!-- header / sections / footer -->
    </div>
</body>
</html>
```
