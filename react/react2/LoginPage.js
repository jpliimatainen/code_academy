/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävä 29-34)
 * 
 * Juha-Pekka Liimatainen 18.11.2019
*/

import React, { useState } from 'react';
import { 
  useHistory,
} from 'react-router-dom';

import './index.css';

const LoginPage = (props) => {
  const [name, setName] = useState('');
  const [pid, setPid] = useState('');
  let h = useHistory();

  const login = () => {  
    if (name.length < 3 || pid.length < 3) {
      window.alert("Nimi ja henkilönumero pitää olla vähintään 3 merkkiä pitkiä");
    }
    else {
      props.handleRegister(name, pid);
      h.push("/autot");
    }
  }

  return (
    <div>
      <p>Anna kirjautumistiedot:</p>
      <input type="text" name="firstName" placeholder="Etunimi" value={name}
        onChange={e => setName(e.target.value)} />
      <input type="text" name="pid" placeholder="Henkilönumero" value={pid}
        onChange={e => setPid(e.target.value)} />
      <button type="button" onClick={() => login()}>Rekisteröidy</button>
    </div>
  );
}

export default LoginPage;