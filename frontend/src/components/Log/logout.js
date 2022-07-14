const Logout = () => {
    if (window.confirm("Voulez-vous vous deconnecter ?")) {
       localStorage.clear();
       window.location = "/";
    }
}

export default Logout