import tunnel from 'tunnel-rat';
import React from 'react';

export const r3f = tunnel();
export const Triangle = ({ children }) => {
  return <r3f.In>{children}</r3f.In>;
};
