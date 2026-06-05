(function () {
  const SUB_NAV_ITEMS = [
    { label: "トップ", path: "index.html" },
    { label: "口コミ一覧", path: "reviews.html" },
    { label: "Q&A", path: "faq.html" },
    { label: "問い合わせ", path: "contact.html" },
  ];

  function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }

  function getUserName() {
    return localStorage.getItem("userName") || "ユーザー";
  }

  function hasUnlockedReviews() {
    return localStorage.getItem("reviewsUnlocked") === "true";
  }

  function getCurrentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function showToast(message, type = "success") {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  /**
   * ロゴの差し替え方法:
   * 1. images/ フォルダに logo.png や logo.svg を置く
   * 2. imageSrc を "images/logo.png" などに変更
   * 3. 画像にサイト名が入っている場合は showSiteName: false
   */
  const SITE_LOGO = {
    imageSrc: "images/logo.svg",
    alt: "Open e-Learning",
    siteName: "Open e-Learning",
    showSiteName: true,
  };

  function renderLogoInner() {
    const img = `<img src="${SITE_LOGO.imageSrc}" alt="${escapeHtml(SITE_LOGO.alt)}" class="logo-img" width="32" height="32" />`;
    const name = SITE_LOGO.showSiteName
      ? `<span class="logo-text">${escapeHtml(SITE_LOGO.siteName)}</span>`
      : "";
    return img + name;
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;

    const loggedIn = isLoggedIn();
    const userName = getUserName();
    const current = getCurrentPage();

    el.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="logo">${renderLogoInner()}</a>
          <form class="search-form" id="header-search-form">
            <div class="search-wrap">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" class="search-input" id="header-search" placeholder="サービス名や講師名で検索..." />
            </div>
          </form>
          <nav class="header-nav">
            ${
              loggedIn
                ? `
              <div class="user-menu">
                <button type="button" class="user-btn" id="user-menu-btn">
                  <span class="avatar">👤</span>
                  <span style="max-width:100px;overflow:hidden;text-overflow:ellipsis;font-size:0.875rem">${userName}</span>
                  <span>▼</span>
                </button>
                <div class="dropdown" id="user-dropdown">
                  <a href="login.html">アカウント設定</a>
                  <hr>
                  <button type="button" id="logout-btn">ログアウト</button>
                </div>
              </div>`
                : `
              <a href="login.html" class="btn btn-ghost btn-sm">ログイン</a>
              <a href="register.html" class="btn btn-primary btn-sm">新規登録</a>`
            }
          </nav>
          <button type="button" class="menu-toggle" id="menu-toggle" aria-label="メニュー">☰</button>
        </div>
        <div class="container mobile-nav" id="mobile-nav">
          <form id="mobile-search-form" style="margin-bottom:1rem">
            <div class="search-wrap">
              <input type="text" class="search-input" id="mobile-search" placeholder="サービス名や講師名で検索..." style="padding-left:0.75rem" />
            </div>
          </form>
          <a href="reviews.html">口コミを見る</a>
          ${
            loggedIn
              ? `<button type="button" class="btn btn-ghost" id="mobile-logout" style="margin-top:0.5rem">ログアウト</button>`
              : `<a href="login.html" class="btn btn-ghost" style="margin-top:0.5rem">ログイン</a>
                 <a href="register.html" class="btn btn-primary" style="margin-top:0.5rem">新規登録</a>`
          }
        </div>
      </header>
      <nav class="sub-nav">
        <div class="container sub-nav-inner">
          ${SUB_NAV_ITEMS.map(
            (item) =>
              `<a href="${item.path}" class="${current === item.path || (current === "" && item.path === "index.html") ? "active" : ""}">${item.label}</a>`
          ).join("")}
        </div>
      </nav>
    `;

    document.getElementById("header-search-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("header-search").value.trim();
      if (q) window.location.href = `reviews.html?search=${encodeURIComponent(q)}`;
    });

    document.getElementById("mobile-search-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("mobile-search").value.trim();
      if (q) window.location.href = `reviews.html?search=${encodeURIComponent(q)}`;
    });

    document.getElementById("menu-toggle")?.addEventListener("click", () => {
      document.getElementById("mobile-nav")?.classList.toggle("open");
    });

    document.getElementById("user-menu-btn")?.addEventListener("click", () => {
      document.getElementById("user-dropdown")?.classList.toggle("open");
    });

    document.getElementById("logout-btn")?.addEventListener("click", logout);
    document.getElementById("mobile-logout")?.addEventListener("click", logout);

    document.addEventListener("click", (e) => {
      const menu = document.querySelector(".user-menu");
      if (menu && !menu.contains(e.target)) {
        document.getElementById("user-dropdown")?.classList.remove("open");
      }
    });
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    showToast("ログアウトしました");
    setTimeout(() => (window.location.href = "index.html"), 500);
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;

    el.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-top">
          <div>
            <div class="footer-logo">${renderLogoInner()}</div>
            <p class="footer-desc">
              オンライン学習・情報サービスの口コミ比較サイト。実際の購入者の声で、あなたに合った学びを見つけましょう。
            </p>
            <div class="social-links">
              <a href="#" aria-label="X">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>サイトマップ</h4>
            <ul class="footer-links">
              <li><a href="index.html">トップ</a></li>
              <li><a href="reviews.html">口コミ一覧</a></li>
              <li><a href="submit-review.html">口コミを投稿</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>サポート</h4>
            <ul class="footer-links">
              <li><a href="faq.html">Q&A</a></li>
              <li><a href="contact.html">お問い合わせ</a></li>
              <li><a href="login.html">アカウント設定</a></li>
              <li><a href="#">利用規約</a></li>
              <li><a href="#">プライバシーポリシー</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>運営会社</h4>
            <ul class="footer-links">
              <li><a href="#">会社概要</a></li>
              <li>support@openelearning.com</li>
              <li>03-1234-5678</li>
              <li>東京都渋谷区</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Open e-Learning. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  function renderBreadcrumb(items) {
    const el = document.getElementById("breadcrumb");
    if (!el || !items.length) return;

    el.innerHTML = `
      <nav class="breadcrumb">
        <div class="container">
          <ol>
            ${items
              .map((item, i) => {
                const isLast = i === items.length - 1;
                const sep = i > 0 ? '<span class="sep">›</span>' : "";
                const content = item.path && !isLast
                  ? `<a href="${item.path}">${item.label}</a>`
                  : `<span class="${isLast ? "current" : ""}">${item.label}</span>`;
                return `${sep}<li>${content}</li>`;
              })
              .join("")}
          </ol>
        </div>
      </nav>
    `;
  }

  function initFaqAccordion(selector) {
    document.querySelectorAll(selector).forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
  });

  window.App = {
    isLoggedIn,
    hasUnlockedReviews,
    showToast,
    renderBreadcrumb,
    initFaqAccordion,
    getQueryParam,
    escapeHtml,
  };
})();
