import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sticker from './sticker/!main'
import Dashboard from './dashboardPage/!main'
import Orders from './ordersPage/!main'
import Holdings from './holdingsPage/!main'
import Positions from './positionsPage/!main'
import Funds from './fundsPage/!main'
import Apps from './appsPage/!main'


function App() {
  return (
    <>
      <Sticker />

      <div className="mt-[60px] ml-[32%] max-[1000px]:ml-0 p-6 max-[500px]:p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </>
  )
}

export default App
