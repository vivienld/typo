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
    /** The pace of white spaces to make the text more dynamic */
    whiteSpacePace?: number;
    /** The pause before starting the text in milliseconds. Default is 0 */
    pause?: number;
    /** Defines if the container css display rule is 'block' or 'inline-block'. Default is false */
    block?: boolean;
    /** Displays all the chars at once */
    stamp?: boolean;
    /** Prints the chars in the Text backwards */
    rewind?: boolean;
    /** Loops the animation */
    loop?: boolean;
    /** The Typo controller. Is automatically defined when a Text is in a Typo */
    parent?: Typo;
    /** The className assigned to every printed char */
    charClassName?: string;
    /** The className of the Text container */
    className?: string;
    /**
     * Called when the first char is printed
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

    private stopped: boolean;
    private timeout: NodeJS.Timeout;

    str: string;
    interval: NodeJS.Timeout;
    iteration: number;

    constructor(props: Props) {
        super(props);
        this.str = (this.props.children as string || '').replaceAll(' ', '\xa0');
    }

    componentDidMount() {
        if (!this.props.parent) {
            this.init();
            this.run();
        }
    }


    init() {
        this.iteration = !this.props.rewind ? 0 : this.str.length - 1;
        this.stopped = false;
    }
    
    run() {
        const pause = this.props.pause || this.props.parent?.props.pause || defaultPause;
        setTimeout(() => {
            this.updateInterval();
        }, pause);
    }

    updateInterval() {
        clearInterval(this.timeout);
        let pace = this.str[this.iteration] != '\xa0'
            ? this.props.pace || this.props.parent?.props.pace || defaultPace
            : (this.props.whiteSpacePace || this.props.parent?.props.whiteSpacePace || this.props.pace || defaultPace);

        this.onStart();
        this.timeout = setInterval(() => this.play(), pace);
    }

    play() {
        if (!this.stopped) {
            const stamp = this.props.stamp || this.props.parent?.props.stamp;
            const rewind = this.props.rewind || this.props.parent?.props.rewind;

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
                        console.log('stop' + this.str)
                    } else {
                        this.onChar();
                    }
                })
            } else {
                this.setState({
                    display: <span style={spanStyle} className={this.props.charClassName} key={Date.now()}>{this.str}</span>
                }, () => {
                    this.iteration = rewind ? 0 : (this.props.children as string).length - 1;
                    this.onChar();
                    this.stop();
                })
            }
        }
    }

    replay() {
        this.init();
        this.run();
    }

    show() {
        this.setState({
            display: this.str.split('').map((char, i) => <span style={spanStyle} key={i}>{char}</span>)
        })
    }

    stop() {
        if (this.props.loop) {
            this.replay();
        } else {
            this.stopped = true;
            this.onStop();
        }
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
        }}>{this.state?.display || '\u00a0'}</div>
    }
}
