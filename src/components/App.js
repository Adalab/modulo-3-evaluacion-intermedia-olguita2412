import logo from '../images/logo.svg';
import '../styles/App.scss';
import { useEffect, useState } from 'react';
import quotes from '../data/data.json';
import callToApi from '../services/api';
import ls from '../services/ls';



function App() {
  
  //Variables de estado
  const [data, setData] = useState(ls.get('data', []));
  const [filterQuote, setFilterQuote] = useState(ls.get('searchQuote',''));
  const [filterCharacters, setFilterCharacters] = useState(ls.get('searchCharacter', ''));
  const [addNewQuote, setAddNewQuote] = useState ({
    quote: '',
    character: ''
  })
  
  //Llamada a la API
  useEffect(() => {
    callToApi().then((response) => {
      setData(response);
    });
  }, []);


  //Funciones handle
  const handleAddNewQuote = (ev) => {
    setAddNewQuote({
      ...addNewQuote,
      [ev.target.id]: ev.target.value
    });


  };

  const handleFilterCharacters = (ev) => {
    ls.set('searchCharacter', ev.target.value);
    setFilterCharacters(ev.target.value);
  };

  const handleFilterQuote = (ev) => {
    ls.set('searchQuote', ev.target.value);
    setFilterQuote(ev.target.value);

  };

  const handleNewQuote = (ev) => {
    ev.preventDefault();
    setData([
      ...data,
      addNewQuote
    ]);
    setAddNewQuote({
      quote: '',
      character: ''
    })
  }

  
  

  const htmlData = data
  .filter ((quote) => {
    if (filterCharacters !== "Todos") {
      return  (quote.character.toLowerCase().includes(filterCharacters.toLowerCase()) && quote.quote.toLowerCase().includes(filterQuote.toLowerCase()))} else {
        return (quote.quote.toLowerCase().includes(filterQuote.toLowerCase()))
      }
  })
  .map((quote, index) => {
    return (
      <li className='pepino' key={index}>{quote.quote + '-' + quote.character}</li>
    )
  })
  
  ls.set('data', data);
 
  


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
            value={filterQuote}
            onChange={handleFilterQuote}
            /> 
           </label>
         <label for="characters">
          Filtrar por personaje:
          <select id="characters" name="characters" value={filterCharacters} onChange={handleFilterCharacters}>
          <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Rachel">Rachel</option>
            <option value="Chandler">Chandler</option>
            <option value="Monica">Monica</option>
          </select>
        </label>
        </form>
      </header>
    
      <main>
        <ul>
       {htmlData}
        </ul>
        <form>
          <h2>Añade una nueva frase:</h2>
          <label for="quote">
          Frase: 
          <input
            className="add__phrase"
            type="text"
            name="quote"
            id="quote"
            value={addNewQuote.quote}
            onChange={handleAddNewQuote}
          />
          </label>
          <label for="characters">
          Personaje: 
          <input
            className="new-contact__input"
            type="text"
            name="character"
            id="character"
            value={addNewQuote.character}
            onChange={handleAddNewQuote}
          />
          </label>
          <input className="new-contact__btn" type="submit" value="Añadir" onClick={handleNewQuote} />
        </form>
      </main>
    </div>
  );
}

export default App;
