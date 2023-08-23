import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';
import Layout from '../components/Layout';
import router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #ede6f5;
  padding: 20px;
  padding-top: 40px;
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
  width: 275px;
  height: 60px;
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
  &:hover {
    background-color: #7d6ba0;
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

const handleDraw = () => {
  router.push('/Tableorder');
};

const handleCheckout = () => {
  router.push('/transaction');
};

const handleManagement = () => {
  router.push('/management');
};

const handleReports = () => {
  router.push('/reports');
};

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (user) {
    return (
      <Container>
        <Layout>
          <CustomContainer>
            <Button onClick={() => handleDraw()}>Tables and Orders</Button>
            <Button onClick={() => handleCheckout()}>Checkout Order</Button>
            <Button onClick={() => handleManagement()}>Management</Button>
            <Button onClick={() => handleReports()}>Reports</Button>
          </CustomContainer>
        </Layout>
      </Container>
    );
  } else {
    return (
      <CustomContainer>
        <Title>TP Auto Sales</Title>
        <Text>Please log in to continue.</Text>
        <Button onClick={() => (window.location.href = '/api/auth/login')}>Log in</Button>
      </CustomContainer>
    );
  }
}
