import React, { useState, createContext } from 'react';

export const CurrentLogContext = createContext();

export const CurrentLogProvider = (props) => {
   const [currentLog, setCurrentLog] = useState({});

   return (
      <CurrentLogContext.Provider value={[currentLog, setCurrentLog]}>
         {props.children}
      </CurrentLogContext.Provider>
   );
};
