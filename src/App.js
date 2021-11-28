import PokemonList from "./components/PokemonList";
import Pokeimg from "./assets/images/pokemon_logo.png";

const App = () => {
  return (
    <div className="app-container">
      <h1>
        <img src={Pokeimg} alt="pokeimg" />
      </h1>
      <PokemonList />
    </div>
  );
};

export default App;
