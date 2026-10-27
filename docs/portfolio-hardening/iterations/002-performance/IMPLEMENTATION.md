# Implementation

Status: implemented; final browser/performance comparison pending integrated verification.

Inspected App's eager route imports, Vite output, every PNG dimension/size, Hero image geometry (941×1672 source, maximum 350 CSS-pixel avatar container), projectArtwork/Explore/section image use, credential images and FullStack video lifecycle. Video already observes viewport/document visibility and reduced motion, uses metadata preload and catches playback failure. Preserve that working design.

App now lazily imports standalone route markup with React lazy/Suspense and a neutral cream fallback. PageScroll remains mounted outside Suspense. Project CSS stays statically ordered before shared ProjectPage.css to preserve the reference cascade; this deliberately trades some CSS delivery for visual stability. Individual project navigation/modals remain intact.

69 full-resolution WebP derivatives reduce 62,514,400 bytes of PNG source to 32,303,804 bytes. Every decoded RGBA pixel matches its original, ICC data retained. Originals are untouched. Added 640px artwork variants with the same full-image aspect ratio and no crop, used through srcSet in Explore/Cloud/AI/SelectedProjects. Hero/mascot/credentials use lossless full-resolution replacements. Separate 48px public favicon replaces the 1.9MB favicon reference; original remains preserved. Alt text and CSS positioning unchanged.

Reproducible conversion: `python3 scripts/optimize-images.py` with Pillow. Bundled task runtime used Pillow 12.3.0; no new application dependency. Image manifest records exact pixels, source paths and byte sizes. Test bundlers now accept WebP as well as PNG; tests still validate the original behavior.

Entry JS after responsive variants: 480.22 kB / 144.67 kB gzip versus 984.69 / 266.79 baseline. The 478.08 kB intermediate entry predates srcSet mapping. Route chunks are separate (e.g. AssessFlow ≈27kB, Recruiter ≈61kB). No >500kB entry warning. CSS stays broadly unchanged by design.

New scripts: optimize-images.py, measure-hardening-performance.js; modified App, image imports, projectArtwork, artwork consumers, index favicon and verification loaders. No AWSBankingRisk/MicrosoftDevOps source or stylesheet edits.
