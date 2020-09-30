import React, { useState, useMemo } from 'react';
import Stopwatch from './Components/Stopwatch';
import { TimerProvider } from './Context/TimerProvider';
import { LogsContext } from './Context/LogsContext';
import LogsList from './Components/LogsList';
import { CurrentLogProvider } from './Context/CurrentLogProvider';

function App() {
   // Global States
   const [logs, setLogs] = useState([]);
   const [isTimerActive, setIsTimerActive] = useState(false);
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
   }, [isTimerActive]);

   return (
      <div className='App'>
         <LogsContext.Provider value={[logs, setLogs]}>
            <CurrentLogProvider>
               <TimerProvider>
                  <Stopwatch
                     isTimerActive={isTimerActive}
                     setIsTimerActive={setIsTimerActive}
                     setFetchLogs={setFetchLogs}
                  />

                  <LogsList
                     fetchLogs={fetchLogs}
                     isTimerActive={isTimerActive}
                     setFetchLogs={setFetchLogs}
                     isLoading={isLoading}
                  />
               </TimerProvider>
            </CurrentLogProvider>
         </LogsContext.Provider>
      </div>
   );
}

export default App;
