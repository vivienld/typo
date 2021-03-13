import React from 'react'

import { Text, Typo, Animation } from 'typo'

const App = () => {


  return (
    <Typo rewind
      onStart={(typo) => console.log(typo + ' typo start')}
      onPlay={(typo) => console.log(typo + ' typo play')}
      onStop={(typo) => console.log(typo + ' typo stop')}
    >
      <Text pace={1000} animation={Animation.rotateInCenter}
        onStart={(text) => console.log(text + 'text start')}
        onPlay={(text) => console.log(text + 'text play')}
        onStop={(text) => console.log(text + 'text stop')}
      >bonjour </Text>
      <Text pace={1000}
        onStart={(text) => console.log(text + 'text start')}
        onPlay={(text) => console.log(text + 'text play')}
        onStop={(text) => console.log(text + 'text stop')}
      >monde</Text>
    </Typo>
  )
}

export default App
