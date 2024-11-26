import React from 'react';
import { useAuth } from '../AuthProvider';

export default function logout(){
  const {login} = useAuth();
  return(
    <div>
      <button type="button" onClick={{login}}>
        Log In
      </button>
    </div>
  )
}
