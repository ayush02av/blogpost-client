import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>BlogPost</title>
      </Head>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">BlogPost</h1>
        <h3 className="text-xl font-semibold">Free online blogging</h3>
      </div>

      <Link href="/blogs/all" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Feed</Link>
      <br /><br />
      <Link href="/profile" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">My Profile</Link>
    </div>
  )
}
