import React from "react";
import { Link, NavLink } from "react-router-dom";

import { LogOutIcon } from "lucide-react";
import { Typography } from "../Typography";
import { type SideBarLinksProps } from "./types";

const SideBarLinks: React.FC<SideBarLinksProps> = ({ links, logOut }) => {
    return (
        <>
            {links.map((group, idx) => {
                return (
                    <div className="side-bar__link-group" key={idx}>
                        <Typography
                            variant="subtitle-md"
                            weight="semibold"
                            className="side-bar__link-group-title"
                        >
                            {group.title.toUpperCase()}
                        </Typography>
                        <ul className="side-bar__links">
                            {group.links.map((link, idx) => {
                                const Icon = link.icon;
                                return (
                                    <li
                                        className="side-bar__link-item"
                                        key={idx}
                                    >
                                        {link.linkTo ? (
                                            <NavLink
                                                to={link.linkTo}
                                                className="side-bar__link"
                                            >
                                                <Icon className="side-bar__link-icon" />
                                                {link.linkText}
                                            </NavLink>
                                        ) : (
                                            <a
                                                className="side-bar__link"
                                                onClick={link.onClick}
                                            >
                                                <Icon className="side-bar__link-icon" />
                                                {link.linkText}
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}

            <div className="side-bar__log-out">
                <LogOutIcon className="log-out-icon" />
                <Link to="" className="side-bar__log-out-link" onClick={logOut}>
                    Log Out
                </Link>
            </div>
        </>
    );
};

export { SideBarLinks };
