import React from 'react';
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const StyleBlock = styled.div`
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  width: 100%;
  margin-right: 1rem;
  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const MenuBlock = props => <StyleBlock {...props}/>

export default MenuBlock;