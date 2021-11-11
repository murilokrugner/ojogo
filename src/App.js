import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import AuthContext from './pages/Auth/AuthContext';
import Routes from './routes';

function App() {
  const [registred, setRegistred] = useState(false);

  const signed = useSelector(state => state.auth.signed);

  return (
    <AuthContext.Provider value={{registred, setRegistred}}>
      <Routes signed={signed} />
    </AuthContext.Provider>
  );
}

export default App;
