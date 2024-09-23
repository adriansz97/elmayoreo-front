import { createRoot } from 'react-dom/client'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { App } from './App.jsx'
import './index.css';
import { SnackbarProvider } from 'notistack';

// Hace edicion del inventario
// 

createRoot(document.getElementById('root')).render( 
  <Provider store={store}>
    <SnackbarProvider>
      <App /> 
    </SnackbarProvider>
  </Provider>
)
