import React, { Component, Fragment } from 'react';
import Style, { StyledComponent } from 'styled-components';
import StyledComponents from './styled-component';

interface Props {
    hide: boolean;
    fixed: boolean;
    unload: boolean;
    duration: number;
    component: (duration: number) => StyledComponent<"span", any, {}, never>;
    onPlay?: (char: Char) => void;
    onLoad?: (char: Char) => void;
    onUnload?: (char: Char) => void;
    onHide?: (char: Char) => void;
}

interface State {
    display: JSX.Element | null;
    visibility: 'hidden' | 'visible';
}

export default class Char extends Component<Props, State> {

    baseComponent: StyledComponent<"span", any, {}, never>;
    state: State;

    static defaultProps = {
        duration: 0,
        hide: false,
        unload: false,
        fixed: false
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            display: null,
            visibility: 'hidden'
        }

        this.baseComponent = StyledComponents.base();
    }

    /**
     * On décharge le composant si unload, sinon on le charge, s'il est caché pas besoin de l'animer
     */
    componentDidMount() {
        if (this.props.unload) {
            this.unload()
        } else {
            this.load();
            if (this.props.hide) {
                this.hide()
            } else if (!this.props.fixed) {
                this.play()
            }
        }
    }

    render = () => <Fragment>{this.state?.display}</Fragment>;

    load() {
        this.setState({
            display: <this.baseComponent>{this.props.children}</this.baseComponent>
        }, () => { this.onLoad() })
    }

    unload() {
        this.setState({
            display: null
        }, () => { this.onUnload() })
    }

    hide() {
        const Component = Style.span(StyledComponents.base());
        this.setState({
            display: <Component style={{ visibility: 'hidden' }}>{this.props.children}</Component>
        }, () => { this.onHide() })
    }

    play() {
        console.log(this.props.component);
        const Component = this.props.component(this.props.duration);
        this.setState({
            display: <Component>{this.props.children}</Component>
        }, () => {
            this.onPlay();
        })
    }

    onPlay() {
        this.props.onPlay?.(this);
    }

    onLoad() {
        this.props.onLoad?.(this);
    }

    onUnload() {
        this.props.onUnload?.(this);
    }

    onHide() {
        this.props.onHide?.(this);
    }

}
