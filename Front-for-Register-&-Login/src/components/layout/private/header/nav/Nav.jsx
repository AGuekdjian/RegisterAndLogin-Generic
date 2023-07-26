import React, { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand
} from "reactstrap";

export const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { auth } = useAuth();
  console.log(auth);

  return (
    <Navbar color="dark" dark>
      <NavbarBrand href="/">
        <img
          alt="logo"
          src="/vite.svg"
          style={{
            height: 40,
            width: 40,
            marginLeft: 40
          }}
        />
        Presupuesto
      </NavbarBrand>
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i class="fa-solid fa-question"></i>
            <span className="menu-list__title">Sobre Nosotros</span>
          </a>
        </li>

        <li className="menu-list__item">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{auth.name}</DropdownToggle>
            <DropdownMenu className="dropdownItem__menu__open">
              <DropdownItem className="dropdownItem__menu__open">
                <NavLink to="/presupuesto/logout" className="list-end__link">
                  <span className="list-end__name">Cerrar Sesion</span>
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </Navbar>
  );
};
