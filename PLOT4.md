# Plot 4

Plot 4 is a dialogue-only extension of the existing shared story state, LINE renderer, contact list, input, queue and notifications. It adds no contacts, avatar assets, phone UI, shopping UI, task overlays or completion popups.

## Trigger and scenes

The shared story tick starts Plot 4 exactly once after Plot 3 commits its completion by sending 我不知道。. Existing completed saves also receive this transition when loaded. The first Thanwa reply is delivered three seconds later without navigating away from the current app. Scene 1/2 keep the game date inherited from the selected Plot 3 branch.

1. Thanwa's flower suggestion; each of Pheem's messages must be filled by clicking 点击输入回复 and sent manually.
2. S's work reminder and complete flower order through the existing secretary chat.
3. The clock becomes Tuesday, 30 June 2026, 14:26. S reports the refusal and the player completes the supplied reply sequence.
4. The first Thanwa message arrives five seconds after the secretary conversation finishes. Typing occupies the final three seconds of that wait.
5. The first Parn message arrives five seconds after Thanwa's final message. The existing Parn chat retains all historical and branch messages. The supplied last Parn sentence commits Plot 4 completion; there is no Plot 5 trigger.

All dialogue is in plot4-data.js. Each item in a turn is an independent bubble. Incoming turns type for three seconds and deliver consecutive bubbles one second apart. Multi-message player turns do not advance until every message is manually sent. Shared queue IDs prevent duplicates; leaving the app does not stop incoming messages. Wrong-contact input cannot send the active turn.

## State, date and refresh

The same `pheem.plot1.v1` save owns `plot4.scene`, `event`, `playerIndex`, `date`, `nodes`, and `completed`, plus orderCompleted and flowersReturned. Nodes include plot4_started, plot4_scene1_completed through plot4_scene5_completed, and plot4_completed. Plot 3's branch choice and all its content stay intact.

Per the user's clarification, refresh **retains** progress. Incoming queues, last app, pending player reply and the June 30 clock restore normally. No separate Plot 4 save or reset rule was added. Restoration now waits until all deferred app scripts are ready, fixing a discovered Instagram-view reload race.

## Avatars and existing UI

The unchanged shared LINE renderer obtains each incoming avatar directly from `#line-<contact-id> .line-avatar`. The only involved IDs are thanwa, secretary and parn. New and historical images therefore use the exact same source; there is no default secretary avatar or placeholder. Pheem's existing right-side green bubble has no avatar. List previews, unread counts and notifications use the same existing helpers; June 30 list timestamps display 14:26.

The original index.html markup/history and Facebook data are unchanged except for importing the new dialogue file. Existing dialogue files, original audio and image assets are unchanged.

## Validation

`tests/plot4.browser.cjs` runs the entire 94-bubble plot from each of the three preserved Plot 3 branch saves. It checks exact sequence, manual-only outgoing messages, disabled sending while waiting, the initial three-second delay, both five-second delays, one-second independent bubbles, all three avatars, four existing contacts only, historical Parn text, preserved branch data, background replies from Instagram/Photos/lock screen, correct notification destinations, June 30 date, in-flight refresh, final refresh without replay, and no Plot 5.

Updated Plot 3 tests additionally run Plot 1 → Plot 2 → each complete Plot 3 branch → the Plot 4 handoff. The persistence suite includes an Instagram app refresh regression for the deferred-script readiness fix.
