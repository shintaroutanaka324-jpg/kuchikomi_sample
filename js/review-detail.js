document.addEventListener("DOMContentLoaded", () => {
  const id = App.getQueryParam("id");
  const product = getProductById(id);
  const root = document.getElementById("detail-root");

  if (!product) {
    root.innerHTML = `
      <div class="empty-state">
        <h1 style="font-size:1.5rem;margin-bottom:1rem">商品が見つかりません</h1>
        <a href="reviews.html" class="btn btn-primary">口コミ一覧に戻る</a>
      </div>`;
    return;
  }

  App.renderBreadcrumb([
    { label: "トップ", path: "index.html" },
    { label: "口コミ一覧", path: "reviews.html" },
    { label: "商品詳細" },
  ]);

  const reviews = getReviewsByProductId(id);
  const unlocked = App.hasUnlockedReviews();

  const detailScores = [
    { key: "contentSatisfaction", label: "コンテンツ満足度" },
    { key: "resultRealization", label: "成果の実現度" },
    { key: "supportQuality", label: "サポート品質" },
    { key: "costPerformance", label: "コスパ" },
    { key: "recommendation", label: "おすすめ度" },
  ];

  function avgScore(key) {
    if (!reviews.length) return 0;
    return reviews.reduce((s, r) => s + (r[key] || 0), 0) / reviews.length;
  }

  root.innerHTML = `
    <a href="reviews.html" class="back-link">← 口コミ一覧に戻る</a>

    <div class="detail-header">
      <div class="flex flex-wrap gap-4" style="margin-bottom:1rem">
        <span class="badge">${getCategoryLabel(product.category)}</span>
        <span class="rating-inline" style="font-size:1rem">★ ${product.averageRating.toFixed(1)} <span class="count">(${product.reviewCount}件の口コミ)</span></span>
      </div>
      <h1 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem">${App.escapeHtml(product.title)}</h1>
      <div class="flex flex-wrap gap-4" style="font-size:0.875rem;color:var(--gray-600);margin-bottom:1rem">
        <span>講師: <strong>${App.escapeHtml(product.instructor)}</strong></span>
        <span>配信: ${App.escapeHtml(product.platform)}</span>
        <span class="price-tag" style="font-size:1rem">${formatPrice(product.price)}</span>
      </div>
      <p style="color:var(--gray-600)">${App.escapeHtml(product.description)}</p>
      ${product.companyName ? `<p class="mt-4" style="font-size:0.875rem;color:var(--gray-500)">${App.escapeHtml(product.companyName)} · ${App.escapeHtml(product.location || "")}</p>` : ""}
    </div>

    <div class="detail-grid">
      <div>
        <h2 style="font-size:1.25rem;font-weight:600;margin-bottom:1rem">口コミ (${reviews.length}件)</h2>
        <div id="reviews-list">
          ${reviews.length === 0 ? '<p class="empty-state">まだ口コミがありません</p>' : reviews.map((r, i) => renderReview(r, i, unlocked)).join("")}
        </div>
        ${!unlocked && reviews.length > 0 ? `
          <div class="unlock-banner">
            <p style="font-size:2rem;margin-bottom:0.5rem">🔒</p>
            <h3 style="font-weight:600;margin-bottom:0.5rem">この口コミの続きを読む</h3>
            <p style="font-size:0.875rem;color:var(--gray-600);margin-bottom:1rem">口コミを1件投稿するか、月額880円のプランで、1か月間すべての口コミを閲覧できます</p>
            <div class="flex gap-4" style="justify-content:center;flex-wrap:wrap">
              <a href="submit-review.html" class="btn btn-primary">口コミを投稿（無料）</a>
              <a href="login.html" class="btn btn-outline">月額880円で閲覧する</a>
            </div>
          </div>` : ""}
      </div>

      <aside>
        <div class="card card-body mb-6">
          <h3 style="font-weight:600;margin-bottom:1rem;font-size:0.875rem">詳細評価</h3>
          ${detailScores.map((d) => {
            const val = avgScore(d.key);
            return `
              <div class="bar-row" style="margin-bottom:0.75rem">
                <span style="width:7rem;font-size:0.75rem">${d.label}</span>
                <div class="bar"><div class="bar-fill" style="width:${(val / 5) * 100}%"></div></div>
                <span style="font-weight:600;color:var(--blue-600);font-size:0.875rem">${val.toFixed(1)}</span>
              </div>`;
          }).join("")}
        </div>
        <div class="card card-body">
          <h3 style="font-weight:600;margin-bottom:1rem;font-size:0.875rem">評価の内訳</h3>
          ${[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return `
              <div class="bar-row">
                <span>${star}★</span>
                <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
                <span style="font-size:0.75rem;color:var(--gray-500)">${count}</span>
              </div>`;
          }).join("")}
        </div>
      </aside>
    </div>
  `;
});

function renderReview(r, index, unlocked) {
  const preview = !unlocked && index > 0;
  const content = preview
    ? r.content.slice(0, 80) + "..."
    : r.content;

  return `
    <article class="review-item">
      <div class="flex justify-between items-center mb-4">
        ${renderStars(r.rating)}
        <span style="font-size:0.75rem;color:var(--gray-500)">${r.date}</span>
      </div>
      <h3 style="font-weight:600;margin-bottom:0.5rem">${App.escapeHtml(r.title)}</h3>
      <p style="font-size:0.875rem;color:var(--gray-600);margin-bottom:0.75rem">${App.escapeHtml(content)}</p>
      <p style="font-size:0.75rem;color:var(--gray-500)">${App.escapeHtml(r.userName)} さん（${r.age}） · 購入価格: ${formatPrice(r.purchasePrice)}</p>
      ${unlocked && r.pros ? `
        <div class="pros-cons">
          ${r.pros.map((p) => `<span class="tag-pro">+ ${App.escapeHtml(p)}</span>`).join("")}
          ${(r.cons || []).map((c) => `<span class="tag-con">- ${App.escapeHtml(c)}</span>`).join("")}
        </div>` : ""}
    </article>`;
}
