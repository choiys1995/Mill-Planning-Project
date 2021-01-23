import React from 'react';
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";


const StyledImg = styled.img`
  float: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  height: 5.5rem;
  width: 7rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const ImgDiv = () => <StyledImg/>

export default ImgDiv;
