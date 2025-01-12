/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {  Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'; 

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); //Hook for translation


  return (
    <div className="myheader">
      {/* {user && <h3>tahhhhh</h3>} */}
      <header className="hide-when-mobile ali logoo">
        <h1>
          
        <Link className="logo" to="/">c4a.dev</Link>
        {/* <a className="logo" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">c4a.dev</a> */}
        
        </h1>
      
      
      
        {/* <button
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="theme-btn"
        >
          {theme}
        </button> */}

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">

          {/* {user && ( */}
          <li className="main-list">
              <p className="main-link">{t('lang')}</p>
              <ul className="sub-ul">
                <li onClick={() => i18n.changeLanguage("ar")} dir="rtl">
                  <p>العربية</p>
                  {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
                </li>
                <li onClick={() => i18n.changeLanguage("en")}>
                  <p>English</p>
                  {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
                </li>
                <li onClick={() => i18n.changeLanguage("fr")}>
                  <p>French</p>
                  {i18n.language === "fr" && <i className="fa-solid fa-check"></i>}
                </li>
              </ul>
            </li>
          {/* )} */}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
              {t("signin")}
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
              {t("signup")}
              </NavLink>
            </li>
          )}
                {user && (
            <li onClick={() => {
              signOut(auth).then(() => {
              console.log("Sign-out successful"); // Sign-out successful.
              navigate("/signin");

              }).catch((error) => {
                // An error happened.
              });
              
            }} className="main-list">
              <button className="main-link signout">
              {t('signout')}  
              </button>
            </li>
          )}

    {/* ul & sub-ul */}
{/* {user && (
<li className="main-list">
  <NavLink className="main-link" to="/about">
    Css
  </NavLink>
  <ul className="sub-div">
    <li>
      <NavLink to="/css">Full Course</NavLink>
    </li>
    <li>
      <a href="">CSS Examples</a>
    </li>
    <li className="mini-projects">
      <label className="mini-projects" htmlFor="mini">
        mini projects
      </label>
      <ul className="sub-sub-ul">
        <li>
          <a href="">project 1</a>
        </li>
        <li>
          <a href="">project 2</a>
        </li>
        <li>
          <a href="">project 3</a>
        </li>
      </ul>
    </li>
  </ul>
</li>
)} */}
          

  
            {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
              {t('support')}
              </NavLink>
              {/* <ul className="sub-ul">
                <li>
                  <a href="">Full Course</a>
                </li>
                <li>
                  <a href="">Crash Course</a>
                </li>
                <li>
                  <a href="">learn in 1h</a>
                </li>
              </ul> */}
            </li>
          )}
      {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                {t('account')}
              </NavLink>
              
            </li>
          )}
              {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/">
                Home
              </NavLink>
              
            </li>
          )}
        </ul>
      </header>

      {/***********
        when-mobile 
        *******/}

      {/* <header className="show-when-mobile ali">
  
        <ul className="flex">

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}
                {user && (
            <li onClick={() => {
              signOut(auth).then(() => {
              console.log("Sign-out successful"); 
              navigate("/signin");

              }).catch((error) => {
              });
              
            }} className="main-list">
              <button className="main-link signout">
                Sign-out
              </button>
            </li>
          )}

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                About
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                Profile
              </NavLink>
              
            </li>
          )}
        </ul>
      </header> */}
    </div>
  );
};

export default Header;
