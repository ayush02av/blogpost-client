import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function All() {
    const router = useRouter()

    useEffect(() => {
        router.push('/blogs/all/1')
    }, [])

    return null
}
