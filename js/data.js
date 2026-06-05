const CATEGORIES = [
  { value: "career-job-change", label: "キャリア・転職" },
  { value: "romance-marriage", label: "恋愛・婚活" },
  { value: "side-business-independence", label: "副業・独立" },
  { value: "ai-it-skills", label: "AI・ITスキル" },
  { value: "web-marketing", label: "Webマーケティング" },
  { value: "sales-business-skills", label: "営業・ビジネススキル" },
  { value: "certification-exam", label: "資格・試験対策" },
  { value: "english-language", label: "英語・語学" },
  { value: "money-asset-building", label: "マネー・資産形成" },
  { value: "health-lifestyle", label: "健康・ライフスタイル" },
  { value: "community-salon", label: "コミュニティ・サロン" },
  { value: "other", label: "その他" },
];

const PRODUCTS = [
  {
    id: "1",
    title: "YouTubeで月収100万円を達成する完全ロードマップ",
    instructor: "山田太郎",
    category: "web-marketing",
    price: 98000,
    platform: "YouTube",
    imageUrl:
      "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=400&h=300&fit=crop",
    description:
      "YouTubeチャンネルを0から立ち上げ、収益化までの完全ガイド。実践的な動画制作スキルとマネタイズ戦略を学べます。",
    averageRating: 4.3,
    reviewCount: 127,
    companyName: "株式会社山田メディア",
    location: "東京都渋谷区",
  },
  {
    id: "2",
    title: "実践ビジネスコーチング講座 - あなたの可能性を最大化",
    instructor: "佐藤花子",
    category: "sales-business-skills",
    price: 150000,
    platform: "オンラインコーチング",
    imageUrl:
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=400&h=300&fit=crop",
    description:
      "3ヶ月間のマンツーマンコーチングプログラム。キャリアアップや起業を目指す方向けの実践的なコーチングです。",
    averageRating: 4.7,
    reviewCount: 89,
  },
  {
    id: "3",
    title: "モテる男になる恋愛マスタープログラム",
    instructor: "田中恋太",
    category: "romance-marriage",
    price: 49800,
    platform: "X（旧Twitter）",
    imageUrl:
      "https://images.unsplash.com/photo-1619852182277-79aa23f82c8e?w=400&h=300&fit=crop",
    description:
      "外見、会話術、マインドセットまで、モテる男になるための総合的な恋愛コンサルティング。",
    averageRating: 3.2,
    reviewCount: 234,
  },
  {
    id: "4",
    title: "初心者から始める株式投資の教科書",
    instructor: "鈴木投資郎",
    category: "money-asset-building",
    price: 79800,
    platform: "YouTube",
    imageUrl:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop",
    description:
      "株式投資の基礎から実践的なテクニカル分析まで。初心者でも安心して学べる投資講座です。",
    averageRating: 4.6,
    reviewCount: 156,
    companyName: "鈴木投資アカデミー株式会社",
    location: "東京都千代田区",
  },
  {
    id: "5",
    title: "Xで影響力を高めるコンテンツ戦略",
    instructor: "高橋マーケ",
    category: "web-marketing",
    price: 39800,
    platform: "X（旧Twitter）",
    imageUrl:
      "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=400&h=300&fit=crop",
    description:
      "フォロワー0から10万人を目指すX運用の完全ガイド。バズるコンテンツの作り方を徹底解説。",
    averageRating: 3.8,
    reviewCount: 98,
  },
  {
    id: "6",
    title: "女性のための恋愛・結婚コンサルティング",
    instructor: "伊藤愛子",
    category: "romance-marriage",
    price: 68000,
    platform: "Instagram",
    imageUrl:
      "https://images.unsplash.com/photo-1619852182277-79aa23f82c8e?w=400&h=300&fit=crop",
    description:
      "理想のパートナーと出会い、幸せな結婚を実現するための女性向け恋愛講座。",
    averageRating: 4.4,
    reviewCount: 76,
  },
  {
    id: "7",
    title: "恋愛屋ジュンの実践的恋愛講座 - 本気で彼女を作る方法",
    instructor: "恋愛屋ジュン",
    category: "romance-marriage",
    price: 39800,
    platform: "YouTube",
    imageUrl:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
    description:
      "恋愛経験ゼロから彼女を作るための実践的メソッド。外見改善、会話術、デート戦略まで網羅した総合恋愛プログラム。",
    averageRating: 4.2,
    reviewCount: 183,
    companyName: "恋愛屋ジュン合同会社",
    location: "大阪府大阪市",
  },
];

const REVIEWS = [
  {
    id: "r1",
    productId: "1",
    userName: "匿名ユーザーA",
    age: "30代",
    rating: 4.5,
    date: "2026-05-20",
    title: "本当に収益化できました！",
    content:
      "最初は半信半疑でしたが、この教材の通りに実践したところ、6ヶ月で収益化を達成できました。特に動画のサムネイル制作とSEO対策の部分が非常に参考になりました。価格は高いですが、それ以上の価値がありました。",
    purchasePrice: 98000,
    pros: ["具体的なアクションプランが明確", "質問サポートが充実", "実績が出やすい"],
    cons: ["価格が高め", "初心者には少し難しい部分も"],
    contentSatisfaction: 4.5,
    resultRealization: 5,
    supportQuality: 4.5,
    costPerformance: 4,
    recommendation: 4.5,
  },
  {
    id: "r2",
    productId: "1",
    userName: "匿名ユーザーB",
    age: "20代",
    rating: 3.5,
    date: "2026-04-15",
    title: "内容は良いが価格が...",
    content:
      "コンテンツ自体は良質で、YouTubeの収益化に必要な知識は一通り学べます。ただ、正直なところネットで調べればある程度わかる内容も含まれており、この価格は少し高すぎると感じました。",
    purchasePrice: 98000,
    pros: ["体系的なカリキュラム", "実践的"],
    cons: ["価格が高い", "一部は無料情報と重複"],
    contentSatisfaction: 4,
    resultRealization: 3,
    supportQuality: 4,
    costPerformance: 2.5,
    recommendation: 3,
  },
  {
    id: "r3",
    productId: "2",
    userName: "匿名ユーザーC",
    age: "40代",
    rating: 5,
    date: "2026-05-10",
    title: "人生が変わりました",
    content:
      "佐藤さんのコーチングを受けて、自分の可能性を信じられるようになりました。3ヶ月のプログラムで、転職も成功し、年収も200万円アップ。高額ですが、投資した以上のリターンがありました。",
    purchasePrice: 150000,
    pros: ["マンツーマンで丁寧", "的確なアドバイス", "成果が出る"],
    cons: ["価格が非常に高い"],
    contentSatisfaction: 5,
    resultRealization: 5,
    supportQuality: 5,
    costPerformance: 4,
    recommendation: 5,
  },
  {
    id: "r4",
    productId: "7",
    userName: "匿名ユーザーD",
    age: "20代",
    rating: 4.5,
    date: "2026-05-01",
    title: "コスパ最高の恋愛教材",
    content:
      "他の恋愛コンサルは10万円以上するのに、この価格でこの内容量は本当にすごい。ジュンさんの実体験に基づいたアドバイスなので説得力があります。",
    purchasePrice: 39800,
    pros: ["コスパ抜群", "実体験ベース", "ボリュームがある"],
    cons: ["情報量が多くて整理が必要"],
    contentSatisfaction: 5,
    resultRealization: 4,
    supportQuality: 4,
    costPerformance: 5,
    recommendation: 5,
  },
];

function getCategoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label || value;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getReviewsByProductId(productId) {
  return REVIEWS.filter((r) => r.productId === productId);
}

function formatPrice(price) {
  return "¥" + price.toLocaleString("ja-JP");
}

function renderStars(rating, max = 5) {
  let html = '<div class="stars">';
  for (let i = 1; i <= max; i++) {
    html += `<span class="${i <= Math.round(rating) ? "" : "empty"}">★</span>`;
  }
  html += "</div>";
  return html;
}
