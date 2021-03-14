import React, { Component } from 'react'
import Typo from './typo';

const defaultPace = 40;
const defaultDelay = 0;

const spanStyle = {
    display: 'inline-block'
}

interface Props {
    pace?: number;
    delay?: number;
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
    }

    componentDidMount() {
        this.iteration = !this.props.rewind ? 0 : (this.props.children as string || '').length - 1;

        if (!this.props.parent) {
            this.run();
        }
    }


    run() {

        if (!this.initiated) {
            this.onStart();
            this.initiated = true;
            setTimeout(() => { this.play(); this.run(); }, this.props.delay || defaultDelay);
        } else {
            this.interval = setInterval((() => this.play()), this.props.pace || defaultPace)
        }
    }

    play() {

        if (!this.props.stamp) {
            const chars = this.str.substr(0, this.iteration + 1).split('');
            this.setState({
                display: chars.map((char, i) => {
                    if (i == chars.length - 1) {
                        return <span style={spanStyle} className={this.props.charClassName} key={i}>{char}</span>
                    } else {
                        return <span style={spanStyle} key={i}>{char}</span>
                    }
                })
            }, () => {
                this.iteration += this.props.rewind ? -1 : 1;
                if (
                    (this.props.rewind && this.iteration < -1) ||
                    (!this.props.rewind && this.iteration > this.str.length)
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
                this.iteration = this.props.rewind ? 0 : (this.props.children as string).length - 1;
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
