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
    for (const chat of selectedChats) {
      await updateChat(chat.id, { is_visible: false });
    }
    alert("Deleted selected chats.");
    selectedChats = [];
    updateOverlay();
    updateSidebarHighlights();
  }

  async function archiveSelected() {
    for (const chat of selectedChats) {
      await updateChat(chat.id, { is_archived: true });
    }
    alert("Archived selected chats.");
    selectedChats = [];
    updateOverlay();
    updateSidebarHighlights();
  }

  async function updateChat(id, payload) {
    try {
      await fetch(`https://chat.openai.com/backend-api/conversations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error("Failed to update chat:", id, e);
    }
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
