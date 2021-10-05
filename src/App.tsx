import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

function App() {

  const {setAuth, setUser} = useActions()
  if(localStorage.getItem('auth')){
    setUser({username: localStorage.getItem('username') } as IUser)
    setAuth(true)
  }

  return (
    <div >
      <Layout>
        <Navbar/>
        <Layout.Content>
          <AppRouter/>
        </Layout.Content>
      </Layout>
      
    </div>
  );
}

export default App;
