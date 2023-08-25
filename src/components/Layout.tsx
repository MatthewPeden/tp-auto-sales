// Layout.tsx
import React from "react";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
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
  overflow-y: auto; /* Add a scrollbar if the content overflows */
`;

const LeftVerticalDivider = styled.hr`
  width: 10px;
  height: 100%;
  background-color: #333332;
  position: fixed;
  left: 0;
`;

const LeftVerticalDividerSecondary = styled.hr`
  width: 3px;
  height: 100%;
  background-color: #333332;
  position: fixed;
  left: 0;
  margin-left: 11px;
`;

const RightVerticalDivider = styled.hr`
  width: 10px;
  height: 100%;
  background-color: #333332;
  position: fixed;
  right: 0;
`;

const RightVerticalDividerSecondary = styled.hr`
  width: 3px;
  height: 100%;
  background-color: #333332;
  position: fixed;
  right: 0;
  margin-right: 11px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <LeftVerticalDivider></LeftVerticalDivider>
        <LeftVerticalDividerSecondary></LeftVerticalDividerSecondary>
        <RightVerticalDivider></RightVerticalDivider>
        <RightVerticalDividerSecondary></RightVerticalDividerSecondary>
        <TopNavbar />
        <BottomNavbar />
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};

export default Layout;
