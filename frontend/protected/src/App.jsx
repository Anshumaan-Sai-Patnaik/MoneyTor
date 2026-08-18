import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MarketProvider } from './context/MarketContext'
import Sticker from './sticker/!main'
import ConnectionGate from './components/connection-gate'
import Dashboard from './dashboardPage/!main'
import Orders from './ordersPage/!main'
import Holdings from './holdingsPage/!main'
import Positions from './positionsPage/!main'
import Funds from './fundsPage/!main'
import Apps from './appsPage/!main'
import OrderWindow from './components/order-window'


function App() {
  return (
    <MarketProvider>
      <Sticker />

      <div className="mt-[60px] ml-[32%] max-[1000px]:ml-0 p-6 max-[500px]:p-4">
        <ConnectionGate>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </ConnectionGate>
      </div>

      <OrderWindow />
    </MarketProvider>
  )
}

export default App
