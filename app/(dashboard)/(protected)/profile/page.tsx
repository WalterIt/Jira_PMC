
import { auth } from '@/auth'
import { UserButton } from '@/components/auth/user-button'
import { UserInfo } from '@/components/user-info'
import { headers } from 'next/headers'

const Profile = async  () => {
    const session = await auth.api.getSession({
      headers: await headers()
    }) 
    const user = session?.user;

    if (!session) {
      return <p className="text-destructive">Unauthorized</p>;
    }

  return (
    <>
      <h1 className='text-3xl text-bold text-slate-900'>PROFILE</h1>
       <UserButton user={user}/>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
      <UserInfo label="📱 Profile Client Component" user={user} />
    </>
  );
}

export default Profile