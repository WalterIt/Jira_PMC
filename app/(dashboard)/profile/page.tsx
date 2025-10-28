
import { auth } from '@/auth'
import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { UserInfo } from '@/components/user-info'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Profile = async  () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

    const user = session?.user;

    if (!session) redirect("/login");

    const FULL_POST_ACCESS = await auth.api.userHasPermission({
      headers: headersList,
      body: {
        permissions: {
          posts: ["update", "delete"],
        },
      },
    });



  return (
    <>
      <UserInfo label="📱 Profile Client Component" user={user} />
      <h1 className='text-3xl text-bold text-slate-900'>PROFILE</h1>
      <h2 className="text-2xl font-bold">Permissions</h2> 

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </>
  );
}

export default Profile