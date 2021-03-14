/// <reference types="node" />
import { Component } from 'react';
import Typo from './typo';
interface Props {
    pace?: number;
    pause?: number;
    block?: boolean;
    stamp?: boolean;
    rewind?: boolean;
    parent?: Typo;
    charClassName?: string;
    className?: string;
    onStart?: (text: Text) => void;
    onPlay?: (text: Text) => void;
    onStop?: (text: Text) => void;
}
interface State {
    display: JSX.Element[] | JSX.Element;
}
export default class Text extends Component<Props, State> {
    private initiated;
    str: string;
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
