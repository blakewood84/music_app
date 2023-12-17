import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import StoreProvider from '@/app/StoreProvider'

export const metadata: Metadata = {
  title: 'Music App',
  description: 'A music app built with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {

  return (
		<StoreProvider>
			<html lang="en">
				<body>
					<Nav />
					<main className="min-h-[calc(100vh-76px)]">{children}</main>
					<Footer />
				</body>
			</html>
		</StoreProvider>
  );
}
