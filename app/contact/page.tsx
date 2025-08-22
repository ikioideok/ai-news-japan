export const metadata = { title: "お問い合わせ" };

export default function ContactPage() {
  return (
    <div className="prose">
      <h1>お問い合わせ</h1>
      <p>広告掲載・取材依頼・寄稿のご相談は下記よりお願いします。</p>
      <form className="card max-w-lg">
        <label className="block mb-2 text-sm">お名前</label>
        <input className="border rounded w-full px-3 py-2" />
        <label className="block mb-2 text-sm mt-3">メールアドレス</label>
        <input className="border rounded w-full px-3 py-2" />
        <label className="block mb-2 text-sm mt-3">内容</label>
        <textarea className="border rounded w-full px-3 py-2 h-32" />
        <button className="mt-3 px-4 py-2 rounded bg-brand text-white">送信</button>
        <p className="text-xs text-gray-500 mt-2">※ 実装例のため、送信は行われません。</p>
      </form>
    </div>
  );
}
