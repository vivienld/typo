import Style, { StyledComponent } from 'styled-components'

export default function base(): StyledComponent<"span", any, {}, never> {
    return Style.span`display:inline-block;`
}