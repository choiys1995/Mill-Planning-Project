import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const StyledBox = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  height: 2.25rem;
  width: 12rem;
  margin-bottom: 1rem;
  margin-right: 1rem;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      font-size: 1rem;
    `}

  ${(props) =>
    props.short &&
    css`
      width: 40%;
      font-size: 1rem;
    `}

      ${(props) =>
    props.high &&
    css`
      height: auto;
    `}
`;

const Input = (props) => <StyledBox {...props} />;

export default Input;
