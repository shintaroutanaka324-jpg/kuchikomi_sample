const DETAIL_LABELS = [
  { key: "contentSatisfaction", label: "コンテンツ満足度" },
  { key: "resultRealization", label: "成果の実現度" },
  { key: "supportQuality", label: "サポート品質" },
  { key: "costPerformance", label: "コスパ" },
  { key: "recommendation", label: "おすすめ度" },
];

document.addEventListener("DOMContentLoaded", () => {
  App.renderBreadcrumb([
    { label: "トップ", path: "index.html" },
    { label: "口コミを投稿" },
  ]);

  const root = document.getElementById("submit-root");

  if (!App.isLoggedIn()) {
    root.innerHTML = `
      <div class="auth-card text-center">
        <p style="font-size:3rem;margin-bottom:1rem">🔒</p>
        <h1>口コミを投稿するにはログインが必要です</h1>
        <p class="subtitle">アカウントを作成またはログインして、口コミを投稿しましょう。</p>
        <a href="login.html" class="btn btn-primary btn-block">ログイン</a>
        <a href="register.html" class="btn btn-outline btn-block mt-4">新規登録</a>
        <p class="mt-8"><a href="index.html" class="back-link" style="justify-content:center">トップページに戻る</a></p>
      </div>`;
    return;
  }

  const productOptions = PRODUCTS.map(
    (p) => `<option value="${p.id}">${App.escapeHtml(p.title)}</option>`
  ).join("");

  const categoryOptions = CATEGORIES.map(
    (c) => `<option value="${c.value}">${c.label}</option>`
  ).join("");

  root.innerHTML = `
    <div class="page-header">
      <h1>口コミを投稿する</h1>
      <p style="color:var(--gray-600)">購入したオンライン情報サービスの口コミを投稿すると、すべての口コミを無料で閲覧できるようになります</p>
    </div>

    <form id="review-form" class="card card-body">
      <h2 style="font-size:1.125rem;font-weight:600;margin-bottom:1.5rem">商品情報</h2>

      <div class="form-group">
        <label class="form-label" for="product">商品を選択 *</label>
        <select class="select" id="product" required>
          <option value="">選択してください</option>
          ${productOptions}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="purchasePrice">購入価格（円） *</label>
        <input type="number" class="form-input" id="purchasePrice" required min="0" placeholder="98000" />
      </div>

      <hr style="border:none;border-top:1px solid var(--gray-200);margin:2rem 0" />

      <h2 style="font-size:1.125rem;font-weight:600;margin-bottom:1.5rem">評価と口コミ</h2>

      <div class="form-group">
        <label class="form-label">総合評価 *</label>
        <div class="stars" id="overall-stars" style="font-size:1.5rem;cursor:pointer">
          ${[1, 2, 3, 4, 5].map((i) => `<span data-rating="${i}" class="empty">★</span>`).join("")}
        </div>
        <input type="hidden" id="overallRating" required />
        <p class="form-hint">星をクリックして評価してください</p>
      </div>

      <div class="form-group">
        <label class="form-label" for="reviewTitle">口コミタイトル *</label>
        <input type="text" class="form-input" id="reviewTitle" required maxlength="100" />
      </div>

      <div class="form-group">
        <label class="form-label" for="reviewContent">口コミ本文 *</label>
        <textarea class="form-textarea" id="reviewContent" required rows="6"
          placeholder="購入したオンライン情報サービスについて、具体的にレビューしてください。"></textarea>
      </div>

      <hr style="border:none;border-top:1px solid var(--gray-200);margin:2rem 0" />

      <h2 style="font-size:1.125rem;font-weight:600;margin-bottom:0.5rem">詳細評価</h2>
      <p style="font-size:0.875rem;color:var(--gray-600);margin-bottom:1.5rem">5つの項目について評価を入力してください</p>

      ${DETAIL_LABELS.map(
        (d) => `
        <div class="form-group">
          <label class="form-label">${d.label} *</label>
          <select class="select detail-rating" data-key="${d.key}" required>
            <option value="">選択</option>
            ${[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((v) => `<option value="${v}">${v}</option>`).join("")}
          </select>
        </div>`
      ).join("")}

      <div class="flex gap-4 mt-8">
        <button type="submit" class="btn btn-primary btn-lg" style="flex:1">口コミを投稿する</button>
        <a href="reviews.html" class="btn btn-outline btn-lg">キャンセル</a>
      </div>
      <p class="form-hint mt-4 text-center">投稿された口コミは運営によって確認され、承認後に公開されます。</p>
    </form>
  `;

  let selectedRating = 0;
  const starContainer = document.getElementById("overall-stars");
  starContainer.querySelectorAll("span").forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating, 10);
      document.getElementById("overallRating").value = selectedRating;
      starContainer.querySelectorAll("span").forEach((s, i) => {
        s.classList.toggle("empty", i >= selectedRating);
      });
    });
  });

  document.getElementById("review-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!selectedRating) {
      App.showToast("総合評価を選択してください", "error");
      return;
    }
    const details = document.querySelectorAll(".detail-rating");
    for (const sel of details) {
      if (!sel.value) {
        App.showToast("5つの評価項目をすべて評価してください", "error");
        return;
      }
    }

    localStorage.setItem("reviewsUnlocked", "true");
    App.showToast("口コミを投稿しました！全ての口コミが閲覧可能になりました。");
    setTimeout(() => (window.location.href = "reviews.html"), 1500);
  });
});
