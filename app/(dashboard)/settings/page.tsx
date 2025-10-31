
import UserSettings from '@/components/user-settings'
// import { currentUser } from '@/lib/custom-auth'
import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const SettingPage = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });


  if (!session) redirect("/auth/login");

  const user = session.user;

  const content = (<UserSettings user={user!} />)


  return (
    <>
    {content}    
    </>
    
  )
}

export default SettingPage