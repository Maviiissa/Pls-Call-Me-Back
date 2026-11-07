# Plot 7 — Final chapter

Plot 7 uses the existing `pheem.plot1.v1` browser save, LINE message queue, four existing contacts, image viewer, Photos album, Instagram profile and Facebook page. All earlier dialogue and image files remain unchanged. Refresh retains progress; there is no new reset/save system.

## Flow

1. The shared story tick sees `plot6.completed` and unlocks Plot 7 once. Photos immediately restores the existing five photos to **Parn ❤️**, retaining their order and first-photo cover. Nothing is added to the album.
2. Opening Instagram automatically inserts **Mine 😈** at the front of Pheem's profile. The existing older post remains. Opening the new post and successfully loading its actual image records the view; a failed image request does not advance the story.
3. After that view, Thanwa's first message arrives after 3 seconds. All supplied dialogue is in `plot7-data.js`. Each player text requires clicking the composer and then the send arrow. The two picture turns work the same way, using `📷 ring.jpg` and `📷 Haski.jpg` in the composer, then sending an actual image bubble with the existing enlargement viewer. NPC replies use the existing header typing state and 1-second bubble spacing.
4. After **加油吧大狗🤣**, Parn's existing LINE thread receives **Pheem，什么时候回家～** after 5 seconds. Players manually send all proposal messages. As explicitly confirmed by the user, Parn's final **一会儿见～** completes the proposal; no additional video, acceptance dialogue or proposal UI is invented.
5. The lock screen, home calendar and app status clocks advance to **30 October 2026**. The existing time, **20:36**, is retained because no wedding time was supplied. First opening either social app publishes two independent wedding posts together: Instagram **谢谢你爱我@ParnApsorn**, and the existing Pan Pastry-ne Facebook page **🧡**. Old Instagram posts and all four original Facebook posts remain.
6. Instagram's wedding detail image must load successfully; Facebook's wedding image must load and enter the visible feed area. After both posts have been viewed, returning to the unlocked home screen displays **THE END ❤️** below the apps. No further conversation is scheduled.

## Images required from the user

The four inline chat images were not available as downloadable attachment files in this workspace. Production references exactly these case-sensitive paths, without substituting other photos:

| File | Supplied image |
| --- | --- |
| `assets/PheemIns2.jpg` | Parn and Pheem embracing |
| `assets/ring.jpg` | Ring in its box |
| `assets/Haski.jpg` | Pheem wearing the husky costume |
| `assets/wedding.jpg` | The supplied wedding photograph |

Upload these original JPG files to `assets`. Tests intercept these four URLs with a clearly scoped test-only fixture; no fixture image is copied into the shipped assets. Failed image loads cannot mark a social post as viewed or trigger the final ending.

## Saved state

`s.plot7` records `phase`, `date`, `event`, `playerIndex`, `nodes`, `albumRestored`, `lovePublished`, `loveSeen`, `proposalCompleted`, `weddingUnlocked`, `weddingPublished`, `facebookPublished`, `igWeddingSeen`, `fbWeddingSeen`, and `completed`. Its phases are `love`, `thanwa`, `proposal`, `wedding`, `completed`.

Story nodes are `plot7_started`, `plot7_album_restored`, `plot7_love_posted`, `plot7_love_viewed`, `plot7_thanwa_completed`, `plot7_proposal_completed`, `plot7_wedding_published`, `plot7_instagram_wedding_viewed`, `plot7_facebook_wedding_viewed`, and `plot7_completed`. Persisted message IDs and post IDs prevent duplication. Queue deadlines survive app changes and refresh. Restore reapplies the album name, wedding date and Facebook post, and recovers missing story Instagram posts from the saved flags.

## Validation

`tests/plot7.browser.cjs` runs the complete chapter in Chromium with actual clicks for player sends and a controlled browser clock. It checks the five original photos/order/viewer, failed-image gating, exact supplied message order, duplicate-send protection, manual picture sends, existing avatar sources, notifications, typing headers, app switching, a mid-conversation refresh, the confirmed proposal completion point, date updates, independent wedding posts, both-view-plus-home ending, and reload without replay or duplicate posts/messages. It also verifies the pre-existing saved messages remain intact.

Earlier Plot 1–3 complete-route checks, all three Plot 4 branch handoffs, Plot 5, Plot 6 subtitle/incoming and full audio tests, and the browser persistence suite are run separately. The Plot 6 test now expects the authorized Plot 7 album unlock, with no automatic new LINE dialogue. A pre-existing Plot 2→3 test assertion accepts either side of the immediate automatic handoff rather than depending on a sub-200ms timing window.
