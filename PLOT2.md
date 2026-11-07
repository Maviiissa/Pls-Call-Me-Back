# Plot 2

Plot 2 shares the existing save/state machine in plot1.js. Dialogue is defined in plot2-data.js. Refresh and ordinary app navigation retain messages, order steps and pending replies through the shared browser-local save.

After the last Plot 1 reply, Thanwa waits three seconds, types in the LINE header for one second, then sends the three supplied bubbles one second apart. The player explicitly sends 嗯 and 买500份. Five seconds after the second reply, Techin sends his first Messages bubble; the Facebook card follows one second later. Messages had only a home icon and no existing contact/history implementation: its existing icon now opens a single Messages view with the Techin conversation. No Techin LINE contact or second Messages icon was created.

The link card uses the existing bakery avatar and opens the existing in-game Facebook page. The existing Message button opens the same bakery Messenger component and activates the order without sending anything. The home/lock date becomes Saturday, 27 June 2026, 14:12. The existing Messenger home icon can reopen this same conversation.

Each order reply must be filled and sent by the player. Three seconds after sending, Parn's typing label appears; it stays visible for three seconds before the first response. Additional bubbles follow one second apart. Responses continue in the background. The fourth player draft visibly displays and erases Phakinee and Pheem before permitting Peekinak。 to be sent. Leaving during the animation cancels it; reentering allows restarting the draft without advancing the step.

Story nodes are tracked in the shared state and plot2.nodes: plot2_started, plot2_thanwa_completed, plot2_techin_message_received, plot2_facebook_opened, plot2_messenger_started, plot2_order_completed, plot2_completed. All added messages have unique IDs. Last player message commits both order-completed and plot-completed nodes. Existing Facebook feed, photos, and historical LINE arrays remain unchanged.
