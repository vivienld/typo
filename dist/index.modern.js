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
    this.iteration = !this.props.rewind ? 0 : this.str.length - 1;
  }

  componentDidMount() {
    if (!this.props.parent) {
      this.run();
    }
  }

  run() {
    var _this$props$parent, _this$props$parent2;

    const pause = ((_this$props$parent = this.props.parent) === null || _this$props$parent === void 0 ? void 0 : _this$props$parent.props.pause) || this.props.pause || defaultPause;
    const pace = ((_this$props$parent2 = this.props.parent) === null || _this$props$parent2 === void 0 ? void 0 : _this$props$parent2.props.pace) || this.props.pace || defaultPace;

    if (!this.initiated) {
      this.onStart();
      this.initiated = true;
      this.interval = setTimeout(() => {
        this.play();
        this.run();
      }, pause);
    } else {
      this.interval = setInterval(() => this.play(), pace);
    }
  }

  play() {
    var _this$props$parent3, _this$props$parent4;

    const stamp = ((_this$props$parent3 = this.props.parent) === null || _this$props$parent3 === void 0 ? void 0 : _this$props$parent3.props.stamp) || this.props.stamp;
    const rewind = ((_this$props$parent4 = this.props.parent) === null || _this$props$parent4 === void 0 ? void 0 : _this$props$parent4.props.rewind) || this.props.rewind;

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
        } else {
          this.onChar();
        }
      });
    } else {
      this.setState({
        display: React.createElement("span", {
          style: spanStyle,
          className: this.props.charClassName
        }, this.str)
      }, () => {
        this.iteration = rewind ? 0 : this.props.children.length - 1;
        this.onChar();
        this.stop();
      });
    }
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
    clearInterval(this.interval);
    this.onStop();
  }

  onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  }

  onChar() {
    var _this$props$parent5, _this$props$onChar, _this$props2, _this$props$parent6, _this$props$parent6$p, _this$props$parent6$p2;

    const rewind = ((_this$props$parent5 = this.props.parent) === null || _this$props$parent5 === void 0 ? void 0 : _this$props$parent5.props.rewind) || this.props.rewind;
    const char = rewind ? this.str[this.iteration + 1] : this.str[this.iteration - 1];
    (_this$props$onChar = (_this$props2 = this.props).onChar) === null || _this$props$onChar === void 0 ? void 0 : _this$props$onChar.call(_this$props2, char, this);
    (_this$props$parent6 = this.props.parent) === null || _this$props$parent6 === void 0 ? void 0 : (_this$props$parent6$p = (_this$props$parent6$p2 = _this$props$parent6.props).onChar) === null || _this$props$parent6$p === void 0 ? void 0 : _this$props$parent6$p.call(_this$props$parent6$p2, char, this.props.parent);
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
    }, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
  }

}

class Typo extends Component {
  constructor(props) {
    super(props);
    this.textRefs = [];
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;
    this.texts = React.Children.map(this.props.children, child => {
      let ref = React.createRef();
      this.textRefs.push(ref);
      console.log(child);
      return React.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: this,
        rewind: this.props.rewind
      }), child.props.children || '');
    });
  }

  componentDidMount() {
    this.onStart();
    this.run();
  }

  run() {
    this.play();
  }

  play() {
    if (this.props.rewind && this.iteration < 0 || !this.props.rewind && this.iteration > this.texts.length - 1) {
      this.stop();
    } else {
      var _this$textRefs$this$i;

      if (this.props.rewind) {
        for (let i = this.iteration; i >= 0; i--) {
          var _this$textRefs$i$curr;

          (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
        }
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration].current) === null || _this$textRefs$this$i === void 0 ? void 0 : _this$textRefs$this$i.run();
      this.iteration += this.props.rewind ? -1 : 1;
      this.onText();
    }
  }

  stop() {
    this.onStop();
  }

  onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  }

  onText() {
    var _this$props$onText, _this$props2;

    const text = this.props.rewind ? this.textRefs[this.iteration + 1] : this.textRefs[this.iteration - 1];
    (_this$props$onText = (_this$props2 = this.props).onText) === null || _this$props$onText === void 0 ? void 0 : _this$props$onText.call(_this$props2, text, this);
  }

  onStop() {
    var _this$props$onStop, _this$props3;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);
  }

  render() {
    return React.createElement(React.Fragment, null, this.texts);
  }

}

export { Text, Typo };
//# sourceMappingURL=index.modern.js.map
