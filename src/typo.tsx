import React, { Component } from 'react'
import Text from './text';

interface Props {
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

    static typos: Map<string, Typo> = new Map();
    static first: Typo;

    private initiated: boolean;
    name: string;
    texts: JSX.Element[];
    textRefs: React.RefObject<Text>[] = [];
    iteration: number;

    constructor(props: Props) {
        super(props);
        this.init();
    }

    componentDidMount() {
        //si le typo est dans le next d'un autre, on ne lance pas play sauf s'il est first
        if (!Array.from(Typo.typos.values()).some(typo => typo.props.next == this.name) || Typo.first == this) {
            this.play();
        }
    }

    init() {
        this.initiated = false;

        
        this.texts = React.Children.map(this.props.children as JSX.Element, child => {
            let ref = React.createRef<Text>();
            this.textRefs.push(ref);

            return <Text {...child.props} ref={ref} parent={this} rewind={this.props.rewind}>{child.props.children || ''}</Text>
        })
        
        this.iteration = !this.props.rewind ? 0 : this.texts.length == 1 ? 0 : this.texts.length - 1;

        this.name = this.props.name || '_' + Math.random().toString(36).substr(2, 9);

        Typo.typos.set(this.name, this);

        if (typeof Typo.first == 'undefined') {
            Typo.first = this;
        }
    }

    play() {
        if (!this.initiated) {
            this.initiated = true;
            this.onStart();
        }

        if (
            (this.props.rewind && this.iteration < 0) || (!this.props.rewind && this.iteration > this.texts.length - 1)) {
            this.stop();
        } else {
            if (this.props.rewind) {
                for (let i = this.iteration; i >= 0; i--) {
                    this.textRefs[i].current?.show();
                }
            }
                
            this.textRefs[this.iteration]?.current?.play();
            
            this.iteration += this.props.rewind ? -1 : 1;
            this.onText();
        }
    }

    stop() {
        this.onStop();
    }

    onStart() {
        this.props.onStart?.(this);
    }

    onText() {
        const text = this.props.rewind
            ? this.textRefs[this.iteration + 1]?.current
            : this.textRefs[this.iteration - 1]?.current;

        if (text) {
            this.props.onText?.(text, this);
        }
    }

    //on lance le event handler onStop et on lance le play du prochain Typo
    onStop() {
        this.props.onStop?.(this);
        if (this.props.next) {
            Typo.typos.get(this.props.next)?.textRefs.forEach(ref => ref.current?.init());
            Typo.typos.get(this.props.next)?.init();
            Typo.typos.get(this.props.next)?.play();
        }
    }

    render() {
        return <div style={{ display: 'inline-block' }}>{this.texts}</div>
    }
}
