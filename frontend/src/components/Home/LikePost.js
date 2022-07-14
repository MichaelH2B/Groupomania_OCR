import React, { useEffect, useState } from "react";
import axios from "axios"; 

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LikeButton({ post }) { 
  const userId = localStorage.getItem('userId'); 
  const [arrayUsersLiked, setUserLiked] = useState(post.usersLiked); 
  const [liked, setLiked] = useState(arrayUsersLiked.includes(userId));  
  const [likedNb, setLikedNb] = useState(post.usersLiked.length);  

  const like = (e) => { 
   
    axios(
      { 
        method: "post", 
        url: `http://localhost:5000/api/post/like/` + post._id,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if(!liked){
          let temp = [...arrayUsersLiked];
          temp.push(userId);
          // console.log(temp);
          // console.log(userId);
          setUserLiked(temp);
          setLiked(true); 
        }else{  
          let newArray = arrayUsersLiked.filter(en => en !== userId);
          // console.log(arrayUsersLiked);
          setUserLiked(newArray);
          setLiked(false);  
        }
        setLikedNb(res.data.nbLike);  
       
        
      })
  }  

  useEffect(() => {
    if(post.usersLiked.length > 0){
      setUserLiked(post.usersLiked); 
    }else{
      setUserLiked([]);
    }
    // console.log(liked);
  }, []);
 

  return (
    <div className="blocLike">
      <div className={ `btn-like` } >
          <FontAwesomeIcon icon={faHeart} id={liked ? 'like' : 'unlike'} className={liked ? 'liked' : ''} type="button" onClick={(e) => like(e)} value={likedNb} />
      </div> 
      <span className="number">{likedNb}</span>
    </div>
  );
}

export default LikeButton;
