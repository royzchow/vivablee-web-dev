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
  color: #333;
  cursor:pointer;
  transition: all 0.5s;
  font-weight: 600;
  transition-property: none;
  font-size:16px;
`;
const MenuCategory2 = styled.span`
  margin-right:30px;
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

const MenuArticlesLine = styled.div`
  opacity:0;
  height:3px;
  background-color:#bbb;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  transition: all 0.3s;
`;
const MenuMeditationLine = styled.div`
  opacity:0;
  height:3px;
  background-color:#FF9700;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  transition: all 0.3s;
`;
const MenuActivitiesLine = styled.div`
  opacity:0;
  height:3px;
  background-color:#FF585D;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  transition: all 0.3s;
`;


function Menu({page,shadow}) {

  useEffect(() =>{
    if (shadow) {
      $(".menu").css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
    }

    $("#articles_text").hover(
      function() {
        $("#articles_line").css("opacity", "1");
      }, function() {
        $("#articles_line").css("opacity", "0");
      }
    );
    $("#meditation_text").hover(
      function() {
        $("#meditation_line").css("opacity", "1");
      }, function() {
        $("#meditation_line").css("opacity", "0");
      }
    );
    $("#activities_text").hover(
      function() {
        $("#activities_line").css("opacity", "1");
      }, function() {
        $("#activities_line").css("opacity", "0");
      }
    );

    $('#' + page + '_text').click(function(){
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false;
    });

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

              <td><div style={{ width:"30px" }}></div></td>

              <td id="meditation">
                <Link to='/Meditation' style={{ textDecoration: 'none' }}>
                  <MenuCategory id="meditation_text" className="category">Meditation</MenuCategory>
                </Link>
              </td>

              <td><div style={{ width:"30px" }}></div></td>

              <td id="activities">
                <Link to='/Activities' style={{ textDecoration: 'none' }}>
                  <MenuCategory id="activities_text" className="category">Activities</MenuCategory>
                </Link>
              </td>
            </tr>

            <tr><td><div style={{ height:"16px" }}></div></td></tr>

            <tr>
              <td><MenuArticlesLine id="articles_line"></MenuArticlesLine></td>
              <td></td>
              <td><MenuMeditationLine id="meditation_line"></MenuMeditationLine></td>
              <td></td>
              <td><MenuActivitiesLine id="activities_line"></MenuActivitiesLine></td>
            </tr>
          </tbody>
        </MenuTable>

        <MenuRight className="menuRight">

          <MenuCategory2 id="articles_text" className="category">Help</MenuCategory2>
          <MenuCategory2 id="articles_text" className="category">Work</MenuCategory2>
          <MenuCategory2 id="articles_text" className="category">About</MenuCategory2>
          <MenuButton>Try for Free</MenuButton>

        </MenuRight>

      </MenuDiv>

      <MenuMargin className="menuMargin"></MenuMargin>

    </div>
  );

}

export default Menu;
