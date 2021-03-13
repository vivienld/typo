import { Component } from 'react';
import { StyledComponent } from 'styled-components';
interface Props {
    value: string;
    hide: boolean;
    fixed: boolean;
    unload: boolean;
    duration: number;
    component: (duration: number) => StyledComponent<"span", any, {}, never>;
    onPlay?: (typo: Typo) => void;
    onLoad?: (typo: Typo) => void;
    onUnload?: (typo: Typo) => void;
    onHide?: (typo: Typo) => void;
}
interface State {
    display: JSX.Element | null;
    visibility: 'hidden' | 'visible';
}
export default class Typo extends Component<Props, State> {
    baseComponent: StyledComponent<"span", any, {}, never>;
    state: State;
    static defaultProps: {
        duration: number;
        hide: boolean;
        unload: boolean;
        fixed: boolean;
    };
    constructor(props: Props);
    /**
     * On décharge le composant si unload, sinon on le charge, s'il est caché pas besoin de l'animer
     */
    componentDidMount(): void;
    render: () => JSX.Element;
    play(): void;
    load(): void;
    unload(): void;
    hide(): void;
    onPlay(): void;
    onLoad(): void;
    onUnload(): void;
    onHide(): void;
}
export {};
