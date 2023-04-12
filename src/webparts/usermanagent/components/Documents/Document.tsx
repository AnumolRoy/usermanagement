// import{ useState, useEffect } from "react";
// import * as React from "react"

// import { sp } from '../../../../spauth';
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/files";
// import "@pnp/sp/folders";

// const DocumentLibrary = () => {
//   const [folders, setFolders] = useState([]);

//   useEffect(() => {
//     sp.web.lists.getByTitle("DocumentAnu").rootFolder.folders.get().then((data) => {
//       setFolders(data);
//     }).catch((error) => {
//       console.error(error);
//     });
    
//   }, []);

//   // Map the folders to the table in SharePoint
//   useEffect(() => {
//     folders.forEach(async (folder) => {
//       try {
//         const list = sp.web.lists.getByTitle("Your List Title");
//         const item = await list.items.add({
//           Title: folder.Name,
//           FolderURL: folder.ServerRelativeUrl,
//         });
//         console.log(`Item ${item.data.ID} has been created`);
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   }, [folders]);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Folder Name</th>
//             <th>Folder URL</th>
//           </tr>
//         </thead>
//         <tbody>
//           {folders.map((folder) => (
//             <tr key={folder.ServerRelativeUrl}>
//               <td>{folder.Name}</td>
//               <td>{folder.ServerRelativeUrl}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// export default DocumentLibrary;
