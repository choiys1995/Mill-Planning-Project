import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import {darken, lighten} from 'polished';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  margin-top: 0.5rem;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    ${(props) =>
    props.right &&
    css`
      float: right;
    `}

    ${(props) =>
    props.footer &&
    css`
      position: absolute;
      bottom: 0;
    `}
      
    ${(props) =>
    props.vertex &&
    css`
      position: absolute;
      top: 0;
      right: 0;
    `}

    ${(props) =>
      props.white &&
      css`
      background: #dee2e6;
      color: black;
      &:hover {
        background: ${lighten(0.1, '#dee2e6')};
      }
      &:active {
        background: ${darken(0.1, '#dee2e6')};
      }
      `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
