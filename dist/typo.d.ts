import React, { Component } from 'react';
import Text from './text';
interface Props {
    rewind?: boolean;
    onStart?: (typo: Typo) => void;
    onPlay?: (typo: Typo) => void;
    onStop?: (typo: Typo) => void;
}
interface State {
    display: JSX.Element[] | JSX.Element;
}
export default class Typo extends Component<Props, State> {
    texts: JSX.Element[];
    textRefs: React.RefObject<Text>[];
    iteration: number;
    constructor(props: Props);
    componentDidMount(): void;
    run(): void;
    play(): void;
    stop(): void;
    onStart(): void;
    onPlay(): void;
    onStop(): void;
    render(): JSX.Element;
}
export {};
