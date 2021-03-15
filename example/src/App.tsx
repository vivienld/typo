import React from 'react'

import { Text, Typo } from 'reactypo'

const App = () => {
  return (
    <main className='main'>

      <Typo className='header' name={'title'} next='under-contruction' first>
        <Text pace={100} charClassName="wave-infinite title-char" className="title" stamp>Reactypo</Text>
        <Text pause={200} charClassName="wave-infinite" className="title title2" stamp>Reactypo</Text>
        <Text pause={500} whiteSpacePace={100} charClassName=" sub-title-char" className={'sub-title'}>animate and control text with react</Text>
      </Typo>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typo className="under-contruction" name="under-contruction">
          <Text pause={200} charClassName="swirl-in-fwd" >This documentation is under construction</Text>
          </Typo>
      </div>
    </main>
  )
}

export default App
