import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/dashboard-client'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { demo?: string }
}) {
  const isDemo = searchParams.demo === 'true'
  
  if (!isDemo) {
    const session = await getSession()
    
    if (!session?.user) {
      redirect('/login')
    }

    return <DashboardClient user={session.user} isDemo={false} />
  }

  // Demo mode with mock user
  return (
    <DashboardClient
      user={{
        id: 'demo-user',
        email: 'demo@welcomehome.com',
        name: 'Demo User',
        image: null,
      }}
      isDemo={true}
    />
  )
}
