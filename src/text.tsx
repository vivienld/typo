import React, { Component } from 'react'
import Typo from './typo';

const defaultPace = 40;
const defaultPause = 0;

const spanStyle = {
    display: 'inline-block'
}

interface Props {
    /** The pace between two chars in milliseconds. Default is 40 */
    pace?: number;
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

    private initiated: boolean;
    str: string;
    interval: NodeJS.Timeout;
    iteration: number;

    constructor(props: Props) {
        super(props);
        this.str = (this.props.children as string || '').replaceAll(' ', '\xa0');
        this.iteration = !this.props.rewind ? 0 : this.str.length - 1;
    }

    componentDidMount() {
        if (!this.props.parent) {
            this.run();
        }
    }


    run() {
        const pause = this.props.parent?.props.pause || this.props.pause || defaultPause;
        const pace = this.props.parent?.props.pace || this.props.pace || defaultPace;

        if (!this.initiated) {
            this.onStart();
            this.initiated = true;
            this.interval = setTimeout(() => { this.play(); this.run(); }, pause);
        } else {
            this.interval = setInterval((() => this.play()), pace)
        }
    }

    play() {
        const stamp = this.props.parent?.props.stamp || this.props.stamp;
        const rewind = this.props.parent?.props.rewind || this.props.rewind;

        if (!stamp) {
            const chars = this.str.substr(0, this.iteration + 1).split('');
            let display;

            if (rewind) {
                display = chars.map((char, i) => {
                    return <span style={spanStyle} key={i}>{char}</span>
                });
                display.pop();
                display.push(<span style={spanStyle} className={this.props.charClassName} key={Date.now()}>{chars.slice(-1)}</span>)
            } else {
                display = chars.map((char, i) => {
                    return <span style={spanStyle} className={this.props.charClassName} key={i}>{char}</span>
                });
            }
            this.setState({ display }, () => {

                this.iteration += rewind ? -1 : 1;
                if (
                    (rewind && this.iteration < -1) ||
                    (!rewind && this.iteration > this.str.length)
                ) {
                    this.stop();
                } else {
                    this.onChar();
                }
            })
        } else {
            this.setState({
                display: <span style={spanStyle} className={this.props.charClassName}>{this.str}</span>
            }, () => {
                this.iteration = rewind ? 0 : (this.props.children as string).length - 1;
                this.onChar();
                this.stop();
            })
        }
    }

    show() {
        this.setState({
            display: this.str.split('').map((char, i) => <span style={spanStyle} key={i}>{char}</span>)
        })
    }

    stop() {
        clearInterval(this.interval);
            this.onStop();
    }

    onStart() {
        this.props.onStart?.(this);
    }

    onChar() {
        const rewind = this.props.parent?.props.rewind || this.props.rewind;
        const char = rewind
            ? this.str[this.iteration + 1]
            : this.str[this.iteration - 1];

        this.props.onChar?.(char, this);

        this.props.parent?.props.onChar?.(char, this.props.parent);
    }

    onStop() {
        this.props.onStop?.(this);
        this.props?.parent?.play();
    }

    render() {
        return <div className={this.props.className} style={{
            display: this.props.block ? 'block' : 'inline-block'
        }}>{this.state?.display}</div>
    }
}
