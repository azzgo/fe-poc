import React, {useEffect, useRef} from "react"
import Sortable from "sortablejs";

function DragDropZone({children, onAppend}){
  const dragDropRef = useRef(null);

  useEffect(() => {
    new Sortable(dragDropRef.current, {
      group: { name: "low-code", pull: true, put: true },
      sort: true,
      onAdd(event) {
        event.item.remove();
        onAppend(event.item._dragData?.schema);
      }
    });
  }, [onAppend]);

  return(
    <div ref={dragDropRef}>
      {children}
    </div>
    )
}

export default DragDropZone
