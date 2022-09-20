import "../styles/App.scss";
import { useEffect, useState } from "react";
import quotes from "../data/data.json";
import callToApi from "../services/api";
import ls from "../services/ls";
import logo from "../images/friends.png";

function App() {
  //Variables de estado
  const [data, setData] = useState(ls.get("data", []));
  const [filterQuote, setFilterQuote] = useState(ls.get("searchQuote", ""));
  const [filterCharacters, setFilterCharacters] = useState(
    ls.get("searchCharacter", "")
  );
  const [addNewQuote, setAddNewQuote] = useState({
    quote: "",
    character: "",
  });

  //Llamada a la API
  
  useEffect(() => {
    if (data === []){
    callToApi().then((response) => {
      setData(response);
    });}
  }, []);

  //Funciones handle
  const handleAddNewQuote = (ev) => {
    setAddNewQuote({
      ...addNewQuote,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleFilterCharacters = (ev) => {
    ls.set("searchCharacter", ev.target.value);
    setFilterCharacters(ev.target.value);
  };

  const handleFilterQuote = (ev) => {
    ls.set("searchQuote", ev.target.value);
    setFilterQuote(ev.target.value);
  };

  const handleNewQuote = (ev) => {
    ev.preventDefault();
    if (addNewQuote.quote === "" || addNewQuote.character === "") {
      alert("Fill in all the fields");
    } else {
      setData([...data, addNewQuote]);
      setAddNewQuote({
        quote: "",
        character: "",
      });
      ls.set("data", data);
    }
  };

  const htmlData = data
    .filter((quote) => {
      if (filterCharacters !== "All") {
        return (
          quote.character
            .toLowerCase()
            .includes(filterCharacters.toLowerCase()) &&
          quote.quote.toLowerCase().includes(filterQuote.toLowerCase())
        );
      } else {
        return quote.quote.toLowerCase().includes(filterQuote.toLowerCase());
      }
    })
    .map((quote, index) => {
      return (
        <li className="list__quote" key={index}>
          "{quote.quote}" -{" "}
          <span className="list__character">{quote.character}</span>
        </li>
      );
    });

  ls.set("data", data);

  return (
    <div className="page">
      <header className="header">
        <div className="header__img">
          <img
            src={logo}
            className="header__img--img"
            title="Logo Friends"
            alt="Logo friends"
          />
        </div>
        <h1 className="header__title">Friends quotes</h1>
      </header>
      <form className="form__filter">
        <label
          for="phrase"
          className="form__filter--label form__filter--label-quote"
        >
          Filter by quote:
          <input
            className="form__filter--input"
            type="text"
            name="phrase"
            id="phrase"
            value={filterQuote}
            onChange={handleFilterQuote}
          />
        </label>
        <label
          for="characters"
          className="form__filter--label form__filter--label-character"
        >
          Filter by character:
          <select
            id="characters"
            name="characters"
            className="form__filter--input"
            value={filterCharacters}
            onChange={handleFilterCharacters}
          >
            <option value="All">All</option>
            <option value="Ross">Ross</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Rachel">Rachel</option>
            <option value="Chandler">Chandler</option>
            <option value="Monica">Monica</option>
          </select>
        </label>
      </form>

      <main className="main">
        <ul className="list">{htmlData}</ul>
        </main>
        <form className="form__filter">
          <h2 className="header__title">Add a new quote:</h2>
          <label
            for="quote"
            className="form__filter--label form__filter--label-quote"
          >
            Quote:
            <input
              className="form__filter--input"
              type="text"
              name="quote"
              id="quote"
              value={addNewQuote.quote}
              onChange={handleAddNewQuote}
            />
          </label>
          <label
            for="character"
            className="form__filter--label form__filter--label-character"
          >
            Character:
            <select
              id="character"
              name="character"
              className="form__filter--input"
              value={addNewQuote.character}
              onChange={handleAddNewQuote}
              selected
            >
              <option value="">Choose a character</option>
              <option value="Ross">Ross</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Rachel">Rachel</option>
              <option value="Chandler">Chandler</option>
              <option value="Monica">Monica</option>
            </select>
          </label>
          <input
            className="form__filter--button"
            type="submit"
            value="Add"
            onClick={handleNewQuote}
          />
        </form>
      
      <footer className='footer'>
      <small className='footer__copy'>&copy; 2022 Olga RG</small>
      <section className='footer__rrss'>
        <a href='https://github.com/olgargarrucho' className='footer__rrss--link' target='_blank' rel="noreferrer">
          <i className='icon fab fa-github-square'></i>
        </a>
        <a href='https://www.linkedin.com/in/olgargarrucho/' className='footer__rrss--link' target='_blank' rel="noreferrer">
          <i className='icon fab fa-linkedin'></i>
        </a>
        <a href='https://twitter.com/olgargarrucho' className='footer__rrss--link' target='_blank' rel="noreferrer">
          <i className='icon fab fa-twitter-square'></i>
        </a>
      </section>
    </footer>
    </div>
  );
}

export default App;
