import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
