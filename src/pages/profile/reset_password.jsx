import { setCookie, getCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Resetpassword() {

    const router = useRouter()

    const [form, setForm] = useState({
        old_password: null,
        new_password: null,
    })

    const inputHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = () => {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/reset_password/`, form, {
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
                        router.push('/profile')
                    })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data ? typeof (error.response.data) == 'string' ? error.response.data.message : 'Invalid password' : 'Wrong password'
                })
            })
    }

    return (
        <div className="container">
            <Head>
                <title>Reset Password | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            </div>

            <div className="container mx-auto w-full sm:w-1/2">
                <div className="mb-5">
                    <label htmlFor="old_password" className="block mb-2 text-sm font-semibold focus:outline-none">Old Password *</label>
                    <input type="old_password" name="old_password" id="old_password" onChange={inputHandler} value={form.old_password || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="oldpassword" required autoComplete='off' />
                </div>
                <div className="mb-5">
                    <label htmlFor="new_password" className="block mb-2 text-sm font-semibnew focus:outline-none">New Password *</label>
                    <input type="new_password" name="new_password" id="new_password" onChange={inputHandler} value={form.new_password || ""} className="border text-sm rounded-lg block w-full focus:outline-none p-2.5" placeholder="newpassword" required autoComplete='off' />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={submitHandler}>Reset</button>
                <br /><br />
            </div>

        </div >
    )
}

Resetpassword.backurl = '/profile'