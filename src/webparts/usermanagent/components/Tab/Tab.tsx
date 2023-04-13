import * as React from "react"
// import { useNavigate } from 'react-router-dom';
import '../../styles/tab.css';
import { Link } from "office-ui-fabric-react";

const Tab: React.FC = () => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

  return (
    <div className="tabcontainer">
      
      <Link to="/"> <button className="back-button" >
       Back
      </button></Link>
     <button className="back-button" >
       Profile
      </button>
      <Link to="/document"> <button className="back-button" >
       Documents
      </button></Link>
    </div>
  );
};

export default Tab;
