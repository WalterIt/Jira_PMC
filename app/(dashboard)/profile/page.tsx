
import { auth } from '@/auth'
import { UserButton } from '@/components/auth/user-button'
import { UserInfo } from '@/components/user-info'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Profile = async  () => {
    const session = await auth.api.getSession({
      headers: await headers()
    }) 
    const user = session?.user;

    if (!session) redirect('/login');

  return (
    <>
      <UserInfo label="📱 Profile Client Component" user={user} />
      <h1 className='text-3xl text-bold text-slate-900'>PROFILE</h1>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </>
  );
}

export default Profile