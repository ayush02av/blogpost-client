import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function My() {

    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/public/blog/`)
            .then((res) => {
                console.log(res.data)
                // setBlogs(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="container">
            <Head>
                <title>Feed | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">My Blogs</h1>
            </div>

        </div>
    )
}
