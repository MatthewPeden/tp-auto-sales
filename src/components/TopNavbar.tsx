// components/Navbar.tsx
import styled from "styled-components";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

const TopNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: inline-block;
  background-color: #333332;
  color: white;
  padding: 1px;
`;

const TopNavbarInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid #b8b8b8;
`;

const NavbarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding: 10px;

  &:hover {
    background-color: #555;
    border-radius: 5px;
  }
`;

const UserNavbarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding: 10px;
  margin-left: auto;

  &:hover {
    background-color: #555;
    border-radius: 5px;
  }
`;

const NavbarImageContainer = styled.div`
  margin-left: 10px;
`;

const TopNavbarReturn = () => {
  const { user, error, isLoading } = useUser();
  
  if (user) {
    return (
      <TopNavbar>
        <TopNavbarInner>
          <a href="/">
            <NavbarImageContainer>
              <Image src="/Zamaco.png" alt="TP Auto Sales" width={150} height={26} />
            </NavbarImageContainer>
          </a>
          <NavbarLink href="/fixed_trucks">Fixed Trucks</NavbarLink>
          <NavbarLink href="/wrecked_trucks">Wrecked Trucks</NavbarLink>
          <UserNavbarLink href="/api/auth/logout">Log Out</UserNavbarLink>
        </TopNavbarInner>
      </TopNavbar>
    );
  } else {
    return (
      <TopNavbar>
        <TopNavbarInner>
          <a href="/">
            <NavbarImageContainer>
              <Image src="/Zamaco.png" alt="TP Auto Sales" width={60} height={60} />
            </NavbarImageContainer>
          </a>
          <NavbarLink href="/fixed_trucks">Fixed Trucks</NavbarLink>
          <NavbarLink href="/wrecked_trucks">Wrecked Trucks</NavbarLink>
          <UserNavbarLink href="/api/auth/login">Log In</UserNavbarLink>
        </TopNavbarInner>
      </TopNavbar>
    );
  }
};

export default TopNavbarReturn;
