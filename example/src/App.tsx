import React from 'react'

import { Text, Typo, Animation } from 'typo'

const App = () => {


  return (
    <Typo>
      <Text pace={1000} animation={Animation.rotateInCenter}
        onStart={(text) => console.log(text + ' start')}
        onPlay={(text) => console.log(text + ' play')}
        onStop={(text) => console.log(text + ' stop')}
      >bonjour </Text>
      <Text pace={1000}
        onStart={(text) => console.log(text + ' start')}
        onPlay={(text) => console.log(text + ' play')}
        onStop={(text) => console.log(text + ' stop')}
      >monde</Text>
    </Typo>
  )
}

export default App
