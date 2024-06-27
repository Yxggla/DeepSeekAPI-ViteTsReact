// App.tsx

import React from 'react';
import 'antd/dist/reset.css';
import styled from 'styled-components';
import ChatComponent from './components/ChatBox/ChatComponent';
import MainLayout from './components/MainLayout.tsx';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  background-color: #f1f1f1;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => (
    <Container>
        <Sidebar>
            <MainLayout />
        </Sidebar>
        <MainContent>
            <ChatComponent />
        </MainContent>
    </Container>
);

export default App;
