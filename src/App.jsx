import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Past from './components/Past'
import ViewPast from './components/ViewPast'
import { RouterProvider } from 'react-router-dom'


const router =createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
       <Navbar />
       <Home />
      </div>
    },
     {
      path:"/pastes",
      element:
      <div>
       <Navbar />
       <Past />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
       <Navbar/>
       <ViewPast/>
      </div>
    },
    
  ]
)
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
