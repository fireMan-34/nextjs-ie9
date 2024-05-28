import { signIn, signOut, useSession } from "next-auth/react";

const UserSettings = () => {
  const { data: session } = useSession();
  
  if (!session) {
    return <main>
      Not Signed In <br />
      <button onClick={() => signIn()} >Sign In</button>
    </main>
  }

  return (
    <main>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign Out</button>
    </main>
  )
};

export default UserSettings;