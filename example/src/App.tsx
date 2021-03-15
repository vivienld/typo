import React from 'react'

import { Text, Typo } from 'reactypo'

const App = () => {
  return (
    <main className='main'>

      <Typo className='header' name={'title'} next='under-contruction' first>
        <Text pause={500} pace={100} charClassName="wave-infinite title-char" className="title" stamp>Reactypo</Text>
        <Text pause={200} charClassName="wave-infinite" className="title title2" stamp>Reactypo</Text>
        <Text pause={500} whiteSpacePace={100} charClassName=" sub-title-char" className={'sub-title'} block>animate and control text</Text>
        <Text whiteSpacePace={100} charClassName=" sub-title-char mt-1" className={'sub-title'} block>with react</Text>
      </Typo>

      <div className="under-contruction">
        <Text loop pace={200}>under construction</Text>
      </div>
      <input type="button" className="bottom" onClick={() => Typo.play('title')} value="Replay!" />
    </main>
  )
}

export default App
