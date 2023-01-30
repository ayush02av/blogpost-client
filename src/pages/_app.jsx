import '@/styles/globals.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {

  const router = useRouter()

  return (
    <div className='w-screen min-h-screen bg-green-300 text-black grid place-items-center text-center'>
      <div className="w-3/4 place-items-center text-center justify-items-center">
        {router.pathname != '/' && router.pathname != '/login' && router.pathname != '/signup' && (
          <div className="w-3/4 mx-auto text-left inline">
            <Link href='/' className="text-lg mx-5">Home</Link>
            <Link href='/blog' className="text-lg mx-5">Feed</Link>
            <Link href='/profile' className="text-lg mx-5">Profile</Link>
          </div>
        )}
        {router.pathname != '/' && (
          <div className="w-3/4 mx-auto text-left block">
            {
              Component.backurl ? (
                <Link href={Component.backurl} className="back-icon"></Link>
              ) : (
                <span onClick={router.back} className="back-icon cursor-pointer"></span>
              )
            }
          </div>
        )}
        < Component {...pageProps} />
      </div>
    </div >
  )
}