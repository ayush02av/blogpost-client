import { setCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Signup() {

    const router = useRouter()

    const [form, setForm] = useState({
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password2: null,
    })

    const inputHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup/`, form)
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
                <title>Signup | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Signup New User</h1>
            </div>

            <div className="container mx-auto w-full sm:w-1/2">
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-semibold focus:outline-none">Username *</label>
                    <input type="text" name="username" id="username" onChange={inputHandler} value={form.username || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myusername" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-semibold focus:outline-none">First Name *</label>
                    <input type="text" name="first_name" id="first_name" onChange={inputHandler} value={form.first_name || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="First" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-semibold focus:outline-none">Last Name *</label>
                    <input type="text" name="last_name" id="last_name" onChange={inputHandler} value={form.last_name || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="Last" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold focus:outline-none">Email *</label>
                    <input type="email" name="email" id="email" onChange={inputHandler} value={form.email || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myemail@mail.com" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold focus:outline-none">Password *</label>
                    <input type="password" name="password" id="password" onChange={inputHandler} value={form.password || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myverystrongpassword" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="password2" className="block mb-2 text-sm font-semibold focus:outline-none">Password Repeat *</label>
                    <input type="password" name="password2" id="password2" onChange={inputHandler} value={form.password2 || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="myverystrongpassword" required autoComplete='off' />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={submitHandler}>Signup</button>
                <br /><br />
                <Link href='/login' className='hover:text-green-800'>Or login here</Link>
            </div>

        </div >
    )
}

Signup.backurl = '/'