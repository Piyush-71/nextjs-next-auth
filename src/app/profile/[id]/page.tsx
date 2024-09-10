"use client";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-mono">Profile page</h1>
      <h2 className="bg-white p-3 m-3 text-black font-mono font-bold rounded-lg">{id}</h2>
    </div>
  );
}

export default Page;