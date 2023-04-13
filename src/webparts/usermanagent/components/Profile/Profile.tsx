
import * as React from 'react';
import { useState, useEffect } from 'react';
import { sp } from '../../../../spauth';
import { useParams, useNavigate } from 'react-router-dom';
import Tab from '../Tab/Tab';
import "../../styles/profile.css"

interface User {
  Name: string;
  email: string;
  gender: string;
  designation: string;
  Id: number;
  url?: string;
}

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const { Id } = useParams<{ Id: string }>();
  console.log(Id,"id log");
  
  const profileId = parseInt(Id);
  console.log(profileId,"profile id log in profile page");
  
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const item: any = await sp.web.lists.getByTitle('Contactslist').items.getById(profileId)();
        const newUser: User = {
          Id: item.Id,
          Name: item.Name,
          email: item.email,
          gender: item.gender,
          designation: item.designation,
          url: item.url,
        };
        setUser(newUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [profileId]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  console.log(user,"user in profile page");
  

  return (
    <div>
           <Tab />
      <div>
        <div className='profilecontainer'>
        <div className='imageurl' >
          <img src={user.url} alt="userimage" />
         
        </div>
        <div className='profilecontent'>
        <h1>{user.Name}</h1>
          <p>Email: {user.email}</p>
          <div>
            <p>Designation:{user.designation}</p>
          </div>
          <div>
            <p>Gender:{user.gender}</p>
          </div>
        </div>
       
        <button className='gobackbutton' onClick={() => navigate(-1)}>Go Back</button>

      </div>
    </div>
    </div>
  );
};

export default Profile;























// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { sp } from '../../../../spauth';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';




// interface User {
//     Name: string;
//     email: string;
//     gender: string;
//     designation: string;
//     Id: number
//     url?: string;
// }


// interface IProfileProps { }

// const Profile: React.FC<IProfileProps> = () => {

//     const { Id } = useParams<{ Id: string }>();

//     const profileId = parseInt(Id);

//     const navigate = useNavigate();


//     const [userList, setUserList] = useState<User[]>([]);



//     useEffect(() => {
//         (async () => {
//             console.log("first")
//             const items: any = await sp.web.lists.getByTitle('Contactslist').items.getById(profileId)();
//             const newEmployees = items.map((item: any) => ({
//                 Id: item.Id,
//                 Name: item.Name,
//                 email: item.email,
//                 gender: item.gender,
//                 designation: item.designation,
//                 url: item.url,
//             }));
//             setUserList(newEmployees);
//         })();
//     }, []);


//     const user = userList[profileId];

//     return (
//         <div>


//             <div className="">
//                 <div className="">
//                     {/* <img src={`${user.url}`} alt="userimage" /> */}
//                     <h1>{user.Name}</h1>
//                     <p>Email: {user.email}</p>
//                 </div>
//                 <div className="">
//                     <div className="">
//                         <h2>Designation:</h2>
//                         <p>{user.designation}</p>
//                     </div>
//                     <div className="">
//                         <h2>Gender:</h2>
//                         <p>{user.gender}</p>
//                     </div>




//                 </div>
//             </div>
//             <button onClick={() => navigate(-1)}>Go Back</button>
//         </div>

//     );
// };

// export default Profile;