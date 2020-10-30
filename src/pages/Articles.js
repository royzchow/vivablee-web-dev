import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import img_article_1 from '../images/articles/article1.jpg';
import img_article_2 from '../images/articles/article2.jpg';
import img_article_3 from '../images/articles/article3.jpg';
import img_article_4 from '../images/articles/article4.jpg';
import img_event_1 from '../images/chillful/event_1.jpg';
import banner_video from '../images/articles/banner_video.jpg';
import pattern_background from '../images/general/pattern_background.jpg';
import demo1 from '../images/mp3/demo1.mp3';
import { storage, db } from "../firebase";
import Slider from 'infinite-react-carousel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BannerBtn = styled.button`
  padding: 20px 35px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-top: 30px;
`;
const BannerBtn2 = styled.button`
  padding: 30px 33px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-top: 30px;
`;
const BannerBtn3 = styled.button`
  padding: 0px 7px 1px 7px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-left: 20px;
`;

const BannerVideo = styled.div`
  background-image: url(${banner_video});
  background-size: cover;
  background-position: center;
  width:100%;
  height:550px;
  margin-top:-15px;
  border-radius: 10px;
`;
const PatternBackground = styled.div`
  background-image: url(${pattern_background});
  background-size: cover;
  width:100%;
  height:500px;
  margin-top:-15px;
  border-radius: 10px;
`;

const ArticleCardDiv1 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_1});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv2 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_2});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv3 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_3});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv4 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_4});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDivGrey = styled.div`
  width: calc( 50% - 13px );
  height:300px;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
  position:absolute;
  margin-top:-310px;
  background-color: rgba(0, 0, 0, 0.1);
  cursor:pointer;
`;


function Articles() {

  useEffect(() =>{
    $("#article_1").hover(
      function() {
        $("#article_1_hover_box").css("transform", "translate(8px, -8px)");
      }, function() {
        $("#article_1_hover_box").css("transform", "translate(0px, 0px)");
      }
    );
    $("#article_2").hover(
      function() {
        $("#article_2_hover_box").css("transform", "translate(8px, -8px)");
      }, function() {
        $("#article_2_hover_box").css("transform", "translate(0px, 0px)");
      }
    );
    $("#article_3").hover(
      function() {
        $("#article_3_hover_box").css("transform", "translate(8px, -8px)");
      }, function() {
        $("#article_3_hover_box").css("transform", "translate(0px, 0px)");
      }
    );
    $("#article_4").hover(
      function() {
        $("#article_4_hover_box").css("transform", "translate(8px, -8px)");
      }, function() {
        $("#article_4_hover_box").css("transform", "translate(0px, 0px)");
      }
    );
  }, []);

  return (
    <div style={{width: "100%"}}>

      <Menu page={"articles"} />

      <div style={{ padding:"70px 150px 150px 150px" }}>

        <table>
          <colgroup>
            <col style={{ width:"50%" }} />
            <col style={{ width:"50%" }} />
          </colgroup>
          <tbody>

            <tr>

              <td>
                <div style={{ marginRight:"100px" }}>

                  <h1 style={{ fontSize:"60px", color:"#444" }}>All articles</h1>
                  <p style={{ marginTop:"20px", fontSize:"18px", color:"#777" }}>Hundreds of articles for any mind, any mood, any goal. Browse all of our articles on meditation, mindfulness, sleep, and more.</p>

                  <audio controls style={{ display:"table", margin: "0px auto", paddingTop:"15px", paddingBottom:"30px", width:"100%" }}>
                    <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/ogg" />
                    <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/mpeg" />
                  </audio>

                  <BannerBtn>Try Vivablee for free</BannerBtn>

                </div>
              </td>

              <td>

                <BannerVideo></BannerVideo>
                <div style={{ position:"absolute", width:"calc( 50% - 153px )", height:"550px", borderRadius:"10px", marginTop:"-550px", backgroundColor: "rgba(0, 0, 0, 0.4)" }}>

                  <img style={{ height:"40px", marginTop:"30px", marginLeft:"30px", opacity:"0.8" }} src={require("../images/general/logo_original.png")}></img>
                  <div style={{ left: "50%", marginRight: "-50%", marginTop:"190px", position: "absolute", transform: "translate(-50%, -50%)" }}>
                    <BannerBtn2>
                      <img style={{ width:"24px", marginLeft:"5px", marginTop:"5px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn2>
                  </div>

                  <div style={{ bottom:"0", position: "absolute", color:"white", marginBottom:"30px", marginLeft:"30px", fontSize:"40px", fontWeight:"700" }}>The Power of <br />Mindfulness</div>

                </div>

              </td>

            </tr>

          </tbody>
        </table>

      </div>

      <div>

        <img style={{ width:"calc( 100% - 400px)", marginLeft:"200px", marginRight:"200px" }} src={require("../images/articles/features.jpg")}></img>

        <table style={{ marginLeft:"200px", marginRight:"200px", marginTop:"30px", width:"calc( 100% - 400px )" }}>

          <colgroup>
            <col style={{ width:"25%" }} />
            <col style={{ width:"25%" }} />
            <col style={{ width:"25%" }} />
            <col style={{ width:"25%" }} />
          </colgroup>

          <tbody>

            <tr>
              <td>
                <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>01 - How to be more empathetic</p>
              </td>
              <td>
                <p style={{ fontSize:"15px", color:"#444", cursor:"pointer" }}>02 - How to sleep better</p>
              </td>
              <td>
                <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>03 - How to stop worrying</p>
              </td>
              <td>
                <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>04 - Mental toughness</p>
              </td>
            </tr>

            <tr>
              <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
              <td><div style={{ width:"90%", height:"2px", backgroundColor:"#444", cursor:"pointer" }}></div></td>
              <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
              <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
            </tr>

          </tbody>

        </table>

      </div>

      <div style={{ marginLeft:"150px", marginRight:"150px", marginTop:"160px", marginBottom:"140px" }}>

        <h1 style={{ fontSize:"60px", fontWeight:"700", color:"#444", textAlign:"center", marginBottom:"25px" }}>Get some Headspace</h1>

        <div style={{ display:"table", margin: "0px auto" }}>

          <div style={{ borderRadius: "10px", backgroundColor:"#FA6400", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Wake up</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Travel</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Focus</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Destress</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Live Well</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Sleep</span>
          </div>

        </div>

        <PatternBackground>

          <div style={{ width:"35%", marginLeft:"auto", marginRight:"auto", textAlign:"center" }}>
            <div style={{ height:"100px" }}></div>
            <p style={{ fontSize:"18px" }}>Learn to manage feelings and thoughts with the lifelong skill of everyday mindfulness, any time of the day.</p>
          </div>

          <audio controls style={{ display:"table", margin: "0px auto", marginTop:"30px", width:"500px" }}>
            <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/ogg" />
            <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/mpeg" />
          </audio>

        </PatternBackground>

        <div style={{ height:"400px", borderRadius:"40px", position:"absolute", marginTop:"-410px", marginLeft:"-50px", transform: "rotate(20deg)", boxShadow: "5px 5px 10px 2px rgba(0,0,0,0.1)" }}>
          <img style={{ height:"400px" }} src={require("../images/main/app1.png")}></img>
        </div>

        <div style={{ height:"400px", borderRadius:"40px", position:"absolute", right:"0", marginTop:"-450px", marginRight:"100px", transform: "rotate(-10deg)", boxShadow: "5px 5px 10px 2px rgba(0,0,0,0.1)" }}>
          <img style={{ height:"400px" }} src={require("../images/main/app2.png")}></img>
        </div>


      </div>

      <div style={{ marginLeft:"140px", marginRight:"140px", marginBottom:"220px" }}>

        <h1 style={{ fontSize:"100px", color:"#f8f4ec", marginLeft:"30px", zIndex:"1", position:"relative" }}>Latest articles</h1>

        <table style={{ width:"100%", marginTop:"-45px", zIndex:"2", position:"relative" }}>

          <colgroup>
            <col style={{ width:"50%" }} />
            <col style={{ width:"50%" }} />
          </colgroup>

          <tbody>

            <tr>
              <td>
                <ArticleCardDiv1></ArticleCardDiv1>
                <ArticleCardDivGrey id="article_1">
                  <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                    <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                      <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                      <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>SLEEP</span>
                    </div>
                  </div>
                  <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                    <div style={{ padding:"15px 20px 5px 20px"  }}>
                      <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>How to sleep better?</p>
                    </div>
                    <BannerBtn3>
                      <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn3>
                  </div>
                  <div id="article_1_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                </ArticleCardDivGrey>
              </td>
              <td>
                <ArticleCardDiv2></ArticleCardDiv2>
                <ArticleCardDivGrey id="article_2">
                  <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                    <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                      <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                      <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>FOCUS</span>
                    </div>
                  </div>
                  <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                    <div style={{ padding:"15px 20px 5px 20px"  }}>
                      <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>How's meditation work?</p>
                    </div>
                    <BannerBtn3>
                      <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn3>
                  </div>
                  <div id="article_2_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                </ArticleCardDivGrey>
              </td>
            </tr>
            <tr>
              <td>
                <ArticleCardDiv3></ArticleCardDiv3>
                <ArticleCardDivGrey id="article_3">
                  <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                    <div style={{ float:"right", backgroundColor:"#FF585D", padding:"2px 8px 4px 10px", borderRadius:"50px" }}>
                      <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/chillful_icon_white.png")}></img>
                      <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"6px" }}>MORE THAN FOOD</span>
                    </div>
                  </div>
                  <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                    <div style={{ padding:"15px 20px 5px 20px"  }}>
                      <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>What is mindful eating?</p>
                    </div>
                    <BannerBtn3>
                      <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn3>
                  </div>
                  <div id="article_3_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF585D"}}></div>
                </ArticleCardDivGrey>
              </td>
              <td>
                <ArticleCardDiv4></ArticleCardDiv4>
                <ArticleCardDivGrey id="article_4">
                  <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                    <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                      <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                      <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>DESTRESS</span>
                    </div>
                  </div>
                  <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                    <div style={{ padding:"15px 20px 5px 20px"  }}>
                      <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>Mindful Walk!</p>
                    </div>
                    <BannerBtn3>
                      <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn3>
                  </div>
                  <div id="article_4_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                </ArticleCardDivGrey>
              </td>
            </tr>

          </tbody>

        </table>

        <div style={{ marginTop:"50px", position: "relative" }}>
          <div style={{ left: "50%", marginRight: "-50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
            <BannerBtn>View all articles</BannerBtn>
          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Articles;
