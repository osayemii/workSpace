import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { FirLinked } from './FirLinked'
import { SecLinked } from './SecLinked'
import { Home } from './Home.jsx'
import './App.css'

function App() {

  return (
    <>
      <Home />
      <Routes>
        <Route path='/FirLinked' element={<FirLinked />} />
        <Route path='/SecLinked' element={<SecLinked />} />
      </Routes>
    </>
  )
}
export default App
