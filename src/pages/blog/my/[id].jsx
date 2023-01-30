import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function My() {
    const router = useRouter()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        if (router.query.id) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/blog/${router.query.id}`, {
                headers: {
                    Authorization: getCookie('token')
                }
            })
                .then((res) => {
                    setBlog(res.data.blog)
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
        }

    }, [router.query])

    const deleteHandler = () => {
        Swal.fire({
            icon: 'question',
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Delete blog?',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        })
            .then((res) => {
                if (res.isConfirmed) {
                    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/blog/${router.query.id}`, {
                        headers: {
                            Authorization: getCookie('token')
                        }
                    })
                        .then((res) => {
                            Swal.fire({
                                icon: 'success',
                                text: 'Blog deleted'
                            })
                                .then(() => {
                                    router.push('/profile')
                                })
                        })
                        .catch((error) => {
                            router.push('/blog/my')
                        })
                }
            })
    }

    return (
        <div className="container">
            <Head>
                <title>{blog ? blog.title : 'My Blogs'} | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">My blogs</h1>
            </div>

            {blog && (
                <div className="mx-auto w-full sm:w-1/2 h-96">
                    <div className="container mx-auto bg-red-100 p-5 mb-5 rounded-sm overflow-y-scroll h-96 text-left">
                        <span className="font-bold text-xl">{blog.title}</span>
                        <p>{blog.content}</p>
                    </div>
                    <Link href={`/blog/my/edit/${blog.id}`} className="text-white bg-blue-700 mx-5 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Edit</Link>
                    <button type="submit" className="text-white bg-red-700 mx-5 hover:bg-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={deleteHandler}>Delete</button>
                </div>
            )}

        </div>
    )
}
