// import { withRole, getServerSidePropsForManager } from './api/auth/RBAC.tsx';
import pool from '../../db';
import router from 'next/router';
import Layout from "../components/Layout";
import Image from 'next/image';
import Link from 'next/link';
import TrucksPageActionButton from '@/components/TrucksPageActionButton';
import TrucksPageContainer from '@/components/TrucksPageContainer';
import TrucksPageTitle from '@/components/TrucksPageTitle';
import TrucksPageItem from '@/components/TrucksPageItem';
import TrucksPageInfo from '@/components/TrucksPageInfo';
import TrucksPageTruckTitle from '@/components/TrucksPageTruckTitle';
import TrucksPageContent from '@/components/TrucksPageContent';
import TrucksActionButtonContainer from '@/components/TrucksActionButtonContainer';
  
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
      <TrucksPageContainer>
        <TrucksPageTitle>Wrecked Trucks</TrucksPageTitle>
        <TrucksPageActionButton onClick={() => handleAdd()}>Add New Truck</TrucksPageActionButton>
        <TrucksPageContent>
          {trucks.map(truck => (
            <Link key={truck.id} href={`/trucks/${truck.id}`} passHref>
              <TrucksPageItem>
                <Image 
                  src={truck.image_path} 
                  alt={truck.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                />
                <TrucksPageInfo>
                  <TrucksPageTruckTitle>{truck.name}</TrucksPageTruckTitle>
                  <p>{truck.description}</p>
                </TrucksPageInfo>
                <TrucksActionButtonContainer>
                  <TrucksPageActionButton onClick={() => handleAdd()}>Edit</TrucksPageActionButton>
                  <TrucksPageActionButton onClick={() => handleAdd()}>Delete</TrucksPageActionButton>
                  <TrucksPageActionButton onClick={() => handleAdd()}>Move to Fixed</TrucksPageActionButton>
                </TrucksActionButtonContainer>
              </TrucksPageItem>
            </Link>
          ))}
        </TrucksPageContent>
      </TrucksPageContainer>
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
      const rows = await connection.query('SELECT t.id, t.name, t.description, t.status, ti.id as image_id, ti.image_path FROM trucks AS t LEFT JOIN truck_images AS ti ON t.id = ti.truck_id WHERE t.status = 0 AND ti.primary = 1');
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