"use client";
import UserRepository, { UserProps } from "@/repository/userRepository";
import Link from "next/link";
import React from "react";

const initialValues = {
  email: "",
  password: "",
};
const Page = () => {
  const [values, setValues] = React.useState(initialValues);

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center py-5">
      <div className="w-100 p-4" style={{ maxWidth: 600 }}>
        <div className="d-flex flex-column align-items-center mb-5">
          <Link href="#" className="logo display-4 mb-5 d-block fw-semibold text-dark">
            Harmony<span>coop</span>
          </Link>
          <div className="fw-semibold fs-1">Welcome</div>
          <div className="">Use the form below to get into your account</div>
        </div>
        <div style={{ border: "5px solid #111111" }} className="p-5 rounded-4">
          <form onSubmit={save}>
            <div className="mb-3">
              <div className="form-label">
                Email address <span className="text-danger">*</span>
              </div>
              <input
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                required
                className="form-control rounded-pill"
              />
            </div>
            <div className="mb-5">
              <div className="form-label">
                Password <span className="text-danger">*</span>
              </div>
              <input
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                required
                className="form-control rounded-pill mb-3"
              />
              <Link className="text-dark fs-sm fw-medium" href="#">
                Forgot your Password?
              </Link>
            </div>
            <button type="submit" className="btn_primary d-block w-100 mb-3">
              Submit
            </button>

            <div className="text-dark fs-sm fs-medium text-center">
              Don&apos;t have an account?{" "}
              <Link className="text-dark fs-sm fs-medium text-primary fw-medium" href="/account/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function save(e: React.FormEvent) {
    e.preventDefault();
    const result = UserRepository.signin(values as UserProps);

    if (!result) return;
    if (typeof window !== "undefined") {
      window?.localStorage.setItem("user", JSON.stringify(result));
      window.location.replace("/account/c/dashboard");
    }
  }

  function handleChange(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }
};

export default Page;
