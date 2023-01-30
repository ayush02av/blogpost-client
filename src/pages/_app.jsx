import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='w-screen min-h-screen bg-green-300 text-black grid place-items-center text-center'>
      <div className="w-3/4 place-items-center text-center justify-items-center">
        <Component {...pageProps} />
      </div>
    </div>
  )
}