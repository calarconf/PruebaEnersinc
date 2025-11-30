import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { store } from './store/store';
import PersonasList from './components/PersonasList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={esES}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/personas" replace />} />
              <Route path="/personas" element={<PersonasList />} />
            </Routes>
          </div>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
