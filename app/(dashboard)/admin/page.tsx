
// import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card,CardContent,CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';    
import { admin } from '@/actions/admin';
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from '@/auth';
import { DeleteUserButton, PlaceholderDeleteUserButton } from './_components/delete-user-button';
import { UserRoleSelect } from './_components/user-role-select';
import { UserRole } from '@/generated/prisma/client';

const AdminPage = async () => {

  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/login");


  if (session.user.role !== "ADMIN") {
    return (
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          {/* <ReturnHomeButton /> */}

          <h1 className="text-3xl font-bold">🔑 Admin Dashboard</h1>

          <p className="p-2 rounded-md text-lg bg-red-600 text-muted-100 font-bold">
            UNAUTHORIZED! You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: "name",
    },
  });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return 0;
  });



    // function onClickServerAction() {
    //     admin()
    //         .then((res) => {
    //             if(res.success) {
    //                 toast.success("Server Action Allowed!")
    //             } else {
    //                 toast.error("Server Action Denied!")
    //             }
    //         })
    // }

        

    // function onClickApiRoute() {
    //     fetch('/api/admin')
    //         .then((res) => {
    //             if(res.ok) {
    //                 toast.success("Api Route Allowed!")
    //             } else {
    //                 toast.error("Api Route Denied!")
    //             }
    //         })
    // }


  return (
    <>
    <Card className='w-[600px]'> 
        <CardHeader>
            <p className='text-2xl text-center font-bold'>🔑 Admin</p>
        </CardHeader>
        <CardContent>
            {/* <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message='You have permission to access this content!' />
            </RoleGate> */}
            <div className='flex border flex-row p-3 rounded-lg shadow-md items-center justify-between mt-4'>
                <p className='font-semibold'>Admin-only API Route</p>
                <Button >Click to test</Button>
                {/* <Button onClick={()=>{}}>Click to test</Button> */}
            </div>

            <div className='flex border p-3 rounded-lg shadow-md items-center justify-between mt-4'>
                <p className='font-semibold'>Admin-only Server Action</p>
                <Button >Click to test</Button>
            </div>
        </CardContent>
    </Card>

    <div className="px-8 py-16 bg-white border border-gray-300 rounded-lg mx-auto max-w-5xl space-y-8">
  
      {/* <div className="space-y-4">
        <ReturnHomeButton />

        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div> */}

      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
                {/* <td className="px-4 py-2 text-center">
                  DELETE
                </td> */}
                <td className="px-4 py-2 text-center">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </>
  )
}

export default AdminPage