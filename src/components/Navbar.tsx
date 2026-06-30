"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ghost } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user: User = session?.user;
  const dashboardHref = session ? "/dashboard" : "/sign-in";
  const isHomeActive = pathname === "/";
  const isDashboardActive = pathname === "/dashboard";

  return (
    <nav className="page-shell pt-3 sm:pt-4 md:pt-6">
      <div className="neo-panel flex flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3 text-[#201a28]">
            <span className="ghost-mark shrink-0">
              <Ghost className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-black tracking-[-0.06em] lowercase leading-none sm:text-3xl">
                unsaid
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#7f7690] sm:text-xs sm:tracking-[0.2em]">
                say it, anonymously
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#201a28] sm:text-sm">
            <Link
              href="/"
              className={
                isHomeActive
                  ? "rounded-2xl border-[2.5px] border-[#26222c] bg-[#b687ff] px-4 py-2 shadow-[0_4px_0_0_rgba(38,34,44,0.18)] transition hover:-translate-y-0.5"
                  : "rounded-2xl px-4 py-2 transition hover:bg-[#f1ecdf]"
              }
            >
              Home
            </Link>
            <Link
              href={dashboardHref}
              className={
                isDashboardActive
                  ? "rounded-2xl border-[2.5px] border-[#26222c] bg-[#b687ff] px-4 py-2 shadow-[0_4px_0_0_rgba(38,34,44,0.18)] transition hover:-translate-y-0.5"
                  : "rounded-2xl px-4 py-2 transition hover:bg-[#f1ecdf]"
              }
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          {session ? (
            <>
              <div className="text-xs text-[#5f566e] sm:text-sm">
                Signed in as{" "}
                <span className="font-semibold text-[#201a28]">
                  {user?.username || user?.email}
                </span>
              </div>
              <Button
                variant="outline"
                className="neo-button-secondary h-10 w-full border-[#26222c] bg-white px-4 text-[#201a28] hover:bg-[#fff7d7] sm:w-auto sm:px-5"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button className="neo-button-secondary h-10 w-full border-[#26222c] bg-white px-4 text-[#201a28] hover:bg-[#fff7d7] sm:w-auto sm:px-5">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="neo-button h-10 w-full border-[#26222c] px-4 text-[#201a28] hover:bg-[#a977ff] sm:w-auto sm:px-5">
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
