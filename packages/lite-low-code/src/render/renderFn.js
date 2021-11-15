import React, {useCallback} from "react";
import { resolveWidget } from "./widgetsRegister";

export function useRenderFn(enhance) {

  const renderFn = useCallback((schema) => {
    if (Array.isArray(schema)) {
      if (enhance?.batchRender) {
        return enhance.batchRender(renderSchema, schema)
      }
      return schema.map(renderSchema);
    }

    function renderSchema(schema) {
      const Comp = schema && resolveWidget(schema.type);

      if (!Comp) {
        return React.createElement("div", null, "[Type] " + schema?.type + " 未注册");
      }

      return React.createElement(Comp, {
        key: schema.id,
        ...schema,
        render: renderFn,
      });
    }

    return renderSchema(schema);
  }, [enhance])

  return renderFn;
}
