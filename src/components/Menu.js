import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// define css class
const MenuDiv = styled.div`
  padding-top: 28px;
  padding-bottom: 12px;
  transition: all 0.5s;
  height:35px;
  background-color: white;
  position: fixed;
  width:100%;
  z-index:100;
`;
const MenuTable  = styled.table`
  margin-left: 250px;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
const MenuLogo = styled.img`
  position:absolute;
  height:30px;
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
  margin-right: 30px;
  color: #333;
  cursor:pointer;
  transition: all 0.5s;
  font-weight: 600;
  transition-property: none;
  font-size:16px;
`;
const MenuMargin = styled.div`
  height:75px;
`;

const MenuRight = styled.div`
  position:absolute;
  right:50px;
  top:0px;
  margin-top:20px;
  transition: all 0.5s;
  @media only screen and (max-width: 900px) {
    display:none;
  }
`;
const MenuButton = styled.button`
  padding: 10px 20px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
`;


function Menu({page,shadow}) {

  useEffect(() =>{
    if (shadow) {
      $(".menu").css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
    }
  }, []);

  useEffect(() =>{
    $( window ).scroll(function() {
      var scroll = $(window).scrollTop();
      if(scroll > 80){
        $(".menu").css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
      }else{
        if(!shadow){
          $(".menu").css("boxShadow", "none");
        }
      }
    });

  });

  // menu content
  return (
    <div>

      <MenuDiv className="menu">
        <Link to='/'>
          <MenuLogo className="menuLogo" src={require("../images/general/logo_original.png")}></MenuLogo>
        </Link>
        <MenuMobileIcon className="menuMobileIcon" src={require("../images/general/menu_icon_grey.png")}></MenuMobileIcon>
        <MenuTable className="menuTable">
          <tbody>
            <tr>
              <td id="articles">
                <Link to='/Articles' style={{ textDecoration: 'none' }}>
                  <MenuCategory id="articles_text" className="category">Articles</MenuCategory>
                </Link>
              </td>

              <td id="meditation">
                <MenuCategory id="meditation_text" className="category">Meditation</MenuCategory>
              </td>

              <td id="activities">
                <Link to='/Activities' style={{ textDecoration: 'none' }}>
                  <MenuCategory id="activities_text" className="category">Activities</MenuCategory>
                </Link>
              </td>
            </tr>
          </tbody>
        </MenuTable>

        <MenuRight className="menuRight">

          <MenuCategory id="articles_text" className="category">Help</MenuCategory>
          <MenuCategory id="articles_text" className="category">Work</MenuCategory>
          <MenuCategory id="articles_text" className="category">About</MenuCategory>
          <MenuButton>Try for Free</MenuButton>

        </MenuRight>

      </MenuDiv>

      <MenuMargin className="menuMargin"></MenuMargin>

    </div>
  );

}

export default Menu;
