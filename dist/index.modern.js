import React, { Component } from 'react';

const defaultPace = 40;
const defaultPause = 0;
const spanStyle = {
  display: 'inline-block'
};
class Text extends Component {
  constructor(props) {
    super(props);
    this.str = (this.props.children || '').replaceAll(' ', '\xa0');
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
    var _this$props$parent;

    const pause = this.props.pause || ((_this$props$parent = this.props.parent) === null || _this$props$parent === void 0 ? void 0 : _this$props$parent.props.pause) || defaultPause;
    setTimeout(() => {
      this.updateInterval();
    }, pause);
  }

  updateInterval() {
    var _this$props$parent2, _this$props$parent3;

    clearInterval(this.timeout);
    let pace = this.str[this.iteration] != '\xa0' ? this.props.pace || ((_this$props$parent2 = this.props.parent) === null || _this$props$parent2 === void 0 ? void 0 : _this$props$parent2.props.pace) || defaultPace : this.props.whiteSpacePace || ((_this$props$parent3 = this.props.parent) === null || _this$props$parent3 === void 0 ? void 0 : _this$props$parent3.props.whiteSpacePace) || this.props.pace || defaultPace;
    this.onStart();
    this.timeout = setInterval(() => this.play(), pace);
  }

  play() {
    if (!this.stopped) {
      var _this$props$parent4, _this$props$parent5;

      const stamp = this.props.stamp || ((_this$props$parent4 = this.props.parent) === null || _this$props$parent4 === void 0 ? void 0 : _this$props$parent4.props.stamp);
      const rewind = this.props.rewind || ((_this$props$parent5 = this.props.parent) === null || _this$props$parent5 === void 0 ? void 0 : _this$props$parent5.props.rewind);

      if (!stamp) {
        const chars = this.str.substr(0, this.iteration + 1).split('');
        let display;

        if (rewind) {
          display = chars.map((char, i) => {
            return React.createElement("span", {
              style: spanStyle,
              key: i
            }, char);
          });
          display.pop();
          display.push(React.createElement("span", {
            style: spanStyle,
            className: this.props.charClassName,
            key: Date.now()
          }, chars.slice(-1)));
        } else {
          display = chars.map((char, i) => {
            return React.createElement("span", {
              style: spanStyle,
              className: this.props.charClassName,
              key: i
            }, char);
          });
        }

        this.setState({
          display
        }, () => {
          this.iteration += rewind ? -1 : 1;

          if (rewind && this.iteration < -1 || !rewind && this.iteration > this.str.length) {
            this.stop();
            console.log('stop' + this.str);
          } else {
            this.onChar();
          }
        });
      } else {
        this.setState({
          display: React.createElement("span", {
            style: spanStyle,
            className: this.props.charClassName,
            key: Date.now()
          }, this.str)
        }, () => {
          this.iteration = rewind ? 0 : this.props.children.length - 1;
          this.onChar();
          this.stop();
        });
      }
    }
  }

  replay() {
    this.init();
    this.run();
  }

  show() {
    this.setState({
      display: this.str.split('').map((char, i) => React.createElement("span", {
        style: spanStyle,
        key: i
      }, char))
    });
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
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  }

  onChar() {
    var _this$props$parent6, _this$props$onChar, _this$props2, _this$props$parent7, _this$props$parent7$p, _this$props$parent7$p2;

    const rewind = ((_this$props$parent6 = this.props.parent) === null || _this$props$parent6 === void 0 ? void 0 : _this$props$parent6.props.rewind) || this.props.rewind;
    const char = rewind ? this.str[this.iteration + 1] : this.str[this.iteration - 1];
    (_this$props$onChar = (_this$props2 = this.props).onChar) === null || _this$props$onChar === void 0 ? void 0 : _this$props$onChar.call(_this$props2, char, this);
    (_this$props$parent7 = this.props.parent) === null || _this$props$parent7 === void 0 ? void 0 : (_this$props$parent7$p = (_this$props$parent7$p2 = _this$props$parent7.props).onChar) === null || _this$props$parent7$p === void 0 ? void 0 : _this$props$parent7$p.call(_this$props$parent7$p2, char, this.props.parent);
  }

  onStop() {
    var _this$props$onStop, _this$props3, _this$props4, _this$props4$parent;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);
    (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$parent = _this$props4.parent) === null || _this$props4$parent === void 0 ? void 0 : _this$props4$parent.play();
  }

  render() {
    var _this$state;

    return React.createElement("div", {
      className: this.props.className,
      style: {
        display: this.props.block ? 'block' : 'inline-block'
      }
    }, ((_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display) || '\u00a0');
  }

}

class Typo extends Component {
  constructor(props) {
    super(props);
    this.textRefs = [];
    this.init();
  }

  static play(typoName) {
    var _Typo$typos$get;

    (_Typo$typos$get = Typo.typos.get(typoName)) === null || _Typo$typos$get === void 0 ? void 0 : _Typo$typos$get.replay();
  }

  static stop(typoName) {
    var _Typo$typos$get2;

    (_Typo$typos$get2 = Typo.typos.get(typoName)) === null || _Typo$typos$get2 === void 0 ? void 0 : _Typo$typos$get2.stop();
  }

  componentDidMount() {
    if (!this.props.stop) {
      if (!Array.from(Typo.typos.values()).some(typo => typo.props.next == this.name) || Typo.first == this) {
        this.init();
        this.play();
      }
    }
  }

  init() {
    this.initiated = false;
    this.textRefs.forEach(text => {
      var _text$current;

      return (_text$current = text.current) === null || _text$current === void 0 ? void 0 : _text$current.init();
    });
    this.texts = React.Children.map(this.props.children, child => {
      let ref = React.createRef();
      this.textRefs.push(ref);
      return React.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: this,
        rewind: this.props.rewind || child.props.rewind
      }), child.props.children || '');
    });
    this.iteration = !this.props.rewind ? 0 : this.texts.length == 1 ? 0 : this.texts.length - 1;
    this.name = this.props.name || '_' + Math.random().toString(36).substr(2, 9);
    Typo.typos.set(this.name, this);

    if (typeof Typo.first == 'undefined') {
      Typo.first = this;
    }
  }

  play() {
    if (!this.initiated) {
      this.onStart();
      this.initiated = true;
    }

    if (this.props.rewind && this.iteration < 0 || !this.props.rewind && this.iteration > this.texts.length - 1) {
      this.stop();
    } else {
      var _this$textRefs$this$i, _this$textRefs$this$i2;

      if (this.props.rewind) {
        for (let i = this.iteration; i >= 0; i--) {
          var _this$textRefs$i$curr;

          (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
        }
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration]) === null || _this$textRefs$this$i === void 0 ? void 0 : (_this$textRefs$this$i2 = _this$textRefs$this$i.current) === null || _this$textRefs$this$i2 === void 0 ? void 0 : _this$textRefs$this$i2.run();
      this.iteration += this.props.rewind ? -1 : 1;
      this.onText();
    }
  }

  replay() {
    this.init();
    this.play();
  }

  stop() {
    this.onStop();
  }

  onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  }

  onText() {
    var _this$textRefs, _this$textRefs2;

    const text = this.props.rewind ? (_this$textRefs = this.textRefs[this.iteration + 1]) === null || _this$textRefs === void 0 ? void 0 : _this$textRefs.current : (_this$textRefs2 = this.textRefs[this.iteration - 1]) === null || _this$textRefs2 === void 0 ? void 0 : _this$textRefs2.current;

    if (text) {
      var _this$props$onText, _this$props2;

      (_this$props$onText = (_this$props2 = this.props).onText) === null || _this$props$onText === void 0 ? void 0 : _this$props$onText.call(_this$props2, text, this);
    }
  }

  onStop() {
    var _this$props$onStop, _this$props3;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);

    if (this.props.next) {
      var _Typo$typos$get3, _Typo$typos$get4;

      (_Typo$typos$get3 = Typo.typos.get(this.props.next)) === null || _Typo$typos$get3 === void 0 ? void 0 : _Typo$typos$get3.textRefs.forEach(ref => {
        var _ref$current;

        return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.init();
      });
      (_Typo$typos$get4 = Typo.typos.get(this.props.next)) === null || _Typo$typos$get4 === void 0 ? void 0 : _Typo$typos$get4.play();
    }
  }

  render() {
    return React.createElement("div", {
      className: this.props.className,
      style: {
        display: 'inline-block'
      }
    }, this.texts);
  }

}
Typo.typos = new Map();

export { Text, Typo };
//# sourceMappingURL=index.modern.js.map
