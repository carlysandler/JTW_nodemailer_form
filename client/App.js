import React from 'react'
// eslint-disable-next-line no-unused-vars
import Navbar from './components/Navbar'
import Routes from './Routes'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes />
    </div>
  )
}

export default App
