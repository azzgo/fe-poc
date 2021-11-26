import React from "react";


function Columns({ columns, render, id }) {
  return (
    <div className="flex-row">
      {columns.map((schema, index) => (
        <div className="flex-auto" key={id + "_" + index}>
          {render(schema)}
        </div>
      ))}
    </div>
  );
}

export default Columns;
