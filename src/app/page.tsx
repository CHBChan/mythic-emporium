import Link from "next/link"

export default function Home() {

  return (
    <div className="content">
      <button>
        <Link href='/InventoryManagement'>Admin</Link>
      </button>
    </div>
  )
}
