"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/user/me");
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      console.log("Logged out successfully ");
      toast.success("User Logged out successfully ");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-mono">Profile page</h1>
      <br />
      <p>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </p>
      <hr/>
      <button className="p-4 m-4 bg-white text-black font-mono font-bold rounded-xl" onClick={logout}>Logout</button>
      <button className="p-4 m-4 bg-white text-black font-mono font-bold rounded-xl" onClick={getUserDetails}>Get User Deatils</button>

    </div>
  );
}

export default ProfilePage;