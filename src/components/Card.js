import { useEffect, useRef, useState } from "react";

import onLongpress from "./../scripts/cardsActions";
import "./Card.css";
import EditToolbar from "./subcomponents/editToolbar/EditToolbar";
/*
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
*/

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
  children,
}) {
  const cardRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(
    initialTitle || "Double click to change title"
  );
  const [visible, setVisible] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    actions.handleRemove(cardRef.current, false);
    actions.handleAdd(cardRef.current);

    onLongpress(cardRef.current,handleEditCard);

    //https://www.codegrepper.com/code-examples/javascript/get+cursor+position+javascript
    var pointerX = -1;
    var pointerY = -1;
    document.onmousemove = function (event) {
      pointerX = event.pageX;
      pointerY = event.pageY;
    };
  }, []);

  const handleToggle = (flag) => {
    setToggle(flag);
    actions.handleEnableMove(flag);
  };
  const handleTapHold = (flag) => {
    //setToggle(flag);
    //actions.handleEnableMove(flag);
    console.log("handleTapHold");
  };
  /*
  var changeName = () => {
    console.log("changeName");
  };
  function changeName(evt) {
    console.log("changeName", evt);
  }
*/
  const changeName = (evt) => {
    console.log("changeName", evt);
  };

  const backCard = (evt) => {
    console.log("backCard", evt);
    setEditable(false);
    //cardRef.current.classList.remove("longpress");
    cardRef.current.classList.remove('longpress');
    cardRef.current.classList.remove("itemselected");
    //cardRef.current.class.remove('longpress');
    //cardRef.current.className.remove('longpress');
    //console.log("cardRef.current", cardRef.current);
    //console.log("cardRef", cardRef);


    //document.getElementById(id).classlist.remove('longpress');
    //cardRef.classList.remove('longpress');
    //cardRef.current.classList.add("longpress2");
  };
  const editCard = (evt) => {
    console.log("editCard", evt);
  };
  const handleEditCard = (flag) => {
    setEditable(true);
    console.log("handleEditCard", flag);
  };


  const delCard = (evt) => {
    console.log("delCard", evt);
    //gridRef.current.removeWidget(el, false);
    actions.handleRemove(cardRef.current, false);
    //this.props.unmountMe();
    //ReactDOM.unmountComponentAtNode(ref.current);
    setVisible(false);
  };
  return visible ? (
    <div
      ref={cardRef}
      id={`${id}`} // convert to string
      className="grid-stack-item"
      gs-w={w}
      gs-h={h}
      gs-x={x}
      gs-y={y}
    >
      {/**
       * Toolbar
       */}
      <div className="grid-stack-item-content">
        {editable ? (<EditToolbar className="" delCard={delCard} editCard={editCard} backCard={backCard} ></EditToolbar>):(<div/>)}
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
              actions.handleRemove(cardRef.current);
            }}
          >
            &#x2715;
          </button>
        </header>
         */}
      </div>
    </div>
  ) : (
    <div />
  );
}
