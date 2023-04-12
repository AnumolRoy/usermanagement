
import { useState} from 'react';
import * as React from "react"
import Search from '../../pages/Search';
import AddUser from '../AddUser/AddUser';
// import styles from "./card.module.scss";
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '../../../../spauth';
import "../../styles/card.css"
// import axios from 'axios';
 //import { fileFromServerRelativePath } from '@pnp/sp/presets/all';
 import { EmployeeContext } from '../../context/employeeContext';

interface User {
  name: string;
  Email: string;
  Gender: string;
  Designation: string;
  Id: number
  url?: string;
}

interface CardProps {
  users: User[]
}

const Card: React.FC<CardProps> = ({ users }) => {
  const {employees} = React.useContext(EmployeeContext)
  // Setting up state variables for user list and card visibility
  const [userList, setUserList] = useState<User[]>([]);
  const [test, setTest] = useState<boolean>(true);
  const [showCard, setShowCard] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
   //const [imageSrc, setImageSrc] = useState<string>("");
  // const [imageUrl, setImageUrl] = useState('');

console.log("card testttttttttttt");

console.log(employees,"employeessssssssssss");

  // useEffect(() => {
  //   sp.web.lists.getByTitle("Contactslist").items().then((res) => {
  //     console.log(res,"+++++++++++++++++++++++++");
  //   })
  // }, []);

  React.useEffect(() => {
    (async () => {
      console.log("first")
      const items: any = await sp.web.lists.getByTitle('Contactslist').items();
      const newEmployees = items.map((item: any) => ({
        id: item.Id ,
        name: item.name,
        email: item.email,
        gender: item.gender,
        designation: item.designation,
        url : item.url,
      }));
      setUserList(newEmployees);
      console.log(`employees+++++++++++++++++++++++ ${employees}`)
    })();
  }, []);
 
  // Function to handle adding a new user to the user list
  const handleAddUser = async (newUser: User) => {
    console.log(userList, "userlist");

    const updatedList = [...userList, newUser];
    setTest(!test)
     setUserList(updatedList);

    // setUserList(updatedList);
    // Setting showCard back to true to show the user list again
    setShowCard(true);
    // const contactList = await sp.web.lists.getByTitle("Contactslist");
    // // console.log(contactList);

    // await contactList.items.add({


    //   Id: newUser.Id,
    //   Name: newUser.name,
    //   email: newUser.Email,
    //   gender: newUser.Gender,
    //   designation: newUser.Designation,
    //   Image:newUser.image
    // })
    //   .then(() => console.log("New user added to Contacts listASDDACASDSD"))

    //   .catch((error) => {
    //     console.log("Error adding new user to Contacts list: ", error.status, error.statusText);
    //     console.log("Error response body: ", error.body);
    //   });


  };

  async function handleDelete(Id: number): Promise<void> {
    try {
      // Get the list by title
      sp.web.lists.getByTitle("Contactslist").items.getById(Id).delete();


      // Delete the item by ID

      console.log(`Item ${Id} deleted successfully.`);
      alert("Item deleted successfully.");
    } catch (error) {
      if (error.message.indexOf("Item does not exist") !== -1) {
        console.log(`Error deleting item ${Id}: Item does not exist.`);
        alert("This item does not exist or has already been deleted.");
      } else {
        console.log(`Error deleting item ${Id}: ${error}`);
        alert("An error occurred while deleting the item.");
      }
    }
  }
  async function handleUpdate(Id: number): Promise<void> {
    console.log(Id);

    const name = window.prompt("Enter the new name of the contact:");
    const Email = window.prompt("Enter the new email of the contact:");
    const Gender = window.prompt("Enter the new gender of the contact:");
    const Designation = window.prompt("Enter the new designation of the contact:");

    try {
      const contactItem = sp.web.lists.getByTitle("Contactslist").items.getById(Id);
      if (contactItem) {
        // Update the item by ID
        await sp.web.lists.getByTitle("Contactslist").items.getById(Id).update({
          Name: name,
          email: Email,
          gender: Gender,
          designation: Designation,
        
        });

        console.log(`Item ${Id} updated successfully.`);
        alert("Item updated successfully.");
      } else {
        console.log(`Item ${Id} does not exist.`);
        alert("Item does not exist.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the item.");
    }
  }


  // Function to handle searching for users by name
  const handleSearch = (searchText: string) => {
    if (searchText) {
      const searchedUser = userList.filter((user) =>
        user.name && user.name.toLowerCase().includes(searchText.toLowerCase())
      );
      // Updating the user list state with the filtered list
      setUserList(searchedUser);
      if (searchedUser.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }

  };
  console.log(userList, "userlist+++++++++++++");

  console.log("card testttttttttttt");

  return (


    <div className="container">

      <div>
        {showCard ? (
          // Showing the user list
          <>

            <div className="">
              <div ><button className="adduserbutton "

                onClick={() => setShowCard(false)}
              >
                Add Employee
              </button>


              </div>
              <Search onSearch={handleSearch} />
            </div>
            {/* <img src="https://media.gettyimages.com/photos/film-actor-mohanlal-v-nair-jury-member-of-the-cnn-ibn-indian-of-the-picture-id905654972" alt='User Image' /> */}

            {userList &&
              <div className='card-container'>
                {/* <img src="https://media.gettyimages.com/photos/film-actor-mohanlal-v-nair-jury-member-of-the-cnn-ibn-indian-of-the-picture-id905654972" alt='User Image' /> */}

                {/* Mapping over the user list to show each user */}
                {userList.map((item) => {
                  console.log(item,"hhhhh")
                  return (
                    <div key={item.Id} className='card'>
                      <div className='img'>
              
                          
                        
                        {item.url ? (
                          <img src={`${item.url}`} alt='User Image' />
                        ):(
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkcU_1v_nc5jW8YrBvQVAwt8DUsbJzrK4T6w&usqp=CAU" alt="" />
                        )}
                      </div>
                      <div className="details" style={{ fontWeight: "bold" }}>
                        <p>Name: {item.name}</p>
                        <p>email: {item.Email}</p>
                        <p>gender: {item.Gender}</p>
                        <p>designation: {item.Designation}</p>
                      </div>
                      <div >
                        <button className='deletebutton' onClick={() => handleDelete(item.Id)}>Delete</button>


                      </div>
                      <div className='dmodal'>
                        <button className='updatebutton' onClick={() => handleUpdate(item.Id)}>Update</button>

                      </div>

                    </div>

                  );
                })}
              </div>
            }

          </>
        ) : (
          // Showing the AddUser component
          <AddUser onAddUser={handleAddUser} setShowCard={setShowCard} id={userList.length} />
        )}

      </div>
      {notFound &&
        <div className="flex">
          <img src="https://media.istockphoto.com/id/1299140151/vector/404-error-page-not-found-template-with-dead-file.jpg?s=612x612&w=0&k=20&c=aiqJjuQ3_8FTOwFMcYsZW-c1ixCZeZt76-Q6nxMucw0=" alt="" />
        </div>
      }


    </div>
  );
};

export default Card;
