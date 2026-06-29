"use client";

import Link from "next/link";
import { Ghost } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="page-shell pt-4 sm:pt-6">
      <div className="neo-panel flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3 text-[#201a28]">
            <span className="ghost-mark shrink-0">
              <Ghost className="size-5" />
            </span>
            <div>
              <p className="text-3xl font-black tracking-[-0.06em] lowercase leading-none">
                unsaid
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#7f7690]">
                say it, anonymously
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#201a28]">
            <Link
              href="/"
              className="rounded-2xl border-[2.5px] border-[#26222c] bg-[#b687ff] px-4 py-2 shadow-[0_4px_0_0_rgba(38,34,44,0.18)] transition hover:-translate-y-0.5"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl px-4 py-2 transition hover:bg-[#f1ecdf]"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {session ? (
            <>
              <div className="text-sm text-[#5f566e]">
                Signed in as{" "}
                <span className="font-semibold text-[#201a28]">
                  {user?.username || user?.email}
                </span>
              </div>
              <Button
                variant="outline"
                className="neo-button-secondary h-11 border-[#26222c] bg-white px-5 text-[#201a28] hover:bg-[#fff7d7]"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button className="neo-button-secondary h-11 w-full border-[#26222c] bg-white px-5 text-[#201a28] hover:bg-[#fff7d7] sm:w-auto">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="neo-button h-11 w-full border-[#26222c] px-5 text-[#201a28] hover:bg-[#a977ff] sm:w-auto">
                  Get your link
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
