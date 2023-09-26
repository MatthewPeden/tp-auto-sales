import styled from 'styled-components';
// import { withRole, getServerSidePropsForManager } from './api/auth/RBAC.tsx';
import pool from '../../db';
import router from 'next/router';
import Layout from "../components/Layout";
import Image from 'next/image';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #f7f7f7;
  padding: 80px 30px 20px 30px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: #474747;
  font-size: 32px;
  font-weight: bold;
`;

const Button = styled.button`
  display: block;
  width: 175px;
  height: 35px;
  background-color: #333332;
  color: white;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  border-radius: 15px;
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

const TruckItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TruckInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding:10px;
`;

const TruckTitle = styled.h2`
  color: #474747;
  font-weight: bold;
  font-size: 22px;
`;

const TruckContent = styled.div`
  margin-top: 10px;
`;
  
interface Truck {
  id: number;
  name: string;
  description: string;
  status: number;
  image_path: string;
}
  
interface ManageTrucksPageProps {
  trucks: Truck[];
}

const handleAdd = () => {
  router.push('/add-truck');
};

const ManageTrucksPage: React.FC<ManageTrucksPageProps> = ({ trucks }) => {
  return (
    <Layout>
      <Container>
        <Title>Fixed Trucks</Title>
        <Button onClick={() => handleAdd()}>Add New Truck</Button>
        <TruckContent>
          {trucks.map(truck => (
            <Link key={truck.id} href={`/trucks/${truck.id}`} passHref>
              <TruckItem>
                <Image 
                  src={truck.image_path} 
                  alt={truck.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                />
                <TruckInfo>
                  <TruckTitle>{truck.name}</TruckTitle>
                  <p>{truck.description}</p>
                </TruckInfo>
              </TruckItem>
            </Link>
          ))}
        </TruckContent>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
    // const authCheck = await getServerSidePropsForManager(context);
    // if ('redirect' in authCheck) {
    //   return authCheck;
    // }
  
    try {
      const connection = await pool.getConnection();
      const rows = await connection.query('SELECT t.id, t.name, t.description, t.status, ti.id as image_id, ti.image_path FROM trucks AS t LEFT JOIN truck_images AS ti ON t.id = ti.truck_id WHERE t.status = 1 AND ti.primary = 1');
      connection.release();
  
      const trucks = rows.map((row: { id: number; name: string; description: string; status: number; image_path: string}) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        status: row.status,
        image_path: row.image_path
      }));
  
      return {
        props: {
        //   ...authCheck.props,
          trucks: trucks,
        },
      };
    } catch (error) {
      console.error('Database error:', error);
      return {
        props: {
        //   ...authCheck.props,
          trucks: [],
        },
      };
    }
};
  

export default ManageTrucksPage;