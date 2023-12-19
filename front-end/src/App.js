import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppContextProvider } from './context/AppContext';
import { NavBar } from './components/NavBar';
import { routes } from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppContextProvider>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <>
                      <NavBar />
                      <Page />
                    </>
                  }
                />
              );
            })}
          </Routes>
        </AppContextProvider>
      </div>
    </Router>
  );
}

export default App;
