import dynamic from 'next/dynamic'

const QubitSimulator = dynamic(
  () => import('../components/QubitSimulator'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <QubitSimulator />
    </main>
  )
}