import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/router'
import { MongoClient } from 'mongodb';

const Profile = ({users}) => {
    console.log(users)
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

// export async function getStaticProps(context){
//     const { data: session } = useSession()

//     const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
//     const todoCollection = client.db("wtf").collection("users")
//     const myuser = await todoCollection.findOne({email: session?.user?.email})
//     client.close()
//     return {
//       props:{
//         users : {
//             name: myuser.name,
//             email: myuser.email,
//             filename: myuser.filename,
//             college:myuser.college,
//             image: myuser.image,
//             id: myuser._id.toString()
//           }
//       },
//       revalidate: 60
//     }
//   }