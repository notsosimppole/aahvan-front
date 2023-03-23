import React, {useState} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/router'


const Profile = ({users}) => {
    console.log(users)
    const { data: session } = useSession()
    const { push, asPath } = useRouter()

    const [college, setCollege] = useState("")
    const [file, setFile] = useState("")
 
	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })

		push(data.url)
	}
    
    const handleSubmit = async () => {
        console.log("hello for now")

        let data = await fetch("http://localhost:3000/api/user", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session.user.email,
                college: college, 
                filename: file
            })
        })


    }

	const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)
  return (
    <>
    <div>Profile</div>
    {
        session ? (<>You are logged in {session.user.email}
         

         <div>
        <p>Your info : </p>
        <p>college :  DTU </p>
        <p>last uploaded file : Something</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            College
          </label>
          <input
            type="text"
            className="bg-slate-300 rounded-md"
             value={college} onChange={(e)=>setCollege(e.target.value)}
          />

          <label>
            File
          </label>
          <input
          className="bg-slate-300 rounded-md"
            type="text" value={file} onChange={(e)=>setFile(e.target.value)}
          />

          <button type="submit">
            Submit
          </button>
        </form>
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