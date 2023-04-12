import { createContext, useEffect, useState } from 'react';
import * as React from 'react';

import { sp } from '../../../spauth';
import '@pnp/sp/webs';
import '@pnp/sp/folders';
import { User } from '../types';



type EmployeeContextType = {
  employees: User[];
  setEmployees: React.Dispatch<React.SetStateAction<User[]>>;
};

type EmployeeContextProviderProps = {
  children: React.ReactNode;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  setEmployees: () => {},
});

const EmployeeContextProvider = ({ children }: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const items: any = await sp.web.lists.getByTitle('Contactslist').items();
      const newEmployees = items.map((item: any) => ({
        id: item.Id ,
        Name: item.name,
        email: item.Email,
        gender: item.Gender,
        designation: item.Designation,
        image_url : item.Image_url,
      }));
      setEmployees(newEmployees);
      console.log("log in contexttttttttttttttttttttttt");
      
      console.log(`employees ${employees}`)
    })();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
