import {cloneDeep} from "lodash-es";
import {nanoid} from "nanoid";
import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";

function SelectPanel({ compositionList = [] }) {
  const dragZone = useRef(null);

  useEffect(() => {
    const sortable = new Sortable(dragZone.current, {
      group: { name: "low-code", pull: "clone", put: false },
      sort: false,
      onClone(event) {
        const index = Array.prototype.slice.call(dragZone.current.childNodes).indexOf(event.item);
        const compositionData = compositionList[index];

        event.item._dragData = cloneDeep({...compositionData.schema, id: nanoid(10)});
      }
    });

    return () => sortable.destroy();
  }, [compositionList]);

  return (
    <div ref={dragZone} className="col-xs-2">
      {compositionList.map((composition) => {
        return (
          <p className="drag-item" key={composition.name}>
            {composition.name}
          </p>
        );
      })}
    </div>
  );
}

export default SelectPanel;
