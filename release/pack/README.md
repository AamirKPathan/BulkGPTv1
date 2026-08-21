BulkGPT
=======

BulkGPT is a Chrome extension that puts a movable overlay on ChatGPT. This lets you delete or archive multiple conversations at once. It uses click and Shift+Click selection, which works on ChatGPT sites like chatgpt.com and chat.openai.com.

What it does
------------
- You can select chats by clicking them.
- It can select a whole range of chats if you click one and then Shift+Click another.
- The chats you select show up in the BulkGPT overlay.
- You can delete all the selected chats.
- You can also archive all the selected chats.
- The overlay panel can be moved around.
- It's built to be simple and doesn't need other software.

How it works
------------
BulkGPT watches for clicks on the chat list in ChatGPT's sidebar. When you click a chat, it gets added to a list. If you then Shift+Click another chat, BulkGPT selects all the chats between those two clicks.

The selected chats show up in the overlay. From there, you can delete or archive them all together.

How to select chats
------------------
- Click a chat to add it to the selection.
- Hold Shift and click another chat to select all the chats in between.
- Selected chats appear in the overlay.
- When you delete or archive, it applies to all the chats you've selected.

How to install
------------
Install BulkGPT by downloading the ZIP package from the demo website or by downloading the source from GitHub. Both methods use Chrome's Load unpacked button.

Option 1: Download from the demo website
1. Download `BulkGPT.zip` from the BulkGPT demo page:
   https://aamirkpathan.github.io/bulkgpt-demo/downloads/BulkGPT.zip

2. Extract the ZIP file.

3. Open the extracted folder. Inside it, there should be a `BulkGPT` folder with these files:
   - manifest.json
   - content.js
   - styles.css

4. Go to this address in Chrome:
   chrome://extensions

5. Turn on Developer mode.

6. Click Load unpacked.

7. Choose the `BulkGPT` folder that contains `manifest.json`.

8. Go to ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay should appear.

Option 2: Download from the GitHub repo
1. Download the source from GitHub:
   https://github.com/AamirKPathan/BulkGPTv1

2. Click Code, then Download ZIP.

3. Extract the ZIP file.

4. Open the extracted BulkGPT folder. It should have these files:
   - manifest.json
   - content.js
   - styles.css

5. Go to this address in Chrome:
   chrome://extensions

6. Turn on Developer mode.

7. Click Load unpacked.

8. Choose the extracted folder that contains `manifest.json`.

9. Go to ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay should appear.

If Chrome says the manifest file is missing, you selected the wrong folder. Go one folder deeper and choose the folder that directly contains `manifest.json`.

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
