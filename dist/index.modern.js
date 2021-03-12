import React, { Component, Fragment } from 'react';
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

class StyledComponents {}
StyledComponents.base = base;
StyledComponents.rotateInCenter = rotateInCenter;

class Char extends Component {
  constructor(props) {
    super(props);

    this.render = () => {
      var _this$state;

      return React.createElement(Fragment, null, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
    };

    this.state = {
      display: null,
      visibility: 'hidden'
    };
    this.baseComponent = StyledComponents.base();
  }

  componentDidMount() {
    if (this.props.unload) {
      this.unload();
    } else {
      this.load();

      if (this.props.hide) {
        this.hide();
      } else if (!this.props.fixed) {
        this.play();
      }
    }
  }

  load() {
    this.setState({
      display: React.createElement(this.baseComponent, null, this.props.children)
    }, () => {
      this.onLoad();
    });
  }

  unload() {
    this.setState({
      display: null
    }, () => {
      this.onUnload();
    });
  }

  hide() {
    const Component = Style.span(StyledComponents.base());
    this.setState({
      display: React.createElement(Component, {
        style: {
          visibility: 'hidden'
        }
      }, this.props.children)
    }, () => {
      this.onHide();
    });
  }

  play() {
    console.log(this.props.component);
    const Component = this.props.component(this.props.duration);
    this.setState({
      display: React.createElement(Component, null, this.props.children)
    }, () => {
      this.onPlay();
    });
  }

  onPlay() {
    var _this$props$onPlay, _this$props;

    (_this$props$onPlay = (_this$props = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props, this);
  }

  onLoad() {
    var _this$props$onLoad, _this$props2;

    (_this$props$onLoad = (_this$props2 = this.props).onLoad) === null || _this$props$onLoad === void 0 ? void 0 : _this$props$onLoad.call(_this$props2, this);
  }

  onUnload() {
    var _this$props$onUnload, _this$props3;

    (_this$props$onUnload = (_this$props3 = this.props).onUnload) === null || _this$props$onUnload === void 0 ? void 0 : _this$props$onUnload.call(_this$props3, this);
  }

  onHide() {
    var _this$props$onHide, _this$props4;

    (_this$props$onHide = (_this$props4 = this.props).onHide) === null || _this$props$onHide === void 0 ? void 0 : _this$props$onHide.call(_this$props4, this);
  }

}
Char.defaultProps = {
  duration: 0,
  hide: false,
  unload: false,
  fixed: false
};

class Text extends Component {
  render() {
    return React.createElement("div", null);
  }

}

export { Char, StyledComponents, Text };
//# sourceMappingURL=index.modern.js.map
