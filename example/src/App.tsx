import React from 'react'

import { Text, Typo } from 'typo'

const App = () => {

  return (
    <Typo pause={1000} pace={100}
      onStart={(typo) => console.log(typo + ' typo start')}
      onText={(text, typo) => console.log(typo + ' text play ' + text)}
      onStop={(typo) => console.log(typo + ' typo stop')}
      onChar={(char, typo) => console.log(typo + ' typo char ' + char)}
    >
      <Text
        charClassName={'rotate-in-center'} className={'container'}
      >bonjour </Text>

      <Text
        charClassName={'rotate-in-center'} className={'container'}
      >monde</Text>
    </Typo>
  )
}

export default App
