function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var defaultPace = 40;
var defaultPause = 0;
var spanStyle = {
  display: 'inline-block'
};

var Text = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Text, _Component);

  function Text(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.str = (_this.props.children || '').replaceAll(' ', '\xa0');
    return _this;
  }

  var _proto = Text.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.parent) {
      this.init();
      this.run();
    }
  };

  _proto.init = function init() {
    var _this$props$parent;

    this.iteration = !this.props.rewind || (_this$props$parent = this.props.parent) !== null && _this$props$parent !== void 0 && _this$props$parent.props.rewind ? 0 : this.str.length - 1;
    this.stopped = false;
    this.setState({
      display: null
    });
  };

  _proto.run = function run() {
    var _this$props$parent2,
        _this2 = this;

    var pause = this.props.pause || ((_this$props$parent2 = this.props.parent) === null || _this$props$parent2 === void 0 ? void 0 : _this$props$parent2.props.pause) || defaultPause;
    setTimeout(function () {
      _this2.updateInterval();
    }, pause);
  };

  _proto.updateInterval = function updateInterval() {
    var _this$props$parent3,
        _this$props$parent4,
        _this3 = this;

    clearInterval(this.interval);
    var pace = this.str[this.iteration] != '\xa0' ? this.props.pace || ((_this$props$parent3 = this.props.parent) === null || _this$props$parent3 === void 0 ? void 0 : _this$props$parent3.props.pace) || defaultPace : this.props.whiteSpacePace || ((_this$props$parent4 = this.props.parent) === null || _this$props$parent4 === void 0 ? void 0 : _this$props$parent4.props.whiteSpacePace) || this.props.pace || defaultPace;
    this.onStart();
    this.interval = setInterval(function () {
      return _this3.play();
    }, pace);
  };

  _proto.play = function play() {
    var _this4 = this;

    if (!this.stopped) {
      var _this$props$parent5, _this$props$parent6;

      var stamp = this.props.stamp || ((_this$props$parent5 = this.props.parent) === null || _this$props$parent5 === void 0 ? void 0 : _this$props$parent5.props.stamp);
      var rewind = this.props.rewind || ((_this$props$parent6 = this.props.parent) === null || _this$props$parent6 === void 0 ? void 0 : _this$props$parent6.props.rewind);

      if (!stamp) {
        var chars = this.str.substr(0, this.iteration + 1).split('');
        var display;

        if (rewind) {
          display = chars.map(function (_char, i) {
            var style = {
              display: 'inline-block',
              animation: 'none'
            };
            return React__default.createElement("span", {
              className: _this4.props.charClassName,
              style: style,
              key: i
            }, _char);
          });
          display.pop();
          display.push(React__default.createElement("span", {
            style: spanStyle,
            className: this.props.charClassName,
            key: Date.now()
          }, chars.slice(-1)));
        } else {
          display = chars.map(function (_char2, i) {
            return React__default.createElement("span", {
              style: spanStyle,
              className: _this4.props.charClassName,
              key: i
            }, _char2);
          });
        }

        this.setState({
          display: display
        }, function () {
          _this4.iteration += rewind ? -1 : 1;

          if (rewind && _this4.iteration < -1 || !rewind && _this4.iteration > _this4.str.length) {
            _this4.stop();
          } else {
            _this4.onChar();
          }
        });
      } else {
        this.setState({
          display: React__default.createElement("span", {
            style: spanStyle,
            className: this.props.charClassName,
            key: Date.now()
          }, this.str)
        }, function () {
          _this4.iteration = rewind ? 0 : _this4.props.children.length - 1;

          _this4.onChar();

          _this4.stop();
        });
      }
    }
  };

  _proto.replay = function replay() {
    this.init();
    this.run();
  };

  _proto.show = function show() {
    this.setState({
      display: this.str.split('').map(function (_char3, i) {
        return React__default.createElement("span", {
          style: spanStyle,
          key: i
        }, _char3);
      })
    });
  };

  _proto.stop = function stop() {
    if (this.props.loop) {
      this.replay();
    } else {
      this.stopped = true;
      this.onStop();
    }
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  };

  _proto.onChar = function onChar() {
    var _this$props$parent7, _this$props$onChar, _this$props2, _this$props$parent8, _this$props$parent8$p, _this$props$parent8$p2;

    var rewind = ((_this$props$parent7 = this.props.parent) === null || _this$props$parent7 === void 0 ? void 0 : _this$props$parent7.props.rewind) || this.props.rewind;

    var _char4 = rewind ? this.str[this.iteration + 1] : this.str[this.iteration - 1];

    (_this$props$onChar = (_this$props2 = this.props).onChar) === null || _this$props$onChar === void 0 ? void 0 : _this$props$onChar.call(_this$props2, _char4, this);
    (_this$props$parent8 = this.props.parent) === null || _this$props$parent8 === void 0 ? void 0 : (_this$props$parent8$p = (_this$props$parent8$p2 = _this$props$parent8.props).onChar) === null || _this$props$parent8$p === void 0 ? void 0 : _this$props$parent8$p.call(_this$props$parent8$p2, _char4, this.props.parent);
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props3, _this$props4, _this$props4$parent;

    clearInterval(this.interval);
    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);
    (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$parent = _this$props4.parent) === null || _this$props4$parent === void 0 ? void 0 : _this$props4$parent.play();
  };

  _proto.render = function render() {
    var _this$state;

    return React__default.createElement("div", {
      className: this.props.className,
      style: {
        display: this.props.block ? 'block' : 'inline-block'
      }
    }, ((_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display) || "\xA0");
  };

  return Text;
}(React.Component);

var Typo = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Typo, _Component);

  function Typo(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.textRefs = [];

    _this.init();

    return _this;
  }

  Typo.play = function play(typoName) {
    var _Typo$typos$get;

    (_Typo$typos$get = Typo.typos.get(typoName)) === null || _Typo$typos$get === void 0 ? void 0 : _Typo$typos$get.replay();
  };

  Typo.stop = function stop(typoName) {
    var _Typo$typos$get2;

    (_Typo$typos$get2 = Typo.typos.get(typoName)) === null || _Typo$typos$get2 === void 0 ? void 0 : _Typo$typos$get2.stop();
  };

  var _proto = Typo.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.props.stop) {
      if (!Array.from(Typo.typos.values()).some(function (typo) {
        return typo.props.next == _this2.name;
      }) || Typo.first == this) {
        this.init();
        this.play();
      }
    }
  };

  _proto.init = function init() {
    var _this3 = this;

    this.initiated = false;
    this.textRefs.forEach(function (text) {
      var _text$current;

      return (_text$current = text.current) === null || _text$current === void 0 ? void 0 : _text$current.init();
    });
    this.texts = React__default.Children.map(this.props.children, function (child) {
      var ref = React__default.createRef();

      _this3.textRefs.push(ref);

      return React__default.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: _this3,
        rewind: _this3.props.rewind || child.props.rewind
      }), child.props.children || '');
    });
    this.iteration = !this.props.rewind ? 0 : this.texts.length == 1 ? 0 : this.texts.length - 1;
    this.name = this.props.name || '_' + Math.random().toString(36).substr(2, 9);
    Typo.typos.set(this.name, this);

    if (typeof Typo.first == 'undefined') {
      Typo.first = this;
    }
  };

  _proto.play = function play() {
    if (!this.initiated) {
      this.onStart();
      this.initiated = true;
    }

    if (this.props.rewind && this.iteration < 0 || !this.props.rewind && this.iteration > this.texts.length - 1) {
      this.stop();
    } else {
      var _this$textRefs$this$i, _this$textRefs$this$i2, _this$textRefs$this$i3, _this$textRefs$this$i4;

      if (this.props.rewind) {
        for (var i = this.iteration; i >= 0; i--) {
          var _this$textRefs$i$curr;

          (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
        }
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration]) === null || _this$textRefs$this$i === void 0 ? void 0 : (_this$textRefs$this$i2 = _this$textRefs$this$i.current) === null || _this$textRefs$this$i2 === void 0 ? void 0 : _this$textRefs$this$i2.init();
      (_this$textRefs$this$i3 = this.textRefs[this.iteration]) === null || _this$textRefs$this$i3 === void 0 ? void 0 : (_this$textRefs$this$i4 = _this$textRefs$this$i3.current) === null || _this$textRefs$this$i4 === void 0 ? void 0 : _this$textRefs$this$i4.run();
      this.iteration += this.props.rewind ? -1 : 1;
      this.onText();
    }
  };

  _proto.replay = function replay() {
    this.init();
    this.play();
  };

  _proto.stop = function stop() {
    this.onStop();
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  };

  _proto.onText = function onText() {
    var _this$textRefs, _this$textRefs2;

    var text = this.props.rewind ? (_this$textRefs = this.textRefs[this.iteration + 1]) === null || _this$textRefs === void 0 ? void 0 : _this$textRefs.current : (_this$textRefs2 = this.textRefs[this.iteration - 1]) === null || _this$textRefs2 === void 0 ? void 0 : _this$textRefs2.current;

    if (text) {
      var _this$props$onText, _this$props2;

      (_this$props$onText = (_this$props2 = this.props).onText) === null || _this$props$onText === void 0 ? void 0 : _this$props$onText.call(_this$props2, text, this);
    }
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props3;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);

    if (this.props.next) {
      var _Typo$typos$get3;

      (_Typo$typos$get3 = Typo.typos.get(this.props.next)) === null || _Typo$typos$get3 === void 0 ? void 0 : _Typo$typos$get3.play();
    }
  };

  _proto.render = function render() {
    return React__default.createElement("div", {
      className: this.props.className,
      style: {
        display: 'inline-block'
      }
    }, this.texts);
  };

  return Typo;
}(React.Component);
Typo.typos = new Map();

exports.Text = Text;
exports.Typo = Typo;
//# sourceMappingURL=index.js.map
