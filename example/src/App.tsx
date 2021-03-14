import React from 'react'

import { Text, Typo } from 'reactypo'

const App = () => {
  return (
    <Typo pace={5000}>
      <Text pace={50} charClassName="wave">Hello </Text>
      <Text pause={500} pace={2000} charClassName="wave">World!</Text>
    </Typo>
  )
}

export default App
