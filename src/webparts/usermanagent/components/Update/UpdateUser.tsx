// import { useState } from 'react';
// import * as React from "react"

// interface UpdateUserProps {
//   onUpdateUser: (user: User) => void;
//   setShowCard: (show: boolean) => void;
//   user: User;
// }

// interface User {
//   Id: number;
//   name: string;
//   Email: string;
//   Gender: string;
//   Designation: string;
// }

// function UpdateUser({ onUpdateUser, setShowCard, user }: UpdateUserProps): JSX.Element {
//   const [name, setName] = useState(user.name);
//   const [Email, setEmail] = useState(user.Email);
//   const [Gender, setGender] = useState(user.Gender);
//   const [Designation, setDesignation] = useState(user.Designation);

//   // Define the function that handles form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Update the user object with the new values
//     const updatedUser: User = {
//       ...user,
//       name,
//       Email,
//       Gender,
//       Designation,
//     };
//     // Call the onUpdateUser function passed down from the parent component and pass in the updated user object
//     onUpdateUser(updatedUser);
//     // Reset the state variables to their initial values and show the Card component again
//     setName('');
//     setEmail('');
//     setGender('');
//     setDesignation('');
//     setShowCard(true);
//   };

//   // Return the form with input fields for the user's name, email, gender, and designation, along with Save and Cancel buttons
//   return (


//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Id
//           <input type="number" value={user.Id} readOnly />
//         </label>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Gender:
//           <select value={Gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="">Choose an option</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </label>
//       </div>
//       <div>
//         <label>
//           Designation:
//           <input type="text" value={Designation} onChange={(e) => setDesignation(e.target.value)} />
//         </label>
//       </div>
//       <button type="submit">Saveuser</button>
//       <button type="button" onClick={() => setShowCard(true)}>Cancel</button>
//     </form>
//   );
// }

// export default UpdateUser;
