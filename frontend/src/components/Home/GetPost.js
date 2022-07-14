import axios from "axios";
import React, { useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import LikeButton from "./LikePost";
 

const dateParser = (num) => {
  let options = {
      hour: "2-digit",
      minute: "2-digit",
  };

  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr", options);
  return date.toString();
};

const GetPost = ({ post }) => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState(post.message);
  const [pictureUpdate, setPictureUpdate] = useState(""); 
  const admin = localStorage.getItem('admin')
  const userId = localStorage.getItem('userId')

  // on affiche l'image
  function handlePicture(e) {  
    e.target.closest('.blocPost').querySelector(".preview").src = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0]);
    setPictureUpdate(e.target.files[0]);
    console.log();
  };

  // on annulle le fichier
  function cancelPicture(e) {
    e.target.closest(".blocPost").querySelector("#picture").value = ""; 
    setPictureUpdate('');
  }
  
  function handleClick(e) {
    e.target.closest(".blocPost").classList.toggle("off");
    setIsDisabled(!isDisabled)
  }


  const updatePost = (e) => {
    e.preventDefault();
    const modifError = document.querySelector("#modifError");
    const data = new FormData();
    data.append('message', messageUpdate);
    data.append('file', pictureUpdate);

    axios(
        { 
          method: "put", 
          url: `http://localhost:5000/api/post/` + post._id,
          headers: {
            Authorization: localStorage.getItem('token'),
            "Content-Type": "multipart/form-data"
          },
          data: data
      })
      .then((res) => {
        console.log(res.data);
        setMessageUpdate(messageUpdate);
        setPictureUpdate(pictureUpdate)
        e.target.closest(".blocPost").classList.toggle("off");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          window.setTimeout(() => {
            window.location.reload() }, 2000)
          modifError.textContent = err.response.data.message;
        }
      });
  }

  useEffect(() => { 
    document.querySelectorAll(".ta").forEach(ta => {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px'; 
    });
  });

  return (
      <div className='blocPost off' key={post._id}>
        <img className="preview" src={post.picture} alt="" />
        <div className="inline">
          <div className='postName'>{post.nom} {post.prenom}</div>
          <p className="postDate"> {dateParser(post.date)}</p>
        </div>
        <form className='modif' onSubmit={(e) => updatePost(e)} >
          <textarea id="text" className="ta" defaultValue={messageUpdate} disabled={!isDisabled} 
            onChange={(e) => setMessageUpdate(e.target.value)}></textarea> 
          <div className='bloc-inputFile'>
            <input type="file" id="picture" name="picture" accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handlePicture(e)} />
            <input type="button" id="cancelPicture" value="Annuler fichier"
              onClick={(e) => cancelPicture(e)}/>
          </div> 
          {(post.userId === userId || admin === "true") && (  
            <div className='blocBtn'>
                <input type="button" value="Modifier" onClick={(e) => handleClick(e)}/>
                <input type="submit" value="Sauvegarder" className="save"/>
                <input type="button" value="Supprimer" onClick={(e) => DeletePost(e, post._id)} />
            </div>
          )}
        </form>
        <LikeButton post={post} /> 
      </div>
  );
};

export default GetPost;









