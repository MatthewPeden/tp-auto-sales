import styled from 'styled-components';
import Layout from '../components/Layout';
import router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ede6f5;
`;

const Title = styled.h1`
  color: #333332;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Text = styled.p`
  color: #333332;
  font-size: 18px;
  margin-bottom: 20px;
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
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #b8b8b8;
  margin: 80px 0px 1px;
`;

const DividerSecondary = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #b8b8b8;
  margin: 0px 0px 80px;
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
          <Divider></Divider>
          <DividerSecondary></DividerSecondary>
          <Title>Contact</Title>
          <Text>Phone: (555) 555-5555</Text>
          <Text>Email: test@email.com</Text>
        </CustomContainer>
      </Layout>
    </Container>
  );
}
