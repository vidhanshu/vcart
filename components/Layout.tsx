import { BsBag, BsListTask } from "react-icons/bs";

import { HiOutlineCog6Tooth } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCategory } from "react-icons/md";
import React from "react";
import { TfiDashboard } from "react-icons/tfi";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const { asPath, pathname } = useRouter();

  const activeLink =
    "transition-all flex gap-2 bg-white text-black px-4 py-2 rounded-l-full";
  const inactiveLink =
    "transition-all flex gap-2 px-4 py-2 rounded-l-full hover:bg-blue-900";

  return (
    <div className="flex min-h-screen bg-blue-950">
      {/* Sidebar */}
      <aside className=" text-white p-10 pr-0">
        <h1 className="flex gap-2 mb-10 mr-10 font-bold text-xl">
          <Image src={"/assets/logo.svg"} alt="logo" width={30} height={25} />
          Vcart Admin
        </h1>

        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href={"/"}
              className={pathname === "/" ? activeLink : inactiveLink}
            >
              <TfiDashboard size={25} /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              className={
                asPath.includes("/products") ? activeLink : inactiveLink
              }
              href={"/products"}
            >
              <BsBag size={25} /> Products
            </Link>
          </li>

          <li>
            <Link
              className={
                asPath.includes("/categories") ? activeLink : inactiveLink
              }
              href={"/categories"}
            >
              <MdOutlineCategory size={25} /> Categories
            </Link>
          </li>

          <li>
            <Link
              className={asPath.includes("/orders") ? activeLink : inactiveLink}
              href={"/orders"}
            >
              <BsListTask size={25} /> Orders
            </Link>
          </li>

          <li>
            <Link
              className={
                asPath.includes("/settings") ? activeLink : inactiveLink
              }
              href={"/settings"}
            >
              <HiOutlineCog6Tooth size={25} /> Settings
            </Link>
          </li>
        </ul>
      </aside>

      <div className="flex-grow bg-white my-2 mr-2 rounded-lg py-4 px-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;
