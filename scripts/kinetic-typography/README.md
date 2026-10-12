# Full-Stack Engineering & Automation

An original 10.5-second, 1080 × 1920, 60 fps silent kinetic typography film.

## Regenerate

On macOS, with Python 3.11 or later:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python render.py --output ../public/media
```

To write directly into the portfolio, pass its absolute `public/media` directory to `--output`. No application dependencies or runtime code are required. `--stills --output ./stills` generates the editorial contact sheet. The renderer uses the system Helvetica Neue collection (Bold index 1 and Medium index 10); the font is not redistributed. `--font` accepts a compatible licensed font collection if needed.

## Design and timing

Portfolio tokens were inspected in `src/styles/global.css`. Backgrounds use the actual `#F6F5F1`, `#FAF9F6`, and `#E9E8E4` surfaces. Type uses the requested warm stone `#66615A`, with `#807A72` technical labels for readability. Helvetica Neue is already in the portfolio's font stack.

The supplied 9.54-second reference informed short transition bursts, controlled holds, oversized scale changes, and minimal composition. All wording and the cream treatment are original to this brief. No reference pixels, audio, or branding are included.

| Main beat | Copy | Motion |
|---|---|---|
| 0.00–0.85 | Not Just / Interfaces. | Small setup, large expansion, cream type wipe |
| 0.85–1.85 | Complete Systems. | Two masked upward reveals; opposing exits |
| 1.85–2.60 | Frontend. | Right-to-left swipe; React · TypeScript |
| 2.60–3.35 | Backend. | Opposing swipe; Node.js · Python |
| 3.35–4.05 | APIs. | Oversized punch and central contraction |
| 4.05–4.85 | Databases. | Horizontal mask; PostgreSQL · MongoDB |
| 4.85–5.75 | Integrations. | 18 ms letter stagger with a shared baseline |
| 5.75–6.65 | Workflows. | Vertical roll; muted surface shift |
| 6.65–7.75 | Automation. | Scale growth and hold; n8n · Webhooks |
| 7.75–9.05 | Everything Connected. | Two lines converge and lock |
| 9.05–10.50 | Built End To End. | Calm reveal, extended hold, cream loop seam |

Transitions overlap beat boundaries by design. Settled words fit within the frame; oversized transition crops are intentional.

## Rendering

Pillow rasterizes glyph masks at double resolution, then applies deterministic transforms, clipping, easing, and optical spacing. Moving frames integrate seven temporal samples across a 220-degree shutter, producing motion blur from actual glyph movement. Static holds remain sharp. FFmpeg encodes H.264 at CRF 18 with yuv420p, BT.709 metadata, and fast-start playback. Exactly 630 frames are generated. There is no audio stream.

The poster uses the “Everything Connected.” lockup at 8.55 seconds. The opening and ending return to the same light surface for looping.
