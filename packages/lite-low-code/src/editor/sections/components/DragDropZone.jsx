import React, {useEffect, useRef, useState} from "react"
import Sortable from "sortablejs";

function DragDropZone({render, schema}){
  const dragDropRef = useRef(null);
  const [,forceUpdate] = useState({});

  useEffect(() => {
    const sortable = new Sortable(dragDropRef.current, {
      group: { name: "low-code", pull: true, put: true },
      sort: true,
      onAdd(event) {
        event.item.remove();
        schema.splice(event.newIndex, 0, event.item._dragData);
        forceUpdate({});
      },
      onUpdate(event) {
        console.log('??????????????/');
      },
      onMove(event) {

      }
    });
    return () => sortable.destroy();
  }, []);

  return(
    <div className="drag-drop-zone" ref={dragDropRef}>
      {schema.map(render)}
    </div>
    )
}

export default DragDropZone
