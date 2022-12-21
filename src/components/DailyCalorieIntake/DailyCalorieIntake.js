import {
  Callories,
  CalloriesText,
  List,
  ListItem,
  TitleList,
  WrapperCallories,
} from './DailyCalorieIntake.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
const DailyCalorieIntake = ({ data }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      async function fetchMyAPI() {
        const response = await axios.post(
          'https://creepy-tan-parrot.cyclic.app/api/diet',
          data
        );

        setStats(response.data);
        setLoading(false);
      }

      fetchMyAPI();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        'Loading'
      ) : (
        <div>
          <WrapperCallories>
            <Callories>
              {stats.dailyCalorie} <CalloriesText>ккал</CalloriesText>
            </Callories>
          </WrapperCallories>
          <div>
            <TitleList>Foods you should not eat</TitleList>
            <List>
              {stats.products.map(product => {
                return (
                  <ListItem key={nanoid()}>{product.categories[0]}</ListItem>
                );
              })}
            </List>
          </div>
        </div>
      )}
    </>
  );
};
export default DailyCalorieIntake;