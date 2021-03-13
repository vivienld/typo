import React, { Component } from 'react'
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
    iteration: number;

    constructor(props: Props) {
        super(props);
        this.iteration = !this.props.rewind ? 0 : (this.props.children as string || '').length - 1;

        this.texts = React.Children.map(this.props.children as JSX.Element, child => {
            return <Text {...child.props} parent={this}>{child.props.children}</Text>
        })

    }

    componentDidMount() {
        this.onStart();
        this.run();
    }

    run() {
        this.play();
    }

    play() {
        this.setState({
            display: this.texts.slice(0, this.iteration + 1)
        }, () => {
            this.iteration += this.props.rewind ? -1 : 1;
            if (
                (this.props.rewind && this.iteration < -1) ||
                (!this.props.rewind && this.iteration > this.texts.length)
            ) {
                this.stop();
            } else {
                this.onPlay();
            }
        })
    }

    stop() {
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
