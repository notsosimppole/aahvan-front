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

        <div className='bg-[#101010] h-screen text-white'>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className="title flex items-center justify-center flex-col">
                    <h1 className='text-[#FFB124] text-6xl font-bold pt-12 stencil'>Register</h1>
                </div>
                {/* form */}
                <form className='flex flex-col gap-5 w-3/4 mx-auto' onSubmit={formik.handleSubmit}>
                    <div className={` ${formik.errors.username && formik.touched.username ? 'flex items-center justify-center border-rose-600' : ''}`}>
                        <span className='icon flex items-center pb-2'>
                            <p className='text-sm text-gray-400'>
                                Name
                            </p>
                        </span>
                        <input
                        type="text"
                        name='Username'
                        placeholder='Username'
                        className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
                        {...formik.getFieldProps('username')}
                        />
                        
                    </div>
                    {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
                    <div className={` ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <span className='icon flex items-center pb-2'>
                            <p className='text-sm text-gray-400'>
                                Email
                            </p>
                        </span>
                        <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
                        {...formik.getFieldProps('email')}
                        />
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                    <div className={` ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                        <span className='icon flex items-center pb-2'>
                            <p className='text-sm text-gray-400'>
                                Password
                            </p>
                        </span>
                        <div className='flex'>
                            <input
                            type={`${show.password ? "text" : "password"}`}
                            name='password'
                            placeholder='password'
                            className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
                            {...formik.getFieldProps('password')}
                            />
                            <span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({ ...show, password: !show.password})}>
                            <HiFingerPrint size={25} />
                            </span>
                        </div>
                    </div>
                    {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                    <div className={` ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                        <span className='icon flex items-center pb-2'>
                            <p className='text-sm text-gray-400'>
                                Confirm Password
                            </p>
                        </span>
                        <div className='flex'>
                            <input
                            type={`${show.cpassword ? "text" : "password"}`}
                            name='cpassword'
                            placeholder='Confirm Password'
                            className="w-full bg-transparent border-2 py-2 px-2 rounded-lg border-[#BDA54F] outline-none"
                            {...formik.getFieldProps('cpassword')}
                            />
                             <span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                    </div>
                    {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}
                    {/* login buttons */}
                    <div className='flex justify-center gap-8 md:flex-row flex-col'>
                        <div className="input-button ">
                            <button
                            onClick={onSubmit}
                            type='submit' className="
                            border-2 border-[#BDA54F] py-2 px-4 rounded-lg hover:border-transparent hover:bg-[#BDA54F] hover:text-[#101010]
                            ">
                                Sign Up
                            </button>
                        </div>
                        <div className="input-button">
                            <button type='button' onClick={handleGoogleSignin} className="
                            border-2 border-[#BDA54F] py-2 px-4 rounded-lg hover:border-transparent hover:bg-[#BDA54F] hover:text-[#101010] flex items-center justify-center gap-2
                            ">
                                Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} alt="."></Image>
                            </button>
                        </div>
                    </div>
                </form>
                {/* bottom */}
                <p className='text-center text-gray-400 '>
                    Have an account? <Link href={'/login'}><a className='text-blue-700'>Sign In</a></Link>
                </p>
            </section>
        </div>
        </>
    )
}