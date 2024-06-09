"use client";
import UserRepository from "@/repository/userRepository";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { GrMoney } from "react-icons/gr";
import { MdNotificationsNone, MdOutlineDashboard } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

interface SidebarListItemProps {
  active: boolean;
  title: string;
  Icon: IconType;
  link: string;
}

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const pathname = usePathname();

  return (
    <div className="d-flex overflow-hidden" style={{ height: "100vh" }}>
      <div style={{ maxWidth: 280, height: "100vh", overflowY: "auto" }} className="border-end w-100 bg-light">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="border __shadow w-100 m-3 p-3 rounded-3 bg-white text-center">
            <Link href="#" className="logo fs-4 fw-semibold text-dark">
              Harmony<span>coop</span>
            </Link>
          </div>
        </div>
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
  );
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
