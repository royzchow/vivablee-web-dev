import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { db } from "../firebase";

// define js function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function activityCard_mouseOver(id,activity_id){
  $("#activityCard_"+id+"_"+activity_id).css("marginRight", "70px");
  $("#activityCard_"+id+"_"+activity_id).css("marginTop", "-80px");
  $("#activityCard_"+id+"_"+activity_id).find( ".bottomContainer").css("height", "230px");
  $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_btn" ).css("display", "block");
  await sleep(300);
  if($("#activityCard_"+id+"_"+activity_id+":hover").length > 0){
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("opacity", "1");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("height", "auto");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("visibility", "visible");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("opacity", "1");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("height", "auto");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("visibility", "visible");
  }
}

async function activityCard_mouseOut(id,activity_id){
  if($("#activityCard_"+id+"_"+activity_id+":hover").length == 0){
    $("#activityCard_"+id+"_"+activity_id).css("marginRight", "0px");
    $("#activityCard_"+id+"_"+activity_id).css("marginTop", "0px");
    $("#activityCard_"+id+"_"+activity_id).find( ".bottomContainer").css("height", "100px");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_btn" ).css("display", "none");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("opacity", "0");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("height", "0px");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("visibility", "hidden");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("opacity", "0");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("height", "0px");
    $("#activityCard_"+id+"_"+activity_id).find( ".activity_card_price" ).css("visibility", "hidden");
  }
}

  // database connection

  // define css class
  const ActivityCardDiv = styled.div`
    position:relative;
  `;
  const ActivityCard2 = styled.div`
    border-radius:30px;
    width:350px;
    transition: all 0.5s;
    cursor: pointer;
    position:absolute;
    :hover{
      width:400px;
      margin-left:-25px;
      box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.20);
      z-index:10;
    }
  `;
  const ActivityCardContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: calc(80% - 72px);
  `;
  const ActivityCardImageCover = styled.div`
    background-size: cover;
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;
  const ActivityCardBottomContainer = styled.div`
    transition: height 0.5s;
    height:100px;
    background-color:white;
    border-bottom-left-radius:30px;
    border-bottom-right-radius:30px;
    padding:10px 20px 0px 20px;
    color:black;
  `;
  const ActivityCardBtn = styled.div`
    background-color:#FF585D;
    padding:8px 14px;
    width:80px;
    border-radius:50px;
    cursor:pointer;
    margin-bottom: 5px;
    display:none;
  `;
  const ActivityCardBtnIcon = styled.img`
    width:12px;
    vertical-align:middle;
    margin-bottom:2px;
    margin-right:4px;
  `;
  const ActivityCardBtnText = styled.span`
    margin-left:5px;
    font-size:14px;
    color:white;
  `;
  const ActivityCardBottomChillfulLogo = styled.img`
    height:12px;
    margin-right:2px;
  `;
  const ActivityCardBottomText1 = styled.span`
    font-size:14px;
    margin-left:3px;
    color:#FF585D;
    text-transform: capitalize;
  `;
  const ActivityCardBottomText2 = styled.p`
    margin-top:3px;
    font-size:20px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height:2.2em;
    margin-bottom:5px;
  `;
  const ActivityCardBottomText3 = styled.p`
    margin-top:3px;
    font-size:14px;
    text-transform: capitalize;
    margin-bottom:0px;
    font-weight:700;
  `;
  const ActivityCardBottomDescription = styled.p`
    margin-top:3px;
    font-size:14px;
    line-height:16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    min-height:3.3em;
    -webkit-box-orient: vertical;
    opacity: 0;
    height: 0px;
    visibility: hidden;
    color:#555;
  `;
  const ActivityCardBottomPrice = styled.p`
    margin-top: 5px;
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    height: 0px;
    visibility: hidden;
  `;

function ActivityCard({id,activity_id,shadow}) {

  useEffect(() =>{
    if (shadow) {
      $(".activityCard_"+id+"_"+activity_id).css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
    }
  }, []);

    const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
    const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
    const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
    const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");
    const [chillfulActivityImagesSmall, setChillfulActivityImagesSmall] = useState("");
    const [chillfulActivityImagesLarge, setChillfulActivityImagesLarge] = useState("");
    const [chillfulActivityCurrency, setChillfulActivityCurrency] = useState("");
    const [chillfulActivityPrice, setChillfulActivityPrice] = useState("");
    const [chillfulActivityDuration, setChillfulActivityDuration] = useState("");

    var chillfulActivityCategoryId = "";

    useEffect(() => {

      // to get the information for activity
      db.collection("chillfulActivities").doc(activity_id)
        .get()
        .then( doc => {
          const data = doc.data()
          setChillfulActivityTitle(data['title']);
          setChillfulActivityDescription(data['description']);
          setChillfulActivityCategory(data['category']);
          setChillfulActivitySubCategory(data['subCategory']);
          setChillfulActivityImagesSmall(data['imagesSmall']);
          setChillfulActivityImagesLarge(data['imagesLarge']);
          setChillfulActivityCurrency(data['currency']);
          setChillfulActivityPrice(data['price']);
          setChillfulActivityDuration(data['duration']/3600);
        })

    }, []);


  // activity card content
  return (

    <ActivityCardDiv className="activityCard">

      <ActivityCard2 className={"activityCard_"+id+"_"+activity_id} id={"activityCard_"+id+"_"+activity_id} onMouseOver={()=>activityCard_mouseOver(id,activity_id)} onMouseOut={()=>activityCard_mouseOut(id,activity_id)}>

        <ActivityCardContainer>
          <ActivityCardImageCover style={{backgroundImage: "url(" + chillfulActivityImagesSmall + ")"}}></ActivityCardImageCover>
        </ActivityCardContainer>
        <ActivityCardBottomContainer className="bottomContainer">
          <ActivityCardBtn className="activity_card_btn">
            <ActivityCardBtnIcon src={require("../images/general/play_white.png")}></ActivityCardBtnIcon>
            <ActivityCardBtnText>Join Now</ActivityCardBtnText>
          </ActivityCardBtn>
          <ActivityCardBottomChillfulLogo src={require("../images/general/chillful_icon_original.png")}></ActivityCardBottomChillfulLogo>
          <ActivityCardBottomText1>{ chillfulActivityCategory }</ActivityCardBottomText1>
          <ActivityCardBottomText2>{ chillfulActivityTitle }</ActivityCardBottomText2>
          <ActivityCardBottomText3>{ chillfulActivitySubCategory } ● { chillfulActivityDuration } hours</ActivityCardBottomText3>
          <ActivityCardBottomDescription className="activity_card_description">{ chillfulActivityDescription }</ActivityCardBottomDescription>
          <ActivityCardBottomPrice className="activity_card_price">From { chillfulActivityCurrency } { chillfulActivityPrice } / person</ActivityCardBottomPrice>
        </ActivityCardBottomContainer>

      </ActivityCard2>

    </ActivityCardDiv>

  );

}

export default ActivityCard;
