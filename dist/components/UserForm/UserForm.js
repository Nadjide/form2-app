"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _validation = require("../../utils/validation");
require("./UserForm.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const UserForm = () => {
  const [formData, setFormData] = (0, _react.useState)({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    postalCode: '',
    city: ''
  });
  const [errors, setErrors] = (0, _react.useState)({});
  const [isSubmitted, setIsSubmitted] = (0, _react.useState)(false);
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    const error = (0, _validation.getFieldError)(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = (0, _validation.getFieldError)(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log('Formulaire soumis:', formData);
    } else {
      setErrors(newErrors);
    }
  };
  const isFormValid = () => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    return !hasErrors && allFieldsFilled;
  };
  if (isSubmitted) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "success-message",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        children: "Inscription r\xE9ussie !"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        children: ["Merci pour votre inscription, ", formData.firstName, " !"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            postalCode: '',
            city: ''
          });
        },
        children: "Nouvelle inscription"
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "user-form-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: "Formulaire d'inscription"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      onSubmit: handleSubmit,
      className: "user-form",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-row",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            htmlFor: "firstName",
            children: "Pr\xE9nom *"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            id: "firstName",
            name: "firstName",
            value: formData.firstName,
            onChange: handleInputChange,
            className: errors.firstName ? 'error' : '',
            placeholder: "Votre pr\xE9nom",
            required: true
          }), errors.firstName && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "error-message",
            children: errors.firstName
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            htmlFor: "lastName",
            children: "Nom *"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            id: "lastName",
            name: "lastName",
            value: formData.lastName,
            onChange: handleInputChange,
            className: errors.lastName ? 'error' : '',
            placeholder: "Votre nom",
            required: true
          }), errors.lastName && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "error-message",
            children: errors.lastName
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "email",
          children: "Email *"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleInputChange,
          className: errors.email ? 'error' : '',
          placeholder: "votre.email@exemple.com",
          required: true
        }), errors.email && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "error-message",
          children: errors.email
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "birthDate",
          children: "Date de naissance *"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          id: "birthDate",
          name: "birthDate",
          value: formData.birthDate,
          onChange: handleInputChange,
          className: errors.birthDate ? 'error' : '',
          required: true
        }), errors.birthDate && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "error-message",
          children: errors.birthDate
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-row",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            htmlFor: "postalCode",
            children: "Code postal *"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            id: "postalCode",
            name: "postalCode",
            value: formData.postalCode,
            onChange: handleInputChange,
            className: errors.postalCode ? 'error' : '',
            placeholder: "75001",
            maxLength: "5",
            required: true
          }), errors.postalCode && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "error-message",
            children: errors.postalCode
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            htmlFor: "city",
            children: "Ville *"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            id: "city",
            name: "city",
            value: formData.city,
            onChange: handleInputChange,
            className: errors.city ? 'error' : '',
            placeholder: "Votre ville",
            required: true
          }), errors.city && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "error-message",
            children: errors.city
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "submit",
        className: "submit-button",
        disabled: !isFormValid(),
        children: "S'inscrire"
      })]
    })]
  });
};
var _default = exports.default = UserForm;