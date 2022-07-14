import React from "react";
import Log from "../components/Log";
import BannerLog from "../components/BannerLog"
import "../styles/indexLog.css"
import "../styles/errorLog.css"


const Auth = () => {

  return (
		<div>
			<BannerLog />
			<Log signin={true} signup={false} />
		</div>
	)
  
};  
  
export default Auth;
