import React from 'react';

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
          <label htmlFor={menu.name}>{menu.name}</label>
        </div>
      ))}
    </>
  );
}