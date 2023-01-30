import { setCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Login() {

    const router = useRouter()

    const [form, setForm] = useState({
        username: null,
        password: null
    })

    const inputHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/`, form)
            .then((res) => {
                setCookie('token', res.data.token, 30)
                Swal.fire({
                    icon: 'success',
                    text: res.data.message
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
            })
    }

    return (
        <div className="container">
            <Head>
                <title>Login | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Login User</h1>
            </div>

            <div className="container mx-auto w-full sm:w-1/2">
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-semibold focus:outline-none">Username *</label>
                    <input type="text" name="username" id="username" onChange={inputHandler} value={form.username || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myusername" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold focus:outline-none">Password *</label>
                    <input type="password" name="password" id="password" onChange={inputHandler} value={form.password || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myverystrongpassword" required autoComplete='off' />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={submitHandler}>Login</button>
                <br /><br />
                <Link href='/signup' className='hover:text-green-800'>Or create a new user here</Link>
            </div>
        </div >
    )
}

Login.backurl = '/'