import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";

function useUser() {
  const [ user, setUser ] = useState(null);
  const router = useRouter();

  const hasUser = useMemo(()=> !!user && user.isLoggedIn, [user]);

  useEffect(() => {
    if (!user?.isLoggedIn) {
      router.replace({
        pathname: '/login',
        query: {
          from: location.href,
        }
      })
    }

  }, [user, router]);

  return {
    user,
    hasUser,
    setUser,
  }
}

// 客户端渲染
function ProfilePage () {
  const { user, hasUser } = useUser();

  if (!hasUser) {
    return <main>
      Loading
    </main>
  }


  return (
    <main>
      <h1>
        Your Profile
      </h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  )
}

export default ProfilePage;