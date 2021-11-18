import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './utils/AnimatedProgressProvider';
import { getRemainingTimeUntilMsTimestamp } from './utils/CountdownTimerUtils';
import 'react-circular-progressbar/dist/styles.css';

export default function AnimatedActivateDiscount({ children }) {
  const [countdownEndPercentage, setCountdownEndPercentage] = useState(0);

  const userDetailsStore = useSelector((state) => state.userDetails);
  const {
    userDetails: { isActive, activeTimer: countdownTimestamp }
  } = userDetailsStore;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingHours = parseInt(
        getRemainingTimeUntilMsTimestamp(countdownTimestamp).hours,
        10
      );
      const remainingMinutes = parseInt(
        getRemainingTimeUntilMsTimestamp(countdownTimestamp).minutes,
        10
      );

      const allRemainingMinutes = remainingHours * 60 + remainingMinutes;

      setCountdownEndPercentage(Math.round((100 / 1440) * allRemainingMinutes));

      console.log(countdownEndPercentage);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestamp]);

  return (
    <AnimatedProgressProvider
      valueStart={100}
      valueEnd={countdownEndPercentage}
      duration={1.4}
      easingFunction={easeQuadInOut}
    >
      {(value) => (
        <div style={{ width: 160 }}>
          <CircularProgressbarWithChildren
            value={value}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: isActive ? '#08660D' : '#b21510'
            })}
          >
            {children}
          </CircularProgressbarWithChildren>
        </div>
      )}
    </AnimatedProgressProvider>
  );
}
