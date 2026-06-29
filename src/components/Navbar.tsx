"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Ghost } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <nav className="border-b border-white/8 bg-black/20 backdrop-blur-xl">
      <div className="page-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-200 shadow-[0_0_32px_rgba(124,58,237,0.22)]">
              <Ghost className="size-4" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-tight">unsaid</p>
              <p className="text-xs text-white/45">anonymous, but intentional</p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {session ? (
            <>
              <div className="text-sm text-white/55">
                Welcome, <span className="font-medium text-white">{user?.username || user?.email}</span>
              </div>
              <Button
                variant="outline"
                className="border-white/12 bg-white/5 text-white hover:bg-white/10"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full sm:w-auto">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
