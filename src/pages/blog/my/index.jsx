import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function My() {
    const router = useRouter()
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/blog/`, {
            headers: {
                Authorization: getCookie('token')
            }
        })
            .then((res) => {
                setBlogs(res.data.blogs)
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.message
                })
                    .then(() => {
                        router.push('/login')
                    })
            })

    }, [])

    return (
        <div className="container">
            <Head>
                <title>My Blogs | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">My blogs</h1>
            </div>

            {blogs && (
                <div className="container mx-auto w-full sm:w-1/2 overflow-y-scroll h-96 text-left">
                    {blogs.map((blog, index) => (
                        <Link href={`/blog/my/${blog.id}`} key={index} className="block bg-red-100 m-5 p-5 rounded-md">
                            <span className="font-semibold">{index + 1}. {blog.title}</span>
                            <p>{blog.content.slice(0, 20)}</p>
                        </Link>
                    ))}
                </div>
            )}

        </div>
    )
}
