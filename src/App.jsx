import { useState } from 'react'
import './App.css'
import FilteringPage from './Pages/FilteringPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FilteringPage/>
    </>
  )
}

export default App
