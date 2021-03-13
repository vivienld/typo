import React, { Component } from 'react';
import Style from 'styled-components';

let _ = t => t,
    _t;
function base() {
  return Style.span(_t || (_t = _`display:inline-block;`));
}

let _$1 = t => t,
    _t$1;
function rotateInCenter(duration) {
  return Style.span(_t$1 || (_t$1 = _$1`
    display:inline-block;
    @keyframes rotate-in-center{
        0%{
            -webkit-transform:rotate(-360deg);
            transform:rotate(-360deg);
            opacity:0;
        }
            100%{
                -webkit-transform:rotate(0);
                transform:rotate(0);
                opacity:1
            }
        }
    }
    animation: rotate-in-center ${0}s cubic-bezier(.25,.46,.45,.94) both;
    `), duration / 1000);
}

class Animation {}
Animation.base = base;
Animation.rotateInCenter = rotateInCenter;

const defaultPace = 40;
const defaultDelay = 0;
class Text extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.parent) {
      setTimeout(() => this.run(), this.props.delay || defaultDelay);
    }
  }

  run() {
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;
    this.onStart();
    this.interval = setInterval(() => this.play(), this.props.pace || defaultPace);
  }

  play() {
    var _this$props$animation, _this$props;

    const Element = ((_this$props$animation = (_this$props = this.props).animation) === null || _this$props$animation === void 0 ? void 0 : _this$props$animation.call(_this$props, this.props.pace || defaultPace)) || Animation.base();

    if (!this.props.stamp) {
      const chars = (this.props.children || '').substr(0, this.iteration + 1).replaceAll(' ', '\xa0').split('');
      this.setState({
        display: chars.map((char, i) => {
          if (i == chars.length - 1) {
            return React.createElement(Element, {
              key: i
            }, char);
          } else {
            return React.createElement("span", {
              key: i
            }, char);
          }
        })
      }, () => {
        this.iteration += this.props.rewind ? -1 : 1;

        if (this.props.rewind && this.iteration < -1 || !this.props.rewind && this.iteration > (this.props.children || '').length) {
          this.stop();
        } else {
          this.onPlay();
        }
      });
    } else {
      this.setState({
        display: React.createElement(Element, null, (this.props.children || '').replaceAll(' ', '\xa0'))
      }, () => {
        this.iteration = this.props.rewind ? 0 : this.props.children.length - 1;
        this.onPlay();
        this.stop();
      });
    }
  }

  show() {
    this.setState({
      display: React.createElement("span", null, this.props.children)
    });
  }

  stop() {
    clearInterval(this.interval);
    this.onStop();
  }

  onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this);
  }

  onPlay() {
    var _this$props$onPlay, _this$props3;

    (_this$props$onPlay = (_this$props3 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props3, this);
  }

  onStop() {
    var _this$props$onStop, _this$props4, _this$props5, _this$props5$parent;

    (_this$props$onStop = (_this$props4 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props4, this);
    (_this$props5 = this.props) === null || _this$props5 === void 0 ? void 0 : (_this$props5$parent = _this$props5.parent) === null || _this$props5$parent === void 0 ? void 0 : _this$props5$parent.play();
  }

  render() {
    var _this$state;

    return React.createElement(React.Fragment, null, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
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
    if (this.props.rewind) {
      var _this$textRefs$this$i, _this$textRefs$this$i2;

      for (let i = 0; i <= this.iteration; i++) {
        var _this$textRefs$i$curr;

        (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration]) === null || _this$textRefs$this$i === void 0 ? void 0 : (_this$textRefs$this$i2 = _this$textRefs$this$i.current) === null || _this$textRefs$this$i2 === void 0 ? void 0 : _this$textRefs$this$i2.run();
    } else {
      var _this$textRefs$this$i3, _this$textRefs$this$i4;

      (_this$textRefs$this$i3 = this.textRefs[this.iteration]) === null || _this$textRefs$this$i3 === void 0 ? void 0 : (_this$textRefs$this$i4 = _this$textRefs$this$i3.current) === null || _this$textRefs$this$i4 === void 0 ? void 0 : _this$textRefs$this$i4.run();
    }

    this.iteration += this.props.rewind ? -1 : 1;

    if (this.props.rewind && this.iteration < -1 || !this.props.rewind && this.iteration > this.texts.length) {
      this.stop();
    } else {
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

export { Animation, Text, Typo };
//# sourceMappingURL=index.modern.js.map
