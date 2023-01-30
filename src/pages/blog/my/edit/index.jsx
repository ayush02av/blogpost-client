import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function My() {
    const router = useRouter()

    useEffect(() => { router.push('/blog/my') })

    return null
}
