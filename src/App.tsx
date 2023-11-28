import React from 'react'
import Button from './components/Button'

function App () {
  const fun = () => {
    console.log('Clicked')
  }
  return <Button onClick={fun}>Click Me!</Button>
}

export default App
