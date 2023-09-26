import Layout from '@/components/Layout';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #f7f7f7;
  padding: 80px 30px 20px 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0% 10% 0% 10%;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: #474747;
  font-size: 32px;
  font-weight: bold;
`;

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

const TruckDetailPage: React.FC<Props> = ({ truck }) => {
  return (
    <Layout>
      <Container>
        <ImageContainer>
          <Title>{truck.name}</Title>
          <p>{truck.description}</p>
          {truck.imagePaths.map((imagePath, index) => (
            <Image 
              src={imagePath} 
              alt={`${truck.name} - Image ${index + 1}`}
              width={1000}
              height={1000}
              layout="responsive"
            />
          ))}
        </ImageContainer>
      </Container>
    </Layout>
  );
};

export default TruckDetailPage;
