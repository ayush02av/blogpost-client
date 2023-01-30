import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function New() {

    const router = useRouter()

    const [form, setForm] = useState({
        title: null,
        content: null
    })

    const inputHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/blog/`, form, {
            headers: {
                Authorization: getCookie('token')
            }
        })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    text: res.data.message
                })
                    .then(() => {
                        router.push('/blog/my')
                    })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.message
                })
                    .then(() => {
                        router.push('/blog/new')
                    })
            })
    }

    return (
        <div className="container">
            <Head>
                <title>New Blog | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Post new blog</h1>
            </div>

            <div className="container mx-auto w-full sm:w-1/2">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-semibold focus:outline-none">Title *</label>
                    <input type="text" name="title" id="title" onChange={inputHandler} value={form.title || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="My very nice blog" maxLength={100} required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="content" className="block mb-2 text-sm font-semibold focus:outline-none">content *</label>
                    <textarea type="content" name="content" id="content" onChange={inputHandler} value={form.content || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" rows='10' placeholder="My blog is about how this application is so good" required autoComplete='off' />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={submitHandler}>Submit</button>
            </div>

        </div >
    )
}
