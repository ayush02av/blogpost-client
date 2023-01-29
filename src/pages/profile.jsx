import { getCookie, removeCookie } from '@/utils/cookies'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Profile() {

    const router = useRouter()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile/`, {
            headers: {
                Authorization: getCookie('token')
            }
        })
            .then((res) => {
                setProfile(res.data.user)
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

    const logoutHandler = () => {
        removeCookie('token')
        router.push('/')
    }

    return (
        <div className="container">
            <Head>
                <title>Profile | BlogPost</title>
            </Head>

            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-2">My Profile</h1>
            </div>

            {profile && (
                <table className='mx-auto text-left mb-10'>
                    <tr>
                        <th>Id&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th>:</th>
                        <td>{profile.id}</td>
                    </tr>
                    <tr>
                        <th>Email&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th>:</th>
                        <td>{profile.email}</td>
                    </tr>
                    <tr>
                        <th>Username&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th>:</th>
                        <td>{profile.username}</td>
                    </tr>
                </table>
            )}

            <Link href='/blogs/all' className="text-white bg-blue-700 mx-5 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Check Feed</Link>
            <Link href='/blogs/my' className="text-white bg-blue-700 mx-5 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">My Blogs</Link>
            <Link href='/blogs/new' className="text-white bg-green-700 mx-5 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">New Blog</Link>
            <br /><br />
            <button type="submit" className="text-white bg-yellow-500 mx-5 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={logoutHandler}>Reset Password</button>
            <button type="submit" className="text-white bg-red-700 mx-5 hover:bg-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={logoutHandler}>Logout</button>

        </div>
    )
}