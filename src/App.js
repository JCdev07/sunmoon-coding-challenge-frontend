import React, { useState, useMemo, useEffect } from 'react';

function App() {
   const [logs, setLogs] = useState([]);
   const [isTimerActive, setIsTimerActive] = useState(false);
   const [fetchLogs, setFetchLogs] = useState(false);
   const [timer, setTimer] = useState({
      second: 0,
      millisecond: 0,
   });

   useMemo(() => {
      fetch('http://localhost:5000/api/logs')
         .then((res) => res.json())
         .then(({ data }) => {
            setLogs(data);
         });
   }, [isTimerActive]);

   useEffect(() => {
      let interval = null;

      if (isTimerActive) {
         interval = setInterval(() => {
            setTimer((prevState) => {
               return {
                  ...prevState,
                  millisecond: prevState.millisecond++,
               };
            });

            if (timer.millisecond === 100) {
               setTimer((prevState) => {
                  return {
                     ...prevState,
                     second: prevState.second++,
                     millisecond: 0,
                  };
               });
            }
         }, 10);
      }

      return () => clearInterval(interval);
   }, [isTimerActive, timer.millisecond]);

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

   const getTimestamp = () => {
      const startDate = new Date();
      const timestamp = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}:${startDate.getMilliseconds()}`;

      return timestamp;
   };

   const handleStart = () => {
      setIsTimerActive(!isTimerActive);
      setFetchLogs(true);
   };

   const handleStop = () => {
      setTimer({
         second: 0,
         millisecond: 0,
      });
      setIsTimerActive(false);
      setFetchLogs(true);
   };

   return (
      <div className='App'>
         <section>
            <h1>Stopwatch</h1>
            <h1>{timer.second}</h1>
            <h6>{timer.millisecond}</h6>
            <button onClick={handleStart}>Start</button>
            <button className='button' onClick={handleStop}>
               Stop
            </button>
         </section>

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
      </div>
   );
}

export default App;
