import React from 'react'

import NavBar from './components/nav-bar'
import Hero from './components/hero'
import Demo from './components/demo'



function App() {
  return (
    <div className=' w-full h-screen flex flex-col gap-10 px-8 pt-4 mb-8'>
      <NavBar />
      <Hero />
      <Demo/>
    </div>
  )
}

export default App