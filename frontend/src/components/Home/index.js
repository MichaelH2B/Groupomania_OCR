import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreatePost from "./CreatePost";
import GetPost from './GetPost';

const Card = () => { 
  const [data, setData] = useState([]); 
  const getData = async () => {
    await axios(
      { 
        method: "get", 
        url: `http://localhost:5000/api/post`,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then ((res) => { 
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err)
      }
    ); 
  };

  useEffect(() => {
    getData(); 
  }, []); 
      
  return (
    <div className="blocPosts">
      <CreatePost /> 
      {data.slice(0).reverse().map((post) => (
        <GetPost key={post._id} post={post} />
      ))}
    </div>
  );
};
  
export default Card;