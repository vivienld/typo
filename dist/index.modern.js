import React, { Component } from 'react';

const defaultPace = 40;
const defaultDelay = 0;
const spanStyle = {
  display: 'inline-block'
};
class Text extends Component {
  constructor(props) {
    super(props);
    this.str = (this.props.children || '').replaceAll(' ', '\xa0');
  }

  componentDidMount() {
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;

    if (!this.props.parent) {
      this.run();
    }
  }

  run() {
    if (!this.initiated) {
      this.onStart();
      this.initiated = true;
      setTimeout(() => {
        this.play();
        this.run();
      }, this.props.delay || defaultDelay);
    } else {
      this.interval = setInterval(() => this.play(), this.props.pace || defaultPace);
    }
  }

  play() {
    if (!this.props.stamp) {
      const chars = this.str.substr(0, this.iteration + 1).split('');
      this.setState({
        display: chars.map((char, i) => {
          if (i == chars.length - 1) {
            return React.createElement("span", {
              style: spanStyle,
              className: this.props.charClassName,
              key: i
            }, char);
          } else {
            return React.createElement("span", {
              style: spanStyle,
              key: i
            }, char);
          }
        })
      }, () => {
        this.iteration += this.props.rewind ? -1 : 1;

        if (this.props.rewind && this.iteration < -1 || !this.props.rewind && this.iteration > this.str.length) {
          this.stop();
        } else {
          this.onPlay();
        }
      });
    } else {
      this.setState({
        display: React.createElement("span", {
          style: spanStyle,
          className: this.props.charClassName
        }, this.str)
      }, () => {
        this.iteration = this.props.rewind ? 0 : this.props.children.length - 1;
        this.onPlay();
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

  onPlay() {
    var _this$props$onPlay, _this$props2;

    (_this$props$onPlay = (_this$props2 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props2, this);
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
      return React.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: this,
        rewind: this.props.rewind
      }), child.props.children);
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
      this.onPlay();
    }
  }

  stop() {
    this.onStop();
  }

  onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  }

  onPlay() {
    var _this$props$onPlay, _this$props2;

    (_this$props$onPlay = (_this$props2 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props2, this);
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
