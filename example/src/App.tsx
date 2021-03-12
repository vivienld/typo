import React from 'react'

import { Char, StyledComponents } from 'typo'

const App = () => {

  const charRef1 = React.createRef<Char>();
  const charRef2 = React.createRef<Char>();
  const charRef3 = React.createRef<Char>();
  const charRef4 = React.createRef<Char>();

  return (
    <>
      <Char ref={charRef1} component={StyledComponents.rotateInCenter} duration={1000} hide
        onPlay={(char) => setTimeout(() => { char.hide() }, 1000)}
        onLoad={(char) => setTimeout(() => { char.play() }, 1000)}
        onUnload={(char) => setTimeout(() => { char.load() }, 1000)}
        onHide={(char) => setTimeout(() => { char.load() }, 1000)}
      >a</Char>

      <Char ref={charRef2} component={StyledComponents.rotateInCenter} duration={1000}
        onPlay={(char) => setTimeout(() => { char.hide() }, 1000)}
        onLoad={(char) => setTimeout(() => { char.play() }, 1000)}
        onUnload={(char) => setTimeout(() => { char.load() }, 1000)}
        onHide={(char) => setTimeout(() => { char.load() }, 1000)}
      >b</Char>

      <Char ref={charRef3} component={StyledComponents.rotateInCenter} duration={1000} unload
        onPlay={(char) => setTimeout(() => { char.hide() }, 1000)}
        onLoad={(char) => setTimeout(() => { char.play() }, 1000)}
        onUnload={(char) => setTimeout(() => { char.load() }, 1000)}
        onHide={(char) => setTimeout(() => { char.load() }, 1000)}
      >c</Char>

      <Char ref={charRef4} component={StyledComponents.rotateInCenter} duration={1000} fixed
        onPlay={(char) => setTimeout(() => { char.hide() }, 1000)}
        onLoad={(char) => setTimeout(() => { char.play() }, 1000)}
        onUnload={(char) => setTimeout(() => { char.load() }, 1000)}
        onHide={(char) => setTimeout(() => { char.load() }, 1000)}
      >d</Char>
    </>
  )
}

export default App
