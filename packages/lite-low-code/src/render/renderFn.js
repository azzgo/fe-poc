import React from "react";
import { resolveComp } from "./register";

export function renderFn(schema) {
  if (Array.isArray(schema)) {
    return schema.map(renderSchema);
  }

  return renderSchema(schema);
}

function renderSchema(schema) {
  const Comp = schema && resolveComp(schema.type);
  console.log(schema);

  if (!Comp) {
    return React.createElement("div", null, "[Type] " + schema?.type + " 未注册");
  }

  return React.createElement(Comp, {
    key: schema.id,
    ...schema,
    render: renderFn,
  });
}
