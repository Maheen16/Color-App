import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({ newColors, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {newColors?.map((color, index) => {
        return (
          <DraggableColorBox
            index={index}
            handleClick={() => deleteColor(color.name)}
            color={color.color}
            name={color.name}
            key={color.name}
          />
        );
      })}
    </div>
  );
});

export default DraggableColorList;
