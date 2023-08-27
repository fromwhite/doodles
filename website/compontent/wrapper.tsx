import React from 'react';
import { Overlay, Logo } from '../compontent/overlay';

export default function Wrap({ children, ...props }) {
  const Component = React.createElement(children.default);
  return (
    <div className="warp">
      {Component}
      <Overlay />
      <Logo />
    </div>
  );
}
