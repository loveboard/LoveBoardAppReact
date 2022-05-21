export const WIDGETS = {
  grid: {
    component: () => <div style={{ textAlign: "center" }}>GRID</div>,
    label: "Grid",
  },
  chart: {
    component: () => <div style={{ textAlign: "center" }}>CHART</div>,
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
  photo3: {
    component: () => (
      <div style={{ textAlign: "center" }}>
        <img src="https://placeimg.com/100/100/animals" alt="michi" />
      </div>
    ),
    label: "photo3",
  },
};

export default function Widgets() {
  return (
    <aside>
      {Object.entries(WIDGETS).map(([key, value]) => (
        <div
          key={key}
          data-type={key}
          className="droppable grid-stack-item"
          gs-h="4"
          gs-w="6"
        >
          {value.label}
        </div>
      ))}
      <div
        className="droppable grid-stack-item photo-grid-stack-item"
        key="photo3"
        data-type="photo3"
        gs-h="4"
        gs-w="6"
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
    </aside>
  );
}
