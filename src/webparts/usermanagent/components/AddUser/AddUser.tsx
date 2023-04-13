import { useState } from 'react';
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '../../../../spauth';
import "../../styles/adduser.css"
import * as React from "react"
// import { useNavigate } from 'react-router-dom';


interface AddUserProps {
  onAddUser: (user: User) => void;
  setShowCard: (show: boolean) => void;
  id: number;
}

interface User {
  Id: number;
  Name: string;
  email: string;
  gender: string;
  designation: string;
  url?: string;
}

function AddUser({ onAddUser, setShowCard, id }: AddUserProps): JSX.Element {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  // const [Image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      Id: id,
      Name,
      email,
      gender,
      designation
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
      Name,
      email,
      gender,
      designation,

    };
    console.log(newUser, "new userrrrrrrrrrrrrrrrrrrrrrrrrrr");
    console.log(selectedFile,"-------------",selectedFile.name);
    // console.log(typeof selectedFile);
    

    const resp = await sp.web.lists.getByTitle("Contactslist").items.add({
      Name: newUser.Name,
      email: newUser.email,
      gender: newUser.gender,
      designation: newUser.designation
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

    // <div className="userform">
   
     
    //   <form className="addform " onSubmit={handleSubmit}>

    //     <div className="enter">
    //       <label >
    //         Name:
    //         <input type="text" className='nameinput' value={Name} onChange={(e) => setName(e.target.value)} />
    //       </label>
    //     </div>
    //     <div className="enter1">
    //       <label>
    //         Email:
    //         <input type="email" className='nameinput' value={email} onChange={(e) => setEmail(e.target.value)} />
    //       </label>
    //     </div>
    //     <div className="enter2">
    //       <label>
    //         Gender:
    //         <select value={gender} onChange={(e) => setGender(e.target.value)}>
    //           <option value="">Choose an option</option>
    //           <option value="male">Male</option>
    //           <option value="female">Female</option>
    //           <option value="other">Other</option>
    //         </select>
    //       </label>
    //     </div>
    //     <div className="enter3">
    //       <label>
    //         Designation:
    //         <input type="text" value={designation} className='nameinput' onChange={(e) => setDesignation(e.target.value)} />
    //       </label>
    //     </div>


    //     <div>
    //       <input type="file" onChange={handleFileInputChange} />
    //       <button className='savebutton' onClick={handleUploadClick}>save</button>
    //       {selectedFile && (
    //         <div>
    //           {/* <p>Selected file: {selectedFile.name}</p> */}
    //           {/* <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" /> */}
    //         </div>
    //       )}
    //      <button className='cancelbutton' type="button" onClick={() => setShowCard(true)}>Cancel</button>

    //     </div>

    //   </form>


    // </div>
<div className="wrapper" >
	<div className="registration_form">
		<div className="title">
		Add Employee
		</div>

		<form className='' onSubmit={handleSubmit}>
			<div className="form_wrap">
				<div className="input_grp">
					<div className="input_wrap">
						<label > Name</label>
						<input type="text"value={Name} onChange={(e) => setName(e.target.value)}/>
					</div>
					
				</div>
				<div className="input_wrap">
					<label>Email Address</label>
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="input_wrap">
					<label>Gender</label>
					<ul>
						<li>
							<label className="radio_wrap">
								<input type="radio" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="input_radio" checked/>
								<span>Male</span>
							</label>
						</li>
						<li>
							<label className="radio_wrap">
								<input type="radio" name="gender"value={gender} onChange={(e) => setGender(e.target.value)} className="input_radio"/>
								<span>Female</span>
							</label>
						</li>
					</ul>
				</div>
				<div className="input_wrap">
					<label >Designation</label>
					<input type="text"value={designation} onChange={(e) => setDesignation(e.target.value)}/>
				</div>
				{/* <div className="input_wrap">
					<label >Country</label>
					<input type="text" id="country"/>
				</div> */}
				<div className="input_wrap">
					<input  type="file" onChange={handleFileInputChange} />
          <button className='submit_btn' onClick={handleUploadClick}>save</button>
           {selectedFile && (
            <div>
              {/* <p>Selected file: {selectedFile.name}</p> */}
              {/* <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" /> */}
            </div>
          )}
         <button className='submit_btn' type="button" onClick={() => setShowCard(true)}>Cancel</button>

        </div>
				
			</div>
		</form>
	</div>
</div>

  );
}

export default AddUser;