import React from 'react'

import { Text, Animation } from 'typo'

const App = () => {


  return (
    <>
      <Text pace={1000} animation={Animation.rotateInCenter} rewind
        onStart={(text) => console.log(text + ' start')}
        onPlay={(text) => console.log(text + ' play')}
        onStop={(text) => console.log(text + ' stop')}
      >bonjour</Text>
    </>
  )
}

export default App
