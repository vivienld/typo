import React from 'react'

import { Text, Typo } from 'typo'

const App = () => {

  return (
    <Typo rewind 
      onStart={(typo) => console.log(typo + ' typo start')}
      onPlay={(typo) => console.log(typo + ' typo play')}
      onStop={(typo) => console.log(typo + ' typo stop')}
    >
      <Text pace={300} stamp
        charClassName={'rotate-in-center'} className={'container'}
        onStart={(text) => console.log(text + 'text start')}
        onPlay={(text) => console.log(text + 'text play')}
        onStop={(text) => console.log(text + 'text stop')}
      >bonjour </Text>
      <Text pace={300}
        charClassName={'rotate-in-center'} className={'container'}
        onStart={(text) => console.log(text + 'text start')}
        onPlay={(text) => console.log(text + 'text play')}
        onStop={(text) => console.log(text + 'text stop')}
      >monde</Text>
    </Typo>
  )
}

export default App
