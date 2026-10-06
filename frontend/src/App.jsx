import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500
to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Hola desde React + Tailwind v4!
        </h1>
        <p className="text-gray-600">
          Tailwind CSS v4 está funcionando correctamente
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600
text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Hacer clic
        </button>
      </div>
    </div>
  )
}
export default App