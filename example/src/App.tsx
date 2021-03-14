import React from 'react'

import { Text, Typo } from 'typo'

const App = () => {

  return (
    <Typo pause={1000} pace={100} whiteSpacePace={500}
      onStart={(typo) => console.log(typo + ' typo start')}
      onText={(text, typo) => console.log(typo + ' text play ' + text)}
      onStop={(typo) => console.log(typo + ' typo stop')}
      onChar={(char, typo) => console.log(typo + ' typo char ' + char)}
    >
      <Text
        charClassName={'rotate-in-center'} className={'container'}
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, suscipit temporibus animi voluptatem debitis laborum culpa dolorum. Quidem cumque corrupti animi in distinctio aperiam rerum perferendis maxime, dolore fugit nulla.</Text>

      <Text
        charClassName={'rotate-in-center'} className={'container'}
      >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus inventore tempora, commodi excepturi quas deserunt quia quidem quae molestiae maxime vitae ipsum suscipit cumque. Non nesciunt tenetur at provident doloremque.</Text>
    </Typo>
  )
}

export default App
