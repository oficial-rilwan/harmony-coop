import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header>
      <div className="container-xl">
        <nav className="row py-4 align-items-center">
          <div className="col-4">
            <Link href="#" className="logo fs-2 fw-semibold text-dark">
              Harmony<span>coop</span>
            </Link>
          </div>
          <div className="col-4">
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
          <div className="col-4">
            <div className="d-flex justify-content-end">
              <Link href="/account/signin" className="btn_primary">
                GET STARTED
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
