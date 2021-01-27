import React from 'react';
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const Label = styled.label`
  display: inline-block;
  font-weight: bold;
  color: ${palette.gray[8]};
  padding: 0.25rem;
`;


const Menus = [
  { name: '한식' },
  { name: '일식' },
  { name: '중식' },
  { name: '양식' },
];

export function CustomRadioButton() {
  return (
    <>
      {Menus.map((menu) => (
        <div key={menu.name}>
          <input
            id={menu.name}
            type="radio"
            name="menu-selector"
            value={menu.name}
          />
          <Label htmlFor={menu.name}>{menu.name}</Label>
        </div>
      ))}
    </>
  );
}