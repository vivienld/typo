import React, { Component } from 'react';
import Text from './text';
interface Props {
    /** Prevents the typo from playing */
    stop?: boolean;
    /** Defines this typo as being the first to execute when this typo's name is in the 'next' prop of another typo */
    first?: boolean;
    /** Prints the chars in the Texts backwards */
    rewind?: boolean;
    /** Displays all the chars in the Texts at once */
    stamp?: boolean;
    /** The pause before starting the text in milliseconds. Default is 0 */
    pause?: number;
    /** The pace between two chars in milliseconds. Default is 40 */
    pace?: number;
    /** The pace of white spaces to make the text more dynamic */
    whiteSpacePace?: number;
    /** The name of the next Typo to render */
    next?: string;
    /** the name of the typo */
    name?: string;
    /** the className of the typo container */
    className?: string;
    /**
     * Called when the component is mounted
     * @param typo The current Typo component
     * */
    onStart?: (typo: Typo) => void;
    /**
    * Called when the current Text component is mounted
    * @param text The current Text component
    * @param typo The current Typo component
    * */
    onText?: (text: Text, typo: Typo) => void;
    /**
     * Called when the last char in the last Text is printed
     * @param typo The current Typo component
     * */
    onStop?: (typo: Typo) => void;
    /**
     * Called when a char is printed
     * @param char The current printed char
     * @param typo The current Typo component
     * */
    onChar?: (char: string, typo: Typo) => void;
}
interface State {
    display: JSX.Element[] | JSX.Element;
}
export default class Typo extends Component<Props, State> {
    private static typos;
    private static first;
    static play(typoName: string): void;
    static stop(typoName: string): void;
    private initiated;
    name: string;
    texts: JSX.Element[];
    textRefs: React.RefObject<Text>[];
    iteration: number;
    constructor(props: Props);
    componentDidMount(): void;
    init(): void;
    play(): void;
    replay(): void;
    stop(): void;
    onStart(): void;
    onText(): void;
    onStop(): void;
    render(): JSX.Element;
}
export {};
