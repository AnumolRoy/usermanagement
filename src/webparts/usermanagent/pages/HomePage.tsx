
import * as React from 'react';
 import Card from '../components/Card/Card';
 import Main from '../components/Main/Main';
// import Document from "../components/Documents/Document"

import { useState, useEffect } from 'react';
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '../../../spauth';
import { User } from '../types';


import "./homepage.css"

function HomePage(): JSX.Element {

  const [employees, setEmployees] = useState<User[]>([]);
  console.log("//////////////////////////////////////////////////////////////");
  useEffect(() => {
    (async () => {
      const items: any = await sp.web.lists.getByTitle('Contactslist').items();
      const newEmployees = items.map((item: any) => ({
        id: item.Id ,
        name: item.name,
        email: item.email,
        gender: item.gender,
        designation: item.designation,
        image_url : item.Image_url,
      }));
      setEmployees(newEmployees);
      console.log(`employees+++++++++++++++++++++++ ${employees}`)
    })();
  }, []);



  useEffect(() => {
    sp.web.lists.getByTitle("Contactslist").items().then((res) => {
      console.log(res,"+++++++++++++++++++++++++");
    })
  }, []);

  return (
    <div  >
      <div className="mainNav">
               <Main/> 
            </div>
     <div className="cardcomponent"> <Card users={[]} /></div>
      
    </div>
    
  );
}

export default HomePage;
