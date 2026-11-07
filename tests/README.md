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

Checks include calendar/date, cake photo viewer, manual-only outgoing messages, background incoming queues, unique Instagram post, preserved breakup history, draft animations that pause across app navigation, disabled sending during drafts, mutually exclusive choices, branch-specific phone access, full recording duration, original-call component reuse, direct post-call input prompt, morning date/animation, common Thanwa ending, the one-time Plot 4 handoff, no replay on navigation, and retained progress after refresh. Page JavaScript errors fail the run.

Set END_IN_TAIL=1 on the default B test to click End during the post-audio dark tail and verify that it still unlocks the full morning conversation. End before the final scripted line remains separately covered as an early-hangup retry. Both natural completion and tail-End paths test clicking the returned Parn composer directly, without leaving LINE.

Browser persistence regression coverage:

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/persistence.browser.cjs
```

This checks refresh mid-countdown and during queued replies, no duplicate messages, migration from the old test key, isolation from stale test tabs, Messenger order and clock recovery, branch and Instagram post recovery, resumed input animations, playback position recovery for both calls, completed-call continuation, and isolation of a new browser context. Browser autoplay policy can require tapping the existing audio playback button after restoring a call.

Plot 4 checks (all 94 bubbles, each prior branch):

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/plot4.browser.cjs
```

These cover the existing three avatar sources, manual turns, timer spacing, active-app isolation, background notifications, lock-screen entry, scene/date transitions, saved branch/history preservation and refresh without duplicate messages.
