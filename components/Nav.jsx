"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Nav = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, [])


    return (
        <nav className="flex justify-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 items-center">
                <Image
                    src="/assets/images/logo.svg" 
                    alt="flathunt"
                    width={30}
                    height={30}
                    className="object-contain"/>
                <p className="logo_text">
                    CFAConnect
                </p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex gap-3 md:gap-5">
                {session?.user ? (
                    <div className="flex items-center gap-3">
                        <Link href="/create-prompt" className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white">
                            Ask a Question
                        </Link>

                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"/>
                        </Link>
                    </div>
                ):(
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex sm:hidden relative">
                {session?.user ? (
                    <div className="flex items-center">
                        <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full cursor-pointer"
                        alt="profile"
                        onClick={() => setToggleDropDown(prev => !prev)}
                        />
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}>
                                    Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        router.push("/");
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))}  
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav;