import { useState } from 'react';
import './App.css';
import { Login } from './components/login/login';
import { Manager } from './components/manager/manager';

// Firebase
import firebaseApp from "./firebase/firebaseConfig";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp);

function App() {

  const [globalUser, setGlobalUSer] = useState<any>(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    if(firebaseUser){
      setGlobalUSer(firebaseUser);
    } else {
      setGlobalUSer(null);
    }
  })

  return <>{globalUser ? <Manager userEmail={globalUser.email} /> : <Login/>}</> 
}

export default App;
