import React, { useState } from 'react';
import axios from 'axios';
 

const CreatePost = () => {
  const [message, setMessage] = useState('');
  const [picture, setPicture] = useState('');
  const [showPicture, setShowPicture] = useState();

  // on affiche l'image
  function handlePicture(e) { 
    setShowPicture(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    setPicture(e.target.files[0]);
  };
 
  function changeTextArea(e){
    setMessage(e.target.value); 
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight+'px'; 
  }

  // on annulle le fichier
  function cancelPicture(e) {
    e.target.closest(".postForm").querySelector("#picture").value = "";
    setShowPicture();
    setPicture('');
  }

  const handlePost = (e) => {
    e.preventDefault();
    const messageError = document.querySelector("#messageError");
    const data = new FormData();
    data.append('message', message);
    data.append('file', picture); 

    
    axios(
      { 
        method: "post", 
        url: `http://localhost:5000/api/post`,
        headers: {
          Authorization: localStorage.getItem('token'),
          "Content-Type": "multipart/form-data"
        },
        data: data 
    })
    .then((res) => {
      window.location.reload();
      console.log(res.data); 
     
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        messageError.textContent = err.response.data.error;
      }
    }); 
    
  };
 

  return (
    <form className="postForm" onSubmit={(e) => handlePost(e)}>
      <div className="style-border">
        <textarea name="message" className="autoExpand"  placeholder=" Quoi de neuf ?" 
                  onChange={(e) => changeTextArea(e)} value={message} />
        <div id="messageError"></div>
        <div className='bloc-inputFile'>
          <input type="file" id="picture" name="picture" accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handlePicture(e)} />
          <input type="button" value="Annuler fichier" 
                onClick={(e) => cancelPicture(e)}/>
        </div>
        <img className="showImg off"src={showPicture} alt="" />
        <input className="inputFile" type="submit" value="Publier"/>
      </div>
    </form>
  );
};

export default CreatePost;
