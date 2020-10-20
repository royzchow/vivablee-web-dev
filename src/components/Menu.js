import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// define css class
const Menu2 = styled.div`
  padding-top: 25px;
  padding-bottom: 20px;
  transition: all 0.5s;
  height:35px;
  background-color: white;
  position: fixed;
  width:100%;
  z-index:100;
`;
const MenuTable  = styled.table`
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
  margin-top:3px;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
const MenuLogo = styled.img`
  position:absolute;
  height:40px;
  left:50px;
  top:23px;
  cursor:pointer;
  transition: all 0.5s;
  @media only screen and (max-width: 900px) {
    left:20px;
  }
`;
const MenuMobileIcon = styled.img`
  position:absolute;
  height:28px;
  right:20px;
  top:28px;
  cursor:pointer;
  transition: all 0.5s;
  @media only screen and (min-width: 901px) {
    display: none;
  }
`;
const MenuIcon = styled.img`
  margin-left: 10px;
  height: 18px;
  cursor:pointer;
`;
const MenuCategory = styled.span`
  margin-left: 5px;
  margin-right: 10px;
  color: #666;
  cursor:pointer;
  transition: all 0.5s;
  font-weight: 600;
  transition-property: none;
`;
const MenuMargin = styled.div`
  height:80px;
`;

function Menu({page,shadow}) {

  const [chillfulIcon, setChillfulIcon] = useState("chillful_icon_grey.png");
  useEffect(() =>{
    if (page == "chillful") {
      $("#chillful_text").css("color", "#FF585D");
      setChillfulIcon("chillful_icon_original.png");
    }
    if (shadow) {
      $(".menu").css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
    }
  }, []);

  // define js function
  useEffect(() =>{
    $( window ).scroll(function() {
      var scroll = $(window).scrollTop();
      if(scroll > 80){
        $(".menu").css("paddingTop", "13px");
        $(".menu").css("paddingBottom", "15px");
        $(".menu").css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
        $(".menuMargin").css("height", "65px");
        $(".menuLogo").css("height", "35px");
        $(".menuLogo").css("top", "15px");
        $(".menuMobileIcon").css("height", "24px");
        $(".menuMobileIcon").css("top", "20px");
        $(".menu").find( ".category").css("fontSize", "22px");
        $(".menu").find( ".category").css("marginRight", "15px");
      }else{
        $(".menu").css("paddingTop", "25px");
        $(".menu").css("paddingBottom", "20px");
        if(!shadow){
          $(".menu").css("boxShadow", "none");
        }
        $(".menuMargin").css("height", "85px");
        $(".menuLogo").css("height", "40px");
        $(".menuLogo").css("top", "23px");
        $(".menuMobileIcon").css("height", "28px");
        $(".menuMobileIcon").css("top", "28px");
        $(".menu").find( ".category").css("fontSize", "24px");
        $(".menu").find( ".category").css("marginRight", "10px");
      }
    });

  });

  // menu content
  return (
    <div>

      <Menu2 className="menu">
        <Link to='/'>
          <MenuLogo className="menuLogo" src={require("../images/general/logo_original.png")}></MenuLogo>
        </Link>
        <MenuMobileIcon className="menuMobileIcon" src={require("../images/general/menu_icon_grey.png")}></MenuMobileIcon>
        <MenuTable className="menuTable">
          <tbody>
            <tr>
              <td id="icon_chillful">
                <Link to='/Chillful' style={{ textDecoration: 'none' }}>
                  <MenuIcon id="chillful_icon" className="menuIcon" src={require("../images/general/"+chillfulIcon)} /><MenuCategory id="chillful_text" className="category">Chillful</MenuCategory>
                </Link>
              </td>

              <td id="icon_mindful">
                <Link to='/Chillful' style={{ textDecoration: 'none' }}>
                  <MenuIcon id="chillful_icon" className="menuIcon" src={require("../images/general/mindful_icon_grey.png")} /><MenuCategory id="mindful_text" className="category">Mindful</MenuCategory>
                </Link>
              </td>

              <td id="icon_supportful">
                <Link to='/Supportful' style={{ textDecoration: 'none' }}>
                  <MenuIcon id="chillful_icon" className="menuIcon" src={require("../images/general/supportful_icon_grey.png")} /><MenuCategory id="supportful_text" className="category">Supportful</MenuCategory>
                </Link>
              </td>
            </tr>
            <tr>
              <td id="hoverBar_chillful"><div className="hoverBar"></div></td>
              <td id="hoverBar_mindful"><div className="hoverBar"></div></td>
              <td id="hoverBar_supportful"><div className="hoverBar"></div></td>
            </tr>
          </tbody>
        </MenuTable>
      </Menu2>

      <MenuMargin className="menuMargin"></MenuMargin>

    </div>
  );

}

export default Menu;
