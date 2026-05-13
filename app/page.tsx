"use client"
import { useState } from "react"

export default function Page() {
  const [isbn, setIsbn] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    setResult(null)
    const apiKey = process.env.NEXT_PUBLIC_CALIL_API_KEY
    // 流山市図書館のシステムID: Chiba_Nagareyama
    const url = `https://api.calil.jp/check?appkey=${apiKey}&isbn=${isbn}&systemid=Chiba_Nagareyama&format=json&callback=no`
    const res = await fetch(url)
    const data = await res.json()
    const status = data.books[isbn]?.Chiba_Nagareyama?.status
    setResult(status === "OK" ? "蔵書あり✅" : status === "empty" ? "貸出中📖" : "蔵書なし❌")
    setLoading(false)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "80px" }}>図書館検索サービス</h1>
      <p style={{ fontSize: "20px" }}>ISBNを入力して流山市図書館の蔵書を検索</p>
      <input
        type="text"
        placeholder="ISBNを入力（例：9784101092058）"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        style={{ fontSize: "20px", padding: "8px", width: "400px" }}
      />
      <br /><br />
      <button onClick={search} style={{ fontSize: "20px", padding: "8px 24px" }}>
        検索
      </button>
      {loading && <p>検索中...</p>}
      {result && <p style={{ fontSize: "30px" }}>{result}</p>}
    </div>
  )
}
