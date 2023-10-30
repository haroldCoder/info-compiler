import Info from './components/Info'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Info/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
