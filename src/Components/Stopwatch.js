import React, { useEffect, useContext } from 'react';
import { TimerContext } from '../Context/TimerProvider';

const Stopwatch = ({ isTimerActive, setIsTimerActive, setFetchLogs }) => {
   // Initialize timer Context
   const [timer, setTimer] = useContext(TimerContext);

   //@desc              Stopwatch Start Controller When Start Button Clocked
   //@setIsTimerAcive   set stopwatch timer state to true
   //@setFetchLogs      setFetchLogs state to true to fetch the updated logs
   const handleStart = () => {
      setIsTimerActive(true);
      setFetchLogs(true);
   };

   //@desc              Stopwatch Stop Controller When Stop Button Clocked
   //@setTimer          Stopwatch timer reset to initial state
   //@setIsTimerAcive   set stopwatch timer state to false
   //@setFetchLogs      setFetchLogs state to true to fetch the updated logs
   const handleStop = () => {
      setTimer({
         second: 0,
         millisecond: 0,
      });
      setIsTimerActive(false);
      setFetchLogs(true);
   };

   //@desc                    Stopwatch function
   //@if (isTimerActive)      if stopwatch timer state is true run setInterval
   //    @setTimer()          increment millisecond
   //@if(millisecond === 100) if ms is equal to 100 seconds state should increment
   // interval & ms computation (10 * 100ms = 1s)
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
   }, [isTimerActive, timer]);

   return (
      <>
         <section>
            <h1>Stopwatch</h1>
            <h1>{timer.second}</h1>
            <h6>{timer.millisecond}</h6>
            {!isTimerActive ? (
               <button onClick={handleStart}>
                  <svg
                     width='1em'
                     height='1em'
                     viewBox='0 0 16 16'
                     className='bi bi-play'
                     fill='currentColor'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        fillRule='evenodd'
                        d='M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z'
                     />
                  </svg>
               </button>
            ) : (
               <button className='button' onClick={handleStop}>
                  <svg
                     width='1em'
                     height='1em'
                     viewBox='0 0 16 16'
                     className='bi bi-stop'
                     fill='currentColor'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        fillRule='evenodd'
                        d='M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z'
                     />
                  </svg>
               </button>
            )}
         </section>
      </>
   );
};

export default Stopwatch;
