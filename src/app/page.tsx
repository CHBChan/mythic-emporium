import Link from "next/link";
import Header from "./components/header";

export default function Home() {

  return (
    <div className='content'>
      <Header />
      <button>
        <Link href='/InventoryManagement'>Admin</Link>
      </button>
    </div>
  )
}
