import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans ">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="text-black">
                  create
                </span>
              </Link>
              <form action={async () =>{
                "use server";
                await signOut({redirectTo: '/'});
                }
              }>
                <button type="submit">
                  <span className="text-black">Sign Out</span>
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span className="text-black">{session?.user?.name}</span>
              </Link>
            </>
          ) : (<form action={async ()=>{
            "use server";
            await signIn('github')}
          }>
            <button type="submit" className="text-black">Login</button>
          </form>)}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;