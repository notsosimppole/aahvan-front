import React from 'react'
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react"

const UserPage = () => {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
    <section className="container mx-auto text-center">
                <h3 className="text-4xl font-bold">Profile Page</h3>

                <Link href={"/"}>Home Page</Link>

                {session ? User({ session, handleSignOut }) : null}
        </section>
  )
}

export default UserPage


function User({ session, handleSignOut }){
    return(
      <main className="container mx-auto text-center py-20">
            <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>
  
            <div className='details'>
              <h5>{session.user.name}</h5>
              <h5>{session.user.email}</h5>
            </div>
  
            <div className="flex justify-center">
              <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
            </div>
  
            <div className='flex justify-center'>
              <Link href={'/profile'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</a></Link>
            </div>
        </main>
    )
  }

export async function getServerSideProps({ req }){
    const session = await getSession({ req })

    if(!session){
        return {
            redirect : {
                destination : "/login",
                premanent: false
            }
        }
    }
    // authorize user return session
    return {
        props: { session }
    }
}