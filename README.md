# Typo

Typo is a react library that makes it easy to give your text a typewriter effect.

## Installation

```bash
npm install --save typo
```

## Example

Example can be seen [here](https://vivienld.github.io/typo/)

## Basic Usage

```tsx
import React from 'react'
import { Text, Typo } from 'typo'

const App = () => {
  return (
    <Typo>
      <Text>Hello </Text>
      <Text>World!</Text>
    </Typo>
  )
}

export default App
```

## Text component

Renders every char child at a defined pace.

The  `Text` component can be used alone without a `Typo` component, but the `Typo` component makes sure every `Text` is printed one after another.

### Props

<table>
  <thead>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>description</th>
    <th>default</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>pace?</td>
      <td>number</td>
      <td>The pace between two chars in milliseconds</td>
      <td>40</td>
    </tr>
    <tr>
      <td>whiteSpacePace?</td>
      <td>number</td>
      <td>The pace of white spaces to make the text more dynamic in milliseconds</td>
      <td>40</td>
    </tr>
    <tr>
      <td>pause?</td>
      <td>number</td>
      <td>The pause before starting the text in milliseconds</td>
      <td>0</td>
    </tr>
    <tr>
      <td>block?</td>
      <td>boolean</td>
      <td>Defines the container css display rule to 'block' instead of 'inline-block'</td>
      <td>false</td>
    </tr>
    <tr>
      <td>stamp?</td>
      <td>boolean</td>
      <td>Displays all the chars at once</td>
      <td>false</td>
    </tr>
    <tr>
      <td>rewind?</td>
      <td>boolean</td>
      <td>Prints the chars in the Text backwards</td>
      <td>false</td>
    </tr>
    <tr>
      <td>charClassName?</td>
      <td>string</td>
      <td>The className assigned to every printed char</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>className?</td>
      <td>string</td>
      <td>The className of the Text container</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

### Event handlers

<table>
  <thead>
  <tr>
    <th>name</th>
    <th>params</th>
    <th>description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>onStart?</td>
      <td>
        <ul>
          <li>text:Text The current Text component
        </li>
        </ul>
      </td>
      <td>Called when the first char is printed</td>
    </tr>
    <tr>
      <td>onChar?</td>
      <td>
      <ul>
      <li>char:string The current printed char</li>
      <li>text:Text The current Text component</li>
      </ul>
      </td>
      <td>Called when a char is printed </td>
    </tr>
    <tr>
      <td>onStop?</td>
      <td>
        <ul>
          <li>text:Text The current Text component
        </li>
        </ul>
      </td>
      <td>Called when the last char is printed</td>
    </tr>
  </tbody>
</table>

## Typo Component

### Props

Those props will be used by every `Text` child that don't define them.

<table>
  <thead>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>description</th>
    <th>default</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>pace?</td>
      <td>number</td>
      <td>The pace between two chars in milliseconds</td>
      <td>40</td>
    </tr>
    <tr>
      <td>whiteSpacePace?</td>
      <td>number</td>
      <td>The pace of white spaces to make the text more dynamic in milliseconds</td>
      <td>40</td>
    </tr>
    <tr>
      <td>pause?</td>
      <td>number</td>
      <td>The pause before every text in milliseconds</td>
      <td>0</td>
    </tr>
    <tr>
      <td>stamp?</td>
      <td>boolean</td>
      <td>Displays all the chars in every Text at once</td>
      <td>false</td>
    </tr>
    <tr>
      <td>rewind?</td>
      <td>boolean</td>
      <td>Prints the chars backwards</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### Event handlers

<table>
  <thead>
  <tr>
    <th>name</th>
    <th>params</th>
    <th>description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>onStart?</td>
      <td>
        <ul>
          <li>typo:Typo The current Typo component</li>
        </li>
        </ul>
      </td>
      <td>Called when the first char is printed</td>
    </tr>
    <tr>
      <td>onChar?</td>
      <td>
      <ul>
      <li>char:string The current printed char</li>
      <li>typo:Typo The current Typo component</li>
      </ul>
      </td>
      <td>Called when a char is printed </td>
    </tr>
    <tr>
      <td>onText?</td>
      <td>
      <ul>
      <li>text:Text The current Text component</li>
      <li>typo:Typo The current Typo component</li>
      </ul>
      </td>
      <td>Called when Text prints its first char</td>
    </tr>
    <tr>
      <td>onStop?</td>
      <td>
        <ul>
          <li>typo:Typo The current Typo component</li>
        </li>
        </ul>
      </td>
      <td>Called when the last char is printed</td>
    </tr>
  </tbody>
</table>

## License

MIT © [vivienld](https://github.com/vivienld)
