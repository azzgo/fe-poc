import React from "react";

function Columns({ columns, render, id }) {
  return (
    <div className="row">
      {columns.map((schema, index) => (
        <div className="col-xs" key={id + "_" + index}>
          {render(schema)}
        </div>
      ))}
    </div>
  );
}

export default Columns;
