import * as React from "react";

import { Link } from "react-router-dom";

import "./style.css";

export interface NavProps {}

const Nav: React.SFC<NavProps> = () => {
  return (
    <div className="Navbar">
      <div className="ascii-art">
        <h3>control loop</h3>
      </div>

      <ul className="nav-itens">
        <li>
          <Link to="/dao">DAO</Link>
        </li>
        <li>
          <Link to="/pool">Lp Rewards</Link>
        </li>
        <li>
          <Link to="/regulation">Regulation</Link>
        </li>
        <li>
          <Link to="/governance">Governance</Link>
        </li>
        <li>
          <Link to="/trade">Trade</Link>
        </li>
        <li>
          <Link to="/coupons">Coupons</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
