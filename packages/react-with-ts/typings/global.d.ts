declare module '*.less' {
  const content: any;
  export default content;
}

declare type InferableConnectType<IStateToProps, IDispatchToProps, TNeedsProps> = <TComponent extends React.ComponentType<IStateToProps & IDispatchToProps & TNeedsProps>>(component: TComponent) => TComponent;
