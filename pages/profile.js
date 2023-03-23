import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/router'


const Profile = () => {
    const { data: session } = useSession()
    const { push, asPath } = useRouter()

	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })

		push(data.url)
	}

	const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)
  return (
    <>
    <div>Profile</div>
    {
        session ? (<>You are logged in {session.user.email}

        
        <button onClick={handleSignOut}>
            Sign Out
        </button>
         </>) : (<> You are not logged in
        <button onClick={handleSignIn}>Sign In</button>
        </>)
    }


     </>
  )
}

export default Profile