import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./common/ThemeContext";
import Navigation from "./components/Navigation/index.";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:id" element={<CountryDetails />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
