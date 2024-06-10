"use client";
import React from "react";

const Page = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user");
      return window.location.replace("/account/signin");
    }
  }, []);

  return <div></div>;
};

export default Page;
