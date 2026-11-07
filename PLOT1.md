## Current test settings

`TEST_MODE=true` in plot1.js restarts Plot 1 on each refresh. Test saves use the separate key `pheem.plot1.test.v1`; release saves remain untouched. Set TEST_MODE=false to restore persistent release behavior. The unlock delay is currently 20 seconds (`EXPLORATION_DELAY_MS=20000`).

# Plot 1

Open index.html through an HTTP server. The first unlock starts a single 20-second deadline. LINE notifications link to Thanwa; tap the composer to fill the next scripted reply, then tap the arrow to send. Existing history arrays remain unchanged.

When TEST_MODE is false, progress and added messages persist in browser localStorage under `pheem.plot1.v1`. Refresh resumes deadlines and queued messages without duplication. Clearing browser site data removes the save. A call interrupted by refresh resumes at its saved elapsed time. Early End returns to S and allows retry; only a completed call unlocks the follow-up. Completed calls cannot be replayed.

`plot1-subtitles.js` contains the six verbatim supplied lines. Times are seconds from connection, after the three-second dialing phase. Each cue has id, speaker, text, startTime, endTime, audioSrc. The demo uses extracted source-video voice, with no translation or speech synthesis. The three end tones are synthesized locally.

The complete recording is configured with PLOT1_CALL_AUDIO in plot1-subtitles.js. Every cue's audioSrc references that same recording; it is loaded and played once, not once per cue. Subtitle start/end times are measured from the recording's start (excluding the three-second dialing phase). Audio currentTime controls both call duration display and subtitles. Pausing hides the current subtitle and freezes progression; resuming restores the appropriate cue. End stops the audio and clears the subtitle. If autoplay is blocked, tap the visible audio play button.

The reference image guides call layout; the example text in that image does not override the supplied subtitle script. Only the six explicitly supplied Techin subtitle lines are shown. June 26 appears on follow-up chat timestamps; the phone remains on the supplied June 25 scene setting.

## Current Techin voice track

The replacement MOV's complete audio is stored in assets/techin-call-full.m4a (about 19.888 seconds). The earlier separate clips were removed. The six exact user-provided ranges are 1.2–2.8, 4.3–5.3, 9.3–10.8, 12.0–12.2, 15.6–18.0, and 18.9–20.0 seconds. The final cue stops when the recording actually ends, slightly before its nominal 20.0-second end. No audio is invented or stretched. Original pauses and background sound remain intact.

The recording's ended event clears subtitles and starts three end tones. After the tones plus a one-second pause, Call Ended is displayed for one second, then the game returns to S and unlocks the follow-up.

The LINE list updates latest-message previews, timestamps, unread counts, and conversation ordering for new story messages. Opening a conversation clears its unread count.

## Added Thanwa replies before contacting S

After all four explanation messages finish, the typing indicator stops. The player sends `我找秘书问Techin电话`, then `我自己去问他` as two separate preset replies. Only after both are sent does S offer `把Techin的电话给我`. These replies are stored with unique message IDs; their sent count determines the next preset, without re-triggering Thanwa's explanation or changing the post-call follow-up counter.
