import React, { useEffect, useContext } from 'react';
import { LogsContext } from '../Context/LogsContext';

const LogsList = function ({ fetchLogs, isTimerActive, setFetchLogs }) {
   // Initialize logs state from context
   const [logs, setLogs] = useContext(LogsContext);

   // Create a new log using POST request
   // Only run when isTimerActive state is changed
   // isTimerActive - false when stop button clicked|true when start button clicked
   useEffect(() => {
      if (fetchLogs) {
         fetch('http://localhost:5000/api/logs', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               logType: isTimerActive ? 'start' : 'stop',
               timestamp: getTimestamp(),
            }),
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               console.log(data);
               setFetchLogs(false);
            });
      }
   }, [isTimerActive]);

   // Generate Timestamp @ format "2019-10-17 07:45:08"
   const getTimestamp = () => {
      const startDate = new Date();
      const timestamp = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}:${startDate.getMilliseconds()}`;

      return timestamp;
   };

   return (
      <div className='container'>
         <div className='row'>
            <div className='col-6'>
               <h1>Logs</h1>
               <ul>
                  {logs.map((log) => {
                     return (
                        <li
                           key={log.timestamp}
                        >{`${log.timestamp} ${log.logType}`}</li>
                     );
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default LogsList;
