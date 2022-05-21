export const WIDGETS = {
  grid: {
    component: () => <div style={{ textAlign: "center" }}>GRID</div>,
    label: "Grid",
  },
  chart: {
    component: () => <div className="grid-stack-item-content">CHART</div>,
    label: "Chart",
  },
  photo: {
    component: () => (
      <div style={{ textAlign: "center" }}>
        <img src="https://placeimg.com/100/100/animals" alt="michi" />
      </div>
    ),
    label: "Photo",
  },
  video: {
    component: () => (
      <div style={{ textAlign: "center" }}>
        <div className="grid-stack-item-content" style={{ padding: "0px" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/BRGwCgfS4Qk?autoplay=0"
            title="YouTube video player"
          ></iframe>
        </div>
      </div>
    ),
    label: "Video",
  }
};
{/*
frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen

*/}
import "./Widgets.css";

export default function Widgets() {
  return (
    <aside className="grid-container">
      {Object.entries(WIDGETS).map(([key, value]) => (
        <div
          key={key}
          data-type={key}
          className="droppable grid-stack-item photo-grid-stack-item grid-item"
          gs-h="2"
          gs-w="2"
        >
          <div className="grid-stack-item-content">
            <div>
              {/*
              <span>Let me in, Im a photo</span>      
              */}
              {value.label}
            </div>
          </div>
        </div>
      ))}
      {/*
      <div
        className="droppable grid-stack-item photo-grid-stack-item"
        key="photo3"
        data-type="photo3"
        gs-h="2"
        gs-w="2"
      >
        <div className="grid-stack-item-content">
          <div>
            <span>Let me in, Im a photo</span>
          </div>
          <div>
            <span>Let me in, Im a photo</span>
          </div>
        </div>
      </div>
      */}
    </aside>
  );
}
