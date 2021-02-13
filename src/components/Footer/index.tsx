/* import React from 'react';
import { LinkBase, useTheme } from '@aragon/ui';
import ChangeModeButton from "./SwitchTheme";

type FooterProps = {
  updateTheme: Function,
  theme: string,
  hasWeb3: boolean,
}

function Footer({updateTheme, theme, hasWeb3}: FooterProps) {
  const currentTheme = useTheme();

  return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: currentTheme.surface,
        textAlign: 'center',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: 'auto',
        width: '100%',
        fontSize: '14px'
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div style={{ padding: '2%', display: 'flex'}}>
            <div style={{ width: '50%', textAlign: 'left' }}>
              <FooterLink icon={<i className="fab fa-github"/>} href={"https://www.github.com/emptysetsquad/dollar"}/>
              <FooterLink icon={<i className="fab fa-twitter"/>} href={"https://www.twitter.com/emptysetsquad"}/>
              <FooterLink icon={<i className="fab fa-medium"/>} href={"https://www.medium.com/@emptysetsquad"}/>
              <FooterLink icon={<i className="fab fa-telegram"/>} href={"https://www.t.me/emptysetdollar"}/>
              <FooterLink icon={<i className="fab fa-discord"/>} href={"https://discord.gg/vPws9Vp"}/>
            </div>
            <div style={{ width: '45%', textAlign: 'right', height: '18px', marginTop: '15px', marginBottom: '15px'}}>
              made with <span role="img" aria-labelledby="heartbreak">💔️</span> by the &#123;ess&#125;.
            </div>
            <div style={{ width: '5%', textAlign: 'right', marginTop: '4px' }}>
              <ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type FooterLinkProp = {
  icon: any,
  href: string,
}

function FooterLink({
  icon, href,
}:FooterLinkProp) {
  return (
    <LinkBase href={href} style={{marginLeft: '8px', marginRight: '8px'}}>
      <span style={{ fontSize: 32 }}>{icon}</span>
    </LinkBase>
  );
}

export default Footer;
 */

import * as React from "react";

//Icons
import { IoLogoTwitter } from "react-icons/io";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { AiFillGithub, AiFillMediumCircle } from "react-icons/ai";

//Styles
import "./index.css";

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <div className="Footer">
      <div className="brand-container">
        <div className="circle"></div>
        <span>Control Loop</span>
      </div>

      <div className="links-container">
        <a href="#">App</a>
        <a href="#">Help</a>
        <a href="#">Faq</a>
      </div>

      <div className="social-media-icons-container">
        <span>
          <FaTelegramPlane size={35}></FaTelegramPlane>
        </span>
        <span>
          <IoLogoTwitter size={35}></IoLogoTwitter>
        </span>
        <span>
          <FaDiscord size={35}></FaDiscord>
        </span>
        <span>
          <AiFillMediumCircle size={35}></AiFillMediumCircle>
        </span>
        <span>
          <AiFillGithub size={35}></AiFillGithub>
        </span>
      </div>
    </div>
  );
};

export default Footer;
