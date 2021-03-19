import React from 'react'
import { Text, Typo } from 'reactypo'
import ExampleCard from './example.card'

const App = () => {
  return (
    <main className='main'>

      <Typo className='header' name={'title'} next='under-contruction' first>
        <Text pace={100} charClassName="wave-infinite title-char" className="header-title" stamp>Reactypo</Text>
        <Text pause={200} charClassName="wave-infinite" className="header-title title2" stamp>Reactypo</Text>
        <Text pause={500} whiteSpacePace={100} charClassName=" sub-title-char" className={'sub-title'} block>animate and control text</Text>
      </Typo>

      <div className="tile is-primary">
        <h2 className="description title is-12">Reactypo is a react component that gives a typewriter effect to your text</h2>
      </div>

      <ExampleCard title="test"
        description='description test'
        code={<Text>I am a Text component without props</Text>}
      />
    </main>
  )
}

export default App
