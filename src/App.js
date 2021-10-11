import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import HomeScreen from "./screens/HomeScreen";
import WeatherScreen from "./screens/WeatherScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">Get Your Weather</header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/weather" component={WeatherScreen} exact></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
