import React, { useEffect, useState } from "react";
import "./style.scss";

const App: React.FC = () => {
  const [isStopwatchPaused, setIsStopwatchPaused] = useState<boolean>(false);
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [timeToGo, setTimeToGo] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isStopwatchPaused) {
        setTimeToGo((miliseconds) => Math.max(0, miliseconds - 100));
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [stopwatchTime, isStopwatchPaused]);

  const startStopwatch = () => {
    if (isStopwatchPaused) {
      setIsStopwatchPaused(false);
    } else if (inputValue && !Number.isNaN(inputValue)) {
      setStopwatchTime(parseInt(inputValue) * 1000);
      setTimeToGo(parseInt(inputValue) * 1000);
    }
  };

  const formatTime = (k: number) => (k > 9 ? k.toString() : `0${k}`);
  const hours = formatTime(Math.floor(timeToGo / 1000 / 3600));
  const minutes = formatTime(Math.floor(timeToGo / 1000 / 60));
  const seconds = formatTime(Math.round((timeToGo / 1000) % 60));

  return (
    <div className="timer_wrapp">
      <div className="stopwatch">
        <div
          title="Reset"
          className="button button_reset button_simulator"
          onClick={() => {
            setIsStopwatchPaused(false);
            setStopwatchTime(0);
            setInputValue("");
            setTimeToGo(0);
          }}
        >
          <div className="button_inner"></div>
          <div className="button_inner_neck"></div>
        </div>
        <div
          title="Pause"
          className="button button_start button_simulator"
          onClick={() => setIsStopwatchPaused(true)}
        >
          <div className="button_inner"></div>
          <div className="button_inner_neck"></div>
        </div>
        <div
          title="Start"
          className="button button_pause button_simulator"
          onClick={() => startStopwatch()}
        >
          <div className="button_inner"></div>
          <div className="button_inner_neck"></div>
        </div>
        <div className="clock_tick">
          <div className="clock_tick_inner"></div>
        </div>
        <div
          className="clock_ticker"
          style={{
            backgroundColor: `#d3a853`,
            transform: timeToGo
              ? `rotate(-${(timeToGo / stopwatchTime) * 360}deg)`
              : "rotate(-360deg)",
          }}
        ></div>

        <div className="clock_display">
          {[...Array(60)].map((_, i) => (
            <div className={`clock_display_value seconds second_${i}`}></div>
          ))}
          {[...Array(12)].map((_, i) => (
            <div className={`clock_display_value hours hour_${i}`}></div>
          ))}
        </div>
      </div>
      <div className="timer">
        <span id="hour">{hours}</span>:<span id="min">{minutes}</span>:
        <span id="seconds">{seconds}</span>
      </div>

      <div className="input_holder">
        <div className="description">
          {" "}
          Please enter target duration (seconds):{" "}
        </div>

        <input
          value={inputValue}
          id="timer_value"
          className={`seconds_to_go_${inputValue.length}`}
          placeholder="0"
          type="number"
          onKeyDown={(e) => {
            if (e.key === "Enter") startStopwatch();
          }}
          onChange={(e) => setInputValue(e.target.value.slice(0, 6))}
        />
      </div>
    </div>
  );
};
export default App;
