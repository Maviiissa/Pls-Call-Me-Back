# Browser progress

All story progress is stored locally under `pheem.plot1.v1` in the current browser, scoped to the game's web origin. Refreshing or closing and reopening the page retains completed and pending dialogue, branch choices, dates, the last app/chat, unfinished draft animations, Instagram posts/profile edits, and active call positions. No account or remote save service is used. Another browser/profile/private session starts separately; clearing the website's storage removes its save.

On the first upgrade, a valid former `pheem.plot1.test.v1` save is adopted automatically so the current test run can continue. An older release save is backed up as `pheem.plot1.v1.before-persistence` when replaced. The persistentProgress marker prevents an old tab's retired test save from overwriting later persistent progress.

Incoming message deadlines remain absolute: overdue replies finish without being duplicated. Player replies remain manual. Unfinished LINE draft animations pause while away and resume from the saved frame. An active Techin or Parn recording resumes at its saved audio offset; browser autoplay restrictions may require the existing play-audio button. If the recording had already ended, reload finishes the call and restores its continuation without replaying the recording.

Instagram uses the same game save through PheemGameProgress; it does not create a separate progress mechanism. Existing Plot 3 saves restore the already-published post once even if they predate Instagram persistence.

Tests: tests/persistence.browser.cjs covers migration, refresh points, animation/audio recovery and fresh-browser isolation. All three Plot 3 route tests also assert final progress, selected branch, messages and the Instagram post remain after refresh. Dialogue, branch content and original audio assets are unchanged by this update.
