BulkGPT
=======

BulkGPT is an open‑source Chrome extension that adds a draggable overlay to ChatGPT, allowing users to bulk delete or bulk archive conversations. The extension now uses a Ctrl+Click selection system that works reliably across all ChatGPT domains, including chatgpt.com and chat.openai.com.

Features
--------
- Ctrl+Click selection of multiple chats
- Automatic range selection (click → Ctrl+Click)
- Selected chats displayed inside the BulkGPT overlay
- Bulk delete selected chats
- Bulk archive selected chats
- Draggable overlay panel
- Lightweight, dependency‑free implementation

How It Works
------------
BulkGPT listens for clicks on ChatGPT’s sidebar items. When you click a chat, it is added to the selection list. When you Ctrl+Click another chat, BulkGPT selects everything between the two clicks.

Selected chats appear inside the overlay, where you can delete or archive them in bulk.

Selection Behavior
------------------
- **Click** a chat → adds it to the selection list  
- **Shift+Click** another chat → selects all chats in between  
- Selected chats are shown inside the overlay  
- Delete or archive actions apply to all selected chats  

Installation
------------
1. Download or clone the BulkGPT folder containing:
   - manifest.json
   - content.js
   - styles.css

2. Open Chrome and navigate to:
   chrome://extensions

3. Enable Developer Mode.

4. Click “Load unpacked”.

5. Select the BulkGPT folder.

6. Open ChatGPT (chatgpt.com or chat.openai.com). The BulkGPT overlay will appear automatically.

Usage
-----
Move the overlay:
Drag the header bar labeled “BulkGPT” to reposition the panel anywhere on the screen.

Select chats:
Click any chat in the sidebar to select it. Shift+Click another chat to select a range.

Delete selected chats:
Click the “Delete Selected” button.

Archive selected chats:
Click the “Archive Selected” button.

Project Structure
-----------------
bulkGPT/
  manifest.json     (Chrome extension manifest)
  content.js        (Injected script: UI, logic, selection system, API calls)
  styles.css        (Overlay styling)

Compatibility
-------------
BulkGPT works on:
- https://chatgpt.com
- https://chat.openai.com
- All conversation pages under /c/

Contributing
------------
Contributions, issues, and feature requests are welcome. Feel free to open a pull request or submit an issue.

License
-------
BulkGPT is released under an open-source license. You may use, modify, and distribute it freely.
