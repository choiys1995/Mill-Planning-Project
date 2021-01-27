import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const StyleBlock = styled.div`
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  width: 100%;
  margin-bottom: 1rem;
  margin-right: 1rem;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
    ${(props) =>
    props.short &&
    css`
      width: 40%;
    `}
`;

const MenuBlock = (props) => <StyleBlock {...props} />;

export default MenuBlock;
