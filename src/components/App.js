import logo from '../images/logo.svg';
import '../styles/App.scss';
import { useState } from 'react';
import list from '../data/data.json';


function App() {
  
  //Variables de estado
  const [filterPhrase, setFilterPhrase] = useState('');
  const [filterCharacters, setFilterCharacters] = useState(['Todos', 'Ross', 'Joey', 'Phoebe', 'Rachel', 'Chandler', 'Monica']);
  const [addNewPhrase, setAddNewPhrase] = useState ({
    phrase: '',
    character: ''
  })
  const [data, setData] = useState(list)

  //Funciones handle
  const handleAddNewPhrase = () => {

  };

  const handleFilterCharacters = () => {

  };

  const handleFilterPhrase = () => {

  };

  const renderList = () => {
    const html = data.map((phrase) => {
      return (
        <li>{list.quote + "-" + list.character}</li>
      )
    })
    return html
  }


  return (
    
    <div>
      <header>
        <h1>Frases de Friends</h1>
        <form>
          <label for="phrase">
            Filtrar por frase:
            <input
            className="filter__input"
            type="text"
            name="phrase"
            id="phrase"
            value={filterPhrase}
            onChange={handleFilterPhrase}
            /> 
           </label>
         <label for="characters">
          Filtrar por personaje:
          <select id="characters" name="characters" value={filterCharacters} onChange={handleFilterCharacters}>
          <option value={filterCharacters[0]}>{filterCharacters[0]}</option>
            <option value={filterCharacters[1]}>{filterCharacters[1]}</option>
            <option value={filterCharacters[2]}>{filterCharacters[2]}</option>
            <option value={filterCharacters[3]}>{filterCharacters[3]}</option>
            <option value={filterCharacters[4]}>{filterCharacters[4]}</option>
            <option value={filterCharacters[5]}>{filterCharacters[5]}</option>
            <option value={filterCharacters[6]}>{filterCharacters[6]}</option>
          </select>
        </label>
        </form>
      </header>
      <main>
        <ul>
          {renderList()}
        </ul>
        <form>
          <h2>Añade una nueva frase:</h2>
          <input
            className="add__phrase"
            type="text"
            name="addPhrase"
            id="addPhrase"
            placeholder="Frase: "
            value={addNewPhrase.phrase}
            onChange={handleAddNewPhrase}
          />
          <input
            className="new-contact__input"
            type="text"
            name="addCharacters"
            id="addCharacters"
            placeholder="Personaje: "
            value={addNewPhrase.character}
            onChange={handleAddNewPhrase}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
