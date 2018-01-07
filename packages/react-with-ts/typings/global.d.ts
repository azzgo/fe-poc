declare module '*.less' {
  const content: any;
  export default content;
}


declare type InferableConnectType<IMergedProps> = <TComponent extends React.ComponentType<IMergedProps>>(component: TComponent) => TComponent;
