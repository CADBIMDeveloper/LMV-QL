var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// build/obj/engine.js
var require_engine = __commonJS({
  "build/obj/engine.js"(exports, module) {
    "use strict";
    var engine3 = () => {
      var __create2 = Object.create;
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __commonJS2 = (cb, mod) => function __require() {
        return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var require_Failure = __commonJS2({
        "node_modules/ohm-js/src/Failure.js"(exports2, module2) {
          "use strict";
          function isValidType(type) {
            return type === "description" || type === "string" || type === "code";
          }
          function Failure(pexpr, text, type) {
            if (!isValidType(type)) {
              throw new Error("invalid Failure type: " + type);
            }
            this.pexpr = pexpr;
            this.text = text;
            this.type = type;
            this.fluffy = false;
          }
          Failure.prototype.getPExpr = function() {
            return this.pexpr;
          };
          Failure.prototype.getText = function() {
            return this.text;
          };
          Failure.prototype.getType = function() {
            return this.type;
          };
          Failure.prototype.isDescription = function() {
            return this.type === "description";
          };
          Failure.prototype.isStringTerminal = function() {
            return this.type === "string";
          };
          Failure.prototype.isCode = function() {
            return this.type === "code";
          };
          Failure.prototype.isFluffy = function() {
            return this.fluffy;
          };
          Failure.prototype.makeFluffy = function() {
            this.fluffy = true;
          };
          Failure.prototype.clearFluffy = function() {
            this.fluffy = false;
          };
          Failure.prototype.subsumes = function(that) {
            return this.getText() === that.getText() && this.type === that.type && (!this.isFluffy() || this.isFluffy() && that.isFluffy());
          };
          Failure.prototype.toString = function() {
            return this.type === "string" ? JSON.stringify(this.getText()) : this.getText();
          };
          Failure.prototype.clone = function() {
            const failure = new Failure(this.pexpr, this.text, this.type);
            if (this.isFluffy()) {
              failure.makeFluffy();
            }
            return failure;
          };
          Failure.prototype.toKey = function() {
            return this.toString() + "#" + this.type;
          };
          module2.exports = Failure;
        }
      });
      var require_common = __commonJS2({
        "node_modules/ohm-js/src/common.js"(exports2) {
          "use strict";
          var escapeStringFor = {};
          for (let c = 0; c < 128; c++) {
            escapeStringFor[c] = String.fromCharCode(c);
          }
          escapeStringFor["'".charCodeAt(0)] = "\\'";
          escapeStringFor['"'.charCodeAt(0)] = '\\"';
          escapeStringFor["\\".charCodeAt(0)] = "\\\\";
          escapeStringFor["\b".charCodeAt(0)] = "\\b";
          escapeStringFor["\f".charCodeAt(0)] = "\\f";
          escapeStringFor["\n".charCodeAt(0)] = "\\n";
          escapeStringFor["\r".charCodeAt(0)] = "\\r";
          escapeStringFor["	".charCodeAt(0)] = "\\t";
          escapeStringFor["\v".charCodeAt(0)] = "\\v";
          exports2.abstract = function(optMethodName) {
            const methodName = optMethodName || "";
            return function() {
              throw new Error("this method " + methodName + " is abstract! (it has no implementation in class " + this.constructor.name + ")");
            };
          };
          exports2.assert = function(cond, message) {
            if (!cond) {
              throw new Error(message || "Assertion failed");
            }
          };
          exports2.defineLazyProperty = function(obj, propName, getterFn) {
            let memo;
            Object.defineProperty(obj, propName, {
              get() {
                if (!memo) {
                  memo = getterFn.call(this);
                }
                return memo;
              }
            });
          };
          exports2.clone = function(obj) {
            if (obj) {
              return Object.assign({}, obj);
            }
            return obj;
          };
          exports2.repeatFn = function(fn, n) {
            const arr = [];
            while (n-- > 0) {
              arr.push(fn());
            }
            return arr;
          };
          exports2.repeatStr = function(str, n) {
            return new Array(n + 1).join(str);
          };
          exports2.repeat = function(x, n) {
            return exports2.repeatFn(() => x, n);
          };
          exports2.getDuplicates = function(array) {
            const duplicates = [];
            for (let idx = 0; idx < array.length; idx++) {
              const x = array[idx];
              if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
                duplicates.push(x);
              }
            }
            return duplicates;
          };
          exports2.copyWithoutDuplicates = function(array) {
            const noDuplicates = [];
            array.forEach((entry) => {
              if (noDuplicates.indexOf(entry) < 0) {
                noDuplicates.push(entry);
              }
            });
            return noDuplicates;
          };
          exports2.isSyntactic = function(ruleName) {
            const firstChar = ruleName[0];
            return firstChar === firstChar.toUpperCase();
          };
          exports2.isLexical = function(ruleName) {
            return !exports2.isSyntactic(ruleName);
          };
          exports2.padLeft = function(str, len, optChar) {
            const ch = optChar || " ";
            if (str.length < len) {
              return exports2.repeatStr(ch, len - str.length) + str;
            }
            return str;
          };
          exports2.StringBuffer = function() {
            this.strings = [];
          };
          exports2.StringBuffer.prototype.append = function(str) {
            this.strings.push(str);
          };
          exports2.StringBuffer.prototype.contents = function() {
            return this.strings.join("");
          };
          var escapeUnicode = (str) => String.fromCodePoint(parseInt(str, 16));
          exports2.unescapeCodePoint = function(s) {
            if (s.charAt(0) === "\\") {
              switch (s.charAt(1)) {
                case "b":
                  return "\b";
                case "f":
                  return "\f";
                case "n":
                  return "\n";
                case "r":
                  return "\r";
                case "t":
                  return "	";
                case "v":
                  return "\v";
                case "x":
                  return escapeUnicode(s.slice(2, 4));
                case "u":
                  return s.charAt(2) === "{" ? escapeUnicode(s.slice(3, -1)) : escapeUnicode(s.slice(2, 6));
                default:
                  return s.charAt(1);
              }
            } else {
              return s;
            }
          };
          exports2.unexpectedObjToString = function(obj) {
            if (obj == null) {
              return String(obj);
            }
            const baseToString = Object.prototype.toString.call(obj);
            try {
              let typeName;
              if (obj.constructor && obj.constructor.name) {
                typeName = obj.constructor.name;
              } else if (baseToString.indexOf("[object ") === 0) {
                typeName = baseToString.slice(8, -1);
              } else {
                typeName = typeof obj;
              }
              return typeName + ": " + JSON.stringify(String(obj));
            } catch (e) {
              return baseToString;
            }
          };
        }
      });
      var require_nodes = __commonJS2({
        "node_modules/ohm-js/src/nodes.js"(exports2, module2) {
          "use strict";
          var common = require_common();
          var Node = class {
            constructor(matchLength) {
              this.matchLength = matchLength;
            }
            get ctorName() {
              throw new Error("subclass responsibility");
            }
            numChildren() {
              return this.children ? this.children.length : 0;
            }
            childAt(idx) {
              if (this.children) {
                return this.children[idx];
              }
            }
            indexOfChild(arg) {
              return this.children.indexOf(arg);
            }
            hasChildren() {
              return this.numChildren() > 0;
            }
            hasNoChildren() {
              return !this.hasChildren();
            }
            onlyChild() {
              if (this.numChildren() !== 1) {
                throw new Error("cannot get only child of a node of type " + this.ctorName + " (it has " + this.numChildren() + " children)");
              } else {
                return this.firstChild();
              }
            }
            firstChild() {
              if (this.hasNoChildren()) {
                throw new Error("cannot get first child of a " + this.ctorName + " node, which has no children");
              } else {
                return this.childAt(0);
              }
            }
            lastChild() {
              if (this.hasNoChildren()) {
                throw new Error("cannot get last child of a " + this.ctorName + " node, which has no children");
              } else {
                return this.childAt(this.numChildren() - 1);
              }
            }
            childBefore(child) {
              const childIdx = this.indexOfChild(child);
              if (childIdx < 0) {
                throw new Error("Node.childBefore() called w/ an argument that is not a child");
              } else if (childIdx === 0) {
                throw new Error("cannot get child before first child");
              } else {
                return this.childAt(childIdx - 1);
              }
            }
            childAfter(child) {
              const childIdx = this.indexOfChild(child);
              if (childIdx < 0) {
                throw new Error("Node.childAfter() called w/ an argument that is not a child");
              } else if (childIdx === this.numChildren() - 1) {
                throw new Error("cannot get child after last child");
              } else {
                return this.childAt(childIdx + 1);
              }
            }
            isTerminal() {
              return false;
            }
            isNonterminal() {
              return false;
            }
            isIteration() {
              return false;
            }
            isOptional() {
              return false;
            }
          };
          var TerminalNode = class extends Node {
            get ctorName() {
              return "_terminal";
            }
            isTerminal() {
              return true;
            }
            get primitiveValue() {
              throw new Error("The `primitiveValue` property was removed in Ohm v17.");
            }
          };
          var NonterminalNode = class extends Node {
            constructor(ruleName, children, childOffsets, matchLength) {
              super(matchLength);
              this.ruleName = ruleName;
              this.children = children;
              this.childOffsets = childOffsets;
            }
            get ctorName() {
              return this.ruleName;
            }
            isNonterminal() {
              return true;
            }
            isLexical() {
              return common.isLexical(this.ctorName);
            }
            isSyntactic() {
              return common.isSyntactic(this.ctorName);
            }
          };
          var IterationNode = class extends Node {
            constructor(children, childOffsets, matchLength, isOptional) {
              super(matchLength);
              this.children = children;
              this.childOffsets = childOffsets;
              this.optional = isOptional;
            }
            get ctorName() {
              return "_iter";
            }
            isIteration() {
              return true;
            }
            isOptional() {
              return this.optional;
            }
          };
          module2.exports = {
            Node,
            TerminalNode,
            NonterminalNode,
            IterationNode
          };
        }
      });
      var require_UnicodeCategories = __commonJS2({
        "node_modules/ohm-js/third_party/UnicodeCategories.js"(exports2, module2) {
          module2.exports = {
            // Letters
            Lu: /[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/,
            Ll: /[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/,
            Lt: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
            Lm: /[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/,
            Lo: /[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
            // Numbers
            Nl: /[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/,
            Nd: /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/,
            // Marks
            Mn: /[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/,
            Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,
            // Punctuation, Connector
            Pc: /[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,
            // Separator, Space
            Zs: /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
            // These two are not real Unicode categories, but our useful for Ohm.
            // L is a combination of all the letter categories.
            // Ltmo is a combination of Lt, Lm, and Lo.
            L: /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
            Ltmo: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/
          };
        }
      });
      var require_pexprs_main = __commonJS2({
        "node_modules/ohm-js/src/pexprs-main.js"(exports2) {
          "use strict";
          var UnicodeCategories = require_UnicodeCategories();
          var common = require_common();
          var PExpr = class {
            constructor() {
              if (this.constructor === PExpr) {
                throw new Error("PExpr cannot be instantiated -- it's abstract");
              }
            }
            // Set the `source` property to the interval containing the source for this expression.
            withSource(interval) {
              if (interval) {
                this.source = interval.trimmed();
              }
              return this;
            }
          };
          var any = Object.create(PExpr.prototype);
          var end = Object.create(PExpr.prototype);
          var Terminal = class extends PExpr {
            constructor(obj) {
              super();
              this.obj = obj;
            }
          };
          var Range = class extends PExpr {
            constructor(from, to) {
              super();
              this.from = from;
              this.to = to;
              this.matchCodePoint = from.length > 1 || to.length > 1;
            }
          };
          var Param = class extends PExpr {
            constructor(index) {
              super();
              this.index = index;
            }
          };
          var Alt = class extends PExpr {
            constructor(terms) {
              super();
              this.terms = terms;
            }
          };
          var Extend = class extends Alt {
            constructor(superGrammar, name, body) {
              const origBody = superGrammar.rules[name].body;
              super([body, origBody]);
              this.superGrammar = superGrammar;
              this.name = name;
              this.body = body;
            }
          };
          var Splice = class extends Alt {
            constructor(superGrammar, ruleName, beforeTerms, afterTerms) {
              const origBody = superGrammar.rules[ruleName].body;
              super([...beforeTerms, origBody, ...afterTerms]);
              this.superGrammar = superGrammar;
              this.ruleName = ruleName;
              this.expansionPos = beforeTerms.length;
            }
          };
          var Seq = class extends PExpr {
            constructor(factors) {
              super();
              this.factors = factors;
            }
          };
          var Iter = class extends PExpr {
            constructor(expr) {
              super();
              this.expr = expr;
            }
          };
          var Star = class extends Iter {
          };
          var Plus = class extends Iter {
          };
          var Opt = class extends Iter {
          };
          Star.prototype.operator = "*";
          Plus.prototype.operator = "+";
          Opt.prototype.operator = "?";
          Star.prototype.minNumMatches = 0;
          Plus.prototype.minNumMatches = 1;
          Opt.prototype.minNumMatches = 0;
          Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
          Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
          Opt.prototype.maxNumMatches = 1;
          var Not = class extends PExpr {
            constructor(expr) {
              super();
              this.expr = expr;
            }
          };
          var Lookahead = class extends PExpr {
            constructor(expr) {
              super();
              this.expr = expr;
            }
          };
          var Lex = class extends PExpr {
            constructor(expr) {
              super();
              this.expr = expr;
            }
          };
          var Apply = class extends PExpr {
            constructor(ruleName, args = []) {
              super();
              this.ruleName = ruleName;
              this.args = args;
            }
            isSyntactic() {
              return common.isSyntactic(this.ruleName);
            }
            // This method just caches the result of `this.toString()` in a non-enumerable property.
            toMemoKey() {
              if (!this._memoKey) {
                Object.defineProperty(this, "_memoKey", { value: this.toString() });
              }
              return this._memoKey;
            }
          };
          var UnicodeChar = class extends PExpr {
            constructor(category) {
              super();
              this.category = category;
              this.pattern = UnicodeCategories[category];
            }
          };
          exports2.PExpr = PExpr;
          exports2.any = any;
          exports2.end = end;
          exports2.Terminal = Terminal;
          exports2.Range = Range;
          exports2.Param = Param;
          exports2.Alt = Alt;
          exports2.Extend = Extend;
          exports2.Splice = Splice;
          exports2.Seq = Seq;
          exports2.Iter = Iter;
          exports2.Star = Star;
          exports2.Plus = Plus;
          exports2.Opt = Opt;
          exports2.Not = Not;
          exports2.Lookahead = Lookahead;
          exports2.Lex = Lex;
          exports2.Apply = Apply;
          exports2.UnicodeChar = UnicodeChar;
        }
      });
      var require_pexprs_allowsSkippingPrecedingSpace = __commonJS2({
        "node_modules/ohm-js/src/pexprs-allowsSkippingPrecedingSpace.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract("allowsSkippingPrecedingSpace");
          pexprs.any.allowsSkippingPrecedingSpace = pexprs.end.allowsSkippingPrecedingSpace = pexprs.Apply.prototype.allowsSkippingPrecedingSpace = pexprs.Terminal.prototype.allowsSkippingPrecedingSpace = pexprs.Range.prototype.allowsSkippingPrecedingSpace = pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
            return true;
          };
          pexprs.Alt.prototype.allowsSkippingPrecedingSpace = pexprs.Iter.prototype.allowsSkippingPrecedingSpace = pexprs.Lex.prototype.allowsSkippingPrecedingSpace = pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace = pexprs.Not.prototype.allowsSkippingPrecedingSpace = pexprs.Param.prototype.allowsSkippingPrecedingSpace = pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
            return false;
          };
        }
      });
      var require_Namespace = __commonJS2({
        "node_modules/ohm-js/src/Namespace.js"(exports2, module2) {
          "use strict";
          function Namespace() {
          }
          Namespace.prototype = /* @__PURE__ */ Object.create(null);
          Namespace.asNamespace = function(objOrNamespace) {
            if (objOrNamespace instanceof Namespace) {
              return objOrNamespace;
            }
            return Namespace.createNamespace(objOrNamespace);
          };
          Namespace.createNamespace = function(optProps) {
            return Namespace.extend(Namespace.prototype, optProps);
          };
          Namespace.extend = function(namespace, optProps) {
            if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
              throw new TypeError("not a Namespace object: " + namespace);
            }
            const ns = Object.create(namespace, {
              constructor: {
                value: Namespace,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
            return Object.assign(ns, optProps);
          };
          Namespace.toString = function(ns) {
            return Object.prototype.toString.call(ns);
          };
          module2.exports = Namespace;
        }
      });
      var require_errors = __commonJS2({
        "node_modules/ohm-js/src/errors.js"(exports2, module2) {
          "use strict";
          var { assert } = require_common();
          var Namespace = require_Namespace();
          var pexprs = require_pexprs_main();
          function createError(message, optInterval) {
            let e;
            if (optInterval) {
              e = new Error(optInterval.getLineAndColumnMessage() + message);
              e.shortMessage = message;
              e.interval = optInterval;
            } else {
              e = new Error(message);
            }
            return e;
          }
          function intervalSourcesDontMatch() {
            return createError("Interval sources don't match");
          }
          function grammarSyntaxError(matchFailure) {
            const e = new Error();
            Object.defineProperty(e, "message", {
              enumerable: true,
              get() {
                return matchFailure.message;
              }
            });
            Object.defineProperty(e, "shortMessage", {
              enumerable: true,
              get() {
                return "Expected " + matchFailure.getExpectedText();
              }
            });
            e.interval = matchFailure.getInterval();
            return e;
          }
          function undeclaredGrammar(grammarName, namespace, interval) {
            const message = namespace ? "Grammar " + grammarName + " is not declared in namespace " + Namespace.toString(namespace) : "Undeclared grammar " + grammarName;
            return createError(message, interval);
          }
          function duplicateGrammarDeclaration(grammar3, namespace) {
            return createError("Grammar " + grammar3.name + " is already declared in this namespace");
          }
          function undeclaredRule(ruleName, grammarName, optInterval) {
            return createError("Rule " + ruleName + " is not declared in grammar " + grammarName, optInterval);
          }
          function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
            return createError("Cannot override rule " + ruleName + " because it is not declared in " + grammarName, optSource);
          }
          function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
            return createError("Cannot extend rule " + ruleName + " because it is not declared in " + grammarName, optSource);
          }
          function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, optSource) {
            let message = "Duplicate declaration for rule '" + ruleName + "' in grammar '" + grammarName + "'";
            if (grammarName !== declGrammarName) {
              message += " (originally declared in '" + declGrammarName + "')";
            }
            return createError(message, optSource);
          }
          function wrongNumberOfParameters(ruleName, expected, actual, source) {
            return createError("Wrong number of parameters for rule " + ruleName + " (expected " + expected + ", got " + actual + ")", source);
          }
          function wrongNumberOfArguments(ruleName, expected, actual, expr) {
            return createError("Wrong number of arguments for rule " + ruleName + " (expected " + expected + ", got " + actual + ")", expr);
          }
          function duplicateParameterNames(ruleName, duplicates, source) {
            return createError("Duplicate parameter names in rule " + ruleName + ": " + duplicates.join(", "), source);
          }
          function invalidParameter(ruleName, expr) {
            return createError("Invalid parameter to rule " + ruleName + ": " + expr + " has arity " + expr.getArity() + ", but parameter expressions must have arity 1", expr.source);
          }
          var syntacticVsLexicalNote = "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";
          function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
            return createError("Cannot apply syntactic rule " + ruleName + " from here (inside a lexical context)", applyExpr.source);
          }
          function applySyntacticWithLexicalRuleApplication(applyExpr) {
            const { ruleName } = applyExpr;
            return createError(`applySyntactic is for syntactic rules, but '${ruleName}' is a lexical rule. ` + syntacticVsLexicalNote, applyExpr.source);
          }
          function unnecessaryExperimentalApplySyntactic(applyExpr) {
            return createError("applySyntactic is not required here (in a syntactic context)", applyExpr.source);
          }
          function incorrectArgumentType(expectedType, expr) {
            return createError("Incorrect argument type: expected " + expectedType, expr.source);
          }
          function multipleSuperSplices(expr) {
            return createError("'...' can appear at most once in a rule body", expr.source);
          }
          function invalidCodePoint(applyWrapper) {
            const node = applyWrapper._node;
            assert(node && node.isNonterminal() && node.ctorName === "escapeChar_unicodeCodePoint");
            const digitIntervals = applyWrapper.children.slice(1, -1).map((d) => d.source);
            const fullInterval = digitIntervals[0].coverageWith(...digitIntervals.slice(1));
            return createError(`U+${fullInterval.contents} is not a valid Unicode code point`, fullInterval);
          }
          function kleeneExprHasNullableOperand(kleeneExpr, applicationStack) {
            const actuals = applicationStack.length > 0 ? applicationStack[applicationStack.length - 1].args : [];
            const expr = kleeneExpr.expr.substituteParams(actuals);
            let message = "Nullable expression " + expr + " is not allowed inside '" + kleeneExpr.operator + "' (possible infinite loop)";
            if (applicationStack.length > 0) {
              const stackTrace = applicationStack.map((app) => new pexprs.Apply(app.ruleName, app.args)).join("\n");
              message += "\nApplication stack (most recent application last):\n" + stackTrace;
            }
            return createError(message, kleeneExpr.expr.source);
          }
          function inconsistentArity(ruleName, expected, actual, expr) {
            return createError("Rule " + ruleName + " involves an alternation which has inconsistent arity (expected " + expected + ", got " + actual + ")", expr.source);
          }
          function duplicatePropertyNames(duplicates) {
            return createError("Object pattern has duplicate property names: " + duplicates.join(", "));
          }
          function invalidConstructorCall(grammar3, ctorName, children) {
            return createError("Attempt to invoke constructor " + ctorName + " with invalid or unexpected arguments");
          }
          function multipleErrors(errors) {
            const messages = errors.map((e) => e.message);
            return createError(["Errors:"].concat(messages).join("\n- "), errors[0].interval);
          }
          function missingSemanticAction(ctorName, name, type, stack) {
            let stackTrace = stack.slice(0, -1).map((info) => {
              const ans = "  " + info[0].name + " > " + info[1];
              return info.length === 3 ? ans + " for '" + info[2] + "'" : ans;
            }).join("\n");
            stackTrace += "\n  " + name + " > " + ctorName;
            let moreInfo = "";
            if (ctorName === "_iter") {
              moreInfo = [
                "\nNOTE: as of Ohm v16, there is no default action for iteration nodes \u2014 see ",
                "  https://ohmjs.org/d/dsa for details."
              ].join("\n");
            }
            const message = [
              `Missing semantic action for '${ctorName}' in ${type} '${name}'.${moreInfo}`,
              "Action stack (most recent call last):",
              stackTrace
            ].join("\n");
            const e = createError(message);
            e.name = "missingSemanticAction";
            return e;
          }
          module2.exports = {
            applicationOfSyntacticRuleFromLexicalContext,
            applySyntacticWithLexicalRuleApplication,
            cannotExtendUndeclaredRule,
            cannotOverrideUndeclaredRule,
            duplicateGrammarDeclaration,
            duplicateParameterNames,
            duplicatePropertyNames,
            duplicateRuleDeclaration,
            inconsistentArity,
            incorrectArgumentType,
            intervalSourcesDontMatch,
            invalidCodePoint,
            invalidConstructorCall,
            invalidParameter,
            grammarSyntaxError,
            kleeneExprHasNullableOperand,
            missingSemanticAction,
            multipleSuperSplices,
            undeclaredGrammar,
            undeclaredRule,
            unnecessaryExperimentalApplySyntactic,
            wrongNumberOfArguments,
            wrongNumberOfParameters,
            throwErrors(errors) {
              if (errors.length === 1) {
                throw errors[0];
              }
              if (errors.length > 1) {
                throw multipleErrors(errors);
              }
            }
          };
        }
      });
      var require_util = __commonJS2({
        "node_modules/ohm-js/src/util.js"(exports2) {
          "use strict";
          var common = require_common();
          function padNumbersToEqualLength(arr) {
            let maxLen = 0;
            const strings = arr.map((n) => {
              const str = n.toString();
              maxLen = Math.max(maxLen, str.length);
              return str;
            });
            return strings.map((s) => common.padLeft(s, maxLen));
          }
          function strcpy(dest, src, offset) {
            const origDestLen = dest.length;
            const start = dest.slice(0, offset);
            const end = dest.slice(offset + src.length);
            return (start + src + end).substr(0, origDestLen);
          }
          function lineAndColumnToMessage(...ranges) {
            const lineAndCol = this;
            const { offset } = lineAndCol;
            const { repeatStr } = common;
            const sb = new common.StringBuffer();
            sb.append("Line " + lineAndCol.lineNum + ", col " + lineAndCol.colNum + ":\n");
            const lineNumbers = padNumbersToEqualLength([
              lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
              lineAndCol.lineNum,
              lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
            ]);
            const appendLine = (num, content, prefix) => {
              sb.append(prefix + lineNumbers[num] + " | " + content + "\n");
            };
            if (lineAndCol.prevLine != null) {
              appendLine(0, lineAndCol.prevLine, "  ");
            }
            appendLine(1, lineAndCol.line, "> ");
            const lineLen = lineAndCol.line.length;
            let indicationLine = repeatStr(" ", lineLen + 1);
            for (let i = 0; i < ranges.length; ++i) {
              let startIdx = ranges[i][0];
              let endIdx = ranges[i][1];
              common.assert(startIdx >= 0 && startIdx <= endIdx, "range start must be >= 0 and <= end");
              const lineStartOffset = offset - lineAndCol.colNum + 1;
              startIdx = Math.max(0, startIdx - lineStartOffset);
              endIdx = Math.min(endIdx - lineStartOffset, lineLen);
              indicationLine = strcpy(indicationLine, repeatStr("~", endIdx - startIdx), startIdx);
            }
            const gutterWidth = 2 + lineNumbers[1].length + 3;
            sb.append(repeatStr(" ", gutterWidth));
            indicationLine = strcpy(indicationLine, "^", lineAndCol.colNum - 1);
            sb.append(indicationLine.replace(/ +$/, "") + "\n");
            if (lineAndCol.nextLine != null) {
              appendLine(2, lineAndCol.nextLine, "  ");
            }
            return sb.contents();
          }
          var builtInRulesCallbacks = [];
          exports2.awaitBuiltInRules = (cb) => {
            builtInRulesCallbacks.push(cb);
          };
          exports2.announceBuiltInRules = (grammar3) => {
            builtInRulesCallbacks.forEach((cb) => {
              cb(grammar3);
            });
            builtInRulesCallbacks = null;
          };
          exports2.getLineAndColumn = (str, offset) => {
            let lineNum = 1;
            let colNum = 1;
            let currOffset = 0;
            let lineStartOffset = 0;
            let nextLine = null;
            let prevLine = null;
            let prevLineStartOffset = -1;
            while (currOffset < offset) {
              const c = str.charAt(currOffset++);
              if (c === "\n") {
                lineNum++;
                colNum = 1;
                prevLineStartOffset = lineStartOffset;
                lineStartOffset = currOffset;
              } else if (c !== "\r") {
                colNum++;
              }
            }
            let lineEndOffset = str.indexOf("\n", lineStartOffset);
            if (lineEndOffset === -1) {
              lineEndOffset = str.length;
            } else {
              const nextLineEndOffset = str.indexOf("\n", lineEndOffset + 1);
              nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset) : str.slice(lineEndOffset, nextLineEndOffset);
              nextLine = nextLine.replace(/^\r?\n/, "").replace(/\r$/, "");
            }
            if (prevLineStartOffset >= 0) {
              prevLine = str.slice(prevLineStartOffset, lineStartOffset).replace(/\r?\n$/, "");
            }
            const line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, "");
            return {
              offset,
              lineNum,
              colNum,
              line,
              prevLine,
              nextLine,
              toString: lineAndColumnToMessage
            };
          };
          exports2.getLineAndColumnMessage = function(str, offset, ...ranges) {
            return exports2.getLineAndColumn(str, offset).toString(...ranges);
          };
          exports2.uniqueId = (() => {
            let idCounter = 0;
            return (prefix) => "" + prefix + idCounter++;
          })();
        }
      });
      var require_pexprs_assertAllApplicationsAreValid = __commonJS2({
        "node_modules/ohm-js/src/pexprs-assertAllApplicationsAreValid.js"() {
          "use strict";
          var { abstract, isSyntactic } = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs_main();
          var util = require_util();
          var BuiltInRules;
          util.awaitBuiltInRules((g) => {
            BuiltInRules = g;
          });
          var lexifyCount;
          pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar3) {
            lexifyCount = 0;
            this._assertAllApplicationsAreValid(ruleName, grammar3);
          };
          pexprs.PExpr.prototype._assertAllApplicationsAreValid = abstract("_assertAllApplicationsAreValid");
          pexprs.any._assertAllApplicationsAreValid = pexprs.end._assertAllApplicationsAreValid = pexprs.Terminal.prototype._assertAllApplicationsAreValid = pexprs.Range.prototype._assertAllApplicationsAreValid = pexprs.Param.prototype._assertAllApplicationsAreValid = pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3) {
          };
          pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3) {
            lexifyCount++;
            this.expr._assertAllApplicationsAreValid(ruleName, grammar3);
            lexifyCount--;
          };
          pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3) {
            for (let idx = 0; idx < this.terms.length; idx++) {
              this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar3);
            }
          };
          pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3) {
            for (let idx = 0; idx < this.factors.length; idx++) {
              this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar3);
            }
          };
          pexprs.Iter.prototype._assertAllApplicationsAreValid = pexprs.Not.prototype._assertAllApplicationsAreValid = pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3) {
            this.expr._assertAllApplicationsAreValid(ruleName, grammar3);
          };
          pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar3, skipSyntacticCheck = false) {
            const ruleInfo = grammar3.rules[this.ruleName];
            const isContextSyntactic = isSyntactic(ruleName) && lexifyCount === 0;
            if (!ruleInfo) {
              throw errors.undeclaredRule(this.ruleName, grammar3.name, this.source);
            }
            if (!skipSyntacticCheck && isSyntactic(this.ruleName) && !isContextSyntactic) {
              throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
            }
            const actual = this.args.length;
            const expected = ruleInfo.formals.length;
            if (actual !== expected) {
              throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this.source);
            }
            const isBuiltInApplySyntactic = BuiltInRules && ruleInfo === BuiltInRules.rules.applySyntactic;
            const isBuiltInCaseInsensitive = BuiltInRules && ruleInfo === BuiltInRules.rules.caseInsensitive;
            if (isBuiltInCaseInsensitive) {
              if (!(this.args[0] instanceof pexprs.Terminal)) {
                throw errors.incorrectArgumentType('a Terminal (e.g. "abc")', this.args[0]);
              }
            }
            if (isBuiltInApplySyntactic) {
              const arg = this.args[0];
              if (!(arg instanceof pexprs.Apply)) {
                throw errors.incorrectArgumentType("a syntactic rule application", arg);
              }
              if (!isSyntactic(arg.ruleName)) {
                throw errors.applySyntacticWithLexicalRuleApplication(arg);
              }
              if (isContextSyntactic) {
                throw errors.unnecessaryExperimentalApplySyntactic(this);
              }
            }
            this.args.forEach((arg) => {
              arg._assertAllApplicationsAreValid(ruleName, grammar3, isBuiltInApplySyntactic);
              if (arg.getArity() !== 1) {
                throw errors.invalidParameter(this.ruleName, arg);
              }
            });
          };
        }
      });
      var require_pexprs_assertChoicesHaveUniformArity = __commonJS2({
        "node_modules/ohm-js/src/pexprs-assertChoicesHaveUniformArity.js"() {
          "use strict";
          var common = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract("assertChoicesHaveUniformArity");
          pexprs.any.assertChoicesHaveUniformArity = pexprs.end.assertChoicesHaveUniformArity = pexprs.Terminal.prototype.assertChoicesHaveUniformArity = pexprs.Range.prototype.assertChoicesHaveUniformArity = pexprs.Param.prototype.assertChoicesHaveUniformArity = pexprs.Lex.prototype.assertChoicesHaveUniformArity = pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
          };
          pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
            if (this.terms.length === 0) {
              return;
            }
            const arity = this.terms[0].getArity();
            for (let idx = 0; idx < this.terms.length; idx++) {
              const term = this.terms[idx];
              term.assertChoicesHaveUniformArity();
              const otherArity = term.getArity();
              if (arity !== otherArity) {
                throw errors.inconsistentArity(ruleName, arity, otherArity, term);
              }
            }
          };
          pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
            const actualArity = this.terms[0].getArity();
            const expectedArity = this.terms[1].getArity();
            if (actualArity !== expectedArity) {
              throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
            }
          };
          pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
            for (let idx = 0; idx < this.factors.length; idx++) {
              this.factors[idx].assertChoicesHaveUniformArity(ruleName);
            }
          };
          pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
            this.expr.assertChoicesHaveUniformArity(ruleName);
          };
          pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
          };
          pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
            this.expr.assertChoicesHaveUniformArity(ruleName);
          };
          pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
          };
        }
      });
      var require_pexprs_assertIteratedExprsAreNotNullable = __commonJS2({
        "node_modules/ohm-js/src/pexprs-assertIteratedExprsAreNotNullable.js"() {
          "use strict";
          var common = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract("assertIteratedExprsAreNotNullable");
          pexprs.any.assertIteratedExprsAreNotNullable = pexprs.end.assertIteratedExprsAreNotNullable = pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable = pexprs.Range.prototype.assertIteratedExprsAreNotNullable = pexprs.Param.prototype.assertIteratedExprsAreNotNullable = pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
          };
          pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
            for (let idx = 0; idx < this.terms.length; idx++) {
              this.terms[idx].assertIteratedExprsAreNotNullable(grammar3);
            }
          };
          pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
            for (let idx = 0; idx < this.factors.length; idx++) {
              this.factors[idx].assertIteratedExprsAreNotNullable(grammar3);
            }
          };
          pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
            this.expr.assertIteratedExprsAreNotNullable(grammar3);
            if (this.expr.isNullable(grammar3)) {
              throw errors.kleeneExprHasNullableOperand(this, []);
            }
          };
          pexprs.Opt.prototype.assertIteratedExprsAreNotNullable = pexprs.Not.prototype.assertIteratedExprsAreNotNullable = pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable = pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
            this.expr.assertIteratedExprsAreNotNullable(grammar3);
          };
          pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar3) {
            this.args.forEach((arg) => {
              arg.assertIteratedExprsAreNotNullable(grammar3);
            });
          };
        }
      });
      var require_Interval = __commonJS2({
        "node_modules/ohm-js/src/Interval.js"(exports2, module2) {
          "use strict";
          var { assert } = require_common();
          var errors = require_errors();
          var util = require_util();
          function Interval(sourceString, startIdx, endIdx) {
            this.sourceString = sourceString;
            this.startIdx = startIdx;
            this.endIdx = endIdx;
          }
          Interval.coverage = function(firstInterval, ...intervals) {
            let { startIdx, endIdx } = firstInterval;
            for (const interval of intervals) {
              if (interval.sourceString !== firstInterval.sourceString) {
                throw errors.intervalSourcesDontMatch();
              } else {
                startIdx = Math.min(startIdx, interval.startIdx);
                endIdx = Math.max(endIdx, interval.endIdx);
              }
            }
            return new Interval(firstInterval.sourceString, startIdx, endIdx);
          };
          Interval.prototype = {
            coverageWith(...intervals) {
              return Interval.coverage(...intervals, this);
            },
            collapsedLeft() {
              return new Interval(this.sourceString, this.startIdx, this.startIdx);
            },
            collapsedRight() {
              return new Interval(this.sourceString, this.endIdx, this.endIdx);
            },
            getLineAndColumn() {
              return util.getLineAndColumn(this.sourceString, this.startIdx);
            },
            getLineAndColumnMessage() {
              const range = [this.startIdx, this.endIdx];
              return util.getLineAndColumnMessage(this.sourceString, this.startIdx, range);
            },
            // Returns an array of 0, 1, or 2 intervals that represents the result of the
            // interval difference operation.
            minus(that) {
              if (this.sourceString !== that.sourceString) {
                throw errors.intervalSourcesDontMatch();
              } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
                return [];
              } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
                return [
                  new Interval(this.sourceString, this.startIdx, that.startIdx),
                  new Interval(this.sourceString, that.endIdx, this.endIdx)
                ];
              } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
                return [new Interval(this.sourceString, that.endIdx, this.endIdx)];
              } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
                return [new Interval(this.sourceString, this.startIdx, that.startIdx)];
              } else {
                return [this];
              }
            },
            // Returns a new Interval that has the same extent as this one, but which is relative
            // to `that`, an Interval that fully covers this one.
            relativeTo(that) {
              if (this.sourceString !== that.sourceString) {
                throw errors.intervalSourcesDontMatch();
              }
              assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx, "other interval does not cover this one");
              return new Interval(this.sourceString, this.startIdx - that.startIdx, this.endIdx - that.startIdx);
            },
            // Returns a new Interval which contains the same contents as this one,
            // but with whitespace trimmed from both ends.
            trimmed() {
              const { contents } = this;
              const startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
              const endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
              return new Interval(this.sourceString, startIdx, endIdx);
            },
            subInterval(offset, len) {
              const newStartIdx = this.startIdx + offset;
              return new Interval(this.sourceString, newStartIdx, newStartIdx + len);
            }
          };
          Object.defineProperties(Interval.prototype, {
            contents: {
              get() {
                if (this._contents === void 0) {
                  this._contents = this.sourceString.slice(this.startIdx, this.endIdx);
                }
                return this._contents;
              },
              enumerable: true
            },
            length: {
              get() {
                return this.endIdx - this.startIdx;
              },
              enumerable: true
            }
          });
          module2.exports = Interval;
        }
      });
      var require_Trace = __commonJS2({
        "node_modules/ohm-js/src/Trace.js"(exports2, module2) {
          "use strict";
          var Interval = require_Interval();
          var common = require_common();
          var BALLOT_X = "\u2717";
          var CHECK_MARK = "\u2713";
          var DOT_OPERATOR = "\u22C5";
          var RIGHTWARDS_DOUBLE_ARROW = "\u21D2";
          var SYMBOL_FOR_HORIZONTAL_TABULATION = "\u2409";
          var SYMBOL_FOR_LINE_FEED = "\u240A";
          var SYMBOL_FOR_CARRIAGE_RETURN = "\u240D";
          var Flags = {
            succeeded: 1 << 0,
            isRootNode: 1 << 1,
            isImplicitSpaces: 1 << 2,
            isMemoized: 1 << 3,
            isHeadOfLeftRecursion: 1 << 4,
            terminatesLR: 1 << 5
          };
          function spaces(n) {
            return common.repeat(" ", n).join("");
          }
          function getInputExcerpt(input, pos, len) {
            const excerpt = asEscapedString(input.slice(pos, pos + len));
            if (excerpt.length < len) {
              return excerpt + common.repeat(" ", len - excerpt.length).join("");
            }
            return excerpt;
          }
          function asEscapedString(obj) {
            if (typeof obj === "string") {
              return obj.replace(/ /g, DOT_OPERATOR).replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION).replace(/\n/g, SYMBOL_FOR_LINE_FEED).replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
            }
            return String(obj);
          }
          function Trace(input, pos1, pos2, expr, succeeded, bindings, optChildren) {
            this.input = input;
            this.pos = this.pos1 = pos1;
            this.pos2 = pos2;
            this.source = new Interval(input, pos1, pos2);
            this.expr = expr;
            this.bindings = bindings;
            this.children = optChildren || [];
            this.terminatingLREntry = null;
            this._flags = succeeded ? Flags.succeeded : 0;
          }
          Trace.prototype.SKIP = {};
          Object.defineProperty(Trace.prototype, "displayString", {
            get() {
              return this.expr.toDisplayString();
            }
          });
          Object.keys(Flags).forEach((name) => {
            const mask = Flags[name];
            Object.defineProperty(Trace.prototype, name, {
              get() {
                return (this._flags & mask) !== 0;
              },
              set(val) {
                if (val) {
                  this._flags |= mask;
                } else {
                  this._flags &= ~mask;
                }
              }
            });
          });
          Trace.prototype.clone = function() {
            return this.cloneWithExpr(this.expr);
          };
          Trace.prototype.cloneWithExpr = function(expr) {
            const ans = new Trace(this.input, this.pos, this.pos2, expr, this.succeeded, this.bindings, this.children);
            ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
            ans.isImplicitSpaces = this.isImplicitSpaces;
            ans.isMemoized = this.isMemoized;
            ans.isRootNode = this.isRootNode;
            ans.terminatesLR = this.terminatesLR;
            ans.terminatingLREntry = this.terminatingLREntry;
            return ans;
          };
          Trace.prototype.recordLRTermination = function(ruleBodyTrace, value) {
            this.terminatingLREntry = new Trace(this.input, this.pos, this.pos2, this.expr, false, [value], [ruleBodyTrace]);
            this.terminatingLREntry.terminatesLR = true;
          };
          Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
            let visitor = visitorObjOrFn;
            if (typeof visitor === "function") {
              visitor = { enter: visitor };
            }
            function _walk(node, parent, depth) {
              let recurse = true;
              if (visitor.enter) {
                if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
                  recurse = false;
                }
              }
              if (recurse) {
                node.children.forEach((child) => {
                  _walk(child, node, depth + 1);
                });
                if (visitor.exit) {
                  visitor.exit.call(optThisArg, node, parent, depth);
                }
              }
            }
            if (this.isRootNode) {
              this.children.forEach((c) => {
                _walk(c, null, 0);
              });
            } else {
              _walk(this, null, 0);
            }
          };
          Trace.prototype.toString = function() {
            const sb = new common.StringBuffer();
            this.walk((node, parent, depth) => {
              if (!node) {
                return this.SKIP;
              }
              const ctorName = node.expr.constructor.name;
              if (ctorName === "Alt") {
                return;
              }
              sb.append(getInputExcerpt(node.input, node.pos, 10) + spaces(depth * 2 + 1));
              sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + " " + node.displayString);
              if (node.isHeadOfLeftRecursion) {
                sb.append(" (LR)");
              }
              if (node.succeeded) {
                const contents = asEscapedString(node.source.contents);
                sb.append(" " + RIGHTWARDS_DOUBLE_ARROW + "  ");
                sb.append(typeof contents === "string" ? '"' + contents + '"' : contents);
              }
              sb.append("\n");
            });
            return sb.contents();
          };
          module2.exports = Trace;
        }
      });
      var require_pexprs_eval = __commonJS2({
        "node_modules/ohm-js/src/pexprs-eval.js"() {
          "use strict";
          var Trace = require_Trace();
          var common = require_common();
          var errors = require_errors();
          var nodes = require_nodes();
          var pexprs = require_pexprs_main();
          var { TerminalNode } = nodes;
          var { NonterminalNode } = nodes;
          var { IterationNode } = nodes;
          pexprs.PExpr.prototype.eval = common.abstract("eval");
          pexprs.any.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            const ch = inputStream.next();
            if (ch) {
              state.pushBinding(new TerminalNode(ch.length), origPos);
              return true;
            } else {
              state.processFailure(origPos, this);
              return false;
            }
          };
          pexprs.end.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            if (inputStream.atEnd()) {
              state.pushBinding(new TerminalNode(0), origPos);
              return true;
            } else {
              state.processFailure(origPos, this);
              return false;
            }
          };
          pexprs.Terminal.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            if (!inputStream.matchString(this.obj)) {
              state.processFailure(origPos, this);
              return false;
            } else {
              state.pushBinding(new TerminalNode(this.obj.length), origPos);
              return true;
            }
          };
          pexprs.Range.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            const cp = this.matchCodePoint ? inputStream.nextCodePoint() : inputStream.nextCharCode();
            if (cp !== void 0 && this.from.codePointAt(0) <= cp && cp <= this.to.codePointAt(0)) {
              state.pushBinding(new TerminalNode(String.fromCodePoint(cp).length), origPos);
              return true;
            } else {
              state.processFailure(origPos, this);
              return false;
            }
          };
          pexprs.Param.prototype.eval = function(state) {
            return state.eval(state.currentApplication().args[this.index]);
          };
          pexprs.Lex.prototype.eval = function(state) {
            state.enterLexifiedContext();
            const ans = state.eval(this.expr);
            state.exitLexifiedContext();
            return ans;
          };
          pexprs.Alt.prototype.eval = function(state) {
            for (let idx = 0; idx < this.terms.length; idx++) {
              if (state.eval(this.terms[idx])) {
                return true;
              }
            }
            return false;
          };
          pexprs.Seq.prototype.eval = function(state) {
            for (let idx = 0; idx < this.factors.length; idx++) {
              const factor = this.factors[idx];
              if (!state.eval(factor)) {
                return false;
              }
            }
            return true;
          };
          pexprs.Iter.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            const arity = this.getArity();
            const cols = [];
            const colOffsets = [];
            while (cols.length < arity) {
              cols.push([]);
              colOffsets.push([]);
            }
            let numMatches = 0;
            let prevPos = origPos;
            let idx;
            while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
              if (inputStream.pos === prevPos) {
                throw errors.kleeneExprHasNullableOperand(this, state._applicationStack);
              }
              prevPos = inputStream.pos;
              numMatches++;
              const row = state._bindings.splice(state._bindings.length - arity, arity);
              const rowOffsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
              for (idx = 0; idx < row.length; idx++) {
                cols[idx].push(row[idx]);
                colOffsets[idx].push(rowOffsets[idx]);
              }
            }
            if (numMatches < this.minNumMatches) {
              return false;
            }
            let offset = state.posToOffset(origPos);
            let matchLength = 0;
            if (numMatches > 0) {
              const lastCol = cols[arity - 1];
              const lastColOffsets = colOffsets[arity - 1];
              const endOffset = lastColOffsets[lastColOffsets.length - 1] + lastCol[lastCol.length - 1].matchLength;
              offset = colOffsets[0][0];
              matchLength = endOffset - offset;
            }
            const isOptional = this instanceof pexprs.Opt;
            for (idx = 0; idx < cols.length; idx++) {
              state._bindings.push(new IterationNode(cols[idx], colOffsets[idx], matchLength, isOptional));
              state._bindingOffsets.push(offset);
            }
            return true;
          };
          pexprs.Not.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            state.pushFailuresInfo();
            const ans = state.eval(this.expr);
            state.popFailuresInfo();
            if (ans) {
              state.processFailure(origPos, this);
              return false;
            }
            inputStream.pos = origPos;
            return true;
          };
          pexprs.Lookahead.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            if (state.eval(this.expr)) {
              inputStream.pos = origPos;
              return true;
            } else {
              return false;
            }
          };
          pexprs.Apply.prototype.eval = function(state) {
            const caller = state.currentApplication();
            const actuals = caller ? caller.args : [];
            const app = this.substituteParams(actuals);
            const posInfo = state.getCurrentPosInfo();
            if (posInfo.isActive(app)) {
              return app.handleCycle(state);
            }
            const memoKey = app.toMemoKey();
            const memoRec = posInfo.memo[memoKey];
            if (memoRec && posInfo.shouldUseMemoizedResult(memoRec)) {
              if (state.hasNecessaryInfo(memoRec)) {
                return state.useMemoizedResult(state.inputStream.pos, memoRec);
              }
              delete posInfo.memo[memoKey];
            }
            return app.reallyEval(state);
          };
          pexprs.Apply.prototype.handleCycle = function(state) {
            const posInfo = state.getCurrentPosInfo();
            const { currentLeftRecursion } = posInfo;
            const memoKey = this.toMemoKey();
            let memoRec = posInfo.memo[memoKey];
            if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
              memoRec.updateInvolvedApplicationMemoKeys();
            } else if (!memoRec) {
              memoRec = posInfo.memoize(memoKey, {
                matchLength: 0,
                examinedLength: 0,
                value: false,
                rightmostFailureOffset: -1
              });
              posInfo.startLeftRecursion(this, memoRec);
            }
            return state.useMemoizedResult(state.inputStream.pos, memoRec);
          };
          pexprs.Apply.prototype.reallyEval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            const origPosInfo = state.getCurrentPosInfo();
            const ruleInfo = state.grammar.rules[this.ruleName];
            const { body } = ruleInfo;
            const { description } = ruleInfo;
            state.enterApplication(origPosInfo, this);
            if (description) {
              state.pushFailuresInfo();
            }
            const origInputStreamExaminedLength = inputStream.examinedLength;
            inputStream.examinedLength = 0;
            let value = this.evalOnce(body, state);
            const currentLR = origPosInfo.currentLeftRecursion;
            const memoKey = this.toMemoKey();
            const isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
            let memoRec;
            if (isHeadOfLeftRecursion) {
              value = this.growSeedResult(body, state, origPos, currentLR, value);
              origPosInfo.endLeftRecursion();
              memoRec = currentLR;
              memoRec.examinedLength = inputStream.examinedLength - origPos;
              memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
              origPosInfo.memoize(memoKey, memoRec);
            } else if (!currentLR || !currentLR.isInvolved(memoKey)) {
              memoRec = origPosInfo.memoize(memoKey, {
                matchLength: inputStream.pos - origPos,
                examinedLength: inputStream.examinedLength - origPos,
                value,
                failuresAtRightmostPosition: state.cloneRecordedFailures(),
                rightmostFailureOffset: state._getRightmostFailureOffset()
              });
            }
            const succeeded = !!value;
            if (description) {
              state.popFailuresInfo();
              if (!succeeded) {
                state.processFailure(origPos, this);
              }
              if (memoRec) {
                memoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
              }
            }
            if (state.isTracing() && memoRec) {
              const entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
              if (isHeadOfLeftRecursion) {
                common.assert(entry.terminatingLREntry != null || !succeeded);
                entry.isHeadOfLeftRecursion = true;
              }
              memoRec.traceEntry = entry;
            }
            inputStream.examinedLength = Math.max(inputStream.examinedLength, origInputStreamExaminedLength);
            state.exitApplication(origPosInfo, value);
            return succeeded;
          };
          pexprs.Apply.prototype.evalOnce = function(expr, state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            if (state.eval(expr)) {
              const arity = expr.getArity();
              const bindings = state._bindings.splice(state._bindings.length - arity, arity);
              const offsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
              const matchLength = inputStream.pos - origPos;
              return new NonterminalNode(this.ruleName, bindings, offsets, matchLength);
            } else {
              return false;
            }
          };
          pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
            if (!newValue) {
              return false;
            }
            const { inputStream } = state;
            while (true) {
              lrMemoRec.matchLength = inputStream.pos - origPos;
              lrMemoRec.value = newValue;
              lrMemoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
              if (state.isTracing()) {
                const seedTrace = state.trace[state.trace.length - 1];
                lrMemoRec.traceEntry = new Trace(state.input, origPos, inputStream.pos, this, true, [newValue], [seedTrace.clone()]);
              }
              inputStream.pos = origPos;
              newValue = this.evalOnce(body, state);
              if (inputStream.pos - origPos <= lrMemoRec.matchLength) {
                break;
              }
              if (state.isTracing()) {
                state.trace.splice(-2, 1);
              }
            }
            if (state.isTracing()) {
              lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
            }
            inputStream.pos = origPos + lrMemoRec.matchLength;
            return lrMemoRec.value;
          };
          pexprs.UnicodeChar.prototype.eval = function(state) {
            const { inputStream } = state;
            const origPos = inputStream.pos;
            const ch = inputStream.next();
            if (ch && this.pattern.test(ch)) {
              state.pushBinding(new TerminalNode(ch.length), origPos);
              return true;
            } else {
              state.processFailure(origPos, this);
              return false;
            }
          };
        }
      });
      var require_pexprs_getArity = __commonJS2({
        "node_modules/ohm-js/src/pexprs-getArity.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.getArity = common.abstract("getArity");
          pexprs.any.getArity = pexprs.end.getArity = pexprs.Terminal.prototype.getArity = pexprs.Range.prototype.getArity = pexprs.Param.prototype.getArity = pexprs.Apply.prototype.getArity = pexprs.UnicodeChar.prototype.getArity = function() {
            return 1;
          };
          pexprs.Alt.prototype.getArity = function() {
            return this.terms.length === 0 ? 0 : this.terms[0].getArity();
          };
          pexprs.Seq.prototype.getArity = function() {
            let arity = 0;
            for (let idx = 0; idx < this.factors.length; idx++) {
              arity += this.factors[idx].getArity();
            }
            return arity;
          };
          pexprs.Iter.prototype.getArity = function() {
            return this.expr.getArity();
          };
          pexprs.Not.prototype.getArity = function() {
            return 0;
          };
          pexprs.Lookahead.prototype.getArity = pexprs.Lex.prototype.getArity = function() {
            return this.expr.getArity();
          };
        }
      });
      var require_pexprs_outputRecipe = __commonJS2({
        "node_modules/ohm-js/src/pexprs-outputRecipe.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          function getMetaInfo(expr, grammarInterval) {
            const metaInfo = {};
            if (expr.source && grammarInterval) {
              const adjusted = expr.source.relativeTo(grammarInterval);
              metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
            }
            return metaInfo;
          }
          pexprs.PExpr.prototype.outputRecipe = common.abstract("outputRecipe");
          pexprs.any.outputRecipe = function(formals, grammarInterval) {
            return ["any", getMetaInfo(this, grammarInterval)];
          };
          pexprs.end.outputRecipe = function(formals, grammarInterval) {
            return ["end", getMetaInfo(this, grammarInterval)];
          };
          pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["terminal", getMetaInfo(this, grammarInterval), this.obj];
          };
          pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["range", getMetaInfo(this, grammarInterval), this.from, this.to];
          };
          pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["param", getMetaInfo(this, grammarInterval), this.index];
          };
          pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["alt", getMetaInfo(this, grammarInterval)].concat(this.terms.map((term) => term.outputRecipe(formals, grammarInterval)));
          };
          pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
            const extension = this.terms[0];
            return extension.outputRecipe(formals, grammarInterval);
          };
          pexprs.Splice.prototype.outputRecipe = function(formals, grammarInterval) {
            const beforeTerms = this.terms.slice(0, this.expansionPos);
            const afterTerms = this.terms.slice(this.expansionPos + 1);
            return [
              "splice",
              getMetaInfo(this, grammarInterval),
              beforeTerms.map((term) => term.outputRecipe(formals, grammarInterval)),
              afterTerms.map((term) => term.outputRecipe(formals, grammarInterval))
            ];
          };
          pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["seq", getMetaInfo(this, grammarInterval)].concat(this.factors.map((factor) => factor.outputRecipe(formals, grammarInterval)));
          };
          pexprs.Star.prototype.outputRecipe = pexprs.Plus.prototype.outputRecipe = pexprs.Opt.prototype.outputRecipe = pexprs.Not.prototype.outputRecipe = pexprs.Lookahead.prototype.outputRecipe = pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
            return [
              this.constructor.name.toLowerCase(),
              getMetaInfo(this, grammarInterval),
              this.expr.outputRecipe(formals, grammarInterval)
            ];
          };
          pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
            return [
              "app",
              getMetaInfo(this, grammarInterval),
              this.ruleName,
              this.args.map((arg) => arg.outputRecipe(formals, grammarInterval))
            ];
          };
          pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
            return ["unicodeChar", getMetaInfo(this, grammarInterval), this.category];
          };
        }
      });
      var require_pexprs_introduceParams = __commonJS2({
        "node_modules/ohm-js/src/pexprs-introduceParams.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.introduceParams = common.abstract("introduceParams");
          pexprs.any.introduceParams = pexprs.end.introduceParams = pexprs.Terminal.prototype.introduceParams = pexprs.Range.prototype.introduceParams = pexprs.Param.prototype.introduceParams = pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
            return this;
          };
          pexprs.Alt.prototype.introduceParams = function(formals) {
            this.terms.forEach((term, idx, terms) => {
              terms[idx] = term.introduceParams(formals);
            });
            return this;
          };
          pexprs.Seq.prototype.introduceParams = function(formals) {
            this.factors.forEach((factor, idx, factors) => {
              factors[idx] = factor.introduceParams(formals);
            });
            return this;
          };
          pexprs.Iter.prototype.introduceParams = pexprs.Not.prototype.introduceParams = pexprs.Lookahead.prototype.introduceParams = pexprs.Lex.prototype.introduceParams = function(formals) {
            this.expr = this.expr.introduceParams(formals);
            return this;
          };
          pexprs.Apply.prototype.introduceParams = function(formals) {
            const index = formals.indexOf(this.ruleName);
            if (index >= 0) {
              if (this.args.length > 0) {
                throw new Error("Parameterized rules cannot be passed as arguments to another rule.");
              }
              return new pexprs.Param(index).withSource(this.source);
            } else {
              this.args.forEach((arg, idx, args) => {
                args[idx] = arg.introduceParams(formals);
              });
              return this;
            }
          };
        }
      });
      var require_pexprs_isNullable = __commonJS2({
        "node_modules/ohm-js/src/pexprs-isNullable.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.isNullable = function(grammar3) {
            return this._isNullable(grammar3, /* @__PURE__ */ Object.create(null));
          };
          pexprs.PExpr.prototype._isNullable = common.abstract("_isNullable");
          pexprs.any._isNullable = pexprs.Range.prototype._isNullable = pexprs.Param.prototype._isNullable = pexprs.Plus.prototype._isNullable = pexprs.UnicodeChar.prototype._isNullable = function(grammar3, memo) {
            return false;
          };
          pexprs.end._isNullable = function(grammar3, memo) {
            return true;
          };
          pexprs.Terminal.prototype._isNullable = function(grammar3, memo) {
            if (typeof this.obj === "string") {
              return this.obj === "";
            } else {
              return false;
            }
          };
          pexprs.Alt.prototype._isNullable = function(grammar3, memo) {
            return this.terms.length === 0 || this.terms.some((term) => term._isNullable(grammar3, memo));
          };
          pexprs.Seq.prototype._isNullable = function(grammar3, memo) {
            return this.factors.every((factor) => factor._isNullable(grammar3, memo));
          };
          pexprs.Star.prototype._isNullable = pexprs.Opt.prototype._isNullable = pexprs.Not.prototype._isNullable = pexprs.Lookahead.prototype._isNullable = function(grammar3, memo) {
            return true;
          };
          pexprs.Lex.prototype._isNullable = function(grammar3, memo) {
            return this.expr._isNullable(grammar3, memo);
          };
          pexprs.Apply.prototype._isNullable = function(grammar3, memo) {
            const key = this.toMemoKey();
            if (!Object.prototype.hasOwnProperty.call(memo, key)) {
              const { body } = grammar3.rules[this.ruleName];
              const inlined = body.substituteParams(this.args);
              memo[key] = false;
              memo[key] = inlined._isNullable(grammar3, memo);
            }
            return memo[key];
          };
        }
      });
      var require_pexprs_substituteParams = __commonJS2({
        "node_modules/ohm-js/src/pexprs-substituteParams.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.substituteParams = common.abstract("substituteParams");
          pexprs.any.substituteParams = pexprs.end.substituteParams = pexprs.Terminal.prototype.substituteParams = pexprs.Range.prototype.substituteParams = pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
            return this;
          };
          pexprs.Param.prototype.substituteParams = function(actuals) {
            return actuals[this.index];
          };
          pexprs.Alt.prototype.substituteParams = function(actuals) {
            return new pexprs.Alt(this.terms.map((term) => term.substituteParams(actuals)));
          };
          pexprs.Seq.prototype.substituteParams = function(actuals) {
            return new pexprs.Seq(this.factors.map((factor) => factor.substituteParams(actuals)));
          };
          pexprs.Iter.prototype.substituteParams = pexprs.Not.prototype.substituteParams = pexprs.Lookahead.prototype.substituteParams = pexprs.Lex.prototype.substituteParams = function(actuals) {
            return new this.constructor(this.expr.substituteParams(actuals));
          };
          pexprs.Apply.prototype.substituteParams = function(actuals) {
            if (this.args.length === 0) {
              return this;
            } else {
              const args = this.args.map((arg) => arg.substituteParams(actuals));
              return new pexprs.Apply(this.ruleName, args);
            }
          };
        }
      });
      var require_pexprs_toArgumentNameList = __commonJS2({
        "node_modules/ohm-js/src/pexprs-toArgumentNameList.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          var { copyWithoutDuplicates } = common;
          function isRestrictedJSIdentifier(str) {
            return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
          }
          function resolveDuplicatedNames(argumentNameList) {
            const count = /* @__PURE__ */ Object.create(null);
            argumentNameList.forEach((argName) => {
              count[argName] = (count[argName] || 0) + 1;
            });
            Object.keys(count).forEach((dupArgName) => {
              if (count[dupArgName] <= 1) {
                return;
              }
              let subscript = 1;
              argumentNameList.forEach((argName, idx) => {
                if (argName === dupArgName) {
                  argumentNameList[idx] = argName + "_" + subscript++;
                }
              });
            });
          }
          pexprs.PExpr.prototype.toArgumentNameList = common.abstract("toArgumentNameList");
          pexprs.any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return ["any"];
          };
          pexprs.end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return ["end"];
          };
          pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            if (typeof this.obj === "string" && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
              return ["_" + this.obj];
            } else {
              return ["$" + firstArgIndex];
            }
          };
          pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            let argName = this.from + "_to_" + this.to;
            if (!isRestrictedJSIdentifier(argName)) {
              argName = "_" + argName;
            }
            if (!isRestrictedJSIdentifier(argName)) {
              argName = "$" + firstArgIndex;
            }
            return [argName];
          };
          pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            const termArgNameLists = this.terms.map((term) => term.toArgumentNameList(firstArgIndex, true));
            const argumentNameList = [];
            const numArgs = termArgNameLists[0].length;
            for (let colIdx = 0; colIdx < numArgs; colIdx++) {
              const col = [];
              for (let rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
                col.push(termArgNameLists[rowIdx][colIdx]);
              }
              const uniqueNames = copyWithoutDuplicates(col);
              argumentNameList.push(uniqueNames.join("_or_"));
            }
            if (!noDupCheck) {
              resolveDuplicatedNames(argumentNameList);
            }
            return argumentNameList;
          };
          pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            let argumentNameList = [];
            this.factors.forEach((factor) => {
              const factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
              argumentNameList = argumentNameList.concat(factorArgumentNameList);
              firstArgIndex += factorArgumentNameList.length;
            });
            if (!noDupCheck) {
              resolveDuplicatedNames(argumentNameList);
            }
            return argumentNameList;
          };
          pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            const argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map((exprArgumentString) => exprArgumentString[exprArgumentString.length - 1] === "s" ? exprArgumentString + "es" : exprArgumentString + "s");
            if (!noDupCheck) {
              resolveDuplicatedNames(argumentNameList);
            }
            return argumentNameList;
          };
          pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map((argName) => {
              return "opt" + argName[0].toUpperCase() + argName.slice(1);
            });
          };
          pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return [];
          };
          pexprs.Lookahead.prototype.toArgumentNameList = pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
          };
          pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return [this.ruleName];
          };
          pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return ["$" + firstArgIndex];
          };
          pexprs.Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
            return ["param" + this.index];
          };
        }
      });
      var require_pexprs_toDisplayString = __commonJS2({
        "node_modules/ohm-js/src/pexprs-toDisplayString.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.toDisplayString = common.abstract("toDisplayString");
          pexprs.Alt.prototype.toDisplayString = pexprs.Seq.prototype.toDisplayString = function() {
            if (this.source) {
              return this.source.trimmed().contents;
            }
            return "[" + this.constructor.name + "]";
          };
          pexprs.any.toDisplayString = pexprs.end.toDisplayString = pexprs.Iter.prototype.toDisplayString = pexprs.Not.prototype.toDisplayString = pexprs.Lookahead.prototype.toDisplayString = pexprs.Lex.prototype.toDisplayString = pexprs.Terminal.prototype.toDisplayString = pexprs.Range.prototype.toDisplayString = pexprs.Param.prototype.toDisplayString = function() {
            return this.toString();
          };
          pexprs.Apply.prototype.toDisplayString = function() {
            if (this.args.length > 0) {
              const ps = this.args.map((arg) => arg.toDisplayString());
              return this.ruleName + "<" + ps.join(",") + ">";
            } else {
              return this.ruleName;
            }
          };
          pexprs.UnicodeChar.prototype.toDisplayString = function() {
            return "Unicode [" + this.category + "] character";
          };
        }
      });
      var require_pexprs_toFailure = __commonJS2({
        "node_modules/ohm-js/src/pexprs-toFailure.js"() {
          "use strict";
          var Failure = require_Failure();
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.toFailure = common.abstract("toFailure");
          pexprs.any.toFailure = function(grammar3) {
            return new Failure(this, "any object", "description");
          };
          pexprs.end.toFailure = function(grammar3) {
            return new Failure(this, "end of input", "description");
          };
          pexprs.Terminal.prototype.toFailure = function(grammar3) {
            return new Failure(this, this.obj, "string");
          };
          pexprs.Range.prototype.toFailure = function(grammar3) {
            return new Failure(this, JSON.stringify(this.from) + ".." + JSON.stringify(this.to), "code");
          };
          pexprs.Not.prototype.toFailure = function(grammar3) {
            const description = this.expr === pexprs.any ? "nothing" : "not " + this.expr.toFailure(grammar3);
            return new Failure(this, description, "description");
          };
          pexprs.Lookahead.prototype.toFailure = function(grammar3) {
            return this.expr.toFailure(grammar3);
          };
          pexprs.Apply.prototype.toFailure = function(grammar3) {
            let { description } = grammar3.rules[this.ruleName];
            if (!description) {
              const article = /^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a";
              description = article + " " + this.ruleName;
            }
            return new Failure(this, description, "description");
          };
          pexprs.UnicodeChar.prototype.toFailure = function(grammar3) {
            return new Failure(this, "a Unicode [" + this.category + "] character", "description");
          };
          pexprs.Alt.prototype.toFailure = function(grammar3) {
            const fs = this.terms.map((t) => t.toFailure(grammar3));
            const description = "(" + fs.join(" or ") + ")";
            return new Failure(this, description, "description");
          };
          pexprs.Seq.prototype.toFailure = function(grammar3) {
            const fs = this.factors.map((f) => f.toFailure(grammar3));
            const description = "(" + fs.join(" ") + ")";
            return new Failure(this, description, "description");
          };
          pexprs.Iter.prototype.toFailure = function(grammar3) {
            const description = "(" + this.expr.toFailure(grammar3) + this.operator + ")";
            return new Failure(this, description, "description");
          };
        }
      });
      var require_pexprs_toString = __commonJS2({
        "node_modules/ohm-js/src/pexprs-toString.js"() {
          "use strict";
          var common = require_common();
          var pexprs = require_pexprs_main();
          pexprs.PExpr.prototype.toString = common.abstract("toString");
          pexprs.any.toString = function() {
            return "any";
          };
          pexprs.end.toString = function() {
            return "end";
          };
          pexprs.Terminal.prototype.toString = function() {
            return JSON.stringify(this.obj);
          };
          pexprs.Range.prototype.toString = function() {
            return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
          };
          pexprs.Param.prototype.toString = function() {
            return "$" + this.index;
          };
          pexprs.Lex.prototype.toString = function() {
            return "#(" + this.expr.toString() + ")";
          };
          pexprs.Alt.prototype.toString = function() {
            return this.terms.length === 1 ? this.terms[0].toString() : "(" + this.terms.map((term) => term.toString()).join(" | ") + ")";
          };
          pexprs.Seq.prototype.toString = function() {
            return this.factors.length === 1 ? this.factors[0].toString() : "(" + this.factors.map((factor) => factor.toString()).join(" ") + ")";
          };
          pexprs.Iter.prototype.toString = function() {
            return this.expr + this.operator;
          };
          pexprs.Not.prototype.toString = function() {
            return "~" + this.expr;
          };
          pexprs.Lookahead.prototype.toString = function() {
            return "&" + this.expr;
          };
          pexprs.Apply.prototype.toString = function() {
            if (this.args.length > 0) {
              const ps = this.args.map((arg) => arg.toString());
              return this.ruleName + "<" + ps.join(",") + ">";
            } else {
              return this.ruleName;
            }
          };
          pexprs.UnicodeChar.prototype.toString = function() {
            return "\\p{" + this.category + "}";
          };
        }
      });
      var require_pexprs = __commonJS2({
        "node_modules/ohm-js/src/pexprs.js"(exports2, module2) {
          "use strict";
          module2.exports = require_pexprs_main();
          require_pexprs_allowsSkippingPrecedingSpace();
          require_pexprs_assertAllApplicationsAreValid();
          require_pexprs_assertChoicesHaveUniformArity();
          require_pexprs_assertIteratedExprsAreNotNullable();
          require_pexprs_eval();
          require_pexprs_getArity();
          require_pexprs_outputRecipe();
          require_pexprs_introduceParams();
          require_pexprs_isNullable();
          require_pexprs_substituteParams();
          require_pexprs_toArgumentNameList();
          require_pexprs_toDisplayString();
          require_pexprs_toFailure();
          require_pexprs_toString();
        }
      });
      var require_CaseInsensitiveTerminal = __commonJS2({
        "node_modules/ohm-js/src/CaseInsensitiveTerminal.js"(exports2, module2) {
          "use strict";
          var Failure = require_Failure();
          var { TerminalNode } = require_nodes();
          var { assert } = require_common();
          var { PExpr, Terminal } = require_pexprs();
          var CaseInsensitiveTerminal = class extends PExpr {
            constructor(param) {
              super();
              this.obj = param;
            }
            _getString(state) {
              const terminal = state.currentApplication().args[this.obj.index];
              assert(terminal instanceof Terminal, "expected a Terminal expression");
              return terminal.obj;
            }
            // Implementation of the PExpr API
            allowsSkippingPrecedingSpace() {
              return true;
            }
            eval(state) {
              const { inputStream } = state;
              const origPos = inputStream.pos;
              const matchStr = this._getString(state);
              if (!inputStream.matchString(matchStr, true)) {
                state.processFailure(origPos, this);
                return false;
              } else {
                state.pushBinding(new TerminalNode(matchStr.length), origPos);
                return true;
              }
            }
            getArity() {
              return 1;
            }
            substituteParams(actuals) {
              return new CaseInsensitiveTerminal(this.obj.substituteParams(actuals));
            }
            toDisplayString() {
              return this.obj.toDisplayString() + " (case-insensitive)";
            }
            toFailure(grammar3) {
              return new Failure(this, this.obj.toFailure(grammar3) + " (case-insensitive)", "description");
            }
            _isNullable(grammar3, memo) {
              return this.obj._isNullable(grammar3, memo);
            }
          };
          module2.exports = CaseInsensitiveTerminal;
        }
      });
      var require_InputStream = __commonJS2({
        "node_modules/ohm-js/src/InputStream.js"(exports2, module2) {
          "use strict";
          var Interval = require_Interval();
          function InputStream(source) {
            this.source = source;
            this.pos = 0;
            this.examinedLength = 0;
          }
          InputStream.prototype = {
            atEnd() {
              const ans = this.pos === this.source.length;
              this.examinedLength = Math.max(this.examinedLength, this.pos + 1);
              return ans;
            },
            next() {
              const ans = this.source[this.pos++];
              this.examinedLength = Math.max(this.examinedLength, this.pos);
              return ans;
            },
            nextCharCode() {
              const nextChar = this.next();
              return nextChar && nextChar.charCodeAt(0);
            },
            nextCodePoint() {
              const cp = this.source.slice(this.pos++).codePointAt(0);
              if (cp > 65535) {
                this.pos += 1;
              }
              this.examinedLength = Math.max(this.examinedLength, this.pos);
              return cp;
            },
            matchString(s, optIgnoreCase) {
              let idx;
              if (optIgnoreCase) {
                for (idx = 0; idx < s.length; idx++) {
                  const actual = this.next();
                  const expected = s[idx];
                  if (actual == null || actual.toUpperCase() !== expected.toUpperCase()) {
                    return false;
                  }
                }
                return true;
              }
              for (idx = 0; idx < s.length; idx++) {
                if (this.next() !== s[idx]) {
                  return false;
                }
              }
              return true;
            },
            sourceSlice(startIdx, endIdx) {
              return this.source.slice(startIdx, endIdx);
            },
            interval(startIdx, optEndIdx) {
              return new Interval(this.source, startIdx, optEndIdx ? optEndIdx : this.pos);
            }
          };
          module2.exports = InputStream;
        }
      });
      var require_MatchResult = __commonJS2({
        "node_modules/ohm-js/src/MatchResult.js"(exports2, module2) {
          "use strict";
          var common = require_common();
          var util = require_util();
          var Interval = require_Interval();
          function MatchResult(matcher, input, startExpr, cst, cstOffset, rightmostFailurePosition, optRecordedFailures) {
            this.matcher = matcher;
            this.input = input;
            this.startExpr = startExpr;
            this._cst = cst;
            this._cstOffset = cstOffset;
            this._rightmostFailurePosition = rightmostFailurePosition;
            this._rightmostFailures = optRecordedFailures;
            if (this.failed()) {
              common.defineLazyProperty(this, "message", function() {
                const detail = "Expected " + this.getExpectedText();
                return util.getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + detail;
              });
              common.defineLazyProperty(this, "shortMessage", function() {
                const detail = "expected " + this.getExpectedText();
                const errorInfo = util.getLineAndColumn(this.input, this.getRightmostFailurePosition());
                return "Line " + errorInfo.lineNum + ", col " + errorInfo.colNum + ": " + detail;
              });
            }
          }
          MatchResult.prototype.succeeded = function() {
            return !!this._cst;
          };
          MatchResult.prototype.failed = function() {
            return !this.succeeded();
          };
          MatchResult.prototype.getRightmostFailurePosition = function() {
            return this._rightmostFailurePosition;
          };
          MatchResult.prototype.getRightmostFailures = function() {
            if (!this._rightmostFailures) {
              this.matcher.setInput(this.input);
              const matchResultWithFailures = this.matcher._match(this.startExpr, false, this.getRightmostFailurePosition());
              this._rightmostFailures = matchResultWithFailures.getRightmostFailures();
            }
            return this._rightmostFailures;
          };
          MatchResult.prototype.toString = function() {
            return this.succeeded() ? "[match succeeded]" : "[match failed at position " + this.getRightmostFailurePosition() + "]";
          };
          MatchResult.prototype.getExpectedText = function() {
            if (this.succeeded()) {
              throw new Error("cannot get expected text of a successful MatchResult");
            }
            const sb = new common.StringBuffer();
            let failures = this.getRightmostFailures();
            failures = failures.filter((failure) => !failure.isFluffy());
            for (let idx = 0; idx < failures.length; idx++) {
              if (idx > 0) {
                if (idx === failures.length - 1) {
                  sb.append(failures.length > 2 ? ", or " : " or ");
                } else {
                  sb.append(", ");
                }
              }
              sb.append(failures[idx].toString());
            }
            return sb.contents();
          };
          MatchResult.prototype.getInterval = function() {
            const pos = this.getRightmostFailurePosition();
            return new Interval(this.input, pos, pos);
          };
          module2.exports = MatchResult;
        }
      });
      var require_PosInfo = __commonJS2({
        "node_modules/ohm-js/src/PosInfo.js"(exports2, module2) {
          "use strict";
          function PosInfo() {
            this.applicationMemoKeyStack = [];
            this.memo = {};
            this.maxExaminedLength = 0;
            this.maxRightmostFailureOffset = -1;
            this.currentLeftRecursion = void 0;
          }
          PosInfo.prototype = {
            isActive(application) {
              return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
            },
            enter(application) {
              this.applicationMemoKeyStack.push(application.toMemoKey());
            },
            exit() {
              this.applicationMemoKeyStack.pop();
            },
            startLeftRecursion(headApplication, memoRec) {
              memoRec.isLeftRecursion = true;
              memoRec.headApplication = headApplication;
              memoRec.nextLeftRecursion = this.currentLeftRecursion;
              this.currentLeftRecursion = memoRec;
              const { applicationMemoKeyStack } = this;
              const indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
              const involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);
              memoRec.isInvolved = function(applicationMemoKey) {
                return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
              };
              memoRec.updateInvolvedApplicationMemoKeys = function() {
                for (let idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
                  const applicationMemoKey = applicationMemoKeyStack[idx];
                  if (!this.isInvolved(applicationMemoKey)) {
                    involvedApplicationMemoKeys.push(applicationMemoKey);
                  }
                }
              };
            },
            endLeftRecursion() {
              this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
            },
            // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
            // the memoized result (which starts out being a failure) is always used.
            shouldUseMemoizedResult(memoRec) {
              if (!memoRec.isLeftRecursion) {
                return true;
              }
              const { applicationMemoKeyStack } = this;
              for (let idx = 0; idx < applicationMemoKeyStack.length; idx++) {
                const applicationMemoKey = applicationMemoKeyStack[idx];
                if (memoRec.isInvolved(applicationMemoKey)) {
                  return false;
                }
              }
              return true;
            },
            memoize(memoKey, memoRec) {
              this.memo[memoKey] = memoRec;
              this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
              this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
              return memoRec;
            },
            clearObsoleteEntries(pos, invalidatedIdx) {
              if (pos + this.maxExaminedLength <= invalidatedIdx) {
                return;
              }
              const { memo } = this;
              this.maxExaminedLength = 0;
              this.maxRightmostFailureOffset = -1;
              Object.keys(memo).forEach((k) => {
                const memoRec = memo[k];
                if (pos + memoRec.examinedLength > invalidatedIdx) {
                  delete memo[k];
                } else {
                  this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
                  this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
                }
              });
            }
          };
          module2.exports = PosInfo;
        }
      });
      var require_MatchState = __commonJS2({
        "node_modules/ohm-js/src/MatchState.js"(exports2, module2) {
          "use strict";
          var InputStream = require_InputStream();
          var MatchResult = require_MatchResult();
          var PosInfo = require_PosInfo();
          var Trace = require_Trace();
          var pexprs = require_pexprs();
          var util = require_util();
          var builtInApplySyntacticBody;
          util.awaitBuiltInRules((builtInRules) => {
            builtInApplySyntacticBody = builtInRules.rules.applySyntactic.body;
          });
          var applySpaces = new pexprs.Apply("spaces");
          function MatchState(matcher, startExpr, optPositionToRecordFailures) {
            this.matcher = matcher;
            this.startExpr = startExpr;
            this.grammar = matcher.grammar;
            this.input = matcher.input;
            this.inputStream = new InputStream(matcher.input);
            this.memoTable = matcher.memoTable;
            this._bindings = [];
            this._bindingOffsets = [];
            this._applicationStack = [];
            this._posStack = [0];
            this.inLexifiedContextStack = [false];
            this.rightmostFailurePosition = -1;
            this._rightmostFailurePositionStack = [];
            this._recordedFailuresStack = [];
            if (optPositionToRecordFailures !== void 0) {
              this.positionToRecordFailures = optPositionToRecordFailures;
              this.recordedFailures = /* @__PURE__ */ Object.create(null);
            }
          }
          MatchState.prototype = {
            posToOffset(pos) {
              return pos - this._posStack[this._posStack.length - 1];
            },
            enterApplication(posInfo, app) {
              this._posStack.push(this.inputStream.pos);
              this._applicationStack.push(app);
              this.inLexifiedContextStack.push(false);
              posInfo.enter(app);
              this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
              this.rightmostFailurePosition = -1;
            },
            exitApplication(posInfo, optNode) {
              const origPos = this._posStack.pop();
              this._applicationStack.pop();
              this.inLexifiedContextStack.pop();
              posInfo.exit();
              this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, this._rightmostFailurePositionStack.pop());
              if (optNode) {
                this.pushBinding(optNode, origPos);
              }
            },
            enterLexifiedContext() {
              this.inLexifiedContextStack.push(true);
            },
            exitLexifiedContext() {
              this.inLexifiedContextStack.pop();
            },
            currentApplication() {
              return this._applicationStack[this._applicationStack.length - 1];
            },
            inSyntacticContext() {
              const currentApplication = this.currentApplication();
              if (currentApplication) {
                return currentApplication.isSyntactic() && !this.inLexifiedContext();
              } else {
                return this.startExpr.factors[0].isSyntactic();
              }
            },
            inLexifiedContext() {
              return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
            },
            skipSpaces() {
              this.pushFailuresInfo();
              this.eval(applySpaces);
              this.popBinding();
              this.popFailuresInfo();
              return this.inputStream.pos;
            },
            skipSpacesIfInSyntacticContext() {
              return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
            },
            maybeSkipSpacesBefore(expr) {
              if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
                return this.skipSpacesIfInSyntacticContext();
              } else {
                return this.inputStream.pos;
              }
            },
            pushBinding(node, origPos) {
              this._bindings.push(node);
              this._bindingOffsets.push(this.posToOffset(origPos));
            },
            popBinding() {
              this._bindings.pop();
              this._bindingOffsets.pop();
            },
            numBindings() {
              return this._bindings.length;
            },
            truncateBindings(newLength) {
              while (this._bindings.length > newLength) {
                this.popBinding();
              }
            },
            getCurrentPosInfo() {
              return this.getPosInfo(this.inputStream.pos);
            },
            getPosInfo(pos) {
              let posInfo = this.memoTable[pos];
              if (!posInfo) {
                posInfo = this.memoTable[pos] = new PosInfo();
              }
              return posInfo;
            },
            processFailure(pos, expr) {
              this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, pos);
              if (this.recordedFailures && pos === this.positionToRecordFailures) {
                const app = this.currentApplication();
                if (app) {
                  expr = expr.substituteParams(app.args);
                } else {
                }
                this.recordFailure(expr.toFailure(this.grammar), false);
              }
            },
            recordFailure(failure, shouldCloneIfNew) {
              const key = failure.toKey();
              if (!this.recordedFailures[key]) {
                this.recordedFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
              } else if (this.recordedFailures[key].isFluffy() && !failure.isFluffy()) {
                this.recordedFailures[key].clearFluffy();
              }
            },
            recordFailures(failures, shouldCloneIfNew) {
              Object.keys(failures).forEach((key) => {
                this.recordFailure(failures[key], shouldCloneIfNew);
              });
            },
            cloneRecordedFailures() {
              if (!this.recordedFailures) {
                return void 0;
              }
              const ans = /* @__PURE__ */ Object.create(null);
              Object.keys(this.recordedFailures).forEach((key) => {
                ans[key] = this.recordedFailures[key].clone();
              });
              return ans;
            },
            getRightmostFailurePosition() {
              return this.rightmostFailurePosition;
            },
            _getRightmostFailureOffset() {
              return this.rightmostFailurePosition >= 0 ? this.posToOffset(this.rightmostFailurePosition) : -1;
            },
            // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
            getMemoizedTraceEntry(pos, expr) {
              const posInfo = this.memoTable[pos];
              if (posInfo && expr instanceof pexprs.Apply) {
                const memoRec = posInfo.memo[expr.toMemoKey()];
                if (memoRec && memoRec.traceEntry) {
                  const entry = memoRec.traceEntry.cloneWithExpr(expr);
                  entry.isMemoized = true;
                  return entry;
                }
              }
              return null;
            },
            // Returns a new trace entry, with the currently active trace array as its children.
            getTraceEntry(pos, expr, succeeded, bindings) {
              if (expr instanceof pexprs.Apply) {
                const app = this.currentApplication();
                const actuals = app ? app.args : [];
                expr = expr.substituteParams(actuals);
              }
              return this.getMemoizedTraceEntry(pos, expr) || new Trace(this.input, pos, this.inputStream.pos, expr, succeeded, bindings, this.trace);
            },
            isTracing() {
              return !!this.trace;
            },
            hasNecessaryInfo(memoRec) {
              if (this.trace && !memoRec.traceEntry) {
                return false;
              }
              if (this.recordedFailures && this.inputStream.pos + memoRec.rightmostFailureOffset === this.positionToRecordFailures) {
                return !!memoRec.failuresAtRightmostPosition;
              }
              return true;
            },
            useMemoizedResult(origPos, memoRec) {
              if (this.trace) {
                this.trace.push(memoRec.traceEntry);
              }
              const memoRecRightmostFailurePosition = this.inputStream.pos + memoRec.rightmostFailureOffset;
              this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, memoRecRightmostFailurePosition);
              if (this.recordedFailures && this.positionToRecordFailures === memoRecRightmostFailurePosition && memoRec.failuresAtRightmostPosition) {
                this.recordFailures(memoRec.failuresAtRightmostPosition, true);
              }
              this.inputStream.examinedLength = Math.max(this.inputStream.examinedLength, memoRec.examinedLength + origPos);
              if (memoRec.value) {
                this.inputStream.pos += memoRec.matchLength;
                this.pushBinding(memoRec.value, origPos);
                return true;
              }
              return false;
            },
            // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
            // will have `expr.getArity()` more elements than before, and the input stream's position may
            // have increased. On failure, `bindings` and position will be unchanged.
            eval(expr) {
              const { inputStream } = this;
              const origNumBindings = this._bindings.length;
              let origRecordedFailures;
              if (this.recordedFailures) {
                origRecordedFailures = this.recordedFailures;
                this.recordedFailures = /* @__PURE__ */ Object.create(null);
              }
              const origPos = inputStream.pos;
              const memoPos = this.maybeSkipSpacesBefore(expr);
              let origTrace;
              if (this.trace) {
                origTrace = this.trace;
                this.trace = [];
              }
              const ans = expr.eval(this);
              if (this.trace) {
                const bindings = this._bindings.slice(origNumBindings);
                const traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
                traceEntry.isImplicitSpaces = expr === applySpaces;
                traceEntry.isRootNode = expr === this.startExpr;
                origTrace.push(traceEntry);
                this.trace = origTrace;
              }
              if (ans) {
                if (this.recordedFailures && inputStream.pos === this.positionToRecordFailures) {
                  Object.keys(this.recordedFailures).forEach((key) => {
                    this.recordedFailures[key].makeFluffy();
                  });
                }
              } else {
                inputStream.pos = origPos;
                this.truncateBindings(origNumBindings);
              }
              if (this.recordedFailures) {
                this.recordFailures(origRecordedFailures, false);
              }
              if (expr === builtInApplySyntacticBody) {
                this.skipSpaces();
              }
              return ans;
            },
            getMatchResult() {
              this.eval(this.startExpr);
              let rightmostFailures;
              if (this.recordedFailures) {
                rightmostFailures = Object.keys(this.recordedFailures).map((key) => this.recordedFailures[key]);
              }
              const cst = this._bindings[0];
              if (cst) {
                cst.grammar = this.grammar;
              }
              return new MatchResult(this.matcher, this.input, this.startExpr, cst, this._bindingOffsets[0], this.rightmostFailurePosition, rightmostFailures);
            },
            getTrace() {
              this.trace = [];
              const matchResult = this.getMatchResult();
              const rootTrace = this.trace[this.trace.length - 1];
              rootTrace.result = matchResult;
              return rootTrace;
            },
            pushFailuresInfo() {
              this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
              this._recordedFailuresStack.push(this.recordedFailures);
            },
            popFailuresInfo() {
              this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop();
              this.recordedFailures = this._recordedFailuresStack.pop();
            }
          };
          module2.exports = MatchState;
        }
      });
      var require_Matcher = __commonJS2({
        "node_modules/ohm-js/src/Matcher.js"(exports2, module2) {
          "use strict";
          var MatchState = require_MatchState();
          var pexprs = require_pexprs();
          function Matcher(grammar3) {
            this.grammar = grammar3;
            this.memoTable = [];
            this.input = "";
          }
          Matcher.prototype.getInput = function() {
            return this.input;
          };
          Matcher.prototype.setInput = function(str) {
            if (this.input !== str) {
              this.replaceInputRange(0, this.input.length, str);
            }
            return this;
          };
          Matcher.prototype.replaceInputRange = function(startIdx, endIdx, str) {
            const currentInput = this.input;
            if (startIdx < 0 || startIdx > currentInput.length || endIdx < 0 || endIdx > currentInput.length || startIdx > endIdx) {
              throw new Error("Invalid indices: " + startIdx + " and " + endIdx);
            }
            this.input = currentInput.slice(0, startIdx) + str + currentInput.slice(endIdx);
            const restOfMemoTable = this.memoTable.slice(endIdx);
            this.memoTable.length = startIdx;
            for (let idx = 0; idx < str.length; idx++) {
              this.memoTable.push(void 0);
            }
            restOfMemoTable.forEach(function(posInfo) {
              this.memoTable.push(posInfo);
            }, this);
            for (let pos = 0; pos < startIdx; pos++) {
              const posInfo = this.memoTable[pos];
              if (posInfo) {
                posInfo.clearObsoleteEntries(pos, startIdx);
              }
            }
            return this;
          };
          Matcher.prototype.match = function(optStartApplicationStr) {
            return this._match(this._getStartExpr(optStartApplicationStr), false);
          };
          Matcher.prototype.trace = function(optStartApplicationStr) {
            return this._match(this._getStartExpr(optStartApplicationStr), true);
          };
          Matcher.prototype._match = function(startExpr, tracing, optPositionToRecordFailures) {
            const state = new MatchState(this, startExpr, optPositionToRecordFailures);
            return tracing ? state.getTrace() : state.getMatchResult();
          };
          Matcher.prototype._getStartExpr = function(optStartApplicationStr) {
            const applicationStr = optStartApplicationStr || this.grammar.defaultStartRule;
            if (!applicationStr) {
              throw new Error("Missing start rule argument -- the grammar has no default start rule.");
            }
            const startApp = this.grammar.parseApplication(applicationStr);
            return new pexprs.Seq([startApp, pexprs.end]);
          };
          module2.exports = Matcher;
        }
      });
      var require_Semantics = __commonJS2({
        "node_modules/ohm-js/src/Semantics.js"(exports2, module2) {
          "use strict";
          var InputStream = require_InputStream();
          var { IterationNode } = require_nodes();
          var MatchResult = require_MatchResult();
          var common = require_common();
          var errors = require_errors();
          var util = require_util();
          var globalActionStack = [];
          var hasOwnProperty = (x, prop) => Object.prototype.hasOwnProperty.call(x, prop);
          var Wrapper = class {
            constructor(node, sourceInterval, baseInterval) {
              this._node = node;
              this.source = sourceInterval;
              this._baseInterval = baseInterval;
              if (node.isNonterminal()) {
                common.assert(sourceInterval === baseInterval);
              }
              this._childWrappers = [];
            }
            toString() {
              return "[semantics wrapper for " + this._node.grammar.name + "]";
            }
            _forgetMemoizedResultFor(attributeName) {
              delete this._node[this._semantics.attributeKeys[attributeName]];
              this.children.forEach((child) => {
                child._forgetMemoizedResultFor(attributeName);
              });
            }
            // Returns the wrapper of the specified child node. Child wrappers are created lazily and
            // cached in the parent wrapper's `_childWrappers` instance variable.
            child(idx) {
              if (!(0 <= idx && idx < this._node.numChildren())) {
                return void 0;
              }
              let childWrapper = this._childWrappers[idx];
              if (!childWrapper) {
                const childNode = this._node.childAt(idx);
                const offset = this._node.childOffsets[idx];
                const source = this._baseInterval.subInterval(offset, childNode.matchLength);
                const base = childNode.isNonterminal() ? source : this._baseInterval;
                childWrapper = this._childWrappers[idx] = this._semantics.wrap(childNode, source, base);
              }
              return childWrapper;
            }
            // Returns an array containing the wrappers of all of the children of the node associated
            // with this wrapper.
            _children() {
              for (let idx = 0; idx < this._node.numChildren(); idx++) {
                this.child(idx);
              }
              return this._childWrappers;
            }
            // Returns `true` if the CST node associated with this wrapper corresponds to an iteration
            // expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
            isIteration() {
              return this._node.isIteration();
            }
            // Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
            // otherwise.
            isTerminal() {
              return this._node.isTerminal();
            }
            // Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
            // otherwise.
            isNonterminal() {
              return this._node.isNonterminal();
            }
            // Returns `true` if the CST node associated with this wrapper is a nonterminal node
            // corresponding to a syntactic rule, `false` otherwise.
            isSyntactic() {
              return this.isNonterminal() && this._node.isSyntactic();
            }
            // Returns `true` if the CST node associated with this wrapper is a nonterminal node
            // corresponding to a lexical rule, `false` otherwise.
            isLexical() {
              return this.isNonterminal() && this._node.isLexical();
            }
            // Returns `true` if the CST node associated with this wrapper is an iterator node
            // having either one or no child (? operator), `false` otherwise.
            // Otherwise, throws an exception.
            isOptional() {
              return this._node.isOptional();
            }
            // Create a new _iter wrapper in the same semantics as this wrapper.
            iteration(optChildWrappers) {
              const childWrappers = optChildWrappers || [];
              const childNodes = childWrappers.map((c) => c._node);
              const iter = new IterationNode(childNodes, [], -1, false);
              const wrapper = this._semantics.wrap(iter, null, null);
              wrapper._childWrappers = childWrappers;
              return wrapper;
            }
            // Returns an array containing the children of this CST node.
            get children() {
              return this._children();
            }
            // Returns the name of grammar rule that created this CST node.
            get ctorName() {
              return this._node.ctorName;
            }
            // TODO: Remove this eventually (deprecated in v0.12).
            get interval() {
              throw new Error("The `interval` property is deprecated -- use `source` instead");
            }
            // Returns the number of children of this CST node.
            get numChildren() {
              return this._node.numChildren();
            }
            // Returns the contents of the input stream consumed by this CST node.
            get sourceString() {
              return this.source.contents;
            }
          };
          function Semantics(grammar3, superSemantics) {
            const self = this;
            this.grammar = grammar3;
            this.checkedActionDicts = false;
            this.Wrapper = class extends (superSemantics ? superSemantics.Wrapper : Wrapper) {
              constructor(node, sourceInterval, baseInterval) {
                super(node, sourceInterval, baseInterval);
                self.checkActionDictsIfHaventAlready();
                this._semantics = self;
              }
            };
            this.super = superSemantics;
            if (superSemantics) {
              if (!(grammar3.equals(this.super.grammar) || grammar3._inheritsFrom(this.super.grammar))) {
                throw new Error("Cannot extend a semantics for grammar '" + this.super.grammar.name + "' for use with grammar '" + grammar3.name + "' (not a sub-grammar)");
              }
              this.operations = Object.create(this.super.operations);
              this.attributes = Object.create(this.super.attributes);
              this.attributeKeys = /* @__PURE__ */ Object.create(null);
              for (const attributeName in this.attributes) {
                Object.defineProperty(this.attributeKeys, attributeName, {
                  value: util.uniqueId(attributeName)
                });
              }
            } else {
              this.operations = /* @__PURE__ */ Object.create(null);
              this.attributes = /* @__PURE__ */ Object.create(null);
              this.attributeKeys = /* @__PURE__ */ Object.create(null);
            }
          }
          Semantics.prototype.toString = function() {
            return "[semantics for " + this.grammar.name + "]";
          };
          Semantics.prototype.checkActionDictsIfHaventAlready = function() {
            if (!this.checkedActionDicts) {
              this.checkActionDicts();
              this.checkedActionDicts = true;
            }
          };
          Semantics.prototype.checkActionDicts = function() {
            let name;
            for (name in this.operations) {
              this.operations[name].checkActionDict(this.grammar);
            }
            for (name in this.attributes) {
              this.attributes[name].checkActionDict(this.grammar);
            }
          };
          Semantics.prototype.toRecipe = function(semanticsOnly) {
            function hasSuperSemantics(s) {
              return s.super !== Semantics.BuiltInSemantics._getSemantics();
            }
            let str = "(function(g) {\n";
            if (hasSuperSemantics(this)) {
              str += "  var semantics = " + this.super.toRecipe(true) + "(g";
              const superSemanticsGrammar = this.super.grammar;
              let relatedGrammar = this.grammar;
              while (relatedGrammar !== superSemanticsGrammar) {
                str += ".superGrammar";
                relatedGrammar = relatedGrammar.superGrammar;
              }
              str += ");\n";
              str += "  return g.extendSemantics(semantics)";
            } else {
              str += "  return g.createSemantics()";
            }
            ["Operation", "Attribute"].forEach((type) => {
              const semanticOperations = this[type.toLowerCase() + "s"];
              Object.keys(semanticOperations).forEach((name) => {
                const { actionDict, formals, builtInDefault } = semanticOperations[name];
                let signature = name;
                if (formals.length > 0) {
                  signature += "(" + formals.join(", ") + ")";
                }
                let method;
                if (hasSuperSemantics(this) && this.super[type.toLowerCase() + "s"][name]) {
                  method = "extend" + type;
                } else {
                  method = "add" + type;
                }
                str += "\n    ." + method + "(" + JSON.stringify(signature) + ", {";
                const srcArray = [];
                Object.keys(actionDict).forEach((actionName) => {
                  if (actionDict[actionName] !== builtInDefault) {
                    let source = actionDict[actionName].toString().trim();
                    source = source.replace(/^.*\(/, "function(");
                    srcArray.push("\n      " + JSON.stringify(actionName) + ": " + source);
                  }
                });
                str += srcArray.join(",") + "\n    })";
              });
            });
            str += ";\n  })";
            if (!semanticsOnly) {
              str = "(function() {\n  var grammar = this.fromRecipe(" + this.grammar.toRecipe() + ");\n  var semantics = " + str + "(grammar);\n  return semantics;\n});\n";
            }
            return str;
          };
          function parseSignature(signature, type) {
            if (!Semantics.prototypeGrammar) {
              common.assert(signature.indexOf("(") === -1);
              return {
                name: signature,
                formals: []
              };
            }
            const r = Semantics.prototypeGrammar.match(signature, type === "operation" ? "OperationSignature" : "AttributeSignature");
            if (r.failed()) {
              throw new Error(r.message);
            }
            return Semantics.prototypeGrammarSemantics(r).parse();
          }
          function newDefaultAction(type, name, doIt) {
            return function(...children) {
              const thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
              const args = thisThing.formals.map((formal) => this.args[formal]);
              if (!this.isIteration() && children.length === 1) {
                return doIt.apply(children[0], args);
              } else {
                throw errors.missingSemanticAction(this.ctorName, name, type, globalActionStack);
              }
            };
          }
          Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
            const typePlural = type + "s";
            const parsedNameAndFormalArgs = parseSignature(signature, type);
            const { name } = parsedNameAndFormalArgs;
            const { formals } = parsedNameAndFormalArgs;
            this.assertNewName(name, type);
            const builtInDefault = newDefaultAction(type, name, doIt);
            const realActionDict = { _default: builtInDefault };
            Object.keys(actionDict).forEach((name2) => {
              realActionDict[name2] = actionDict[name2];
            });
            const entry = type === "operation" ? new Operation(name, formals, realActionDict, builtInDefault) : new Attribute(name, realActionDict, builtInDefault);
            entry.checkActionDict(this.grammar);
            this[typePlural][name] = entry;
            function doIt(...args) {
              const thisThing = this._semantics[typePlural][name];
              if (arguments.length !== thisThing.formals.length) {
                throw new Error("Invalid number of arguments passed to " + name + " " + type + " (expected " + thisThing.formals.length + ", got " + arguments.length + ")");
              }
              const argsObj = /* @__PURE__ */ Object.create(null);
              for (const [idx, val] of Object.entries(args)) {
                const formal = thisThing.formals[idx];
                argsObj[formal] = val;
              }
              const oldArgs = this.args;
              this.args = argsObj;
              const ans = thisThing.execute(this._semantics, this);
              this.args = oldArgs;
              return ans;
            }
            if (type === "operation") {
              this.Wrapper.prototype[name] = doIt;
              this.Wrapper.prototype[name].toString = function() {
                return "[" + name + " operation]";
              };
            } else {
              Object.defineProperty(this.Wrapper.prototype, name, {
                get: doIt,
                configurable: true
                // So the property can be deleted.
              });
              Object.defineProperty(this.attributeKeys, name, {
                value: util.uniqueId(name)
              });
            }
          };
          Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
            const typePlural = type + "s";
            parseSignature(name, "attribute");
            if (!(this.super && name in this.super[typePlural])) {
              throw new Error("Cannot extend " + type + " '" + name + "': did not inherit an " + type + " with that name");
            }
            if (hasOwnProperty(this[typePlural], name)) {
              throw new Error("Cannot extend " + type + " '" + name + "' again");
            }
            const inheritedFormals = this[typePlural][name].formals;
            const inheritedActionDict = this[typePlural][name].actionDict;
            const newActionDict = Object.create(inheritedActionDict);
            Object.keys(actionDict).forEach((name2) => {
              newActionDict[name2] = actionDict[name2];
            });
            this[typePlural][name] = type === "operation" ? new Operation(name, inheritedFormals, newActionDict) : new Attribute(name, newActionDict);
            this[typePlural][name].checkActionDict(this.grammar);
          };
          Semantics.prototype.assertNewName = function(name, type) {
            if (hasOwnProperty(Wrapper.prototype, name)) {
              throw new Error("Cannot add " + type + " '" + name + "': that's a reserved name");
            }
            if (name in this.operations) {
              throw new Error("Cannot add " + type + " '" + name + "': an operation with that name already exists");
            }
            if (name in this.attributes) {
              throw new Error("Cannot add " + type + " '" + name + "': an attribute with that name already exists");
            }
          };
          Semantics.prototype.wrap = function(node, source, optBaseInterval) {
            const baseInterval = optBaseInterval || source;
            return node instanceof this.Wrapper ? node : new this.Wrapper(node, source, baseInterval);
          };
          Semantics.createSemantics = function(grammar3, optSuperSemantics) {
            const s = new Semantics(grammar3, optSuperSemantics !== void 0 ? optSuperSemantics : Semantics.BuiltInSemantics._getSemantics());
            const proxy = function ASemantics(matchResult) {
              if (!(matchResult instanceof MatchResult)) {
                throw new TypeError("Semantics expected a MatchResult, but got " + common.unexpectedObjToString(matchResult));
              }
              if (matchResult.failed()) {
                throw new TypeError("cannot apply Semantics to " + matchResult.toString());
              }
              const cst = matchResult._cst;
              if (cst.grammar !== grammar3) {
                throw new Error("Cannot use a MatchResult from grammar '" + cst.grammar.name + "' with a semantics for '" + grammar3.name + "'");
              }
              const inputStream = new InputStream(matchResult.input);
              return s.wrap(cst, inputStream.interval(matchResult._cstOffset, matchResult.input.length));
            };
            proxy.addOperation = function(signature, actionDict) {
              s.addOperationOrAttribute("operation", signature, actionDict);
              return proxy;
            };
            proxy.extendOperation = function(name, actionDict) {
              s.extendOperationOrAttribute("operation", name, actionDict);
              return proxy;
            };
            proxy.addAttribute = function(name, actionDict) {
              s.addOperationOrAttribute("attribute", name, actionDict);
              return proxy;
            };
            proxy.extendAttribute = function(name, actionDict) {
              s.extendOperationOrAttribute("attribute", name, actionDict);
              return proxy;
            };
            proxy._getActionDict = function(operationOrAttributeName) {
              const action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
              if (!action) {
                throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute name in this semantics for "' + grammar3.name + '"');
              }
              return action.actionDict;
            };
            proxy._remove = function(operationOrAttributeName) {
              let semantic;
              if (operationOrAttributeName in s.operations) {
                semantic = s.operations[operationOrAttributeName];
                delete s.operations[operationOrAttributeName];
              } else if (operationOrAttributeName in s.attributes) {
                semantic = s.attributes[operationOrAttributeName];
                delete s.attributes[operationOrAttributeName];
              }
              delete s.Wrapper.prototype[operationOrAttributeName];
              return semantic;
            };
            proxy.getOperationNames = function() {
              return Object.keys(s.operations);
            };
            proxy.getAttributeNames = function() {
              return Object.keys(s.attributes);
            };
            proxy.getGrammar = function() {
              return s.grammar;
            };
            proxy.toRecipe = function(semanticsOnly) {
              return s.toRecipe(semanticsOnly);
            };
            proxy.toString = s.toString.bind(s);
            proxy._getSemantics = function() {
              return s;
            };
            return proxy;
          };
          var Operation = class {
            constructor(name, formals, actionDict, builtInDefault) {
              this.name = name;
              this.formals = formals;
              this.actionDict = actionDict;
              this.builtInDefault = builtInDefault;
            }
            checkActionDict(grammar3) {
              grammar3._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
            }
            // Execute this operation on the CST node associated with `nodeWrapper` in the context of the
            // given Semantics instance.
            execute(semantics, nodeWrapper) {
              try {
                const { ctorName } = nodeWrapper._node;
                let actionFn = this.actionDict[ctorName];
                if (actionFn) {
                  globalActionStack.push([this, ctorName]);
                  return actionFn.apply(nodeWrapper, nodeWrapper._children());
                }
                if (nodeWrapper.isNonterminal()) {
                  actionFn = this.actionDict._nonterminal;
                  if (actionFn) {
                    globalActionStack.push([this, "_nonterminal", ctorName]);
                    return actionFn.apply(nodeWrapper, nodeWrapper._children());
                  }
                }
                globalActionStack.push([this, "default action", ctorName]);
                return this.actionDict._default.apply(nodeWrapper, nodeWrapper._children());
              } finally {
                globalActionStack.pop();
              }
            }
          };
          Operation.prototype.typeName = "operation";
          var Attribute = class extends Operation {
            constructor(name, actionDict, builtInDefault) {
              super(name, [], actionDict, builtInDefault);
            }
            execute(semantics, nodeWrapper) {
              const node = nodeWrapper._node;
              const key = semantics.attributeKeys[this.name];
              if (!hasOwnProperty(node, key)) {
                node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
              }
              return node[key];
            }
          };
          Attribute.prototype.typeName = "attribute";
          module2.exports = Semantics;
        }
      });
      var require_Grammar = __commonJS2({
        "node_modules/ohm-js/src/Grammar.js"(exports2, module2) {
          "use strict";
          var CaseInsensitiveTerminal = require_CaseInsensitiveTerminal();
          var Matcher = require_Matcher();
          var Semantics = require_Semantics();
          var common = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs();
          var SPECIAL_ACTION_NAMES = ["_iter", "_terminal", "_nonterminal", "_default"];
          function getSortedRuleValues(grammar3) {
            return Object.keys(grammar3.rules).sort().map((name) => grammar3.rules[name]);
          }
          var jsonToJS = (str) => str.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
          function Grammar(name, superGrammar, rules, optDefaultStartRule) {
            this.name = name;
            this.superGrammar = superGrammar;
            this.rules = rules;
            if (optDefaultStartRule) {
              if (!(optDefaultStartRule in rules)) {
                throw new Error("Invalid start rule: '" + optDefaultStartRule + "' is not a rule in grammar '" + name + "'");
              }
              this.defaultStartRule = optDefaultStartRule;
            }
          }
          var ohmGrammar;
          var buildGrammar;
          Grammar.initApplicationParser = function(grammar3, builderFn) {
            ohmGrammar = grammar3;
            buildGrammar = builderFn;
          };
          Grammar.prototype = {
            matcher() {
              return new Matcher(this);
            },
            // Return true if the grammar is a built-in grammar, otherwise false.
            // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
            isBuiltIn() {
              return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
            },
            equals(g) {
              if (this === g) {
                return true;
              }
              if (g == null || this.name !== g.name || this.defaultStartRule !== g.defaultStartRule || !(this.superGrammar === g.superGrammar || this.superGrammar.equals(g.superGrammar))) {
                return false;
              }
              const myRules = getSortedRuleValues(this);
              const otherRules = getSortedRuleValues(g);
              return myRules.length === otherRules.length && myRules.every((rule, i) => {
                return rule.description === otherRules[i].description && rule.formals.join(",") === otherRules[i].formals.join(",") && rule.body.toString() === otherRules[i].body.toString();
              });
            },
            match(input, optStartApplication) {
              const m = this.matcher();
              m.replaceInputRange(0, 0, input);
              return m.match(optStartApplication);
            },
            trace(input, optStartApplication) {
              const m = this.matcher();
              m.replaceInputRange(0, 0, input);
              return m.trace(optStartApplication);
            },
            createSemantics() {
              return Semantics.createSemantics(this);
            },
            extendSemantics(superSemantics) {
              return Semantics.createSemantics(this, superSemantics._getSemantics());
            },
            // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
            // a function of the correct arity. If not, throw an exception.
            _checkTopDownActionDict(what, name, actionDict) {
              const problems = [];
              for (const k in actionDict) {
                const v = actionDict[k];
                const isSpecialAction = SPECIAL_ACTION_NAMES.includes(k);
                if (!isSpecialAction && !(k in this.rules)) {
                  problems.push(`'${k}' is not a valid semantic action for '${this.name}'`);
                  continue;
                }
                if (typeof v !== "function") {
                  problems.push(`'${k}' must be a function in an action dictionary for '${this.name}'`);
                  continue;
                }
                const actual = v.length;
                const expected = this._topDownActionArity(k);
                if (actual !== expected) {
                  let details;
                  if (k === "_iter" || k === "_nonterminal") {
                    details = `it should use a rest parameter, e.g. \`${k}(...children) {}\`. NOTE: this is new in Ohm v16 \u2014 see https://ohmjs.org/d/ati for details.`;
                  } else {
                    details = `expected ${expected}, got ${actual}`;
                  }
                  problems.push(`Semantic action '${k}' has the wrong arity: ${details}`);
                }
              }
              if (problems.length > 0) {
                const prettyProblems = problems.map((problem) => "- " + problem);
                const error = new Error([
                  `Found errors in the action dictionary of the '${name}' ${what}:`,
                  ...prettyProblems
                ].join("\n"));
                error.problems = problems;
                throw error;
              }
            },
            // Return the expected arity for a semantic action named `actionName`, which
            // is either a rule name or a special action name like '_nonterminal'.
            _topDownActionArity(actionName) {
              return SPECIAL_ACTION_NAMES.includes(actionName) ? 0 : this.rules[actionName].body.getArity();
            },
            _inheritsFrom(grammar3) {
              let g = this.superGrammar;
              while (g) {
                if (g.equals(grammar3, true)) {
                  return true;
                }
                g = g.superGrammar;
              }
              return false;
            },
            toRecipe(superGrammarExpr = void 0) {
              const metaInfo = {};
              if (this.source) {
                metaInfo.source = this.source.contents;
              }
              let startRule = null;
              if (this.defaultStartRule) {
                startRule = this.defaultStartRule;
              }
              const rules = {};
              Object.keys(this.rules).forEach((ruleName) => {
                const ruleInfo = this.rules[ruleName];
                const { body } = ruleInfo;
                const isDefinition = !this.superGrammar || !this.superGrammar.rules[ruleName];
                let operation;
                if (isDefinition) {
                  operation = "define";
                } else {
                  operation = body instanceof pexprs.Extend ? "extend" : "override";
                }
                const metaInfo2 = {};
                if (ruleInfo.source && this.source) {
                  const adjusted = ruleInfo.source.relativeTo(this.source);
                  metaInfo2.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
                }
                const description = isDefinition ? ruleInfo.description : null;
                const bodyRecipe = body.outputRecipe(ruleInfo.formals, this.source);
                rules[ruleName] = [
                  operation,
                  // "define"/"extend"/"override"
                  metaInfo2,
                  description,
                  ruleInfo.formals,
                  bodyRecipe
                ];
              });
              let superGrammarOutput = "null";
              if (superGrammarExpr) {
                superGrammarOutput = superGrammarExpr;
              } else if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
                superGrammarOutput = this.superGrammar.toRecipe();
              }
              const recipeElements = [
                ...["grammar", metaInfo, this.name].map(JSON.stringify),
                superGrammarOutput,
                ...[startRule, rules].map(JSON.stringify)
              ];
              return jsonToJS(`[${recipeElements.join(",")}]`);
            },
            // TODO: Come up with better names for these methods.
            // TODO: Write the analog of these methods for inherited attributes.
            toOperationActionDictionaryTemplate() {
              return this._toOperationOrAttributeActionDictionaryTemplate();
            },
            toAttributeActionDictionaryTemplate() {
              return this._toOperationOrAttributeActionDictionaryTemplate();
            },
            _toOperationOrAttributeActionDictionaryTemplate() {
              const sb = new common.StringBuffer();
              sb.append("{");
              let first = true;
              for (const ruleName in this.rules) {
                const { body } = this.rules[ruleName];
                if (first) {
                  first = false;
                } else {
                  sb.append(",");
                }
                sb.append("\n");
                sb.append("  ");
                this.addSemanticActionTemplate(ruleName, body, sb);
              }
              sb.append("\n}");
              return sb.contents();
            },
            addSemanticActionTemplate(ruleName, body, sb) {
              sb.append(ruleName);
              sb.append(": function(");
              const arity = this._topDownActionArity(ruleName);
              sb.append(common.repeat("_", arity).join(", "));
              sb.append(") {\n");
              sb.append("  }");
            },
            // Parse a string which expresses a rule application in this grammar, and return the
            // resulting Apply node.
            parseApplication(str) {
              let app;
              if (str.indexOf("<") === -1) {
                app = new pexprs.Apply(str);
              } else {
                const cst = ohmGrammar.match(str, "Base_application");
                app = buildGrammar(cst, {});
              }
              if (!(app.ruleName in this.rules)) {
                throw errors.undeclaredRule(app.ruleName, this.name);
              }
              const { formals } = this.rules[app.ruleName];
              if (formals.length !== app.args.length) {
                const { source } = this.rules[app.ruleName];
                throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
              }
              return app;
            }
          };
          Grammar.ProtoBuiltInRules = new Grammar(
            "ProtoBuiltInRules",
            // name
            void 0,
            // supergrammar
            {
              any: {
                body: pexprs.any,
                formals: [],
                description: "any character",
                primitive: true
              },
              end: {
                body: pexprs.end,
                formals: [],
                description: "end of input",
                primitive: true
              },
              caseInsensitive: {
                body: new CaseInsensitiveTerminal(new pexprs.Param(0)),
                formals: ["str"],
                primitive: true
              },
              lower: {
                body: new pexprs.UnicodeChar("Ll"),
                formals: [],
                description: "a lowercase letter",
                primitive: true
              },
              upper: {
                body: new pexprs.UnicodeChar("Lu"),
                formals: [],
                description: "an uppercase letter",
                primitive: true
              },
              // Union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not in Ll or Lu.
              unicodeLtmo: {
                body: new pexprs.UnicodeChar("Ltmo"),
                formals: [],
                description: "a Unicode character in Lt, Lm, or Lo",
                primitive: true
              },
              // These rules are not truly primitive (they could be written in userland) but are defined
              // here for bootstrapping purposes.
              spaces: {
                body: new pexprs.Star(new pexprs.Apply("space")),
                formals: []
              },
              space: {
                body: new pexprs.Range("\0", " "),
                formals: [],
                description: "a space"
              }
            }
          );
          module2.exports = Grammar;
        }
      });
      var require_GrammarDecl = __commonJS2({
        "node_modules/ohm-js/src/GrammarDecl.js"(exports2, module2) {
          "use strict";
          var Grammar = require_Grammar();
          var InputStream = require_InputStream();
          var common = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs();
          function GrammarDecl(name) {
            this.name = name;
          }
          GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
            return this.source.subInterval(startIdx, endIdx - startIdx);
          };
          GrammarDecl.prototype.ensureSuperGrammar = function() {
            if (!this.superGrammar) {
              this.withSuperGrammar(
                // TODO: The conditional expression below is an ugly hack. It's kind of ok because
                // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
                // we should try to find a better way to do this.
                this.name === "BuiltInRules" ? Grammar.ProtoBuiltInRules : Grammar.BuiltInRules
              );
            }
            return this.superGrammar;
          };
          GrammarDecl.prototype.ensureSuperGrammarRuleForOverriding = function(name, source) {
            const ruleInfo = this.ensureSuperGrammar().rules[name];
            if (!ruleInfo) {
              throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, source);
            }
            return ruleInfo;
          };
          GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body, source) {
            const duplicateParameterNames = common.getDuplicates(formals);
            if (duplicateParameterNames.length > 0) {
              throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
            }
            const ruleInfo = this.ensureSuperGrammar().rules[name];
            const expectedFormals = ruleInfo.formals;
            const expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
            if (formals.length !== expectedNumFormals) {
              throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, source);
            }
            return this.install(name, formals, body, ruleInfo.description, source);
          };
          GrammarDecl.prototype.install = function(name, formals, body, description, source) {
            this.rules[name] = {
              body: body.introduceParams(formals),
              formals,
              description,
              source
            };
            return this;
          };
          GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
            if (this.superGrammar) {
              throw new Error("the super grammar of a GrammarDecl cannot be set more than once");
            }
            this.superGrammar = superGrammar;
            this.rules = Object.create(superGrammar.rules);
            if (!superGrammar.isBuiltIn()) {
              this.defaultStartRule = superGrammar.defaultStartRule;
            }
            return this;
          };
          GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
            this.defaultStartRule = ruleName;
            return this;
          };
          GrammarDecl.prototype.withSource = function(source) {
            this.source = new InputStream(source).interval(0, source.length);
            return this;
          };
          GrammarDecl.prototype.build = function() {
            const grammar3 = new Grammar(this.name, this.ensureSuperGrammar(), this.rules, this.defaultStartRule);
            const grammarErrors = [];
            let grammarHasInvalidApplications = false;
            Object.keys(grammar3.rules).forEach((ruleName) => {
              const { body } = grammar3.rules[ruleName];
              try {
                body.assertChoicesHaveUniformArity(ruleName);
              } catch (e) {
                grammarErrors.push(e);
              }
              try {
                body.assertAllApplicationsAreValid(ruleName, grammar3);
              } catch (e) {
                grammarErrors.push(e);
                grammarHasInvalidApplications = true;
              }
            });
            if (!grammarHasInvalidApplications) {
              Object.keys(grammar3.rules).forEach((ruleName) => {
                const { body } = grammar3.rules[ruleName];
                try {
                  body.assertIteratedExprsAreNotNullable(grammar3, []);
                } catch (e) {
                  grammarErrors.push(e);
                }
              });
            }
            if (grammarErrors.length > 0) {
              errors.throwErrors(grammarErrors);
            }
            if (this.source) {
              grammar3.source = this.source;
            }
            return grammar3;
          };
          GrammarDecl.prototype.define = function(name, formals, body, description, source) {
            this.ensureSuperGrammar();
            if (this.superGrammar.rules[name]) {
              throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, source);
            } else if (this.rules[name]) {
              throw errors.duplicateRuleDeclaration(name, this.name, this.name, source);
            }
            const duplicateParameterNames = common.getDuplicates(formals);
            if (duplicateParameterNames.length > 0) {
              throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
            }
            return this.install(name, formals, body, description, source);
          };
          GrammarDecl.prototype.override = function(name, formals, body, descIgnored, source) {
            this.ensureSuperGrammarRuleForOverriding(name, source);
            this.installOverriddenOrExtendedRule(name, formals, body, source);
            return this;
          };
          GrammarDecl.prototype.extend = function(name, formals, fragment, descIgnored, source) {
            const ruleInfo = this.ensureSuperGrammar().rules[name];
            if (!ruleInfo) {
              throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, source);
            }
            const body = new pexprs.Extend(this.superGrammar, name, fragment);
            body.source = fragment.source;
            this.installOverriddenOrExtendedRule(name, formals, body, source);
            return this;
          };
          module2.exports = GrammarDecl;
        }
      });
      var require_Builder = __commonJS2({
        "node_modules/ohm-js/src/Builder.js"(exports2, module2) {
          "use strict";
          var Grammar = require_Grammar();
          var GrammarDecl = require_GrammarDecl();
          var pexprs = require_pexprs();
          function Builder() {
          }
          Builder.prototype = {
            currentDecl: null,
            currentRuleName: null,
            newGrammar(name) {
              return new GrammarDecl(name);
            },
            grammar(metaInfo, name, superGrammar, defaultStartRule, rules) {
              const gDecl = new GrammarDecl(name);
              if (superGrammar) {
                gDecl.withSuperGrammar(superGrammar instanceof Grammar ? superGrammar : this.fromRecipe(superGrammar));
              }
              if (defaultStartRule) {
                gDecl.withDefaultStartRule(defaultStartRule);
              }
              if (metaInfo && metaInfo.source) {
                gDecl.withSource(metaInfo.source);
              }
              this.currentDecl = gDecl;
              Object.keys(rules).forEach((ruleName) => {
                this.currentRuleName = ruleName;
                const ruleRecipe = rules[ruleName];
                const action = ruleRecipe[0];
                const metaInfo2 = ruleRecipe[1];
                const description = ruleRecipe[2];
                const formals = ruleRecipe[3];
                const body = this.fromRecipe(ruleRecipe[4]);
                let source;
                if (gDecl.source && metaInfo2 && metaInfo2.sourceInterval) {
                  source = gDecl.source.subInterval(metaInfo2.sourceInterval[0], metaInfo2.sourceInterval[1] - metaInfo2.sourceInterval[0]);
                }
                gDecl[action](ruleName, formals, body, description, source);
              });
              this.currentRuleName = this.currentDecl = null;
              return gDecl.build();
            },
            terminal(x) {
              return new pexprs.Terminal(x);
            },
            range(from, to) {
              return new pexprs.Range(from, to);
            },
            param(index) {
              return new pexprs.Param(index);
            },
            alt(...termArgs) {
              let terms = [];
              for (let arg of termArgs) {
                if (!(arg instanceof pexprs.PExpr)) {
                  arg = this.fromRecipe(arg);
                }
                if (arg instanceof pexprs.Alt) {
                  terms = terms.concat(arg.terms);
                } else {
                  terms.push(arg);
                }
              }
              return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
            },
            seq(...factorArgs) {
              let factors = [];
              for (let arg of factorArgs) {
                if (!(arg instanceof pexprs.PExpr)) {
                  arg = this.fromRecipe(arg);
                }
                if (arg instanceof pexprs.Seq) {
                  factors = factors.concat(arg.factors);
                } else {
                  factors.push(arg);
                }
              }
              return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
            },
            star(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Star(expr);
            },
            plus(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Plus(expr);
            },
            opt(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Opt(expr);
            },
            not(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Not(expr);
            },
            la(expr) {
              return this.lookahead(expr);
            },
            lookahead(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Lookahead(expr);
            },
            lex(expr) {
              if (!(expr instanceof pexprs.PExpr)) {
                expr = this.fromRecipe(expr);
              }
              return new pexprs.Lex(expr);
            },
            app(ruleName, optParams) {
              if (optParams && optParams.length > 0) {
                optParams = optParams.map(function(param) {
                  return param instanceof pexprs.PExpr ? param : this.fromRecipe(param);
                }, this);
              }
              return new pexprs.Apply(ruleName, optParams);
            },
            // Note that unlike other methods in this class, this method cannot be used as a
            // convenience constructor. It only works with recipes, because it relies on
            // `this.currentDecl` and `this.currentRuleName` being set.
            splice(beforeTerms, afterTerms) {
              return new pexprs.Splice(this.currentDecl.superGrammar, this.currentRuleName, beforeTerms.map((term) => this.fromRecipe(term)), afterTerms.map((term) => this.fromRecipe(term)));
            },
            fromRecipe(recipe) {
              const args = recipe[0] === "grammar" ? recipe.slice(1) : recipe.slice(2);
              const result = this[recipe[0]](...args);
              const metaInfo = recipe[1];
              if (metaInfo) {
                if (metaInfo.sourceInterval && this.currentDecl) {
                  result.withSource(this.currentDecl.sourceInterval(...metaInfo.sourceInterval));
                }
              }
              return result;
            }
          };
          module2.exports = Builder;
        }
      });
      var require_package = __commonJS2({
        "node_modules/ohm-js/package.json"(exports2, module2) {
          module2.exports = {
            name: "ohm-js",
            version: "16.6.0",
            description: "An object-oriented language for parsing and pattern matching",
            repository: "https://github.com/harc/ohm",
            keywords: [
              "parser",
              "compiler",
              "pattern matching",
              "pattern-matching",
              "ometa",
              "ometa/js",
              "ometa-js",
              "ometajs",
              "rapid",
              "prototyping"
            ],
            homepage: "https://ohmjs.org",
            bugs: "https://github.com/harc/ohm/issues",
            main: "index.js",
            module: "dist/ohm.esm.js",
            files: [
              "src",
              "dist",
              "extras",
              "third_party",
              "index.d.ts"
            ],
            types: "index.d.ts",
            scripts: {
              prebootstrap: "bash scripts/prebootstrap",
              bootstrap: "bash scripts/bootstrap --test || (echo 'Bootstrap failed.' && mv -v dist/ohm-grammar.js.old dist/ohm-grammar.js && mv -v dist/built-in-rules.js.old dist/built-in-rules.js && mv -v dist/operations-and-attributes.js.old dist/operations-and-attributes.js)",
              build: "yarn build-debug && webpack --mode=production",
              "build-debug": "webpack --mode=development && yarn build-esm && node scripts/generate-types.mjs",
              "build-esm": "rollup -c rollup.config.mjs",
              clean: "rm -f dist/ohm.js dist/ohm.min.js",
              lint: "eslint . --ignore-path ../.eslintignore",
              format: "prettier . --write --ignore-path ../.prettierignore --config ../.prettierrc && eslint . --ignore-path ../.eslintignore --fix",
              test: "ava && ava --config ava-ts.config.js test/test-typings.ts",
              "test-watch": "ava --watch",
              "pre-commit": "yarn run lint && yarn run build && yarn run test",
              prepublishOnly: "bash scripts/prepublishOnly",
              prepack: "cp ../../README.md . && yarn build",
              postpack: "rm README.md",
              postpublish: "echo '\u{1F449}  Now go to https://github.com/harc/ohm/releases and create a release.'",
              "unsafe-bootstrap": "bash scripts/bootstrap",
              "update-contributors": "bash scripts/update-contributors",
              watch: "webpack --mode=development --watch"
            },
            license: "MIT",
            author: "Alex Warth <alexwarth@gmail.com> (http://tinlizzie.org/~awarth)",
            contributors: [
              "Patrick Dubroy <pdubroy@gmail.com>",
              "Meixian Li <lmeixian@gmail.com>",
              "Marko R\xF6der <m.roeder@photon-software.de>",
              "Tony Garnock-Jones <tonygarnockjones@gmail.com>",
              "Saketh Kasibatla <sake.kasi@gmail.com>",
              "Lionel Landwerlin <llandwerlin@gmail.com>",
              "Jason Merrill <jwmerrill@gmail.com>",
              "Ray Toal <rtoal@lmu.edu>",
              "Yoshiki Ohshima <Yoshiki.Ohshima@acm.org>",
              "megabuz <3299889+megabuz@users.noreply.github.com>",
              "Jonathan Edwards <JonathanMEdwards@gmail.com>",
              "Milan Lajto\u0161 <milan.lajtos@me.com>",
              "Neil Jewers <njjewers@uwaterloo.ca>",
              "stagas <gstagas@gmail.com>",
              "AngryPowman <angrypowman@qq.com>",
              "Arthur Carabott <arthurc@gmail.com>",
              "Casey Olson <casey.m.olson@gmail.com>",
              "Daniel Tomlinson <DanielTomlinson@me.com>",
              "Ian Harris <ian@fofgof.xyz>",
              "Justin Chase <justin.m.chase@gmail.com>",
              "Leslie Ying <acetophore@users.noreply.github.com>",
              "Luca Guzzon <luca.guzzon@gmail.com>",
              "Mike Niebling <(none)>",
              "Patrick Dubroy <patrick@sourcegraph.com>",
              "Pierre Donias <pierre.donias@gmail.com>",
              "Stan Rozenraukh <stan@stanistan.com>",
              "Stephan Seidt <stephan.seidt@gmail.com>",
              "Steve Phillips <steve@tryingtobeawesome.com>",
              "Szymon Kaliski <kaliskiszymon@gmail.com>",
              "Thomas Nyberg <tomnyberg@gmail.com>",
              "Vse Mozhet Byt <vsemozhetbyt@gmail.com>",
              "Wil Chung <10446+iamwilhelm@users.noreply.github.com>",
              "Zachary Sakowitz <zsakowitz@gmail.com>",
              "abego <ub@abego-software.de>",
              "acslk <d_vd415@hotmail.com>",
              "codeZeilen <codeZeilen@users.noreply.github.com>",
              "kassadin <kassadin@foxmail.com>",
              "owch <bowenrainyday@gmail.com>",
              "sfinnie <scott.finnie@gmail.com>"
            ],
            dependencies: {},
            devDependencies: {
              "@ohm-js/cli": "^1.0.0",
              "@rollup/plugin-commonjs": "^21.0.1",
              "@rollup/plugin-json": "^4.1.0",
              "@rollup/plugin-node-resolve": "^13.1.3",
              ava: "^3.15.0",
              "ava-spec": "^1.1.1",
              dedent: "^0.7.0",
              eslint: "^7.9.0",
              "eslint-config-google": "^0.14.0",
              "eslint-plugin-ava": "^11.0.0",
              "eslint-plugin-camelcase-ohm": "^0.2.1",
              "eslint-plugin-no-extension-in-require": "^0.2.0",
              husky: "^4.2.5",
              jsdom: "^9.9.1",
              json: "^9.0.6",
              markscript: "^0.5.0",
              "node-static": "^0.7.11",
              "ohm-grammar-ecmascript": "^1.0.0",
              rollup: "^2.63.0",
              "ts-loader": "^8.0.4",
              "ts-node": "^9.0.0",
              typescript: "^4.0.3",
              "walk-sync": "^2.2.0",
              webpack: "^4.44.2",
              "webpack-cli": "^3.3.12"
            },
            engines: {
              node: ">=0.12.1"
            }
          };
        }
      });
      var require_version = __commonJS2({
        "node_modules/ohm-js/src/version.js"(exports2, module2) {
          "use strict";
          module2.exports = typeof __GLOBAL_OHM_VERSION__ === "string" ? __GLOBAL_OHM_VERSION__ : require_package().version;
        }
      });
      var require_makeRecipe = __commonJS2({
        "node_modules/ohm-js/src/makeRecipe.js"(exports2) {
          "use strict";
          var Builder = require_Builder();
          function makeRecipe(recipe) {
            if (typeof recipe === "function") {
              return recipe.call(new Builder());
            } else {
              if (typeof recipe === "string") {
                recipe = JSON.parse(recipe);
              }
              return new Builder().fromRecipe(recipe);
            }
          }
          exports2.makeRecipe = makeRecipe;
        }
      });
      var require_built_in_rules = __commonJS2({
        "node_modules/ohm-js/dist/built-in-rules.js"(exports2, module2) {
          var { makeRecipe } = require_makeRecipe();
          module2.exports = makeRecipe(["grammar", { "source": 'BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = "0".."9"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | "a".."f"\n    | "A".."F"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n  // Allows a syntactic rule application within a lexical context.\n  applySyntactic<app> = app\n}' }, "BuiltInRules", null, null, { "alnum": ["define", { "sourceInterval": [18, 78] }, "an alpha-numeric character", [], ["alt", { "sourceInterval": [60, 78] }, ["app", { "sourceInterval": [60, 66] }, "letter", []], ["app", { "sourceInterval": [73, 78] }, "digit", []]]], "letter": ["define", { "sourceInterval": [82, 142] }, "a letter", [], ["alt", { "sourceInterval": [107, 142] }, ["app", { "sourceInterval": [107, 112] }, "lower", []], ["app", { "sourceInterval": [119, 124] }, "upper", []], ["app", { "sourceInterval": [131, 142] }, "unicodeLtmo", []]]], "digit": ["define", { "sourceInterval": [146, 177] }, "a digit", [], ["range", { "sourceInterval": [169, 177] }, "0", "9"]], "hexDigit": ["define", { "sourceInterval": [181, 254] }, "a hexadecimal digit", [], ["alt", { "sourceInterval": [219, 254] }, ["app", { "sourceInterval": [219, 224] }, "digit", []], ["range", { "sourceInterval": [231, 239] }, "a", "f"], ["range", { "sourceInterval": [246, 254] }, "A", "F"]]], "ListOf": ["define", { "sourceInterval": [258, 336] }, null, ["elem", "sep"], ["alt", { "sourceInterval": [282, 336] }, ["app", { "sourceInterval": [282, 307] }, "NonemptyListOf", [["param", { "sourceInterval": [297, 301] }, 0], ["param", { "sourceInterval": [303, 306] }, 1]]], ["app", { "sourceInterval": [314, 336] }, "EmptyListOf", [["param", { "sourceInterval": [326, 330] }, 0], ["param", { "sourceInterval": [332, 335] }, 1]]]]], "NonemptyListOf": ["define", { "sourceInterval": [340, 388] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [372, 388] }, ["param", { "sourceInterval": [372, 376] }, 0], ["star", { "sourceInterval": [377, 388] }, ["seq", { "sourceInterval": [378, 386] }, ["param", { "sourceInterval": [378, 381] }, 1], ["param", { "sourceInterval": [382, 386] }, 0]]]]], "EmptyListOf": ["define", { "sourceInterval": [392, 434] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [438, 438] }]], "listOf": ["define", { "sourceInterval": [438, 516] }, null, ["elem", "sep"], ["alt", { "sourceInterval": [462, 516] }, ["app", { "sourceInterval": [462, 487] }, "nonemptyListOf", [["param", { "sourceInterval": [477, 481] }, 0], ["param", { "sourceInterval": [483, 486] }, 1]]], ["app", { "sourceInterval": [494, 516] }, "emptyListOf", [["param", { "sourceInterval": [506, 510] }, 0], ["param", { "sourceInterval": [512, 515] }, 1]]]]], "nonemptyListOf": ["define", { "sourceInterval": [520, 568] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [552, 568] }, ["param", { "sourceInterval": [552, 556] }, 0], ["star", { "sourceInterval": [557, 568] }, ["seq", { "sourceInterval": [558, 566] }, ["param", { "sourceInterval": [558, 561] }, 1], ["param", { "sourceInterval": [562, 566] }, 0]]]]], "emptyListOf": ["define", { "sourceInterval": [572, 682] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [685, 685] }]], "applySyntactic": ["define", { "sourceInterval": [685, 710] }, null, ["app"], ["param", { "sourceInterval": [707, 710] }, 0]] }]);
        }
      });
      var require_grammarDeferredInit = __commonJS2({
        "node_modules/ohm-js/src/grammarDeferredInit.js"() {
          "use strict";
          var Grammar = require_Grammar();
          Grammar.BuiltInRules = require_built_in_rules();
        }
      });
      var require_operations_and_attributes = __commonJS2({
        "node_modules/ohm-js/dist/operations-and-attributes.js"(exports2, module2) {
          var { makeRecipe } = require_makeRecipe();
          module2.exports = makeRecipe(["grammar", { "source": 'OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = "(" ListOf<name, ","> ")"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = "_"\n    | letter\n\n  nameRest\n    = "_"\n    | alnum\n\n}' }, "OperationsAndAttributes", null, "AttributeSignature", { "AttributeSignature": ["define", { "sourceInterval": [29, 58] }, null, [], ["app", { "sourceInterval": [54, 58] }, "name", []]], "OperationSignature": ["define", { "sourceInterval": [62, 100] }, null, [], ["seq", { "sourceInterval": [87, 100] }, ["app", { "sourceInterval": [87, 91] }, "name", []], ["opt", { "sourceInterval": [92, 100] }, ["app", { "sourceInterval": [92, 99] }, "Formals", []]]]], "Formals": ["define", { "sourceInterval": [104, 143] }, null, [], ["seq", { "sourceInterval": [118, 143] }, ["terminal", { "sourceInterval": [118, 121] }, "("], ["app", { "sourceInterval": [122, 139] }, "ListOf", [["app", { "sourceInterval": [129, 133] }, "name", []], ["terminal", { "sourceInterval": [135, 138] }, ","]]], ["terminal", { "sourceInterval": [140, 143] }, ")"]]], "name": ["define", { "sourceInterval": [147, 187] }, "a name", [], ["seq", { "sourceInterval": [168, 187] }, ["app", { "sourceInterval": [168, 177] }, "nameFirst", []], ["star", { "sourceInterval": [178, 187] }, ["app", { "sourceInterval": [178, 186] }, "nameRest", []]]]], "nameFirst": ["define", { "sourceInterval": [191, 223] }, null, [], ["alt", { "sourceInterval": [207, 223] }, ["terminal", { "sourceInterval": [207, 210] }, "_"], ["app", { "sourceInterval": [217, 223] }, "letter", []]]], "nameRest": ["define", { "sourceInterval": [227, 257] }, null, [], ["alt", { "sourceInterval": [242, 257] }, ["terminal", { "sourceInterval": [242, 245] }, "_"], ["app", { "sourceInterval": [252, 257] }, "alnum", []]]] }]);
        }
      });
      var require_semanticsDeferredInit = __commonJS2({
        "node_modules/ohm-js/src/semanticsDeferredInit.js"() {
          "use strict";
          var Semantics = require_Semantics();
          var util = require_util();
          util.awaitBuiltInRules((builtInRules) => {
            const operationsAndAttributesGrammar = require_operations_and_attributes();
            initBuiltInSemantics(builtInRules);
            initPrototypeParser(operationsAndAttributesGrammar);
          });
          function initBuiltInSemantics(builtInRules) {
            const actions = {
              empty() {
                return this.iteration();
              },
              nonEmpty(first, _, rest) {
                return this.iteration([first].concat(rest.children));
              }
            };
            Semantics.BuiltInSemantics = Semantics.createSemantics(builtInRules, null).addOperation("asIteration", {
              emptyListOf: actions.empty,
              nonemptyListOf: actions.nonEmpty,
              EmptyListOf: actions.empty,
              NonemptyListOf: actions.nonEmpty
            });
          }
          function initPrototypeParser(grammar3) {
            Semantics.prototypeGrammarSemantics = grammar3.createSemantics().addOperation("parse", {
              AttributeSignature(name) {
                return {
                  name: name.parse(),
                  formals: []
                };
              },
              OperationSignature(name, optFormals) {
                return {
                  name: name.parse(),
                  formals: optFormals.children.map((c) => c.parse())[0] || []
                };
              },
              Formals(oparen, fs, cparen) {
                return fs.asIteration().children.map((c) => c.parse());
              },
              name(first, rest) {
                return this.sourceString;
              }
            });
            Semantics.prototypeGrammar = grammar3;
          }
        }
      });
      var require_deferredInit = __commonJS2({
        "node_modules/ohm-js/src/deferredInit.js"() {
          "use strict";
          require_grammarDeferredInit();
          require_semanticsDeferredInit();
        }
      });
      var require_ohm_grammar = __commonJS2({
        "node_modules/ohm-js/dist/ohm-grammar.js"(exports2, module2) {
          var { makeRecipe } = require_makeRecipe();
          module2.exports = makeRecipe(["grammar", { "source": `Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}` }, "Ohm", null, "Grammars", { "Grammars": ["define", { "sourceInterval": [9, 32] }, null, [], ["star", { "sourceInterval": [24, 32] }, ["app", { "sourceInterval": [24, 31] }, "Grammar", []]]], "Grammar": ["define", { "sourceInterval": [36, 83] }, null, [], ["seq", { "sourceInterval": [50, 83] }, ["app", { "sourceInterval": [50, 55] }, "ident", []], ["opt", { "sourceInterval": [56, 69] }, ["app", { "sourceInterval": [56, 68] }, "SuperGrammar", []]], ["terminal", { "sourceInterval": [70, 73] }, "{"], ["star", { "sourceInterval": [74, 79] }, ["app", { "sourceInterval": [74, 78] }, "Rule", []]], ["terminal", { "sourceInterval": [80, 83] }, "}"]]], "SuperGrammar": ["define", { "sourceInterval": [87, 116] }, null, [], ["seq", { "sourceInterval": [106, 116] }, ["terminal", { "sourceInterval": [106, 110] }, "<:"], ["app", { "sourceInterval": [111, 116] }, "ident", []]]], "Rule_define": ["define", { "sourceInterval": [131, 181] }, null, [], ["seq", { "sourceInterval": [131, 170] }, ["app", { "sourceInterval": [131, 136] }, "ident", []], ["opt", { "sourceInterval": [137, 145] }, ["app", { "sourceInterval": [137, 144] }, "Formals", []]], ["opt", { "sourceInterval": [146, 156] }, ["app", { "sourceInterval": [146, 155] }, "ruleDescr", []]], ["terminal", { "sourceInterval": [157, 160] }, "="], ["app", { "sourceInterval": [162, 170] }, "RuleBody", []]]], "Rule_override": ["define", { "sourceInterval": [188, 248] }, null, [], ["seq", { "sourceInterval": [188, 235] }, ["app", { "sourceInterval": [188, 193] }, "ident", []], ["opt", { "sourceInterval": [194, 202] }, ["app", { "sourceInterval": [194, 201] }, "Formals", []]], ["terminal", { "sourceInterval": [214, 218] }, ":="], ["app", { "sourceInterval": [219, 235] }, "OverrideRuleBody", []]]], "Rule_extend": ["define", { "sourceInterval": [255, 305] }, null, [], ["seq", { "sourceInterval": [255, 294] }, ["app", { "sourceInterval": [255, 260] }, "ident", []], ["opt", { "sourceInterval": [261, 269] }, ["app", { "sourceInterval": [261, 268] }, "Formals", []]], ["terminal", { "sourceInterval": [281, 285] }, "+="], ["app", { "sourceInterval": [286, 294] }, "RuleBody", []]]], "Rule": ["define", { "sourceInterval": [120, 305] }, null, [], ["alt", { "sourceInterval": [131, 305] }, ["app", { "sourceInterval": [131, 170] }, "Rule_define", []], ["app", { "sourceInterval": [188, 235] }, "Rule_override", []], ["app", { "sourceInterval": [255, 294] }, "Rule_extend", []]]], "RuleBody": ["define", { "sourceInterval": [309, 362] }, null, [], ["seq", { "sourceInterval": [324, 362] }, ["opt", { "sourceInterval": [324, 328] }, ["terminal", { "sourceInterval": [324, 327] }, "|"]], ["app", { "sourceInterval": [329, 362] }, "NonemptyListOf", [["app", { "sourceInterval": [344, 356] }, "TopLevelTerm", []], ["terminal", { "sourceInterval": [358, 361] }, "|"]]]]], "TopLevelTerm_inline": ["define", { "sourceInterval": [385, 408] }, null, [], ["seq", { "sourceInterval": [385, 397] }, ["app", { "sourceInterval": [385, 388] }, "Seq", []], ["app", { "sourceInterval": [389, 397] }, "caseName", []]]], "TopLevelTerm": ["define", { "sourceInterval": [366, 418] }, null, [], ["alt", { "sourceInterval": [385, 418] }, ["app", { "sourceInterval": [385, 397] }, "TopLevelTerm_inline", []], ["app", { "sourceInterval": [415, 418] }, "Seq", []]]], "OverrideRuleBody": ["define", { "sourceInterval": [422, 491] }, null, [], ["seq", { "sourceInterval": [445, 491] }, ["opt", { "sourceInterval": [445, 449] }, ["terminal", { "sourceInterval": [445, 448] }, "|"]], ["app", { "sourceInterval": [450, 491] }, "NonemptyListOf", [["app", { "sourceInterval": [465, 485] }, "OverrideTopLevelTerm", []], ["terminal", { "sourceInterval": [487, 490] }, "|"]]]]], "OverrideTopLevelTerm_superSplice": ["define", { "sourceInterval": [522, 543] }, null, [], ["terminal", { "sourceInterval": [522, 527] }, "..."]], "OverrideTopLevelTerm": ["define", { "sourceInterval": [495, 562] }, null, [], ["alt", { "sourceInterval": [522, 562] }, ["app", { "sourceInterval": [522, 527] }, "OverrideTopLevelTerm_superSplice", []], ["app", { "sourceInterval": [550, 562] }, "TopLevelTerm", []]]], "Formals": ["define", { "sourceInterval": [566, 606] }, null, [], ["seq", { "sourceInterval": [580, 606] }, ["terminal", { "sourceInterval": [580, 583] }, "<"], ["app", { "sourceInterval": [584, 602] }, "ListOf", [["app", { "sourceInterval": [591, 596] }, "ident", []], ["terminal", { "sourceInterval": [598, 601] }, ","]]], ["terminal", { "sourceInterval": [603, 606] }, ">"]]], "Params": ["define", { "sourceInterval": [610, 647] }, null, [], ["seq", { "sourceInterval": [623, 647] }, ["terminal", { "sourceInterval": [623, 626] }, "<"], ["app", { "sourceInterval": [627, 643] }, "ListOf", [["app", { "sourceInterval": [634, 637] }, "Seq", []], ["terminal", { "sourceInterval": [639, 642] }, ","]]], ["terminal", { "sourceInterval": [644, 647] }, ">"]]], "Alt": ["define", { "sourceInterval": [651, 685] }, null, [], ["app", { "sourceInterval": [661, 685] }, "NonemptyListOf", [["app", { "sourceInterval": [676, 679] }, "Seq", []], ["terminal", { "sourceInterval": [681, 684] }, "|"]]]], "Seq": ["define", { "sourceInterval": [689, 704] }, null, [], ["star", { "sourceInterval": [699, 704] }, ["app", { "sourceInterval": [699, 703] }, "Iter", []]]], "Iter_star": ["define", { "sourceInterval": [719, 736] }, null, [], ["seq", { "sourceInterval": [719, 727] }, ["app", { "sourceInterval": [719, 723] }, "Pred", []], ["terminal", { "sourceInterval": [724, 727] }, "*"]]], "Iter_plus": ["define", { "sourceInterval": [743, 760] }, null, [], ["seq", { "sourceInterval": [743, 751] }, ["app", { "sourceInterval": [743, 747] }, "Pred", []], ["terminal", { "sourceInterval": [748, 751] }, "+"]]], "Iter_opt": ["define", { "sourceInterval": [767, 783] }, null, [], ["seq", { "sourceInterval": [767, 775] }, ["app", { "sourceInterval": [767, 771] }, "Pred", []], ["terminal", { "sourceInterval": [772, 775] }, "?"]]], "Iter": ["define", { "sourceInterval": [708, 794] }, null, [], ["alt", { "sourceInterval": [719, 794] }, ["app", { "sourceInterval": [719, 727] }, "Iter_star", []], ["app", { "sourceInterval": [743, 751] }, "Iter_plus", []], ["app", { "sourceInterval": [767, 775] }, "Iter_opt", []], ["app", { "sourceInterval": [790, 794] }, "Pred", []]]], "Pred_not": ["define", { "sourceInterval": [809, 824] }, null, [], ["seq", { "sourceInterval": [809, 816] }, ["terminal", { "sourceInterval": [809, 812] }, "~"], ["app", { "sourceInterval": [813, 816] }, "Lex", []]]], "Pred_lookahead": ["define", { "sourceInterval": [831, 852] }, null, [], ["seq", { "sourceInterval": [831, 838] }, ["terminal", { "sourceInterval": [831, 834] }, "&"], ["app", { "sourceInterval": [835, 838] }, "Lex", []]]], "Pred": ["define", { "sourceInterval": [798, 862] }, null, [], ["alt", { "sourceInterval": [809, 862] }, ["app", { "sourceInterval": [809, 816] }, "Pred_not", []], ["app", { "sourceInterval": [831, 838] }, "Pred_lookahead", []], ["app", { "sourceInterval": [859, 862] }, "Lex", []]]], "Lex_lex": ["define", { "sourceInterval": [876, 892] }, null, [], ["seq", { "sourceInterval": [876, 884] }, ["terminal", { "sourceInterval": [876, 879] }, "#"], ["app", { "sourceInterval": [880, 884] }, "Base", []]]], "Lex": ["define", { "sourceInterval": [866, 903] }, null, [], ["alt", { "sourceInterval": [876, 903] }, ["app", { "sourceInterval": [876, 884] }, "Lex_lex", []], ["app", { "sourceInterval": [899, 903] }, "Base", []]]], "Base_application": ["define", { "sourceInterval": [918, 979] }, null, [], ["seq", { "sourceInterval": [918, 963] }, ["app", { "sourceInterval": [918, 923] }, "ident", []], ["opt", { "sourceInterval": [924, 931] }, ["app", { "sourceInterval": [924, 930] }, "Params", []]], ["not", { "sourceInterval": [932, 963] }, ["alt", { "sourceInterval": [934, 962] }, ["seq", { "sourceInterval": [934, 948] }, ["opt", { "sourceInterval": [934, 944] }, ["app", { "sourceInterval": [934, 943] }, "ruleDescr", []]], ["terminal", { "sourceInterval": [945, 948] }, "="]], ["terminal", { "sourceInterval": [951, 955] }, ":="], ["terminal", { "sourceInterval": [958, 962] }, "+="]]]]], "Base_range": ["define", { "sourceInterval": [986, 1041] }, null, [], ["seq", { "sourceInterval": [986, 1022] }, ["app", { "sourceInterval": [986, 1001] }, "oneCharTerminal", []], ["terminal", { "sourceInterval": [1002, 1006] }, ".."], ["app", { "sourceInterval": [1007, 1022] }, "oneCharTerminal", []]]], "Base_terminal": ["define", { "sourceInterval": [1048, 1106] }, null, [], ["app", { "sourceInterval": [1048, 1056] }, "terminal", []]], "Base_paren": ["define", { "sourceInterval": [1113, 1168] }, null, [], ["seq", { "sourceInterval": [1113, 1124] }, ["terminal", { "sourceInterval": [1113, 1116] }, "("], ["app", { "sourceInterval": [1117, 1120] }, "Alt", []], ["terminal", { "sourceInterval": [1121, 1124] }, ")"]]], "Base": ["define", { "sourceInterval": [907, 1168] }, null, [], ["alt", { "sourceInterval": [918, 1168] }, ["app", { "sourceInterval": [918, 963] }, "Base_application", []], ["app", { "sourceInterval": [986, 1022] }, "Base_range", []], ["app", { "sourceInterval": [1048, 1056] }, "Base_terminal", []], ["app", { "sourceInterval": [1113, 1124] }, "Base_paren", []]]], "ruleDescr": ["define", { "sourceInterval": [1172, 1231] }, "a rule description", [], ["seq", { "sourceInterval": [1210, 1231] }, ["terminal", { "sourceInterval": [1210, 1213] }, "("], ["app", { "sourceInterval": [1214, 1227] }, "ruleDescrText", []], ["terminal", { "sourceInterval": [1228, 1231] }, ")"]]], "ruleDescrText": ["define", { "sourceInterval": [1235, 1266] }, null, [], ["star", { "sourceInterval": [1255, 1266] }, ["seq", { "sourceInterval": [1256, 1264] }, ["not", { "sourceInterval": [1256, 1260] }, ["terminal", { "sourceInterval": [1257, 1260] }, ")"]], ["app", { "sourceInterval": [1261, 1264] }, "any", []]]]], "caseName": ["define", { "sourceInterval": [1270, 1338] }, null, [], ["seq", { "sourceInterval": [1285, 1338] }, ["terminal", { "sourceInterval": [1285, 1289] }, "--"], ["star", { "sourceInterval": [1290, 1304] }, ["seq", { "sourceInterval": [1291, 1302] }, ["not", { "sourceInterval": [1291, 1296] }, ["terminal", { "sourceInterval": [1292, 1296] }, "\n"]], ["app", { "sourceInterval": [1297, 1302] }, "space", []]]], ["app", { "sourceInterval": [1305, 1309] }, "name", []], ["star", { "sourceInterval": [1310, 1324] }, ["seq", { "sourceInterval": [1311, 1322] }, ["not", { "sourceInterval": [1311, 1316] }, ["terminal", { "sourceInterval": [1312, 1316] }, "\n"]], ["app", { "sourceInterval": [1317, 1322] }, "space", []]]], ["alt", { "sourceInterval": [1326, 1337] }, ["terminal", { "sourceInterval": [1326, 1330] }, "\n"], ["lookahead", { "sourceInterval": [1333, 1337] }, ["terminal", { "sourceInterval": [1334, 1337] }, "}"]]]]], "name": ["define", { "sourceInterval": [1342, 1382] }, "a name", [], ["seq", { "sourceInterval": [1363, 1382] }, ["app", { "sourceInterval": [1363, 1372] }, "nameFirst", []], ["star", { "sourceInterval": [1373, 1382] }, ["app", { "sourceInterval": [1373, 1381] }, "nameRest", []]]]], "nameFirst": ["define", { "sourceInterval": [1386, 1418] }, null, [], ["alt", { "sourceInterval": [1402, 1418] }, ["terminal", { "sourceInterval": [1402, 1405] }, "_"], ["app", { "sourceInterval": [1412, 1418] }, "letter", []]]], "nameRest": ["define", { "sourceInterval": [1422, 1452] }, null, [], ["alt", { "sourceInterval": [1437, 1452] }, ["terminal", { "sourceInterval": [1437, 1440] }, "_"], ["app", { "sourceInterval": [1447, 1452] }, "alnum", []]]], "ident": ["define", { "sourceInterval": [1456, 1489] }, "an identifier", [], ["app", { "sourceInterval": [1485, 1489] }, "name", []]], "terminal": ["define", { "sourceInterval": [1493, 1531] }, null, [], ["seq", { "sourceInterval": [1508, 1531] }, ["terminal", { "sourceInterval": [1508, 1512] }, '"'], ["star", { "sourceInterval": [1513, 1526] }, ["app", { "sourceInterval": [1513, 1525] }, "terminalChar", []]], ["terminal", { "sourceInterval": [1527, 1531] }, '"']]], "oneCharTerminal": ["define", { "sourceInterval": [1535, 1579] }, null, [], ["seq", { "sourceInterval": [1557, 1579] }, ["terminal", { "sourceInterval": [1557, 1561] }, '"'], ["app", { "sourceInterval": [1562, 1574] }, "terminalChar", []], ["terminal", { "sourceInterval": [1575, 1579] }, '"']]], "terminalChar": ["define", { "sourceInterval": [1583, 1660] }, null, [], ["alt", { "sourceInterval": [1602, 1660] }, ["app", { "sourceInterval": [1602, 1612] }, "escapeChar", []], ["seq", { "sourceInterval": [1621, 1660] }, ["not", { "sourceInterval": [1621, 1626] }, ["terminal", { "sourceInterval": [1622, 1626] }, "\\"]], ["not", { "sourceInterval": [1627, 1632] }, ["terminal", { "sourceInterval": [1628, 1632] }, '"']], ["not", { "sourceInterval": [1633, 1638] }, ["terminal", { "sourceInterval": [1634, 1638] }, "\n"]], ["range", { "sourceInterval": [1639, 1660] }, "\0", "\u{10FFFF}"]]]], "escapeChar_backslash": ["define", { "sourceInterval": [1703, 1758] }, null, [], ["terminal", { "sourceInterval": [1703, 1709] }, "\\\\"]], "escapeChar_doubleQuote": ["define", { "sourceInterval": [1765, 1822] }, null, [], ["terminal", { "sourceInterval": [1765, 1771] }, '\\"']], "escapeChar_singleQuote": ["define", { "sourceInterval": [1829, 1886] }, null, [], ["terminal", { "sourceInterval": [1829, 1835] }, "\\'"]], "escapeChar_backspace": ["define", { "sourceInterval": [1893, 1948] }, null, [], ["terminal", { "sourceInterval": [1893, 1898] }, "\\b"]], "escapeChar_lineFeed": ["define", { "sourceInterval": [1955, 2009] }, null, [], ["terminal", { "sourceInterval": [1955, 1960] }, "\\n"]], "escapeChar_carriageReturn": ["define", { "sourceInterval": [2016, 2076] }, null, [], ["terminal", { "sourceInterval": [2016, 2021] }, "\\r"]], "escapeChar_tab": ["define", { "sourceInterval": [2083, 2132] }, null, [], ["terminal", { "sourceInterval": [2083, 2088] }, "\\t"]], "escapeChar_unicodeCodePoint": ["define", { "sourceInterval": [2139, 2243] }, null, [], ["seq", { "sourceInterval": [2139, 2221] }, ["terminal", { "sourceInterval": [2139, 2145] }, "\\u{"], ["app", { "sourceInterval": [2146, 2154] }, "hexDigit", []], ["opt", { "sourceInterval": [2155, 2164] }, ["app", { "sourceInterval": [2155, 2163] }, "hexDigit", []]], ["opt", { "sourceInterval": [2165, 2174] }, ["app", { "sourceInterval": [2165, 2173] }, "hexDigit", []]], ["opt", { "sourceInterval": [2188, 2197] }, ["app", { "sourceInterval": [2188, 2196] }, "hexDigit", []]], ["opt", { "sourceInterval": [2198, 2207] }, ["app", { "sourceInterval": [2198, 2206] }, "hexDigit", []]], ["opt", { "sourceInterval": [2208, 2217] }, ["app", { "sourceInterval": [2208, 2216] }, "hexDigit", []]], ["terminal", { "sourceInterval": [2218, 2221] }, "}"]]], "escapeChar_unicodeEscape": ["define", { "sourceInterval": [2250, 2309] }, null, [], ["seq", { "sourceInterval": [2250, 2291] }, ["terminal", { "sourceInterval": [2250, 2255] }, "\\u"], ["app", { "sourceInterval": [2256, 2264] }, "hexDigit", []], ["app", { "sourceInterval": [2265, 2273] }, "hexDigit", []], ["app", { "sourceInterval": [2274, 2282] }, "hexDigit", []], ["app", { "sourceInterval": [2283, 2291] }, "hexDigit", []]]], "escapeChar_hexEscape": ["define", { "sourceInterval": [2316, 2371] }, null, [], ["seq", { "sourceInterval": [2316, 2339] }, ["terminal", { "sourceInterval": [2316, 2321] }, "\\x"], ["app", { "sourceInterval": [2322, 2330] }, "hexDigit", []], ["app", { "sourceInterval": [2331, 2339] }, "hexDigit", []]]], "escapeChar": ["define", { "sourceInterval": [1664, 2371] }, "an escape sequence", [], ["alt", { "sourceInterval": [1703, 2371] }, ["app", { "sourceInterval": [1703, 1709] }, "escapeChar_backslash", []], ["app", { "sourceInterval": [1765, 1771] }, "escapeChar_doubleQuote", []], ["app", { "sourceInterval": [1829, 1835] }, "escapeChar_singleQuote", []], ["app", { "sourceInterval": [1893, 1898] }, "escapeChar_backspace", []], ["app", { "sourceInterval": [1955, 1960] }, "escapeChar_lineFeed", []], ["app", { "sourceInterval": [2016, 2021] }, "escapeChar_carriageReturn", []], ["app", { "sourceInterval": [2083, 2088] }, "escapeChar_tab", []], ["app", { "sourceInterval": [2139, 2221] }, "escapeChar_unicodeCodePoint", []], ["app", { "sourceInterval": [2250, 2291] }, "escapeChar_unicodeEscape", []], ["app", { "sourceInterval": [2316, 2339] }, "escapeChar_hexEscape", []]]], "space": ["extend", { "sourceInterval": [2375, 2394] }, null, [], ["app", { "sourceInterval": [2387, 2394] }, "comment", []]], "comment_singleLine": ["define", { "sourceInterval": [2412, 2458] }, null, [], ["seq", { "sourceInterval": [2412, 2443] }, ["terminal", { "sourceInterval": [2412, 2416] }, "//"], ["star", { "sourceInterval": [2417, 2429] }, ["seq", { "sourceInterval": [2418, 2427] }, ["not", { "sourceInterval": [2418, 2423] }, ["terminal", { "sourceInterval": [2419, 2423] }, "\n"]], ["app", { "sourceInterval": [2424, 2427] }, "any", []]]], ["lookahead", { "sourceInterval": [2430, 2443] }, ["alt", { "sourceInterval": [2432, 2442] }, ["terminal", { "sourceInterval": [2432, 2436] }, "\n"], ["app", { "sourceInterval": [2439, 2442] }, "end", []]]]]], "comment_multiLine": ["define", { "sourceInterval": [2465, 2501] }, null, [], ["seq", { "sourceInterval": [2465, 2487] }, ["terminal", { "sourceInterval": [2465, 2469] }, "/*"], ["star", { "sourceInterval": [2470, 2482] }, ["seq", { "sourceInterval": [2471, 2480] }, ["not", { "sourceInterval": [2471, 2476] }, ["terminal", { "sourceInterval": [2472, 2476] }, "*/"]], ["app", { "sourceInterval": [2477, 2480] }, "any", []]]], ["terminal", { "sourceInterval": [2483, 2487] }, "*/"]]], "comment": ["define", { "sourceInterval": [2398, 2501] }, null, [], ["alt", { "sourceInterval": [2412, 2501] }, ["app", { "sourceInterval": [2412, 2443] }, "comment_singleLine", []], ["app", { "sourceInterval": [2465, 2487] }, "comment_multiLine", []]]], "tokens": ["define", { "sourceInterval": [2505, 2520] }, null, [], ["star", { "sourceInterval": [2514, 2520] }, ["app", { "sourceInterval": [2514, 2519] }, "token", []]]], "token": ["define", { "sourceInterval": [2524, 2600] }, null, [], ["alt", { "sourceInterval": [2532, 2600] }, ["app", { "sourceInterval": [2532, 2540] }, "caseName", []], ["app", { "sourceInterval": [2543, 2550] }, "comment", []], ["app", { "sourceInterval": [2553, 2558] }, "ident", []], ["app", { "sourceInterval": [2561, 2569] }, "operator", []], ["app", { "sourceInterval": [2572, 2583] }, "punctuation", []], ["app", { "sourceInterval": [2586, 2594] }, "terminal", []], ["app", { "sourceInterval": [2597, 2600] }, "any", []]]], "operator": ["define", { "sourceInterval": [2604, 2669] }, null, [], ["alt", { "sourceInterval": [2615, 2669] }, ["terminal", { "sourceInterval": [2615, 2619] }, "<:"], ["terminal", { "sourceInterval": [2622, 2625] }, "="], ["terminal", { "sourceInterval": [2628, 2632] }, ":="], ["terminal", { "sourceInterval": [2635, 2639] }, "+="], ["terminal", { "sourceInterval": [2642, 2645] }, "*"], ["terminal", { "sourceInterval": [2648, 2651] }, "+"], ["terminal", { "sourceInterval": [2654, 2657] }, "?"], ["terminal", { "sourceInterval": [2660, 2663] }, "~"], ["terminal", { "sourceInterval": [2666, 2669] }, "&"]]], "punctuation": ["define", { "sourceInterval": [2673, 2709] }, null, [], ["alt", { "sourceInterval": [2687, 2709] }, ["terminal", { "sourceInterval": [2687, 2690] }, "<"], ["terminal", { "sourceInterval": [2693, 2696] }, ">"], ["terminal", { "sourceInterval": [2699, 2702] }, ","], ["terminal", { "sourceInterval": [2705, 2709] }, "--"]]] }]);
        }
      });
      var require_main = __commonJS2({
        "node_modules/ohm-js/src/main.js"(exports2, module2) {
          "use strict";
          var Builder = require_Builder();
          var Grammar = require_Grammar();
          var Namespace = require_Namespace();
          var common = require_common();
          var errors = require_errors();
          var pexprs = require_pexprs();
          var util = require_util();
          var version = require_version();
          var { makeRecipe } = require_makeRecipe();
          var ohmGrammar;
          var superSplicePlaceholder = Object.create(pexprs.PExpr.prototype);
          var isBuffer = (obj) => !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
          function buildGrammar(match, namespace, optOhmGrammarForTesting) {
            const builder = new Builder();
            let decl;
            let currentRuleName;
            let currentRuleFormals;
            let overriding = false;
            const metaGrammar = optOhmGrammarForTesting || ohmGrammar;
            const helpers = metaGrammar.createSemantics().addOperation("visit", {
              Grammars(grammarIter) {
                return grammarIter.children.map((c) => c.visit());
              },
              Grammar(id, s, _open, rules, _close) {
                const grammarName = id.visit();
                decl = builder.newGrammar(grammarName, namespace);
                s.child(0) && s.child(0).visit();
                rules.children.map((c) => c.visit());
                const g = decl.build();
                g.source = this.source.trimmed();
                if (grammarName in namespace) {
                  throw errors.duplicateGrammarDeclaration(g, namespace);
                }
                namespace[grammarName] = g;
                return g;
              },
              SuperGrammar(_, n) {
                const superGrammarName = n.visit();
                if (superGrammarName === "null") {
                  decl.withSuperGrammar(null);
                } else {
                  if (!namespace || !(superGrammarName in namespace)) {
                    throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
                  }
                  decl.withSuperGrammar(namespace[superGrammarName]);
                }
              },
              Rule_define(n, fs, d, _, b) {
                currentRuleName = n.visit();
                currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
                if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
                  decl.withDefaultStartRule(currentRuleName);
                }
                const body = b.visit();
                const description = d.children.map((c) => c.visit())[0];
                const source = this.source.trimmed();
                return decl.define(currentRuleName, currentRuleFormals, body, description, source);
              },
              Rule_override(n, fs, _, b) {
                currentRuleName = n.visit();
                currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
                const source = this.source.trimmed();
                decl.ensureSuperGrammarRuleForOverriding(currentRuleName, source);
                overriding = true;
                const body = b.visit();
                overriding = false;
                return decl.override(currentRuleName, currentRuleFormals, body, null, source);
              },
              Rule_extend(n, fs, _, b) {
                currentRuleName = n.visit();
                currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
                const body = b.visit();
                const source = this.source.trimmed();
                return decl.extend(currentRuleName, currentRuleFormals, body, null, source);
              },
              RuleBody(_, terms) {
                return builder.alt(...terms.visit()).withSource(this.source);
              },
              OverrideRuleBody(_, terms) {
                const args = terms.visit();
                const expansionPos = args.indexOf(superSplicePlaceholder);
                if (expansionPos >= 0) {
                  const beforeTerms = args.slice(0, expansionPos);
                  const afterTerms = args.slice(expansionPos + 1);
                  afterTerms.forEach((t) => {
                    if (t === superSplicePlaceholder)
                      throw errors.multipleSuperSplices(t);
                  });
                  return new pexprs.Splice(decl.superGrammar, currentRuleName, beforeTerms, afterTerms).withSource(this.source);
                } else {
                  return builder.alt(...args).withSource(this.source);
                }
              },
              Formals(opointy, fs, cpointy) {
                return fs.visit();
              },
              Params(opointy, ps, cpointy) {
                return ps.visit();
              },
              Alt(seqs) {
                return builder.alt(...seqs.visit()).withSource(this.source);
              },
              TopLevelTerm_inline(b, n) {
                const inlineRuleName = currentRuleName + "_" + n.visit();
                const body = b.visit();
                const source = this.source.trimmed();
                const isNewRuleDeclaration = !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
                if (overriding && !isNewRuleDeclaration) {
                  decl.override(inlineRuleName, currentRuleFormals, body, null, source);
                } else {
                  decl.define(inlineRuleName, currentRuleFormals, body, null, source);
                }
                const params = currentRuleFormals.map((formal) => builder.app(formal));
                return builder.app(inlineRuleName, params).withSource(body.source);
              },
              OverrideTopLevelTerm_superSplice(_) {
                return superSplicePlaceholder;
              },
              Seq(expr) {
                return builder.seq(...expr.children.map((c) => c.visit())).withSource(this.source);
              },
              Iter_star(x, _) {
                return builder.star(x.visit()).withSource(this.source);
              },
              Iter_plus(x, _) {
                return builder.plus(x.visit()).withSource(this.source);
              },
              Iter_opt(x, _) {
                return builder.opt(x.visit()).withSource(this.source);
              },
              Pred_not(_, x) {
                return builder.not(x.visit()).withSource(this.source);
              },
              Pred_lookahead(_, x) {
                return builder.lookahead(x.visit()).withSource(this.source);
              },
              Lex_lex(_, x) {
                return builder.lex(x.visit()).withSource(this.source);
              },
              Base_application(rule, ps) {
                const params = ps.children.map((c) => c.visit())[0] || [];
                return builder.app(rule.visit(), params).withSource(this.source);
              },
              Base_range(from, _, to) {
                return builder.range(from.visit(), to.visit()).withSource(this.source);
              },
              Base_terminal(expr) {
                return builder.terminal(expr.visit()).withSource(this.source);
              },
              Base_paren(open, x, close) {
                return x.visit();
              },
              ruleDescr(open, t, close) {
                return t.visit();
              },
              ruleDescrText(_) {
                return this.sourceString.trim();
              },
              caseName(_, space1, n, space2, end) {
                return n.visit();
              },
              name(first, rest) {
                return this.sourceString;
              },
              nameFirst(expr) {
              },
              nameRest(expr) {
              },
              terminal(open, cs, close) {
                return cs.children.map((c) => c.visit()).join("");
              },
              oneCharTerminal(open, c, close) {
                return c.visit();
              },
              escapeChar(c) {
                try {
                  return common.unescapeCodePoint(this.sourceString);
                } catch (err) {
                  if (err instanceof RangeError && err.message.startsWith("Invalid code point ")) {
                    throw errors.invalidCodePoint(c);
                  }
                  throw err;
                }
              },
              NonemptyListOf(x, _, xs) {
                return [x.visit()].concat(xs.children.map((c) => c.visit()));
              },
              EmptyListOf() {
                return [];
              },
              _terminal() {
                return this.sourceString;
              }
            });
            return helpers(match).visit();
          }
          function compileAndLoad(source, namespace) {
            const m = ohmGrammar.match(source, "Grammars");
            if (m.failed()) {
              throw errors.grammarSyntaxError(m);
            }
            return buildGrammar(m, namespace);
          }
          function grammar3(source, optNamespace) {
            const ns = grammars(source, optNamespace);
            const grammarNames = Object.keys(ns);
            if (grammarNames.length === 0) {
              throw new Error("Missing grammar definition");
            } else if (grammarNames.length > 1) {
              const secondGrammar = ns[grammarNames[1]];
              const interval = secondGrammar.source;
              throw new Error(util.getLineAndColumnMessage(interval.sourceString, interval.startIdx) + "Found more than one grammar definition -- use ohm.grammars() instead.");
            }
            return ns[grammarNames[0]];
          }
          function grammars(source, optNamespace) {
            const ns = Namespace.extend(Namespace.asNamespace(optNamespace));
            if (typeof source !== "string") {
              if (isBuffer(source)) {
                source = source.toString();
              } else {
                throw new TypeError("Expected string as first argument, got " + common.unexpectedObjToString(source));
              }
            }
            compileAndLoad(source, ns);
            return ns;
          }
          function grammarFromScriptElement(optNode) {
            throw new Error("grammarFromScriptElement was removed in Ohm v16.0. See https://ohmjs.org/d/gfs for more info.");
          }
          function grammarsFromScriptElements(optNodeOrNodeList) {
            throw new Error("grammarsFromScriptElements was removed in Ohm v16.0. See https://ohmjs.org/d/gfs for more info.");
          }
          module2.exports = {
            createNamespace: Namespace.createNamespace,
            grammar: grammar3,
            grammars,
            grammarFromScriptElement,
            grammarsFromScriptElements,
            makeRecipe,
            ohmGrammar: null,
            // Initialized below, after Grammar.BuiltInRules.
            pexprs,
            util,
            version
          };
          module2.exports._buildGrammar = buildGrammar;
          require_deferredInit();
          util.announceBuiltInRules(Grammar.BuiltInRules);
          module2.exports.ohmGrammar = ohmGrammar = require_ohm_grammar();
          Grammar.initApplicationParser(ohmGrammar, buildGrammar);
        }
      });
      var require_VisitorFamily = __commonJS2({
        "node_modules/ohm-js/extras/VisitorFamily.js"(exports2, module2) {
          "use strict";
          var { assert } = require_common();
          function getProp(name, thing, fn) {
            return fn(thing[name]);
          }
          function mapProp(name, thing, fn) {
            return thing[name].map(fn);
          }
          function getPropWalkFn(descriptor) {
            const parts = descriptor.split(/ ?\[\]/);
            if (parts.length === 2) {
              return mapProp.bind(null, parts[0]);
            }
            return getProp.bind(null, descriptor);
          }
          function getProps(walkFns, thing, fn) {
            return walkFns.map((walkFn) => walkFn(thing, fn));
          }
          function getWalkFn(shape) {
            if (typeof shape === "string") {
              return getProps.bind(null, [getPropWalkFn(shape)]);
            } else if (Array.isArray(shape)) {
              return getProps.bind(null, shape.map(getPropWalkFn));
            } else {
              assert(typeof shape === "function", "Expected a string, Array, or function");
              assert(shape.length === 2, "Expected a function of arity 2, got " + shape.length);
              return shape;
            }
          }
          function isRestrictedIdentifier(str) {
            return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(str);
          }
          function trim(s) {
            return s.trim();
          }
          function parseSignature(sig) {
            const parts = sig.split(/[()]/).map(trim);
            if (parts.length === 3 && parts[2] === "") {
              const name = parts[0];
              let params = [];
              if (parts[1].length > 0) {
                params = parts[1].split(",").map(trim);
              }
              if (isRestrictedIdentifier(name) && params.every(isRestrictedIdentifier)) {
                return { name, formals: params };
              }
            }
            throw new Error("Invalid operation signature: " + sig);
          }
          function VisitorFamily(config) {
            this._shapes = config.shapes;
            this._getTag = config.getTag;
            this.Adapter = function(thing, family) {
              this._adaptee = thing;
              this._family = family;
            };
            this.Adapter.prototype.valueOf = function() {
              throw new Error("heeey!");
            };
            this.operations = {};
            this._arities = /* @__PURE__ */ Object.create(null);
            this._getChildren = /* @__PURE__ */ Object.create(null);
            Object.keys(this._shapes).forEach((k) => {
              const shape = this._shapes[k];
              this._getChildren[k] = getWalkFn(shape);
              if (typeof shape !== "function") {
                this._arities[k] = Array.isArray(shape) ? shape.length : 1;
              }
            });
            this._wrap = (thing) => new this.Adapter(thing, this);
          }
          VisitorFamily.prototype.wrap = function(thing) {
            return this._wrap(thing);
          };
          VisitorFamily.prototype._checkActionDict = function(dict) {
            Object.keys(dict).forEach((k) => {
              assert(k in this._getChildren, "Unrecognized action name '" + k + "'");
              const action = dict[k];
              assert(typeof action === "function", "Key '" + k + "': expected function, got " + action);
              if (k in this._arities) {
                const expected = this._arities[k];
                const actual = dict[k].length;
                assert(actual === expected, "Action '" + k + "' has the wrong arity: expected " + expected + ", got " + actual);
              }
            });
          };
          VisitorFamily.prototype.addOperation = function(signature, actions) {
            const sig = parseSignature(signature);
            const { name } = sig;
            this._checkActionDict(actions);
            this.operations[name] = {
              name,
              formals: sig.formals,
              actions
            };
            const family = this;
            this.Adapter.prototype[name] = function(...args) {
              const tag2 = family._getTag(this._adaptee);
              assert(tag2 in family._getChildren, "getTag returned unrecognized tag '" + tag2 + "'");
              assert(tag2 in actions, "No action for '" + tag2 + "' in operation '" + name + "'");
              const argsObj = /* @__PURE__ */ Object.create(null);
              for (const [i, val] of Object.entries(args)) {
                argsObj[sig.formals[i]] = val;
              }
              const oldArgs = this.args;
              this.args = argsObj;
              const ans = actions[tag2].apply(this, family._getChildren[tag2](this._adaptee, family._wrap));
              this.args = oldArgs;
              return ans;
            };
            return this;
          };
          module2.exports = VisitorFamily;
        }
      });
      var require_semantics_toAST = __commonJS2({
        "node_modules/ohm-js/extras/semantics-toAST.js"(exports2, module2) {
          "use strict";
          var defaultOperation = {
            _terminal() {
              return this.sourceString;
            },
            _nonterminal(...children) {
              const { ctorName } = this._node;
              const { mapping } = this.args;
              if (!Object.prototype.hasOwnProperty.call(mapping, ctorName)) {
                if (this.isLexical()) {
                  return this.sourceString;
                }
                const realChildren = children.filter((child) => !child.isTerminal());
                if (realChildren.length === 1) {
                  return realChildren[0].toAST(mapping);
                }
              }
              if (typeof mapping[ctorName] === "number") {
                return children[mapping[ctorName]].toAST(mapping);
              }
              const propMap = mapping[ctorName] || children;
              const node = {
                type: ctorName
              };
              for (const prop in propMap) {
                const mappedProp = mapping[ctorName] && mapping[ctorName][prop];
                if (typeof mappedProp === "number") {
                  node[prop] = children[mappedProp].toAST(mapping);
                } else if (typeof mappedProp === "string" || typeof mappedProp === "boolean" || mappedProp === null) {
                  node[prop] = mappedProp;
                } else if (typeof mappedProp === "object" && mappedProp instanceof Number) {
                  node[prop] = Number(mappedProp);
                } else if (typeof mappedProp === "function") {
                  node[prop] = mappedProp.call(this, children);
                } else if (mappedProp === void 0) {
                  if (children[prop] && !children[prop].isTerminal()) {
                    node[prop] = children[prop].toAST(mapping);
                  } else {
                    delete node[prop];
                  }
                }
              }
              return node;
            },
            _iter(...children) {
              if (this._node.isOptional()) {
                if (this.numChildren === 0) {
                  return null;
                } else {
                  return children[0].toAST(this.args.mapping);
                }
              }
              return children.map(function(child) {
                return child.toAST(this.args.mapping);
              }, this);
            },
            NonemptyListOf(first, sep, rest) {
              return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
            },
            EmptyListOf() {
              return [];
            }
          };
          function toAST(res, mapping) {
            if (typeof res.failed !== "function" || res.failed()) {
              throw new Error("toAST() expects a succesful MatchResult as first parameter");
            }
            mapping = Object.assign({}, mapping);
            const operation = Object.assign({}, defaultOperation);
            for (const termName in mapping) {
              if (typeof mapping[termName] === "function") {
                operation[termName] = mapping[termName];
                delete mapping[termName];
              }
            }
            const g = res._cst.grammar;
            const s = g.createSemantics().addOperation("toAST(mapping)", operation);
            return s(res).toAST(mapping);
          }
          function semanticsForToAST(g) {
            if (typeof g.createSemantics !== "function") {
              throw new Error("semanticsToAST() expects a Grammar as parameter");
            }
            return g.createSemantics().addOperation("toAST(mapping)", defaultOperation);
          }
          module2.exports = {
            helper: toAST,
            semantics: semanticsForToAST
          };
        }
      });
      var require_extras = __commonJS2({
        "node_modules/ohm-js/extras/index.js"(exports2, module2) {
          "use strict";
          module2.exports = {
            VisitorFamily: require_VisitorFamily(),
            semanticsForToAST: require_semantics_toAST().semantics,
            toAST: require_semantics_toAST().helper
          };
        }
      });
      var require_ohm_js = __commonJS2({
        "node_modules/ohm-js/index.js"(exports2, module2) {
          "use strict";
          var ohm = require_main();
          ohm.extras = require_extras();
          module2.exports = ohm;
        }
      });
      var require_filtergrammar_ohm_bundle = __commonJS2({
        "build/obj/src/filtergrammar.ohm-bundle.js"(exports2, module2) {
          "use strict";
          var ohm = require_ohm_js();
          var result = ohm.makeRecipe(["grammar", { "source": 'Filter {\r\n    Exp = BoolOr\r\n    \r\n    BoolOr\r\n        = BoolOr orOperation BoolAnd -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = BoolAnd andOperation PriExp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = "(" Exp ")" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | NonEqualityExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence "=" expressionConst\r\n    \r\n    LessThanExpr = propertySequence "<" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence ">" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence "<=" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence ">=" expressionConst\r\n\r\n    NonEqualityExpr = propertySequence nonEqualSign expressionConst\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence "." categoryOrProperty --ofPropertySequence\r\n        | directAnyPropertySequence "." categoryOrProperty --ofDirectAnyPropertySequence\r\n        | directAnyProperty "." categoryOrProperty --ofDirectAny\r\n                    \r\n    directProperty \r\n        = categoryOrProperty "." categoryOrProperty --ofCategory\r\n        | anyProperty "." categoryOrProperty --ofAnyProperty\r\n        \r\n    directAnyPropertySequence = propertySequence "." anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty "." anyProperty --sequenced\r\n        | categoryOrProperty "." anyProperty --ofCategory\r\n        | anyProperty "." anyProperty --ofAny\r\n        \r\n    exactElement = propertySequence "!" --ofPropertySequence\r\n        | categoryOrProperty "!" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = "[" identificator "]" --inBrackets \r\n        | alnum+ --value\r\n\r\n    nonEqualSign = "<>" | "!="\r\n        \r\n    andOperation = andWord | "&&" | "&"\r\n\r\n    andWord = ("A" | "a")("N" | "n")("D" | "d")\r\n    \r\n    orOperation = orWord | "||" | "|"\r\n\r\n    orWord = ("O" | "o")("R" | "r")\r\n    \r\n    anyProperty = "*"\r\n    \r\n    identificator = (~"]" ~"[" any)+\r\n    \r\n    expressionConst = textConst | number\r\n    \r\n    textConst (target text value)\r\n        = "\\"" textValue "\\""\r\n        \r\n    textValue = textChar*\r\n    \r\n    textChar\r\n        = "\\\\\\""\r\n        | (~"\\"" any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = "-" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* "." digit+\r\n}' }, "Filter", null, "Exp", { "Exp": ["define", { "sourceInterval": [14, 26] }, null, [], ["app", { "sourceInterval": [20, 26] }, "BoolOr", []]], "BoolOr_or": ["define", { "sourceInterval": [56, 88] }, null, [], ["seq", { "sourceInterval": [56, 82] }, ["app", { "sourceInterval": [56, 62] }, "BoolOr", []], ["app", { "sourceInterval": [63, 74] }, "orOperation", []], ["app", { "sourceInterval": [75, 82] }, "BoolAnd", []]]], "BoolOr": ["define", { "sourceInterval": [38, 107] }, null, [], ["alt", { "sourceInterval": [56, 107] }, ["app", { "sourceInterval": [56, 82] }, "BoolOr_or", []], ["app", { "sourceInterval": [100, 107] }, "BoolAnd", []]]], "BoolAnd_and": ["define", { "sourceInterval": [135, 169] }, null, [], ["seq", { "sourceInterval": [135, 162] }, ["app", { "sourceInterval": [135, 142] }, "BoolAnd", []], ["app", { "sourceInterval": [143, 155] }, "andOperation", []], ["app", { "sourceInterval": [156, 162] }, "PriExp", []]]], "BoolAnd": ["define", { "sourceInterval": [115, 187] }, null, [], ["alt", { "sourceInterval": [135, 187] }, ["app", { "sourceInterval": [135, 162] }, "BoolAnd_and", []], ["app", { "sourceInterval": [181, 187] }, "PriExp", []]]], "PriExp_paren": ["define", { "sourceInterval": [222, 242] }, null, [], ["seq", { "sourceInterval": [222, 233] }, ["terminal", { "sourceInterval": [222, 225] }, "("], ["app", { "sourceInterval": [226, 229] }, "Exp", []], ["terminal", { "sourceInterval": [230, 233] }, ")"]]], "PriExp": ["define", { "sourceInterval": [203, 267] }, null, [], ["alt", { "sourceInterval": [222, 267] }, ["app", { "sourceInterval": [222, 233] }, "PriExp_paren", []], ["app", { "sourceInterval": [254, 267] }, "ComparisonExp", []]]], "ComparisonExp": ["define", { "sourceInterval": [275, 410] }, null, [], ["alt", { "sourceInterval": [291, 410] }, ["app", { "sourceInterval": [291, 303] }, "EqualityExpr", []], ["app", { "sourceInterval": [306, 318] }, "LessThanExpr", []], ["app", { "sourceInterval": [321, 333] }, "MoreThanExpr", []], ["app", { "sourceInterval": [336, 355] }, "LessThanOrEqualExpr", []], ["app", { "sourceInterval": [358, 377] }, "MoreThanOrEqualExpr", []], ["app", { "sourceInterval": [380, 395] }, "NonEqualityExpr", []], ["app", { "sourceInterval": [398, 410] }, "exactElement", []]]], "EqualityExpr": ["define", { "sourceInterval": [418, 469] }, null, [], ["seq", { "sourceInterval": [433, 469] }, ["app", { "sourceInterval": [433, 449] }, "propertySequence", []], ["terminal", { "sourceInterval": [450, 453] }, "="], ["app", { "sourceInterval": [454, 469] }, "expressionConst", []]]], "LessThanExpr": ["define", { "sourceInterval": [481, 532] }, null, [], ["seq", { "sourceInterval": [496, 532] }, ["app", { "sourceInterval": [496, 512] }, "propertySequence", []], ["terminal", { "sourceInterval": [513, 516] }, "<"], ["app", { "sourceInterval": [517, 532] }, "expressionConst", []]]], "MoreThanExpr": ["define", { "sourceInterval": [544, 595] }, null, [], ["seq", { "sourceInterval": [559, 595] }, ["app", { "sourceInterval": [559, 575] }, "propertySequence", []], ["terminal", { "sourceInterval": [576, 579] }, ">"], ["app", { "sourceInterval": [580, 595] }, "expressionConst", []]]], "LessThanOrEqualExpr": ["define", { "sourceInterval": [607, 666] }, null, [], ["seq", { "sourceInterval": [629, 666] }, ["app", { "sourceInterval": [629, 645] }, "propertySequence", []], ["terminal", { "sourceInterval": [646, 650] }, "<="], ["app", { "sourceInterval": [651, 666] }, "expressionConst", []]]], "MoreThanOrEqualExpr": ["define", { "sourceInterval": [678, 737] }, null, [], ["seq", { "sourceInterval": [700, 737] }, ["app", { "sourceInterval": [700, 716] }, "propertySequence", []], ["terminal", { "sourceInterval": [717, 721] }, ">="], ["app", { "sourceInterval": [722, 737] }, "expressionConst", []]]], "NonEqualityExpr": ["define", { "sourceInterval": [745, 808] }, null, [], ["seq", { "sourceInterval": [763, 808] }, ["app", { "sourceInterval": [763, 779] }, "propertySequence", []], ["app", { "sourceInterval": [780, 792] }, "nonEqualSign", []], ["app", { "sourceInterval": [793, 808] }, "expressionConst", []]]], "propertySequence": ["define", { "sourceInterval": [816, 860] }, null, [], ["alt", { "sourceInterval": [835, 860] }, ["app", { "sourceInterval": [835, 843] }, "property", []], ["app", { "sourceInterval": [846, 860] }, "directProperty", []]]], "property_ofPropertySequence": ["define", { "sourceInterval": [910, 970] }, null, [], ["seq", { "sourceInterval": [910, 949] }, ["app", { "sourceInterval": [910, 926] }, "propertySequence", []], ["terminal", { "sourceInterval": [927, 930] }, "."], ["app", { "sourceInterval": [931, 949] }, "categoryOrProperty", []]]], "property_ofDirectAnyPropertySequence": ["define", { "sourceInterval": [982, 1060] }, null, [], ["seq", { "sourceInterval": [982, 1030] }, ["app", { "sourceInterval": [982, 1007] }, "directAnyPropertySequence", []], ["terminal", { "sourceInterval": [1008, 1011] }, "."], ["app", { "sourceInterval": [1012, 1030] }, "categoryOrProperty", []]]], "property_ofDirectAny": ["define", { "sourceInterval": [1072, 1126] }, null, [], ["seq", { "sourceInterval": [1072, 1112] }, ["app", { "sourceInterval": [1072, 1089] }, "directAnyProperty", []], ["terminal", { "sourceInterval": [1090, 1093] }, "."], ["app", { "sourceInterval": [1094, 1112] }, "categoryOrProperty", []]]], "property": ["define", { "sourceInterval": [888, 1126] }, null, [], ["alt", { "sourceInterval": [910, 1126] }, ["app", { "sourceInterval": [910, 949] }, "property_ofPropertySequence", []], ["app", { "sourceInterval": [982, 1030] }, "property_ofDirectAnyPropertySequence", []], ["app", { "sourceInterval": [1072, 1112] }, "property_ofDirectAny", []]]], "directProperty_ofCategory": ["define", { "sourceInterval": [1181, 1235] }, null, [], ["seq", { "sourceInterval": [1181, 1222] }, ["app", { "sourceInterval": [1181, 1199] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1200, 1203] }, "."], ["app", { "sourceInterval": [1204, 1222] }, "categoryOrProperty", []]]], "directProperty_ofAnyProperty": ["define", { "sourceInterval": [1247, 1297] }, null, [], ["seq", { "sourceInterval": [1247, 1281] }, ["app", { "sourceInterval": [1247, 1258] }, "anyProperty", []], ["terminal", { "sourceInterval": [1259, 1262] }, "."], ["app", { "sourceInterval": [1263, 1281] }, "categoryOrProperty", []]]], "directProperty": ["define", { "sourceInterval": [1154, 1297] }, null, [], ["alt", { "sourceInterval": [1181, 1297] }, ["app", { "sourceInterval": [1181, 1222] }, "directProperty_ofCategory", []], ["app", { "sourceInterval": [1247, 1281] }, "directProperty_ofAnyProperty", []]]], "directAnyPropertySequence": ["define", { "sourceInterval": [1313, 1373] }, null, [], ["seq", { "sourceInterval": [1341, 1373] }, ["app", { "sourceInterval": [1341, 1357] }, "propertySequence", []], ["terminal", { "sourceInterval": [1358, 1361] }, "."], ["app", { "sourceInterval": [1362, 1373] }, "anyProperty", []]]], "directAnyProperty_sequenced": ["define", { "sourceInterval": [1409, 1454] }, null, [], ["seq", { "sourceInterval": [1409, 1442] }, ["app", { "sourceInterval": [1409, 1426] }, "directAnyProperty", []], ["terminal", { "sourceInterval": [1427, 1430] }, "."], ["app", { "sourceInterval": [1431, 1442] }, "anyProperty", []]]], "directAnyProperty_ofCategory": ["define", { "sourceInterval": [1466, 1513] }, null, [], ["seq", { "sourceInterval": [1466, 1500] }, ["app", { "sourceInterval": [1466, 1484] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1485, 1488] }, "."], ["app", { "sourceInterval": [1489, 1500] }, "anyProperty", []]]], "directAnyProperty_ofAny": ["define", { "sourceInterval": [1525, 1560] }, null, [], ["seq", { "sourceInterval": [1525, 1552] }, ["app", { "sourceInterval": [1525, 1536] }, "anyProperty", []], ["terminal", { "sourceInterval": [1537, 1540] }, "."], ["app", { "sourceInterval": [1541, 1552] }, "anyProperty", []]]], "directAnyProperty": ["define", { "sourceInterval": [1389, 1560] }, null, [], ["alt", { "sourceInterval": [1409, 1560] }, ["app", { "sourceInterval": [1409, 1442] }, "directAnyProperty_sequenced", []], ["app", { "sourceInterval": [1466, 1500] }, "directAnyProperty_ofCategory", []], ["app", { "sourceInterval": [1525, 1552] }, "directAnyProperty_ofAny", []]]], "exactElement_ofPropertySequence": ["define", { "sourceInterval": [1591, 1632] }, null, [], ["seq", { "sourceInterval": [1591, 1611] }, ["app", { "sourceInterval": [1591, 1607] }, "propertySequence", []], ["terminal", { "sourceInterval": [1608, 1611] }, "!"]]], "exactElement_ofCategory": ["define", { "sourceInterval": [1644, 1679] }, null, [], ["seq", { "sourceInterval": [1644, 1666] }, ["app", { "sourceInterval": [1644, 1662] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1663, 1666] }, "!"]]], "exactElement": ["define", { "sourceInterval": [1576, 1679] }, null, [], ["alt", { "sourceInterval": [1591, 1679] }, ["app", { "sourceInterval": [1591, 1611] }, "exactElement_ofPropertySequence", []], ["app", { "sourceInterval": [1644, 1666] }, "exactElement_ofCategory", []]]], "categoryOrProperty_inBrackets": ["define", { "sourceInterval": [1752, 1786] }, null, [], ["seq", { "sourceInterval": [1752, 1773] }, ["terminal", { "sourceInterval": [1752, 1755] }, "["], ["app", { "sourceInterval": [1756, 1769] }, "identificator", []], ["terminal", { "sourceInterval": [1770, 1773] }, "]"]]], "categoryOrProperty_value": ["define", { "sourceInterval": [1799, 1813] }, null, [], ["plus", { "sourceInterval": [1799, 1805] }, ["app", { "sourceInterval": [1799, 1804] }, "alnum", []]]], "categoryOrProperty": ["define", { "sourceInterval": [1691, 1813] }, "element category or property", [], ["alt", { "sourceInterval": [1752, 1813] }, ["app", { "sourceInterval": [1752, 1773] }, "categoryOrProperty_inBrackets", []], ["app", { "sourceInterval": [1799, 1805] }, "categoryOrProperty_value", []]]], "nonEqualSign": ["define", { "sourceInterval": [1821, 1847] }, null, [], ["alt", { "sourceInterval": [1836, 1847] }, ["terminal", { "sourceInterval": [1836, 1840] }, "<>"], ["terminal", { "sourceInterval": [1843, 1847] }, "!="]]], "andOperation": ["define", { "sourceInterval": [1863, 1898] }, null, [], ["alt", { "sourceInterval": [1878, 1898] }, ["app", { "sourceInterval": [1878, 1885] }, "andWord", []], ["terminal", { "sourceInterval": [1888, 1892] }, "&&"], ["terminal", { "sourceInterval": [1895, 1898] }, "&"]]], "andWord": ["define", { "sourceInterval": [1906, 1949] }, null, [], ["seq", { "sourceInterval": [1916, 1949] }, ["alt", { "sourceInterval": [1917, 1926] }, ["terminal", { "sourceInterval": [1917, 1920] }, "A"], ["terminal", { "sourceInterval": [1923, 1926] }, "a"]], ["alt", { "sourceInterval": [1928, 1937] }, ["terminal", { "sourceInterval": [1928, 1931] }, "N"], ["terminal", { "sourceInterval": [1934, 1937] }, "n"]], ["alt", { "sourceInterval": [1939, 1948] }, ["terminal", { "sourceInterval": [1939, 1942] }, "D"], ["terminal", { "sourceInterval": [1945, 1948] }, "d"]]]], "orOperation": ["define", { "sourceInterval": [1961, 1994] }, null, [], ["alt", { "sourceInterval": [1975, 1994] }, ["app", { "sourceInterval": [1975, 1981] }, "orWord", []], ["terminal", { "sourceInterval": [1984, 1988] }, "||"], ["terminal", { "sourceInterval": [1991, 1994] }, "|"]]], "orWord": ["define", { "sourceInterval": [2002, 2033] }, null, [], ["seq", { "sourceInterval": [2011, 2033] }, ["alt", { "sourceInterval": [2012, 2021] }, ["terminal", { "sourceInterval": [2012, 2015] }, "O"], ["terminal", { "sourceInterval": [2018, 2021] }, "o"]], ["alt", { "sourceInterval": [2023, 2032] }, ["terminal", { "sourceInterval": [2023, 2026] }, "R"], ["terminal", { "sourceInterval": [2029, 2032] }, "r"]]]], "anyProperty": ["define", { "sourceInterval": [2045, 2062] }, null, [], ["terminal", { "sourceInterval": [2059, 2062] }, "*"]], "identificator": ["define", { "sourceInterval": [2074, 2106] }, null, [], ["plus", { "sourceInterval": [2090, 2106] }, ["seq", { "sourceInterval": [2091, 2104] }, ["not", { "sourceInterval": [2091, 2095] }, ["terminal", { "sourceInterval": [2092, 2095] }, "]"]], ["not", { "sourceInterval": [2096, 2100] }, ["terminal", { "sourceInterval": [2097, 2100] }, "["]], ["app", { "sourceInterval": [2101, 2104] }, "any", []]]]], "expressionConst": ["define", { "sourceInterval": [2118, 2154] }, null, [], ["alt", { "sourceInterval": [2136, 2154] }, ["app", { "sourceInterval": [2136, 2145] }, "textConst", []], ["app", { "sourceInterval": [2148, 2154] }, "number", []]]], "textConst": ["define", { "sourceInterval": [2166, 2226] }, "target text value", [], ["seq", { "sourceInterval": [2207, 2226] }, ["terminal", { "sourceInterval": [2207, 2211] }, '"'], ["app", { "sourceInterval": [2212, 2221] }, "textValue", []], ["terminal", { "sourceInterval": [2222, 2226] }, '"']]], "textValue": ["define", { "sourceInterval": [2242, 2263] }, null, [], ["star", { "sourceInterval": [2254, 2263] }, ["app", { "sourceInterval": [2254, 2262] }, "textChar", []]]], "textChar": ["define", { "sourceInterval": [2275, 2324] }, null, [], ["alt", { "sourceInterval": [2295, 2324] }, ["terminal", { "sourceInterval": [2295, 2301] }, '\\"'], ["seq", { "sourceInterval": [2313, 2324] }, ["not", { "sourceInterval": [2314, 2319] }, ["terminal", { "sourceInterval": [2315, 2319] }, '"']], ["app", { "sourceInterval": [2320, 2323] }, "any", []]]]], "number": ["define", { "sourceInterval": [2340, 2394] }, null, [], ["alt", { "sourceInterval": [2356, 2394] }, ["app", { "sourceInterval": [2356, 2370] }, "positiveNumber", []], ["app", { "sourceInterval": [2380, 2394] }, "negativeNumber", []]]], "negativeNumber": ["define", { "sourceInterval": [2408, 2443] }, null, [], ["seq", { "sourceInterval": [2425, 2443] }, ["terminal", { "sourceInterval": [2425, 2428] }, "-"], ["app", { "sourceInterval": [2429, 2443] }, "positiveNumber", []]]], "positiveNumber": ["define", { "sourceInterval": [2455, 2498] }, null, [], ["alt", { "sourceInterval": [2472, 2498] }, ["app", { "sourceInterval": [2472, 2482] }, "realNumber", []], ["app", { "sourceInterval": [2485, 2498] }, "integerNumber", []]]], "integerNumber": ["define", { "sourceInterval": [2512, 2534] }, null, [], ["plus", { "sourceInterval": [2528, 2534] }, ["app", { "sourceInterval": [2528, 2533] }, "digit", []]]], "realNumber": ["define", { "sourceInterval": [2546, 2576] }, null, [], ["seq", { "sourceInterval": [2559, 2576] }, ["star", { "sourceInterval": [2559, 2565] }, ["app", { "sourceInterval": [2559, 2564] }, "digit", []]], ["terminal", { "sourceInterval": [2566, 2569] }, "."], ["plus", { "sourceInterval": [2570, 2576] }, ["app", { "sourceInterval": [2570, 2575] }, "digit", []]]]] }]);
          module2.exports = result;
        }
      });
      var propertyDatabaseFunctions_exports = {};
      __export(propertyDatabaseFunctions_exports, {
        computeExpression: () => computeExpression,
        filterElements: () => filterElements
      });
      var import_filtergrammar = __toESM2(require_filtergrammar_ohm_bundle());
      var expandTemplateCategories = (templateCategories, targetLength) => {
        if (templateCategories.length > targetLength)
          throw new Error("Template categories count should not exceed target categories array");
        const templates = [];
        expand(templates, [], templateCategories, 0, targetLength);
        return templates;
      };
      var expandTemplateCategoriesForValue = (templateCategories, targetLength) => {
        let templates = [];
        for (let i = templateCategories.length; i <= targetLength; i++)
          templates = templates.concat(expandTemplateCategories(templateCategories, i));
        return templates;
      };
      var expand = (templates, currentTemplate, templateCategories, currentIndex, targetLength) => {
        if (currentTemplate.length === targetLength) {
          if (currentIndex === templateCategories.length)
            templates.push(currentTemplate);
          return;
        }
        if (currentIndex < templateCategories.length && templateCategories[currentIndex] !== "*") {
          currentTemplate.push(templateCategories[currentIndex]);
          expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);
          return;
        }
        if (currentIndex >= templateCategories.length) {
          currentTemplate.push("*");
          expand(templates, currentTemplate, templateCategories, currentIndex, targetLength);
          return;
        }
        if (templateCategories[currentIndex] === "*") {
          const maxInsertsCount = targetLength - currentTemplate.length;
          for (let i = 2; i < maxInsertsCount; ++i) {
            const template = [...currentTemplate];
            for (let j = 0; j < i; ++j)
              template.push("*");
            expand(templates, template, templateCategories, currentIndex + 1, targetLength);
          }
          currentTemplate.push("*");
          expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);
        }
      };
      var compareCategories = (elementCategories, templateCategories) => {
        if (templateCategories.length > elementCategories.length)
          return false;
        const expandedTemplates = expandTemplateCategories(templateCategories, elementCategories.length);
        for (const template of expandedTemplates)
          if (validate(elementCategories, template))
            return true;
        return false;
      };
      var validate = (elementCategories, templateCategories) => {
        for (let i = 0; i < templateCategories.length; i++) {
          if (templateCategories[i] !== "*" && elementCategories[i] !== templateCategories[i])
            return false;
        }
        return true;
      };
      var isAlmostEqual = (x, y, tolerance = 1e-5) => Math.abs(x - y) < tolerance;
      var isLessThan = (x, y, tolerance = 1e-5) => x < y && !isAlmostEqual(x, y, tolerance);
      var isMoreThan = (x, y, tolerance = 1e-5) => x > y && !isAlmostEqual(x, y, tolerance);
      var isAlmostEqualOrLessThan = (x, y, tolerance = 1e-5) => x < y || isAlmostEqual(x, y, tolerance);
      var isAlmostEqualOrMoreThan = (x, y, tolerance = 1e-5) => x > y || isAlmostEqual(x, y, tolerance);
      var isNumberValueDefinition = (propertyDefinition) => {
        return propertyDefinition.type === "number";
      };
      var isNumber = (value) => typeof value === "number";
      var isString = (value) => typeof value === "string";
      var createComparisonExpression = (numberComparisonRule, textComparisonRule) => {
        return (propertyNode, _, valueNode) => {
          const propertyDefinition = propertyNode.getPropertyDefinition();
          const valueDefinition = valueNode.getPropertyDefinition();
          if (isNumberValueDefinition(valueDefinition))
            return (filterSettings, element) => {
              if (!compareCategories(element.categoriesList, propertyDefinition.categories))
                return false;
              const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);
              return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).filter(isNumber).reduce((acc, elem) => acc || numberComparisonRule(elem, valueDefinition.value, filterSettings), false);
            };
          return (filterSettings, element) => {
            if (!compareCategories(element.categoriesList, propertyDefinition.categories))
              return false;
            const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);
            const constraintTestValue = filterSettings.stringCaseSensitive ? valueDefinition.value : valueDefinition.value.toLocaleLowerCase();
            return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).filter(isString).map((x) => filterSettings.stringCaseSensitive ? x : x.toLocaleLowerCase()).reduce((acc, elem) => acc || textComparisonRule(elem, constraintTestValue), false);
          };
        };
      };
      var compile = {
        exactElement: (node) => {
          const propertyDefinition = node.getPropertyDefinition();
          return (_, element) => compareCategories(element.categoriesList, propertyDefinition.categories);
        },
        EqualityExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue === constraint),
        LessThanExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => isLessThan(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue < constraint),
        LessThanOrEqualExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrLessThan(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue <= constraint),
        MoreThanExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => isMoreThan(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue > constraint),
        MoreThanOrEqualExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrMoreThan(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue >= constraint),
        BoolAnd_and: (leftNode, _, rightNode) => (filterSettings, element) => leftNode.compile()(filterSettings, element) && rightNode.compile()(filterSettings, element),
        BoolOr_or: (leftNode, _, rightNode) => (filterSettings, element) => leftNode.compile()(filterSettings, element) || rightNode.compile()(filterSettings, element),
        PriExp_paren: (_1, node, _2) => (filterSettings, element) => node.compile()(filterSettings, element),
        NonEqualityExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => !isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue !== constraint)
      };
      var appendPropertyToSequence = (sequenceNode, propertyNode) => {
        const sequence = sequenceNode.getPropertyDefinition();
        const property = propertyNode.getPropertyDefinition();
        const categories = [...sequence.categories];
        if (sequence.type === "property-value")
          categories.push(sequence.propertyName);
        return {
          type: "property-value",
          propertyName: property.value,
          categories
        };
      };
      var convertToCategoriesNode = (sequenceNode) => {
        const value = sequenceNode.getPropertyDefinition();
        if (value.type === "exact-category")
          return value;
        const categories = [...value.categories];
        categories.push(value.propertyName);
        return {
          type: "exact-category",
          categories
        };
      };
      var convertToPropertiesNode = (sequenceNode) => {
        const definition = sequenceNode.getPropertyDefinition();
        if (definition.type === "property-value")
          return definition;
        const categories = [...definition.categories];
        const propertyName = categories.pop();
        return {
          type: "property-value",
          propertyName,
          categories
        };
      };
      var createSimpleValue = (valueNode) => {
        return {
          type: "simple",
          value: valueNode.sourceString
        };
      };
      var getPropertyDefinition = {
        exactElement_ofCategory: (parentNode, _) => {
          const category = parentNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value]
          };
        },
        categoryOrProperty_inBrackets: (_, valueNode, _1) => createSimpleValue(valueNode),
        categoryOrProperty_value: (valueNode) => createSimpleValue(valueNode),
        exactElement_ofPropertySequence: (sequenceNode, _) => convertToCategoriesNode(sequenceNode),
        property_ofPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        property_ofDirectAny: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        property_ofDirectAnyPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        directAnyProperty_ofCategory: (sequenceNode, _1, _2) => {
          const category = sequenceNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value, "*"]
          };
        },
        directAnyPropertySequence: (sequenceNode, _1, _2) => convertToCategoriesNode(sequenceNode),
        directAnyProperty_sequenced: (sequenceNode, _1, _2) => {
          const sequence = convertToCategoriesNode(sequenceNode);
          const categories = [...sequence.categories];
          categories.push("*");
          return {
            type: "exact-category",
            categories
          };
        },
        propertySequence: (node) => convertToPropertiesNode(node),
        directProperty_ofCategory: (categoriesNode, _, propertyNode) => {
          const category = categoriesNode.getPropertyDefinition();
          const property = propertyNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value, property.value]
          };
        },
        directProperty_ofAnyProperty: (_1, _2, propertyNode) => {
          const property = propertyNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: ["*", property.value]
          };
        },
        number: (node) => {
          return {
            type: "number",
            value: parseFloat(node.sourceString)
          };
        },
        textConst: (_1, valueNode, _2) => valueNode.getPropertyDefinition(),
        textValue: (valueNode) => createSimpleValue(valueNode)
      };
      var getPropertyValue = {
        propertySequence: (node) => {
          const propertyDefinition = convertToPropertiesNode(node);
          return (element) => {
            if (!compareCategories(element.categoriesList, propertyDefinition.categories))
              return void 0;
            const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);
            return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).find((x) => x !== void 0);
          };
        }
      };
      var ParsingError = class extends Error {
        shortMessage;
        constructor(message, shortMessage) {
          super(message);
          this.shortMessage = shortMessage;
        }
      };
      var ElementPropertyValueQueryFactory = class {
        semantics = import_filtergrammar.default.createSemantics();
        constructor() {
          this.semantics.addOperation("getPropertyDefinition", getPropertyDefinition);
          this.semantics.addOperation("getPropertyValue", getPropertyValue);
        }
        createPropertyQuery(propertyQuery) {
          const match = import_filtergrammar.default.match(propertyQuery, "propertySequence");
          if (match.failed())
            throw new ParsingError(match.message, match.shortMessage);
          const node = this.semantics(match);
          return node.getPropertyValue();
        }
      };
      var import_filtergrammar2 = __toESM2(require_filtergrammar_ohm_bundle());
      var FilterFactory = class {
        semantics = import_filtergrammar2.default.createSemantics();
        settings;
        constructor(settings) {
          this.settings = settings || { tolerance: 1e-5, stringCaseSensitive: true };
          this.semantics.addOperation("getPropertyDefinition", getPropertyDefinition);
          this.semantics.addOperation("compile", compile);
        }
        createFilter(filterString) {
          const match = import_filtergrammar2.default.match(filterString);
          if (match.failed())
            throw new ParsingError(match.message, match.shortMessage);
          const node = this.semantics(match);
          return node.compile().bind(null, this.settings);
        }
      };
      var PropertyDatabaseAttributesCollection = class {
        attributesCaseSensitive;
        attributesIdsByName = /* @__PURE__ */ new Map();
        constructor(propertyDatabase2, attributesCaseSensitive2) {
          this.attributesCaseSensitive = attributesCaseSensitive2;
          let nameAttributeId = -1;
          propertyDatabase2.enumAttributes((attrId, attrDef) => {
            const attributeName = attributesCaseSensitive2 ? attrDef.name : attrDef.name.toLocaleLowerCase();
            const ids = this.attributesIdsByName.get(attributeName) || [];
            ids.push(attrId);
            this.attributesIdsByName.set(attributeName, ids);
            if (attrDef.name === "name" && attrDef.category === "__name__")
              nameAttributeId = attrId;
          });
          this.nameAttributeId = nameAttributeId;
        }
        nameAttributeId;
        findAttributesIdsByName(name) {
          const attributeName = this.attributesCaseSensitive ? name : name.toLocaleLowerCase();
          return this.attributesIdsByName.get(attributeName) || [];
        }
      };
      var PropertyDatabaseFilterableElement = class {
        dbId;
        propertyDatabase;
        attributes;
        categoryNodesDbIds;
        constructor(dbId2, propertyDatabase2, attributes) {
          this.dbId = dbId2;
          this.propertyDatabase = propertyDatabase2;
          this.attributes = attributes;
          this.categoryNodesDbIds = getCategories(dbId2, propertyDatabase2);
        }
        get categoriesList() {
          return this.categoryNodesDbIds.map((x) => this.getNodePropertyValue(x, this.attributes.nameAttributeId));
        }
        getPropertyValue(propertyName, categories) {
          if (!this.compareCategories(categories))
            return void 0;
          const dbId2 = this.categoryNodesDbIds[categories.length - 1];
          return this.attributes.findAttributesIdsByName(propertyName).map((x) => this.getNodePropertyValue(dbId2, x)).find((x) => x !== void 0);
        }
        compareCategories(categories) {
          for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
              return false;
          }
          return true;
        }
        getNodePropertyValue(dbId2, attributeId) {
          let value = void 0;
          this.propertyDatabase.enumObjectProperties(dbId2, (attrId, attrValueId) => {
            if (attrId === attributeId)
              value = this.propertyDatabase.getAttrValue(attrId, attrValueId);
          });
          return value;
        }
      };
      var getCategories = (dbId2, propertyDatabase2) => {
        const categories = [];
        let currentNodeDbId = dbId2;
        while (currentNodeDbId !== null) {
          const parentDbId = propertyDatabase2.findParent(currentNodeDbId);
          if (parentDbId !== null)
            categories.push(currentNodeDbId);
          currentNodeDbId = parentDbId;
        }
        return categories.reverse();
      };
      var filterElements = (pdb2, tag2) => {
        try {
          const dbIds = [];
          const { lmvQuery, lmvQueryOptions } = tag2;
          const filterFactory = new FilterFactory(lmvQueryOptions);
          const elementFilter = filterFactory.createFilter(lmvQuery);
          const attributesCollection = new PropertyDatabaseAttributesCollection(pdb2, lmvQueryOptions.attributesCaseSensitive);
          pdb2.enumObjects((dbId2) => {
            if (lmvQueryOptions.leafNodesOnly && pdb2.getNodeNameAndChildren({ dbId: dbId2 }) !== void 0)
              return;
            const element = new PropertyDatabaseFilterableElement(dbId2, pdb2, attributesCollection);
            if (elementFilter(element))
              dbIds.push(dbId2);
          });
          return {
            dbIds,
            error: null
          };
        } catch (error) {
          return {
            dbIds: [],
            error
          };
        }
      };
      var computeExpression = (pdb2, tag2) => {
        try {
          const { nodeId, propertyQuery, caseSensitive } = tag2;
          const factory = new ElementPropertyValueQueryFactory();
          const query3 = factory.createPropertyQuery(propertyQuery);
          const attributesCollection = new PropertyDatabaseAttributesCollection(pdb2, caseSensitive);
          const element = new PropertyDatabaseFilterableElement(nodeId, pdb2, attributesCollection);
          const result = query3(element);
          return { result, error: null };
        } catch (error) {
          return {
            result: void 0,
            error
          };
        }
      };
      return __toCommonJS(propertyDatabaseFunctions_exports);
    };
    module.exports = { engine: engine3 };
  }
});

// build/obj/index.js
var import_engine = __toESM(require_engine());
async function query2(model, query, options) {
  const propertyDatabase = model.getPropertyDb();
  const engineModule = import_engine.engine.toString();
  return propertyDatabase.executeUserFunction(function userFunction(pdb, tag) {
    const engine = eval(tag.engineModule)();
    return engine.filterElements(pdb, tag);
  }, { lmvQuery: query, lmvQueryOptions: options, engineModule });
}
async function computeExpressionValue(model, dbId, query, attributesCaseSensitive = true) {
  const propertyDatabase = model.getPropertyDb();
  const engineModule = import_engine.engine.toString();
  return propertyDatabase.executeUserFunction(function userFunction(pdb, tag) {
    const engine = eval(tag.engineModule)();
    return engine.computeExpression(pdb, tag);
  }, { nodeId: dbId, propertyQuery: query, caseSensitive: attributesCaseSensitive, engineModule });
}
export {
  computeExpressionValue,
  query2 as query
};
