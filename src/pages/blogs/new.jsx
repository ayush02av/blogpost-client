import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function New() {

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
                <title>New Blog | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Post new blog</h1>
            </div>

        </div>
    )
}
