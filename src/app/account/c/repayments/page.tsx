"use client";

import UserRepository from "@/repository/userRepository";
import React, { Suspense } from "react";
import Repayments from "./repayments";
import { useRouter } from "next/navigation";

const user = UserRepository.user;

const Page = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!user) return router.push("/account/signin");
    //eslint-disable-next-line
  }, [user]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Repayments />
    </Suspense>
  );
};

export default Page;
