(function () {

  let selectedChats = [];
  let lastClickedIndex = null;

  const observer = new MutationObserver(() => {
    if (document.body && !document.getElementById("bulkGPTOverlay")) {
      observer.disconnect();
      initBulkGPT();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  function initBulkGPT() {
    setTimeout(() => {
      createOverlay();
      hookSidebarClicks();
    }, 800);
  }

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "bulkGPTOverlay";

    overlay.innerHTML = `
      <div id="bulkGPTHeader">
        <h3>BulkGPT</h3>
        <div id="bulkGPTIcon" title="Minimize">
          ${trashcanSVG()}
        </div>
      </div>

      <div id="bulkGPTBody">
        <div id="instructions">
          Click chats to select them. Hold <b>SHIFT</b> and click to select a range.
        </div>

        <div id="selectedList"></div>
        <div id="bulkGPTStatus" role="status">Ready.</div>

        <button id="deleteBtn">Delete Selected</button>
        <button id="archiveBtn">Archive Selected</button>
      </div>
    `;

    document.body.appendChild(overlay);

    setupDrag(overlay);

    document.getElementById("deleteBtn").onclick = deleteSelected;
    document.getElementById("archiveBtn").onclick = archiveSelected;

    document.getElementById("bulkGPTIcon").onclick = () => {
      overlay.classList.toggle("minimized");
    };
  }

  function trashcanSVG() {
    return `
      <svg viewBox="0 0 24 24">
        <rect x="7" y="8" width="10" height="11" rx="2" fill="#ffa500"/>
        <rect x="9" y="10" width="2" height="7" fill="#1a1a1a"/>
        <rect x="13" y="10" width="2" height="7" fill="#1a1a1a"/>
        <rect x="6" y="6" width="12" height="2" rx="1" fill="#ffd700"/>
        <rect x="9" y="4" width="6" height="2" rx="1" fill="#ffa500"/>
      </svg>
    `;
  }

  function hookSidebarClicks() {
    document.addEventListener("click", (e) => {
      const chat = e.target.closest('a[data-sidebar-item="true"]');
      if (!chat) return;

      const href = chat.getAttribute("href") || "";
      if (!href.includes("/c/")) return;

      const id = href.split("/c/")[1].split("?")[0];
      const titleEl = chat.querySelector("span.inline-block.min-w-max");
      const title = titleEl ? titleEl.innerText.trim() : "Untitled Chat";

      const allChats = [...document.querySelectorAll('#history a[data-sidebar-item="true"]')]
        .filter(a => a.getAttribute("href")?.includes("/c/"));

      const index = allChats.indexOf(chat);

      if (e.shiftKey && lastClickedIndex !== null) {
        const [start, end] = [lastClickedIndex, index].sort((a, b) => a - b);
        for (let i = start; i <= end; i++) {
          addChat(allChats[i]);
        }
      } else {
        addChat(chat);
        lastClickedIndex = index;
      }

      updateOverlay();
      updateSidebarHighlights();
    });
  }

  function addChat(chat) {
    const href = chat.getAttribute("href");
    const id = href.split("/c/")[1].split("?")[0];
    const titleEl = chat.querySelector("span.inline-block.min-w-max");
    const title = titleEl ? titleEl.innerText.trim() : "Untitled Chat";

    if (!selectedChats.some(c => c.id === id)) {
      selectedChats.push({ id, title });
    }
  }

  function updateOverlay() {
    const list = document.getElementById("selectedList");
    list.innerHTML = "";

    selectedChats.forEach(c => {
      const div = document.createElement("div");
      div.className = "selected-item";
      div.textContent = c.title;
      list.appendChild(div);
    });
  }

  function updateSidebarHighlights() {
    const allChats = [...document.querySelectorAll('#history a[data-sidebar-item="true"]')]
      .filter(a => a.getAttribute("href")?.includes("/c/"));

    allChats.forEach(chat => chat.classList.remove("sidebar-selected"));

    selectedChats.forEach(sel => {
      const match = allChats.find(a => a.getAttribute("href").includes(sel.id));
      if (match) match.classList.add("sidebar-selected");
    });
  }

  async function deleteSelected() {
    if (!selectedChats.length) {
      alert("No chats selected.");
      return;
    }

    let successCount = 0;
    const failedChats = [];

    for (const chat of selectedChats) {
      setStatus(`Deleting: ${chat.title}`);
      const ok = await updateChat(chat.id, "delete");
      if (ok) {
        successCount++;
      } else {
        failedChats.push(chat);
      }
    }

    alert(`Delete complete. Success: ${successCount}, Failed: ${failedChats.length}.`);
    setStatus(`Delete finished: ${successCount} succeeded, ${failedChats.length} failed.`);
    selectedChats = failedChats;
    updateOverlay();
    updateSidebarHighlights();
  }

  async function archiveSelected() {
    if (!selectedChats.length) {
      alert("No chats selected.");
      return;
    }

    let successCount = 0;
    const failedChats = [];

    for (const chat of selectedChats) {
      setStatus(`Archiving: ${chat.title}`);
      const ok = await updateChat(chat.id, "archive");
      if (ok) {
        successCount++;
      } else {
        failedChats.push(chat);
      }
    }

    alert(`Archive complete. Success: ${successCount}, Failed: ${failedChats.length}.`);
    setStatus(`Archive finished: ${successCount} succeeded, ${failedChats.length} failed.`);
    selectedChats = failedChats;
    updateOverlay();
    updateSidebarHighlights();
  }

  async function updateChat(id, action) {
    const chat = findChatById(id);
    if (!chat) {
      setStatus(`Could not find chat ${id} in the sidebar.`);
      return false;
    }

    const menuButton = findOptionsButton(chat);
    if (!menuButton) {
      setStatus(`Could not find options menu for chat ${id}.`);
      return false;
    }

    menuButton.click();
    const menuItem = await waitForElement(() => findMenuItem(action));
    if (!menuItem) {
      setStatus(`Could not find ${action} action for chat ${id}.`);
      return false;
    }

    menuItem.click();

    if (action === "delete") {
      const confirmButton = await waitForElement(() => findDeleteConfirmation());
      if (!confirmButton) {
        setStatus(`Delete confirmation did not appear for chat ${id}.`);
        return false;
      }
      confirmButton.click();
    }

    setStatus(`${action === "delete" ? "Deleted" : "Archived"} ${id} using ChatGPT's native action.`);
    await wait(300);
    return true;
  }

  function findChatById(id) {
    return [...document.querySelectorAll('#history a[data-sidebar-item="true"]')]
      .find(chat => chat.getAttribute("href")?.includes(`/c/${id}`));
  }

  function findOptionsButton(chat) {
    let container = chat;
    for (let level = 0; level < 4 && container; level++, container = container.parentElement) {
      const button = [...container.querySelectorAll("button")].find(candidate => {
        const label = `${candidate.getAttribute("aria-label") || ""} ${candidate.getAttribute("title") || ""}`;
        return /more|option|menu/i.test(label);
      });
      if (button) return button;
    }
    return null;
  }

  function findMenuItem(action) {
    const name = action === "delete" ? "delete" : "archive";
    return [...document.querySelectorAll('[role="menu"] button, [role="menuitem"], button')]
      .find(item => item.textContent.trim().toLowerCase() === name);
  }

  function findDeleteConfirmation() {
    return [...document.querySelectorAll('[role="dialog"] button, button')]
      .find(button => button.textContent.trim().toLowerCase() === "delete");
  }

  async function waitForElement(getElement, timeout = 2000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const element = getElement();
      if (element) return element;
      await wait(100);
    }
    return null;
  }

  function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  function setStatus(message) {
    const status = document.getElementById("bulkGPTStatus");
    if (status) status.textContent = message;
  }

  function setupDrag(overlay) {
    const header = document.getElementById("bulkGPTHeader");

    let dragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener("mousedown", (e) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = overlay.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });

    function onMove(e) {
      if (!dragging) return;
      overlay.style.left = `${startLeft + (e.clientX - startX)}px`;
      overlay.style.top = `${startTop + (e.clientY - startY)}px`;
    }

    function onUp() {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
  }

})();
