import React, { Component } from 'react'
import Text from './text';

interface Props {
    rewind?: boolean;
    stamp?: boolean;
    pause?: number;
    pace?: number;
    onStart?: (typo: Typo) => void;
    onPlay?: (typo: Typo) => void;
    onStop?: (typo: Typo) => void;
    onChar?: (char: string, typo: Typo) => void;
}

interface State {
    display: JSX.Element[] | JSX.Element;
}

export default class Typo extends Component<Props, State> {

    texts: JSX.Element[];
    textRefs: React.RefObject<Text>[] = [];
    iteration: number;

    constructor(props: Props) {
        super(props);
        this.iteration = !this.props.rewind ? 0 : (this.props.children as string || '').length - 1;

        this.texts = React.Children.map(this.props.children as JSX.Element, child => {
            let ref = React.createRef<Text>();
            this.textRefs.push(ref);
            console.log(child)
            return <Text {...child.props} ref={ref} parent={this} rewind={this.props.rewind}>{child.props.children || ''}</Text>
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
        if (
            (this.props.rewind && this.iteration < 0) || (!this.props.rewind && this.iteration > this.texts.length - 1)) {
            this.stop();
        } else {
            if (this.props.rewind) {
                for (let i = this.iteration; i >= 0; i--) {
                    this.textRefs[i].current?.show();
                }
            }
            
            this.textRefs[this.iteration].current?.run();
            
            this.iteration += this.props.rewind ? -1 : 1;
            this.onPlay();
        }
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
        return <React.Fragment>{this.texts}</React.Fragment>
    }
}
