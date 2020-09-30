import React, { useEffect, useContext } from 'react';
import { LogsContext } from '../Context/LogsContext';
import { CurrentLogContext } from '../Context/CurrentLogProvider';
import LoadingOverlay from 'react-loading-overlay';
import styled from 'styled-components';

const CustomList = styled.ul`
   list-style: none;

   & li {
      margin: 0.5rem 0.4rem;
      color: #fff;
   }
`;
const LogBadge = styled.span`
   padding: 0.2rem 0.4rem;
   border-radius: 50px;
   color: #fff;
   border: 1px solid #165baa;
`;

const DeleteBtn = styled.button`
   padding: 0.2rem 0.4rem;
   cursor: pointer;
   color: #fff;
   background: none;
   outline: none;
   border: none;

   &:focus {
      outline: none;
   }

   & svg {
      color: red;
   }
`;

const LogsList = function ({
   fetchLogs,
   isTimerActive,
   setFetchLogs,
   isLoading,
   setIsLoading,
   setIsLogDeleted,
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

   const handleDelete = (id) => {
      setIsLoading(true);
      setIsLogDeleted(true);
      fetch(`https://sunmoon-logger.herokuapp.com/api/logs/${id}`, {
         method: 'delete',
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data);
            setIsLoading(false);
            setIsLogDeleted(false);
         });
   };

   const displayLogs = logs.map((log) => {
      return (
         <li key={log.timestamp}>
            <LogBadge>{log.logType}</LogBadge>
            {` ${log.timestamp}`}
            <DeleteBtn className='ml-2' onClick={() => handleDelete(log._id)}>
               <svg
                  width='1em'
                  height='1em'
                  viewBox='0 0 16 16'
                  className='bi bi-x-circle'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     fillRule='evenodd'
                     d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
                  />
                  <path
                     fill-rule='evenodd'
                     d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
                  />
               </svg>
            </DeleteBtn>
         </li>
      );
   });

   // Generate Timestamp @ format "2019-10-17 07:45:08"
   const getTimestamp = () => {
      const startDate = new Date();
      const timestamp = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}:${startDate.getMilliseconds()}`;

      return timestamp;
   };

   return (
      <>
         <h1>Logs</h1>
         <LoadingOverlay
            active={isLoading}
            spinner={false}
            clasName='p-4'
            text='Loading Logs...'
         >
            <CustomList>{displayLogs}</CustomList>
         </LoadingOverlay>
      </>
   );
};

export default LogsList;
