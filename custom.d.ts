declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >
  export default ReactComponent
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}