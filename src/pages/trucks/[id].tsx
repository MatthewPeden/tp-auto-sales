import type { GetServerSideProps, NextPage } from 'next';
import TruckDetailPage from '../truck-detail';
import pool from '../../../db';

interface Truck {
    id: number;
    name: string;
    imagePaths: string[];
    description: string;
    status: string;
}  

interface Props {
  truck: Truck;
}

const TruckDetail: NextPage<Props> = ({ truck }) => {
  return <TruckDetailPage truck={truck} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try{
        const { id } = context.query;

        const connection = await pool.getConnection();

        const rows = await connection.query(
            'SELECT name, description, status, image_path FROM trucks as t LEFT JOIN truck_images as ti ON t.id = ti.truck_id WHERE t.id = ?',
            [id]
        );

        connection.release();

        connection.end();

        if (rows.length === 0) {
            return {
                notFound: true,
            };
        }

        const truck = {
            name: rows[0].name,
            description: rows[0].description,
            status: rows[0].status,
            imagePaths: rows.map((row: { image_path: any; }) => row.image_path)
        };

        return {
            props: {
                truck,
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

export default TruckDetail;