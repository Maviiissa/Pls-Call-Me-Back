# Story browser checks

Requires Node, Playwright and Chromium. Start the range-aware local server first (audio-seek tests require HTTP byte ranges):

```sh
python tests/serve.py
```

Then run all three routes:

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/plot3.browser.cjs scarf
CHROMIUM_PATH=/usr/bin/chromium node tests/plot3.browser.cjs cake
CHROMIUM_PATH=/usr/bin/chromium node tests/plot3.browser.cjs miss_you
```

Omit CHROMIUM_PATH when using Playwright's bundled Chromium. GAME_URL overrides the default http://127.0.0.1:8000. TEST_SCREENSHOT optionally saves the inline-choice screenshot.

Each route starts fresh and goes through Plot 1, Plot 2 and both earlier Plot 3 scenes before testing its branch. Scripted timers use the browser test clock. The initial Techin call's ended event is simulated to keep these branch checks quick; its actual audio playback was checked separately. The default B test uses actual Parn audio and seeks to verify captions, tests early End and retry, then allows the real recording to reach ended naturally. FULL_AUDIO=1 instead plays the full Parn recording in real time (~56 seconds including the silent tail), without seeking.

Checks include calendar/date, cake photo viewer, manual-only outgoing messages, background incoming queues, unique Instagram post, preserved breakup history, draft animations that pause across app navigation, disabled sending during drafts, mutually exclusive choices, branch-specific phone access, full recording duration, original-call component reuse, morning date/animation, common Thanwa ending, absence of Plot 4, no replay on navigation, and reset on refresh. Page JavaScript errors fail the run.
