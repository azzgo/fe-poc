import { useRenderFn } from "./renderFn";

export function Render({ schema, enhance }) {
  const renderFn = useRenderFn(enhance);
  return schema ? renderFn(schema) : null;
}
