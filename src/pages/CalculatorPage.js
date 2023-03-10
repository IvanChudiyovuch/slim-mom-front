import styled from '@emotion/styled';
import { Image, Image2 } from 'components/App/App.stiled';
import DailyCaloriesForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

const CalcPageWrap = styled.div`
@media screen and (min-width: 1280px) {
  display: flex;
}
`
const CalculatorPage = () => {
  return (
    <CalcPageWrap>
      <Image />
      <Image2 />
      <DailyCaloriesForm />
    </CalcPageWrap>
  );
};

export default CalculatorPage;
