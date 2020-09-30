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
               <button onClick={handleStart}>Start</button>
            ) : (
               <button className='button' onClick={handleStop}>
                  Stop
               </button>
            )}
         </section>
      </>
   );
};

export default Stopwatch;
