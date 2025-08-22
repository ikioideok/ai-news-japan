import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="font-extrabold text-xl">AI News Japan</Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/news">ニュース</Link>
          <Link href="/features">特集</Link>
          <Link href="/tools">ツールDB</Link>
          <Link href="/newsletter">メール速報</Link>
          <Link href="/about">運営</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}
