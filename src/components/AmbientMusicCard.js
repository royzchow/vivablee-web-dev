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
async function AmbientMusicCard_mouseOver(id,activity_id){
  $("#AmbientMusicCard_"+id+"_"+activity_id).css("marginRight", "70px");
  $("#AmbientMusicCard_"+id+"_"+activity_id).css("marginTop", "-80px");
  $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".bottomContainer").css("height", "230px");
  $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_btn" ).css("display", "block");
  await sleep(300);
  if($("#AmbientMusicCard_"+id+"_"+activity_id+":hover").length > 0){
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("opacity", "1");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("height", "auto");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("visibility", "visible");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("opacity", "1");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("height", "50px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("visibility", "visible");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("marginTop", "18px");
  }
}

async function AmbientMusicCard_mouseOut(id,activity_id){
  if($("#AmbientMusicCard_"+id+"_"+activity_id+":hover").length == 0){
    $("#AmbientMusicCard_"+id+"_"+activity_id).css("marginRight", "0px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).css("marginTop", "0px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".bottomContainer").css("height", "100px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_btn" ).css("display", "none");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("opacity", "0");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("height", "0px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".activity_card_description" ).css("visibility", "hidden");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("opacity", "0");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("height", "0px");
    $("#AmbientMusicCard_"+id+"_"+activity_id).find( ".audio_div" ).css("visibility", "hidden");
  }
}

  // database connection

  // define css class
  const AmbientMusicCardDiv = styled.div`
    position:relative;
  `;
  const AmbientMusicCard2 = styled.div`
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
  const AmbientMusicCardContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: calc(80% - 72px);
  `;
  const AmbientMusicCardImageCover = styled.div`
    background-size: cover;
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;
  const AmbientMusicCardBottomContainer = styled.div`
    transition: height 0.5s;
    height:100px;
    background-color:white;
    border-bottom-left-radius:30px;
    border-bottom-right-radius:30px;
    padding:10px 20px 0px 20px;
    color:black;
  `;
  const AmbientMusicCardBtn = styled.div`
    background-color:#FF9700;
    padding:8px 14px;
    width:80px;
    border-radius:50px;
    cursor:pointer;
    margin-bottom: 5px;
    display:none;
  `;
  const AmbientMusicCardBtnIcon = styled.img`
    width:12px;
    vertical-align:middle;
    margin-bottom:2px;
    margin-right:4px;
  `;
  const AmbientMusicCardBtnText = styled.span`
    margin-left:5px;
    font-size:14px;
    color:white;
  `;
  const AmbientMusicCardBottomChillfulLogo = styled.img`
    height:12px;
    margin-right:2px;
    margin-bottom:-1px;
  `;
  const AmbientMusicCardBottomText1 = styled.span`
    font-size:14px;
    margin-left:3px;
    color:#FF9700;
    text-transform: capitalize;
    font-weight:600;
  `;
  const AmbientMusicCardBottomText2 = styled.p`
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
  const AmbientMusicCardBottomText3 = styled.p`
    margin-top:3px;
    font-size:14px;
    text-transform: capitalize;
    margin-bottom:0px;
    font-weight:700;
  `;
  const AmbientMusicCardBottomDescription = styled.p`
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
  const AmbientMusicCardBottomAudio = styled.audio`
    width:300px;
    opacity: 0;
    height: 0px;
    visibility: hidden;
  `;

function AmbientMusicCard({id,activity_id,shadow}) {

  useEffect(() =>{
    if (shadow) {
      $(".AmbientMusicCard_"+id+"_"+activity_id).css("boxShadow", "0px 0px 12px 5px rgba(0,0,0,0.10)");
    }
  }, []);

    const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
    const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
    const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
    const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");
    const [chillfulActivityImagesSmall, setChillfulActivityImagesSmall] = useState("");
    const [chillfulActivityImagesLarge, setChillfulActivityImagesLarge] = useState("");
    const [chillfulActivityAudios, setChillfulActivityAudios] = useState([]);

    var chillfulActivityCategoryId = "";

    useEffect(() => {

      // to get the information for activity
      db.collection("mindfulAmbientMusic").doc(activity_id)
        .get()
        .then( doc => {
          const data = doc.data()
          setChillfulActivityTitle(data['title']);
          setChillfulActivityDescription(data['description']);
          setChillfulActivityCategory(data['category']);
          setChillfulActivityImagesSmall(data['imagesSmall']);
          setChillfulActivityImagesLarge(data['imagesLarge']);
          setChillfulActivityAudios(data['audios']);
        })

    }, []);

    // to load the audio when it is ready
    const controlId = "AmbientMusicCardAudio_"+id+"_"+activity_id;
    useEffect(() => {
        const audioControl = document.querySelector(`#${controlId}`);
        if(audioControl) {
            audioControl.load();
        }
    })


  // activity card content
  return (

    <AmbientMusicCardDiv className="AmbientMusicCard">

      <AmbientMusicCard2 className={"AmbientMusicCard_"+id+"_"+activity_id} id={"AmbientMusicCard_"+id+"_"+activity_id} onMouseOver={()=>AmbientMusicCard_mouseOver(id,activity_id)} onMouseOut={()=>AmbientMusicCard_mouseOut(id,activity_id)}>
        <AmbientMusicCardContainer>
          <AmbientMusicCardImageCover style={{backgroundImage: "url(" + chillfulActivityImagesSmall + ")"}}></AmbientMusicCardImageCover>
        </AmbientMusicCardContainer>
        <AmbientMusicCardBottomContainer className="bottomContainer">
          <AmbientMusicCardBottomChillfulLogo src={require("../images/general/mindful_icon_original.png")}></AmbientMusicCardBottomChillfulLogo>
          <AmbientMusicCardBottomText1>{ chillfulActivityCategory }</AmbientMusicCardBottomText1>
          <AmbientMusicCardBottomText2>{ chillfulActivityTitle }</AmbientMusicCardBottomText2>
          <AmbientMusicCardBottomText3>{ chillfulActivityCategory } ● 5 minutes</AmbientMusicCardBottomText3>
          <AmbientMusicCardBottomDescription className="activity_card_description">{ chillfulActivityDescription }</AmbientMusicCardBottomDescription>
          <AmbientMusicCardBottomAudio id={controlId} className="audio_div" controls>
            <source src={ chillfulActivityAudios } type="audio/ogg" />
            <source src={ chillfulActivityAudios } type="audio/mpeg" />
          </AmbientMusicCardBottomAudio>
        </AmbientMusicCardBottomContainer>

      </AmbientMusicCard2>

    </AmbientMusicCardDiv>

  );

}

export default AmbientMusicCard;
