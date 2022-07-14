import axios from "axios";

const DeletePost = (e, id) => {
    e.preventDefault(); 
    if (window.confirm("Voulez-vous supprimer définitivement la publication ?")) {
      axios(
        {
          method: 'delete',
          url: `http://localhost:5000/api/post/${id}`,
          headers: {
                Authorization: localStorage.getItem('token'),
            },
        })
      .then((res) => {
        console.log(res); 
        window.location.reload();
      })
      .catch((err) => {
        console.log(err); 
      }); 
    }
};

export default DeletePost;