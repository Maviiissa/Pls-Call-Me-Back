# Plot 3

Plot 3 uses the existing story object and localStorage key in plot1.js. TEST_MODE still resets the entire story on refresh. App navigation retains messages, pending replies, animations and the selected branch. No Plot 4 scene is defined or triggered.

## Existing scenes

After the final Plot 2 order message, the clock becomes 28 June 2026, 15:34. Thanwa's cake photo and conversation continue in the shared LINE queue. After 滚。, opening the existing Instagram profile inserts the cake post once, followed by Thanwa's reaction. 知道了。 unlocks the existing Parn conversation without opening it. The supplied Cake.jpg and PheemInsPost1.jpg are now present in assets and decode successfully.

## Parn and branches

The original index.html history, including the June 17 breakup, is untouched apart from added script imports. New Parn messages are appended separately using the same LINE history renderer and avatar. Opening Parn after unlocking starts the draft-only intro after two seconds. It types, holds and deletes each supplied line, then exposes three inline choices. Drafts cannot be sent. Leaving the chat pauses the animation and returning resumes it without replaying completed animations.

- `scarf`: both player messages require Send; the second fills automatically. After Parn's three replies, the two unsent drafts play and the branch merges.
- `miss_you`: the clock becomes June 28, 23:18. After the supplied late-night chat, the existing phone icon becomes active for Parn. The existing single phone screen dials for three seconds, plays the full source recording, and uses audio currentTime for subtitles and call time. Early End stops media, returns to Parn, and permits retry without unlocking morning. Natural completion disables replay, returns to Parn, and offers the composer as a way to continue. Leaving for home updates to June 29, 10:42; returning to Parn plays the three unsent morning drafts before the supplied morning dialogue. The final Parn replies complete the branch.
- `cake`: player messages remain manual. The three unsent drafts after the final …… play before merging.

Every branch joins the supplied Thanwa ending. The player must send 我不知道。 to complete Plot 3. Choices cannot be reopened, no completion modal is shown, and free exploration remains available.

## Full Parn recording and subtitles

`assets/parn-call-full.m4a` contains the complete AAC stream copied from the user's latest MOV with no cuts, reordering, or re-encoding. Duration: 48.157007 seconds. The original and extracted encoded audio packet hashes both equal:

`7cf2ec1e883c94f8a7d9e266d5299af3b9411b110477357970aa5118d37e0a0c`

`plot3-parn-subtitles.js` contains the non-graphic supplied dialogue at its original timestamps. The explicit sexual-instruction captions from 27.5–43.0 seconds are not rendered; that interval has no added subtitle text. The original uploaded audio remains complete. The final supplied non-graphic line appears at 44.5–47.0 seconds, then the existing call screen gradually darkens. Six seconds of silence follow the recording's natural ended event while the call timer keeps running; Call Ended then appears for one second before returning to Parn. No translation, generated voice or TTS is used.

## State and compatibility

The shared node list `plot3.nodes` records:

- plot3_started
- plot3_cakes_delivered
- plot3_thanwa_conversation_completed
- plot3_instagram_posted
- plot3_instagram_reaction_completed
- plot3_parn_chat_unlocked
- plot3_parn_intro_animation_completed
- plot3_branch_selected
- plot3_parn_call_completed (B only)
- plot3_branch_completed
- plot3_final_thanwa_completed
- plot3_completed

Existing aliases from the earlier implementation remain recorded. The top-level `plot3_branch` stores `scarf`, `miss_you` or `cake` for future Plot 4 reads. `plot3_parn_call_completed` is a boolean and becomes true only after B's natural call completion. Branch event/player indices, pending queues and animation frames all stay in the same save object; there is no second Plot 3 save system.

Shared call code now selects the Techin or Parn configuration without creating a second phone UI. Techin's audio, subtitle data, timing, return destination and completion behavior are retained. The LINE list/notification helper handles Parn as well as Thanwa and S, restoring names after typing and keeping current previews/unread counts.

## Validation

See tests/README.md and tests/plot3.browser.cjs for repeatable routes. Each route runs through Plot 1, Plot 2, the original Plot 3 scenes, the intro animation, one branch and the common ending. Checks cover app switching during animation and replies, manual sending, immutable selection, no draft bubbles, existing breakup text, photo viewer, Instagram deduplication, correct dates, branch-specific phone access, early End/retry, speaker captions, natural audio ending, morning continuation, no Plot 4, no duplicate messages, and refresh reset. The range-aware local server supports audio seeking just as static hosting does.
