import React, { useEffect, useContext } from 'react';
import { LogsContext } from '../Context/LogsContext';
import { CurrentLogContext } from '../Context/CurrentLogProvider';
import LoadingOverlay from 'react-loading-overlay';

const LogsList = function ({
   fetchLogs,
   isTimerActive,
   setFetchLogs,
   isLoading,
}) {
   // Initialize logs state from context
   const [logs, setLogs] = useContext(LogsContext);

   // Initialize current log Context
   const [currentLog, setCurrentLog] = useContext(CurrentLogContext);

   // Create a new log using POST request | Update Log using PUT request
   // Only run when isTimerActive state is changed
   // isTimerActive - 'false' when stop button clicked | 'true' when start button clicked
   useEffect(() => {
      // if isTimerActive === true
      // make a POST request to create new log
      if (fetchLogs && isTimerActive) {
         fetch('https://sunmoon-logger.herokuapp.com/api/logs', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
            },
            body: JSON.stringify({
               logType: 'start',
               timestamp: getTimestamp(),
            }),
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               // set currentLog == newly created log
               // set fetchlogs == false
               setCurrentLog(data.newLog);
               setFetchLogs(false);
            });
      }

      // if isTimerActive === false
      // make a PUT request to update the current log
      if (fetchLogs && !isTimerActive) {
         fetch(
            `https://sunmoon-logger.herokuapp.com/api/logs/${currentLog._id}`,
            {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
               },
               body: JSON.stringify({
                  logType: 'stop',
                  timestamp: getTimestamp(),
               }),
            }
         )
            .then((res) => {
               console.log(res);
               return res.json();
            })
            .then((data) => {
               console.log(data);
               // set currentLog == newly created log
               // set fetchlogs == false
               setCurrentLog(data.updatedLog);
               setFetchLogs(false);
            });
      }

      return () => {
         setCurrentLog({});
      };
   }, [isTimerActive]);

   const displayLogs = logs.map((log) => {
      return <li key={log.timestamp}>{`${log.timestamp} ${log.logType}`}</li>;
   });

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
               <LoadingOverlay
                  active={isLoading}
                  spinner={false}
                  text='Loading Logs...'
               >
                  <ul>{displayLogs}</ul>
               </LoadingOverlay>
            </div>
         </div>
      </div>
   );
};

export default LogsList;
