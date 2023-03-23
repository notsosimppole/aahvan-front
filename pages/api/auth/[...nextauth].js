import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

import clientPromise from './../../../database/connectDB'



export default NextAuth({
	providers: [
		
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		
	],
	pages: {
		signIn: '/auth/signin',
	},
	adapter: MongoDBAdapter(clientPromise),
})