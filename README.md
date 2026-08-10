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
Install BulkGPT by downloading the `.crx` package or by downloading the source from GitHub and loading it as an unpacked extension.

Note: Chrome may reject self-hosted `.crx` files with `CRX_REQUIRED_PROOF_MISSING` on some systems unless the extension is distributed through a Chrome-approved channel. The `.crx` download is still provided below.

Option 1: Install the `.crx`
1. Download `BulkGPT.crx` from the GitHub release:
   https://github.com/AamirKPathan/BulkGPTv1/releases/download/v2.1/BulkGPT.crx

2. Go to this address in Chrome:
   chrome://extensions

3. Turn on Developer mode.

4. Drag `BulkGPT.crx` onto the Chrome extensions page and confirm the install.

5. Go to ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay should appear.

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

8. Choose the extracted BulkGPT folder.

9. Go to ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay should appear.

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
