import { useEffect, useRef, useState } from "react";

import onLongpress from "./../scripts/cardsActions";
import "./Card.css";

export const onDoubleTap = function(el, handler) {
  const MAX_TIME_TO_SECOND_TAP = 300 // espera máximo 300ms al siguiente click/tap
  let lastTapTimestamp = 0;
  el.addEventListener('touchstart', function() {
    lastTapTimestamp = new Date().getTime();
  });
  el.addEventListener('touchend', function(event) {
      var currentTime = new Date().getTime();
      var tapEllapsedTime = currentTime - lastTapTimestamp;

      // si se ha hecho el segundo tap/click entre los 300ms
      if (tapEllapsedTime < MAX_TIME_TO_SECOND_TAP && tapEllapsedTime > 0) {
          event.preventDefault();
          lastTapTimestamp = 0; // reinicia el counter
          handler(event); // ejecuta el handler
      }
  });
};

/*
taphold | long press

https://interactjs.io/
https://jsfiddle.net/kelunik/pkjze6e6/42/
https://stackoverflow.com/questions/2625210/long-press-in-javascript
https://www.w3schools.com/jquerymobile/tryit.asp?filename=tryjqmob_events_taphold
https://stackoverflow.com/questions/41329964/click-and-hold-onto-a-selected-div-to-hide
https://www.npmjs.com/package/long-press-event


https://codepen.io/allurewebsolutions/pen/YqJyYY
https://codepen.io/borntofrappe/pen/jOEKERG


*/


export default function Card({
  id,
  title: initialTitle,
  w,
  h,
  x,
  y,
  actions,
  children
}) {
  const ref = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(
    initialTitle || "Double click to change title"
  );

  useEffect(() => {
    actions.handleRemove(ref.current, false);
    actions.handleAdd(ref.current);

    onLongpress(ref.current)
  }, []);

  const handleToggle = (flag) => {
    setToggle(flag);
    actions.handleEnableMove(flag);
  };
  const handleTapHold = (flag) => {
    //setToggle(flag);
    //actions.handleEnableMove(flag);
    console.log("handleTapHold")
  };


  return (
    <div
      ref={ref}
      id={`${id}`} // convert to string
      className="grid-stack-item"
      gs-w={w}
      gs-h={h}
      gs-x={x}
      gs-y={y}
    >
      <div className="grid-stack-item-content">
        {children}
        {/*
        <header>
          {toggle ? (
            <h2
              title="Double click to change title"
              onDoubleClick={() => handleToggle(false)}
            >
              {title}
            </h2>
          ) : (
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  handleToggle(true);
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onBlur={() => handleToggle(true)}
            />
          )}

          <button
            title="Delete widget"
            onClick={() => {
              actions.handleRemove(ref.current);
            }}
          >
            &#x2715;
          </button>
        </header>
         */}
      </div>
    </div>
  );
}
