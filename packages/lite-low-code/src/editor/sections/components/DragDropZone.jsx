import React, {useContext, useEffect, useRef, useState} from "react";
import Sortable from "sortablejs";
import {EditorEventBusContext} from "../../event";

// copy from vuedraggable source code
function insertNodeAt(fatherNode, node, position) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

function DragDropZone({ render, schema }) {
  const dragDropRef = useRef(null);
  const [, forceUpdate] = useState({});
  const eventBus = useContext(EditorEventBusContext);

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
        event.item.remove();
        insertNodeAt(event.from, event.item, event.oldIndex);
        schema.splice(event.newIndex, 0, schema.splice(event.oldIndex, 1)[0]);
        forceUpdate({});
      },
      onRemove(event) {
        // must keep a dom on origin position then change data。
        insertNodeAt(dragDropRef.current, event.item, event.oldIndex);
        schema.splice(event.oldIndex, 1);
        forceUpdate({});
      },
      onStart(event) {
        const index = Array.prototype.slice
          .call(dragDropRef.current.childNodes)
          .indexOf(event.item);
        const _dragSchema = schema[index];
        event.item._dragData = _dragSchema;
      },
      onMove(event) {},
    });
    return () => sortable.destroy();
  }, [schema]);

  return (
    <div className="drag-drop-zone" ref={dragDropRef}>
      {schema.map((_schema) => {
        return (
          <div
            className="drag-drop-item"
            key={_schema.id}
            onClick={(event) => {
              event.stopPropagation();
              eventBus.setActiveWidget(_schema);
            }}
          >
            {render(_schema)}
          </div>
        );
      })}
    </div>
  );
}

export default DragDropZone;
