"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _App = _interopRequireDefault(require("../App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('App Component', () => {
  test('devrait rendre le composant UserForm', () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    expect(_react2.screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
  });
  test('devrait avoir la classe App', () => {
    const {
      container
    } = (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    expect(container.firstChild).toHaveClass('App');
  });
});