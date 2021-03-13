function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Style = _interopDefault(require('styled-components'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject;
function base() {
  return Style.span(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["display:inline-block;"])));
}

var _templateObject$1;
function rotateInCenter(duration) {
  return Style.span(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n    display:inline-block;\n    @keyframes rotate-in-center{\n        0%{\n            -webkit-transform:rotate(-360deg);\n            transform:rotate(-360deg);\n            opacity:0;\n        }\n            100%{\n                -webkit-transform:rotate(0);\n                transform:rotate(0);\n                opacity:1\n            }\n        }\n    }\n    animation: rotate-in-center ", "s cubic-bezier(.25,.46,.45,.94) both;\n    "])), duration / 1000);
}

var Animation = function Animation() {};
Animation.base = base;
Animation.rotateInCenter = rotateInCenter;

var defaultPace = 40;
var defaultDelay = 0;

var Text = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Text, _Component);

  function Text(props) {
    return _Component.call(this, props) || this;
  }

  var _proto = Text.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this = this;

    setTimeout(function () {
      return _this.run();
    }, this.props.delay || defaultDelay);
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;
    this.onStart();
  };

  _proto.run = function run() {
    var _this2 = this;

    this.interval = setInterval(function () {
      return _this2.play();
    }, this.props.pace || defaultPace);
  };

  _proto.play = function play() {
    var _this$props$animation,
        _this$props,
        _this3 = this;

    var Element = ((_this$props$animation = (_this$props = this.props).animation) === null || _this$props$animation === void 0 ? void 0 : _this$props$animation.call(_this$props, this.props.pace || defaultPace)) || Animation.base();

    if (!this.props.stamp) {
      var chars = (this.props.children || '').substr(0, this.iteration + 1).split('');
      this.setState({
        display: chars.map(function (_char, i) {
          if (i == chars.length - 1) {
            return React__default.createElement(Element, {
              key: i
            }, _char);
          } else {
            return React__default.createElement("span", {
              key: i
            }, _char);
          }
        })
      }, function () {
        _this3.iteration += _this3.props.rewind ? -1 : 1;

        if (_this3.props.rewind && _this3.iteration < -1 || !_this3.props.rewind && _this3.iteration > (_this3.props.children || '').length) {
          _this3.stop();
        } else {
          _this3.onPlay();
        }
      });
    } else {
      this.setState({
        display: React__default.createElement(Element, null, this.props.children || '')
      }, function () {
        _this3.iteration = _this3.props.rewind ? 0 : _this3.props.children.length - 1;

        _this3.onPlay();
      });
    }
  };

  _proto.stop = function stop() {
    clearInterval(this.interval);
    this.onStop();
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this);
  };

  _proto.onPlay = function onPlay() {
    var _this$props$onPlay, _this$props3;

    (_this$props$onPlay = (_this$props3 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props3, this);
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props4;

    (_this$props$onStop = (_this$props4 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props4, this);
  };

  _proto.render = function render() {
    var _this$state;

    return React__default.createElement(React__default.Fragment, null, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
  };

  return Text;
}(React.Component);

exports.Animation = Animation;
exports.Text = Text;
//# sourceMappingURL=index.js.map
