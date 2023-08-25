// components/Navbar.tsx
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0/client";

const BottomNavbar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: inline-block;
  background-color: #333332;
  color: white;
  padding: 1px;
`;

const BottomNavbarInner = styled.div`
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

  &:hover {
    background-color: #555;
    border-radius: 5px;
  }
`;

const ExtraPadding = styled.div`
  padding: 10px;
`;

const BottomNavbarReturn = () => {
  const { user, error, isLoading } = useUser();
  
  return (
    <BottomNavbar>
      <BottomNavbarInner>
        <ExtraPadding>Phone:</ExtraPadding>
        <NavbarLink href={`tel:2706708781`} className="phone-link">
            (555) 555-5555
        </NavbarLink>
        <ExtraPadding>Email:</ExtraPadding>
        <NavbarLink href={`mailto:test@email.com`} className="email-link">
            test@email.com
        </NavbarLink>
      </BottomNavbarInner>
    </BottomNavbar>
  );
};

export default BottomNavbarReturn;
