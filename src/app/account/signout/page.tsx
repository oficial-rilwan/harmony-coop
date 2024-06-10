"use client";
import React from "react";

const Page = () => {
  window.localStorage.removeItem("user");
  return window.location.replace("/account/signin");
};

export default Page;
