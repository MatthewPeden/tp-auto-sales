// Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const Main = styled.main`
  /* Subtract the height of the navbar from the available viewport height */
  height: calc(100vh - ${props => props.theme.navbarHeight}px);
  overflow-y: auto; /* Add a scrollbar if the content overflows */
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};

export default Layout;
