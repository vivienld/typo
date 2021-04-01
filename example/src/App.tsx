import React from 'react'
import { Text, Typo } from 'reactypo'
import ExampleCard from './example-card'
const App = () => {
  return (
    <main className='main'>

      <Typo className='header' name={'title'} next='under-contruction'>
        <Text pace={100} charClassName="wave-infinite title-char" className="header-title" stamp>Reactypo</Text>
        <Text pause={200} charClassName="wave-infinite" className="header-title title2" stamp>Reactypo</Text>
        <Text pause={500} whiteSpacePace={100} charClassName=" sub-title-char" className={'sub-title'} block>animate and control text</Text>
      </Typo>

      {/** Animation de base */}
      <ExampleCard title="Simple Print Effect"
        description='The <Text /> component is the base component to give your text a type-writer effect. The default pace is 40ms.'
        demo={<Text>I am a &lt;Text /&gt; component without props</Text>}
        code={`<Text>I am a <Text /> component without props</Text>`}
      />
      {/** Changer le pas */}
      <ExampleCard title="Change the pace"
        description='The pace props defines the interval speed between two chars print'
        demo={
          <div>
            <Text pace={200} block>This &lt;Text /&gt; has a pace of 200</Text>
            <Text pace={10}>This &lt;Text /&gt; has a pace of 10</Text>
          </div>
        }
        code={
          `<Text pace={200} block>This <Text /> has a pace of 200</Text>
<Text pace={10}>This <Text /> has a pace of 10</Text>`
        }
      />
      {/** Changer le pas des espaces blancs */}
      <ExampleCard title="Change the white spaces pace "
        description='Changing the pace of the white spaces can give your text a more dynamic feel'
        demo={<Text whiteSpacePace={80}>White spaces have a slower pace and it give the text more rythm</Text>}
        code={`<Text whiteSpacePace={80}>White spaces have a slower pace and it give the text more rythm</Text>`}
      />
      {/** Mettre en pause */}
      <ExampleCard title="Pause the print"
        description='The pause props defines the time before the text starts printing'
        demo={<Text pause={1000}>This text paused for 1 second before printing</Text>}
        code={`<Text pause={1000}>This text paused for 1 second before printing</Text>`}
      />
      {/** Mettre en block */}
      <ExampleCard title="Text as a block"
        description='A <Text /> component is displayed as inline-block by default. This props displays it as a block'
        demo={
          <Typo>

            <Text>I'm inline. </Text>
            <Text>Me too! </Text>
            <Text block>I'm a block. </Text>
            <Text block>Omg me too! </Text>
          </Typo>
        }
        code={
          `<Typo>
  <Text>I'm inline. </Text>
  <Text>Me too! </Text>
  <Text block>I'm a block. </Text>
  <Text block>Omg me too! </Text>
</Typo>`
        }
      />

      {/** Stamp */}
      <ExampleCard title="Text as a stamp"
        description='By default, every char is display one after another. 
        Defining a &lt;Text /&gt; as stamps displays every char at the same time.'
        demo={
          <Typo>
            {Array(8).fill(0).map((_, i) => <Text key={i} pace={500} stamp>Stamp! </Text>)}
          </Typo>
        }
        code={
          `<Typo>
    <Text stamp>Stamp! </Text>
    <Text stamp>Stamps! </Text>
</Typo>`}
      />
      {/** Rewind */}
      <ExampleCard title="Rewind"
        description='Chars can be printed backwards'
        demo={<Text rewind>ok bye! What's going on????</Text>}
        code={`<Text rewind>ok bye! What's going on????</Text>`}
      />
      {/** Events */}
      <ExampleCard title="Callbacks"
        description='You can trigger callbacks according to the Text state. Check the console!'
        demo={<Text
          onStart={text => console.log("Print started")}
          onChar={char => console.log("Printed " + char)}
          onStop={text => console.log("Print stopped")}
        >I'm a super inspired sentence...</Text>}
        code={`<Text
          onStart={text => console.log("Print started")}
          onChar={char => console.log("Printed " + char)}
          onStop={text => console.log("Print stopped")}
        >I'm a super inspired sentence...</Text>`}
      />

      {/** Typo */}
      <ExampleCard title="The Typo Component"
        description='You may have seen in the "Text as a Stamp" example that the <Text /> components were following each others. 
        This is due to the <Typo /> component. A <Text /> component in a <Typo /> will wait the end of the previous one.'
        demo={
          <Typo>
            <Text >I'm the first text. </Text>
            <Text >I'm the second. </Text>
            <Text >I'm the third. </Text>
          </Typo>}
        code={`
        <Typo>
            <Text >I'm the first text. </Text>
            <Text >I'm the second. </Text>
            <Text >I'm the third. </Text>
          </Typo>
        `}
      />

      {/** Ordre d'appel */}
      <ExampleCard title="Order your Typos"
        description='The <Typo /> component has a "name" props that will identify it. 
        The "next" props will reference the next <Typo /> to be called and tell it to wait the end of the one referencing it.'
        demo={
          <>
            <div>
              <Typo name="first" next="third">
                <Text block>I'm the first typo and will call the third typo</Text>
              </Typo>
            </div>
            <div>
              <Typo name="second">
                <Text block>I'm the second Typo. Everything ends with me.</Text>
              </Typo>
            </div>
            <div>
              <Typo name="third" next="second">
                <Text block>I'm the third typo and will call the second typo</Text>
              </Typo>
            </div>
          </>
        }
        code={`
        <>
            <div>
              <Typo name="first" next="third">
                <Text block>I'm the first typo and will call the third typo</Text>
              </Typo>
            </div>
            <div>
              <Typo name="second">
                <Text block>I'm the second Typo. Everything ends with me.</Text>
              </Typo>
            </div>
            <div>
              <Typo name="third" next="second">
                <Text block>I'm the third typo and will call the second typo</Text>
              </Typo>
            </div>
          </>
        `}
      />

      {/** Boucler */}
      <ExampleCard title="Looping over Typos"
        description='If the "next" props defines which Typo will have to wait the previous one 
        and that the first Typo is referenced in a "next" props too, which Typo starts the chain?
        The "first" props is here to help!'
        demo={
          <>
            <div>
              <Typo name="first_2" next="third_2" first>
                <Text block>I'm the first typo and will call the third typo</Text>
              </Typo>
            </div>
            <div>
              <Typo name="second_2" next="first_2">
                <Text block>I'm the second Typo. Everything ends with me.</Text>
              </Typo>
            </div>
            <div>
              <Typo name="third_2" next="second_2">
                <Text block>I'm the third typo and will call the second typo</Text>
              </Typo>
            </div>
          </>
        }
        code={`
        <>
            <div>
              <Typo name="first_2" next="third_2" first>
                <Text block>I'm the first typo and will call the third typo</Text>
              </Typo>
            </div>
            <div>
              <Typo name="second_2" next="first_2">
                <Text block>I'm the second Typo. Everything ends with me.</Text>
              </Typo>
            </div>
            <div>
              <Typo name="third_2" next="second_2">
                <Text block>I'm the third typo and will call the second typo</Text>
              </Typo>
            </div>
          </>
        `}
      />

      {/** Styling */}
      <ExampleCard title="Styling"
        description={`Every printed char can be styled through the "charClassName" props of a Text component`}
        demo={<Text pace={100} charClassName="bounce-in-top">So much style! I love it.</Text>}
        code={`<Text rewind>ok bye! What's going on????</Text>`}
      />

    </main>
  )
}

export default App
