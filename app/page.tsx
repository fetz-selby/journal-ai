import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()
  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">the best journal book</h1>
        <p className="text-2xl text-white/60 mb-4">
          This is the best app for tracking your mood till the rest of your
          life, just be honest!
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 py-4 px-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
