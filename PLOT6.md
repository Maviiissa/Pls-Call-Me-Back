# Plot 6

Plot 6 reuses the single existing `.plot-call` component, controls, subtitle area, audio player and browser-local story save. It adds an incoming/accept state to that same component, not another phone app. Existing Parn name and avatar sources come directly from the current `#line-parn` contact; no new contact or placeholder is used.

## Trigger and acceptance

The last Plot 5 player message commits Plot 5 completion and records its completion time. The shared tick unlocks Plot 6 once, with a persisted deadline five seconds after that completion. Older already-completed Plot 5 saves receive a five-second deadline when the new plot is first available. The incoming screen appears over the current app or lock screen and waits for the explicit 接听 button; it does not auto-answer or advance subtitles while ringing.

Acceptance connects immediately, without reusing the outbound three-second dialing delay. The original contact avatar/name appear at the top, and the timer starts at 00:00. All 27 supplied subtitle entries are preserved separately in plot6-data.js with exact start/end times, speaker labels and text. The one existing subtitle element shows only the current cue, clears during gaps and never renders the conversation into LINE.

## Audio and timing

`assets/parnplot6.m4a` is the full independent audio supplied by the user, copied byte for byte without trimming or re-encoding. Duration is 46.788209 seconds. SHA256:

`f0a7f67d2f4c37900b689558895557d38f14b2be32f66f9eba03254d4cd762bc`

The original MOV exceeded the tool's 32 MiB download limit; the subsequently supplied M4A resolved the audio input. No generated voice, TTS or translation is used.

Audio playback time drives the subtitles and timer. The final complete cue is 受得了，而且我根本不在乎。, displayed from 44.6 to 46.4. The phone remains visible for the specified two seconds after 46.4, ending at about 48.4. The original recording therefore ends naturally before the screen closes. The game then returns directly to the unlocked home screen and marks completion, without another conversation, Instagram post, proposal or Plot 7.

## Progress and edge cases

The shared save owns `plot6.phase`, triggerAt, triggeredAt, acceptedAt, elapsed, audioEnded, audioDuration, nodes and completed. Nodes include plot6_unlocked, plot6_ringing, plot6_in_call, plot6_call_completed and plot6_completed. Refresh restores a ringing or accepted call without scheduling another incoming event. Accepted audio resumes from its saved offset; the existing audio-play button handles browser autoplay restrictions if needed. Reloading during the post-audio hold restores the remaining silence rather than replaying the recording.

The existing End button can pause an unfinished call and return home without marking completion. The existing Parn LINE phone entry then resumes the same call, with no second incoming event. Normal complete playback needs no player input after acceptance. All underlying apps are made inert only while the call is visible; their normal navigation is restored when returning home.

## Validation

- tests/plot6.browser.cjs uses a test-only subtitle-clock substitute for audio to check exact cue windows/gaps and timer boundaries rapidly. It covers the Plot 5 gate, five-second deadline, original avatar in both states, explicit acceptance, ring and call refresh, optional pause/resume, two-second final hold, home return, no new LINE/post/plot, and no replay. It also checks incoming calls from lock, home, LINE, Messenger, Photos, Messages and Instagram.
- tests/plot6-audio.browser.cjs plays the real complete M4A without skipping, records all 27 visible cue transitions with their actual media times, asserts the supplied windows/order/text, then verifies natural audio ending and home return.
- tests/persistence.browser.cjs covers actual audio offset recovery and reload during the silent tail without restarting audio.
- Plot 5 regression now verifies no Plot 5 Parn response and the separate one-time Plot 6 incoming after completion. Plot 1–4 and save regressions retain previous dialogue and behavior.
