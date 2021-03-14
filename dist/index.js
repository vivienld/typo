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

    _this.init();

    return _this;
  }

  var _proto = Text.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.parent) {
      this.play();
    }
  };

  _proto.init = function init() {
    console.log('text init!');
    this.str = (this.props.children || '').replaceAll(' ', '\xa0');
    this.iteration = !this.props.rewind ? 0 : this.str.length - 1;
    this.stopped = false;
  };

  _proto.play = function play() {
    var _this2 = this;

    if (!this.stopped) {
      var pace;

      if (!this.initiated) {
        var _this$props$parent;

        this.onStart();
        this.initiated = true;
        pace = this.props.pause || ((_this$props$parent = this.props.parent) === null || _this$props$parent === void 0 ? void 0 : _this$props$parent.props.pause) || defaultPause;
      } else if (this.str[this.iteration] != '\xa0') {
        var _this$props$parent2;

        pace = this.props.pace || ((_this$props$parent2 = this.props.parent) === null || _this$props$parent2 === void 0 ? void 0 : _this$props$parent2.props.pace) || defaultPace;
      } else {
        var _this$props$parent3;

        pace = this.props.whiteSpacePace || ((_this$props$parent3 = this.props.parent) === null || _this$props$parent3 === void 0 ? void 0 : _this$props$parent3.props.whiteSpacePace) || defaultPace;
      }

      setTimeout(function () {
        var _this2$props$parent, _this2$props$parent2;

        var stamp = _this2.props.stamp || ((_this2$props$parent = _this2.props.parent) === null || _this2$props$parent === void 0 ? void 0 : _this2$props$parent.props.stamp);
        var rewind = _this2.props.rewind || ((_this2$props$parent2 = _this2.props.parent) === null || _this2$props$parent2 === void 0 ? void 0 : _this2$props$parent2.props.rewind);

        if (!stamp) {
          var chars = _this2.str.substr(0, _this2.iteration + 1).split('');

          var display;

          if (rewind) {
            display = chars.map(function (_char, i) {
              return React__default.createElement("span", {
                style: spanStyle,
                key: i
              }, _char);
            });
            display.pop();
            display.push(React__default.createElement("span", {
              style: spanStyle,
              className: _this2.props.charClassName,
              key: Date.now()
            }, chars.slice(-1)));
          } else {
            display = chars.map(function (_char2, i) {
              return React__default.createElement("span", {
                style: spanStyle,
                className: _this2.props.charClassName,
                key: i
              }, _char2);
            });
          }

          _this2.setState({
            display: display
          }, function () {
            _this2.iteration += rewind ? -1 : 1;

            if (rewind && _this2.iteration < -1 || !rewind && _this2.iteration > _this2.str.length) {
              _this2.stop();
            } else {
              _this2.onChar();
            }
          });
        } else {
          _this2.setState({
            display: React__default.createElement("span", {
              style: spanStyle,
              className: _this2.props.charClassName
            }, _this2.str)
          }, function () {
            _this2.iteration = rewind ? 0 : _this2.props.children.length - 1;

            _this2.onChar();

            _this2.stop();
          });
        }

        _this2.play();
      }, pace);
    }
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
    this.onStop();
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  };

  _proto.onChar = function onChar() {
    var _this$props$parent4, _this$props$onChar, _this$props2, _this$props$parent5, _this$props$parent5$p, _this$props$parent5$p2;

    var rewind = ((_this$props$parent4 = this.props.parent) === null || _this$props$parent4 === void 0 ? void 0 : _this$props$parent4.props.rewind) || this.props.rewind;

    var _char4 = rewind ? this.str[this.iteration + 1] : this.str[this.iteration - 1];

    (_this$props$onChar = (_this$props2 = this.props).onChar) === null || _this$props$onChar === void 0 ? void 0 : _this$props$onChar.call(_this$props2, _char4, this);
    (_this$props$parent5 = this.props.parent) === null || _this$props$parent5 === void 0 ? void 0 : (_this$props$parent5$p = (_this$props$parent5$p2 = _this$props$parent5.props).onChar) === null || _this$props$parent5$p === void 0 ? void 0 : _this$props$parent5$p.call(_this$props$parent5$p2, _char4, this.props.parent);
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props3, _this$props4, _this$props4$parent;

    this.stopped = true;
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
    }, (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
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

  var _proto = Typo.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!Array.from(Typo.typos.values()).some(function (typo) {
      return typo.props.next == _this2.name;
    }) || Typo.first == this) {
      this.play();
    }
  };

  _proto.init = function init() {
    var _this3 = this;

    this.initiated = false;
    this.texts = React__default.Children.map(this.props.children, function (child) {
      var ref = React__default.createRef();

      _this3.textRefs.push(ref);

      return React__default.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: _this3,
        rewind: _this3.props.rewind
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
      this.initiated = true;
      this.onStart();
    }

    if (this.props.rewind && this.iteration < 0 || !this.props.rewind && this.iteration > this.texts.length - 1) {
      this.stop();
    } else {
      var _this$textRefs$this$i, _this$textRefs$this$i2;

      if (this.props.rewind) {
        for (var i = this.iteration; i >= 0; i--) {
          var _this$textRefs$i$curr;

          (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
        }
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration]) === null || _this$textRefs$this$i === void 0 ? void 0 : (_this$textRefs$this$i2 = _this$textRefs$this$i.current) === null || _this$textRefs$this$i2 === void 0 ? void 0 : _this$textRefs$this$i2.play();
      this.iteration += this.props.rewind ? -1 : 1;
      this.onText();
    }
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
      var _Typo$typos$get, _Typo$typos$get2, _Typo$typos$get3;

      (_Typo$typos$get = Typo.typos.get(this.props.next)) === null || _Typo$typos$get === void 0 ? void 0 : _Typo$typos$get.textRefs.forEach(function (ref) {
        var _ref$current;

        return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.init();
      });
      (_Typo$typos$get2 = Typo.typos.get(this.props.next)) === null || _Typo$typos$get2 === void 0 ? void 0 : _Typo$typos$get2.init();
      (_Typo$typos$get3 = Typo.typos.get(this.props.next)) === null || _Typo$typos$get3 === void 0 ? void 0 : _Typo$typos$get3.play();
    }
  };

  _proto.render = function render() {
    return React__default.createElement("div", {
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
