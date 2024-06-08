"use client";
import Layout from "@/components/layout";
import UserRepository from "@/repository/userRepository";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

const user = UserRepository.user;
const Page = () => {
  const router = useRouter();
  if (!user) router.push("/account/signin");

  return (
    <Layout>
      <div className="">
        <div className="text-secondary">{moment().format("Do MMMM, YYYY")}</div>
        <div className="fw-semibold fs-4">Welcome back, {user?.firstName} 👋</div>
      </div>
    </Layout>
  );
};

export default Page;
