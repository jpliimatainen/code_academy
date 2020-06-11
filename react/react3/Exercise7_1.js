/* 
 * Webkäyttöliittymäkirjastot
 * 7. Hooks and Effects (Tehtävät 36-37)
 * 
 * Juha-Pekka Liimatainen 20.11.2019
*/
import React, { useState } from 'react';
import './index.css';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState('');

  const submit = () => {
    if (team.length > 0) {
      // add a new team
      const tmp = [...teams, team.toUpperCase()];
      setTeams(tmp);
      // reset input field
      setTeam('');
    }
  }
  
  return (
    <div>
      <input type="text" onChange={(e) => { setTeam(e.target.value) }} value={team} />
      <button type="button" onClick={() => submit()}>Tallenna</button>
      {teams.length > 0 ? 
        <select>
          {teams.map((item, index) => <Option key={index} value={index} name={item} />)}
        </select> :
        null
      }
      {teams.length >= 5 ?
        <h2>Ainakin 5 joukkuetta syötetty</h2> :
        null
      }
    </div>
  );
}

const Option = (props) => <option value={props.value}>{props.name}</option>;

export default TeamList;