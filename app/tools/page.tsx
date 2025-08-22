"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { tools } from "@/lib/data";

export const metadata = { title: "AIツールDB" } as const;

export default function ToolsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const cats = useMemo(() => ["all", ...Array.from(new Set(tools.map(t => t.category)))], []);
  const list = useMemo(() => tools.filter(t =>
    (cat === "all" || t.category === cat) &&
    (q === "" || (t.name + t.summary + t.vendor).toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AIツールDB</h1>
      <div className="flex gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="検索..." className="border rounded px-3 py-2 w-full max-w-sm" />
        <select value={cat} onChange={e=>setCat(e.target.value)} className="border rounded px-3 py-2">
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {list.map(t => (
          <div key={t.slug} className="card">
            <div className="text-xs text-gray-500">{t.category}</div>
            <h3 className="font-semibold"><Link href={`/tools/${t.slug}`}>{t.name}</Link></h3>
            <p className="text-sm text-gray-600">{t.summary}</p>
            <div className="mt-2 text-xs">¥{t.price}/月 ・ {t.vendor}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
