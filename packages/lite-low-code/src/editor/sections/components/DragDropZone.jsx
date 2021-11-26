import React, { useContext, useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { EditorStoreContext } from "../../store";

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
  const eventBus = useContext(EditorStoreContext);

  useEffect(() => {
    const sortable = new Sortable(dragDropRef.current, {
      group: { name: "low-code", pull: true, put: true },
      sort: true,
      onAdd(event) {
        event.item.remove();
        schema.splice(event.newIndex, 0, event.item._dragData);
        eventBus.setActiveWidgetId(event.item._dragData.id);
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
  }, [schema, eventBus]);

  return (
    <div className="drag-drop-zone" ref={dragDropRef}>
      {schema.map((_schema) => {
        return (
          <DragDropItem key={_schema.id} schema={_schema} render={render} />
        );
      })}
    </div>
  );
}

function DragDropItem({ schema, render }) {
  const eventBus = useContext(EditorStoreContext);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    return eventBus.onWidgetSchemaChange(schema.id, (newSchema) => {
      Object.assign(schema, newSchema);
      forceUpdate({});
    });
  }, [eventBus, schema]);

  return (
    <div
      className="drag-drop-item"
      key={schema.id}
      onClick={(event) => {
        event.stopPropagation();
        eventBus.setActiveWidgetId(schema.id);
      }}
    >
      {render(schema)}
    </div>
  );
}

export default DragDropZone;
