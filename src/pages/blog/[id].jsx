import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Blog() {
    const router = useRouter()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        if (router.query.id) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/public/blog/${router.query.id}`)
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
                            console.log(res)
                            Swal.fire({
                                icon: 'success',
                                text: 'Blog deleted'
                            })
                                .then(() => {
                                    router.push('/profile')
                                })
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                text: error.response.data.message
                            })
                                .then(() => {
                                    router.push('/blog/my')
                                })
                        })
                }
            })
    }

    return (
        <div className="container">
            <Head>
                <title>{blog && blog.title} | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Blogs: {blog?.title}</h1>
                <h4 className="text-lg mb-2">By: {blog?.author?.username}</h4>
            </div>

            {blog && (
                <div className="mx-auto w-full sm:w-1/2 h-96">
                    <div className="container mx-auto bg-red-100 p-5 mb-5 rounded-sm overflow-y-scroll h-96 text-left">
                        <span className="font-bold text-xl">{blog.title}</span>
                        <p>{blog.content}</p>
                    </div>
                </div>
            )}

        </div>
    )
}