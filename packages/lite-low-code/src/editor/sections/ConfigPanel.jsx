import React, { useContext, useEffect, useState } from "react";
import { EditorStoreContext } from "../store";

function ConfigPanel({ compositionList = [] }) {
  const eventBus = useContext(EditorStoreContext);
  const [activeWidget, setActiveWidget] = useState(eventBus.getActiveWidget());

  useEffect(() => {
    return eventBus.onAcitiveWidgetIdChange(() => {
      setActiveWidget(eventBus.getActiveWidget());
    });
  }, [eventBus]);
  return (
    <div key={activeWidget?.id} className="two columns">
      {activeWidget?.label && (
        <>
          <label>label</label>
          <input
            defaultValue={activeWidget.label}
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
