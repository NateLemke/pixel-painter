import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css'
import { DrawingProvider } from "./context/DrawingContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pixel Painter",
  description: "A program for drawing pixel art.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-zinc-950 text-white`}>
        <AuthProvider>
            <DrawingProvider>
              {children}
            </DrawingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
