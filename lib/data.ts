export type News = {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: "国内" | "海外" | "規制" | "資金調達" | "技術";
};

export const latestNews: News[] = [
  { id: "n1", title: "国内大手が生成AI新プラットフォームを発表", summary: "企業向けセキュア環境とガバナンスを備えた生成AI基盤。年内提供開始。", date: "2025-08-07", tag: "国内" },
  { id: "n2", title: "米スタートアップがマルチモーダルLLMで大型調達", summary: "シリーズCで200億円規模を確保、製造業での導入拡大を狙う。", date: "2025-08-06", tag: "資金調達" },
  { id: "n3", title: "EUのAI規制実装ガイドライン草案が公開", summary: "リスク分類と適合性評価の運用指針を提示。開発者への影響が焦点。", date: "2025-08-05", tag: "規制" },
  { id: "n4", title: "研究速報：軽量化モデルでSOTAに匹敵する精度", summary: "蒸留と量子化の新手法で、推論コストを40%削減。", date: "2025-08-05", tag: "技術" },
  { id: "n5", title: "国内自治体がAIカスタマーサポートを全庁導入", summary: "住民からの問い合わせ対応の平均応答時間を半減。", date: "2025-08-04", tag: "国内" },
  { id: "n6", title: "バイオ×AIで創薬を加速、共同研究が拡大", summary: "大学と製薬の連携が相次ぐ。探索段階の成功率向上に期待。", date: "2025-08-03", tag: "海外" }
];

export const features = [
  {
    slug: "gpt5-deep-dive",
    tag: "技術解説",
    title: "GPT-5の技術構造とビジネス活用：完全ガイド",
    excerpt: "アーキテクチャ、安全性、API料金、導入事例までを網羅。",
    html: "<p>本文サンプル。ここに図解やコード、事例を配置します。</p>"
  },
  {
    slug: "ai-governance-2025",
    tag: "規制動向",
    title: "2025年版：AIガバナンスと法規制の要点",
    excerpt: "EU/US/日本の枠組み比較、実務での対応チェックリスト付き。",
    html: "<p>本文サンプル。</p>"
  },
  {
    slug: "genai-in-japan-enterprise",
    tag: "事例研究",
    title: "日本企業の生成AI導入・運用ベストプラクティス",
    excerpt: "PoCを超えてROIを出すためのポイントを解説。",
    html: "<p>本文サンプル。</p>"
  }
];

export const tools = [
  { slug: "syn-marketer", name: "Syn.Marketer", vendor: "Synergy Marketing", category: "メール/CRM", price: 29800, summary: "CRM連携で高度なメール配信とスコアリング。", details: "企業の顧客データ活用を前提とした配信・分析が強み。" },
  { slug: "midjourney", name: "Midjourney", vendor: "Midjourney", category: "画像生成", price: 1600, summary: "高品質な画像生成プラットフォーム。", details: "プロンプトベースで多様なスタイルを生成可能。" },
  { slug: "openai-chatgpt", name: "ChatGPT", vendor: "OpenAI", category: "汎用LLM", price: 3000, summary: "テキスト/画像/音声を扱える汎用AI。", details: "API/アプリで幅広い用途に対応。" },
  { slug: "claude", name: "Claude", vendor: "Anthropic", category: "汎用LLM", price: 3500, summary: "長文・安全性に強み。", details: "大容量コンテキストで業務文書に向く。" },
  { slug: "notion-ai", name: "Notion AI", vendor: "Notion", category: "生産性", price: 1000, summary: "ドキュメント/DB連携で下書きを加速。", details: "ワークスペース内の情報活用が容易。" },
  { slug: "perplexity", name: "Perplexity", vendor: "Perplexity", category: "検索/調査", price: 2000, summary: "出典付きの探索型検索。", details: "調査の一次情報確認に強い。" },
  { slug: "runway", name: "Runway", vendor: "Runway", category: "動画生成", price: 4000, summary: "動画編集/生成の統合環境。", details: "テキストから動画生成、背景除去など。" },
  { slug: "cursor", name: "Cursor", vendor: "Anysphere", category: "開発支援", price: 2500, summary: "AIコーディング特化IDE。", details: "コード補完とチャットで開発を加速。" }
];
