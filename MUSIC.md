# Background music

The lock screen and home screen share one `#background-music` audio element. The lock screen uses a translucent card based on the supplied reference; the home screen has a compact card in the unused area below the app icons. Existing story dates, clocks, contacts, dialogue, navigation and the final ending position are unchanged. The existing Music dock icon focuses the home player's controls.

## Audio

`assets/Music.m4a` is the user's complete uploaded file, copied byte for byte without trimming or re-encoding. Duration: **263.941224 seconds**. SHA-256:

`ffd9be3026b35bd8f940caf44081b853aa571272ba2d092b676c5a77c42c3085`

The user confirmed the display metadata: **If You Lie Down With Me — Lana Del Rey**. `music-data.js` contains this one song. Previous/next controls become usable if additional supplied tracks are configured. Optional `cover` accepts an uploaded album image; no album art or substitute photograph is generated.

## Playback rules

- Opening the page alone does not attempt unprompted audible autoplay. The first trusted click/tap on the phone or keyboard unlock action starts music, subject to browser autoplay rules. The audio play request is made inside that gesture.
- Lock and home controls synchronize play/pause, track, progress and volume. App navigation and lock/unlock do not restart playback. Adjusting a lock-screen control does not accidentally trigger the swipe gesture.
- A separate power control turns music off. Both manual pause and power-off persist and prevent generic clicks, phone calls or reload from restarting music unexpectedly.
- The current song **loops continuously** using the native audio loop setting until the player manually pauses or switches music off. Navigation does not restart it. Old play-once completion flags are migrated so they no longer block playback; manually paused/off preferences remain respected. There is no automatic switch to a different song.
- Volume uses a Web Audio gain node where supported, including browsers that restrict the native media element volume. Native volume is the fallback.
- Playback position, selected track, volume, manual pause/off and loop playback mode use `pheem.music.v1`. Existing `pheem.plot1.v1` story data is not rewritten by the music player. Refresh restores position and waits for the next user gesture before resuming sound.

## Phone integration

The existing phone controller dispatches `phone:call-state` with `{active:true}` before outbound dialing, incoming ringing, accepted/resumed calls and restored silent call tails. This pauses background music before the story audio element is primed. It dispatches `{active:false}` only after the call closes. Music resumes at its existing position if it was enabled and intended to play; manually paused or switched-off music remains stopped. These events do not alter call timing, subtitles, dialogue or story progression.

## Checks

```sh
python tests/serve.py
CHROMIUM_PATH=/usr/bin/chromium node tests/music.browser.cjs
CHROMIUM_PATH=/usr/bin/chromium node tests/music-audio.browser.cjs
```

The first test uses two clearly scoped test-only silent WAV responses to exercise switching, range seeking, volume sync, first-gesture playback, app/lock navigation, reload position, manual pause/off, actual outbound Plot 1 dialing and incoming/accepted Plot 6 interruption/resume, looping, old completion-state migration and an empty playlist. No fixture is installed in production assets.

The second uses the actual complete M4A, verifies its duration, source playback, power-off/on, unchanged game time/date and native looping after a test-only seek to the end and a manual pause retained after refresh. It does not claim to listen to all four minutes in real time. `TEST_SCREENSHOT_PREFIX` optionally saves lock/home screenshots.

Existing Plot 3, persistence, Plot 6, full Plot 6 audio and Plot 7 tests check regressions in the phone and storyline. Tests that instrument media playback distinguish the story audio element from `#background-music`.
