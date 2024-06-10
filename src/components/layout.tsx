"use client";
import UserRepository from "@/repository/userRepository";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import { IconType } from "react-icons";
import { GrMoney } from "react-icons/gr";
import { MdLogout, MdNotificationsNone, MdOutlineDashboard } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

interface SidebarListItemProps {
  active: boolean;
  title: string;
  Icon: IconType;
  link: string;
}

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className="d-flex overflow-hidden" style={{ height: "100vh" }}>
        <div
          style={{ maxWidth: 280, height: "100vh", overflowY: "auto" }}
          className="border-end w-100 bg-light d-none d-md-block"
        >
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="border __shadow w-100 m-3 p-3 rounded-3 bg-white text-center">
              <Link href="#" className="logo fs-4 fw-semibold text-dark">
                Harmony<span>coop</span>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between" style={{ height: "calc(100% - 150px)" }}>
            <ul className="sidebar-list m-0 p-0">
              <SidebarListItem
                title="Dashboard"
                active={pathname.includes("/c/dashboard")}
                Icon={MdOutlineDashboard}
                link="/account/c/dashboard"
              />
              <SidebarListItem
                title="Loans"
                active={pathname.includes("/c/loans")}
                Icon={GrMoney}
                link="/account/c/loans"
              />
              <SidebarListItem
                title="Repayments"
                active={pathname.includes("/c/repayments")}
                Icon={TbPigMoney}
                link="/account/c/repayments"
              />
            </ul>
            <div>
              <Link
                href={"/account/signout"}
                className={`text-decoration-none text-danger fs-sm fw-medium d-block p-3`}
              >
                <MdLogout className={`me-3 text-danger`} size={24} /> Sign Out
              </Link>
            </div>
          </div>
        </div>
        <div className="w-100" style={{ height: "100vh", overflowY: "auto" }}>
          <div className="d-flex justify-content-between align-items-center border bottom p-3">
            <div className="fw-semibold fs-3">{title}</div>
            <div className="d-flex align-items-center">
              <div className="me-4">
                <MdNotificationsNone size={26} />
              </div>
              <div>
                <div
                  role="button"
                  onClick={() => setIsOpen(true)}
                  style={{ width: 40, height: 40, background: "purple" }}
                  className="border fs-5 fw-medium d-flex align-items-center justify-content-center text-white rounded-pill"
                >
                  {UserRepository.user?.firstName.charAt(0)}
                  {UserRepository.user?.lastName.charAt(0)}
                </div>
              </div>
            </div>
          </div>
          <div className="">{children}</div>
        </div>
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
          <div className="d-flex flex-column justify-content-between" style={{ height: "calc(100% - 150px)" }}>
            <ul className="sidebar-list m-0 p-0">
              <SidebarListItem
                title="Dashboard"
                active={pathname.includes("/c/dashboard")}
                Icon={MdOutlineDashboard}
                link="/account/c/dashboard"
              />
              <SidebarListItem
                title="Loans"
                active={pathname.includes("/c/loans")}
                Icon={GrMoney}
                link="/account/c/loans"
              />
              <SidebarListItem
                title="Repayments"
                active={pathname.includes("/c/repayments")}
                Icon={TbPigMoney}
                link="/account/c/repayments"
              />
            </ul>
            <div>
              <Link
                href={"/account/signout"}
                className={`text-decoration-none text-danger fs-sm fw-medium d-block p-3`}
              >
                <MdLogout className={`me-3 text-danger`} size={24} /> Sign Out
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );

  function handleClose() {
    setIsOpen(false);
  }
};

function SidebarListItem({ title, active, Icon, link }: SidebarListItemProps) {
  return (
    <li style={{ background: active ? "#0000000f" : "" }} className={`sidebar-list-item mb-3 mx-3 rounded `}>
      <Link href={link} className={`text-decoration-none fs-sm fw-medium text-dark d-block p-3`}>
        <Icon className={`me-3 text-dark`} size={24} /> {title}
      </Link>
    </li>
  );
}

export default Layout;
