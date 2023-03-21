import Head from 'next/head'

import Link from 'next/link'

import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router';
import { getSession, useSession, signIn, signOut } from "next-auth/react"
// import clientPromise from "./../lib/mongodb";


export default function Register(){

    const { data: session } = useSession()

   

    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

        // Google Handler function
        async function handleGoogleSignin(){
            signIn('google', { callbackUrl : "http://localhost:3000/user"})
            // let myUser = await db.collection("users").insertOne({
            //     name: `${session.user.name}`,
            //     email: `${session.user.email}`,
            //     password: `${session.user.password}`,
            //     cpassword: `${session.user.cpassword}`,
            // })
            const options = {
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: formik.username,
                    email: formik.email,
                    password: formik.password,
                    cpassword: formik.cpassword,
                })
            }
    
            await fetch('http://localhost:3000/api/auth/signup', options)
                .then(res => res.json())
                .then((data) => {
                    if(data) router.push('http://localhost:3000')
                })
        }
     
     
    
    async function onSubmit(values){
        async function handleGoogleSignin(){
            signIn('google', { callbackUrl : "http://localhost:3000/user"})
            // let myUser = await db.collection("users").insertOne({
            //     name: `${session.user.name}`,
            //     email: `${session.user.email}`,
            //     password: `${session.user.password}`,
            //     cpassword: `${session.user.cpassword}`,
            // })
        }
        console.log(values)
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            })

            // let myUser = await db.collection("users").insertOne(JSON.stringify(values)).then(res => res.json());
    }

    return (
        
<>

        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={` ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='Username'
                    className=""
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
                <div className={` ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className=""
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                <div className={` ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className=""
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

                <div className={` ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className=""
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

                {/* login buttons */}
                <div className="input-button">
                    <button 
                    onClick={onSubmit}
                    type='submit' className="">
                        Sign Up
                    </button>
                </div>

                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className="">
                        Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} alt="."></Image>
                    </button>
                </div>

            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/login'}><a className='text-blue-700'>Sign In</a></Link>
            </p>
        </section>
        </>
    )
}