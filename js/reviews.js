const PER_PAGE = 5;

const HIGHLIGHT_TAGS = [
  "サポート充実",
  "コスパ良好",
  "内容が充実",
  "成果が出た",
  "初心者向け",
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("filter-search");
  const genreSelect = document.getElementById("filter-genre");
  const sortSelect = document.getElementById("filter-sort");
  let currentPage = 1;

  CATEGORIES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.value;
    opt.textContent = c.label;
    genreSelect.appendChild(opt);
  });

  const urlSearch = App.getQueryParam("search");
  const urlGenre = App.getQueryParam("genre") || App.getQueryParam("category");
  if (urlSearch) searchInput.value = urlSearch;
  if (urlGenre && [...genreSelect.options].some((o) => o.value === urlGenre)) {
    genreSelect.value = urlGenre;
  }

  const allReviews = buildReviewList();

  function filterReviews() {
    let list = [...allReviews];
    const search = searchInput.value.trim().toLowerCase();
    const genre = genreSelect.value;
    const sort = sortSelect.value;

    if (genre && genre !== "all") {
      list = list.filter((item) => item.product.category === genre);
    }

    if (search) {
      list = list.filter((item) => {
        const p = item.product;
        return (
          item.title.toLowerCase().includes(search) ||
          item.content.toLowerCase().includes(search) ||
          item.userName.toLowerCase().includes(search) ||
          p.title.toLowerCase().includes(search) ||
          p.instructor.toLowerCase().includes(search) ||
          getCategoryLabel(p.category).toLowerCase().includes(search)
        );
      });
    }

    if (sort === "date-new") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "rating-high") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === "rating-low") {
      list.sort((a, b) => a.rating - b.rating);
    }

    return list;
  }

  function renderStarsHtml(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="${i <= Math.round(rating) ? "on" : "off"}">★</span>`;
    }
    return html;
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function renderReviewCard(item) {
    const p = item.product;
    const tag = item.pros?.[0] || HIGHLIGHT_TAGS[parseInt(item.id.replace(/\D/g, ""), 10) % HIGHLIGHT_TAGS.length];
    const brand = p.instructor.split(/[\s・]/)[0] || p.instructor;

    return `
      <a href="review-detail.html?id=${p.id}" class="review-list-card">
        <div class="review-list-brand">
          <img src="${p.imageUrl}" alt="${App.escapeHtml(brand)}" />
          <span class="review-list-cat">${App.escapeHtml(getCategoryLabel(p.category))}</span>
        </div>
        <div class="review-list-content">
          <h2 class="review-list-title">${App.escapeHtml(item.title)}</h2>
          <div class="review-list-meta">
            <span class="review-list-stars">${renderStarsHtml(item.rating)}</span>
            <span class="review-list-score">${item.rating.toFixed(1)}</span>
            <span class="review-list-date">${formatDate(item.date)}</span>
          </div>
          <p class="review-list-snippet">${App.escapeHtml(item.content)}</p>
          <div class="review-list-footer">
            <span class="review-list-user">
              <span class="review-list-avatar">👤</span>
              ${App.escapeHtml(item.userName)} · ${item.age} · ${item.gender}
              <span class="review-list-period">受講期間: ${item.studyPeriod}</span>
            </span>
            <span class="review-list-tag">${App.escapeHtml(tag)}</span>
          </div>
        </div>
        <span class="review-list-arrow" aria-hidden="true">›</span>
      </a>`;
  }

  function renderPagination(totalPages) {
    const nav = document.getElementById("pagination");
    if (totalPages <= 1) {
      nav.innerHTML = "";
      return;
    }

    let html = `<button type="button" class="page-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>‹</button>`;

    const pages = getPageNumbers(currentPage, totalPages);
    pages.forEach((p) => {
      if (p === "...") {
        html += `<span class="page-ellipsis">…</span>`;
      } else {
        html += `<button type="button" class="page-btn ${p === currentPage ? "active" : ""}" data-page="${p}">${p}</button>`;
      }
    });

    html += `<button type="button" class="page-btn" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>›</button>`;
    nav.innerHTML = html;

    nav.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.page;
        if (val === "prev" && currentPage > 1) currentPage--;
        else if (val === "next" && currentPage < totalPages) currentPage++;
        else if (val !== "prev" && val !== "next") currentPage = parseInt(val, 10);
        render();
        window.scrollTo({ top: document.querySelector(".reviews-body").offsetTop - 80, behavior: "smooth" });
      });
    });
  }

  function render() {
    const list = filterReviews();
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    document.getElementById("result-count").textContent = `全 ${total} 件の口コミ`;

    const container = document.getElementById("review-list");
    const empty = document.getElementById("empty-state");

    if (total === 0) {
      container.innerHTML = "";
      empty.classList.remove("hidden");
      document.getElementById("pagination").innerHTML = "";
      return;
    }

    empty.classList.add("hidden");
    const start = (currentPage - 1) * PER_PAGE;
    const pageItems = list.slice(start, start + PER_PAGE);
    container.innerHTML = pageItems.map(renderReviewCard).join("");
    renderPagination(totalPages);
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    render();
  });
  genreSelect.addEventListener("change", () => {
    currentPage = 1;
    render();
  });
  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    render();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    searchInput.value = "";
    genreSelect.value = "all";
    sortSelect.value = "date-new";
    currentPage = 1;
    render();
  });

  render();
});

/** 表示用に口コミリストを拡張（商品ごとに複数口コミを生成） */
function buildReviewList() {
  const items = [];
  const genders = ["男性", "女性"];
  const periods = ["2ヶ月", "3ヶ月", "4ヶ月", "6ヶ月", "1年"];

  REVIEWS.forEach((r, i) => {
    const product = getProductById(r.productId);
    if (!product) return;
    items.push({
      ...r,
      product,
      gender: r.gender || genders[i % 2],
      studyPeriod: r.studyPeriod || periods[i % periods.length],
    });
  });

  PRODUCTS.forEach((p, pi) => {
    const count = items.filter((x) => x.productId === p.id).length;
    for (let j = count; j < 3; j++) {
      const idx = pi * 3 + j;
      items.push({
        id: `gen-${p.id}-${j}`,
        productId: p.id,
        product: p,
        userName: `匿名ユーザー${String.fromCharCode(65 + (idx % 26))}`,
        age: ["20代", "30代", "40代"][j % 3],
        gender: genders[idx % 2],
        rating: Math.min(5, Math.max(3, p.averageRating + (j - 1) * 0.3)),
        date: `2026-0${((pi + j) % 5) + 1}-${10 + j}`,
        title: `${p.instructor}の講座を受講しました`,
        content: p.description,
        purchasePrice: p.price,
        pros: ["内容が分かりやすい", "実践的"],
        cons: [],
        studyPeriod: periods[idx % periods.length],
      });
    }
  });

  return items;
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
