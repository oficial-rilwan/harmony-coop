"use client";

import NavBar from "@/components/nav-bar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="">
        <section className="hero" id="hero">
          <div className="container-xl">
            <div className="py-5">
              <div className="row py-5">
                <div className="col-12 col-lg-6">
                  <div style={{ fontSize: "14px" }} className="mb-2 text-white fw-medium">
                    WELCOME TO HARMONY COOPERATIVE
                  </div>
                  <div className="display-3 fw-semibold mb-5 text-white">
                    Best and Trusted Credit Co-operative Society
                  </div>
                  <div>
                    <Link href="/account/signin" className="btn_primary">
                      GET STARTED
                    </Link>
                  </div>
                </div>
                <div className="d-none d-lg-block col-lg-6"></div>
              </div>
            </div>
          </div>
          <div className="container-xl border d-none" style={{ background: "#666666" }}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="p-4">
                  <div className="fw-semibold fs-2 mb-5 text-light">
                    Our vision is to be a self-sustaining society managed under transparent, accountable and visionary
                    leadership.
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-4 py-5">
                  <div className="fw-semibold fs-2 mb-5">
                    We provide self-sustaining society managed under transparent, accountability and visionary
                    leadership.
                  </div>
                  <div>
                    <Link href="#services" className="btn_primary">
                      VIEW SERVICES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="services" id="services">
          <div className="container-xl py-5">
            <div className="row py-5 align-items-end">
              <div className="col-12 col-md-6 mb-5">
                <div className="">
                  <div style={{ fontSize: 14 }} className="mb-2 fw-medium">
                    OUR SERVICES
                  </div>
                  <div className="display-3 fw-semibold">Explore the Range of Harmonycoop&apos;s Service</div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-5">
                <div className="text-end text-secondary">
                  We offer a variety of financial products, including savings accounts, personal loans, and business
                  loans, all designed to meet the unique needs of our members.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mb-3">
                <div
                  style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                  className="p-4 rounded h-100 border"
                >
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                      <div>
                        <Image width={50} height={50} src="/assets/img-3.svg" alt="Business Loan" />
                      </div>
                      <div className="fs-3 fw-semibold mb-5">Business Loan</div>
                    </div>
                    <div className="text-end text-secondary fs-sm">
                      Business Loan facility is applicable to members of the cooperative in order to invest in income
                      yielding endeavor
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <div
                  style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                  className="p-4 rounded h-100 border"
                >
                  <div className="d-flex flex-column h-100 justify-content-between">
                    <div>
                      <div>
                        <Image width={50} height={50} src="/assets/img-1.svg" alt="Personal Loan" />
                      </div>
                      <div className="fs-3 fw-semibold mb-5">Personal Loan</div>
                    </div>
                    <div className="text-end text-secondary fs-sm">
                      Harmonycoop offers personal loan online with easy 60 months repayment & interest as low as 1.08%*.
                      Get an unsecured personal loan now{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <div
                  style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", background: "#243B8D" }}
                  className="p-4 rounded h-100 border"
                >
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                      <div>
                        <Image width={50} height={50} src="/assets/img-4.svg" alt="Consultation" />
                      </div>
                      <div className="fs-3 fw-semibold mb-5 text-white">Consultation</div>
                    </div>
                    <div className="text-end fs-sm text-light">
                      We offer a variety of financial products, including savings accounts, personal loans, and business
                      loans, all designed to meet the unique needs of our members.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="services mb-5" id="about" style={{ background: "#f1f1f1" }}>
          <div className="container-xl">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="py-5 my-5">
                  <div style={{ fontSize: 14 }} className="mb-2 fw-medium">
                    ABOUT US
                  </div>
                  <div className="display-3 fw-semibold mb-5">Empowering Lives, Building Futures</div>
                  <div className="mb-3 text-secondary">
                    Welcome to Harmonycoop, where our mission is to empower lives and build futures through innovative
                    financial solutions. We believe that everyone deserves the opportunity to achieve their dreams, and
                    we&apos;re here to make that happen.
                  </div>
                  <div className="mb-3 text-secondary">
                    At the core of our vision is a world where financial barriers are overcome, and everyone has access
                    to the resources they need to thrive. We strive to be the leading provider of personalized financial
                    services that cater to the unique needs of each individual.
                  </div>
                  <div className="mb-3 text-secondary">
                    Our comprehensive range of loan services is designed to support individuals and businesses at every
                    stage of their journey. Whether you&apos;re looking to finance your education, buy a new home,
                    expand your business, or manage unexpected expenses, we have the right solution for you.
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 overflow-hidden">
                <div className="d-flex align-items-end justify-content-end h-100">
                  <Image
                    width={600}
                    height={400}
                    style={{ objectFit: "cover" }}
                    className="w-100 h-auto"
                    alt="About Us"
                    src="/assets/person-2.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div style={{ height: 80 }}></div>
      <footer className="footer py-5">
        <div className="container-xl py-5">
          <div className="row">
            <div className="col-12 col-md-4 mb-5">
              <Link href="#" className="logo fs-2 fw-semibold text-light d-block mb-4">
                Harmony<span>coop</span>
              </Link>
              <div className="text-white fs-sm">
                We provide self-sustaining society managed under transparent, accountability and visionary leadership.
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-5">
              <div className="mb-4 fw-medium fs-5 text-white">Company</div>
              <ul className="p-0 m-0 footer-list">
                <FooterListItem title="Home" link="#" />
                <FooterListItem title="About Us" link="#about" />
                <FooterListItem title="Services" link="#service" />
                <FooterListItem title="Contact" link="#contact" />
              </ul>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-5">
              <div className="mb-4 fw-medium fs-5 text-white">Services</div>
              <ul className="p-0 m-0 footer-list">
                <FooterListItem title="Business Loan" link="" />
                <FooterListItem title="Personal Loan" link="" />
                <FooterListItem title="Financial Planning" link="" />
                <FooterListItem title="Consultation" link="" />
              </ul>
            </div>

            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-4 fw-medium fs-5 text-white">Contact Us</div>
              <ul className="p-0 m-0 footer-list">
                <FooterListItem title="Our Support and Sales team is available 24 /7 to answer your queries" link="" />
                <FooterListItem title="123 Main St, Suite 500, New York, NY 10001" link="" />
                <FooterListItem title="+1 (333) 000-0000" link="" />
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

function FooterListItem({ title, link }: { title: string; link: string }) {
  return (
    <li className="mb-3">
      <Link href={link} className="text-white text-decoration-none fs-sm">
        {title}
      </Link>
    </li>
  );
}
