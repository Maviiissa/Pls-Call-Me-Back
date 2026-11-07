# Pheem Instagram

The existing Instagram home-screen icon opens Pheem's dark profile. Initial data matches the supplied profile: Pheem🖤, Phakinee Traisuwetthiwat, You’re too good to be true., zero posts, one follower and 24 following. Phone time follows the story clock rather than the screenshot's device time.

Upload the supplied black-and-white portrait as `assets/pheemins.jpg` (actual JPG format, original resolution). The chat image was not supplied to the execution environment as a downloadable file, so the repository does not contain that portrait yet. A neutral P appears if the image cannot load; no other person's portrait is substituted. The main and bottom navigation avatars use this same path.

Profile data and initial posts are in instagram-data.js. Each post has a stable id, image path, caption, date and optional likes. For future story updates, call `PheemInstagram.addPost({id:'ig-1',image:'assets/example.jpg',caption:'...',date:'27 Jun 2026',likes:0})`. Duplicate IDs are ignored. The post count and grid update immediately; clicking a tile opens its detail. New posts stay across app navigation and reset on a full refresh under the current test behavior.

Posts/Reels/Tagged tabs, profile editing for the current session, sharing profile text to the clipboard, returning to the phone home screen, and story notifications are connected. Create post and unused social navigation controls are disabled until supported by a future story; they do not fabricate posts or open external services. Facebook/Messenger and existing story dialogue are unchanged.
