
import { createContext, useEffect, useState } from 'react';

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
  const [token, setToken] = useState(null);


  useEffect(() => {
   if(localStorage.getItem('userToken')!==null){
    setToken(localStorage.getItem('userToken'));
   }
  }, [])
  

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}