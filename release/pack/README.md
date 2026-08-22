# BulkGPT

BulkGPT is a chrome extension that improves qol on ChatGPT.

## Features

- Click chats to select them
- Shift + Click to select a full range
- Selected Chats appear in a floating overlay
- Delete or archive all selected cahts at once.
- Drag the overlay anywhere on your screen
- No extra software is required.

## How It works

BulkGPT listens for clicks on ChatGPT's sidebar.

## Selecting Chats

- Click a chat to select it
- Shift + Click another chat t o select everything in between
- Selected Chats appear in the overlay
- Delete or archive applies to all selected chats.

## Installation

You can install BulkGPT using either the `.zip` or `.crx`

Download (ZIP or CRX):
https://github.com/AamirKPathan/BulkGPTv1/releases/tag/v2.1

### Option 1: Install using the ZIP file

1. Download `BulkGPT.zip` from the release page
2. Extract the ZIP.
3. Open the extracted folder
    - manifest.json
    - content.js
    - styles.css
4. Open Chrome and go to `chrome://extensions`
5. Enable Developer Mode
6. Click Load Unpacked.
7. Select The `BulkGPT` folder.
8. Open ChatGPT

### Option 2: Install using the CRX file

1. Download `BulkGPT.crx` from the release page.
2. Open Chrome and go to:
   `chrome://extensions`
3. Enable **Developer mode**.
4. Drag and drop the `BulkGPT.crx` file into the extensions page.
5. Open ChatGPT and the overlay should appear.

**If Chrome says the manifest file is missing:**  
You selected the wrong folder. Choose the folder that directly contains `manifest.json`.

## Using BulkGPT

### Moving the overlay
Drag the header bar (the one labeled “BulkGPT”) to move the panel anywhere on your screen.

### Selecting chats
Click to select one chat. Shift+Click another to select a full block.

### Deleting selected chats
Click **Delete Selected**.

### Archiving selected chats
Click **Archive Selected**.

## Supported Sites

BulkGPT works on:
- https://chatgpt.com
- https://chat.openai.com
- Any conversation page starting with `/c/`