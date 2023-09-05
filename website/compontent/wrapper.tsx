import React from 'react';
import { Overlay, Logo } from '../compontent/overlay';
import css from 'styled-jsx/css';

export default function Wrap({ children, ...props }) {
  const Component = React.createElement(children.default);
  return (
    <div className="warp">
      <style>{styles}</style>
      {Component}
      <Overlay />
      <Logo />
    </div>
  );
}

// className = 'warp';
// nextjs-style styled tagged template literals test,currently not available
// https://github.com/swc-project/plugins/issues?q=is%3Aissue+styled-jsx+is%3Aclosed
// const styles1 = css.global`
//   body {
//     background-color: bisque;
//   }
// `;

// Now resolve reluctantly
const styles = `
.warp {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  color: #171717;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overscroll-behavior: none;
  font-family: 'Inter var', sans-serif;
  /* cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4='),
    auto; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.warp a {
  pointer-events: all;
  color: black;
  text-decoration: none;
}

.warp h1 {
  font-size: var(--f-M);
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 0.7em;
  margin: 5px 0;
  padding: 0;
}

.warp p {
  padding: 0;
  margin: 0;
}
`;
