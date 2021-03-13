import { Component } from 'react';
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
