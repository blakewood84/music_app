import type { Metadata } from "next";
import "./globals.css";
import { Nav, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Music App",
	description: "A music app built with Next.js.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Nav />
				<main className="min-h-[calc(100vh-76px)]">{children}</main>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
