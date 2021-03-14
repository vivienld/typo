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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var defaultPace = 40;
var defaultDelay = 0;
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
    this.iteration = !this.props.rewind ? 0 : (this.props.children || '').length - 1;

    if (!this.props.parent) {
      this.run();
    }
  };

  _proto.run = function run() {
    var _this2 = this;

    if (!this.initiated) {
      this.onStart();
      this.initiated = true;
      setTimeout(function () {
        _this2.play();

        _this2.run();
      }, this.props.delay || defaultDelay);
    } else {
      this.interval = setInterval(function () {
        return _this2.play();
      }, this.props.pace || defaultPace);
    }
  };

  _proto.play = function play() {
    var _this3 = this;

    if (!this.props.stamp) {
      var chars = this.str.substr(0, this.iteration + 1).split('');
      this.setState({
        display: chars.map(function (_char, i) {
          if (i == chars.length - 1) {
            return React__default.createElement("span", {
              style: spanStyle,
              className: _this3.props.printClassName,
              key: i
            }, _char);
          } else {
            return React__default.createElement("span", {
              style: spanStyle,
              className: _this3.props.charClassName,
              key: i
            }, _char);
          }
        })
      }, function () {
        _this3.iteration += _this3.props.rewind ? -1 : 1;

        if (_this3.props.rewind && _this3.iteration < -1 || !_this3.props.rewind && _this3.iteration > _this3.str.length) {
          _this3.stop();
        } else {
          _this3.onPlay();
        }
      });
    } else {
      this.setState({
        display: React__default.createElement("span", {
          style: spanStyle,
          className: this.props.printClassName
        }, this.str)
      }, function () {
        _this3.iteration = _this3.props.rewind ? 0 : _this3.props.children.length - 1;

        _this3.onPlay();

        _this3.stop();
      });
    }
  };

  _proto.show = function show() {
    var _this4 = this;

    this.setState({
      display: this.str.split('').map(function (_char2, i) {
        return React__default.createElement("span", {
          style: spanStyle,
          className: _this4.props.charClassName,
          key: i
        }, _char2);
      })
    });
  };

  _proto.stop = function stop() {
    clearInterval(this.interval);
    this.onStop();
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  };

  _proto.onPlay = function onPlay() {
    var _this$props$onPlay, _this$props2;

    (_this$props$onPlay = (_this$props2 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props2, this);
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props3, _this$props4, _this$props4$parent;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);
    (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$parent = _this$props4.parent) === null || _this$props4$parent === void 0 ? void 0 : _this$props4$parent.play();
  };

  _proto.render = function render() {
    var _this$state;

    return React__default.createElement("div", {
      className: this.props.textClassName,
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
    _this.iteration = !_this.props.rewind ? 0 : (_this.props.children || '').length - 1;
    _this.texts = React__default.Children.map(_this.props.children, function (child) {
      var ref = React__default.createRef();

      _this.textRefs.push(ref);

      return React__default.createElement(Text, Object.assign({}, child.props, {
        ref: ref,
        parent: _assertThisInitialized(_this),
        rewind: _this.props.rewind
      }), child.props.children);
    });
    return _this;
  }

  var _proto = Typo.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.onStart();
    this.run();
  };

  _proto.run = function run() {
    this.play();
  };

  _proto.play = function play() {
    if (this.props.rewind && this.iteration < 0 || !this.props.rewind && this.iteration > this.texts.length - 1) {
      this.stop();
    } else {
      var _this$textRefs$this$i;

      if (this.props.rewind) {
        for (var i = this.iteration; i >= 0; i--) {
          var _this$textRefs$i$curr;

          (_this$textRefs$i$curr = this.textRefs[i].current) === null || _this$textRefs$i$curr === void 0 ? void 0 : _this$textRefs$i$curr.show();
        }
      }

      (_this$textRefs$this$i = this.textRefs[this.iteration].current) === null || _this$textRefs$this$i === void 0 ? void 0 : _this$textRefs$this$i.run();
      this.iteration += this.props.rewind ? -1 : 1;
      this.onPlay();
    }
  };

  _proto.stop = function stop() {
    this.onStop();
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props;

    (_this$props$onStart = (_this$props = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props, this);
  };

  _proto.onPlay = function onPlay() {
    var _this$props$onPlay, _this$props2;

    (_this$props$onPlay = (_this$props2 = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props2, this);
  };

  _proto.onStop = function onStop() {
    var _this$props$onStop, _this$props3;

    (_this$props$onStop = (_this$props3 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props3, this);
  };

  _proto.render = function render() {
    return React__default.createElement(React__default.Fragment, null, this.texts);
  };

  return Typo;
}(React.Component);

exports.Text = Text;
exports.Typo = Typo;
//# sourceMappingURL=index.js.map
