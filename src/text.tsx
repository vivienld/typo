import React, { Component } from 'react'
import { StyledComponent } from 'styled-components';
import StyledComponents from './animation';

const defaultPace = 40;
const defaultDelay = 0;

interface Props {
    pace?: number;
    delay?: number;
    stamp?: boolean;
    rewind?: boolean;
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

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => this.run(), this.props.delay || defaultDelay);
        this.iteration = !this.props.rewind ? 0 : (this.props.children as string || '').length - 1;
        this.onStart();
    }

    run() {
        this.interval = setInterval((() => this.play()), this.props.pace || defaultPace)
    }

    play() {
        const Element = this.props.animation?.(this.props.pace || defaultPace) || StyledComponents.base();
        if (!this.props.stamp) {
            const chars = (this.props.children as string || '').substr(0, this.iteration + 1).split('');
            this.setState({
                display: chars.map((char, i) => {
                    if (i == chars.length - 1) {
                        return <Element key={i}>{char}</Element>;
                    } else {
                        return <span key={i}>{char}</span>
                    }
                })
            }, () => {
                this.iteration += this.props.rewind ? -1 : 1;
                if (
                    (this.props.rewind && this.iteration < -1) ||
                    (!this.props.rewind && this.iteration > (this.props.children as string || '').length)
                ) {
                    this.stop();
                } else {
                    this.onPlay();
                }
            })
        } else {
            this.setState({
                display: <Element>{(this.props.children as string || '')}</Element>
            }, () => {
                this.iteration = this.props.rewind ? 0 : (this.props.children as string).length - 1;
                this.onPlay();
            })
        }
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
    }
    render() {
        return <React.Fragment>{this.state?.display}</React.Fragment>
    }
}
