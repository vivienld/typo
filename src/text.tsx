import React, { Component } from 'react'
import Typo from './typo';

const defaultPace = 40;
const defaultPause = 0;

const spanStyle = {
    display: 'inline-block'
}

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
                display.push(<span style={spanStyle} className={this.props.charClassName}>{chars.slice(-1)}</span>)
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
                    this.onPlay();
                }
            })
        } else {
            this.setState({
                display: <span style={spanStyle} className={this.props.charClassName}>{this.str}</span>
            }, () => {
                this.iteration = rewind ? 0 : (this.props.children as string).length - 1;
                this.onPlay();
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

    onPlay() {
        this.props.onPlay?.(this);
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
