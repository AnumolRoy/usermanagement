import { useState } from 'react';
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '../../../../spauth';
import "../../styles/adduser.css"
import * as React from "react"
import Tab from '../Tab/Tab';
// import { useNavigate } from 'react-router-dom';

//  import { IWeb } from "@pnp/sp/webs";

interface AddUserProps {
  onAddUser: (user: User) => void;
  setShowCard: (show: boolean) => void;
  id: number;
}

interface User {
  Id: number;
  name: string;
  Email: string;
  Gender: string;
  Designation: string;
  url?: string;
}

function AddUser({ onAddUser, setShowCard, id }: AddUserProps): JSX.Element {
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [Designation, setDesignation] = useState('');
  // const [Image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      Id: id,
      name,
      Email,
      Gender,
      Designation
    };

    onAddUser(newUser);

    // const resp = await sp.web.lists.getByTitle("Contactslist").items.add({
    //   Name: newUser.name,
    //   email: newUser.Email,
    //   gender: newUser.Gender,
    //   designation: newUser.Designation
    // });
    // console.log(resp.data);

    //  console.log(resp.data.Id);
    // const folderId = resp.data.Id;

    // const documentLibraryName = "DocumentAnu";
    // const newFolderName = `${folderId}`;

    // const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    // documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
    //   .then(() => {
    //     console.log(`Folder '${newFolderName}' created successfully.`);
    //      });


    setName('');
    setEmail('');
    setGender('');
    setDesignation('');
    // setImage('');
    setShowCard(true);
  };



  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };


  const handleUploadClick = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    // const documentLibraryName = "DocumentAnu";
    const newUser: User = {
      Id: id,
      name,
      Email,
      Gender,
      Designation,

    };
    console.log(newUser, "new userrrrrrrrrrrrrrrrrrrrrrrrrrr");
    console.log(selectedFile,"-------------",selectedFile.name);
    // console.log(typeof selectedFile);
    

    const resp = await sp.web.lists.getByTitle("Contactslist").items.add({
      Name: newUser.name,
      email: newUser.Email,
      gender: newUser.Gender,
      designation: newUser.Designation
    });
    console.log(resp.data.Id);
    const folderId = resp.data.Id;

    console.log(resp.data,"oooooooooooooooooooooooo");

    //  console.log(resp.data.Id);
    // const folderId = resp.data.Id;

    const documentLibraryName = `DocumentAnu`
    const newFolderName = `${folderId}`;

    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder '${newFolderName}' created successfully.`);
      });



      
    const documentLibraryNameImage = `DocumentAnu/${folderId}`;
    const fileNamePath = `profile.png`;

    let result: any;
    if (selectedFile.size <= 10485760) {

      console.log(selectedFile);
      // small upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryNameImage).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
      console.log("url test", result)

    } 

    console.log("url test", result?.data?.ServerRelativeUrl)

     const imageurl = ` https://2mxff3.sharepoint.com/sites/ContactsAnu/DocumentAnu/${folderId}/profile.png`
   const list =   sp.web.lists.getByTitle("Contactslist");
    console.log(folderId)
   await list.items.getById(folderId).update({
    url:imageurl
      // url: result?.data?.ServerRelativeUrl,
      // imageurl: "test"

    })
  }

  // Return the form with input fields for the user's name, email, gender, and designation, along with Save and Cancel buttons
  return (

    <div className="userform">
      <Tab />
      {/* <div className='dmodal'>
                      <button className='updatebutton' onClick={() => handleUpdate(item.Id)}>Update</button>

                    </div> */}
      <form className="addform " onSubmit={handleSubmit}>

        <div className="enter">
          <label >
            Name:
            <input type="text" className='nameinput' value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="enter1">
          <label>
            Email:
            <input type="email" className='nameinput' value={Email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="enter2">
          <label>
            Gender:
            <select value={Gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Choose an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="enter3">
          <label>
            Designation:
            <input type="text" value={Designation} className='nameinput' onChange={(e) => setDesignation(e.target.value)} />
          </label>
        </div>


        <div>
          <input type="file" onChange={handleFileInputChange} />
          <button className='savebutton' onClick={handleUploadClick}>save</button>
          {selectedFile && (
            <div>
              <p>Selected file: {selectedFile.name}</p>
              {/* <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" /> */}
            </div>
          )}
         <button className='cancelbutton' type="button" onClick={() => setShowCard(true)}>Cancel</button>

        </div>

      </form>


    </div>


  );
}

export default AddUser;