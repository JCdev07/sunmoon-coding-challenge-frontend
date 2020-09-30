import React, { useState, createContext } from 'react';

export const TimerContext = createContext();

export const TimerProvider = (props) => {
   const [timer, setTimer] = useState({
      second: 0,
      millisecond: 0,
   });

   return (
      <TimerContext.Provider value={[timer, setTimer]}>
         {props.children}
      </TimerContext.Provider>
   );
};
