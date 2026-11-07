# Plot 1

Open index.html through an HTTP server. The first unlock starts a single 60-second deadline. LINE notifications link to Thanwa; tap the composer to fill the next scripted reply, then tap the arrow to send. Existing history arrays remain unchanged.

Progress and added messages persist in browser localStorage under `pheem.plot1.v1`. Refresh resumes deadlines and queued messages without duplication. Clearing browser site data removes the save. A call interrupted by refresh resumes at its saved elapsed time. Early End returns to S and allows retry; only a completed call unlocks the follow-up. Completed calls cannot be replayed.

`plot1-subtitles.js` contains the four verbatim supplied lines. Times are seconds from connection, after the three-second dialing phase. Each cue has id, speaker, text, startTime, endTime, audioSrc. The demo has no voice, translation, or speech synthesis. The three end tones are synthesized locally.

To add Thai recordings, set each audioSrc to a same-origin asset path. Each recording should contain just that cue. Audio currentTime then controls the cue clock; pause freezes it, ended advances to the next scheduled pause/cue. End stops audio and clears subtitles. Browsers may require a user gesture for audio after a refresh.

The reference image guides call layout; the example text in that image and the uploaded video are not used as dialogue. Only the four explicitly supplied Techin sentences are shown. June 26 appears on follow-up chat timestamps; the phone remains on the supplied June 25 scene setting.
