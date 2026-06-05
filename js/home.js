const CATEGORY_IMAGES = {
  "web-marketing":
    "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=200&h=200&fit=crop",
  "ai-it-skills":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop",
  "romance-marriage":
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop",
  "money-asset-building":
    "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=200&h=200&fit=crop",
  "side-business-independence":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop",
  "english-language":
    "https://images.unsplash.com/photo-1546410531-bb4caa6e8662?w=200&h=200&fit=crop",
};

const TAG_MAP = {
  "web-marketing": ["#初心者OK", "#実践的"],
  "ai-it-skills": ["#最新技術", "#スキルアップ"],
  "romance-marriage": ["#恋愛", "#コスパ良"],
  "money-asset-building": ["#投資", "#資産形成"],
  "sales-business-skills": ["#ビジネス", "#コーチング"],
  "side-business-independence": ["#副業", "#独立"],
};

const TESTIMONIAL_THEMES = ["t-blue", "t-green", "t-yellow"];

document.addEventListener("DOMContentLoaded", () => {
  App.initFaqAccordion(".faq-question");

  renderCategories();
  renderServices();
  renderReviews();
});

function renderCategories() {
  const el = document.getElementById("home-categories");
  if (!el) return;

  const items = CATEGORIES.slice(0, 6);
  el.innerHTML = items
    .map((c) => {
      const img =
        CATEGORY_IMAGES[c.value] ||
        "https://images.unsplash.com/photo-1619852182277-79aa23f82c8e?w=200&h=200&fit=crop";
      return `
        <a href="reviews.html?genre=${c.value}" class="category-tile">
          <img src="${img}" alt="${App.escapeHtml(c.label)}" loading="lazy" />
          <span>${App.escapeHtml(c.label)}</span>
        </a>`;
    })
    .join("");
}

function renderServices() {
  const el = document.getElementById("home-services");
  if (!el) return;

  el.innerHTML = PRODUCTS.map((p) => {
    const tags = TAG_MAP[p.category] || ["#口コミ多数"];
    const brand = p.instructor.split(/[\s・]/)[0] || p.instructor;
    return `
      <a href="review-detail.html?id=${p.id}" class="service-card">
        <div class="brand">${App.escapeHtml(brand)}</div>
        <h3>${App.escapeHtml(p.title)}</h3>
        <p class="meta">${getCategoryLabel(p.category)}</p>
        <p class="rating"><span>★</span> ${p.averageRating.toFixed(1)} <span style="font-weight:400;color:var(--gray-500)">(${p.reviewCount}件)</span></p>
        <div class="tag-row">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </a>`;
  }).join("");
}

function renderReviews() {
  const el = document.getElementById("home-reviews");
  if (!el) return;

  const productMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  el.innerHTML = REVIEWS.slice(0, 3).map((r, i) => {
    const product = productMap[r.productId];
    const theme = TESTIMONIAL_THEMES[i % 3];
    return `
      <article class="testimonial-card ${theme}">
        <div class="quote-head">${App.escapeHtml(r.title)}</div>
        <p class="quote-body line-clamp-4">${App.escapeHtml(r.content)}</p>
        <div class="quote-user">
          <span class="quote-avatar">👤</span>
          <span>${App.escapeHtml(r.userName)}（${r.age}）${product ? " · " + App.escapeHtml(product.title.slice(0, 20)) + "…" : ""}</span>
        </div>
      </article>`;
  }).join("");
}
