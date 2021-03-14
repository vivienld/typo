import React from 'react'

import { Text, Typo } from 'reactypo'

const App = () => {
  return <>
    <div className='header'>
      <Typo name={'title'} next={'hello-world'} first>
        <Text pace={250} charClassName="reactypo-title wave-infinite" block >Reactypo</Text>
      </Typo>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      <Typo name='subtitle' next='title'>
        <Text charClassName="reactypo-subtitle swirl-in-fwd" block>Easy text animation</Text>
      </Typo>
      <Typo pace={5000} name={'hello-world'} next={"subtitle"} >
        <Text pace={50} charClassName="wave">Hello World!</Text>
      </Typo>
    </div>
  </>
}

export default App
