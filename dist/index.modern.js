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
    setTimeout(() => this.run(), this.props.delay || defaultDelay);
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;
    this.onStart();
  }

  run() {
    this.interval = setInterval(() => this.play(), this.props.pace || defaultPace);
  }

  play() {
    var _this$props$animation, _this$props;

    const Element = ((_this$props$animation = (_this$props = this.props).animation) === null || _this$props$animation === void 0 ? void 0 : _this$props$animation.call(_this$props, this.props.pace || defaultPace)) || Animation.base();

    if (!this.props.stamp) {
      const chars = (this.props.children || '').substr(0, this.iteration + 1).split('');
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
        display: React.createElement(Element, null, this.props.children || '')
      }, () => {
        this.iteration = this.props.rewind ? 0 : this.props.children.length - 1;
        this.onPlay();
      });
    }
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
    var _this$props$onStop, _this$props4;

    (_this$props$onStop = (_this$props4 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props4, this);
  }

  render() {
    var _this$state;

    return React.createElement(React.Fragment, null, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
  }

}

export { Animation, Text };
//# sourceMappingURL=index.modern.js.map
