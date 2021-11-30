import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AuthContext from './pages/Auth/AuthContext';
import Routes from './routes';

import {
  AdMobRewarded
} from 'react-native-admob'


function App() {
  const [registred, setRegistred] = useState(false);

  const signed = useSelector(state => state.auth.signed); 
  
  useEffect(() => {
    AdMobRewarded.setAdUnitID('ca-app-pub-4499612911905101/2968886109');
  }, []);

  return (
    <AuthContext.Provider value={{registred, setRegistred}}>
      <Routes signed={signed}/>
    </AuthContext.Provider>
  );
}

export default App;
