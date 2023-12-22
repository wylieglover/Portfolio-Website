import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul className="navbar">
            <li><button>RÉSUMÉ</button></li>
            <li><button>PROJECTS</button></li>
          </ul>
        </nav>
        <div className="name">
          <span className="bold-text">Hello, I'm Wylie Glover!</span>
        </div>
        <div className="bio">
          Aspiring Software Engineer | Recent graduate from Georgia Southern University
          <br />
          Passionate about crafting innovative solutions through code
        </div>
      </header>
    </div>
  );
}

export default App;
