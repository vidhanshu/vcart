/* eslint-disable @next/next/no-img-element */
import { signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import React from "react";

function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Image
          src={"/assets/loading-gif.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-blue-950 w-screen h-screen flex justify-center items-center">
        <Head>
          <title>Signin</title>
        </Head>
        <button
          onClick={() => signIn("google")}
          className="bg-white flex gap-2 p-2 rounded-lg hover:bg-gray-200 transition-all active:scale-[.9]"
        >
          <FcGoogle size={25} /> <p>Signin with google</p>
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex justify-between items-center">
        <h1>Hii👋, {session.user?.name}</h1>
        <div className="flex gap-2 items-center cursor-pointer p-1 border-[1px] rounded-lg border-gray-200">
          <p>{session.user?.name}</p>
          <img
            alt="profile"
            className="h-7 w-7 rounded-full"
            src={session.user?.image || ""}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
