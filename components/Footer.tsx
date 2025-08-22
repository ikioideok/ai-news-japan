import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container-max py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div>&copy; {new Date().getFullYear()} AI News Japan</div>
        <div className="flex gap-4">
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシー</Link>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
