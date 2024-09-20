"use client"
import { useAuth } from "./context/AuthContext"
import LoginPage from "./components/loginPage"
import MainPage from "./components/mainPage"


export default function Home() {
  const {currentUser} = useAuth();

  return (
    <div className="w-screen h-screen flex">
      {!currentUser && <LoginPage/>}
      {currentUser && <MainPage/>}
    </div>
  );
}
