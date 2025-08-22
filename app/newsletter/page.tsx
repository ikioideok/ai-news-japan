export const metadata = { title: "メール速報" };

export default function NewsletterPage() {
  return (
    <div className="prose">
      <h1>メール速報を受け取る</h1>
      <p>毎日18:00に、その日のAIニュース主要トピックを5本に厳選してお届けします。</p>
      <form className="card max-w-md">
        <label className="block mb-2 text-sm">メールアドレス</label>
        <input className="border rounded w-full px-3 py-2" placeholder="you@example.com" />
        <button className="mt-3 px-4 py-2 rounded bg-brand text-white">登録する</button>
        <p className="text-xs text-gray-500 mt-2">※ 実装例のため、このフォームは送信されません。</p>
      </form>
    </div>
  );
}
