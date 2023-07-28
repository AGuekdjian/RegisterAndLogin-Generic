import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import useAuth from "../../../hooks/useAuth";
import "./Private.css";

export default function Private() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h2>Cargando...</h2>;
  } else {
    return (
      <>
        <Outlet />
        <Header />
        <section className="main">
          <article>Aca iria toda la pagina de presupuesto.</article>
        </section>
        <Footer />
      </>
    );
  }
}
