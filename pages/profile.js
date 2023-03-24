import React, {useState, useEffect} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/router'


const Profile = ({users}) => {
    // console.log(users)
    const { data: session } = useSession()
    const { push, asPath } = useRouter()

    const [college, setCollege] = useState("")
    const [file, setFile] = useState("")

    const [myuserdata, setMyuserData] = useState([])
 
	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })

		push(data.url)
	}
    
    const handleSubmit = async () => {
        // console.log("hello for now")

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

    const fetchUser = async () => {
      // setLoading(true);
  
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        
          const result = await response.json();
          setMyuserData(result.result);
       
      } catch (err) {
        alert(err);
      } 
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

    // const userData = myuserdata.filter((user) => user.email === session?.user?.email)[0]

    // console.log(myuserdata.filter((user) => user.email === session?.user?.email)[0])

	const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)
  return (
    <>
    {
        session ? (<div
        className='w-full h-screen bg-[#101010] text-white flex flex-col items-center font-inter'
        >
        <span
        className='text-2xl pt-4 font-bold text-[#FFB124] pb-10'
        >Welcome, {session.user.name}</span>
        <div
        className='w-10/12 px-10 py-5'
        >
          <div
          className='text-2xl font-bold text-[#FFB124] pb-5 stencil uppercase'
          >Profile</div>
          <p>Your info : </p>
         
          <p>college : {myuserdata.filter((user) => user.email === session?.user?.email)[0].college} </p>
          <p>last uploaded file : {myuserdata.filter((user) => user.email === session?.user?.email)[0].filename}</p>
         
        
        </div>
        <form onSubmit={handleSubmit} 
        className='w-10/12 px-10 py-5 bg-[#1F1F1F] rounded-md flex flex-col gap-5'
        >
            <label>
              College
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
              value={college} onChange={(e)=>setCollege(e.target.value)}
            />

            <label>
              File
            </label>
            <input
            className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
              type="text" value={file} onChange={(e)=>setFile(e.target.value)}
            />

            <button type="submit" className='bg-[#FFB124] border-2 border-[#FFB124] text-black py-3 rounded-md mt-5 font-inter font-semibold hover:bg-transparent hover:text-[#FFB124] transition duration-200 ease-in-out w-full max-w-[300px] self-center'>
              Submit
            </button>
        </form>
        <div className='w-10/12 px-10'>
          <button onClick={handleSignOut}
            className='bg-[#FFB124] border-2 border-[#FFB124] text-black py-3 rounded-md mt-5 font-inter font-semibold hover:bg-transparent hover:text-[#FFB124] transition duration-200 ease-in-out w-full max-w-[300px] text-xl'
          >
              Sign Out
          </button>
        </div>
         </div>) : (<> 
         <div className='w-full h-screen bg-black text-white flex flex-col items-center justify-center'>
             <h1 className='text-6xl font-bold stencil text-[#FFB124] pb-10 uppercase'>Profile</h1>
              <p
              className='text-2xl font-thin font-inter'
              >You are not logged in</p>
              <button onClick={handleSignIn}
              className='bg-[#FFB124] border-2 border-[#FFB124] text-black py-3 rounded-md mt-5 font-inter font-semibold hover:bg-transparent hover:text-[#FFB124] transition duration-200 ease-in-out w-full max-w-[300px]'
              >Sign In</button>
         </div>
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