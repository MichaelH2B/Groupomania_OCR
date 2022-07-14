import React from "react";
import BannerHome from "../components/BannerHome";
import Card from "../components/Home/index";
import Logout from "../components/Log/logout";
import "../styles/homePostForm.css"
import "../styles/homeGetPost.css"
import "../styles/LikePosts.css"

const Home = () => {


    if(localStorage.length <= 2) {
      console.log('non connecté');
      return (
        <div className="error">
          404 Not Found
        </div>
      )
    } else {
      return (
        <div className="home">
          <div className="header">
            <BannerHome />
            <div className="inputLogout">
              <input className='logout' type="button" value="Deconnexion" onClick={(e) => Logout(e)}/>
            </div>
          </div>
          <Card />
        </div>
        
      );
    }
};
  
export default Home;