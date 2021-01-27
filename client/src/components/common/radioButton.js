import styled from 'styled-components'

const ContainRadioButtonDiv = styled.div`
  width: 100%;

  input[type="radio"] {
    display: flex;
  }

  input[type="radio"] + label {
    display: block;
    background: #00498c;
    border: 1px solid #dfdfdf;
    padding: 0px 10px;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
    color: #fff;
  }

  input[type="radio"]:checked + label {
    border: 1px solid #23a3a7;
    background: #23a3a7;
    color: #fff;
  }
`

export default ContainRadioButtonDiv