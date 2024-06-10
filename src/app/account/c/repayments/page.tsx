"use client";

import UserRepository from "@/repository/userRepository";
import React, { Suspense } from "react";
import Repayments from "./repayments";
import { useRouter } from "next/navigation";

const user = UserRepository.user;

const Page = () => {
  const router = useRouter();

  if (!user) return router.push("/account/signin");
  return (
    <Suspense>
      <Repayments />
    </Suspense>
  );
};

export default Page;
