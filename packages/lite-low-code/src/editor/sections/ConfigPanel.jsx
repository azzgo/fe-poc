import React, { useContext, useEffect, useState } from "react";
import { EditorEventBusContext } from "../event";

function ConfigPanel({ compositionList = [] }) {
  const eventBus = useContext(EditorEventBusContext);
  const [activeWidget, setActiveWidget] = useState(eventBus.getActiveWidget());

  useEffect(() => {
    return eventBus.onAcitiveWidgetChange((id) => {
      setActiveWidget(id);
    });
  }, [eventBus]);
  return (
    <div key={activeWidget?.id} className="two columns">
      {activeWidget?.label && (
        <>
          <label>label</label>
          <input
            value={activeWidget.label}
            onChange={(event) =>
              eventBus.updateActiveWidgetSchema({
                ...activeWidget,
                label: event.target.value,
              })
            }
          />
        </>
      )}
    </div>
  );
}

export default ConfigPanel;
