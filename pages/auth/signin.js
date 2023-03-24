import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
	Button,
	Heading,
	VStack,
} from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { BsGoogle } from 'react-icons/bs'

const providers = [
	
	{
		name: 'google',
		Icon: BsGoogle,
	},
]

const Signin = () => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [email, setEmail] = useState('')

	// console.log(session)
	if (status === 'loading') return <Heading>Checking Authentication...</Heading>

	if (session) {
		setTimeout(() => {
			push('/profile')
		}, 5000)

		return (<Heading><div className='h-screen flex items-center justify-center bg-[#101010] text-white text-4xl'>
			You have been signed in! Redirecting you to the profile page...
		</div></Heading>)
	}

	const handleOAuthSignIn = (provider) => () => signIn(provider)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email) return false

		signIn('email', { email, redirect: false })
	}

	return (
		<Box>

			<div className='h-screen items-center justify-center flex bg-[#101010] text-white font-inter'>
				<VStack>
					{providers.map(({ name, Icon }) => (
						<Button
							key={name}
							leftIcon={<Icon />}
							onClick={handleOAuthSignIn(name)}
							textTransform='uppercase'
							w='100%'
							className='bg-[#FFB124] border-2 border-[#FFB124] text-black px-4 py-3 rounded-md mt-5 font-inter font-semibold hover:bg-transparent hover:text-[#FFB124] transition duration-200 ease-in-out'
						>
							Sign in with {name}
						</Button>
					))}
				</VStack>
			</div>
		</Box>
	)
}

export default Signin