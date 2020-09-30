import React, { useState, useMemo } from 'react';
import Stopwatch from './Components/Stopwatch';
import { TimerProvider } from './Context/TimerProvider';
import { LogsContext } from './Context/LogsContext';
import LogsList from './Components/LogsList';
import { CurrentLogProvider } from './Context/CurrentLogProvider';
import styled from 'styled-components';

const MainContainer = styled.div`
   background-color: #0b1354;
   text-align: center;
   font-family: 'Montserrat', 'sans-serif';
   color: #a155b9;
   height: 100vh;
   width: 100vw;
   overflow: hidden;
`;

function App() {
   // Global States
   const [logs, setLogs] = useState([]);
   const [isTimerActive, setIsTimerActive] = useState(false);
   const [isLogDeleted, setIsLogDeleted] = useState(false);
   const [fetchLogs, setFetchLogs] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   // Only Fetch all logs when isTimerActive state is Changed
   // Store it in 'logs' variable
   useMemo(() => {
      setIsLoading(true);
      fetch('https://sunmoon-logger.herokuapp.com/api/logs')
         .then((res) => res.json())
         .then(({ data }) => {
            setLogs(data);
            setIsLoading(false);
         });
   }, [isTimerActive || isLogDeleted]);

   return (
      <div className='App'>
         <LogsContext.Provider value={[logs, setLogs]}>
            <CurrentLogProvider>
               <TimerProvider>
                  <MainContainer className='container-fluid'>
                     <div className='row justify-content-around h-100 mt-5'>
                        <div className='col-12 col-md-7 p-0 mx-auto d-flex justify-content-center align-content-center'>
                           <Stopwatch
                              isTimerActive={isTimerActive}
                              setIsTimerActive={setIsTimerActive}
                              setFetchLogs={setFetchLogs}
                           />
                        </div>
                        <div className='col-12 col-md-5 p-0 mx-auto mt-5'>
                           <LogsList
                              fetchLogs={fetchLogs}
                              isTimerActive={isTimerActive}
                              setIsTimerActive={setIsTimerActive}
                              setFetchLogs={setFetchLogs}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              setIsLogDeleted={setIsLogDeleted}
                           />
                        </div>
                     </div>
                  </MainContainer>
               </TimerProvider>
            </CurrentLogProvider>
         </LogsContext.Provider>
      </div>
   );
}

export default App;
