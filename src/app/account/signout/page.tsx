"use client";
import React from "react";

const Page = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("user");
    return window.location.replace("/account/signin");
  }
};

export default Page;
