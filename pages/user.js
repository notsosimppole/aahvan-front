import React, {useState} from 'react'
import Link from "next/link";
import { getSession } from 'next-auth/react'


const User = ({session}) => {

    const [form, setForm] = useState({
        username: session.user.name,
        email: session.user.email, 
        file: "",
        college: ""
    })

   

    const [name, setName] = useState(session.user.name)
    const [email, setEmail] = useState(session.user.email)
    const [file, setFile] = useState("")
    const [college, setCollege] = useState("")

    async function onSubmit(){
        // console.log(values)
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: name,
                email: email,
                file: file,
                college: college,
            })
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            }).catch((err) => console.log(err))

            // let myUser = await db.collection("users").insertOne(JSON.stringify(values)).then(res => res.json());
    }


  return (
    <div>User
    <div>
    <div> {form.username}</div>
       <div> {form.email}</div>

        <form>
     

        <div>
            File 
            <input
                type="text" value={file}
                onChange={(e) => setFile(e.target.value)}
            />

            College 
            <input
                type="text" value={college}
                onChange={(e) => setCollege(e.target.value)}  
            />

            <button type="submit" onClick={()=> {
                const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: name,
                email: email,
                file: file,
                college: college,
            })
        }

         fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            }).catch((err) => console.log(err))
            }}>
                 submit
            </button>
        </div>
            
        </form>
    </div>
    {/* <form >
      <div>
        <input
           
        />
      </div>
    </form> */}
    </div>
  )
}

export default User


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