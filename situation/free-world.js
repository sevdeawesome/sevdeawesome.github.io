/* =========================================================================
   FREE WORLD — the #situation easter egg (from alternatives/alt_22).
   Loaded on demand by the small loader at the end of /index.html when the
   URL hash is #situation (or /situation/ redirects there). It adds its own
   styles, canvas, HUD and switch, plays immediately (arriving is the flick),
   and when switched off it plays the blackout, removes everything it added,
   gives the Claude-mode switch back and drops #situation from the URL.
   window.__fw = { play, stop, active, stats }.
   ========================================================================= */
(function () {
    'use strict';
    if (window.__fw) { window.__fw.play(); return; }

    var CSS = "/* =====================================================================\n   FREE WORLD (alt_22). Everything below is additive: the\n   page above is index_old.html untouched, plus one switch under the\n   bio. Layer order (back -> front): body charcoal, #fw-gl (WebGL),\n   #fw-fallback (CSS night, only without WebGL), #fw-scrim, #fw-hud\n   (all fixed, z-index 0, pointer-events none), then .container (z 1).\n   OFF: none of these are in layout.\n   ===================================================================== */\n\nhtml.fw-live .container {\n    position: relative;\n    z-index: 1;\n}\n\n#fw-gl,\n#fw-fallback,\n#fw-scrim,\n#fw-hud {\n    position: fixed;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    z-index: 0;\n    display: none;\n}\n\nhtml.fw-live #fw-gl,\nhtml.fw-live #fw-scrim,\nhtml.fw-live #fw-hud { display: block; }\nhtml.fw-nogl #fw-gl { display: none; }\nhtml.fw-live.fw-nogl #fw-fallback { display: block; }\n\n/* still frames (reduced motion, ?nogl) cross-fade instead of animating */\nhtml.fw-still #fw-gl,\nhtml.fw-still #fw-fallback,\nhtml.fw-still #fw-scrim,\nhtml.fw-still #fw-hud { transition: opacity 0.6s ease; }\n\n/* ---- readability: a navy column behind the text, full width on phones ---- */\n#fw-scrim {\n    opacity: 0;\n    background:\n        linear-gradient(90deg,\n            rgba(3,7,17,0) 0,\n            rgba(3,7,17,0) calc(50% - 500px),\n            rgba(3,7,17,0.74) calc(50% - 392px),\n            rgba(3,7,17,0.74) calc(50% + 392px),\n            rgba(3,7,17,0) calc(50% + 500px),\n            rgba(3,7,17,0) 100%);\n}\n@media (max-width: 860px) {\n    #fw-scrim { background: rgba(3,7,17,0.7); }\n}\n\n/* ---- no-WebGL night: navy, a receding floor grid, a horizon line ---- */\n#fw-fallback {\n    opacity: 0;\n    overflow: hidden;\n    background:\n        radial-gradient(ellipse 30% 24% at 16% 58%, rgba(60,110,255,0.22), rgba(4,8,18,0) 70%),\n        radial-gradient(ellipse 26% 22% at 84% 58%, rgba(255,60,80,0.18), rgba(4,8,18,0) 70%),\n        radial-gradient(ellipse 80% 55% at 50% 72%, rgba(40,72,160,0.14), rgba(4,8,18,0) 70%),\n        linear-gradient(180deg, #02050c 0%, #050b1a 46%, #08132b 100%);\n}\n#fw-fallback .fw-fb-floor {\n    position: absolute;\n    left: -50%;\n    right: -50%;\n    top: 40%;\n    height: 120%;\n    transform-origin: 50% 0;\n    transform: perspective(520px) rotateX(62deg);\n    background-image:\n        linear-gradient(rgba(120,150,230,0.16) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(120,150,230,0.16) 1px, transparent 1px);\n    background-size: 56px 56px;\n    -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 45%);\n    mask-image: linear-gradient(180deg, transparent 0%, #000 45%);\n}\n#fw-fallback .fw-fb-horizon {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 40%;\n    height: 1px;\n    background: linear-gradient(90deg, rgba(76,125,255,0), rgba(140,170,255,0.55) 30%, rgba(255,255,255,0.7) 50%, rgba(140,170,255,0.55) 70%, rgba(76,125,255,0));\n    box-shadow: 0 0 24px 4px rgba(76,125,255,0.25);\n}\n\n/* ---- HUD: hairline brackets + mono readouts, all decorative ---- */\n#fw-hud {\n    overflow: hidden;\n    font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n    font-size: 10.5px;\n    line-height: 1.6;\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(206,218,248,0.66);\n    -webkit-font-smoothing: antialiased;\n}\n#fw-hud .fw-brk {\n    position: absolute;\n    width: 18px;\n    height: 18px;\n    border: 0 solid rgba(214,226,255,0.42);\n}\n#fw-hud .fw-brk.tl { top: 14px; left: 14px; border-top-width: 1px; border-left-width: 1px; }\n#fw-hud .fw-brk.tr { top: 14px; right: 14px; border-top-width: 1px; border-right-width: 1px; }\n#fw-hud .fw-brk.bl { bottom: 14px; left: 14px; border-bottom-width: 1px; border-left-width: 1px; }\n#fw-hud .fw-brk.br { bottom: 14px; right: 14px; border-bottom-width: 1px; border-right-width: 1px; }\n\n#fw-hud .fw-blk {\n    position: absolute;\n    white-space: nowrap;\n    opacity: 0;\n}\n#fw-hud .fw-tl { top: 26px; left: 32px; }\n#fw-hud .fw-tr { top: 26px; right: 32px; text-align: right; }\n#fw-hud .fw-bl { bottom: 28px; left: 32px; }\n#fw-hud .fw-br { bottom: 28px; right: 32px; }\n\n#fw-hud .fw-title {\n    font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;\n    font-weight: 600;\n    font-size: 11.5px;\n    letter-spacing: 0.34em;\n    color: #f3f6ff;\n}\n#fw-hud .fw-tri {\n    display: block;\n    width: 42px;\n    height: 2px;\n    margin: 8px 0 7px;\n    background: linear-gradient(90deg, #ff4655 0 33.3%, #f3f6ff 33.3% 66.6%, #4c7dff 66.6% 100%);\n}\n#fw-hud .fw-phase b { color: #ff5a66; font-weight: 500; margin-right: 0.6em; }\n#fw-hud .fw-clock { color: #f3f6ff; font-weight: 500; letter-spacing: 0.14em; }\n#fw-hud .fw-clock i { font-style: normal; color: #ff5a66; }\n#fw-hud .fw-ro {\n    display: flex;\n    justify-content: space-between;\n    gap: 22px;\n    min-width: 232px;\n}\n#fw-hud .fw-ro b { font-weight: 500; color: #f3f6ff; letter-spacing: 0.08em; }\n#fw-hud .fw-ro b.r { color: #ff5a66; }\n#fw-hud .fw-rule { height: 1px; background: rgba(214,226,255,0.22); margin: 6px 0 6px; }\n#fw-hud .fw-mini { display: block; overflow: visible; }\n#fw-hud .fw-mini text { font-family: inherit; font-size: 8.5px; letter-spacing: 0.1em; fill: rgba(206,218,248,0.62); }\n\n/* chart + map labels: positioned every frame from the 3D camera */\n#fw-hud .fw-lb {\n    position: absolute;\n    left: 0;\n    top: 0;\n    opacity: 0;\n    white-space: nowrap;\n    will-change: transform, opacity;\n}\n#fw-hud .fw-lb .tx { position: absolute; left: 0; top: 0; }\n#fw-hud .fw-tk { font-size: 10px; color: rgba(196,210,244,0.6); letter-spacing: 0.06em; }\n#fw-hud .fw-tk sup { font-size: 0.72em; vertical-align: 0.55em; line-height: 0; margin-left: 1px; }\n#fw-hud .fw-axt { font-size: 9.5px; color: rgba(196,210,244,0.5); letter-spacing: 0.16em; }\n#fw-hud .fw-ms .dot {\n    position: absolute;\n    left: -4.5px;\n    top: -4.5px;\n    width: 9px;\n    height: 9px;\n    border-radius: 50%;\n    border: 1.5px solid #f3f6ff;\n    background: #050a16;\n    box-shadow: 0 0 10px rgba(255,255,255,0.35);\n}\n#fw-hud .fw-ms b {\n    display: block;\n    font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;\n    font-weight: 600;\n    font-size: 14px;\n    letter-spacing: 0.06em;\n    color: #f3f6ff;\n    line-height: 1.25;\n}\n#fw-hud .fw-ms span { display: block; font-size: 9.5px; color: rgba(206,218,248,0.72); letter-spacing: 0.12em; }\n#fw-hud .fw-ms.agi b { font-size: 26px; color: #ff4f5e; letter-spacing: 0.02em; text-shadow: 0 0 18px rgba(255,70,85,0.45); }\n#fw-hud .fw-ms.agi .dot { border-color: #ff4f5e; box-shadow: 0 0 14px rgba(255,70,85,0.7); }\n#fw-hud .fw-now .tx { color: #ff5a66; font-size: 9.5px; letter-spacing: 0.18em; font-weight: 500; }\n#fw-hud .fw-head .tx {\n    font-size: 10px;\n    color: #f3f6ff;\n    letter-spacing: 0.1em;\n    padding: 2px 6px;\n    border-left: 1px solid rgba(255,90,102,0.9);\n    background: rgba(4,8,18,0.55);\n}\n#fw-hud .fw-head .tx span { color: #ff6f7a; margin-left: 0.8em; }\n#fw-hud .fw-exit .tx { color: #ff5a66; font-size: 10px; letter-spacing: 0.2em; font-weight: 500; }\n/* hub names: side-tinted; the two capitals are set larger and stay in the margins */\n#fw-hud .fw-hub .tx { font-size: 8.5px; letter-spacing: 0.14em; color: rgba(226,232,245,0.82); }\n#fw-hud .fw-hub.s1 .tx { color: #a9c6ff; }\n#fw-hud .fw-hub.s2 .tx { color: #ffa0a8; }\n#fw-hud .fw-hub.cap .tx {\n    font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;\n    font-weight: 600;\n    font-size: 11px;\n    letter-spacing: 0.3em;\n    padding-bottom: 5px;\n    border-bottom: 1px solid currentColor;\n}\n#fw-hud .fw-hub.cap.s1 .tx { color: #8fb4ff; }\n#fw-hud .fw-hub.cap.s2 .tx { color: #ff7d88; }\n/* incident / link-up tags */\n#fw-hud .fw-tag .tx {\n    font-size: 9px;\n    letter-spacing: 0.16em;\n    color: rgba(238,242,255,0.9);\n    padding: 1px 0 1px 6px;\n    border-left: 1px solid rgba(238,242,255,0.6);\n}\n#fw-hud .fw-leg { margin-top: 3px; color: rgba(206,218,248,0.62); }\n#fw-hud .fw-leg i {\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n    margin: 0 6px 0 0;\n    vertical-align: 0;\n}\n#fw-hud .fw-leg span { margin-right: 12px; }\n#fw-hud .fw-leg .us { background: #4c7dff; box-shadow: 0 0 6px rgba(76,125,255,0.8); }\n#fw-hud .fw-leg .cn { background: #ff4655; box-shadow: 0 0 6px rgba(255,70,85,0.8); }\n#fw-hud .fw-leg .nt { background: rgba(214,222,240,0.55); }\n\n\n/* ---- the page while ON: same text, a touch more contrast on the faint labels ---- */\nhtml.fw-on .container { text-shadow: 0 1px 12px rgba(3,7,17,0.85); }\nhtml.fw-on .header .links .sep { color: rgba(255,255,255,0.5); }\nhtml.fw-on details.accordion .count { color: rgba(255,255,255,0.6); }\nhtml.fw-on details.accordion .teaser { color: rgba(255,255,255,0.64); }\nhtml.fw-on .stuff-list .type { color: rgba(255,255,255,0.58); }\nhtml.fw-on .stuff-list .entry { color: rgba(255,255,255,0.7); }\nhtml.fw-on details.accordion { border-color: rgba(214,226,255,0.16); }\nhtml.fw-on .header p.thesis { position: relative; }\nhtml.fw-on .header p.thesis::after {\n    content: '';\n    position: absolute;\n    left: 50%;\n    bottom: -5px;\n    width: var(--fw-ulw, 0px);\n    height: 1px;\n    background: linear-gradient(90deg, rgba(255,70,85,0), #ff4655 18%, #ff4655 82%, rgba(255,70,85,0));\n    box-shadow: 0 0 10px rgba(255,70,85,0.55);\n    transform: translateX(-50%) scaleX(var(--fw-ul, 0));\n    opacity: var(--fw-ulo, 0.75);\n    pointer-events: none;\n}\n\n/* ---- the switch: centred under the bio (same geometry as the live switch) ---- */\n.fw-switch-row {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-top: 28px;\n}\n.fw-switch {\n    appearance: none;\n    -webkit-appearance: none;\n    border: 0;\n    background: none;\n    padding: 0;\n    margin: 0;\n    font: inherit;\n    color: inherit;\n    cursor: pointer;\n    position: relative;\n    flex: none;\n    width: 44px;\n    height: 24px;\n    border-radius: 12px;\n    -webkit-tap-highlight-color: transparent;\n}\n.fw-switch:focus-visible { outline: 2px solid #ff6b6b; outline-offset: 3px; }\n.fw-switch-track {\n    position: absolute;\n    inset: 0;\n    border-radius: 12px;\n    background: #242424;\n    border: 1px solid rgba(255,255,255,0.14);\n    box-shadow: inset 0 1px 2px rgba(0,0,0,0.55);\n    overflow: hidden;\n    transition: background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;\n}\n/* a hairline tricolour that only shows once lit */\n.fw-switch-track::before {\n    content: '';\n    position: absolute;\n    left: 7px;\n    top: 50%;\n    width: 12px;\n    height: 1px;\n    margin-top: -0.5px;\n    background: linear-gradient(90deg, #ff4655 0 33.3%, #f3f6ff 33.3% 66.6%, #4c7dff 66.6% 100%);\n    opacity: 0;\n    transition: opacity 0.5s ease;\n}\n.fw-switch-knob {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 18px;\n    height: 18px;\n    border-radius: 50%;\n    background: #505050;\n    box-shadow: 0 1px 2px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);\n    transition: transform 0.32s cubic-bezier(0.3, 1.35, 0.5, 1), background 0.5s ease, box-shadow 0.5s ease;\n}\n.fw-switch:hover .fw-switch-track { border-color: rgba(255,255,255,0.26); }\n.fw-switch[aria-checked=\"true\"] .fw-switch-track {\n    background: #08132e;\n    border-color: rgba(110,150,255,0.62);\n    box-shadow: inset 0 1px 2px rgba(0,0,0,0.6), 0 0 0 4px rgba(76,125,255,0.10), 0 0 18px rgba(76,125,255,0.22);\n}\n.fw-switch[aria-checked=\"true\"] .fw-switch-track::before { opacity: 0.9; }\n.fw-switch[aria-checked=\"true\"]:hover .fw-switch-track { border-color: rgba(150,180,255,0.85); }\n.fw-switch[aria-checked=\"true\"] .fw-switch-knob {\n    transform: translateX(20px);\n    background: #f5f7ff;\n    box-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 0 10px rgba(255,70,85,0.6);\n}\n.fw-switch.is-igniting .fw-switch-knob { animation: fw-ignite 0.7s ease-out both; }\n.fw-switch.is-sparking .fw-switch-knob { animation: fw-spark 0.45s ease-out both; }\n@keyframes fw-ignite {\n    0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.95), 0 0 24px rgba(255,255,255,0.9); }\n    45% { box-shadow: 0 0 0 7px rgba(255,70,85,0.45), 0 0 26px rgba(255,70,85,0.6); }\n    100% { box-shadow: 0 0 0 16px rgba(76,125,255,0), 0 0 10px rgba(255,70,85,0.6); }\n}\n@keyframes fw-spark {\n    0% { box-shadow: 0 0 0 0 rgba(255,70,85,0.9), 0 0 20px rgba(255,70,85,0.85); }\n    100% { box-shadow: 0 0 0 13px rgba(255,70,85,0), 0 0 0 rgba(255,70,85,0); }\n}\n\n/* ---- freeze / reduced motion ---- */\nhtml.fw-freeze *, html.fw-freeze *::before, html.fw-freeze *::after {\n    transition: none !important;\n    animation: none !important;\n}\n@media (prefers-reduced-motion: reduce) {\n    .fw-switch-knob, .fw-switch-track { transition: none !important; animation: none !important; }\n}\n\n@media (max-width: 600px) {\n    #fw-hud { font-size: 9.5px; }\n    #fw-hud .fw-title { font-size: 10px; letter-spacing: 0.24em; }\n    #fw-hud .fw-tl { top: 22px; left: 24px; }\n    #fw-hud .fw-tr { top: 22px; right: 24px; }\n    #fw-hud .fw-bl { bottom: 24px; left: 24px; }\n    #fw-hud .fw-br { bottom: 24px; right: 24px; }\n    #fw-hud .fw-ro { min-width: 0; gap: 14px; }\n    #fw-hud .fw-br { display: none; }\n    #fw-hud .fw-ms b { font-size: 12.5px; }\n    #fw-hud .fw-ms.agi b { font-size: 21px; }\n}\n/* in the steady state the corner text only lives where there is a margin for it */\n@media (max-width: 1099px) {\n    html.fw-steady #fw-hud .fw-blk { visibility: hidden; }\n}\n\n/* homepage easter egg: no corner text; the chart and map labels carry it */\n#fw-hud .fw-blk { display: none !important; }\n";
    var OVERLAYS = "<canvas id=\"fw-gl\" aria-hidden=\"true\"></canvas><div id=\"fw-fallback\" aria-hidden=\"true\"><div class=\"fw-fb-floor\"></div><div class=\"fw-fb-horizon\"></div></div><div id=\"fw-scrim\" aria-hidden=\"true\"></div><div id=\"fw-hud\" aria-hidden=\"true\"><div class=\"fw-brk tl\"></div><div class=\"fw-brk tr\"></div><div class=\"fw-brk bl\"></div><div class=\"fw-brk br\"></div><div class=\"fw-blk fw-tl\"><div class=\"fw-title\">Situational Awareness</div><span class=\"fw-tri\"></span><div class=\"fw-phase\"><b>01</b><span>Counting the OOMs</span></div><div class=\"fw-leg\"><span><i class=\"us\"></i>U.S.</span><span><i class=\"cn\"></i>PRC</span><span><i class=\"nt\"></i>Other</span></div></div><div class=\"fw-blk fw-tr\"><div class=\"fw-clock\"><i>T+</i><span>00:00:00</span></div><div class=\"fw-coord\">Fig. 1 \u00b7 effective compute, log</div></div><div class=\"fw-blk fw-bl\"><div class=\"fw-ro\"><span>Year</span><b data-ro=\"year\">2028</b></div><div class=\"fw-ro\"><span>Hubs online</span><b data-ro=\"hubs\">0</b></div><div class=\"fw-ro\"><span>Links</span><b data-ro=\"links\">0</b></div><div class=\"fw-ro\"><span>Incidents</span><b data-ro=\"inc\">0</b></div><div class=\"fw-rule\"></div><div class=\"fw-ro\"><span>Eff. compute</span><b class=\"r\">&uarr; off the chart</b></div></div><div class=\"fw-blk fw-br\"></div><div id=\"fw-chart\"></div></div>";
    var FONTS = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@500;600&display=swap';

    function Scene(api) {
        /* =================================================================
           FREE WORLD — one switch. OFF is the page as it was.
           ON: the lights drop, a log plot of effective compute draws itself
           out of the switch, the straight line runs off the top, the camera
           pitches back until the chart is a floor, and the floor is the world
           at night. Two rings go out at once, blue from Washington and red
           from Beijing; hubs ignite on both sides, links draw in between
           places, packets travel, endpoints ping, incidents flicker up and
           fade. The page comes back, the thesis last. OFF: the grid fails
           block by block; the two capitals go dark last.
           ================================================================= */
        var html = document.documentElement;
        var sw = document.getElementById('fw-switch');
        var canvas = document.getElementById('fw-gl');
        var scrim = document.getElementById('fw-scrim');
        var fb = document.getElementById('fw-fallback');
        var hud = document.getElementById('fw-hud');
        var chartEl = document.getElementById('fw-chart');
        var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

        /* ---- tuning knobs ---- */
        var DPR_CAP = 1.5, RENDER_SCALE = 0.85, STEADY_FPS = 30;
        var FOV_DEG = 40, K = Math.tan(FOV_DEG * Math.PI / 360);
        var SLOPE = 1.25;                        /* OOMs of effective compute per year: the straight line */
        var YEAR0 = 2018, YEAR1 = 2030, OOM_LO = -6, OOM_HI = 6;
        var CM = 11;                             /* central meridian: the map's seam falls in the Bering Strait */
        var WS = 6.0 / (2 * Math.PI * 0.8707);   /* world units per Natural Earth unit: the world is 6 units wide */
        var PHI_WIDE = 50, PHI_NARROW = 42;      /* final camera pitch (deg from straight down) */
        var SPIKE_H = 0.26;                      /* tallest light pillar, world units */
        var WAVE_SPEED = 1.9;                    /* the two rings, world units / s */
        var REGION = 0.5;                        /* lights-out block size (two floor-grid cells) */
        var DRAW = 0.9;                          /* seconds for a link to draw in */
        var T = {
            hair0: 0.10, hair1: 0.55,            /* a hairline shoots out of the knob */
            grid0: 0.40, grid1: 1.20,            /* the chart grid unfolds from it */
            line0: 1.15, line1: 3.50,            /* the line: 2018 -> off the top */
            tilt0: 3.70, tilt1: 5.40,            /* the camera pitches back: chart -> floor */
            coast0: 4.00,                        /* coastlines surface during the move */
            wave0: 4.75,                         /* blue ring from Washington, red ring from Beijing */
            ign0: 5.25, ignStep: 0.105,          /* hubs ignite, alternating sides */
            inc0: 6.20,                          /* incidents begin */
            back0: 7.75,                         /* the page comes back... */
            thesis: 8.70,                        /* ...the thesis last */
            end: 9.90,                           /* intro over: inline styles cleared */
            steady: 10.6,                        /* 30 fps from here */
            dyn0: 11.0                           /* more links keep drawing in from here */
        };
        var OFF_LEN = 1.3, STILL_T = 30, SKIP_RATE = 4;

        /* ---- geography: hand-simplified world outlines, base64 Int16LE [n, (k, lon*10, lat*10 ...)] ---- */
        var GEO = { land: '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TgJQAEQCRgBEAjgATAIyAFwCMgBsAkYAdAJfAIACeACPAocAngKbAK0CtAC4AtIAvgICAccCGAHFAjYBvwJKAbYCaAGzApABpgKaAZkCgQGUAl4BhQJoAYAClQGGAq4BlwK4AawCswGuAswBowL0AagCEgKsAiECsQJEAq4CWAK4AmICuQKZArACowK0Aq0CxgKyAtoCxALfAssC0ALaAssC7gLVAgwD0gIgA8sCNAPVAlwD5AK2A/gCEAQJA0wE/QJqBOQCYATfApwE2gL2BN8CHgXLAmQFywKqBdMC3AXLAkAGuQKGBrgCpAa8AvQGtQIcB6gCRAeeAm8HlQJYB4UCMAeKAhwHhQL5BoYC9AZxAswGagKpBlgCfAZYAmMGTgJeBjoCVAYwAkAGHAIxBhACHwb9ARYGHAIdBj8CLAZEAkAGYgIOBlMC5AVUAqoFUgKYBVICfQVHAl8FJAJkBRwCggUNAn0F6gFuBdYBVQW4AScFrwEbBacBEQWaAQoFlAH7BIsBBAWCAQ4FcgENBWMBCwVfAfsEWgHvBFsB8QRmAfIEcgHyBHcB5AR5Ad8EfQHmBIsB2wSPAcYEigG8BIQBwwSQAboEmQGrBI8BmQSFAaUEeQGrBHMBtwR6AcoEdgG0BGgBqQReAbMEVAG6BEUBwwQ9AcMENQG6BC8BxAQrAcAEHgG2BBMBrAQEAaUE+QCdBPUAkwTsAIgE5QB+BOMAdgTfAHAE3QBgBNoAUQTUAE4EywBJBNYAOATXACsE0AAkBMcAIQS8ACoErQA6BKAARASKAEUEeAA4BGwAKwRoACgEYAAYBFYAGgRkAAsEaQABBHoA8QN/AO0DhwDoA30A4wNpAOwDUADyA0UAAQQ8AAoEKAAQBA8ADgQNAPYDHADrAzYA5ANIANcDUADZA2QA1AN4ANADpQDCA6gAsQOgAK4DtACiA8gAmwPSAJYD4ACJA9wAegPaAGYD1wBhA8gAUgPBAEEDsQA5A6oAKgObACIDgwAeA2cADgNZAAcDUQD7Al8A8wJ2AOwCggDiApsA2AK+ANYC1ADWAt4AwQLQALIC3wC3AuYArALsAJ4C+ACFAvwAaAL8AEwC/wA6Ag0BMwIQASECCgEDAhcB9wEnAeABLAHgASUB7wEOAfkB/wAEAgMBAQLzABcC8QApAv0AMwIHATQC+ABJAuwAVgLhAEoC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',
            us: 'BQC+ACH75AEx++IBNPvqAVD76gF4++oBoPvqAcj76gHw++oBGPzqATT86gFI/OoBSPzuAUz87QFO/OcBWvzmAWX85AFy/OIBgPzgAXb83AFt/NcBZ/zTAXD81AF0/NYBfPzSAYb81AGM/NgBkfzaAY781gGU/NQBl/zRAaD80AGu/NQBsvzQAbn8zAGx/MsBqPzMAZ78ygGa/MkBlPzDAZD8vgGU/MABmvzEAZf8wAGU/LsBk/y2AZH8rgGU/KcBlPyiAZj8oAGc/KEBoPymAaL8rAGg/LcBovy+Aaj8xAGu/MYBsPzKAbf8yAG+/MIBv/y8Abn8uAG6/LQBv/y4AcL8uAHG/LQByPyuAcf8qgHB/KcBvvyhAcb8ngHP/J8B2/ykAeL8pgHr/KwB6vywAfj8sAEF/bMBBv24AQz9vgEU/cIBJv3CATX9wgE5/cUBPv3GAUL9zQFE/dMBTP3aAVX92gFa/dcBWv3MAV79xAFi/cABWf28AU79uAFC/bQBPf2uAT79qgE6/acBPv2iAUT9pAFE/aEBP/2gATb9ngEn/ZwBMf2bASb9lwEc/ZYBHP2QARj9igES/YUBEP2EARH9fwEM/XgBCP1zAQj9cQEM/WgBDf1gAQP9WgH1/FIB6/xQAeH8SAHW/EAB0vwwAdT8KAHa/BwB4PwLAd78AgHc/PwA1fz7AM78BQHG/BMBxPwaAcT8IgG8/CoBtPwsAav8KQGf/DABl/wvAY/8MAGC/C4BgPwsAYT8JQGF/CIBe/wjAW/8JQFl/CgBVvwpAUz8JQFB/B4BNvwWATL8DQE0/AQBJ/wGAR38EwET/B8BCvwqAQD8KgH5+yIB8PsmAen7LQHg+zcB1/s+Acb7PgHG+zkBqfs5AYT7RQGF+0cBbftFAWv7SwFk+1ABYPtSAVz7VAFU+1gBS/tYAUr7YAFD+2UBPftrAT77bgE4+3QBN/t6ATL7fAEr+4YBKvuOAST7lAEn+5oBJvuiASL7rAEn+7gBKPvOASf71QEvAH76uAJW+r0CJPrAAuP5yQLA+cICp/m8AoL5sQKa+aQCpvmdApP5mQJw+ZACi/mFArb5hQK4+XwCkvl3Aob5agKY+V0CrPlXAq35TgLU+UsC3vlMAs/5OgK2+TACmPkmAqz5KALP+TIC7flAAv75TAIU+lICJvpkAjP6XAJH+mACYPpYAn76WAKD+lYCofpKArD6QAK/+jUCzvorAuz6IwLs+i8C3fo2Asn6TAK1+lYCofpQApL6WAJ++lsCBQDp+coA8vnGAPT5wwDr+b0A6PnFAAQA0fnYANf52QDY+dUA0/nVAAMA4fnSAOj50ADk+c4A',
            cn: 'AgB5ANsEjwHGBIoBvASEAcMEkAG6BJkBqwSPAZkEhQGlBHkBqwRzAbcEegHKBHYBtARoAakEXgGzBFQBugRFAcMEPQHDBDUBugQvAcQEKwHABB4BtgQTAawEBAGlBPkAnQT1AJME7ACIBOUAfgTjAHYE3wBwBN0AYATaAFEE1ABOBMsASQTWADgE1wAuBNwAKgTlAB4E6QAQBOQABgTiAP4D4AD5A9QA8wPYAOoD1wDgA90A4wPmANsD8ADQA/AA0QP6ANsDEwHOAxoBwQMmAbEDJAGeAxcBlAMXAYADGgF4AxIBcQMXAWUDGAFSAx0BPgMnAS8DMAEgAzUBFgM8ARQDRwEbA1QBDANjAfgCZgHuAnIB6gJzAe0CdgHhAooB7gKUAf0ClAEMA5oBIgOkASQDrQEgA8EBOQPEAT4D2AFXA9YBawPrAXAD5gGEA98BjgPMAYkDxgGnA8EBugO7AcoDrAHoA6oBFQSiAS4EqAFQBKsBXgS1AW8EwQGIBMgBmATSAa8E1AGjBN0BhgTfAY8E8gGaBO8BqQT3AbEEBQK/BBUCyQQXAuIEFALxBAgC+wT0ARQF6QEtBd4BQwXjATwF1gEzBcMBJwXFAR4FwQEgBa4BGgWoAQoFqAEABaQB8QSfAeIElQEHAD4EwABEBMgATATJAFYExQBRBLsASAS2AD8EuQA=' };
        function decode(s) {
            var b = atob(s), n = b.length >> 1, v = new Array(n), i, out = [], p = 1;
            for (i = 0; i < n; i++) v[i] = ((b.charCodeAt(2 * i) | (b.charCodeAt(2 * i + 1) << 8)) << 16) >> 16;
            for (i = 0; i < v[0]; i++) {
                var k = v[p++], poly = [];
                for (var j = 0; j < k; j++, p += 2) poly.push([v[p] / 10, v[p + 1] / 10]);
                out.push(poly);
            }
            return out;
        }
        /* Natural Earth I projection (Savric et al.), scaled to world units */
        function world(lon, lat) {
            var lam = (lon - CM) * Math.PI / 180, phi = lat * Math.PI / 180, p2 = phi * phi, p4 = p2 * p2;
            return [lam * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))) * WS,
                phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4))) * WS];
        }
        var LANDP = decode(GEO.land), USP = decode(GEO.us), CNP = decode(GEO.cn);
        function projAll(ps) { return ps.map(function (p) { return p.map(function (q) { return world(q[0], q[1]); }); }); }
        var LANDW = projAll(LANDP), USW = projAll(USP), CNW = projAll(CNP);
        var MAP_BOX = (function () {
            var b = [1e9, 1e9, -1e9, -1e9];
            LANDW.forEach(function (p) { p.forEach(function (q) { b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[0]); b[3] = Math.max(b[3], q[1]); }); });
            return b;
        })();

        /* hubs: label, lon, lat, side (0 other/allied, 1 U.S., 2 PRC), size — ignition order alternates sides */
        var HUBS = [
            ['Washington', -77.3, 38.95, 1, 1.0], ['Beijing', 116.4, 39.9, 2, 1.0], ['Ohio', -82.8, 40.1, 1, 0.55],
            ['Shanghai', 121.5, 31.2, 2, 0.75], ['London', -0.1, 51.5, 0, 0.6], ['Dallas', -96.9, 32.8, 1, 0.65],
            ['Shenzhen', 114.1, 22.6, 2, 0.7], ['Tokyo', 139.7, 35.7, 0, 0.6], ['Phoenix', -112.1, 33.45, 1, 0.55],
            ['Chengdu', 104.1, 30.7, 2, 0.55], ['Hsinchu · fab', 121.0, 24.8, 0, 0.6], ['Atlanta', -84.4, 33.75, 1, 0.5],
            ['Ulanqab', 113.1, 41.0, 2, 0.5], ['Seoul', 127.0, 37.55, 0, 0.5], ['Silicon Valley', -122.0, 37.4, 1, 0.6],
            ['Guizhou', 106.6, 26.6, 2, 0.5], ['Veldhoven', 5.4, 51.4, 0, 0.45], ['Oregon', -121.2, 45.6, 1, 0.5],
            ['Zhongwei', 105.2, 37.5, 2, 0.5], ['Singapore', 103.8, 1.35, 0, 0.5], ['Bangalore', 77.6, 12.97, 0, 0.45],
            ['Sydney', 151.2, -33.87, 0, 0.45]
        ];
        var SIDE_RGB = [[0.86, 0.90, 1.0], [0.36, 0.58, 1.0], [1.0, 0.30, 0.36]];
        /* links: hub a, hub b, flags (1 = drawn during the intro and kept, 2 = endpoint pings on arrival) */
        var LINKS = [
            [0, 2, 3], [0, 11, 1], [2, 5, 1], [11, 5, 1], [5, 8, 1], [8, 14, 3], [14, 17, 1], [17, 2, 1],
            [1, 12, 3], [12, 18, 1], [18, 9, 1], [9, 15, 1], [15, 6, 1], [6, 3, 1], [3, 1, 1], [1, 9, 1],
            [0, 4, 3], [4, 16, 1], [13, 7, 1], [10, 19, 3], [14, 10, 3],
            [16, 10, 2], [0, 16, 0], [17, 7, 2], [8, 10, 2], [7, 10, 0], [13, 10, 2], [19, 20, 0], [20, 4, 2],
            [19, 21, 0], [21, 14, 2], [6, 19, 0], [7, 19, 0]
        ];
        var DCW = world(-77.04, 38.9), BJW = world(116.4, 39.9);

        /* ---- small maths ---- */
        function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
        function lerp(a, b, k) { return a + (b - a) * k; }
        function smooth(a, b, x) { var k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); }
        function smoother(a, b, x) { var k = clamp((x - a) / (b - a), 0, 1); return k * k * k * (k * (k * 6 - 15) + 10); }
        function easeOut(k) { k = clamp(k, 0, 1); return 1 - (1 - k) * (1 - k) * (1 - k); }
        function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
        function hash2(x, y) { var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
        function fr(v) { return v - Math.floor(v); }

        /* lights-out: blocks two grid cells wide fail at hashed moments, the two capitals' blocks last.
           Same hash in JS and GLSL (small-int fracts, float-safe). */
        var DCR = [Math.floor(DCW[0] / REGION), Math.floor(DCW[1] / REGION)];
        var BJR = [Math.floor(BJW[0] / REGION), Math.floor(BJW[1] / REGION)];
        function offDelay(x, y) {
            var rx = Math.floor(x / REGION), ry = Math.floor(y / REGION);
            if ((rx === DCR[0] && ry === DCR[1]) || (rx === BJR[0] && ry === BJR[1])) return 0.8;
            return 0.04 + 0.62 * fr(fr(rx * 0.3183099 + ry * 0.7071068) * fr(rx * 0.1234567 + ry * 0.4567891) * 17.0);
        }

        /* ---- hubs, links, incidents: all a pure function of t ---- */
        var HUBW = HUBS.map(function (h) { return world(h[1], h[2]); });
        function igniteAt(k) { return T.ign0 + k * T.ignStep; }
        function hubLife(k, o) { return o < 0 ? 1 : clamp(1 - (o - offDelay(HUBW[k][0], HUBW[k][1]) - 0.02) / 0.18, 0, 1); }
        var LK = LINKS.map(function (l, i) {
            var h = hash2(i, 4.2), back = (l[2] & 1) === 1;
            return {
                a: l[0], b: l[1], back: back, ping: (l[2] & 2) === 2, h: h,
                start: back ? Math.max(igniteAt(l[0]), igniteAt(l[1])) + 0.08 : 0,
                period: 30 + 20 * h, pkp: 8 + 7 * hash2(i, 9.1)
            };
        });
        (function () { var j = 0; LK.forEach(function (L) { if (!L.back) { L.start = T.dyn0 + j * 2.7 + 0.5 * L.h; j++; } }); })();
        function linkState(L, t) {
            var s = { prog: 0, alpha: 0, ps: -1, arr: 99, up: 99 };
            if (t < L.start) return s;
            var cs = L.start, alpha = 1;
            if (!L.back) {
                cs = L.start + Math.floor((t - L.start) / L.period) * L.period;
                alpha = 1 - smooth(L.period - 6.2, L.period - 5.0, t - cs);
            }
            var age = t - cs;
            s.prog = clamp(age / DRAW, 0, 1);
            s.alpha = alpha * smooth(0, 0.12, age);
            s.up = age - DRAW;
            if (s.prog >= 1 && alpha > 0.05) {
                var u = (age - DRAW) / L.pkp + L.h;
                s.ps = fr(u);
                if (u >= 1) s.arr = s.ps * L.pkp;
            }
            return s;
        }
        var INC = (function () {
            var r = rng(20260), t = T.inc0, out = [];
            for (var k = 0; k < 320; k++) {
                t += 1.9 + 2.6 * r();
                var kind = r(), num = 1000 + Math.floor(r() * 9000);
                out.push({ t: t, pick: r(), tag: kind < 0.45 ? 'Incident ' + num : kind < 0.62 ? 'Anomaly' : kind < 0.8 ? 'Signal' : 'Eval' });
            }
            return out;
        })();
        var INC_SPAN = INC[INC.length - 1].t + 2.4 - T.inc0;
        function incidentsAt(t) {
            /* the incidents live at t (wrapping after ~15 minutes), plus how many have happened */
            if (t < T.inc0) return { list: [], count: 0 };
            var loops = Math.floor((t - T.inc0) / INC_SPAN), tl = t - loops * INC_SPAN, list = [], lo = 0, hi = INC.length;
            while (lo < hi) { var mid = (lo + hi) >> 1; if (INC[mid].t <= tl) lo = mid + 1; else hi = mid; }
            for (var k = lo - 1; k >= 0 && tl - INC[k].t < 2.6; k--) list.push({ e: INC[k], age: tl - INC[k].t, id: k });
            return { list: list, count: loops * INC.length + lo };
        }

        /* ---- the time-line helpers ---- */
        var NOW_YEAR = (function () {
            var d = new Date(), y = d.getFullYear();
            var f = y + (d - new Date(y, 0, 1)) / (new Date(y + 1, 0, 1) - new Date(y, 0, 1));
            return clamp(f, 2024.0, 2027.6);
        })();
        var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        function nowLabel() { var y = Math.floor(NOW_YEAR); return MONTHS[Math.min(11, Math.floor((NOW_YEAR - y) * 12))] + ' ' + y; }
        function oom(year) { return SLOPE * (year - 2023); }

        /* ---- state ---- */
        var on = false, mode = 'off', running = false, raf = 0, frozen = false, still = false, lost = false, paused = false;
        var baseT = 0, baseNow = 0, rate = 1, tNow = 0, offAt = 0, tAtOff = 0, pausedAt = 0, lastDraw = 0;
        var vw = 0, vh = 0, pxs = 1, cw = 0, ch = 0, CH = null, fit = null, knobW = [0, 0];
        var par = { x: 0, y: 0, tx: 0, ty: 0 }, parOn = false;
        var frameCount = 0, fpsEst = 0, fpsT = 0, fpsN = 0, hubsLit = 0, linksUp = 0, ringCount = 0;
        var Q = {};
        location.search.slice(1).split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) Q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); });

        /* =================================================================
           camera: target on the plane, pitch phi (0 = straight down), yaw,
           distance R. The chart is drawn on the plane seen from straight
           above, so at phi = 0 it is just a 2D chart filling the screen.
           ================================================================= */
        function basis(tx, ty, phi, R, yaw) {
            var sp = Math.sin(phi), cp = Math.cos(phi), sy = Math.sin(yaw), cy = Math.cos(yaw);
            var F = [-sp * sy, sp * cy, -cp], Rr = [cy, sy, 0];
            return {
                C: [tx + R * sp * sy, ty - R * sp * cy, R * cp], F: F, R: Rr,
                U: [Rr[1] * F[2] - Rr[2] * F[1], Rr[2] * F[0] - Rr[0] * F[2], Rr[0] * F[1] - Rr[1] * F[0]], D: R
            };
        }
        function projN(c, x, y, z, asp) {
            var dx = x - c.C[0], dy = y - c.C[1], dz = z - c.C[2];
            var w = dx * c.F[0] + dy * c.F[1] + dz * c.F[2];
            return [(dx * c.R[0] + dy * c.R[1] + dz * c.R[2]) / (K * asp * w), (dx * c.U[0] + dy * c.U[1] + dz * c.U[2]) / (K * w), w];
        }
        function project(c, x, y, z) {
            var p = projN(c, x, y, z, vw / vh);
            return { x: (p[0] + 1) * 0.5 * vw, y: (1 - p[1]) * 0.5 * vh, w: p[2] };
        }
        /* frame the world so Washington and Beijing sit symmetrically, outside the 700px reading column */
        function solveFit() {
            var narrow = vw < 700;
            var phi = (narrow ? PHI_NARROW : PHI_WIDE) * Math.PI / 180;
            var span = vw >= 1100 ? Math.max(0.31 * vw, 392) : 0.335 * vw;
            var yT = narrow ? 0.58 : 0.50, tx = (DCW[0] + BJW[0]) / 2;
            function err(R, ty) {
                var c = basis(tx, ty, phi, R, 0), a = project(c, DCW[0], DCW[1], 0), b = project(c, BJW[0], BJW[1], 0);
                return [((b.x - a.x) / 2 - span) / vw, ((a.y + b.y) / 2 - yT * vh) / vh];
            }
            var R = 6, ty = 0.2;
            for (var it = 0; it < 50; it++) {
                var e = err(R, ty);
                if (Math.abs(e[0]) + Math.abs(e[1]) < 1e-7) break;
                var h = 1e-4, eR = err(R + h, ty), eT = err(R, ty + h);
                var a = (eR[0] - e[0]) / h, b = (eT[0] - e[0]) / h, c = (eR[1] - e[1]) / h, d = (eT[1] - e[1]) / h;
                var det = a * d - b * c;
                if (Math.abs(det) < 1e-12) break;
                R -= clamp((d * e[0] - b * e[1]) / det, -1.5, 1.5);
                ty -= clamp((-c * e[0] + a * e[1]) / det, -0.5, 0.5);
                R = Math.max(R, 1.5);
            }
            return { R: R, tx: tx, ty: ty, phi: phi };
        }
        function cameraAt(t) {
            var R0 = 1 / K;
            var uT = smoother(T.tilt0, T.tilt1, t);
            var uR = smoother(T.tilt0 - 0.05, T.tilt1 - 0.3, t);
            var push = R0 * (1.045 - 0.045 * easeOut(t / T.tilt0));
            var R = lerp(push, fit.R * 1.08, uR);
            R *= 1 - 0.074 * smoother(T.tilt1 - 0.25, T.end + 1.6, t);
            var phi = fit.phi * uT, tx = fit.tx * uR, ty = fit.ty * uR;
            var yaw = -0.10 * Math.sin(Math.PI * uT);
            var dk = smooth(T.tilt1, T.end + 3, t), s = t - T.tilt1;
            yaw += dk * 0.05 * Math.sin(s * 2 * Math.PI / 89) + par.x;
            phi += dk * 0.02 * Math.sin(s * 2 * Math.PI / 61) + par.y;
            R *= 1 + dk * 0.02 * Math.sin(s * 2 * Math.PI / 71);
            return basis(tx, ty, phi, R, yaw);
        }

        /* ---- the chart, laid out for this viewport (world = plane units; half-height 1 at t = 0) ---- */
        function layoutChart() {
            var asp = vw / vh, wpp = 2 / vh, narrow = vw < 700;
            var pl = narrow ? 46 : 80, pr = narrow ? 18 : 56, pt = narrow ? 100 : 112, pb = narrow ? 52 : 66;
            var c = { x0: -asp + pl * wpp, x1: asp - pr * wpp, y0: -1 + pb * wpp, y1: 1 - pt * wpp, narrow: narrow };
            c.xy = (c.x1 - c.x0) / (YEAR1 - YEAR0);
            c.yo = (c.y1 - c.y0) / (OOM_HI - OOM_LO);
            c.o0 = c.y0 - OOM_LO * c.yo;
            c.X = function (yr) { return c.x0 + (yr - YEAR0) * c.xy; };
            c.Y = function (o) { return c.o0 + o * c.yo; };
            c.start = 2023 + OOM_LO / SLOPE;
            c.exit = 2023 + OOM_HI / SLOPE;
            c.headEnd = 2023 + (1.0 - c.o0) / c.yo / SLOPE + 0.35;
            CH = c;
            buildLabels();
        }
        function headYear(t) {
            var u = clamp((t - T.line0) / (T.line1 - T.line0), 0, 1);
            return lerp(CH.start, CH.headEnd, Math.pow(u, 1.22));
        }
        var IGN_END = igniteAt(HUBS.length - 1);
        function yearAt(t) {
            if (t < T.line1) return headYear(t);
            if (t < T.ign0) return CH.exit;
            return lerp(CH.exit, 2030, clamp((t - T.ign0) / (IGN_END - T.ign0), 0, 1));
        }

        /* =================================================================
           DOM labels (crisp text above the canvas, projected each frame)
           ================================================================= */
        var labels = [], hubLs = [], tags = [];
        var blk = {
            tl: hud.querySelector('.fw-tl'), tr: hud.querySelector('.fw-tr'), bl: hud.querySelector('.fw-bl'), br: hud.querySelector('.fw-br'),
            brk: hud.querySelectorAll('.fw-brk'), phaseN: hud.querySelector('.fw-phase b'), phaseT: hud.querySelector('.fw-phase span'),
            clock: hud.querySelector('.fw-clock span'), coord: hud.querySelector('.fw-coord'),
            year: hud.querySelector('[data-ro="year"]'), hubs: hud.querySelector('[data-ro="hubs"]'), links: hud.querySelector('[data-ro="links"]'),
            inc: hud.querySelector('[data-ro="inc"]'), leg: hud.querySelector('.fw-leg')
        };
        var cache = new Map();
        function setOp(el, a) { a = Math.round(a * 100) / 100; if (cache.get(el) !== a) { el.style.opacity = a; cache.set(el, a); } }
        function setText(el, s) { if (el.textContent !== s) el.textContent = s; }

        function mk(cls, inner, align) {
            var el = document.createElement('div');
            el.className = 'fw-lb ' + cls;
            el.innerHTML = inner;
            var tx = el.querySelector('.tx');
            if (tx && align) tx.style.transform = align;
            chartEl.appendChild(el);
            return el;
        }
        function sup(n) { return '10<sup>' + (n < 0 ? '−' + (-n) : n) + '</sup>'; }
        function buildLabels() {
            chartEl.textContent = '';
            labels = []; hubLs = []; tags = [];
            var c = CH, n = c.narrow, o, yr;
            function add(el, x, y, z, t0, kind) { var L = { el: el, x: x, y: y, z: z || 0, t0: t0, kind: kind || 'chart', px: null, py: null, a: -1 }; labels.push(L); return L; }
            for (o = OOM_LO; o <= OOM_HI; o++) {
                if (n && o % 2) continue;
                add(mk('fw-tk', '<div class="tx">' + sup(o) + '</div>', 'translate(calc(-100% - 9px), -50%)'), c.x0, c.Y(o), 0, T.grid0 + 0.45 + Math.abs(o) * 0.03);
            }
            for (yr = YEAR0; yr <= YEAR1; yr++) {
                if (n && yr % 2) continue;
                add(mk('fw-tk', '<div class="tx">' + yr + '</div>', 'translate(-50%, 9px)'), c.X(yr), c.y0, 0, T.grid0 + 0.55 + Math.abs(yr - 2023.5) * 0.035);
            }
            add(mk('fw-axt', '<div class="tx">' + (n ? 'Eff. compute · log<br>after Aschenbrenner ’24' : 'Effective compute · normalised to GPT-4 · log scale<br>rough, after Aschenbrenner (2024)') + '</div>', 'translate(-2px, calc(-100% - 12px))'), c.x0, c.y1, 0, T.grid0 + 0.6);
            var MS = [[2019, 'GPT-2', 'Preschooler'], [2020, 'GPT-3', 'Elementary schooler'], [2023, 'GPT-4', 'Smart high-schooler']];
            MS.forEach(function (m) {
                var x = c.X(m[0]), y = c.Y(oom(m[0])), right = x < (n ? 0.0 : 0.6) * (vw / vh);
                var al = right ? (n && m[0] === 2020 ? 'translate(14px, calc(-100% + 2px))' : 'translate(12px, 2px)') : 'translate(calc(-100% - 12px), calc(-100% - 2px))';
                add(mk('fw-ms', '<i class="dot"></i><div class="tx"><b>' + m[1] + '</b><span>' + m[0] + ' · ' + m[2] + '</span></div>', al), x, y, 0, null, 'ms:' + m[0]);
            });
            add(mk('fw-ms agi', '<i class="dot"></i><div class="tx"><b>AGI?</b><span>2027 · +5 OOM</span></div>', n ? 'translate(calc(-100% - 12px), calc(-100% + 4px))' : 'translate(calc(-100% - 34px), calc(-100% + 4px))'), c.X(2027), c.Y(oom(2027)), 0, null, 'ms:2027');
            add(mk('fw-now', '<div class="tx">Now · ' + nowLabel() + '</div>', 'translate(-50%, calc(-100% - 8px))'), c.X(NOW_YEAR), c.y1, 0, null, 'ms:' + NOW_YEAR);
            add(mk('fw-head', '<div class="tx">2018.0<span>−10.0 OOM</span></div>', 'translate(16px, -50%)'), 0, 0, 0, null, 'head');
            add(mk('fw-exit', '<div class="tx">↑ Off the chart</div>', 'translate(14px, 7px)'), c.X(c.exit), c.y1, 0, null, n ? 'none' : 'exit');
            HUBS.forEach(function (h, k) {
                var cap = k < 2;
                var el = mk('fw-hub s' + h[3] + (cap ? ' cap' : ''), '<div class="tx">' + h[0] + '</div>', cap ? 'translate(-50%, calc(-100% - 8px))' : 'translate(-50%, calc(-100% - 6px))');
                var L = add(el, HUBW[k][0], HUBW[k][1], 0, igniteAt(k), cap ? 'cap' : 'hub');
                L.k = k;
                hubLs.push(L);
            });
            for (var j = 0; j < 5; j++) {
                var tg = mk('fw-tag', '<div class="tx"></div>', 'translate(10px, calc(-100% - 4px))');
                tags.push({ el: tg, tx: tg.firstChild, px: null, py: null, a: -1, txt: '' });
            }
            cache.clear();
        }
        function placeLabel(L, cam, a) {
            if (a < 0.01) { if (L.a !== 0) { L.el.style.opacity = '0'; L.a = 0; } return; }
            var p = project(cam, L.x, L.y, L.z);
            if (p.w <= 0.05) { if (L.a !== 0) { L.el.style.opacity = '0'; L.a = 0; } return; }
            var X = Math.round(p.x * 2) / 2, Y = Math.round(p.y * 2) / 2;
            if (X !== L.px || Y !== L.py) { L.el.style.transform = 'translate3d(' + X + 'px,' + Y + 'px,0)'; L.px = X; L.py = Y; }
            a = Math.round(a * 100) / 100;
            if (a !== L.a) { L.el.style.opacity = a; L.a = a; }
        }
        function spikeH(k, t, o) {
            if (HUBS[k][3] === 0) return 0.02;
            var age = t - igniteAt(k);
            if (age <= 0) return 0;
            return SPIKE_H * (0.2 + 0.8 * HUBS[k][4]) * easeOut(age / 0.85) * (0.25 + 0.75 * hubLife(k, o));
        }
        /* is a screen x behind the reading column? (wide screens only; on phones the column is everything) */
        var colX = [0, 0];
        function inColumn(x) { return x > colX[0] - 30 && x < colX[1] + 30; }

        function miniChart() {
            var x0 = 22, x1 = 168, y0 = 88, y1 = 16;
            function X(yr) { return x0 + (yr - 2018) / 12 * (x1 - x0); }
            function Y(o) { return y0 - (o + 6) / 12 * (y0 - y1); }
            function f(v) { return v.toFixed(1); }
            var s = '<svg class="fw-mini" width="176" height="104" viewBox="0 0 176 104" aria-hidden="true">';
            [-6, -3, 0, 3, 6].forEach(function (o) { s += '<path d="M' + x0 + ' ' + f(Y(o)) + 'H' + x1 + '" stroke="rgba(196,210,244,0.12)" stroke-width="1"/>'; });
            s += '<path d="M' + x0 + ' ' + y1 + 'V' + y0 + 'H' + x1 + '" fill="none" stroke="rgba(214,226,255,0.4)" stroke-width="1"/>';
            var ys = 2023 - 6 / SLOPE, ye = 2023 + 7.4 / SLOPE;
            s += '<path d="M' + f(X(ys)) + ' ' + f(Y(oom(ys))) + 'L' + f(X(NOW_YEAR)) + ' ' + f(Y(oom(NOW_YEAR))) + '" stroke="#ff4655" stroke-width="1.6" fill="none"/>';
            s += '<path d="M' + f(X(NOW_YEAR)) + ' ' + f(Y(oom(NOW_YEAR))) + 'L' + f(X(ye)) + ' ' + f(Y(oom(ye))) + '" stroke="#ff4655" stroke-width="1.6" stroke-dasharray="3 2.5" fill="none"/>';
            s += '<path d="M' + f(X(NOW_YEAR)) + ' ' + y1 + 'V' + y0 + '" stroke="rgba(255,90,102,0.7)" stroke-width="1" stroke-dasharray="2 2"/>';
            s += '<circle cx="' + f(X(2027)) + '" cy="' + f(Y(5)) + '" r="2.4" fill="#ff4655"/>';
            s += '<text x="' + x0 + '" y="9">Eff. compute · log</text>';
            s += '<text x="' + x0 + '" y="101">2018</text><text x="' + x1 + '" y="101" text-anchor="end">2030</text>';
            s += '<text x="' + f(X(2027) - 6) + '" y="' + f(Y(5) + 3) + '" text-anchor="end" style="fill:#ff6f7a">AGI?</text>';
            s += '<text x="' + f(X(NOW_YEAR) + 3) + '" y="' + f(y0 - 3) + '" style="fill:rgba(255,111,122,0.9)">now</text>';
            return s + '</svg>';
        }
        blk.br.innerHTML = miniChart();

        /* ---- the page itself: dims for the intro, returns in order, thesis last ---- */
        var groups = [];
        ['.header h1', '.header .links', '.header p:not(.thesis)'].forEach(function (s) { var e = document.querySelector(s); if (e) groups.push(e); });
        Array.prototype.forEach.call(document.querySelectorAll('.container > details.accordion'), function (e) { groups.push(e); });
        var sig = document.querySelector('.claude-signature'); if (sig) groups.push(sig);
        var thesis = document.querySelector('.header p.thesis');
        var snap = [];
        function measureThesis() {
            if (!thesis || !thesis.firstChild) return;
            var r = document.createRange();
            r.selectNodeContents(thesis);
            var rects = r.getClientRects(), w = 0;
            for (var k = 0; k < rects.length; k++) w = Math.max(w, rects[k].width);
            thesis.style.setProperty('--fw-ulw', Math.round(w + 24) + 'px');
        }
        function contentAt(t, o) {
            var dim = 1 - 0.95 * smooth(0.02, 0.5, t), k, a;
            for (k = 0; k < groups.length; k++) {
                a = lerp(dim, 1, smooth(T.back0 + k * 0.11, T.back0 + k * 0.11 + 0.6, t));
                if (o >= 0) a = lerp(snap[k] == null ? a : snap[k], 1, smooth(0, 0.4, o));
                setOp(groups[k], a);
            }
            if (!thesis) return;
            a = lerp(dim, 1, smooth(T.thesis, T.thesis + 0.5, t));
            if (o >= 0) a = lerp(snap[groups.length] == null ? a : snap[groups.length], 1, smooth(0, 0.4, o));
            setOp(thesis, a);
            var g = smooth(T.thesis, T.thesis + 0.3, t) * (1 - smooth(T.thesis + 0.6, T.thesis + 1.15, t));
            var sh = g > 0.004 ? '0 0 ' + (10 + 14 * g).toFixed(1) + 'px rgba(120,160,255,' + (0.8 * g).toFixed(2) + '), 0 1px 12px rgba(3,7,17,0.85)' : '';
            if (cache.get('sh') !== sh) { thesis.style.textShadow = sh; cache.set('sh', sh); }
            var ul = easeOut(smooth(T.thesis + 0.15, T.thesis + 0.85, t)) * (o >= 0 ? 1 - smooth(0, 0.35, o) : 1);
            var ulo = 0.62 + 0.38 * (1 - smooth(T.thesis + 0.8, T.thesis + 1.18, t));
            var key = ul.toFixed(3) + ulo.toFixed(2);
            if (cache.get('ul') !== key) { thesis.style.setProperty('--fw-ul', ul.toFixed(3)); thesis.style.setProperty('--fw-ulo', ulo.toFixed(2)); cache.set('ul', key); }
        }
        /* Chromium syncs CSSOM edits to the attribute lazily; a bare removeAttribute can leave style="" behind */
        function wipe(e) { e.style.cssText = ''; e.getAttribute('style'); e.removeAttribute('style'); }
        function clearContent(keepUnderline) {
            groups.forEach(wipe);
            if (thesis) {
                wipe(thesis);
                if (keepUnderline) { measureThesis(); thesis.style.setProperty('--fw-ul', '1'); thesis.style.setProperty('--fw-ulo', '0.62'); }
            }
            cache.clear();
        }

        /* =================================================================
           WebGL
           ================================================================= */
        var gl = null, P = {}, B = {}, maskTex = null, dotCount = 0, ARCS = 0, arcVerts = 0, DOTXY = null;
        var MAXR = 40;
        var PREC = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n';
        var CAM_U = 'uniform vec3 uC; uniform vec3 uR; uniform vec3 uU; uniform vec3 uF; uniform vec2 uK;\n';
        /* highlights behind the reading column are held down once the page is back (readability) */
        var COL_U = 'uniform vec4 uCol;\nfloat colDim() { float x = gl_FragCoord.x; return 1.0 - uCol.w * smoothstep(uCol.x - uCol.z, uCol.x + uCol.z, x) * (1.0 - smoothstep(uCol.y - uCol.z, uCol.y + uCol.z, x)); }\n';

        var VS_FULL = 'attribute vec2 aP; void main() { gl_Position = vec4(aP, 0.0, 1.0); }';
        var FS_GROUND = [
            'uniform vec2 uRes;', CAM_U,
            'uniform float uNight; uniform vec4 uMix; uniform vec4 uBox; uniform vec4 uAx; uniform vec4 uLine; uniform vec4 uHair; uniform vec4 uSweep; uniform vec4 uMaskXf;',
            'uniform vec4 uWaveA; uniform vec4 uWaveB; uniform vec4 uOffQ; uniform vec4 uOffQ2;',
            'uniform sampler2D uMask;',
            'const float GRID = 0.25;',
            'vec3 ray(vec2 n) { return uF + uR * (n.x * uK.x) + uU * (n.y * uK.y); }',
            'vec2 hitP(vec3 d) { return uC.xy + d.xy * (-uC.z / min(d.z, -1e-5)); }',
            'float cov(float f, float g, float w) { return clamp(w * 0.5 + 0.5 - abs(f) / max(g, 1e-7), 0.0, 1.0); }',
            'float hash(vec2 p) { p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }',
            'float regionLife(vec2 p) {',
            '  if (uOffQ.x < 0.0) return 1.0;',
            '  vec2 r = floor(p / 0.5);',
            '  bool last = (r.x == uOffQ.y && r.y == uOffQ.z) || (r.x == uOffQ2.x && r.y == uOffQ2.y);',
            '  float od = last ? 0.8 : 0.04 + 0.62 * fract(fract(r.x * 0.3183099 + r.y * 0.7071068) * fract(r.x * 0.1234567 + r.y * 0.4567891) * 17.0);',
            '  float q = (uOffQ.x - od) / 0.16;',
            '  return q < 0.0 ? 1.0 + 0.25 * smoothstep(-0.8, 0.0, q) : max(0.0, 1.0 - q);',
            '}',
            'void main() {',
            '  vec2 fc = gl_FragCoord.xy;',
            '  vec2 n = fc / uRes * 2.0 - 1.0;',
            '  float px = uSweep.w;',
            '  vec2 q = fc / uRes - 0.5;',
            '  vec3 night = mix(vec3(0.026, 0.044, 0.096), vec3(0.007, 0.012, 0.028), fc.y / uRes.y);',
            '  night *= 1.0 - 0.6 * dot(q, q);',
            '  vec3 L = vec3(0.0);',
            '  vec3 d = ray(n);',
            '  if (d.z < -1e-4) {',
            '    float tt = -uC.z / d.z;',
            '    vec2 P = uC.xy + d.xy * tt;',
            '    vec2 jx = hitP(ray(n + vec2(2.0 / uRes.x, 0.0))) - P;',
            '    vec2 jy = hitP(ray(n + vec2(0.0, 2.0 / uRes.y))) - P;',
            '    float gx = abs(jx.x) + abs(jy.x);',
            '    float gy = abs(jx.y) + abs(jy.y);',
            '    float pw = 0.5 * (length(jx) + length(jy));',
            '    float fog = 1.0 - smoothstep(uSweep.z * 0.95, uSweep.z * 2.7, tt);',
            '    float rl = regionLife(P);',
            /* ---- the chart (as in alt_21) ---- */
            '    if (uMix.x + uMix.w > 0.002) {',
            '      float A = 0.0;',
            '      float sp = uLine.z;',
            '      float lo = max(uBox.x, uHair.x - uHair.z), hi = min(uBox.z, uHair.x + uHair.z);',
            '      float xa = mix(uHair.x - uHair.z, lo, sp), xb = mix(uHair.x + uHair.z, hi, sp);',
            '      if (P.x > xa && P.x < xb) {',
            '        float rel = smoothstep(0.0, 0.4, sp);',
            '        for (int i = 0; i <= 12; i++) {',
            '          float o = float(i) - 6.0;',
            '          float yi = mix(uHair.y, uAx.z + o * uAx.w, sp);',
            '          float base = i == 0 ? 0.34 : (i == 6 ? 0.17 : 0.085);',
            '          A = max(A, cov(P.y - yi, gy, px) * mix(uHair.w, base, rel));',
            '        }',
            '      }',
            '      float rv = uLine.w;',
            '      float ya = mix(uHair.y, uBox.y, rv), yb = mix(uHair.y, uBox.w, rv);',
            '      if (P.y > ya && P.y < yb) {',
            '        float span = uBox.z - uBox.x;',
            '        for (int j = 0; j <= 12; j++) {',
            '          float xj = uAx.x + float(j) * uAx.y;',
            '          float base = j == 0 ? 0.34 : 0.075;',
            '          float a = clamp(rv * 2.2 - abs(xj - uHair.x) / span * 1.6, 0.0, 1.0);',
            '          A = max(A, cov(P.x - xj, gx, px) * base * a);',
            '        }',
            '      }',
            '      vec3 C = vec3(0.80, 0.86, 1.0) * A;',
            '      vec3 Ln = vec3(0.0);',
            '      float nowA = clamp((uLine.x - uLine.y) * 5.0, 0.0, 1.0);',
            '      if (nowA > 0.0 && P.y > uBox.y && P.y < uBox.w) {',
            '        float xn = uAx.x + (uLine.y - 2018.0) * uAx.y;',
            '        float dash = step(0.45, fract(P.y / (uAx.w * 0.16)));',
            '        Ln += vec3(1.0, 0.27, 0.33) * cov(P.x - xn, gx, px) * dash * 0.7 * nowA;',
            '      }',
            '      vec2 v = vec2(uAx.y, 1.25 * uAx.w);',
            '      vec2 p0 = vec2(uAx.x, uAx.z - 6.25 * uAx.w);',
            '      vec2 nr = normalize(vec2(-v.y, v.x));',
            '      float f = dot(P - p0, nr);',
            '      float g = abs(dot(jx, nr)) + abs(dot(jy, nr));',
            '      float yr = 2018.0 + dot(P - p0, v) / dot(v, v);',
            '      float vis = step(2018.2, yr) * (1.0 - smoothstep(uLine.x - 0.015, uLine.x, yr));',
            '      if (uLine.x > 2018.2) {',
            '        float yc = clamp(yr, 2018.2, uLine.x);',
            '        float dseg = length(P - (p0 + v * (yc - 2018.0))) / pw / px;',
            '        float proj = step(uLine.y, yr);',
            '        float alongPx = dot(P - p0, normalize(v)) / pw / px;',
            '        float dash = mix(1.0, step(0.36, fract(alongPx / 12.0)), proj);',
            '        float core = cov(f, g, 2.2 * px) * dash * vis;',
            '        float glow = exp(-dseg / 5.0) * 0.30 + exp(-dseg / 24.0) * 0.11;',
            '        float hot = exp(-(uLine.x - yc) * 2.6);',
            '        Ln += mix(vec3(1.0, 0.25, 0.31), vec3(1.0, 0.92, 0.92), hot * 0.7) * (core * 1.1 + glow * (0.55 + 0.6 * hot));',
            '        vec2 H = p0 + v * (uLine.x - 2018.0);',
            '        float dh = length(P - H) / pw / px;',
            '        Ln += vec3(1.0, 0.95, 0.95) * exp(-dh * dh / 10.0) * 1.4;',
            '        Ln += vec3(1.0, 0.3, 0.36) * exp(-dh / 12.0) * 0.35;',
            '        Ln += vec3(0.95, 0.97, 1.0) * clamp(1.0 - abs(dh - 13.0) / 0.8, 0.0, 1.0) * 0.6;',
            '      }',
            '      L += C * uMix.x + Ln * uMix.w;',
            '    }',
            /* ---- the floor grid ---- */
            '    if (uMix.y > 0.002) {',
            '      vec2 c1 = (fract(P / GRID + 0.5) - 0.5) * GRID;',
            '      float a = max(cov(c1.x, gx, px) * smoothstep(2.5, 7.0, GRID / gx), cov(c1.y, gy, px) * smoothstep(2.5, 7.0, GRID / gy));',
            '      vec2 c4 = (fract(P / (GRID * 4.0) + 0.5) - 0.5) * GRID * 4.0;',
            '      float a4 = max(cov(c4.x, gx, px) * smoothstep(2.0, 5.0, GRID * 4.0 / gx), cov(c4.y, gy, px) * smoothstep(2.0, 5.0, GRID * 4.0 / gy));',
            '      L += vec3(0.42, 0.55, 0.95) * (a * 0.045 + a4 * 0.065) * fog * uMix.y * rl;',
            '    }',
            /* ---- the world: land (R), U.S. (G), PRC (B) from one mask; two rings reveal it ---- */
            '    if (uMix.z > 0.002) {',
            '      vec2 uv = (P - uMaskXf.xy) * uMaskXf.zw;',
            '      vec3 m = texture2D(uMask, uv).rgb;',
            '      vec3 mx = texture2D(uMask, uv + jx * uMaskXf.zw).rgb;',
            '      vec3 my = texture2D(uMask, uv + jy * uMaskXf.zw).rgb;',
            '      vec3 gm = abs(mx - m) + abs(my - m);',
            '      vec3 cst = clamp(0.6 * px + 0.5 - abs(m - 0.5) / max(gm, vec3(1e-4)), 0.0, 1.0);',
            '      float da = length(P - uWaveA.xy), db = length(P - uWaveB.xy);',
            '      float ra = 1.0 - smoothstep(uWaveA.z - 0.35, uWaveA.z, da);',
            '      float rb = 1.0 - smoothstep(uWaveB.z - 0.35, uWaveB.z, db);',
            '      float rn = max(ra, rb);',
            '      vec3 C = vec3(0.021, 0.031, 0.060) * m.r * rn + vec3(0.30, 0.36, 0.50) * cst.r * 0.36 * max(uOffQ2.z, rn);',
            '      C += vec3(0.012, 0.036, 0.13) * m.g * ra + vec3(0.32, 0.54, 1.0) * cst.g * 0.8 * ra;',
            '      C += vec3(0.13, 0.012, 0.03) * m.b * rb + vec3(1.0, 0.30, 0.36) * cst.b * 0.8 * rb;',
            '      float fa = exp(-(da - uWaveA.z) * (da - uWaveA.z) / 0.0011) * uWaveA.w * (1.0 - smoothstep(1.3, 2.6, uWaveA.z));',
            '      float fb = exp(-(db - uWaveB.z) * (db - uWaveB.z) / 0.0011) * uWaveB.w * (1.0 - smoothstep(1.3, 2.6, uWaveB.z));',
            '      C += vec3(0.38, 0.58, 1.0) * fa * (0.10 + 0.45 * m.r) + vec3(1.0, 0.32, 0.38) * fb * (0.10 + 0.45 * m.r);',
            '      if (uSweep.y > 0.0) {',
            '        float b = uSweep.x - P.x;',
            '        float trail = b > 0.0 ? exp(-b / 0.4) : 0.0;',
            '        C += vec3(0.45, 0.62, 1.0) * (trail * 0.035 * m.r + cov(P.x - uSweep.x, gx, 1.2 * px) * 0.14 * m.r) * uSweep.y;',
            '      }',
            '      L += C * fog * uMix.z * rl;',
            '    }',
            '  }',
            '  L += (hash(fc) - 0.5) / 255.0 * uNight;',
            '  gl_FragColor = vec4(night * uNight + L, uNight);',
            '}'
        ].join('\n');

        /* dots: x, y | intensity, hash, appear time, off delay | side */
        var VS_DOTS = [
            'attribute vec2 aPos; attribute vec4 aInfo; attribute float aSide;', CAM_U,
            'uniform vec4 uP; uniform vec4 uQ; uniform vec2 uG;',
            'varying vec3 vCol; varying float vG;',
            'void main() {',
            '  float k = clamp((uP.x - aInfo.z) / 0.55, 0.0, 1.0);',
            '  float e = k * k * (3.0 - 2.0 * k);',
            '  vec3 d = vec3(aPos, (1.0 - e) * 0.08) - uC;',
            '  float w = dot(d, uF);',
            '  gl_Position = vec4(dot(d, uR) / uK.x, dot(d, uU) / uK.y, 0.0, w);',
            '  float life = 1.0;',
            '  if (uP.y >= 0.0) { float q = (uP.y - aInfo.w) / 0.16; life = q < 0.0 ? 1.0 + 0.35 * smoothstep(-0.8, 0.0, q) : max(0.0, 1.0 - q); }',
            '  float I = aInfo.x;',
            '  float pop = 1.0 + 1.5 * (1.0 - k);',
            '  float dx = uQ.y - aPos.x;',
            '  float boost = dx > 0.0 ? exp(-dx / 0.1) * uQ.z * 1.0 : 0.0;',
            '  float tw = 1.0 + 0.10 * sin(uQ.x * (0.7 + aInfo.y * 1.9) + aInfo.y * 60.0);',
            '  float fog = 1.0 - smoothstep(uP.w * 0.95, uP.w * 2.7, w);',
            '  vec3 lo = vec3(0.56, 0.60, 0.72), hi = vec3(0.92, 0.94, 0.99); float base = 0.25, gain = 0.72;',
            '  if (aSide > 1.5) { lo = vec3(1.0, 0.20, 0.27); hi = vec3(1.0, 0.80, 0.80); base = 0.26; gain = 0.80; }',
            '  else if (aSide > 0.5) { lo = vec3(0.22, 0.42, 1.0); hi = vec3(0.80, 0.89, 1.0); base = 0.26; gain = 0.80; }',
            '  float persp = uP.w / max(w, 0.05);',
            '  vG = uG.x;',
            '  if (uG.x > 0.5) {',
            '    float gI = max(I - 0.40, 0.0);',
            '    float gs = (8.0 + 12.0 * min(gI, 1.0)) * uP.z * persp;',
            '    gl_PointSize = clamp(gs, 1.0, 32.0);',
            '    vCol = mix(lo, hi, smoothstep(0.2, 0.9, gI)) * gI * (aSide > 0.5 ? 0.15 : 0.11) * uG.y * e * life * fog * (1.0 + boost);',
            '    if (w < 0.05 || gI <= 0.0) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);',
            '    return;',
            '  }',
            '  float b = (base + gain * I) * e * pop * life * fog * tw * (1.0 + boost);',
            '  float sz = (1.15 + 0.95 * min(I, 1.4)) * uP.z * uQ.w * persp;',

            '  b *= min(sz, 1.0);',
            '  gl_PointSize = clamp(sz, 1.0, 6.0);',
            '  vCol = mix(lo, hi, smoothstep(0.30, 1.15, I)) * b;',
            '  if (w < 0.05 || b < 0.003) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);',
            '}'
        ].join('\n');
        var FS_DOTS = PREC + COL_U + 'varying vec3 vCol; varying float vG; void main() { float r = length(gl_PointCoord - 0.5) * 2.0; float a = vG > 0.5 ? exp(-r * r * 4.0) * (1.0 - smoothstep(0.8, 1.0, r)) : 1.0 - smoothstep(0.35, 1.0, r); gl_FragColor = vec4(vCol * a * colDim(), 0.0); }';

        /* hubs: billboards (white core, side-coloured halo, anamorphic streak) */
        var VS_NODES = [
            'attribute vec4 aN; attribute vec4 aV; attribute vec3 aC;', CAM_U,
            'uniform vec2 uRes; uniform vec4 uP;',
            'varying vec2 vL; varying vec4 vI; varying vec3 vC;',
            'void main() {',
            '  float age = uP.x - aN.z;',
            '  float ign = age < 0.0 ? 0.0 : smoothstep(0.0, 0.16, age) * (1.0 + 1.3 * exp(-max(age - 0.16, 0.0) * 3.2));',
            '  float br = 1.0 + 0.16 * sin(uP.x * (0.9 + 0.8 * aV.w) + aV.w * 37.0);',
            '  float life = uP.y < 0.0 ? 1.0 : clamp(1.0 - (uP.y - aV.z) / 0.18, 0.0, 1.0);',
            '  float I = ign * br * life;',
            '  vec3 d = vec3(aN.xy, 0.004) - uC;',
            '  float w = dot(d, uF);',
            '  vec4 clip = vec4(dot(d, uR) / uK.x, dot(d, uU) / uK.y, 0.0, w);',
            '  float ps = clamp(uP.w / max(w, 0.05), 0.55, 1.6) * uP.z;',
            '  vec2 ext = vec2(40.0 + 120.0 * aN.w, 14.0 + 22.0 * aN.w) * ps;',
            '  vec2 o = aV.xy * ext;',
            '  clip.xy += o * 2.0 / uRes * w;',
            '  gl_Position = (I > 0.002 && w > 0.05) ? clip : vec4(2.0, 2.0, 2.0, 1.0);',
            '  vL = o;',
            '  vI = vec4(I, ext.y, ext.x, ps);',
            '  vC = aC;',
            '}'
        ].join('\n');
        var FS_NODES = PREC + COL_U + [
            'varying vec2 vL; varying vec4 vI; varying vec3 vC;',
            'void main() {',
            '  float r = length(vL);',
            '  float ps = vI.w;',
            '  float core = exp(-r * r / (6.0 * ps * ps));',
            '  float halo = exp(-r * r / (vI.y * vI.y * 0.16));',
            '  float wide = exp(-r * r / (vI.y * vI.y * 0.6));',
            '  float st = exp(-vL.y * vL.y / (1.4 * ps * ps)) * exp(-abs(vL.x) / (vI.z * 0.28));',
            '  vec3 c = vec3(1.0, 0.98, 0.98) * core * 1.4 + vC * (halo * 0.55 + wide * 0.16 + st * 0.40);',
            '  gl_FragColor = vec4(c * vI.x * max(0.0, 1.0 - (1.0 - colDim()) * 1.4), 0.0);',
            '}'
        ].join('\n');

        var VS_SPIKES = [
            'attribute vec4 aN; attribute vec4 aV; attribute vec3 aC;', CAM_U,
            'uniform vec2 uRes; uniform vec4 uP; uniform float uH;',
            'varying vec3 vS; varying vec3 vC;',
            'void main() {',
            '  float age = uP.x - aN.z;',
            '  float g = clamp(age / 0.85, 0.0, 1.0);',
            '  g = 1.0 - (1.0 - g) * (1.0 - g) * (1.0 - g);',
            '  float life = uP.y < 0.0 ? 1.0 : clamp(1.0 - (uP.y - aV.z) / 0.22, 0.0, 1.0);',
            '  float h = uH * (0.2 + 0.8 * aN.w) * g * (0.25 + 0.75 * life);',
            '  vec3 d = vec3(aN.xy, h * aV.x) - uC;',
            '  float w = dot(d, uF);',
            '  vec4 clip = vec4(dot(d, uR) / uK.x, dot(d, uU) / uK.y, 0.0, w);',
            '  float hw = 4.0 + 5.0 * aN.w;',
            '  clip.x += aV.y * hw * uP.z * 2.0 / uRes.x * w;',
            '  float I = step(0.0, age) * life * smoothstep(0.0, 0.12, age);',
            '  gl_Position = (I > 0.002 && w > 0.05) ? clip : vec4(2.0, 2.0, 2.0, 1.0);',
            '  vS = vec3(aV.x, aV.y * hw, I);',
            '  vC = aC;',
            '}'
        ].join('\n');
        var FS_SPIKES = PREC + COL_U + [
            'varying vec3 vS; varying vec3 vC;',
            'void main() {',
            '  float x = vS.y;',
            '  float core = exp(-x * x / 0.9);',
            '  float glow = exp(-x * x / 12.0);',
            '  float fall = pow(1.0 - vS.x, 1.15);',
            '  float tip = exp(-(1.0 - vS.x) * (1.0 - vS.x) * 400.0);',
            '  vec3 c = mix(vec3(0.95, 0.97, 1.0), vC, smoothstep(0.05, 0.7, vS.x));',
            '  gl_FragColor = vec4((c * (core * 1.1 + glow * 0.30) * (0.10 + 0.90 * fall) + vC * tip * core * 0.9) * vS.z * colDim(), 0.0);',
            '}'
        ].join('\n');

        /* links: great-circle paths projected onto the floor and lifted into arcs; state per arc in uArc */
        var VS_ARCS = [
            'attribute vec3 aP; attribute vec3 aPv; attribute vec3 aNx; attribute vec4 aS; attribute vec3 aC;', CAM_U,
            'uniform vec2 uRes; uniform vec4 uP; uniform vec4 uArc[ARCS];',
            'varying vec4 vA; varying vec4 vB;',
            'vec4 prj(vec3 P) { vec3 d = P - uC; return vec4(dot(d, uR) / uK.x, dot(d, uU) / uK.y, 0.0, dot(d, uF)); }',
            'void main() {',
            '  vec4 st = uArc[int(aS.z + 0.5)];',
            '  vec4 c0 = prj(aP), ca = prj(aPv), cb = prj(aNx);',
            '  vec2 dir = normalize((cb.xy / max(cb.w, 1e-3) - ca.xy / max(ca.w, 1e-3)) * uRes + vec2(1e-6, 0.0));',
            '  vec2 nrm = vec2(-dir.y, dir.x);',
            '  float hw = 2.6;',
            '  c0.xy += nrm * aS.y * hw * uP.z * 2.0 / uRes * c0.w;',
            '  float life = uP.y < 0.0 ? 1.0 : 1.0 - smoothstep(0.0, 0.35, uP.y);',
            '  float fog = 1.0 - smoothstep(uP.w * 0.95, uP.w * 2.9, c0.w);',
            '  bool ok = st.x > 0.0 && st.y > 0.002 && life > 0.0 && c0.w > 0.05 && ca.w > 0.05 && cb.w > 0.05;',
            '  gl_Position = ok ? c0 : vec4(2.0, 2.0, 2.0, 1.0);',
            '  vA = vec4(aS.x, aS.y * hw, st.x, st.z);',
            '  vB = vec4(aC, st.y * life * fog);',
            '}'
        ].join('\n');
        var FS_ARCS = PREC + COL_U + [
            'varying vec4 vA; varying vec4 vB;',
            'void main() {',
            '  float s = vA.x;',
            '  if (s > vA.z) discard;',
            '  float x = vA.y;',
            '  float core = exp(-x * x / 0.45);',
            '  float glow = exp(-x * x / 4.0);',
            '  float pk = vA.w >= 0.0 ? exp(-(s - vA.w) * (s - vA.w) * 1500.0) : 0.0;',
            '  float tip = exp(-(vA.z - s) * (vA.z - s) * 900.0) * step(vA.z, 0.999);',
            '  float ends = smoothstep(0.0, 0.03, s) * (1.0 - smoothstep(0.97, 1.0, s));',
            '  vec3 c = vB.rgb * (core * 0.34 + glow * 0.09) + mix(vB.rgb, vec3(1.0), 0.6) * (pk + tip) * (core * 0.95 + glow * 0.25);',
            '  gl_FragColor = vec4(c * vB.a * ends * colDim(), 0.0);',
            '}'
        ].join('\n');

        /* rings on the floor: ignitions, packet arrivals, incidents, link-ups (rebuilt every frame) */
        var VS_RINGS = [
            'attribute vec4 aQ; attribute vec4 aR; attribute vec4 aC;', CAM_U,
            'uniform vec2 uRes; uniform float uPx;',
            'varying vec2 vL; varying vec4 vR; varying vec4 vC;',
            'void main() {',
            '  vec3 d = vec3(aQ.xy + aQ.zw * aR.x * 1.15, 0.002) - uC;',
            '  float w = dot(d, uF);',
            '  gl_Position = vec4(dot(d, uR) / uK.x, dot(d, uU) / uK.y, 0.0, w);',
            '  float wpp = 2.0 * uK.y * w / uRes.y;',
            '  vL = aQ.zw * 1.15;',
            '  vR = vec4(aR.y, aR.z * uPx * wpp / aR.x, aR.w, 0.0);',
            '  vC = aC;',
            '}'
        ].join('\n');
        var FS_RINGS = PREC + COL_U + [
            'varying vec2 vL; varying vec4 vR; varying vec4 vC;',
            'void main() {',
            '  float d = length(vL);',
            '  if (d > 1.15) discard;',
            '  float k = vR.x;',
            '  float r = 0.12 + 0.88 * (1.0 - (1.0 - k) * (1.0 - k) * (1.0 - k));',
            '  float wd = max(vR.y, 0.004);',
            '  float ring = exp(-(d - r) * (d - r) / (wd * wd));',
            '  if (vR.z > 1.5) { float r2 = r * 0.62; ring += 0.55 * exp(-(d - r2) * (d - r2) / (wd * wd)); }',
            '  float fill = (1.0 - smoothstep(0.0, r, d)) * 0.16 * (1.0 - k);',
            '  float a = (1.0 - k) * (1.0 - k);',
            '  gl_FragColor = vec4(vC.rgb * (ring + fill) * a * vC.a * colDim(), 0.0);',
            '}'
        ].join('\n');

        function compile(type, src) {
            var s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS) && !gl.isContextLost()) throw new Error(gl.getShaderInfoLog(s));
            return s;
        }
        function program(vs, fs, attrs, unis) {
            var p = gl.createProgram();
            gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
            gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
            gl.linkProgram(p);
            if (!gl.getProgramParameter(p, gl.LINK_STATUS) && !gl.isContextLost()) throw new Error(gl.getProgramInfoLog(p));
            var o = { p: p, a: {}, u: {} };
            attrs.forEach(function (n) { o.a[n] = gl.getAttribLocation(p, n); });
            unis.forEach(function (n) { o.u[n] = gl.getUniformLocation(p, n); });
            return o;
        }
        var CAMS = ['uC', 'uR', 'uU', 'uF', 'uK'];

        /* metro light: lon, lat, weight, radius (deg) */
        var METROS = [
            -74.0, 40.7, 1.0, 2.0, -118.2, 34.0, 0.9, 1.8, -87.7, 41.9, 0.8, 1.6, -95.4, 29.8, 0.6, 1.5, -96.9, 32.8, 0.6, 1.5,
            -122.2, 37.6, 0.7, 1.4, -122.3, 47.6, 0.5, 1.2, -84.4, 33.7, 0.5, 1.3, -80.2, 25.9, 0.6, 1.2, -77.0, 39.0, 0.7, 1.3,
            -71.1, 42.4, 0.5, 1.2, -112.0, 33.5, 0.45, 1.2, -105.0, 39.7, 0.35, 1.1, -93.3, 45.0, 0.35, 1.1, -83.0, 42.3, 0.4, 1.2,
            116.4, 39.9, 1.0, 2.0, 117.2, 39.1, 0.5, 1.2, 121.5, 31.2, 1.0, 2.2, 113.6, 22.9, 1.0, 2.2, 104.1, 30.7, 0.6, 1.5,
            106.5, 29.6, 0.6, 1.5, 114.3, 30.6, 0.6, 1.5, 108.9, 34.3, 0.5, 1.4, 119.5, 31.0, 0.6, 2.0, 113.6, 34.7, 0.5, 1.5,
            123.4, 41.8, 0.45, 1.4, 126.6, 45.8, 0.35, 1.2, 113.0, 28.2, 0.4, 1.3, 102.7, 25.0, 0.3, 1.2, 118.5, 36.4, 0.5, 1.8,
            118.8, 25.5, 0.4, 1.5,
            -0.1, 51.5, 0.8, 1.6, 2.35, 48.85, 0.7, 1.4, 6.0, 51.2, 0.8, 2.0, 9.2, 45.5, 0.5, 1.4, -3.7, 40.4, 0.45, 1.2,
            13.4, 52.5, 0.4, 1.2, 37.6, 55.75, 0.7, 1.8, 29.0, 41.0, 0.6, 1.3, 31.2, 30.0, 0.7, 1.5, 3.4, 6.5, 0.5, 1.3,
            28.0, -26.2, 0.45, 1.3, 51.4, 35.7, 0.5, 1.3, 46.7, 24.7, 0.35, 1.1, 55.3, 25.2, 0.5, 1.0, 67.0, 24.9, 0.45, 1.2,
            77.2, 28.6, 0.8, 2.0, 72.9, 19.1, 0.7, 1.5, 88.4, 22.6, 0.6, 1.5, 90.4, 23.8, 0.6, 1.3, 77.6, 13.0, 0.5, 1.3,
            80.3, 13.1, 0.4, 1.2, 100.5, 13.75, 0.55, 1.4, 106.8, -6.2, 0.6, 1.5, 121.0, 14.6, 0.5, 1.2, 102.5, 2.5, 0.5, 1.6,
            127.0, 37.5, 0.8, 1.4, 139.7, 35.7, 1.0, 1.8, 135.5, 34.7, 0.7, 1.4, 121.5, 25.0, 0.6, 1.2, 105.8, 21.0, 0.4, 1.2,
            106.7, 10.8, 0.45, 1.2, 151.2, -33.9, 0.5, 1.2, 145.0, -37.8, 0.45, 1.2, -46.6, -23.5, 0.8, 1.6, -43.2, -22.9, 0.6, 1.3,
            -58.4, -34.6, 0.6, 1.3, -99.1, 19.4, 0.75, 1.6, -74.1, 4.7, 0.4, 1.2, -77.0, -12.0, 0.4, 1.1, -70.7, -33.4, 0.4, 1.1,
            -79.4, 43.7, 0.55, 1.4, -73.6, 45.5, 0.4, 1.1, 30.5, 50.45, 0.35, 1.1, 36.8, -1.3, 0.3, 1.0, 15.3, -4.3, 0.35, 1.1,
            74.3, 31.5, 0.5, 1.3
        ];

        function maskCanvas() {
            var W = 2048, H = 1024, c = document.createElement('canvas');
            c.width = W; c.height = H;
            var x = c.getContext('2d');
            var X0 = MAP_BOX[0] - 0.08, Y0 = MAP_BOX[1] - 0.08, X1 = MAP_BOX[2] + 0.08, Y1 = MAP_BOX[3] + 0.08;
            function path(polys) {
                x.beginPath();
                polys.forEach(function (p) {
                    p.forEach(function (q, k) { var px = (q[0] - X0) / (X1 - X0) * W, py = (q[1] - Y0) / (Y1 - Y0) * H; if (k) x.lineTo(px, py); else x.moveTo(px, py); });
                    x.closePath();
                });
            }
            x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
            x.globalCompositeOperation = 'lighter';
            path(LANDW); x.fillStyle = 'rgb(255,0,0)'; x.fill('evenodd');
            path(USW); x.fillStyle = 'rgb(255,255,0)'; x.fill('nonzero');
            path(CNW); x.fillStyle = 'rgb(255,0,255)'; x.fill('nonzero');
            x.globalCompositeOperation = 'source-over';
            return { c: c, ctx: x, W: W, H: H, xf: [X0, Y0, 1 / (X1 - X0), 1 / (Y1 - Y0)] };
        }

        function sideColor(k) { return SIDE_RGB[HUBS[k][3]]; }
        function geometry(mask) {
            /* dots: a hex dot-matrix wherever the mask says land, sides read from the same mask */
            var narrow = window.innerWidth < 700;
            var sp = narrow ? 0.034 : 0.021, dy = sp * 0.866, rnd = rng(1776), data = [], xy = [], row = 0, x, y, k;
            var img = mask.ctx.getImageData(0, 0, mask.W, mask.H).data, xf = mask.xf;
            var mw = [];
            for (k = 0; k < METROS.length; k += 4) { var mp = world(METROS[k], METROS[k + 1]); mw.push([mp[0], mp[1], METROS[k + 2], METROS[k + 3] * 0.0166]);   /* ~world units per degree near the equator */
 }
            for (y = MAP_BOX[1]; y <= MAP_BOX[3]; y += dy, row++) {
                for (x = MAP_BOX[0] + (row & 1) * sp * 0.5; x <= MAP_BOX[2]; x += sp) {
                    var ix = Math.floor((x - xf[0]) * xf[2] * mask.W), iy = Math.floor((y - xf[1]) * xf[3] * mask.H);
                    if (ix < 0 || iy < 0 || ix >= mask.W || iy >= mask.H) continue;
                    var o4 = (iy * mask.W + ix) * 4;
                    if (img[o4] < 128) continue;
                    var side = img[o4 + 2] >= 128 ? 2 : img[o4 + 1] >= 128 ? 1 : 0;
                    var I = side ? 0.12 : 0.05;
                    for (var m = 0; m < mw.length; m++) {
                        var ddx = x - mw[m][0], ddy = y - mw[m][1];
                        if (Math.abs(ddx) > 3 * mw[m][3] || Math.abs(ddy) > 3 * mw[m][3]) continue;
                        I += mw[m][2] * Math.exp(-(ddx * ddx + ddy * ddy) / (mw[m][3] * mw[m][3]));
                    }
                    var h = rnd();
                    I *= 0.7 + 0.6 * rnd();
                    if (rnd() < 0.04) I += 0.25;
                    I = clamp(I, 0.03, 1.6);
                    var da = Math.hypot(x - DCW[0], y - DCW[1]), db = Math.hypot(x - BJW[0], y - BJW[1]);
                    var appear = T.wave0 + (side === 1 ? da : side === 2 ? db : Math.min(da, db)) / WAVE_SPEED + rnd() * 0.1;
                    data.push(x, y, I, h, appear, offDelay(x, y), side);
                    xy.push(x, y);
                }
            }
            dotCount = data.length / 7;
            DOTXY = new Float32Array(xy);
            var G = { dots: new Float32Array(data) };
            /* hubs: blooms + pillars, 4 vertices each, 11 floats */
            var nd = [], sk = [], quad = [];
            HUBS.forEach(function (hb, k2) {
                var p = HUBW[k2], od = offDelay(p[0], p[1]) + 0.02, hs = hash2(k2, 7.3), c = sideColor(k2), sz = hb[4] * (hb[3] ? 1 : 0.7);
                [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { nd.push(p[0], p[1], igniteAt(k2), sz, q[0], q[1], od, hs, c[0], c[1], c[2]); });
                [[0, -1], [0, 1], [1, -1], [1, 1]].forEach(function (q) { sk.push(p[0], p[1], hb[3] ? igniteAt(k2) : 1e6, hb[4], q[0], q[1], od, hs, c[0], c[1], c[2]); });
                var b = k2 * 4; quad.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
            });
            G.nodes = new Float32Array(nd); G.spikes = new Float32Array(sk); G.quad = new Uint16Array(quad);
            /* links: great circles, unwrapped across the seam; a second copy where they leave the map */
            var av = [], ai = [], SEG = 40, base = 0, inst = [];
            LK.forEach(function (L, li) {
                var A = HUBS[L.a], Bh = HUBS[L.b], path = greatCircle(A[1], A[2], Bh[1], Bh[2], SEG);
                var minL = 1e9, maxL = -1e9;
                path.forEach(function (q) { minL = Math.min(minL, q[0]); maxL = Math.max(maxL, q[0]); });
                var shifts = [0];
                if (maxL > CM + 180) shifts.push(-360);
                if (minL < CM - 180) shifts.push(360);
                shifts.forEach(function (sh) {
                    var pts = path.map(function (q) { return world(q[0] + sh, q[1]); });
                    var chord = Math.hypot(pts[SEG][0] - pts[0][0], pts[SEG][1] - pts[0][1]), hgt = 0.05 + 0.10 * chord;
                    var p3 = pts.map(function (q, i) { return [q[0], q[1], hgt * Math.sin(Math.PI * i / SEG)]; });
                    var ca = sideColor(L.a), cb = sideColor(L.b);
                    for (var i = 0; i <= SEG; i++) {
                        var s = i / SEG, pv = p3[Math.max(0, i - 1)], nx = p3[Math.min(SEG, i + 1)], cc = [lerp(ca[0], cb[0], s), lerp(ca[1], cb[1], s), lerp(ca[2], cb[2], s)];
                        [-1, 1].forEach(function (side) { av.push(p3[i][0], p3[i][1], p3[i][2], pv[0], pv[1], pv[2], nx[0], nx[1], nx[2], s, side, li, 0, cc[0], cc[1], cc[2]); });
                        if (i < SEG) { var q = base + i * 2; ai.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); }
                    }
                    base += (SEG + 1) * 2;
                    inst.push(li);
                });
            });
            ARCS = LK.length;
            G.arcs = new Float32Array(av); G.arcIdx = new Uint16Array(ai);
            arcVerts = ai.length;
            return G;
        }
        function greatCircle(lo1, la1, lo2, la2, n) {
            var r = Math.PI / 180, out = [], prev = lo1;
            var a = [Math.cos(la1 * r) * Math.cos(lo1 * r), Math.cos(la1 * r) * Math.sin(lo1 * r), Math.sin(la1 * r)];
            var b = [Math.cos(la2 * r) * Math.cos(lo2 * r), Math.cos(la2 * r) * Math.sin(lo2 * r), Math.sin(la2 * r)];
            var d = Math.acos(clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1)), sd = Math.sin(d) || 1e-9;
            for (var i = 0; i <= n; i++) {
                var f = i / n, A = Math.sin((1 - f) * d) / sd, Bc = Math.sin(f * d) / sd;
                var v = [A * a[0] + Bc * b[0], A * a[1] + Bc * b[1], A * a[2] + Bc * b[2]];
                var lat = Math.atan2(v[2], Math.hypot(v[0], v[1])) / r, lon = Math.atan2(v[1], v[0]) / r;
                while (lon - prev > 180) lon -= 360;
                while (lon - prev < -180) lon += 360;
                prev = lon;
                out.push([lon, lat]);
            }
            return out;
        }

        function buildGL() {
            var mask = maskCanvas();
            var G = geometry(mask);
            P.g = program(VS_FULL, PREC + FS_GROUND, ['aP'], ['uRes', 'uNight', 'uMix', 'uBox', 'uAx', 'uLine', 'uHair', 'uSweep', 'uMaskXf', 'uMask', 'uWaveA', 'uWaveB', 'uOffQ', 'uOffQ2'].concat(CAMS));
            P.d = program(VS_DOTS, FS_DOTS, ['aPos', 'aInfo', 'aSide'], ['uP', 'uQ', 'uG', 'uCol'].concat(CAMS));
            P.n = program(VS_NODES, FS_NODES, ['aN', 'aV', 'aC'], ['uRes', 'uP', 'uCol'].concat(CAMS));
            P.s = program(VS_SPIKES, FS_SPIKES, ['aN', 'aV', 'aC'], ['uRes', 'uP', 'uH', 'uCol'].concat(CAMS));
            P.a = program('#define ARCS ' + ARCS + '\n' + VS_ARCS, FS_ARCS, ['aP', 'aPv', 'aNx', 'aS', 'aC'], ['uRes', 'uP', 'uArc', 'uCol'].concat(CAMS));
            P.r = program(VS_RINGS, FS_RINGS, ['aQ', 'aR', 'aC'], ['uRes', 'uPx', 'uCol'].concat(CAMS));
            function buf(target, data, usage) { var b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, data, usage || gl.STATIC_DRAW); return b; }
            B.full = buf(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]));
            B.dots = buf(gl.ARRAY_BUFFER, G.dots);
            B.nodes = buf(gl.ARRAY_BUFFER, G.nodes);
            B.spikes = buf(gl.ARRAY_BUFFER, G.spikes);
            B.quad = buf(gl.ELEMENT_ARRAY_BUFFER, G.quad);
            B.arcs = buf(gl.ARRAY_BUFFER, G.arcs);
            B.arcIdx = buf(gl.ELEMENT_ARRAY_BUFFER, G.arcIdx);
            B.ringData = new Float32Array(MAXR * 6 * 12);
            B.rings = buf(gl.ARRAY_BUFFER, B.ringData, gl.DYNAMIC_DRAW);
            B.arcU = new Float32Array(ARCS * 4);
            maskTex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, maskTex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask.c);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            B.maskXf = mask.xf;
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
        }
        function initGL() {
            if (gl && !gl.isContextLost()) return true;
            if (Q.nogl === '1') return false;
            try {
                gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true, powerPreference: 'low-power' })
                    || canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true });
            } catch (e) { gl = null; }
            if (!gl) return false;
            try { buildGL(); } catch (e) { gl = null; return false; }
            return true;
        }

        function sizeCanvas() {
            vw = window.innerWidth || document.documentElement.clientWidth || 1;
            vh = window.innerHeight || document.documentElement.clientHeight || 1;
            var dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
            pxs = Math.max(1, dpr * RENDER_SCALE);
            var w = Math.max(1, Math.round(vw * pxs)), h = Math.max(1, Math.round(vh * pxs));
            if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
            cw = w; ch = h;
        }
        function knobWorld() {
            /* where the knob comes to rest when lit (it is still mid-transition now) */
            var r = sw.getBoundingClientRect(), asp = vw / vh, R = (1 / K) * 1.045;
            var nx = (r.left + r.width - 13) / vw * 2 - 1, ny = 1 - (r.top + r.height / 2) / vh * 2;
            knobW = [clamp(nx, -1, 1) * K * asp * R, clamp(ny, -1, 1) * K * R];
        }

        var colDimK = 0;
        function camUniforms(pr, c) {
            gl.uniform3fv(pr.u.uC, c.C); gl.uniform3fv(pr.u.uR, c.R); gl.uniform3fv(pr.u.uU, c.U); gl.uniform3fv(pr.u.uF, c.F);
            gl.uniform2f(pr.u.uK, K * cw / ch, K);
            if (pr.u.uCol) gl.uniform4f(pr.u.uCol, colX[0] * pxs, colX[1] * pxs, 40 * pxs, colDimK);
        }
        function attrib(pr, name, size, stride, off) {
            var loc = pr.a[name];
            if (loc < 0) return;
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, off);
        }
        function unattrib(pr) { for (var n in pr.a) if (pr.a[n] >= 0) gl.disableVertexAttribArray(pr.a[n]); }

        /* incidents prefer land you can see beside the text (up to three seeded tries) */
        var colHalfW = 0;
        function pickDot(p) {
            var c = [p, fr(p * 7.31 + 0.13), fr(p * 13.7 + 0.71)];
            for (var j = 0; j < 3; j++) { var idx = Math.floor(c[j] * dotCount) * 2; if (Math.abs(DOTXY[idx] - fit.tx) > colHalfW) return idx; }
            return Math.floor(p * dotCount) * 2;
        }
        /* ---- the living world at time t: link states, rings, tags ---- */
        var LS = [], RINGS = [], TAGQ = [];
        function worldAt(t, o, cam) {
            var k, i;
            LS = LK.map(function (L) { return linkState(L, t); });
            RINGS = []; TAGQ = [];
            var fade = o < 0 ? 1 : 1 - smooth(0, 0.3, o);
            function ring(x, y, rmax, age, life, wpx, kind, c, a) { if (age >= 0 && age < life && RINGS.length < MAXR) RINGS.push([x, y, rmax, age / life, wpx, kind, c[0], c[1], c[2], a * fade]); }
            /* hub ignitions */
            for (k = 0; k < HUBS.length; k++) ring(HUBW[k][0], HUBW[k][1], k < 2 ? 0.42 : HUBS[k][3] ? 0.22 : 0.16, t - igniteAt(k), k < 2 ? 1.6 : 1.3, 1.6, 0, sideColor(k), k < 2 ? 0.9 : 0.7);
            /* packet arrivals and link-ups */
            linksUp = 0;
            for (i = 0; i < LK.length; i++) {
                var L = LK[i], s = LS[i];
                if (s.prog >= 1 && s.alpha > 0.5) linksUp++;
                if (o >= 0) continue;
                if (L.ping && s.arr < 0.9) ring(HUBW[L.b][0], HUBW[L.b][1], 0.07, s.arr, 0.9, 1.3, 1, sideColor(L.b), 0.85);
                if (!L.back && s.up >= 0 && s.up < 1.6 && t > T.dyn0) {
                    ring(HUBW[L.b][0], HUBW[L.b][1], 0.09, s.up, 1.2, 1.3, 1, [0.9, 0.93, 1.0], 0.7);
                    TAGQ.push({ x: HUBW[L.b][0], y: HUBW[L.b][1], age: s.up, life: 1.6, txt: 'Link up', id: 'l' + i, side: 0 });
                }
            }
            /* incidents (seeded: same t, same world) */
            var inc = incidentsAt(t);
            if (o < 0 && DOTXY && dotCount) {
                for (i = 0; i < inc.list.length; i++) {
                    var e = inc.list[i], di = pickDot(e.e.pick), x = DOTXY[di], y = DOTXY[di + 1];
                    var small = 1;
                    if (cam && vw >= 700) { var sp = project(cam, x, y, 0); if (inColumn(sp.x)) small = 0.6; }
                    ring(x, y, 0.11 * small, e.age, 1.8, 1.3, 2, [0.92, 0.94, 1.0], small < 1 ? 0.55 : 0.9);
                    TAGQ.push({ x: x, y: y, age: e.age, life: 2.4, txt: e.e.tag, id: 'i' + e.id, side: 0 });
                }
            }
            return inc.count;
        }

        /* =================================================================
           one frame of the whole piece at time t (o = seconds since OFF, or -1)
           ================================================================= */
        function render(t, o) {
            tNow = t;
            frameCount++;
            var out = function (a, b) { return o < 0 ? 1 : 1 - smooth(a, b, o); };
            if (gl && !lost) {
                var cam = cameraAt(t);
                var incCount = worldAt(t, o, cam);
                var night = smooth(0, 0.6, t) * out(0.75, 1.22);
                var chart = (1 - smooth(T.tilt0 + 0.2, T.tilt0 + 1.45, t)) * out(0, 0.3);
                var lineA = (1 - smooth(T.tilt0, T.tilt0 + 0.55, t)) * out(0, 0.3);
                var grid = smooth(T.tilt0 + 0.1, T.tilt0 + 1.3, t) * out(0.9, 1.1);
                var land = (t > T.coast0 ? 1 : 0) * out(0.95, 1.15);
                var coastA = smooth(T.coast0, T.coast0 + 1.0, t);
                var wr = Math.max(0, t - T.wave0) * WAVE_SPEED, wa = (t > T.wave0 ? 1 : 0) * (1 - smooth(T.wave0 + 1.25, T.wave0 + 1.9, t));
                colDimK = (vw < 860 ? 0.8 : 0.6) * smooth(T.back0 - 0.3, T.back0 + 0.9, t) * out(0.45, 1.0);

                var spread = easeOut(smooth(T.grid0, T.grid1, t));
                var reveal = smooth(T.grid0 + 0.15, T.grid1 + 0.3, t);
                var hairLen = (vw / vh * 1.05 + 0.2) * easeOut(smooth(T.hair0, T.hair1, t));
                var flash = 0.85 * smooth(T.hair0, T.hair0 + 0.12, t);
                var head = headYear(t);
                var sweepX = -99, sweepA = 0;
                var st = t - (T.end + 3.0);
                if (st > 0 && o < 0) {
                    var ph = st % 22, dur = 6.5;
                    if (ph < dur) { sweepX = MAP_BOX[0] - 0.3 + (MAP_BOX[2] - MAP_BOX[0] + 0.6) * (ph / dur); sweepA = Math.sin(Math.PI * ph / dur); }
                }
                gl.viewport(0, 0, cw, ch);
                gl.clear(gl.COLOR_BUFFER_BIT);
                /* ground */
                var pg = P.g;
                gl.useProgram(pg.p);
                camUniforms(pg, cam);
                gl.uniform2f(pg.u.uRes, cw, ch);
                gl.uniform1f(pg.u.uNight, night);
                gl.uniform4f(pg.u.uMix, chart, grid, land, lineA);
                gl.uniform4f(pg.u.uWaveA, DCW[0], DCW[1], wr, wa);
                gl.uniform4f(pg.u.uWaveB, BJW[0], BJW[1], wr, wa);
                gl.uniform4f(pg.u.uOffQ, o < 0 ? -1 : o, DCR[0], DCR[1], 0);
                gl.uniform4f(pg.u.uOffQ2, BJR[0], BJR[1], coastA, 0);
                gl.uniform4f(pg.u.uBox, CH.x0, CH.y0, CH.x1, CH.y1);
                gl.uniform4f(pg.u.uAx, CH.x0, CH.xy, CH.o0, CH.yo);
                gl.uniform4f(pg.u.uLine, t < T.line0 ? 2018 : head, NOW_YEAR, spread, reveal);
                gl.uniform4f(pg.u.uHair, knobW[0], knobW[1], hairLen, flash);
                gl.uniform4f(pg.u.uSweep, sweepX, sweepA * land, cam.D, pxs);
                gl.uniform4f(pg.u.uMaskXf, B.maskXf[0], B.maskXf[1], B.maskXf[2], B.maskXf[3]);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, maskTex);
                gl.uniform1i(pg.u.uMask, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, B.full);
                attrib(pg, 'aP', 2, 0, 0);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                unattrib(pg);

                hubsLit = 0;
                for (var k = 0; k < HUBS.length; k++) if (t - igniteAt(k) > 0.05 && hubLife(k, o) > 0.5) hubsLit++;
                var uPo = o < 0 ? -1 : o;
                if (t > T.wave0) {
                    /* rings on the floor */
                    if (RINGS.length) {
                        var rd = B.ringData, n = 0;
                        RINGS.forEach(function (r) {
                            [[-1, -1], [1, -1], [-1, 1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) {
                                rd.set([r[0], r[1], c[0], c[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9]], n); n += 12;
                            });
                        });
                        var pr = P.r;
                        gl.useProgram(pr.p);
                        camUniforms(pr, cam);
                        gl.uniform2f(pr.u.uRes, cw, ch);
                        gl.uniform1f(pr.u.uPx, pxs);
                        gl.bindBuffer(gl.ARRAY_BUFFER, B.rings);
                        gl.bufferSubData(gl.ARRAY_BUFFER, 0, rd.subarray(0, n));
                        attrib(pr, 'aQ', 4, 48, 0); attrib(pr, 'aR', 4, 48, 16); attrib(pr, 'aC', 4, 48, 32);
                        gl.drawArrays(gl.TRIANGLES, 0, RINGS.length * 6);
                        unattrib(pr);
                    }
                    ringCount = RINGS.length;
                    /* links */
                    for (var li = 0; li < LK.length; li++) {
                        B.arcU[li * 4] = LS[li].prog; B.arcU[li * 4 + 1] = LS[li].alpha; B.arcU[li * 4 + 2] = LS[li].ps; B.arcU[li * 4 + 3] = 0;
                    }
                    var pa = P.a;
                    gl.useProgram(pa.p);
                    camUniforms(pa, cam);
                    gl.uniform2f(pa.u.uRes, cw, ch);
                    gl.uniform4f(pa.u.uP, t, uPo, pxs, cam.D);
                    gl.uniform4fv(pa.u.uArc, B.arcU);
                    gl.bindBuffer(gl.ARRAY_BUFFER, B.arcs);
                    attrib(pa, 'aP', 3, 64, 0); attrib(pa, 'aPv', 3, 64, 12); attrib(pa, 'aNx', 3, 64, 24); attrib(pa, 'aS', 4, 64, 36); attrib(pa, 'aC', 3, 64, 52);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, B.arcIdx);
                    gl.drawElements(gl.TRIANGLES, arcVerts, gl.UNSIGNED_SHORT, 0);
                    unattrib(pa);
                    /* dots: soft light first, then the points */
                    var pd = P.d;
                    gl.useProgram(pd.p);
                    camUniforms(pd, cam);
                    gl.uniform4f(pd.u.uP, t, uPo, pxs, cam.D);
                    gl.uniform4f(pd.u.uQ, t % 1000, sweepX, sweepA, vw < 700 ? 0.85 : 1.0);
                    gl.bindBuffer(gl.ARRAY_BUFFER, B.dots);
                    attrib(pd, 'aPos', 2, 28, 0); attrib(pd, 'aInfo', 4, 28, 8); attrib(pd, 'aSide', 1, 28, 24);
                    gl.uniform2f(pd.u.uG, 1, 1);
                    gl.drawArrays(gl.POINTS, 0, dotCount);
                    gl.uniform2f(pd.u.uG, 0, 1);
                    gl.drawArrays(gl.POINTS, 0, dotCount);
                    unattrib(pd);
                    /* pillars, then blooms */
                    var ps = P.s;
                    gl.useProgram(ps.p);
                    camUniforms(ps, cam);
                    gl.uniform2f(ps.u.uRes, cw, ch);
                    gl.uniform4f(ps.u.uP, t, uPo, pxs, cam.D);
                    gl.uniform1f(ps.u.uH, SPIKE_H);
                    gl.bindBuffer(gl.ARRAY_BUFFER, B.spikes);
                    attrib(ps, 'aN', 4, 44, 0); attrib(ps, 'aV', 4, 44, 16); attrib(ps, 'aC', 3, 44, 32);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, B.quad);
                    gl.drawElements(gl.TRIANGLES, HUBS.length * 6, gl.UNSIGNED_SHORT, 0);
                    unattrib(ps);
                    var pn = P.n;
                    gl.useProgram(pn.p);
                    camUniforms(pn, cam);
                    gl.uniform2f(pn.u.uRes, cw, ch);
                    gl.uniform4f(pn.u.uP, t, uPo, pxs, cam.D);
                    gl.bindBuffer(gl.ARRAY_BUFFER, B.nodes);
                    attrib(pn, 'aN', 4, 44, 0); attrib(pn, 'aV', 4, 44, 16); attrib(pn, 'aC', 3, 44, 32);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, B.quad);
                    gl.drawElements(gl.TRIANGLES, HUBS.length * 6, gl.UNSIGNED_SHORT, 0);
                    unattrib(pn);
                }
                hudAt(t, o, cam, incCount);
            } else {
                hudAt(t, o, null, incidentsAt(t).count);
            }
            if (!still && (o >= 0 || t < T.end)) contentAt(t, o);
            if (!still) setOp(scrim, smooth(T.back0 - 0.3, T.back0 + 0.9, t) * out(0.45, 1.0));
        }

        /* ---- the HUD for time t ---- */
        function pad2(n) { n = Math.floor(n); return (n < 10 ? '0' : '') + n; }
        function hudAt(t, o, cam, incCount) {
            var out = o < 0 ? 1 : 1 - smooth(0.25, 0.75, o);
            setOp(hud, out);
            var bk = smooth(0.15, 0.55, t);
            for (var k = 0; k < blk.brk.length; k++) setOp(blk.brk[k], bk);
            /* where there is no margin the corner text bows out as the page comes back */
            var room = vw < 1100 ? 1 - smooth(T.back0 - 0.3, T.back0 + 0.3, t) : 1;
            setOp(blk.tl, smooth(0.3, 0.8, t) * room);
            setOp(blk.tr, smooth(0.45, 0.95, t) * room);
            setOp(blk.bl, smooth(T.tilt0 + 0.6, T.tilt1 + 0.2, t) * room);
            setOp(blk.br, smooth(T.tilt0 + 0.9, T.tilt1 + 0.6, t) * room);
            setOp(blk.leg, smooth(T.tilt0 + 0.2, T.tilt0 + 0.8, t));
            var phase = t < T.tilt0 ? 0 : t < T.end ? 1 : 2;
            setText(blk.phaseN, ['01', '02', '03'][phase]);
            setText(blk.phaseT, ['Counting the OOMs', 'The race', 'The decade ahead'][phase]);
            var secs = Math.max(0, t);
            setText(blk.clock, pad2(secs / 3600) + ':' + pad2(secs / 60 % 60) + ':' + pad2(secs % 60));
            setText(blk.coord, t < T.tilt0 ? (CH.narrow ? 'After Aschenbrenner ’24' : 'Rough, after Aschenbrenner (2024)') : 'Washington ↔ Beijing · ~11,150 km');
            var yr = yearAt(t);
            setText(blk.year, yr >= 2029.995 ? '2030' : yr.toFixed(1));
            setText(blk.hubs, String(o < 0 ? HUBS.filter(function (h, i) { return t - igniteAt(i) > 0.05; }).length : hubsLit));
            setText(blk.links, String(linksUp));
            setText(blk.inc, String(incCount));
            if (!cam) return;
            /* chart labels */
            var chartA = 1 - smooth(T.tilt0, T.tilt0 + 0.55, t), head = headYear(t), wide = vw >= 1100, back = smooth(T.back0, T.back0 + 0.6, t);
            for (k = 0; k < labels.length; k++) {
                var L = labels[k], a = 0;
                if (L.kind === 'chart') a = smooth(L.t0, L.t0 + 0.35, t) * chartA;
                else if (L.kind.indexOf('ms:') === 0) { var y = parseFloat(L.kind.slice(3)); a = smooth(y, y + 0.12, head) * (t >= T.line0 ? 1 : 0) * chartA; }
                else if (L.kind === 'head') {
                    L.x = CH.X(head); L.y = CH.Y(oom(head));
                    a = (t > T.line0 + 0.1 ? 1 : 0) * (1 - smooth(CH.exit - 0.25, CH.exit - 0.05, head)) * chartA;
                    if (a > 0.01) setText(L.el.firstChild.firstChild, head.toFixed(1)), setText(L.el.firstChild.lastChild, (oom(head) >= 0 ? '+' : '−') + Math.abs(oom(head)).toFixed(1) + ' OOM');
                }
                else if (L.kind === 'exit') a = smooth(CH.exit - 0.05, CH.exit + 0.12, head) * chartA;
                else if (L.kind === 'hub' || L.kind === 'cap') {
                    L.z = spikeH(L.k, t, o) + 0.012;
                    var ig = L.t0;
                    if (L.kind === 'hub') a = vw < 700 ? 0 : smooth(ig + 0.05, ig + 0.25, t) * (1 - smooth(ig + 1.0, ig + 1.4, t));

                    else {
                        /* the two capitals keep their names where there is a margin for them */
                        a = smooth(ig + 0.05, ig + 0.3, t);
                        if (t > T.back0) {
                            var cp = project(cam, L.x, L.y, L.z);
                            a *= lerp(1, wide && !inColumn(cp.x) ? 0.85 : 0, back);
                        }
                    }
                    a *= o < 0 ? 1 : 1 - smooth(0, 0.3, o);
                }
                placeLabel(L, cam, a);
            }
            /* incident / link-up tags: newest first, only where they will not sit behind the text */
            TAGQ.sort(function (p, q) { return p.age - q.age; });
            var used = 0;
            for (k = 0; k < TAGQ.length && used < tags.length; k++) {
                var g = TAGQ[k], pp = project(cam, g.x, g.y, 0);
                if (pp.w <= 0.05 || pp.x < 8 || pp.x > vw - 120 || pp.y < 70 || pp.y > vh - 20) continue;
                if (t > T.back0 && (vw < 700 || inColumn(pp.x))) continue;
                var ta = smooth(0, 0.15, g.age) * (1 - smooth(g.life - 0.5, g.life, g.age));
                var tg = tags[used++];
                if (tg.txt !== g.txt) { tg.tx.textContent = g.txt; tg.txt = g.txt; }
                var X = Math.round(pp.x * 2) / 2, Y = Math.round(pp.y * 2) / 2;
                if (X !== tg.px || Y !== tg.py) { tg.el.style.transform = 'translate3d(' + X + 'px,' + Y + 'px,0)'; tg.px = X; tg.py = Y; }
                ta = Math.round(ta * (o < 0 ? 1 : 0) * 100) / 100;
                if (ta !== tg.a) { tg.el.style.opacity = ta; tg.a = ta; }
            }
            for (; used < tags.length; used++) { var tz = tags[used]; if (tz.a !== 0) { tz.el.style.opacity = '0'; tz.a = 0; } }
        }

        /* =================================================================
           the loop
           ================================================================= */
        function clockT(now) { return baseT + (now - baseNow) / 1000 * rate; }
        function loop(now) {
            raf = 0;
            if (!running) return;
            now = now || performance.now();
            if (mode === 'on') {
                var t = clockT(now);
                if (rate !== 1 && t >= T.end) { baseT = t; baseNow = now; rate = 1; }
                if (t > T.steady && now - lastDraw < 1000 / STEADY_FPS - 3) { raf = requestAnimationFrame(loop); return; }
                if (now - fpsT > 1000) { fpsEst = Math.round(fpsN * 1000 / (now - fpsT)); fpsT = now; fpsN = 0; }
                fpsN++;
                lastDraw = now;
                if (parOn) { par.x += (par.tx - par.x) * 0.06; par.y += (par.ty - par.y) * 0.06; }
                render(t, -1);
                if (t >= T.end && !html.classList.contains('fw-steady')) { html.classList.add('fw-steady'); clearContent(true); removeSkip(); }
            } else if (mode === 'exit') {
                var o = (now - offAt) / 1000;
                render(tAtOff + o, o);
                if (o >= 0.8 && !sw.classList.contains('is-sparking')) sw.classList.add('is-sparking');
                if (o >= OFF_LEN) { teardown(); api.done(); return; }
            }
            raf = requestAnimationFrame(loop);
        }
        function start() { if (!running) { running = true; lastDraw = 0; if (!raf) raf = requestAnimationFrame(loop); } }
        function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }

        /* ---- interaction during the intro fast-forwards it ---- */
        var skipEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
        function onSkip(e) {
            if (mode !== 'on' || rate !== 1 || !running) return;
            if (e && e.target && e.target.nodeType === 1 && sw.contains(e.target)) return;
            if (e && e.type === 'keydown' && /^(Shift|Control|Alt|Meta)$/.test(e.key)) return;
            var now = performance.now(), t = clockT(now);
            if (t >= T.back0 - 0.2) return;
            baseT = t; baseNow = now; rate = SKIP_RATE;
        }
        function addSkip() { skipEvents.forEach(function (n) { window.addEventListener(n, onSkip, { passive: true, capture: true }); }); }
        function removeSkip() { skipEvents.forEach(function (n) { window.removeEventListener(n, onSkip, { passive: true, capture: true }); }); }

        /* ---- fine pointers turn the camera a few degrees ---- */
        function onMove(e) {
            if (e.pointerType && e.pointerType !== 'mouse') return;
            par.tx = (e.clientX / vw - 0.5) * 0.05;
            par.ty = (e.clientY / vh - 0.5) * 0.02;
        }
        function addPar() { if (!parOn && window.matchMedia && window.matchMedia('(pointer: fine)').matches) { parOn = true; window.addEventListener('pointermove', onMove, { passive: true }); } }
        function removePar() { if (parOn) { parOn = false; window.removeEventListener('pointermove', onMove, { passive: true }); } par.x = par.y = par.tx = par.ty = 0; }

        /* ---- switch ---- */
        function prepare() {
            sizeCanvas();
            var cr = document.querySelector('.container').getBoundingClientRect();
            colX = [cr.left - 28, cr.right + 28];
            layoutChart();
            fit = solveFit();
            colHalfW = vw >= 1100 ? (vw / 2 - colX[0] + 20) / Math.max(0.31 * vw, 392) * (BJW[0] - DCW[0]) / 2 : 0;

            measureThesis();
            knobWorld();
        }
        function turnOn(opts) {
            opts = opts || {};
            if (on) return;
            if (mode === 'exit') teardown();
            on = true;
            sw.setAttribute('aria-checked', 'true');
            var seek = opts.t || 0;
            still = !!opts.still || reduced;
            if (still) seek = Math.max(seek, STILL_T);
            frozen = !!opts.freeze;
            if (frozen) html.classList.add('fw-freeze');
            html.classList.add('fw-live', 'fw-on');
            prepare();
            var hasGL = !lost && initGL();
            if (!hasGL) { html.classList.add('fw-nogl'); seek = Math.max(seek, STILL_T); } else html.classList.remove('fw-nogl');
            mode = 'on'; rate = 1;
            baseT = seek; baseNow = performance.now();
            if (document.fonts && document.fonts.load) { document.fonts.load('500 10px "IBM Plex Mono"').catch(function () {}); document.fonts.load('600 12px "Inter Tight"').catch(function () {}); }
            if (!hasGL || still) {
                /* a still frame of the steady state, cross-faded in */
                if (!frozen) html.classList.add('fw-still');
                if (seek >= T.end) html.classList.add('fw-steady');
                render(seek, -1);
                contentAt(seek, -1);
                if (seek >= T.end) clearContent(true);
                setOp(scrim, seek >= T.end ? 1 : smooth(T.back0 - 0.3, T.back0 + 0.9, seek));
                var layers = [canvas, fb, scrim, hud], fin = layers.map(function (e) { return e.style.opacity || '1'; });
                if (!frozen) {
                    layers.forEach(function (e) { e.style.opacity = '0'; });
                    void canvas.offsetWidth; void fb.offsetWidth;
                    layers.forEach(function (e, k) { e.style.opacity = fin[k]; });
                    cache.clear();
                }
                return;
            }
            if (seek < T.end) addSkip();
            if (!frozen && seek < 0.2) {
                sw.classList.remove('is-sparking');
                sw.classList.add('is-igniting');
                setTimeout(function () { sw.classList.remove('is-igniting'); }, 800);
            }
            if (seek >= T.end) html.classList.add('fw-steady');
            render(seek, -1);
            if (seek >= T.end) clearContent(true);
            if (frozen) return;
            addPar();
            start();
        }
        function turnOff() {
            if (!on) return;
            on = false;
            sw.setAttribute('aria-checked', 'false');
            sw.classList.remove('is-igniting');
            removeSkip();
            removePar();
            if (frozen) { html.classList.remove('fw-freeze'); frozen = false; }
            if (!gl || lost || still || html.classList.contains('fw-nogl')) {
                /* still frames fade out */
                stop();
                mode = 'exit';
                html.classList.add('fw-still');
                [canvas, fb, scrim, hud].forEach(function (e) { e.style.opacity = '0'; });
                clearContent();
                setTimeout(function () { if (mode === 'exit' && !on) { teardown(); api.done(); } }, 650);
                return;
            }
            var now = performance.now();
            tAtOff = running ? clockT(now) : tNow;
            snap = groups.concat(thesis ? [thesis] : []).map(function (e) { var v = parseFloat(e.style.opacity); return isNaN(v) ? 1 : v; });
            mode = 'exit';
            offAt = now;
            start();
        }
        function teardown() {
            stop();
            mode = 'off';
            html.classList.remove('fw-live', 'fw-on', 'fw-steady', 'fw-still', 'fw-freeze', 'fw-nogl');
            clearContent();
            [canvas, fb, scrim, hud].forEach(wipe);
            hud.querySelectorAll('.fw-blk, .fw-brk').forEach(wipe);
            labels.forEach(function (L) { L.el.style.opacity = '0'; L.a = 0; });
            tags.forEach(function (g) { g.el.style.opacity = '0'; g.a = 0; });
            sw.classList.remove('is-sparking', 'is-igniting');
            removeSkip();
            removePar();
            still = false; rate = 1;
            cache.clear();
        }
        /* a frozen frame of the wind-down, o seconds after a flick OFF from the steady state */
        function exitFrame(o) {
            tAtOff = STILL_T;
            snap = [];
            mode = 'exit';
            render(STILL_T + o, o);
        }

        sw.addEventListener('click', function () { if (on) turnOff(); else turnOn(); });
        sw.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) { if (on) turnOff(); else turnOn(); } }
        });
        /* buttons also fire click on Space/Enter keyup in some engines; keydown already toggled */
        sw.addEventListener('keyup', function (e) { if (e.key === ' ') e.preventDefault(); });

        canvas.addEventListener('webglcontextlost', function (e) {
            if (destroyed) return;
            e.preventDefault();
            lost = true;
            stop();
            html.classList.add('fw-nogl');
            if (on) { clearContent(true); setOp(scrim, 1); fb.style.opacity = '1'; html.classList.add('fw-steady'); hudAt(STILL_T, -1, null, incidentsAt(STILL_T).count); }
        }, false);
        canvas.addEventListener('webglcontextrestored', function () {
            if (destroyed) return;
            lost = false;
            try { buildGL(); } catch (err) { return; }
            html.classList.remove('fw-nogl');
            if (on && mode === 'on') {
                var t = Math.max(tNow, T.end + 0.5);
                baseT = t; baseNow = performance.now();
                fb.style.opacity = '';
                if (frozen || still) render(t, -1); else start();
            }
        }, false);

        var rz = 0;
        function onResize() {
            if (!on && mode !== 'exit') return;
            if (rz) return;
            rz = requestAnimationFrame(function () {
                rz = 0;
                prepare();
                if (!running && gl && !lost) render(tNow, mode === 'exit' ? Math.max(0, tNow - tAtOff) : -1);
            });
        }
        function onVis() {
            if (mode === 'off') return;
            if (document.hidden) { if (running) { pausedAt = performance.now(); stop(); paused = true; } }
            else if (paused) { paused = false; var d = performance.now() - pausedAt; baseNow += d; offAt += d; start(); }
        }
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVis);

        /* ---- entry: arriving is the flick (?t= seeds, ?freeze=1 one frame, ?off=<s> a wind-down frame) ---- */
        function boot() {
            if (Q.off !== undefined) { turnOn({ t: STILL_T, freeze: true }); if (gl && !lost) exitFrame(parseFloat(Q.off) || 0); return; }
            turnOn({ t: parseFloat(Q.t) || 0, freeze: Q.freeze === '1' });
        }
        var destroyed = false;
        function destroy() {
            destroyed = true;
            stop();
            removeSkip();
            removePar();
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVis);
            if (gl) { var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); gl = null; }
        }
        return {
            boot: boot, turnOn: turnOn, turnOff: turnOff, destroy: destroy,
            isOn: function () { return on; },
            stats: function () {
                return {
                    on: on, mode: mode, t: +tNow.toFixed(3), rate: rate, running: running, raf: !!raf, frozen: frozen, still: still,
                    gl: !!gl, lost: lost, canvas: [canvas.width, canvas.height], canvasDisplay: getComputedStyle(canvas).display,
                    pxs: pxs, dots: dotCount, hubsLit: hubsLit, links: linksUp, rings: ringCount, incidents: incidentsAt(tNow).count,
                    fps: fpsEst, frames: frameCount, now: +NOW_YEAR.toFixed(3), fit: fit
                };
            }
        };
    }

    /* ---- mount / unmount: everything added is tracked and removed ---- */
    var scene = null, active = false, waiting = false, queued = false, added = [], cmSw = null, cmStyle = null, htmlClass = null, host = null, hostStyle = null;
    function byId(id) { return document.getElementById(id); }
    function claudeBusy() {
        var s = byId('cm-switch'), w = byId('cm-wall');
        return (s && s.getAttribute('aria-checked') === 'true') || !!(w && w.classList.contains('live'));
    }
    function add(node, parent, before) { parent.insertBefore(node, before || null); added.push(node); return node; }
    function mount() {
        var head = document.head, container = document.querySelector('.container');
        htmlClass = document.documentElement.getAttribute('class');
        var st = document.createElement('style'); st.id = 'fw-style'; st.textContent = CSS; add(st, head);
        var ln = document.createElement('link'); ln.id = 'fw-fonts'; ln.rel = 'stylesheet'; ln.href = FONTS; add(ln, head);
        var tmp = document.createElement('div');
        tmp.innerHTML = OVERLAYS;
        while (tmp.firstElementChild) add(tmp.firstElementChild, container.parentNode, container);
        var b = document.createElement('button');
        b.type = 'button'; b.id = 'fw-switch';
        b.setAttribute('role', 'switch'); b.setAttribute('aria-checked', 'false');
        cmSw = byId('cm-switch');
        cmStyle = cmSw ? cmSw.getAttribute('style') : null;
        host = byId('fw-btn');
        if (host) {
            /* the homepage's globe button: a lit twin takes its exact seat and is the off control */
            b.className = host.className;
            b.setAttribute('aria-label', host.getAttribute('aria-label'));
            b.innerHTML = host.innerHTML;
            add(b, host.parentNode, host.nextSibling);
            hostStyle = host.getAttribute('style'); host.style.display = 'none';
            /* the Claude-mode button stays put: the page's router turns a press into a mode hop */
        } else {
            b.className = 'fw-switch'; b.title = 'Free world'; b.setAttribute('aria-label', 'Free world');
            b.innerHTML = '<span class="fw-switch-track" aria-hidden="true"><span class="fw-switch-knob"></span></span>';
            /* take the Claude-mode switch's seat; if the page ever loses that row, bring our own */
            var row = cmSw ? cmSw.parentNode : null;
            if (row) add(b, row, cmSw.nextSibling);
            else {
                row = document.createElement('div'); row.className = 'fw-switch-row';
                add(row, document.querySelector('.header') || container);
                row.appendChild(b);
            }
            if (cmSw) { cmStyle = cmSw.getAttribute('style'); cmSw.style.display = 'none'; }
        }
    }
    function restoreStyle(el, s) { if (s === null) el.removeAttribute('style'); else el.setAttribute('style', s); }
    function unmount() {
        added.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
        added = [];
        if (cmSw) restoreStyle(cmSw, cmStyle);
        if (host) restoreStyle(host, hostStyle);
        cmSw = null; cmStyle = null; host = null; hostStyle = null;
        /* classList leaves class="" behind; put <html> back exactly as it was */
        var h = document.documentElement;
        if (htmlClass === null && !h.className) h.removeAttribute('class');
        if (location.hash === '#situation' && window.history && history.replaceState) history.replaceState(history.state, '', location.pathname + location.search);
    }
    var api = { done: function () { if (scene) scene.destroy(); scene = null; active = false; unmount(); } };
    function start() {
        active = true;
        /* no scroll jump: the scene is pinned to the viewport, and the lit button (the off control) stays under the cursor */
        mount();
        scene = Scene(api);
        scene.boot();
    }
    function play() {
        if (document.readyState !== 'complete') {
            if (!queued) { queued = true; window.addEventListener('load', function () { queued = false; play(); }, { once: true }); }
            return;
        }
        if (active) { if (scene && !scene.isOn()) scene.turnOn(); return; }
        if (waiting) return;
        if (claudeBusy()) {
            /* Claude mode is on: switch it off and let it wind down, so the two scenes never overlap */
            waiting = true;
            var s = byId('cm-switch'), t0 = Date.now();
            if (s && s.getAttribute('aria-checked') === 'true') s.click();
            (function wait() {
                if (!waiting) return;
                if (!claudeBusy() || Date.now() - t0 > 4000) { waiting = false; start(); }
                else setTimeout(wait, 60);
            })();
            return;
        }
        start();
    }
    function stop() {
        if (waiting) { waiting = false; return; }
        if (active && scene && scene.isOn()) scene.turnOff();
    }
    window.__fw = {
        play: play,
        stop: stop,
        active: function () { return active; },
        stats: function () { return scene ? scene.stats() : { active: active, waiting: waiting }; }
    };
    play();
})();
