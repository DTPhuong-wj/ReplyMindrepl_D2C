/**
 * @file app.js
 * @description Điều phối tương tác giao diện cho Interactive Prototype ReplyMind (Vanilla JS).
 */

(function () {
  const data = window.REPLYMIND_DATA;
  if (!data) {
    console.error("Dữ liệu mock-data.js chưa được tải!");
    return;
  }

  // State ứng dụng
  let currentConvId = "conv_001";
  let currentFilter = "ALL";
  let searchQuery = "";

  // DOM Elements
  const conversationListEl = document.getElementById("conversationList");
  const chatTimelineEl = document.getElementById("chatTimeline");
  const composerTextarea = document.getElementById("composerTextarea");
  const searchInput = document.getElementById("searchInput");
  const toastContainer = document.getElementById("toastContainer");

  // Khởi tạo ứng dụng
  function init() {
    renderUserHeader();
    renderConversationList();
    loadConversation(currentConvId);
    setupKeyboardShortcuts();
    renderBrandToneModal();
    renderKBArticlesModal();
    renderDashboardModal();
    renderRoleSwitcherModal();
  }

  // 1. Cập nhật thông tin Header
  function renderUserHeader() {
    const user = data.currentUser;
    document.getElementById("headerUserAvatar").innerText = user.avatar;
    document.getElementById("headerUserName").innerText = user.name;
    document.getElementById("headerUserRole").innerText = `${user.role === "AGENT" ? "Agent Hỗ trợ" : "Giám sát viên (Supervisor)"} (${user.id})`;
  }

  // 2. Render danh sách hội thoại Cột 1
  function renderConversationList() {
    conversationListEl.innerHTML = "";

    const filtered = data.conversations.filter(conv => {
      // Lọc theo Filter Tab
      let passFilter = true;
      if (currentFilter === "URGENT") passFilter = conv.priority === "URGENT";
      if (currentFilter === "UNHANDLED") passFilter = conv.status === "UNHANDLED";
      if (currentFilter === "WAITING") passFilter = conv.status === "WAITING";

      // Lọc theo Tìm kiếm
      let passSearch = true;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        passSearch = conv.customerName.toLowerCase().includes(q) ||
                     conv.orderId.toLowerCase().includes(q) ||
                     conv.customerEmail.toLowerCase().includes(q);
      }

      return passFilter && passSearch;
    });

    if (filtered.length === 0) {
      conversationListEl.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted); font-size: 12px;">
          Không tìm thấy hội thoại phù hợp.
        </div>
      `;
      return;
    }

    filtered.forEach(conv => {
      const item = document.createElement("div");
      const isUrgent = conv.priority === "URGENT";
      const isActive = conv.id === currentConvId;

      item.className = `ticket-item ${isUrgent ? "is-urgent" : ""} ${isActive ? "active" : ""}`;
      item.onclick = () => selectConversation(conv.id);

      const lastMsg = conv.messages[conv.messages.length - 1];
      const previewText = lastMsg ? lastMsg.text : conv.productSummary;

      let priorityClass = "tag-low";
      if (conv.priority === "URGENT") priorityClass = "tag-urgent";
      if (conv.priority === "HIGH") priorityClass = "tag-high";
      if (conv.priority === "MEDIUM") priorityClass = "tag-medium";

      // Biểu tượng cảm xúc rút gọn tinh tế, tránh rối mắt
      let sentimentEmoji = "😐";
      if (conv.sentiment === "NEGATIVE") sentimentEmoji = "😡";
      if (conv.sentiment === "POSITIVE") sentimentEmoji = "😊";
      if (conv.priority === "HIGH" && conv.sentiment === "NEGATIVE") sentimentEmoji = "🙁";

      item.innerHTML = `
        <div class="ticket-item-header">
          <span class="ticket-item-title">${conv.customerName}</span>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 11px;" title="${conv.sentimentLabel}">${sentimentEmoji}</span>
            <span class="ticket-item-time">${conv.timeAgo}</span>
          </div>
        </div>
        <div class="ticket-item-preview">${previewText}</div>
        <div class="ticket-item-tags">
          <span class="tag-badge ${priorityClass}">${conv.priority}</span>
          <span class="tag-badge tag-intent">${conv.intent}</span>
        </div>
      `;

      conversationListEl.appendChild(item);
    });
  }

  // 3. Chọn và nạp hội thoại chi tiết
  function selectConversation(convId) {
    currentConvId = convId;
    renderConversationList();
    loadConversation(convId);
  }

  function loadConversation(convId) {
    const conv = data.conversations.find(c => c.id === convId);
    if (!conv) return;

    // Header Cột 2
    document.getElementById("chatCustomerAvatar").innerText = conv.customerName.split(" ").map(n => n[0]).slice(-2).join("");
    document.getElementById("chatCustomerName").innerText = conv.customerName;
    const badgeEl = document.getElementById("chatOrderBadge");
    badgeEl.innerText = conv.orderId;
    badgeEl.className = `tag-badge ${conv.priority === "URGENT" ? "tag-urgent" : "tag-medium"}`;
    document.getElementById("chatProductSummary").innerText = conv.productSummary;

    // Timeline Cột 2 với hiệu ứng fade-in mượt mà
    chatTimelineEl.classList.remove("fade-in");
    void chatTimelineEl.offsetWidth; // Force reflow trigger animation
    chatTimelineEl.classList.add("fade-in");
    chatTimelineEl.innerHTML = `
      <div class="date-divider">
        <span>Phiên hỗ trợ hôm nay</span>
      </div>
    `;

    conv.messages.forEach(msg => {
      const isAgent = msg.sender === "agent";
      const row = document.createElement("div");
      row.className = `message-row ${isAgent ? "is-agent" : ""}`;

      const avatarText = isAgent ? "Đ" : (msg.senderName ? msg.senderName.split(" ").map(n => n[0]).slice(-2).join("") : "KH");
      const bubbleClass = isAgent ? "agent" : (msg.isUrgentWarning ? "customer urgent-warning" : "customer");

      row.innerHTML = `
        <div class="msg-avatar ${isAgent ? "agent" : "customer"}">${avatarText}</div>
        <div>
          <div class="msg-bubble ${bubbleClass}">
            ${msg.text}
          </div>
          <div class="msg-meta ${msg.isUrgentWarning ? "urgent" : ""}">
            ${msg.time} ${msg.isUrgentWarning ? "• Khách hàng đang chờ phản hồi (Khẩn cấp)" : "• Đã gửi"}
          </div>
        </div>
      `;

      chatTimelineEl.appendChild(row);
    });

    chatTimelineEl.scrollTop = chatTimelineEl.scrollHeight;

    // Sidebar AI Cột 3
    const ai = conv.aiAnalysis;
    document.getElementById("aiConfidenceBadge").innerText = `Độ tin cậy: ${Math.round(ai.triage.confidenceScore * 100)}%`;
    document.getElementById("aiIntentValue").innerText = ai.triage.intent;
    document.getElementById("aiSentimentValue").innerText = ai.triage.sentiment;
    document.getElementById("aiPriorityValue").innerText = `${ai.triage.priority} (Mức ${ai.triage.priority === "URGENT" ? "4/4" : "Chuẩn"})`;
    document.getElementById("aiReasonValue").innerText = `"${ai.triage.reason}"`;

    // RAG F03
    document.getElementById("aiRagMatchBadge").innerText = `Khớp ${ai.rag.matchScore}%`;
    document.getElementById("aiRagDocTitle").innerText = ai.rag.docTitle;
    document.getElementById("aiRagCitation").innerText = ai.rag.citation;

    // Draft F04
    document.getElementById("aiDraftToneBadge").innerText = `${ai.draft.tone}`;
    document.getElementById("aiDraftContent").innerText = ai.draft.text;

    // Feedback F07
    updateFeedbackButtons(ai.feedback);
  }

  // 4. Hành động 1-Click: Chèn Bản Nháp AI vào Composer
  window.insertDraftToComposer = function () {
    const conv = data.conversations.find(c => c.id === currentConvId);
    if (!conv) return;

    composerTextarea.value = conv.aiAnalysis.draft.text;
    composerTextarea.focus();
    showToast("✨ Đã chèn bản nháp AI vào ô soạn thảo! Bạn có thể chỉnh sửa trước khi gửi.", "info");
  };

  // 5. Gửi phản hồi tin nhắn
  window.sendReply = function () {
    const text = composerTextarea.value.trim();
    if (!text) {
      showToast("Vui lòng nhập nội dung câu trả lời trước khi gửi!", "info");
      composerTextarea.focus();
      return;
    }

    const conv = data.conversations.find(c => c.id === currentConvId);
    if (!conv) return;

    const newMsg = {
      id: "m_agent_" + Date.now(),
      sender: "agent",
      senderName: data.currentUser.name,
      time: "Vừa xong",
      text: text
    };

    conv.messages.push(newMsg);
    conv.status = "WAITING"; // Chuyển sang chờ khách phản hồi
    conv.timeAgo = "Vừa xong";

    composerTextarea.value = "";
    loadConversation(currentConvId);
    renderConversationList();

    showToast("✓ Đã gửi phản hồi thành công tới khách hàng!", "success");
  };

  // 6. Đánh dấu đã giải quyết hội thoại
  window.resolveCurrentTicket = function () {
    const conv = data.conversations.find(c => c.id === currentConvId);
    if (!conv) return;

    conv.status = "RESOLVED";
    renderConversationList();
    showToast(`✓ Đã đánh dấu giải quyết xong hội thoại ${conv.orderId}!`, "success");
  };

  // 7. Đánh giá chất lượng bản nháp AI (Feedback F07)
  window.submitFeedback = function (type) {
    const conv = data.conversations.find(c => c.id === currentConvId);
    if (!conv) return;

    conv.aiAnalysis.feedback = type;
    updateFeedbackButtons(type);

    const label = type === "HELPFUL" ? "Hữu ích" : "Chưa tốt";
    showToast(`Đã ghi nhận đánh giá "${label}" cho bản nháp AI này!`, "success");
  };

  function updateFeedbackButtons(currentFeedback) {
    const btnHelpful = document.getElementById("btnFeedbackHelpful");
    const btnPoor = document.getElementById("btnFeedbackPoor");

    btnHelpful.className = `btn-feedback ${currentFeedback === "HELPFUL" ? "active" : ""}`;
    btnPoor.className = `btn-feedback ${currentFeedback === "POOR" ? "active" : ""}`;
  }

  // 8. Bộ lọc trạng thái Ticket
  window.setFilter = function (filter) {
    currentFilter = filter;

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if (filter === "ALL") document.getElementById("filterAll").classList.add("active");
    if (filter === "URGENT") document.getElementById("filterUrgent").classList.add("active");
    if (filter === "UNHANDLED") document.getElementById("filterUnhandled").classList.add("active");
    if (filter === "WAITING") document.getElementById("filterWaiting").classList.add("active");

    renderConversationList();
  };

  // 9. Tìm kiếm hội thoại
  window.handleSearch = function (q) {
    searchQuery = q;
    renderConversationList();
  };

  // 10. Điều hướng Main Tab & Mở Modals
  window.switchMainTab = function (tab) {
    document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
    closeAllModals();

    if (tab === "workspace") {
      document.getElementById("tabWorkspace").classList.add("active");
    } else if (tab === "kb") {
      document.getElementById("tabKB").classList.add("active");
      document.getElementById("modalKB").classList.add("active");
    } else if (tab === "tone") {
      document.getElementById("tabTone").classList.add("active");
      document.getElementById("modalTone").classList.add("active");
    } else if (tab === "dashboard") {
      document.getElementById("tabDashboard").classList.add("active");
      document.getElementById("modalDashboard").classList.add("active");
    }
  };

  window.closeAllModals = function () {
    document.querySelectorAll(".view-overlay").forEach(m => m.classList.remove("active"));
    document.getElementById("tabWorkspace").classList.add("active");
  };

  window.openRoleModal = function () {
    document.getElementById("modalRole").classList.add("active");
  };

  // 11. Render nội dung các Modal
  function renderKBArticlesModal() {
    const listEl = document.getElementById("kbArticlesList");
    listEl.innerHTML = "";

    data.kbArticles.forEach(art => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.padding = "14px";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${art.title}</h4>
          <span class="tag-badge tag-intent">${art.category}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">${art.summary}</p>
        <span style="font-size: 10px; color: var(--text-muted);">Cập nhật lần cuối: ${art.updatedAt}</span>
      `;
      listEl.appendChild(card);
    });
  }

  window.filterKBArticles = function (q) {
    const listEl = document.getElementById("kbArticlesList");
    const query = q.toLowerCase();
    const filtered = data.kbArticles.filter(a => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query));

    listEl.innerHTML = "";
    filtered.forEach(art => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.padding = "14px";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${art.title}</h4>
          <span class="tag-badge tag-intent">${art.category}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">${art.summary}</p>
        <span style="font-size: 10px; color: var(--text-muted);">Cập nhật lần cuối: ${art.updatedAt}</span>
      `;
      listEl.appendChild(card);
    });
  };

  function renderBrandToneModal() {
    const listEl = document.getElementById("brandToneOptionsList");
    listEl.innerHTML = "";

    data.brandTones.options.forEach(opt => {
      const isSelected = opt.id === data.brandTones.current;
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.cssText = `padding: 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; border: ${isSelected ? "2px solid var(--brand-primary)" : "1px solid var(--border-subtle)"};`;
      card.onclick = () => selectBrandTone(opt.id);

      card.innerHTML = `
        <div>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 3px;">
            ${opt.name} ${isSelected ? "✓ (Đang chọn)" : ""}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary);">${opt.description}</div>
        </div>
        <input type="radio" name="brandTone" ${isSelected ? "checked" : ""} style="accent-color: var(--brand-primary); cursor: pointer;">
      `;
      listEl.appendChild(card);
    });
  }

  function selectBrandTone(toneId) {
    data.brandTones.current = toneId;
    renderBrandToneModal();
    showToast(`Đã cập nhật Brand Tone hệ thống sang: ${toneId}`, "success");
  }

  function renderDashboardModal() {
    const intentList = document.getElementById("dashboardIntentList");
    intentList.innerHTML = "";

    data.dashboardStats.intentDistribution.forEach(item => {
      const row = document.createElement("div");
      row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 12px;";
      row.innerHTML = `
        <span style="font-weight: 600; color: var(--text-primary);">${item.label}</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: var(--text-muted); font-size: 11px;">${item.count} hội thoại</span>
          <span class="tag-badge tag-intent" style="font-weight: 700;">${item.percentage}</span>
        </div>
      `;
      intentList.appendChild(row);
    });
  }

  function renderRoleSwitcherModal() {
    const roleList = document.getElementById("roleUserList");
    roleList.innerHTML = "";

    data.availableUsers.forEach(u => {
      const isCurrent = u.id === data.currentUser.id;
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.cssText = `padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 12px; border: ${isCurrent ? "2px solid var(--brand-primary)" : "1px solid var(--border-subtle)"};`;
      card.onclick = () => switchUserRole(u.id);

      card.innerHTML = `
        <div class="user-avatar" style="width: 34px; height: 34px; font-size: 14px;">${u.avatar}</div>
        <div style="flex: 1;">
          <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${u.name} ${isCurrent ? "(Hiện tại)" : ""}</div>
          <div style="font-size: 11px; color: var(--brand-primary);">${u.role === "AGENT" ? "Agent Hỗ Trợ Khách Hàng" : "Giám Sát Viên (Supervisor)"}</div>
        </div>
      `;
      roleList.appendChild(card);
    });
  }

  function switchUserRole(userId) {
    const user = data.availableUsers.find(u => u.id === userId);
    if (!user) return;

    data.currentUser = user;
    renderUserHeader();
    renderRoleSwitcherModal();
    closeAllModals();
    showToast(`Đã chuyển đổi sang tài khoản: ${user.name} (${user.role})`, "success");
  }

  // 12. Phím tắt bàn phím (Keyboard Ergonomics)
  function setupKeyboardShortcuts() {
    window.addEventListener("keydown", function (e) {
      // Ctrl + Enter: Gửi tin nhắn
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        window.sendReply();
      }

      // Alt + I: Chèn bản nháp AI 1-Click
      if (e.altKey && (e.key === "i" || e.key === "I")) {
        e.preventDefault();
        window.insertDraftToComposer();
      }

      // Ctrl + K: Tìm kiếm hội thoại
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }

      // Esc: Đóng các modal
      if (e.key === "Escape") {
        window.closeAllModals();
      }
    });
  }

  // 13. Hiển thị Toast Notification
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Chạy khởi tạo khi trang nạp xong
  document.addEventListener("DOMContentLoaded", init);
})();

