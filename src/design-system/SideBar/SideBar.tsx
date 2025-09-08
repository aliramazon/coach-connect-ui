import React from "react";
import "./SideBar.css";
import { Logo } from "../Logo";

type SideBarProps = {
    children: React.ReactNode;
};

const SideBar: React.FC<SideBarProps> = ({ children }) => {
    return (
        <nav className="side-bar">
            <div className="side-bar__logo-wrapper">
                <Logo size="sm" layout="horizontal" />
            </div>
            {children}
        </nav>
    );
};

export { SideBar };
