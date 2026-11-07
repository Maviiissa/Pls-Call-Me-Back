# Plot 5

Plot 5 is a LINE-only extension of the existing shared story save, message queue, composer, renderer, contact list and notification system. Plot 5 itself creates no new app, contact, avatar or call; the separately implemented Plot 6 reads its completion.

## Pre-development findings

Plot 4 sets plot4.completed only after its final Parn bubble is added, recording plot4_completed in its node list. Existing contact IDs are thanwa, parn, dad and secretary; Father uses the existing dad thread, not Messages. Messages retains the existing Techin conversation. The composer already supports 点击输入回复 followed by manual Send. Notifications, typing headers, unread counts and avatars come from the shared LINE helpers. Dates are rendered into the existing lock/home calendar and app status bars; the browser save retains progress across refresh.

## Dialogue interpretation

The supplied monologue is labelled 19 lines in several instructions but actually enumerates 15. All 15 actual supplied lines are used exactly and separately; no four additional lines were invented. Scene 1's last line follows the complete dialogue list, 那你还是去问问你爸吧。, rather than the differently worded completion-condition quotation. The event engine completes that scene after this listed last line.

## Flow

1. The final Plot 4 Parn bubble completes Plot 4 and enables Plot 5 once. The date becomes Wednesday, 1 July 2026, 10:18; Thanwa's first bubble arrives three seconds later, followed by the second one second later. App navigation is not forced.
2. After Thanwa's final listed sentence, a five-second deadline unlocks the first player preset in the existing Dad thread. There is no automatic player message or new Dad SMS contact. All father replies use the supplied wording, including the final three independent acceptance bubbles. 谢谢您，爸。 completes the scene.
3. Three seconds later, the clock becomes 1 July 2026, 20:36 and the existing Parn thread offers the first monologue preset. The player fills and sends all 15 bubbles individually. Parn has no incoming turn, typing interval, emoji, message or call. The final 回电话给我，好不好？ commits completion and remains visible at the bottom of Parn's chat. There is no completion popup. The separate Plot 6 controller now starts its five-second incoming-call deadline after this completion.

Each incoming reply types for approximately three seconds and uses one-second spacing between bubbles. Consecutive player lines must all be sent before the next reply can be queued. Each message has a stable unique ID. Timed scene unlocks are saved absolute deadlines and execute only once.

## State

The existing pheem.plot1.v1 save owns plot5.scene, event, playerIndex, readyAt, date, nodes, completed and parnMessageIndex. The latter retains the number of successfully sent monologue messages (0–15), including after completion, and is the equivalent of the suggested plot5_parn_message_index.

Nodes: plot5_started, plot5_thanwa_completed, plot5_father_chat_started, plot5_father_chat_completed, plot5_parn_monologue_started and plot5_completed. Plot 6 reads plot5.completed and its completion timestamp; Plot 5 adds no incoming message or call of its own.

## Existing UI and history

All incoming avatars still read the exact existing source from #line-<contact-id> .line-avatar. Dad was added to the shared preview/unread update list so his new replies and notifications update his existing contact correctly. Pheem retains the right-side green bubble with no avatar. All original HTML history, previous plot dialogue, Facebook/Instagram posts and audio assets are unchanged except the new data-script import. Old branch controls and Parn's old call entry remain disabled in later plots.

July 1 dates restore before the older plot dates. Browser refresh, app changes and lock/unlock retain the current step and messages. There is no separate save or reset mechanism.

## Validation

The Plot 5 browser test starts before Plot 4's final message, verifies that Plot 5 cannot start early, then plays all 66 new bubbles. It checks exact father and 15-line Parn text, all used avatars, four existing contacts only, correct threads, manual-only sending, response and scene delays, Dad notifications while on Instagram, saved mid-scene replies, Messages navigation, lock/unlock and monologue refresh at lines 4 and 10. After the final message it waits, reloads and waits again, asserting no new LINE messages or typing, no duplicate IDs, and only the newly supplied one-time Plot 6 incoming call.

Plot 4 tests retain all 94 old bubbles for all three prior branches and now verify the one-time Plot 5 handoff. Plot 1–3 route and shared persistence regressions also remain available under tests/README.md.
