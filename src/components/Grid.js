import { useRef, useEffect } from "react";
//import { GridStack } from "gridstack";

import GridStack from "gridstack/dist/gridstack-jq";

//import "gridstack/dist/gridstack-jq";
import "gridstack/dist/gridstack.css";

// import "./styles.scss";
import "./demo.css";

const Item = ({ id }) => <div>I am item: {id}</div>;

let id = 1;
export default function Grid({ children, setWidgets }) {
  const refs = useRef({});
  const gridRef = useRef();

  useEffect(() => {
    gridRef.current = GridStack.init({
      cellHeight: 70,
      minRow: 4, // don't collapse when empty
      margin: 4,
      resizable: {
        handles: "all",
      },
      acceptWidgets: true,
      dragIn: ".droppable", // class that can be dragged from outside
      dragInOptions: {
        revert: "invalid",
        scroll: false,
        appendTo: "body",
        helper: "clone",
      },
      float: true,
      //column: 6, // will auto switch on smaller screens
      //row: 10,
      //cellHeight: "auto", // start square but will set to % of window width later
      //cellWidth:"initial",

      disableOneColumnMode: true,
      alwaysShowResizeHandle:
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
    });

    const grid = gridRef.current;
    grid.load([
      { x: 0, y: 0, content: "1" },
      { x: 0, y: 1, h: 2, content: "2" },
      { x: 0, y: 3, content: "3" },
    ]);

    if (grid) {
      grid.on("dropped", function (event, previousWidget, newWidget) {
        const { el, w, h, x, y } = newWidget;
        grid.removeWidget(el);
        setWidgets((items) => [
          ...items,
          {
            id: id++,
            type: el.dataset.type,
            w,
            h,
            x,
            y,
          },
        ]);
      });
    }
  }, []);

  const handleAdd = (el) => {
    if (el && gridRef.current) {
      gridRef.current.makeWidget(el);
    }
  };
  const handleRemove = (el, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets((items) => items.filter((item) => `${item.id}` !== el.id));
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };

  return (
    <section>

      <div className="grid-stack">
        {children({
          handleAdd,
          handleRemove,
          handleEnableMove,
        })}
      </div>
    </section>
  );
}
