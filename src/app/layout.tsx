import type { Metadata } from "next";
import "./globals.css";
import "toastr/build/toastr.min.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
			</body>
		</html>
	);
}
