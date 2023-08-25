import styled from 'styled-components';
import Layout from '../components/Layout';
import router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const Button = styled.button`
  display: block;
  width: 325px;
  height: 75px;
  background-color: #333332;
  color: white;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  border-radius: 15px;
  margin: 16px;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background-clip: padding-box;
  outline: none;
  box-shadow: inset 0 0 0 2px #ccc;
  &:hover {
    background-color: #555;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  width: 100%;
  height: 100vh; /* Take up the whole viewport height */
`;

const handleFixed = () => {
  router.push('/fixed_trucks');
};

const handleWrecked = () => {
  router.push('/wrecked_trucks');
};

export default function Home() {
  return (
    <Container>
      <Layout>
        <CustomContainer>
          <Button onClick={() => handleFixed()}>Fixed Trucks</Button>
          <Button onClick={() => handleWrecked()}>Wrecked Trucks</Button>
        </CustomContainer>
      </Layout>
    </Container>
  );
}
