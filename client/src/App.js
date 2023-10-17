import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './assets/css/reset.css'
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';

if(localStorage.getItem('cart') === null) {
  localStorage.setItem('cart', JSON.stringify([]))
}

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
          <Router>
            {
              token ? <AdminRoutes /> : <PublicRoutes />
            }
          </Router>
    </div>
  );
}

export default App;
