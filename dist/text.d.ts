/// <reference types="node" />
import { Component } from 'react';
import { StyledComponent } from 'styled-components';
import Typo from './typo';
interface Props {
    pace?: number;
    delay?: number;
    stamp?: boolean;
    rewind?: boolean;
    parent?: Typo;
    animation?: (duration: number) => StyledComponent<"span", any, {}, never>;
    onStart?: (text: Text) => void;
    onPlay?: (text: Text) => void;
    onStop?: (text: Text) => void;
}
interface State {
    display: JSX.Element[] | JSX.Element;
}
export default class Text extends Component<Props, State> {
    interval: NodeJS.Timeout;
    iteration: number;
    constructor(props: Props);
    componentDidMount(): void;
    run(): void;
    play(): void;
    show(): void;
    stop(): void;
    onStart(): void;
    onPlay(): void;
    onStop(): void;
    render(): JSX.Element;
}
export {};
