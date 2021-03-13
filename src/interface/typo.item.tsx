export default interface TypoItem {
    /** Renders the animated component */
    play(): void;
    /** Renders the non animated component */
    load(): void;
    /** Renders a null component */
    unload(): void;
    /** Makes component visibility hidden */
    hide(): void;
    /** play() event handler */
    onPlay(): void;
    /** play() event handler */
    onLoad(): void;
    /** unload() event handler */
    onUnload(): void;
    /** hide() event handler */
    onHide(): void;
}