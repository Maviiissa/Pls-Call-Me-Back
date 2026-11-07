# Plot 3 — first two scenes

The final Plot 2 order message commits plot2_completed. The next story tick starts Plot 3 in the background and updates home, lock, calendar and app status clocks to Sunday, 28 June 2026, 15:34. No scene title, completion modal, or forced navigation appears.

Dialogue and the story post live in plot3-data.js. The existing state object owns plot3.scene, event and playerIndex; added messages reuse the shared LINE queue and save. Each incoming turn types in the contact-name header for three seconds, then delivers independent bubbles one second apart. Each outgoing bubble requires a composer click and a send click. Navigation retains the pending step and queued responses; the current test configuration still resets on refresh.

Scene 1 finishes only when the player sends 滚。. Before that, opening Instagram leaves the initial zero-post profile unchanged. Afterward, opening the existing Instagram app inserts the stable-ID post once: date 28 June 2026 and exact caption `Like 🍓like you.`. Three seconds after publication, Thanwa reacts through LINE without switching apps. Finishing Scene 2 with 知道了。 sets plot3.parnUnlocked=true and plot3_parn_unlocked. Parn's existing chat can be opened normally, but no new Parn dialogue has been invented; that awaits the next supplied scene.

## Required image uploads

- `assets/Cake.jpg`: the supplied stacked white cake boxes, shown as Thanwa's first LINE image, with the existing full-image viewer.
- `assets/PheemInsPost1.jpg`: the supplied pink macaron, used as the Instagram post.

These two chat previews were not provided as downloadable files in the execution environment; the code paths are ready, but the actual images must be uploaded to assets with the exact case-sensitive names. No substitute photos were added. Pheem's previously uploaded assets/pheemins.jpg is retained.

Nodes: plot3_started, plot3_scene1_completed, plot3_instagram_posted, plot3_parn_unlocked. The final node marks the end of the currently supplied segment, not an invented conclusion to Plot 3. Prior history arrays, Facebook feed and order messages are unchanged.
