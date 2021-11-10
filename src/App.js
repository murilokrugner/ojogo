import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AuthContext from './pages/Auth/AuthContext';
import Routes from './routes';

import api from './services/api';

import io from 'socket.io-client';

function App() {
  let socket = io('http://192.168.2.100:3333/');

  const [registred, setRegistred] = useState(false);

  const signed = useSelector(state => state.auth.signed);
  const user = useSelector(state => state.user.profile);

  async function getInformationPlayer() {
    socket.on("connect", () => {
     saveSocket(user.id, socket.id);
    });
  };

  async function saveSocket(id, socket) {
    try {
      await api.put('socket-player', {
        id: id,
        socket: socket,
      });

    } catch (error) {

    }
  }

  useEffect(() => {
    if (signed) {
     // getInformationPlayer();
    }
  }, []);

  return (
    <AuthContext.Provider value={{registred, setRegistred}}>
      <Routes signed={signed} />
    </AuthContext.Provider>
  );
}

export default App;
