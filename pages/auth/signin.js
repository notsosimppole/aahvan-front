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

	console.log(session)
	if (status === 'loading') return <Heading>Checking Authentication...</Heading>

	if (session) {
		setTimeout(() => {
			push('/profile')
		}, 5000)

		return (<Heading>you are signed in.... wait we are redirecting you to profile page</Heading>)
	}

	const handleOAuthSignIn = (provider) => () => signIn(provider)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email) return false

		signIn('email', { email, redirect: false })
	}

	return (
		<Box>

			<VStack>
				{providers.map(({ name, Icon }) => (
					<Button
						key={name}
						leftIcon={<Icon />}
						onClick={handleOAuthSignIn(name)}
						textTransform='uppercase'
						w='100%'
					>
						Sign in with {name}
					</Button>
				))}
			</VStack>
		</Box>
	)
}

export default Signin