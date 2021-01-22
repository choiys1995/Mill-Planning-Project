import React from "react";
import styled from "styled-components";

class Clock extends React.Component {
    state = {
        date: new Date()
      }
      render() {
        const { date } = this.state;
        return (
          <Container>
            <CurDate>
              {date.getFullYear()}&nbsp;/&nbsp;
              {date.getMonth() + 1}&nbsp;/&nbsp;
              {date.getDate()}
            </CurDate>
            <CurDay>
              {date.getDay() === 0
                ? "Sunday"
                : date.getDay() === 1
                ? "Monday"
                : date.getDay() === 2
                ? "Tuesday"
                : date.getDay() === 3
                ? "wednesday"
                : date.getDay() === 4
                ? "Thursday"
                : date.getDay() === 5
                ? "Friday"
                : "Saturday"}
            </CurDay>
          </Container>
    );
  }
}

const Container = styled.div`
  margin-top: 10px;
  font-size: 30px;
  text-align: center;
`;

const CurDate = styled.div`
  font-size: 18px;
`;

const CurDay = styled.div`
  font-style: italic;
  font-size: 24px;
`;


export default Clock;