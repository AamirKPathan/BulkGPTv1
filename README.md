BulkGPT
=======

BulkGPT is a Chrome extension that puts a movable overlay on ChatGPT. This lets you delete or archive multiple conversations at once. It uses a Ctrl+Click method to select chats, which works on all ChatGPT sites like chatgpt.com and chat.openai.com.

What it does
------------
- You can select many chats by holding Ctrl and clicking them.
- It can select a whole range of chats if you click one and then Ctrl+Click another.
- The chats you select show up in the BulkGPT overlay.
- You can delete all the selected chats.
- You can also archive all the selected chats.
- The overlay panel can be moved around.
- It's built to be simple and doesn't need other software.

How it works
------------
BulkGPT watches for clicks on the chat list in ChatGPT's sidebar. When you click a chat, it gets added to a list. If you then Ctrl+Click another chat, BulkGPT selects all the chats between those two clicks.

The selected chats show up in the overlay. From there, you can delete or archive them all together.

How to select chats
------------------
- Click a chat to add it to the selection.
- Hold Shift and click another chat to select all the chats in between.
- Selected chats appear in the overlay.
- When you delete or archive, it applies to all the chats you've selected.

How to install
------------
1. Get the BulkGPT folder. It should have these files:
   - manifest.json
   - content.js
   - styles.css

2. Go to this address in Chrome:
   chrome://extensions

3. Turn on Developer mode.

4. Click Load unpacked.

5. Choose the BulkGPT folder.

6. Go to ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay should appear.

How to use it
-----
Moving the overlay:
You can drag the header bar that says BulkGPT to put the panel wherever you want on the screen.

Selecting chats:
Click a chat in the sidebar to select it. Hold Shift and click another chat to select a group.

Deleting selected chats:
Click the Delete Selected button.

Archiving selected chats:
Click the Archive Selected button.

Project files
-----------------
bulkGPT/
  manifest.json     (Chrome extension info)
  content.js        (The main script: shows the interface, handles logic, selection, and communication with ChatGPT)
  styles.css        (How the overlay looks)

Works with
-------------
BulkGPT works on:
- https://chatgpt.com
- https://chat.openai.com
- All conversation pages that start with /c/