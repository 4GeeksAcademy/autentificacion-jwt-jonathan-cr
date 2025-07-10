import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";

import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import injectContext from "../store/appContext.jsx";

import { Home } from "./Home.jsx";
import { Demo } from "./Demo.jsx";
import { Single } from "./Single.jsx";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import { Private } from "./Private.jsx";

const Layout = () => {
    const basename = import.meta.env.VITE_BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);