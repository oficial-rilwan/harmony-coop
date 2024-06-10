"use client";

import Link from "next/link";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import { MdMenu } from "react-icons/md";

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header>
      <div className="container-xl">
        <nav className="row py-4 align-items-center">
          <div className="col-6 col-md-4">
            <Link href="#" className="logo fs-2 fw-semibold text-dark">
              Harmony<span>coop</span>
            </Link>
          </div>
          <div className="d-none d-md-block col-md-4">
            <ul className="nav-list p-0 m-0 d-flex align-items-center justify-content-center gap-4">
              <li className="nav-list__item">
                <Link href="#" className="text-secondary">
                  Home
                </Link>
              </li>
              <li className="nav-list__item">
                <Link href="#about" className="text-secondary">
                  About Us
                </Link>
              </li>
              <li className="nav-list__item">
                <Link href="#services" className="text-secondary">
                  Services
                </Link>
              </li>
              <li className="nav-list__item">
                <Link href="#contact" className="text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-block d-md-none col-6 col-md-4">
            <div className="d-flex justify-content-end">
              <MdMenu size={32} role="button" onClick={() => setIsOpen(true)} />
            </div>
          </div>
          <div className="d-none d-md-block col-6 col-md-4">
            <div className="d-flex justify-content-end">
              <Link href="/account/signin" className="btn_primary">
                GET STARTED
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <Offcanvas show={isOpen} onHide={() => setIsOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link href="#" className="logo display-4 fw-semibold text-dark">
              Harmony<span>coop</span>
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav-list p-0 m-0">
            <li className="nav-list__item mb-5">
              <Link href="#" className="text-primary fs-2 fw-medium" onClick={handleClose}>
                Home
              </Link>
            </li>
            <li className="nav-list__item mb-5">
              <Link href="#about" className="text-primary fs-2 fw-medium" onClick={handleClose}>
                About Us
              </Link>
            </li>
            <li className="nav-list__item mb-5">
              <Link href="#services" className="text-primary fs-2 fw-medium" onClick={handleClose}>
                Services
              </Link>
            </li>
            <li className="nav-list__item mb-5">
              <Link href="#contact" className="text-primary fs-2 fw-medium" onClick={handleClose}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="pt-5">
            <div className="">
              <Link href="/account/signin" className="btn_primary w-100 d-block text-center">
                GET STARTED
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );

  function handleClose() {
    setIsOpen(false);
  }
};

export default NavBar;
