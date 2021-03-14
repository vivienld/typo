/// <reference types="node" />
import { Component } from 'react';
import Typo from './typo';
interface Props {
    /** The pace between two chars in milliseconds. Default is 40 */
    pace?: number;
    /** The pace of white spaces to make the text more dynamic */
    whiteSpacePace?: number;
    /** The pause before starting the text in milliseconds. Default is 0 */
    pause?: number;
    /** Defines if the container css display rule is 'block'. Default is 'inline-block' */
    block?: boolean;
    /** Displays all the chars at once */
    stamp?: boolean;
    /** Prints the chars in the Text backwards */
    rewind?: boolean;
    /** The Typo controller. Is automatically defined when a Text is in a Typo */
    parent?: Typo;
    /** The className of the current printed char */
    charClassName?: string;
    /** The className of the Text container */
    className?: string;
    /**
     * Called when the component is mounted
     * @param text The current Text component
     * */
    onStart?: (text: Text) => void;
    /**
     * Called when a char is printed
     * @param char The current printed char
     * @param text The current Text component
     * */
    onChar?: (char: string, text: Text) => void;
    /**
     * Called when the last char is printed
     * @param text The current Text component
     * */
    onStop?: (text: Text) => void;
}
interface State {
    display: JSX.Element[] | JSX.Element;
}
export default class Text extends Component<Props, State> {
    private initiated;
    private stopped;
    str: string;
    interval: NodeJS.Timeout;
    iteration: number;
    constructor(props: Props);
    componentDidMount(): void;
    reset(): void;
    play(): void;
    show(): void;
    stop(): void;
    onStart(): void;
    onChar(): void;
    onStop(): void;
    render(): JSX.Element;
}
export {};
