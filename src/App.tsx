import Home from './Pages/Home'
import Chat from './Pages/Chat'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './contexts/ThemeContext'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'

import './App.css'

function App() {

  

  return (
    <>
    <ThemeProvider>
      <Toaster />
    
        <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/chat' element = {<Chat/>}/>
          </Routes>
      
        </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
