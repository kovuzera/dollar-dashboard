import * as React from "react";
import { Link } from "react-router-dom";

export interface LinkProps {
  href: string;
}

const StyledLink: React.SFC<LinkProps> = ({ href }) => {
  return <Link to={href}></Link>;
};

export default Link;
