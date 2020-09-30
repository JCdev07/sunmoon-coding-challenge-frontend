import React, { useState, useMemo } from 'react';
import Stopwatch from './Components/Stopwatch';
import { TimerProvider } from './Context/TimerProvider';
import { LogsContext } from './Context/LogsContext';
import LogsList from './Components/LogsList';

function App() {
   // Global States
   const [logs, setLogs] = useState([]);
   const [isTimerActive, setIsTimerActive] = useState(false);
   const [fetchLogs, setFetchLogs] = useState(false);

   // Only Fetch all logs when isTimerActive state is Changed
   // Store it in 'logs' variable
   useMemo(() => {
      fetch('http://localhost:5000/api/logs')
         .then((res) => res.json())
         .then(({ data }) => {
            setLogs(data);
         });
   }, [isTimerActive]);

   return (
      <div className='App'>
         <LogsContext.Provider value={[logs, setLogs]}>
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
               />
            </TimerProvider>
         </LogsContext.Provider>
      </div>
   );
}

export default App;
