import styled from 'styled-components';
// import { withRole, getServerSidePropsForManager } from './api/auth/RBAC.tsx';
import pool from '../../db';
import router from 'next/router';
import Layout from "../components/Layout";
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  padding: 80px 20px 20px 20px;
`;

const Title = styled.h1`
  color: #474747;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #333332;
    color: #ede6f5;
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #a6a6a6;
  }

  tbody tr:nth-child(odd) {
    background-color: #ebebeb;
  }
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
  margin-bottom: 5px;
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

const ActionButton = styled.a`
  width: 50px;
  height: 25px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #333332;
  color: white;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #7d6ba0;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;
  
interface Truck {
    id: number;
    name: string;
    description: string;
    status: number;
}
  
interface ManageTrucksPageProps {
    trucks: Truck[];
}

const handleAdd = () => {
  router.push('/add-truck');
};

const handleDelete = async (id: number) => {
  const response = await fetch(`/api/truck/delete-truck?id=${id}`, {
      method: 'DELETE',
  });
  
  if (response.ok) {
      router.push('/trucks');
  }
};

const handleEditButtonClick = (id: number) => {
  router.push(`/edit-trucks/${id}`);
};

const ManageTrucksPage: React.FC<ManageTrucksPageProps> = ({ trucks }) => {
  return (
    <Layout>
      <Container>
        <Title>Fixed Trucks</Title>
        <Button onClick={() => handleAdd()}>Add New Truck</Button>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck: Truck) => (
              <tr key={truck.id}>
                <td>{truck.name}</td>
                <td>{truck.description}</td>
                <td>{truck.status}</td>
                <td>
                  <ActionButton onClick={() => handleEditButtonClick(truck.id)}>Edit</ActionButton>
                  {' | '}
                  <ActionButton onClick={() => handleDelete(truck.id)}>Delete</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
      const rows = await connection.query('SELECT t.id, t.name, t.description, t.status, ti.id as image_id, ti.image_path FROM trucks AS t LEFT JOIN truck_images AS ti ON t.id = ti.truck_id WHERE t.status = 1 AND ti.is_primary = true');
      connection.release();
  
      const trucks = rows.map((row: { id: number; name: string; description: string; status: number; }) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        status: row.status,
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