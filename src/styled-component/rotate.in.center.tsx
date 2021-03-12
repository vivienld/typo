import Style, { StyledComponent } from 'styled-components';

export default function rotateInCenter(duration: number): StyledComponent<"span", any, {}, never> {
    return Style.span`
    display:inline-block;
    @keyframes rotate-in-center{
        0%{
            -webkit-transform:rotate(-360deg);
            transform:rotate(-360deg);
            opacity:0;
        }
            100%{
                -webkit-transform:rotate(0);
                transform:rotate(0);
                opacity:1
            }
        }
    }
    animation: rotate-in-center ${duration / 1000}s cubic-bezier(.25,.46,.45,.94) both;
    `
}