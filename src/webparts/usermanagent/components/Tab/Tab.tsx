import * as React from "react"
// import { useNavigate } from 'react-router-dom';
import './Tab.css';
import { Link } from "office-ui-fabric-react";

const Tab: React.FC = () => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

  return (
    <div className="tabcontainer">
      
      <button className="back-button" >
       Back
      </button>
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
