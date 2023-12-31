import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="list__container">
        <ul className="list">
          <li>
            <a href="https://www.facebook.com" target="_blank">
              <BsFacebook />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank">
              <AiOutlineTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank">
              <AiOutlineInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank">
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a href="https://github.com/AGuekdjian" target="_blank">
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright">
        <p>&copy; 2022 Copyright: The Best Developer in the World!</p>
      </div>
    </footer>
  );
};

export default Footer;
