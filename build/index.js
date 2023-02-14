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
    var engine2 = () => {
      var Lr = Object.create;
      var _e = Object.defineProperty;
      var Rr = Object.getOwnPropertyDescriptor;
      var Tr = Object.getOwnPropertyNames;
      var kr = Object.getPrototypeOf, jr = Object.prototype.hasOwnProperty;
      var h = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), Mr = (e, t) => {
        for (var u in t)
          _e(e, u, { get: t[u], enumerable: true });
      }, jt = (e, t, u, r) => {
        if (t && typeof t == "object" || typeof t == "function")
          for (let n of Tr(t))
            !jr.call(e, n) && n !== u && _e(e, n, { get: () => t[n], enumerable: !(r = Rr(t, n)) || r.enumerable });
        return e;
      };
      var Mt = (e, t, u) => (u = e != null ? Lr(kr(e)) : {}, jt(t || !e || !e.__esModule ? _e(u, "default", { value: e, enumerable: true }) : u, e)), Gr = (e) => jt(_e({}, "__esModule", { value: true }), e);
      var ze = h((ns, Gt) => {
        "use strict";
        function Vr(e) {
          return e === "description" || e === "string" || e === "code";
        }
        function P(e, t, u) {
          if (!Vr(u))
            throw new Error("invalid Failure type: " + u);
          this.pexpr = e, this.text = t, this.type = u, this.fluffy = false;
        }
        P.prototype.getPExpr = function() {
          return this.pexpr;
        };
        P.prototype.getText = function() {
          return this.text;
        };
        P.prototype.getType = function() {
          return this.type;
        };
        P.prototype.isDescription = function() {
          return this.type === "description";
        };
        P.prototype.isStringTerminal = function() {
          return this.type === "string";
        };
        P.prototype.isCode = function() {
          return this.type === "code";
        };
        P.prototype.isFluffy = function() {
          return this.fluffy;
        };
        P.prototype.makeFluffy = function() {
          this.fluffy = true;
        };
        P.prototype.clearFluffy = function() {
          this.fluffy = false;
        };
        P.prototype.subsumes = function(e) {
          return this.getText() === e.getText() && this.type === e.type && (!this.isFluffy() || this.isFluffy() && e.isFluffy());
        };
        P.prototype.toString = function() {
          return this.type === "string" ? JSON.stringify(this.getText()) : this.getText();
        };
        P.prototype.clone = function() {
          let e = new P(this.pexpr, this.text, this.type);
          return this.isFluffy() && e.makeFluffy(), e;
        };
        P.prototype.toKey = function() {
          return this.toString() + "#" + this.type;
        };
        Gt.exports = P;
      });
      var m = h((C) => {
        "use strict";
        var H = {};
        for (let e = 0; e < 128; e++)
          H[e] = String.fromCharCode(e);
        H["'".charCodeAt(0)] = "\\'";
        H['"'.charCodeAt(0)] = '\\"';
        H["\\".charCodeAt(0)] = "\\\\";
        H["\b".charCodeAt(0)] = "\\b";
        H["\f".charCodeAt(0)] = "\\f";
        H[`
`.charCodeAt(0)] = "\\n";
        H["\r".charCodeAt(0)] = "\\r";
        H["	".charCodeAt(0)] = "\\t";
        H["\v".charCodeAt(0)] = "\\v";
        C.abstract = function(e) {
          let t = e || "";
          return function() {
            throw new Error("this method " + t + " is abstract! (it has no implementation in class " + this.constructor.name + ")");
          };
        };
        C.assert = function(e, t) {
          if (!e)
            throw new Error(t || "Assertion failed");
        };
        C.defineLazyProperty = function(e, t, u) {
          let r;
          Object.defineProperty(e, t, { get() {
            return r || (r = u.call(this)), r;
          } });
        };
        C.clone = function(e) {
          return e && Object.assign({}, e);
        };
        C.repeatFn = function(e, t) {
          let u = [];
          for (; t-- > 0; )
            u.push(e());
          return u;
        };
        C.repeatStr = function(e, t) {
          return new Array(t + 1).join(e);
        };
        C.repeat = function(e, t) {
          return C.repeatFn(() => e, t);
        };
        C.getDuplicates = function(e) {
          let t = [];
          for (let u = 0; u < e.length; u++) {
            let r = e[u];
            e.lastIndexOf(r) !== u && t.indexOf(r) < 0 && t.push(r);
          }
          return t;
        };
        C.copyWithoutDuplicates = function(e) {
          let t = [];
          return e.forEach((u) => {
            t.indexOf(u) < 0 && t.push(u);
          }), t;
        };
        C.isSyntactic = function(e) {
          let t = e[0];
          return t === t.toUpperCase();
        };
        C.isLexical = function(e) {
          return !C.isSyntactic(e);
        };
        C.padLeft = function(e, t, u) {
          let r = u || " ";
          return e.length < t ? C.repeatStr(r, t - e.length) + e : e;
        };
        C.StringBuffer = function() {
          this.strings = [];
        };
        C.StringBuffer.prototype.append = function(e) {
          this.strings.push(e);
        };
        C.StringBuffer.prototype.contents = function() {
          return this.strings.join("");
        };
        var Ke = (e) => String.fromCodePoint(parseInt(e, 16));
        C.unescapeCodePoint = function(e) {
          if (e.charAt(0) === "\\")
            switch (e.charAt(1)) {
              case "b":
                return "\b";
              case "f":
                return "\f";
              case "n":
                return `
`;
              case "r":
                return "\r";
              case "t":
                return "	";
              case "v":
                return "\v";
              case "x":
                return Ke(e.slice(2, 4));
              case "u":
                return e.charAt(2) === "{" ? Ke(e.slice(3, -1)) : Ke(e.slice(2, 6));
              default:
                return e.charAt(1);
            }
          else
            return e;
        };
        C.unexpectedObjToString = function(e) {
          if (e == null)
            return String(e);
          let t = Object.prototype.toString.call(e);
          try {
            let u;
            return e.constructor && e.constructor.name ? u = e.constructor.name : t.indexOf("[object ") === 0 ? u = t.slice(8, -1) : u = typeof e, u + ": " + JSON.stringify(String(e));
          } catch {
            return t;
          }
        };
      });
      var we = h((ss, Ut) => {
        "use strict";
        var Vt = m(), ce = class {
          constructor(t) {
            this.matchLength = t;
          }
          get ctorName() {
            throw new Error("subclass responsibility");
          }
          numChildren() {
            return this.children ? this.children.length : 0;
          }
          childAt(t) {
            if (this.children)
              return this.children[t];
          }
          indexOfChild(t) {
            return this.children.indexOf(t);
          }
          hasChildren() {
            return this.numChildren() > 0;
          }
          hasNoChildren() {
            return !this.hasChildren();
          }
          onlyChild() {
            if (this.numChildren() !== 1)
              throw new Error("cannot get only child of a node of type " + this.ctorName + " (it has " + this.numChildren() + " children)");
            return this.firstChild();
          }
          firstChild() {
            if (this.hasNoChildren())
              throw new Error("cannot get first child of a " + this.ctorName + " node, which has no children");
            return this.childAt(0);
          }
          lastChild() {
            if (this.hasNoChildren())
              throw new Error("cannot get last child of a " + this.ctorName + " node, which has no children");
            return this.childAt(this.numChildren() - 1);
          }
          childBefore(t) {
            let u = this.indexOfChild(t);
            if (u < 0)
              throw new Error("Node.childBefore() called w/ an argument that is not a child");
            if (u === 0)
              throw new Error("cannot get child before first child");
            return this.childAt(u - 1);
          }
          childAfter(t) {
            let u = this.indexOfChild(t);
            if (u < 0)
              throw new Error("Node.childAfter() called w/ an argument that is not a child");
            if (u === this.numChildren() - 1)
              throw new Error("cannot get child after last child");
            return this.childAt(u + 1);
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
        }, He = class extends ce {
          get ctorName() {
            return "_terminal";
          }
          isTerminal() {
            return true;
          }
          get primitiveValue() {
            throw new Error("The `primitiveValue` property was removed in Ohm v17.");
          }
        }, $e = class extends ce {
          constructor(t, u, r, n) {
            super(n), this.ruleName = t, this.children = u, this.childOffsets = r;
          }
          get ctorName() {
            return this.ruleName;
          }
          isNonterminal() {
            return true;
          }
          isLexical() {
            return Vt.isLexical(this.ctorName);
          }
          isSyntactic() {
            return Vt.isSyntactic(this.ctorName);
          }
        }, Je = class extends ce {
          constructor(t, u, r, n) {
            super(r), this.children = t, this.childOffsets = u, this.optional = n;
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
        Ut.exports = { Node: ce, TerminalNode: He, NonterminalNode: $e, IterationNode: Je };
      });
      var zt = h((os, Wt) => {
        Wt.exports = { Lu: /[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/, Ll: /[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/, Lt: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/, Lm: /[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/, Lo: /[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/, Nl: /[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/, Nd: /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/, Mn: /[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/, Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/, Pc: /[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/, Zs: /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, L: /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/, Ltmo: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/ };
      });
      var I = h((F) => {
        "use strict";
        var Ur = zt(), Wr = m(), y = class {
          constructor() {
            if (this.constructor === y)
              throw new Error("PExpr cannot be instantiated -- it's abstract");
          }
          withSource(t) {
            return t && (this.source = t.trimmed()), this;
          }
        }, zr = Object.create(y.prototype), Kr = Object.create(y.prototype), Ze = class extends y {
          constructor(t) {
            super(), this.obj = t;
          }
        }, Qe = class extends y {
          constructor(t, u) {
            super(), this.from = t, this.to = u, this.matchCodePoint = t.length > 1 || u.length > 1;
          }
        }, Ye = class extends y {
          constructor(t) {
            super(), this.index = t;
          }
        }, fe = class extends y {
          constructor(t) {
            super(), this.terms = t;
          }
        }, Xe = class extends fe {
          constructor(t, u, r) {
            let n = t.rules[u].body;
            super([r, n]), this.superGrammar = t, this.name = u, this.body = r;
          }
        }, et = class extends fe {
          constructor(t, u, r, n) {
            let i = t.rules[u].body;
            super([...r, i, ...n]), this.superGrammar = t, this.ruleName = u, this.expansionPos = r.length;
          }
        }, tt = class extends y {
          constructor(t) {
            super(), this.factors = t;
          }
        }, le = class extends y {
          constructor(t) {
            super(), this.expr = t;
          }
        }, pe = class extends le {
        }, De = class extends le {
        }, he = class extends le {
        };
        pe.prototype.operator = "*";
        De.prototype.operator = "+";
        he.prototype.operator = "?";
        pe.prototype.minNumMatches = 0;
        De.prototype.minNumMatches = 1;
        he.prototype.minNumMatches = 0;
        pe.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
        De.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
        he.prototype.maxNumMatches = 1;
        var ut = class extends y {
          constructor(t) {
            super(), this.expr = t;
          }
        }, rt = class extends y {
          constructor(t) {
            super(), this.expr = t;
          }
        }, nt = class extends y {
          constructor(t) {
            super(), this.expr = t;
          }
        }, it = class extends y {
          constructor(t, u = []) {
            super(), this.ruleName = t, this.args = u;
          }
          isSyntactic() {
            return Wr.isSyntactic(this.ruleName);
          }
          toMemoKey() {
            return this._memoKey || Object.defineProperty(this, "_memoKey", { value: this.toString() }), this._memoKey;
          }
        }, st = class extends y {
          constructor(t) {
            super(), this.category = t, this.pattern = Ur[t];
          }
        };
        F.PExpr = y;
        F.any = zr;
        F.end = Kr;
        F.Terminal = Ze;
        F.Range = Qe;
        F.Param = Ye;
        F.Alt = fe;
        F.Extend = Xe;
        F.Splice = et;
        F.Seq = tt;
        F.Iter = le;
        F.Star = pe;
        F.Plus = De;
        F.Opt = he;
        F.Not = ut;
        F.Lookahead = rt;
        F.Lex = nt;
        F.Apply = it;
        F.UnicodeChar = st;
      });
      var Kt = h(() => {
        "use strict";
        var Hr = m(), T = I();
        T.PExpr.prototype.allowsSkippingPrecedingSpace = Hr.abstract("allowsSkippingPrecedingSpace");
        T.any.allowsSkippingPrecedingSpace = T.end.allowsSkippingPrecedingSpace = T.Apply.prototype.allowsSkippingPrecedingSpace = T.Terminal.prototype.allowsSkippingPrecedingSpace = T.Range.prototype.allowsSkippingPrecedingSpace = T.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
          return true;
        };
        T.Alt.prototype.allowsSkippingPrecedingSpace = T.Iter.prototype.allowsSkippingPrecedingSpace = T.Lex.prototype.allowsSkippingPrecedingSpace = T.Lookahead.prototype.allowsSkippingPrecedingSpace = T.Not.prototype.allowsSkippingPrecedingSpace = T.Param.prototype.allowsSkippingPrecedingSpace = T.Seq.prototype.allowsSkippingPrecedingSpace = function() {
          return false;
        };
      });
      var ot = h((ps, Ht) => {
        "use strict";
        function G() {
        }
        G.prototype = /* @__PURE__ */ Object.create(null);
        G.asNamespace = function(e) {
          return e instanceof G ? e : G.createNamespace(e);
        };
        G.createNamespace = function(e) {
          return G.extend(G.prototype, e);
        };
        G.extend = function(e, t) {
          if (e !== G.prototype && !(e instanceof G))
            throw new TypeError("not a Namespace object: " + e);
          let u = Object.create(e, { constructor: { value: G, enumerable: false, writable: true, configurable: true } });
          return Object.assign(u, t);
        };
        G.toString = function(e) {
          return Object.prototype.toString.call(e);
        };
        Ht.exports = G;
      });
      var $ = h((Ds, $t) => {
        "use strict";
        var { assert: $r } = m(), Jr = ot(), Zr = I();
        function d(e, t) {
          let u;
          return t ? (u = new Error(t.getLineAndColumnMessage() + e), u.shortMessage = e, u.interval = t) : u = new Error(e), u;
        }
        function Qr() {
          return d("Interval sources don't match");
        }
        function Yr(e) {
          let t = new Error();
          return Object.defineProperty(t, "message", { enumerable: true, get() {
            return e.message;
          } }), Object.defineProperty(t, "shortMessage", { enumerable: true, get() {
            return "Expected " + e.getExpectedText();
          } }), t.interval = e.getInterval(), t;
        }
        function Xr(e, t, u) {
          let r = t ? "Grammar " + e + " is not declared in namespace " + Jr.toString(t) : "Undeclared grammar " + e;
          return d(r, u);
        }
        function en(e, t) {
          return d("Grammar " + e.name + " is already declared in this namespace");
        }
        function tn(e, t, u) {
          return d("Rule " + e + " is not declared in grammar " + t, u);
        }
        function un(e, t, u) {
          return d("Cannot override rule " + e + " because it is not declared in " + t, u);
        }
        function rn(e, t, u) {
          return d("Cannot extend rule " + e + " because it is not declared in " + t, u);
        }
        function nn(e, t, u, r) {
          let n = "Duplicate declaration for rule '" + e + "' in grammar '" + t + "'";
          return t !== u && (n += " (originally declared in '" + u + "')"), d(n, r);
        }
        function sn(e, t, u, r) {
          return d("Wrong number of parameters for rule " + e + " (expected " + t + ", got " + u + ")", r);
        }
        function on(e, t, u, r) {
          return d("Wrong number of arguments for rule " + e + " (expected " + t + ", got " + u + ")", r);
        }
        function an(e, t, u) {
          return d("Duplicate parameter names in rule " + e + ": " + t.join(", "), u);
        }
        function cn(e, t) {
          return d("Invalid parameter to rule " + e + ": " + t + " has arity " + t.getArity() + ", but parameter expressions must have arity 1", t.source);
        }
        var ln = "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";
        function pn(e, t) {
          return d("Cannot apply syntactic rule " + e + " from here (inside a lexical context)", t.source);
        }
        function Dn(e) {
          let { ruleName: t } = e;
          return d(`applySyntactic is for syntactic rules, but '${t}' is a lexical rule. ` + ln, e.source);
        }
        function hn(e) {
          return d("applySyntactic is not required here (in a syntactic context)", e.source);
        }
        function An(e, t) {
          return d("Incorrect argument type: expected " + e, t.source);
        }
        function mn(e) {
          return d("'...' can appear at most once in a rule body", e.source);
        }
        function fn(e) {
          let t = e._node;
          $r(t && t.isNonterminal() && t.ctorName === "escapeChar_unicodeCodePoint");
          let u = e.children.slice(1, -1).map((n) => n.source), r = u[0].coverageWith(...u.slice(1));
          return d(`U+${r.contents} is not a valid Unicode code point`, r);
        }
        function En(e, t) {
          let u = t.length > 0 ? t[t.length - 1].args : [], n = "Nullable expression " + e.expr.substituteParams(u) + " is not allowed inside '" + e.operator + "' (possible infinite loop)";
          if (t.length > 0) {
            let i = t.map((s) => new Zr.Apply(s.ruleName, s.args)).join(`
`);
            n += `
Application stack (most recent application last):
` + i;
          }
          return d(n, e.expr.source);
        }
        function dn(e, t, u, r) {
          return d("Rule " + e + " involves an alternation which has inconsistent arity (expected " + t + ", got " + u + ")", r.source);
        }
        function Cn(e) {
          return d("Object pattern has duplicate property names: " + e.join(", "));
        }
        function Fn(e, t, u) {
          return d("Attempt to invoke constructor " + t + " with invalid or unexpected arguments");
        }
        function gn(e) {
          let t = e.map((u) => u.message);
          return d(["Errors:"].concat(t).join(`
- `), e[0].interval);
        }
        function yn(e, t, u, r) {
          let n = r.slice(0, -1).map((c) => {
            let D = "  " + c[0].name + " > " + c[1];
            return c.length === 3 ? D + " for '" + c[2] + "'" : D;
          }).join(`
`);
          n += `
  ` + t + " > " + e;
          let i = "";
          e === "_iter" && (i = [`
NOTE: as of Ohm v16, there is no default action for iteration nodes \u2014 see `, "  https://ohmjs.org/d/dsa for details."].join(`
`));
          let s = [`Missing semantic action for '${e}' in ${u} '${t}'.${i}`, "Action stack (most recent call last):", n].join(`
`), l = d(s);
          return l.name = "missingSemanticAction", l;
        }
        $t.exports = { applicationOfSyntacticRuleFromLexicalContext: pn, applySyntacticWithLexicalRuleApplication: Dn, cannotExtendUndeclaredRule: rn, cannotOverrideUndeclaredRule: un, duplicateGrammarDeclaration: en, duplicateParameterNames: an, duplicatePropertyNames: Cn, duplicateRuleDeclaration: nn, inconsistentArity: dn, incorrectArgumentType: An, intervalSourcesDontMatch: Qr, invalidCodePoint: fn, invalidConstructorCall: Fn, invalidParameter: cn, grammarSyntaxError: Yr, kleeneExprHasNullableOperand: En, missingSemanticAction: yn, multipleSuperSplices: mn, undeclaredGrammar: Xr, undeclaredRule: tn, unnecessaryExperimentalApplySyntactic: hn, wrongNumberOfArguments: on, wrongNumberOfParameters: sn, throwErrors(e) {
          if (e.length === 1)
            throw e[0];
          if (e.length > 1)
            throw gn(e);
        } };
      });
      var Z = h((ne) => {
        "use strict";
        var Pe = m();
        function vn(e) {
          let t = 0;
          return e.map((r) => {
            let n = r.toString();
            return t = Math.max(t, n.length), n;
          }).map((r) => Pe.padLeft(r, t));
        }
        function Jt(e, t, u) {
          let r = e.length, n = e.slice(0, u), i = e.slice(u + t.length);
          return (n + t + i).substr(0, r);
        }
        function Bn(...e) {
          let t = this, { offset: u } = t, { repeatStr: r } = Pe, n = new Pe.StringBuffer();
          n.append("Line " + t.lineNum + ", col " + t.colNum + `:
`);
          let i = vn([t.prevLine == null ? 0 : t.lineNum - 1, t.lineNum, t.nextLine == null ? 0 : t.lineNum + 1]), s = (a, o, p) => {
            n.append(p + i[a] + " | " + o + `
`);
          };
          t.prevLine != null && s(0, t.prevLine, "  "), s(1, t.line, "> ");
          let l = t.line.length, c = r(" ", l + 1);
          for (let a = 0; a < e.length; ++a) {
            let o = e[a][0], p = e[a][1];
            Pe.assert(o >= 0 && o <= p, "range start must be >= 0 and <= end");
            let A = u - t.colNum + 1;
            o = Math.max(0, o - A), p = Math.min(p - A, l), c = Jt(c, r("~", p - o), o);
          }
          let D = 2 + i[1].length + 3;
          return n.append(r(" ", D)), c = Jt(c, "^", t.colNum - 1), n.append(c.replace(/ +$/, "") + `
`), t.nextLine != null && s(2, t.nextLine, "  "), n.contents();
        }
        var at = [];
        ne.awaitBuiltInRules = (e) => {
          at.push(e);
        };
        ne.announceBuiltInRules = (e) => {
          at.forEach((t) => {
            t(e);
          }), at = null;
        };
        ne.getLineAndColumn = (e, t) => {
          let u = 1, r = 1, n = 0, i = 0, s = null, l = null, c = -1;
          for (; n < t; ) {
            let o = e.charAt(n++);
            o === `
` ? (u++, r = 1, c = i, i = n) : o !== "\r" && r++;
          }
          let D = e.indexOf(`
`, i);
          if (D === -1)
            D = e.length;
          else {
            let o = e.indexOf(`
`, D + 1);
            s = o === -1 ? e.slice(D) : e.slice(D, o), s = s.replace(/^\r?\n/, "").replace(/\r$/, "");
          }
          c >= 0 && (l = e.slice(c, i).replace(/\r?\n$/, ""));
          let a = e.slice(i, D).replace(/\r$/, "");
          return { offset: t, lineNum: u, colNum: r, line: a, prevLine: l, nextLine: s, toString: Bn };
        };
        ne.getLineAndColumnMessage = function(e, t, ...u) {
          return ne.getLineAndColumn(e, t).toString(...u);
        };
        ne.uniqueId = (() => {
          let e = 0;
          return (t) => "" + t + e++;
        })();
      });
      var Zt = h(() => {
        "use strict";
        var { abstract: In, isSyntactic: ct } = m(), Q = $(), x = I(), xn = Z(), Ee;
        xn.awaitBuiltInRules((e) => {
          Ee = e;
        });
        var Oe;
        x.PExpr.prototype.assertAllApplicationsAreValid = function(e, t) {
          Oe = 0, this._assertAllApplicationsAreValid(e, t);
        };
        x.PExpr.prototype._assertAllApplicationsAreValid = In("_assertAllApplicationsAreValid");
        x.any._assertAllApplicationsAreValid = x.end._assertAllApplicationsAreValid = x.Terminal.prototype._assertAllApplicationsAreValid = x.Range.prototype._assertAllApplicationsAreValid = x.Param.prototype._assertAllApplicationsAreValid = x.UnicodeChar.prototype._assertAllApplicationsAreValid = function(e, t) {
        };
        x.Lex.prototype._assertAllApplicationsAreValid = function(e, t) {
          Oe++, this.expr._assertAllApplicationsAreValid(e, t), Oe--;
        };
        x.Alt.prototype._assertAllApplicationsAreValid = function(e, t) {
          for (let u = 0; u < this.terms.length; u++)
            this.terms[u]._assertAllApplicationsAreValid(e, t);
        };
        x.Seq.prototype._assertAllApplicationsAreValid = function(e, t) {
          for (let u = 0; u < this.factors.length; u++)
            this.factors[u]._assertAllApplicationsAreValid(e, t);
        };
        x.Iter.prototype._assertAllApplicationsAreValid = x.Not.prototype._assertAllApplicationsAreValid = x.Lookahead.prototype._assertAllApplicationsAreValid = function(e, t) {
          this.expr._assertAllApplicationsAreValid(e, t);
        };
        x.Apply.prototype._assertAllApplicationsAreValid = function(e, t, u = false) {
          let r = t.rules[this.ruleName], n = ct(e) && Oe === 0;
          if (!r)
            throw Q.undeclaredRule(this.ruleName, t.name, this.source);
          if (!u && ct(this.ruleName) && !n)
            throw Q.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
          let i = this.args.length, s = r.formals.length;
          if (i !== s)
            throw Q.wrongNumberOfArguments(this.ruleName, s, i, this.source);
          let l = Ee && r === Ee.rules.applySyntactic;
          if (Ee && r === Ee.rules.caseInsensitive && !(this.args[0] instanceof x.Terminal))
            throw Q.incorrectArgumentType('a Terminal (e.g. "abc")', this.args[0]);
          if (l) {
            let D = this.args[0];
            if (!(D instanceof x.Apply))
              throw Q.incorrectArgumentType("a syntactic rule application", D);
            if (!ct(D.ruleName))
              throw Q.applySyntacticWithLexicalRuleApplication(D);
            if (n)
              throw Q.unnecessaryExperimentalApplySyntactic(this);
          }
          this.args.forEach((D) => {
            if (D._assertAllApplicationsAreValid(e, t, l), D.getArity() !== 1)
              throw Q.invalidParameter(this.ruleName, D);
          });
        };
      });
      var Yt = h(() => {
        "use strict";
        var Sn = m(), Qt = $(), O = I();
        O.PExpr.prototype.assertChoicesHaveUniformArity = Sn.abstract("assertChoicesHaveUniformArity");
        O.any.assertChoicesHaveUniformArity = O.end.assertChoicesHaveUniformArity = O.Terminal.prototype.assertChoicesHaveUniformArity = O.Range.prototype.assertChoicesHaveUniformArity = O.Param.prototype.assertChoicesHaveUniformArity = O.Lex.prototype.assertChoicesHaveUniformArity = O.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(e) {
        };
        O.Alt.prototype.assertChoicesHaveUniformArity = function(e) {
          if (this.terms.length === 0)
            return;
          let t = this.terms[0].getArity();
          for (let u = 0; u < this.terms.length; u++) {
            let r = this.terms[u];
            r.assertChoicesHaveUniformArity();
            let n = r.getArity();
            if (t !== n)
              throw Qt.inconsistentArity(e, t, n, r);
          }
        };
        O.Extend.prototype.assertChoicesHaveUniformArity = function(e) {
          let t = this.terms[0].getArity(), u = this.terms[1].getArity();
          if (t !== u)
            throw Qt.inconsistentArity(e, u, t, this.terms[0]);
        };
        O.Seq.prototype.assertChoicesHaveUniformArity = function(e) {
          for (let t = 0; t < this.factors.length; t++)
            this.factors[t].assertChoicesHaveUniformArity(e);
        };
        O.Iter.prototype.assertChoicesHaveUniformArity = function(e) {
          this.expr.assertChoicesHaveUniformArity(e);
        };
        O.Not.prototype.assertChoicesHaveUniformArity = function(e) {
        };
        O.Lookahead.prototype.assertChoicesHaveUniformArity = function(e) {
          this.expr.assertChoicesHaveUniformArity(e);
        };
        O.Apply.prototype.assertChoicesHaveUniformArity = function(e) {
        };
      });
      var Xt = h(() => {
        "use strict";
        var bn = m(), _n = $(), N = I();
        N.PExpr.prototype.assertIteratedExprsAreNotNullable = bn.abstract("assertIteratedExprsAreNotNullable");
        N.any.assertIteratedExprsAreNotNullable = N.end.assertIteratedExprsAreNotNullable = N.Terminal.prototype.assertIteratedExprsAreNotNullable = N.Range.prototype.assertIteratedExprsAreNotNullable = N.Param.prototype.assertIteratedExprsAreNotNullable = N.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(e) {
        };
        N.Alt.prototype.assertIteratedExprsAreNotNullable = function(e) {
          for (let t = 0; t < this.terms.length; t++)
            this.terms[t].assertIteratedExprsAreNotNullable(e);
        };
        N.Seq.prototype.assertIteratedExprsAreNotNullable = function(e) {
          for (let t = 0; t < this.factors.length; t++)
            this.factors[t].assertIteratedExprsAreNotNullable(e);
        };
        N.Iter.prototype.assertIteratedExprsAreNotNullable = function(e) {
          if (this.expr.assertIteratedExprsAreNotNullable(e), this.expr.isNullable(e))
            throw _n.kleeneExprHasNullableOperand(this, []);
        };
        N.Opt.prototype.assertIteratedExprsAreNotNullable = N.Not.prototype.assertIteratedExprsAreNotNullable = N.Lookahead.prototype.assertIteratedExprsAreNotNullable = N.Lex.prototype.assertIteratedExprsAreNotNullable = function(e) {
          this.expr.assertIteratedExprsAreNotNullable(e);
        };
        N.Apply.prototype.assertIteratedExprsAreNotNullable = function(e) {
          this.args.forEach((t) => {
            t.assertIteratedExprsAreNotNullable(e);
          });
        };
      });
      var Ne = h((Fs, tu) => {
        "use strict";
        var { assert: wn } = m(), lt = $(), eu = Z();
        function q(e, t, u) {
          this.sourceString = e, this.startIdx = t, this.endIdx = u;
        }
        q.coverage = function(e, ...t) {
          let { startIdx: u, endIdx: r } = e;
          for (let n of t) {
            if (n.sourceString !== e.sourceString)
              throw lt.intervalSourcesDontMatch();
            u = Math.min(u, n.startIdx), r = Math.max(r, n.endIdx);
          }
          return new q(e.sourceString, u, r);
        };
        q.prototype = { coverageWith(...e) {
          return q.coverage(...e, this);
        }, collapsedLeft() {
          return new q(this.sourceString, this.startIdx, this.startIdx);
        }, collapsedRight() {
          return new q(this.sourceString, this.endIdx, this.endIdx);
        }, getLineAndColumn() {
          return eu.getLineAndColumn(this.sourceString, this.startIdx);
        }, getLineAndColumnMessage() {
          let e = [this.startIdx, this.endIdx];
          return eu.getLineAndColumnMessage(this.sourceString, this.startIdx, e);
        }, minus(e) {
          if (this.sourceString !== e.sourceString)
            throw lt.intervalSourcesDontMatch();
          return this.startIdx === e.startIdx && this.endIdx === e.endIdx ? [] : this.startIdx < e.startIdx && e.endIdx < this.endIdx ? [new q(this.sourceString, this.startIdx, e.startIdx), new q(this.sourceString, e.endIdx, this.endIdx)] : this.startIdx < e.endIdx && e.endIdx < this.endIdx ? [new q(this.sourceString, e.endIdx, this.endIdx)] : this.startIdx < e.startIdx && e.startIdx < this.endIdx ? [new q(this.sourceString, this.startIdx, e.startIdx)] : [this];
        }, relativeTo(e) {
          if (this.sourceString !== e.sourceString)
            throw lt.intervalSourcesDontMatch();
          return wn(this.startIdx >= e.startIdx && this.endIdx <= e.endIdx, "other interval does not cover this one"), new q(this.sourceString, this.startIdx - e.startIdx, this.endIdx - e.startIdx);
        }, trimmed() {
          let { contents: e } = this, t = this.startIdx + e.match(/^\s*/)[0].length, u = this.endIdx - e.match(/\s*$/)[0].length;
          return new q(this.sourceString, t, u);
        }, subInterval(e, t) {
          let u = this.startIdx + e;
          return new q(this.sourceString, u, u + t);
        } };
        Object.defineProperties(q.prototype, { contents: { get() {
          return this._contents === void 0 && (this._contents = this.sourceString.slice(this.startIdx, this.endIdx)), this._contents;
        }, enumerable: true }, length: { get() {
          return this.endIdx - this.startIdx;
        }, enumerable: true } });
        tu.exports = q;
      });
      var ht = h((gs, ru) => {
        "use strict";
        var Pn = Ne(), Dt = m(), On = "\u2717", Nn = "\u2713", qn = "\u22C5", Ln = "\u21D2", Rn = "\u2409", Tn = "\u240A", kn = "\u240D", pt = { succeeded: 1 << 0, isRootNode: 1 << 1, isImplicitSpaces: 1 << 2, isMemoized: 1 << 3, isHeadOfLeftRecursion: 1 << 4, terminatesLR: 1 << 5 };
        function jn(e) {
          return Dt.repeat(" ", e).join("");
        }
        function Mn(e, t, u) {
          let r = uu(e.slice(t, t + u));
          return r.length < u ? r + Dt.repeat(" ", u - r.length).join("") : r;
        }
        function uu(e) {
          return typeof e == "string" ? e.replace(/ /g, qn).replace(/\t/g, Rn).replace(/\n/g, Tn).replace(/\r/g, kn) : String(e);
        }
        function W(e, t, u, r, n, i, s) {
          this.input = e, this.pos = this.pos1 = t, this.pos2 = u, this.source = new Pn(e, t, u), this.expr = r, this.bindings = i, this.children = s || [], this.terminatingLREntry = null, this._flags = n ? pt.succeeded : 0;
        }
        W.prototype.SKIP = {};
        Object.defineProperty(W.prototype, "displayString", { get() {
          return this.expr.toDisplayString();
        } });
        Object.keys(pt).forEach((e) => {
          let t = pt[e];
          Object.defineProperty(W.prototype, e, { get() {
            return (this._flags & t) !== 0;
          }, set(u) {
            u ? this._flags |= t : this._flags &= ~t;
          } });
        });
        W.prototype.clone = function() {
          return this.cloneWithExpr(this.expr);
        };
        W.prototype.cloneWithExpr = function(e) {
          let t = new W(this.input, this.pos, this.pos2, e, this.succeeded, this.bindings, this.children);
          return t.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion, t.isImplicitSpaces = this.isImplicitSpaces, t.isMemoized = this.isMemoized, t.isRootNode = this.isRootNode, t.terminatesLR = this.terminatesLR, t.terminatingLREntry = this.terminatingLREntry, t;
        };
        W.prototype.recordLRTermination = function(e, t) {
          this.terminatingLREntry = new W(this.input, this.pos, this.pos2, this.expr, false, [t], [e]), this.terminatingLREntry.terminatesLR = true;
        };
        W.prototype.walk = function(e, t) {
          let u = e;
          typeof u == "function" && (u = { enter: u });
          function r(n, i, s) {
            let l = true;
            u.enter && u.enter.call(t, n, i, s) === W.prototype.SKIP && (l = false), l && (n.children.forEach((c) => {
              r(c, n, s + 1);
            }), u.exit && u.exit.call(t, n, i, s));
          }
          this.isRootNode ? this.children.forEach((n) => {
            r(n, null, 0);
          }) : r(this, null, 0);
        };
        W.prototype.toString = function() {
          let e = new Dt.StringBuffer();
          return this.walk((t, u, r) => {
            if (!t)
              return this.SKIP;
            if (t.expr.constructor.name !== "Alt") {
              if (e.append(Mn(t.input, t.pos, 10) + jn(r * 2 + 1)), e.append((t.succeeded ? Nn : On) + " " + t.displayString), t.isHeadOfLeftRecursion && e.append(" (LR)"), t.succeeded) {
                let i = uu(t.source.contents);
                e.append(" " + Ln + "  "), e.append(typeof i == "string" ? '"' + i + '"' : i);
              }
              e.append(`
`);
            }
          }), e.contents();
        };
        ru.exports = W;
      });
      var iu = h(() => {
        "use strict";
        var Gn = ht(), nu = m(), Vn = $(), At = we(), g = I(), { TerminalNode: de } = At, { NonterminalNode: Un } = At, { IterationNode: Wn } = At;
        g.PExpr.prototype.eval = nu.abstract("eval");
        g.any.eval = function(e) {
          let { inputStream: t } = e, u = t.pos, r = t.next();
          return r ? (e.pushBinding(new de(r.length), u), true) : (e.processFailure(u, this), false);
        };
        g.end.eval = function(e) {
          let { inputStream: t } = e, u = t.pos;
          return t.atEnd() ? (e.pushBinding(new de(0), u), true) : (e.processFailure(u, this), false);
        };
        g.Terminal.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos;
          return t.matchString(this.obj) ? (e.pushBinding(new de(this.obj.length), u), true) : (e.processFailure(u, this), false);
        };
        g.Range.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos, r = this.matchCodePoint ? t.nextCodePoint() : t.nextCharCode();
          return r !== void 0 && this.from.codePointAt(0) <= r && r <= this.to.codePointAt(0) ? (e.pushBinding(new de(String.fromCodePoint(r).length), u), true) : (e.processFailure(u, this), false);
        };
        g.Param.prototype.eval = function(e) {
          return e.eval(e.currentApplication().args[this.index]);
        };
        g.Lex.prototype.eval = function(e) {
          e.enterLexifiedContext();
          let t = e.eval(this.expr);
          return e.exitLexifiedContext(), t;
        };
        g.Alt.prototype.eval = function(e) {
          for (let t = 0; t < this.terms.length; t++)
            if (e.eval(this.terms[t]))
              return true;
          return false;
        };
        g.Seq.prototype.eval = function(e) {
          for (let t = 0; t < this.factors.length; t++) {
            let u = this.factors[t];
            if (!e.eval(u))
              return false;
          }
          return true;
        };
        g.Iter.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos, r = this.getArity(), n = [], i = [];
          for (; n.length < r; )
            n.push([]), i.push([]);
          let s = 0, l = u, c;
          for (; s < this.maxNumMatches && e.eval(this.expr); ) {
            if (t.pos === l)
              throw Vn.kleeneExprHasNullableOperand(this, e._applicationStack);
            l = t.pos, s++;
            let p = e._bindings.splice(e._bindings.length - r, r), A = e._bindingOffsets.splice(e._bindingOffsets.length - r, r);
            for (c = 0; c < p.length; c++)
              n[c].push(p[c]), i[c].push(A[c]);
          }
          if (s < this.minNumMatches)
            return false;
          let D = e.posToOffset(u), a = 0;
          if (s > 0) {
            let p = n[r - 1], A = i[r - 1], f = A[A.length - 1] + p[p.length - 1].matchLength;
            D = i[0][0], a = f - D;
          }
          let o = this instanceof g.Opt;
          for (c = 0; c < n.length; c++)
            e._bindings.push(new Wn(n[c], i[c], a, o)), e._bindingOffsets.push(D);
          return true;
        };
        g.Not.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos;
          e.pushFailuresInfo();
          let r = e.eval(this.expr);
          return e.popFailuresInfo(), r ? (e.processFailure(u, this), false) : (t.pos = u, true);
        };
        g.Lookahead.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos;
          return e.eval(this.expr) ? (t.pos = u, true) : false;
        };
        g.Apply.prototype.eval = function(e) {
          let t = e.currentApplication(), u = t ? t.args : [], r = this.substituteParams(u), n = e.getCurrentPosInfo();
          if (n.isActive(r))
            return r.handleCycle(e);
          let i = r.toMemoKey(), s = n.memo[i];
          if (s && n.shouldUseMemoizedResult(s)) {
            if (e.hasNecessaryInfo(s))
              return e.useMemoizedResult(e.inputStream.pos, s);
            delete n.memo[i];
          }
          return r.reallyEval(e);
        };
        g.Apply.prototype.handleCycle = function(e) {
          let t = e.getCurrentPosInfo(), { currentLeftRecursion: u } = t, r = this.toMemoKey(), n = t.memo[r];
          return u && u.headApplication.toMemoKey() === r ? n.updateInvolvedApplicationMemoKeys() : n || (n = t.memoize(r, { matchLength: 0, examinedLength: 0, value: false, rightmostFailureOffset: -1 }), t.startLeftRecursion(this, n)), e.useMemoizedResult(e.inputStream.pos, n);
        };
        g.Apply.prototype.reallyEval = function(e) {
          let { inputStream: t } = e, u = t.pos, r = e.getCurrentPosInfo(), n = e.grammar.rules[this.ruleName], { body: i } = n, { description: s } = n;
          e.enterApplication(r, this), s && e.pushFailuresInfo();
          let l = t.examinedLength;
          t.examinedLength = 0;
          let c = this.evalOnce(i, e), D = r.currentLeftRecursion, a = this.toMemoKey(), o = D && D.headApplication.toMemoKey() === a, p;
          o ? (c = this.growSeedResult(i, e, u, D, c), r.endLeftRecursion(), p = D, p.examinedLength = t.examinedLength - u, p.rightmostFailureOffset = e._getRightmostFailureOffset(), r.memoize(a, p)) : (!D || !D.isInvolved(a)) && (p = r.memoize(a, { matchLength: t.pos - u, examinedLength: t.examinedLength - u, value: c, failuresAtRightmostPosition: e.cloneRecordedFailures(), rightmostFailureOffset: e._getRightmostFailureOffset() }));
          let A = !!c;
          if (s && (e.popFailuresInfo(), A || e.processFailure(u, this), p && (p.failuresAtRightmostPosition = e.cloneRecordedFailures())), e.isTracing() && p) {
            let f = e.getTraceEntry(u, this, A, A ? [c] : []);
            o && (nu.assert(f.terminatingLREntry != null || !A), f.isHeadOfLeftRecursion = true), p.traceEntry = f;
          }
          return t.examinedLength = Math.max(t.examinedLength, l), e.exitApplication(r, c), A;
        };
        g.Apply.prototype.evalOnce = function(e, t) {
          let { inputStream: u } = t, r = u.pos;
          if (t.eval(e)) {
            let n = e.getArity(), i = t._bindings.splice(t._bindings.length - n, n), s = t._bindingOffsets.splice(t._bindingOffsets.length - n, n), l = u.pos - r;
            return new Un(this.ruleName, i, s, l);
          } else
            return false;
        };
        g.Apply.prototype.growSeedResult = function(e, t, u, r, n) {
          if (!n)
            return false;
          let { inputStream: i } = t;
          for (; ; ) {
            if (r.matchLength = i.pos - u, r.value = n, r.failuresAtRightmostPosition = t.cloneRecordedFailures(), t.isTracing()) {
              let s = t.trace[t.trace.length - 1];
              r.traceEntry = new Gn(t.input, u, i.pos, this, true, [n], [s.clone()]);
            }
            if (i.pos = u, n = this.evalOnce(e, t), i.pos - u <= r.matchLength)
              break;
            t.isTracing() && t.trace.splice(-2, 1);
          }
          return t.isTracing() && r.traceEntry.recordLRTermination(t.trace.pop(), n), i.pos = u + r.matchLength, r.value;
        };
        g.UnicodeChar.prototype.eval = function(e) {
          let { inputStream: t } = e, u = t.pos, r = t.next();
          return r && this.pattern.test(r) ? (e.pushBinding(new de(r.length), u), true) : (e.processFailure(u, this), false);
        };
      });
      var su = h(() => {
        "use strict";
        var zn = m(), k = I();
        k.PExpr.prototype.getArity = zn.abstract("getArity");
        k.any.getArity = k.end.getArity = k.Terminal.prototype.getArity = k.Range.prototype.getArity = k.Param.prototype.getArity = k.Apply.prototype.getArity = k.UnicodeChar.prototype.getArity = function() {
          return 1;
        };
        k.Alt.prototype.getArity = function() {
          return this.terms.length === 0 ? 0 : this.terms[0].getArity();
        };
        k.Seq.prototype.getArity = function() {
          let e = 0;
          for (let t = 0; t < this.factors.length; t++)
            e += this.factors[t].getArity();
          return e;
        };
        k.Iter.prototype.getArity = function() {
          return this.expr.getArity();
        };
        k.Not.prototype.getArity = function() {
          return 0;
        };
        k.Lookahead.prototype.getArity = k.Lex.prototype.getArity = function() {
          return this.expr.getArity();
        };
      });
      var ou = h(() => {
        "use strict";
        var Kn = m(), v = I();
        function z(e, t) {
          let u = {};
          if (e.source && t) {
            let r = e.source.relativeTo(t);
            u.sourceInterval = [r.startIdx, r.endIdx];
          }
          return u;
        }
        v.PExpr.prototype.outputRecipe = Kn.abstract("outputRecipe");
        v.any.outputRecipe = function(e, t) {
          return ["any", z(this, t)];
        };
        v.end.outputRecipe = function(e, t) {
          return ["end", z(this, t)];
        };
        v.Terminal.prototype.outputRecipe = function(e, t) {
          return ["terminal", z(this, t), this.obj];
        };
        v.Range.prototype.outputRecipe = function(e, t) {
          return ["range", z(this, t), this.from, this.to];
        };
        v.Param.prototype.outputRecipe = function(e, t) {
          return ["param", z(this, t), this.index];
        };
        v.Alt.prototype.outputRecipe = function(e, t) {
          return ["alt", z(this, t)].concat(this.terms.map((u) => u.outputRecipe(e, t)));
        };
        v.Extend.prototype.outputRecipe = function(e, t) {
          return this.terms[0].outputRecipe(e, t);
        };
        v.Splice.prototype.outputRecipe = function(e, t) {
          let u = this.terms.slice(0, this.expansionPos), r = this.terms.slice(this.expansionPos + 1);
          return ["splice", z(this, t), u.map((n) => n.outputRecipe(e, t)), r.map((n) => n.outputRecipe(e, t))];
        };
        v.Seq.prototype.outputRecipe = function(e, t) {
          return ["seq", z(this, t)].concat(this.factors.map((u) => u.outputRecipe(e, t)));
        };
        v.Star.prototype.outputRecipe = v.Plus.prototype.outputRecipe = v.Opt.prototype.outputRecipe = v.Not.prototype.outputRecipe = v.Lookahead.prototype.outputRecipe = v.Lex.prototype.outputRecipe = function(e, t) {
          return [this.constructor.name.toLowerCase(), z(this, t), this.expr.outputRecipe(e, t)];
        };
        v.Apply.prototype.outputRecipe = function(e, t) {
          return ["app", z(this, t), this.ruleName, this.args.map((u) => u.outputRecipe(e, t))];
        };
        v.UnicodeChar.prototype.outputRecipe = function(e, t) {
          return ["unicodeChar", z(this, t), this.category];
        };
      });
      var au = h(() => {
        "use strict";
        var Hn = m(), L = I();
        L.PExpr.prototype.introduceParams = Hn.abstract("introduceParams");
        L.any.introduceParams = L.end.introduceParams = L.Terminal.prototype.introduceParams = L.Range.prototype.introduceParams = L.Param.prototype.introduceParams = L.UnicodeChar.prototype.introduceParams = function(e) {
          return this;
        };
        L.Alt.prototype.introduceParams = function(e) {
          return this.terms.forEach((t, u, r) => {
            r[u] = t.introduceParams(e);
          }), this;
        };
        L.Seq.prototype.introduceParams = function(e) {
          return this.factors.forEach((t, u, r) => {
            r[u] = t.introduceParams(e);
          }), this;
        };
        L.Iter.prototype.introduceParams = L.Not.prototype.introduceParams = L.Lookahead.prototype.introduceParams = L.Lex.prototype.introduceParams = function(e) {
          return this.expr = this.expr.introduceParams(e), this;
        };
        L.Apply.prototype.introduceParams = function(e) {
          let t = e.indexOf(this.ruleName);
          if (t >= 0) {
            if (this.args.length > 0)
              throw new Error("Parameterized rules cannot be passed as arguments to another rule.");
            return new L.Param(t).withSource(this.source);
          } else
            return this.args.forEach((u, r, n) => {
              n[r] = u.introduceParams(e);
            }), this;
        };
      });
      var cu = h(() => {
        "use strict";
        var $n = m(), S = I();
        S.PExpr.prototype.isNullable = function(e) {
          return this._isNullable(e, /* @__PURE__ */ Object.create(null));
        };
        S.PExpr.prototype._isNullable = $n.abstract("_isNullable");
        S.any._isNullable = S.Range.prototype._isNullable = S.Param.prototype._isNullable = S.Plus.prototype._isNullable = S.UnicodeChar.prototype._isNullable = function(e, t) {
          return false;
        };
        S.end._isNullable = function(e, t) {
          return true;
        };
        S.Terminal.prototype._isNullable = function(e, t) {
          return typeof this.obj == "string" ? this.obj === "" : false;
        };
        S.Alt.prototype._isNullable = function(e, t) {
          return this.terms.length === 0 || this.terms.some((u) => u._isNullable(e, t));
        };
        S.Seq.prototype._isNullable = function(e, t) {
          return this.factors.every((u) => u._isNullable(e, t));
        };
        S.Star.prototype._isNullable = S.Opt.prototype._isNullable = S.Not.prototype._isNullable = S.Lookahead.prototype._isNullable = function(e, t) {
          return true;
        };
        S.Lex.prototype._isNullable = function(e, t) {
          return this.expr._isNullable(e, t);
        };
        S.Apply.prototype._isNullable = function(e, t) {
          let u = this.toMemoKey();
          if (!Object.prototype.hasOwnProperty.call(t, u)) {
            let { body: r } = e.rules[this.ruleName], n = r.substituteParams(this.args);
            t[u] = false, t[u] = n._isNullable(e, t);
          }
          return t[u];
        };
      });
      var lu = h(() => {
        "use strict";
        var Jn = m(), b = I();
        b.PExpr.prototype.substituteParams = Jn.abstract("substituteParams");
        b.any.substituteParams = b.end.substituteParams = b.Terminal.prototype.substituteParams = b.Range.prototype.substituteParams = b.UnicodeChar.prototype.substituteParams = function(e) {
          return this;
        };
        b.Param.prototype.substituteParams = function(e) {
          return e[this.index];
        };
        b.Alt.prototype.substituteParams = function(e) {
          return new b.Alt(this.terms.map((t) => t.substituteParams(e)));
        };
        b.Seq.prototype.substituteParams = function(e) {
          return new b.Seq(this.factors.map((t) => t.substituteParams(e)));
        };
        b.Iter.prototype.substituteParams = b.Not.prototype.substituteParams = b.Lookahead.prototype.substituteParams = b.Lex.prototype.substituteParams = function(e) {
          return new this.constructor(this.expr.substituteParams(e));
        };
        b.Apply.prototype.substituteParams = function(e) {
          if (this.args.length === 0)
            return this;
          {
            let t = this.args.map((u) => u.substituteParams(e));
            return new b.Apply(this.ruleName, t);
          }
        };
      });
      var hu = h(() => {
        "use strict";
        var Du = m(), R = I(), { copyWithoutDuplicates: Zn } = Du;
        function pu(e) {
          return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e);
        }
        function mt(e) {
          let t = /* @__PURE__ */ Object.create(null);
          e.forEach((u) => {
            t[u] = (t[u] || 0) + 1;
          }), Object.keys(t).forEach((u) => {
            if (t[u] <= 1)
              return;
            let r = 1;
            e.forEach((n, i) => {
              n === u && (e[i] = n + "_" + r++);
            });
          });
        }
        R.PExpr.prototype.toArgumentNameList = Du.abstract("toArgumentNameList");
        R.any.toArgumentNameList = function(e, t) {
          return ["any"];
        };
        R.end.toArgumentNameList = function(e, t) {
          return ["end"];
        };
        R.Terminal.prototype.toArgumentNameList = function(e, t) {
          return typeof this.obj == "string" && /^[_a-zA-Z0-9]+$/.test(this.obj) ? ["_" + this.obj] : ["$" + e];
        };
        R.Range.prototype.toArgumentNameList = function(e, t) {
          let u = this.from + "_to_" + this.to;
          return pu(u) || (u = "_" + u), pu(u) || (u = "$" + e), [u];
        };
        R.Alt.prototype.toArgumentNameList = function(e, t) {
          let u = this.terms.map((i) => i.toArgumentNameList(e, true)), r = [], n = u[0].length;
          for (let i = 0; i < n; i++) {
            let s = [];
            for (let c = 0; c < this.terms.length; c++)
              s.push(u[c][i]);
            let l = Zn(s);
            r.push(l.join("_or_"));
          }
          return t || mt(r), r;
        };
        R.Seq.prototype.toArgumentNameList = function(e, t) {
          let u = [];
          return this.factors.forEach((r) => {
            let n = r.toArgumentNameList(e, true);
            u = u.concat(n), e += n.length;
          }), t || mt(u), u;
        };
        R.Iter.prototype.toArgumentNameList = function(e, t) {
          let u = this.expr.toArgumentNameList(e, t).map((r) => r[r.length - 1] === "s" ? r + "es" : r + "s");
          return t || mt(u), u;
        };
        R.Opt.prototype.toArgumentNameList = function(e, t) {
          return this.expr.toArgumentNameList(e, t).map((u) => "opt" + u[0].toUpperCase() + u.slice(1));
        };
        R.Not.prototype.toArgumentNameList = function(e, t) {
          return [];
        };
        R.Lookahead.prototype.toArgumentNameList = R.Lex.prototype.toArgumentNameList = function(e, t) {
          return this.expr.toArgumentNameList(e, t);
        };
        R.Apply.prototype.toArgumentNameList = function(e, t) {
          return [this.ruleName];
        };
        R.UnicodeChar.prototype.toArgumentNameList = function(e, t) {
          return ["$" + e];
        };
        R.Param.prototype.toArgumentNameList = function(e, t) {
          return ["param" + this.index];
        };
      });
      var Au = h(() => {
        "use strict";
        var Qn = m(), j = I();
        j.PExpr.prototype.toDisplayString = Qn.abstract("toDisplayString");
        j.Alt.prototype.toDisplayString = j.Seq.prototype.toDisplayString = function() {
          return this.source ? this.source.trimmed().contents : "[" + this.constructor.name + "]";
        };
        j.any.toDisplayString = j.end.toDisplayString = j.Iter.prototype.toDisplayString = j.Not.prototype.toDisplayString = j.Lookahead.prototype.toDisplayString = j.Lex.prototype.toDisplayString = j.Terminal.prototype.toDisplayString = j.Range.prototype.toDisplayString = j.Param.prototype.toDisplayString = function() {
          return this.toString();
        };
        j.Apply.prototype.toDisplayString = function() {
          if (this.args.length > 0) {
            let e = this.args.map((t) => t.toDisplayString());
            return this.ruleName + "<" + e.join(",") + ">";
          } else
            return this.ruleName;
        };
        j.UnicodeChar.prototype.toDisplayString = function() {
          return "Unicode [" + this.category + "] character";
        };
      });
      var mu = h(() => {
        "use strict";
        var J = ze(), Yn = m(), V = I();
        V.PExpr.prototype.toFailure = Yn.abstract("toFailure");
        V.any.toFailure = function(e) {
          return new J(this, "any object", "description");
        };
        V.end.toFailure = function(e) {
          return new J(this, "end of input", "description");
        };
        V.Terminal.prototype.toFailure = function(e) {
          return new J(this, this.obj, "string");
        };
        V.Range.prototype.toFailure = function(e) {
          return new J(this, JSON.stringify(this.from) + ".." + JSON.stringify(this.to), "code");
        };
        V.Not.prototype.toFailure = function(e) {
          let t = this.expr === V.any ? "nothing" : "not " + this.expr.toFailure(e);
          return new J(this, t, "description");
        };
        V.Lookahead.prototype.toFailure = function(e) {
          return this.expr.toFailure(e);
        };
        V.Apply.prototype.toFailure = function(e) {
          let { description: t } = e.rules[this.ruleName];
          return t || (t = (/^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a") + " " + this.ruleName), new J(this, t, "description");
        };
        V.UnicodeChar.prototype.toFailure = function(e) {
          return new J(this, "a Unicode [" + this.category + "] character", "description");
        };
        V.Alt.prototype.toFailure = function(e) {
          let u = "(" + this.terms.map((r) => r.toFailure(e)).join(" or ") + ")";
          return new J(this, u, "description");
        };
        V.Seq.prototype.toFailure = function(e) {
          let u = "(" + this.factors.map((r) => r.toFailure(e)).join(" ") + ")";
          return new J(this, u, "description");
        };
        V.Iter.prototype.toFailure = function(e) {
          let t = "(" + this.expr.toFailure(e) + this.operator + ")";
          return new J(this, t, "description");
        };
      });
      var fu = h(() => {
        "use strict";
        var Xn = m(), M = I();
        M.PExpr.prototype.toString = Xn.abstract("toString");
        M.any.toString = function() {
          return "any";
        };
        M.end.toString = function() {
          return "end";
        };
        M.Terminal.prototype.toString = function() {
          return JSON.stringify(this.obj);
        };
        M.Range.prototype.toString = function() {
          return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
        };
        M.Param.prototype.toString = function() {
          return "$" + this.index;
        };
        M.Lex.prototype.toString = function() {
          return "#(" + this.expr.toString() + ")";
        };
        M.Alt.prototype.toString = function() {
          return this.terms.length === 1 ? this.terms[0].toString() : "(" + this.terms.map((e) => e.toString()).join(" | ") + ")";
        };
        M.Seq.prototype.toString = function() {
          return this.factors.length === 1 ? this.factors[0].toString() : "(" + this.factors.map((e) => e.toString()).join(" ") + ")";
        };
        M.Iter.prototype.toString = function() {
          return this.expr + this.operator;
        };
        M.Not.prototype.toString = function() {
          return "~" + this.expr;
        };
        M.Lookahead.prototype.toString = function() {
          return "&" + this.expr;
        };
        M.Apply.prototype.toString = function() {
          if (this.args.length > 0) {
            let e = this.args.map((t) => t.toString());
            return this.ruleName + "<" + e.join(",") + ">";
          } else
            return this.ruleName;
        };
        M.UnicodeChar.prototype.toString = function() {
          return "\\p{" + this.category + "}";
        };
      });
      var Y = h((Vs, Eu) => {
        "use strict";
        Eu.exports = I();
        Kt();
        Zt();
        Yt();
        Xt();
        iu();
        su();
        ou();
        au();
        cu();
        lu();
        hu();
        Au();
        mu();
        fu();
      });
      var Cu = h((Us, du) => {
        "use strict";
        var ei = ze(), { TerminalNode: ti } = we(), { assert: ui } = m(), { PExpr: ri, Terminal: ni } = Y(), Ce = class extends ri {
          constructor(t) {
            super(), this.obj = t;
          }
          _getString(t) {
            let u = t.currentApplication().args[this.obj.index];
            return ui(u instanceof ni, "expected a Terminal expression"), u.obj;
          }
          allowsSkippingPrecedingSpace() {
            return true;
          }
          eval(t) {
            let { inputStream: u } = t, r = u.pos, n = this._getString(t);
            return u.matchString(n, true) ? (t.pushBinding(new ti(n.length), r), true) : (t.processFailure(r, this), false);
          }
          getArity() {
            return 1;
          }
          substituteParams(t) {
            return new Ce(this.obj.substituteParams(t));
          }
          toDisplayString() {
            return this.obj.toDisplayString() + " (case-insensitive)";
          }
          toFailure(t) {
            return new ei(this, this.obj.toFailure(t) + " (case-insensitive)", "description");
          }
          _isNullable(t, u) {
            return this.obj._isNullable(t, u);
          }
        };
        du.exports = Ce;
      });
      var qe = h((Ws, gu) => {
        "use strict";
        var ii = Ne();
        function Fu(e) {
          this.source = e, this.pos = 0, this.examinedLength = 0;
        }
        Fu.prototype = { atEnd() {
          let e = this.pos === this.source.length;
          return this.examinedLength = Math.max(this.examinedLength, this.pos + 1), e;
        }, next() {
          let e = this.source[this.pos++];
          return this.examinedLength = Math.max(this.examinedLength, this.pos), e;
        }, nextCharCode() {
          let e = this.next();
          return e && e.charCodeAt(0);
        }, nextCodePoint() {
          let e = this.source.slice(this.pos++).codePointAt(0);
          return e > 65535 && (this.pos += 1), this.examinedLength = Math.max(this.examinedLength, this.pos), e;
        }, matchString(e, t) {
          let u;
          if (t) {
            for (u = 0; u < e.length; u++) {
              let r = this.next(), n = e[u];
              if (r == null || r.toUpperCase() !== n.toUpperCase())
                return false;
            }
            return true;
          }
          for (u = 0; u < e.length; u++)
            if (this.next() !== e[u])
              return false;
          return true;
        }, sourceSlice(e, t) {
          return this.source.slice(e, t);
        }, interval(e, t) {
          return new ii(this.source, e, t || this.pos);
        } };
        gu.exports = Fu;
      });
      var Et = h((zs, vu) => {
        "use strict";
        var ft = m(), yu = Z(), si = Ne();
        function X(e, t, u, r, n, i, s) {
          this.matcher = e, this.input = t, this.startExpr = u, this._cst = r, this._cstOffset = n, this._rightmostFailurePosition = i, this._rightmostFailures = s, this.failed() && (ft.defineLazyProperty(this, "message", function() {
            let l = "Expected " + this.getExpectedText();
            return yu.getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + l;
          }), ft.defineLazyProperty(this, "shortMessage", function() {
            let l = "expected " + this.getExpectedText(), c = yu.getLineAndColumn(this.input, this.getRightmostFailurePosition());
            return "Line " + c.lineNum + ", col " + c.colNum + ": " + l;
          }));
        }
        X.prototype.succeeded = function() {
          return !!this._cst;
        };
        X.prototype.failed = function() {
          return !this.succeeded();
        };
        X.prototype.getRightmostFailurePosition = function() {
          return this._rightmostFailurePosition;
        };
        X.prototype.getRightmostFailures = function() {
          if (!this._rightmostFailures) {
            this.matcher.setInput(this.input);
            let e = this.matcher._match(this.startExpr, false, this.getRightmostFailurePosition());
            this._rightmostFailures = e.getRightmostFailures();
          }
          return this._rightmostFailures;
        };
        X.prototype.toString = function() {
          return this.succeeded() ? "[match succeeded]" : "[match failed at position " + this.getRightmostFailurePosition() + "]";
        };
        X.prototype.getExpectedText = function() {
          if (this.succeeded())
            throw new Error("cannot get expected text of a successful MatchResult");
          let e = new ft.StringBuffer(), t = this.getRightmostFailures();
          t = t.filter((u) => !u.isFluffy());
          for (let u = 0; u < t.length; u++)
            u > 0 && (u === t.length - 1 ? e.append(t.length > 2 ? ", or " : " or ") : e.append(", ")), e.append(t[u].toString());
          return e.contents();
        };
        X.prototype.getInterval = function() {
          let e = this.getRightmostFailurePosition();
          return new si(this.input, e, e);
        };
        vu.exports = X;
      });
      var xu = h((Ks, Iu) => {
        "use strict";
        function Bu() {
          this.applicationMemoKeyStack = [], this.memo = {}, this.maxExaminedLength = 0, this.maxRightmostFailureOffset = -1, this.currentLeftRecursion = void 0;
        }
        Bu.prototype = { isActive(e) {
          return this.applicationMemoKeyStack.indexOf(e.toMemoKey()) >= 0;
        }, enter(e) {
          this.applicationMemoKeyStack.push(e.toMemoKey());
        }, exit() {
          this.applicationMemoKeyStack.pop();
        }, startLeftRecursion(e, t) {
          t.isLeftRecursion = true, t.headApplication = e, t.nextLeftRecursion = this.currentLeftRecursion, this.currentLeftRecursion = t;
          let { applicationMemoKeyStack: u } = this, r = u.indexOf(e.toMemoKey()) + 1, n = u.slice(r);
          t.isInvolved = function(i) {
            return n.indexOf(i) >= 0;
          }, t.updateInvolvedApplicationMemoKeys = function() {
            for (let i = r; i < u.length; i++) {
              let s = u[i];
              this.isInvolved(s) || n.push(s);
            }
          };
        }, endLeftRecursion() {
          this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
        }, shouldUseMemoizedResult(e) {
          if (!e.isLeftRecursion)
            return true;
          let { applicationMemoKeyStack: t } = this;
          for (let u = 0; u < t.length; u++) {
            let r = t[u];
            if (e.isInvolved(r))
              return false;
          }
          return true;
        }, memoize(e, t) {
          return this.memo[e] = t, this.maxExaminedLength = Math.max(this.maxExaminedLength, t.examinedLength), this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, t.rightmostFailureOffset), t;
        }, clearObsoleteEntries(e, t) {
          if (e + this.maxExaminedLength <= t)
            return;
          let { memo: u } = this;
          this.maxExaminedLength = 0, this.maxRightmostFailureOffset = -1, Object.keys(u).forEach((r) => {
            let n = u[r];
            e + n.examinedLength > t ? delete u[r] : (this.maxExaminedLength = Math.max(this.maxExaminedLength, n.examinedLength), this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, n.rightmostFailureOffset));
          });
        } };
        Iu.exports = Bu;
      });
      var wu = h((Hs, _u) => {
        "use strict";
        var oi = qe(), ai = Et(), ci = xu(), li = ht(), Ct = Y(), pi = Z(), Su;
        pi.awaitBuiltInRules((e) => {
          Su = e.rules.applySyntactic.body;
        });
        var dt = new Ct.Apply("spaces");
        function bu(e, t, u) {
          this.matcher = e, this.startExpr = t, this.grammar = e.grammar, this.input = e.input, this.inputStream = new oi(e.input), this.memoTable = e.memoTable, this._bindings = [], this._bindingOffsets = [], this._applicationStack = [], this._posStack = [0], this.inLexifiedContextStack = [false], this.rightmostFailurePosition = -1, this._rightmostFailurePositionStack = [], this._recordedFailuresStack = [], u !== void 0 && (this.positionToRecordFailures = u, this.recordedFailures = /* @__PURE__ */ Object.create(null));
        }
        bu.prototype = { posToOffset(e) {
          return e - this._posStack[this._posStack.length - 1];
        }, enterApplication(e, t) {
          this._posStack.push(this.inputStream.pos), this._applicationStack.push(t), this.inLexifiedContextStack.push(false), e.enter(t), this._rightmostFailurePositionStack.push(this.rightmostFailurePosition), this.rightmostFailurePosition = -1;
        }, exitApplication(e, t) {
          let u = this._posStack.pop();
          this._applicationStack.pop(), this.inLexifiedContextStack.pop(), e.exit(), this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, this._rightmostFailurePositionStack.pop()), t && this.pushBinding(t, u);
        }, enterLexifiedContext() {
          this.inLexifiedContextStack.push(true);
        }, exitLexifiedContext() {
          this.inLexifiedContextStack.pop();
        }, currentApplication() {
          return this._applicationStack[this._applicationStack.length - 1];
        }, inSyntacticContext() {
          let e = this.currentApplication();
          return e ? e.isSyntactic() && !this.inLexifiedContext() : this.startExpr.factors[0].isSyntactic();
        }, inLexifiedContext() {
          return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
        }, skipSpaces() {
          return this.pushFailuresInfo(), this.eval(dt), this.popBinding(), this.popFailuresInfo(), this.inputStream.pos;
        }, skipSpacesIfInSyntacticContext() {
          return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
        }, maybeSkipSpacesBefore(e) {
          return e.allowsSkippingPrecedingSpace() && e !== dt ? this.skipSpacesIfInSyntacticContext() : this.inputStream.pos;
        }, pushBinding(e, t) {
          this._bindings.push(e), this._bindingOffsets.push(this.posToOffset(t));
        }, popBinding() {
          this._bindings.pop(), this._bindingOffsets.pop();
        }, numBindings() {
          return this._bindings.length;
        }, truncateBindings(e) {
          for (; this._bindings.length > e; )
            this.popBinding();
        }, getCurrentPosInfo() {
          return this.getPosInfo(this.inputStream.pos);
        }, getPosInfo(e) {
          let t = this.memoTable[e];
          return t || (t = this.memoTable[e] = new ci()), t;
        }, processFailure(e, t) {
          if (this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, e), this.recordedFailures && e === this.positionToRecordFailures) {
            let u = this.currentApplication();
            u && (t = t.substituteParams(u.args)), this.recordFailure(t.toFailure(this.grammar), false);
          }
        }, recordFailure(e, t) {
          let u = e.toKey();
          this.recordedFailures[u] ? this.recordedFailures[u].isFluffy() && !e.isFluffy() && this.recordedFailures[u].clearFluffy() : this.recordedFailures[u] = t ? e.clone() : e;
        }, recordFailures(e, t) {
          Object.keys(e).forEach((u) => {
            this.recordFailure(e[u], t);
          });
        }, cloneRecordedFailures() {
          if (!this.recordedFailures)
            return;
          let e = /* @__PURE__ */ Object.create(null);
          return Object.keys(this.recordedFailures).forEach((t) => {
            e[t] = this.recordedFailures[t].clone();
          }), e;
        }, getRightmostFailurePosition() {
          return this.rightmostFailurePosition;
        }, _getRightmostFailureOffset() {
          return this.rightmostFailurePosition >= 0 ? this.posToOffset(this.rightmostFailurePosition) : -1;
        }, getMemoizedTraceEntry(e, t) {
          let u = this.memoTable[e];
          if (u && t instanceof Ct.Apply) {
            let r = u.memo[t.toMemoKey()];
            if (r && r.traceEntry) {
              let n = r.traceEntry.cloneWithExpr(t);
              return n.isMemoized = true, n;
            }
          }
          return null;
        }, getTraceEntry(e, t, u, r) {
          if (t instanceof Ct.Apply) {
            let n = this.currentApplication(), i = n ? n.args : [];
            t = t.substituteParams(i);
          }
          return this.getMemoizedTraceEntry(e, t) || new li(this.input, e, this.inputStream.pos, t, u, r, this.trace);
        }, isTracing() {
          return !!this.trace;
        }, hasNecessaryInfo(e) {
          return this.trace && !e.traceEntry ? false : this.recordedFailures && this.inputStream.pos + e.rightmostFailureOffset === this.positionToRecordFailures ? !!e.failuresAtRightmostPosition : true;
        }, useMemoizedResult(e, t) {
          this.trace && this.trace.push(t.traceEntry);
          let u = this.inputStream.pos + t.rightmostFailureOffset;
          return this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, u), this.recordedFailures && this.positionToRecordFailures === u && t.failuresAtRightmostPosition && this.recordFailures(t.failuresAtRightmostPosition, true), this.inputStream.examinedLength = Math.max(this.inputStream.examinedLength, t.examinedLength + e), t.value ? (this.inputStream.pos += t.matchLength, this.pushBinding(t.value, e), true) : false;
        }, eval(e) {
          let { inputStream: t } = this, u = this._bindings.length, r;
          this.recordedFailures && (r = this.recordedFailures, this.recordedFailures = /* @__PURE__ */ Object.create(null));
          let n = t.pos, i = this.maybeSkipSpacesBefore(e), s;
          this.trace && (s = this.trace, this.trace = []);
          let l = e.eval(this);
          if (this.trace) {
            let c = this._bindings.slice(u), D = this.getTraceEntry(i, e, l, c);
            D.isImplicitSpaces = e === dt, D.isRootNode = e === this.startExpr, s.push(D), this.trace = s;
          }
          return l ? this.recordedFailures && t.pos === this.positionToRecordFailures && Object.keys(this.recordedFailures).forEach((c) => {
            this.recordedFailures[c].makeFluffy();
          }) : (t.pos = n, this.truncateBindings(u)), this.recordedFailures && this.recordFailures(r, false), e === Su && this.skipSpaces(), l;
        }, getMatchResult() {
          this.eval(this.startExpr);
          let e;
          this.recordedFailures && (e = Object.keys(this.recordedFailures).map((u) => this.recordedFailures[u]));
          let t = this._bindings[0];
          return t && (t.grammar = this.grammar), new ai(this.matcher, this.input, this.startExpr, t, this._bindingOffsets[0], this.rightmostFailurePosition, e);
        }, getTrace() {
          this.trace = [];
          let e = this.getMatchResult(), t = this.trace[this.trace.length - 1];
          return t.result = e, t;
        }, pushFailuresInfo() {
          this._rightmostFailurePositionStack.push(this.rightmostFailurePosition), this._recordedFailuresStack.push(this.recordedFailures);
        }, popFailuresInfo() {
          this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop(), this.recordedFailures = this._recordedFailuresStack.pop();
        } };
        _u.exports = bu;
      });
      var Nu = h(($s, Ou) => {
        "use strict";
        var Di = wu(), Pu = Y();
        function ee(e) {
          this.grammar = e, this.memoTable = [], this.input = "";
        }
        ee.prototype.getInput = function() {
          return this.input;
        };
        ee.prototype.setInput = function(e) {
          return this.input !== e && this.replaceInputRange(0, this.input.length, e), this;
        };
        ee.prototype.replaceInputRange = function(e, t, u) {
          let r = this.input;
          if (e < 0 || e > r.length || t < 0 || t > r.length || e > t)
            throw new Error("Invalid indices: " + e + " and " + t);
          this.input = r.slice(0, e) + u + r.slice(t);
          let n = this.memoTable.slice(t);
          this.memoTable.length = e;
          for (let i = 0; i < u.length; i++)
            this.memoTable.push(void 0);
          n.forEach(function(i) {
            this.memoTable.push(i);
          }, this);
          for (let i = 0; i < e; i++) {
            let s = this.memoTable[i];
            s && s.clearObsoleteEntries(i, e);
          }
          return this;
        };
        ee.prototype.match = function(e) {
          return this._match(this._getStartExpr(e), false);
        };
        ee.prototype.trace = function(e) {
          return this._match(this._getStartExpr(e), true);
        };
        ee.prototype._match = function(e, t, u) {
          let r = new Di(this, e, u);
          return t ? r.getTrace() : r.getMatchResult();
        };
        ee.prototype._getStartExpr = function(e) {
          let t = e || this.grammar.defaultStartRule;
          if (!t)
            throw new Error("Missing start rule argument -- the grammar has no default start rule.");
          let u = this.grammar.parseApplication(t);
          return new Pu.Seq([u, Pu.end]);
        };
        Ou.exports = ee;
      });
      var yt = h((Js, Ru) => {
        "use strict";
        var hi = qe(), { IterationNode: Ai } = we(), mi = Et(), Ft = m(), fi = $(), qu = Z(), Fe = [], gt = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Le = class {
          constructor(t, u, r) {
            this._node = t, this.source = u, this._baseInterval = r, t.isNonterminal() && Ft.assert(u === r), this._childWrappers = [];
          }
          toString() {
            return "[semantics wrapper for " + this._node.grammar.name + "]";
          }
          _forgetMemoizedResultFor(t) {
            delete this._node[this._semantics.attributeKeys[t]], this.children.forEach((u) => {
              u._forgetMemoizedResultFor(t);
            });
          }
          child(t) {
            if (!(0 <= t && t < this._node.numChildren()))
              return;
            let u = this._childWrappers[t];
            if (!u) {
              let r = this._node.childAt(t), n = this._node.childOffsets[t], i = this._baseInterval.subInterval(n, r.matchLength), s = r.isNonterminal() ? i : this._baseInterval;
              u = this._childWrappers[t] = this._semantics.wrap(r, i, s);
            }
            return u;
          }
          _children() {
            for (let t = 0; t < this._node.numChildren(); t++)
              this.child(t);
            return this._childWrappers;
          }
          isIteration() {
            return this._node.isIteration();
          }
          isTerminal() {
            return this._node.isTerminal();
          }
          isNonterminal() {
            return this._node.isNonterminal();
          }
          isSyntactic() {
            return this.isNonterminal() && this._node.isSyntactic();
          }
          isLexical() {
            return this.isNonterminal() && this._node.isLexical();
          }
          isOptional() {
            return this._node.isOptional();
          }
          iteration(t) {
            let u = t || [], r = u.map((s) => s._node), n = new Ai(r, [], -1, false), i = this._semantics.wrap(n, null, null);
            return i._childWrappers = u, i;
          }
          get children() {
            return this._children();
          }
          get ctorName() {
            return this._node.ctorName;
          }
          get interval() {
            throw new Error("The `interval` property is deprecated -- use `source` instead");
          }
          get numChildren() {
            return this._node.numChildren();
          }
          get sourceString() {
            return this.source.contents;
          }
        };
        function w(e, t) {
          let u = this;
          if (this.grammar = e, this.checkedActionDicts = false, this.Wrapper = class extends (t ? t.Wrapper : Le) {
            constructor(r, n, i) {
              super(r, n, i), u.checkActionDictsIfHaventAlready(), this._semantics = u;
            }
          }, this.super = t, t) {
            if (!(e.equals(this.super.grammar) || e._inheritsFrom(this.super.grammar)))
              throw new Error("Cannot extend a semantics for grammar '" + this.super.grammar.name + "' for use with grammar '" + e.name + "' (not a sub-grammar)");
            this.operations = Object.create(this.super.operations), this.attributes = Object.create(this.super.attributes), this.attributeKeys = /* @__PURE__ */ Object.create(null);
            for (let r in this.attributes)
              Object.defineProperty(this.attributeKeys, r, { value: qu.uniqueId(r) });
          } else
            this.operations = /* @__PURE__ */ Object.create(null), this.attributes = /* @__PURE__ */ Object.create(null), this.attributeKeys = /* @__PURE__ */ Object.create(null);
        }
        w.prototype.toString = function() {
          return "[semantics for " + this.grammar.name + "]";
        };
        w.prototype.checkActionDictsIfHaventAlready = function() {
          this.checkedActionDicts || (this.checkActionDicts(), this.checkedActionDicts = true);
        };
        w.prototype.checkActionDicts = function() {
          let e;
          for (e in this.operations)
            this.operations[e].checkActionDict(this.grammar);
          for (e in this.attributes)
            this.attributes[e].checkActionDict(this.grammar);
        };
        w.prototype.toRecipe = function(e) {
          function t(r) {
            return r.super !== w.BuiltInSemantics._getSemantics();
          }
          let u = `(function(g) {
`;
          if (t(this)) {
            u += "  var semantics = " + this.super.toRecipe(true) + "(g";
            let r = this.super.grammar, n = this.grammar;
            for (; n !== r; )
              u += ".superGrammar", n = n.superGrammar;
            u += `);
`, u += "  return g.extendSemantics(semantics)";
          } else
            u += "  return g.createSemantics()";
          return ["Operation", "Attribute"].forEach((r) => {
            let n = this[r.toLowerCase() + "s"];
            Object.keys(n).forEach((i) => {
              let { actionDict: s, formals: l, builtInDefault: c } = n[i], D = i;
              l.length > 0 && (D += "(" + l.join(", ") + ")");
              let a;
              t(this) && this.super[r.toLowerCase() + "s"][i] ? a = "extend" + r : a = "add" + r, u += `
    .` + a + "(" + JSON.stringify(D) + ", {";
              let o = [];
              Object.keys(s).forEach((p) => {
                if (s[p] !== c) {
                  let A = s[p].toString().trim();
                  A = A.replace(/^.*\(/, "function("), o.push(`
      ` + JSON.stringify(p) + ": " + A);
                }
              }), u += o.join(",") + `
    })`;
            });
          }), u += `;
  })`, e || (u = `(function() {
  var grammar = this.fromRecipe(` + this.grammar.toRecipe() + `);
  var semantics = ` + u + `(grammar);
  return semantics;
});
`), u;
        };
        function Lu(e, t) {
          if (!w.prototypeGrammar)
            return Ft.assert(e.indexOf("(") === -1), { name: e, formals: [] };
          let u = w.prototypeGrammar.match(e, t === "operation" ? "OperationSignature" : "AttributeSignature");
          if (u.failed())
            throw new Error(u.message);
          return w.prototypeGrammarSemantics(u).parse();
        }
        function Ei(e, t, u) {
          return function(...r) {
            let i = (this._semantics.operations[t] || this._semantics.attributes[t]).formals.map((s) => this.args[s]);
            if (!this.isIteration() && r.length === 1)
              return u.apply(r[0], i);
            throw fi.missingSemanticAction(this.ctorName, t, e, Fe);
          };
        }
        w.prototype.addOperationOrAttribute = function(e, t, u) {
          let r = e + "s", n = Lu(t, e), { name: i } = n, { formals: s } = n;
          this.assertNewName(i, e);
          let l = Ei(e, i, a), c = { _default: l };
          Object.keys(u).forEach((o) => {
            c[o] = u[o];
          });
          let D = e === "operation" ? new ie(i, s, c, l) : new ge(i, c, l);
          D.checkActionDict(this.grammar), this[r][i] = D;
          function a(...o) {
            let p = this._semantics[r][i];
            if (arguments.length !== p.formals.length)
              throw new Error("Invalid number of arguments passed to " + i + " " + e + " (expected " + p.formals.length + ", got " + arguments.length + ")");
            let A = /* @__PURE__ */ Object.create(null);
            for (let [B, re] of Object.entries(o)) {
              let me = p.formals[B];
              A[me] = re;
            }
            let f = this.args;
            this.args = A;
            let _ = p.execute(this._semantics, this);
            return this.args = f, _;
          }
          e === "operation" ? (this.Wrapper.prototype[i] = a, this.Wrapper.prototype[i].toString = function() {
            return "[" + i + " operation]";
          }) : (Object.defineProperty(this.Wrapper.prototype, i, { get: a, configurable: true }), Object.defineProperty(this.attributeKeys, i, { value: qu.uniqueId(i) }));
        };
        w.prototype.extendOperationOrAttribute = function(e, t, u) {
          let r = e + "s";
          if (Lu(t, "attribute"), !(this.super && t in this.super[r]))
            throw new Error("Cannot extend " + e + " '" + t + "': did not inherit an " + e + " with that name");
          if (gt(this[r], t))
            throw new Error("Cannot extend " + e + " '" + t + "' again");
          let n = this[r][t].formals, i = this[r][t].actionDict, s = Object.create(i);
          Object.keys(u).forEach((l) => {
            s[l] = u[l];
          }), this[r][t] = e === "operation" ? new ie(t, n, s) : new ge(t, s), this[r][t].checkActionDict(this.grammar);
        };
        w.prototype.assertNewName = function(e, t) {
          if (gt(Le.prototype, e))
            throw new Error("Cannot add " + t + " '" + e + "': that's a reserved name");
          if (e in this.operations)
            throw new Error("Cannot add " + t + " '" + e + "': an operation with that name already exists");
          if (e in this.attributes)
            throw new Error("Cannot add " + t + " '" + e + "': an attribute with that name already exists");
        };
        w.prototype.wrap = function(e, t, u) {
          let r = u || t;
          return e instanceof this.Wrapper ? e : new this.Wrapper(e, t, r);
        };
        w.createSemantics = function(e, t) {
          let u = new w(e, t !== void 0 ? t : w.BuiltInSemantics._getSemantics()), r = function(i) {
            if (!(i instanceof mi))
              throw new TypeError("Semantics expected a MatchResult, but got " + Ft.unexpectedObjToString(i));
            if (i.failed())
              throw new TypeError("cannot apply Semantics to " + i.toString());
            let s = i._cst;
            if (s.grammar !== e)
              throw new Error("Cannot use a MatchResult from grammar '" + s.grammar.name + "' with a semantics for '" + e.name + "'");
            let l = new hi(i.input);
            return u.wrap(s, l.interval(i._cstOffset, i.input.length));
          };
          return r.addOperation = function(n, i) {
            return u.addOperationOrAttribute("operation", n, i), r;
          }, r.extendOperation = function(n, i) {
            return u.extendOperationOrAttribute("operation", n, i), r;
          }, r.addAttribute = function(n, i) {
            return u.addOperationOrAttribute("attribute", n, i), r;
          }, r.extendAttribute = function(n, i) {
            return u.extendOperationOrAttribute("attribute", n, i), r;
          }, r._getActionDict = function(n) {
            let i = u.operations[n] || u.attributes[n];
            if (!i)
              throw new Error('"' + n + '" is not a valid operation or attribute name in this semantics for "' + e.name + '"');
            return i.actionDict;
          }, r._remove = function(n) {
            let i;
            return n in u.operations ? (i = u.operations[n], delete u.operations[n]) : n in u.attributes && (i = u.attributes[n], delete u.attributes[n]), delete u.Wrapper.prototype[n], i;
          }, r.getOperationNames = function() {
            return Object.keys(u.operations);
          }, r.getAttributeNames = function() {
            return Object.keys(u.attributes);
          }, r.getGrammar = function() {
            return u.grammar;
          }, r.toRecipe = function(n) {
            return u.toRecipe(n);
          }, r.toString = u.toString.bind(u), r._getSemantics = function() {
            return u;
          }, r;
        };
        var ie = class {
          constructor(t, u, r, n) {
            this.name = t, this.formals = u, this.actionDict = r, this.builtInDefault = n;
          }
          checkActionDict(t) {
            t._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
          }
          execute(t, u) {
            try {
              let { ctorName: r } = u._node, n = this.actionDict[r];
              return n ? (Fe.push([this, r]), n.apply(u, u._children())) : u.isNonterminal() && (n = this.actionDict._nonterminal, n) ? (Fe.push([this, "_nonterminal", r]), n.apply(u, u._children())) : (Fe.push([this, "default action", r]), this.actionDict._default.apply(u, u._children()));
            } finally {
              Fe.pop();
            }
          }
        };
        ie.prototype.typeName = "operation";
        var ge = class extends ie {
          constructor(t, u, r) {
            super(t, [], u, r);
          }
          execute(t, u) {
            let r = u._node, n = t.attributeKeys[this.name];
            return gt(r, n) || (r[n] = ie.prototype.execute.call(this, t, u)), r[n];
          }
        };
        ge.prototype.typeName = "attribute";
        Ru.exports = w;
      });
      var ye = h((Qs, Wu) => {
        "use strict";
        var di = Cu(), Ci = Nu(), Tu = yt(), ku = m(), ju = $(), K = Y(), Mu = ["_iter", "_terminal", "_nonterminal", "_default"];
        function Gu(e) {
          return Object.keys(e.rules).sort().map((t) => e.rules[t]);
        }
        var Fi = (e) => e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
        function se(e, t, u, r) {
          if (this.name = e, this.superGrammar = t, this.rules = u, r) {
            if (!(r in u))
              throw new Error("Invalid start rule: '" + r + "' is not a rule in grammar '" + e + "'");
            this.defaultStartRule = r;
          }
        }
        var Vu, Uu;
        se.initApplicationParser = function(e, t) {
          Vu = e, Uu = t;
        };
        se.prototype = { matcher() {
          return new Ci(this);
        }, isBuiltIn() {
          return this === se.ProtoBuiltInRules || this === se.BuiltInRules;
        }, equals(e) {
          if (this === e)
            return true;
          if (e == null || this.name !== e.name || this.defaultStartRule !== e.defaultStartRule || !(this.superGrammar === e.superGrammar || this.superGrammar.equals(e.superGrammar)))
            return false;
          let t = Gu(this), u = Gu(e);
          return t.length === u.length && t.every((r, n) => r.description === u[n].description && r.formals.join(",") === u[n].formals.join(",") && r.body.toString() === u[n].body.toString());
        }, match(e, t) {
          let u = this.matcher();
          return u.replaceInputRange(0, 0, e), u.match(t);
        }, trace(e, t) {
          let u = this.matcher();
          return u.replaceInputRange(0, 0, e), u.trace(t);
        }, createSemantics() {
          return Tu.createSemantics(this);
        }, extendSemantics(e) {
          return Tu.createSemantics(this, e._getSemantics());
        }, _checkTopDownActionDict(e, t, u) {
          let r = [];
          for (let n in u) {
            let i = u[n];
            if (!Mu.includes(n) && !(n in this.rules)) {
              r.push(`'${n}' is not a valid semantic action for '${this.name}'`);
              continue;
            }
            if (typeof i != "function") {
              r.push(`'${n}' must be a function in an action dictionary for '${this.name}'`);
              continue;
            }
            let l = i.length, c = this._topDownActionArity(n);
            if (l !== c) {
              let D;
              n === "_iter" || n === "_nonterminal" ? D = `it should use a rest parameter, e.g. \`${n}(...children) {}\`. NOTE: this is new in Ohm v16 \u2014 see https://ohmjs.org/d/ati for details.` : D = `expected ${c}, got ${l}`, r.push(`Semantic action '${n}' has the wrong arity: ${D}`);
            }
          }
          if (r.length > 0) {
            let n = r.map((s) => "- " + s), i = new Error([`Found errors in the action dictionary of the '${t}' ${e}:`, ...n].join(`
`));
            throw i.problems = r, i;
          }
        }, _topDownActionArity(e) {
          return Mu.includes(e) ? 0 : this.rules[e].body.getArity();
        }, _inheritsFrom(e) {
          let t = this.superGrammar;
          for (; t; ) {
            if (t.equals(e, true))
              return true;
            t = t.superGrammar;
          }
          return false;
        }, toRecipe(e = void 0) {
          let t = {};
          this.source && (t.source = this.source.contents);
          let u = null;
          this.defaultStartRule && (u = this.defaultStartRule);
          let r = {};
          Object.keys(this.rules).forEach((s) => {
            let l = this.rules[s], { body: c } = l, D = !this.superGrammar || !this.superGrammar.rules[s], a;
            D ? a = "define" : a = c instanceof K.Extend ? "extend" : "override";
            let o = {};
            if (l.source && this.source) {
              let f = l.source.relativeTo(this.source);
              o.sourceInterval = [f.startIdx, f.endIdx];
            }
            let p = D ? l.description : null, A = c.outputRecipe(l.formals, this.source);
            r[s] = [a, o, p, l.formals, A];
          });
          let n = "null";
          e ? n = e : this.superGrammar && !this.superGrammar.isBuiltIn() && (n = this.superGrammar.toRecipe());
          let i = [...["grammar", t, this.name].map(JSON.stringify), n, ...[u, r].map(JSON.stringify)];
          return Fi(`[${i.join(",")}]`);
        }, toOperationActionDictionaryTemplate() {
          return this._toOperationOrAttributeActionDictionaryTemplate();
        }, toAttributeActionDictionaryTemplate() {
          return this._toOperationOrAttributeActionDictionaryTemplate();
        }, _toOperationOrAttributeActionDictionaryTemplate() {
          let e = new ku.StringBuffer();
          e.append("{");
          let t = true;
          for (let u in this.rules) {
            let { body: r } = this.rules[u];
            t ? t = false : e.append(","), e.append(`
`), e.append("  "), this.addSemanticActionTemplate(u, r, e);
          }
          return e.append(`
}`), e.contents();
        }, addSemanticActionTemplate(e, t, u) {
          u.append(e), u.append(": function(");
          let r = this._topDownActionArity(e);
          u.append(ku.repeat("_", r).join(", ")), u.append(`) {
`), u.append("  }");
        }, parseApplication(e) {
          let t;
          if (e.indexOf("<") === -1)
            t = new K.Apply(e);
          else {
            let r = Vu.match(e, "Base_application");
            t = Uu(r, {});
          }
          if (!(t.ruleName in this.rules))
            throw ju.undeclaredRule(t.ruleName, this.name);
          let { formals: u } = this.rules[t.ruleName];
          if (u.length !== t.args.length) {
            let { source: r } = this.rules[t.ruleName];
            throw ju.wrongNumberOfParameters(t.ruleName, u.length, t.args.length, r);
          }
          return t;
        } };
        se.ProtoBuiltInRules = new se("ProtoBuiltInRules", void 0, { any: { body: K.any, formals: [], description: "any character", primitive: true }, end: { body: K.end, formals: [], description: "end of input", primitive: true }, caseInsensitive: { body: new di(new K.Param(0)), formals: ["str"], primitive: true }, lower: { body: new K.UnicodeChar("Ll"), formals: [], description: "a lowercase letter", primitive: true }, upper: { body: new K.UnicodeChar("Lu"), formals: [], description: "an uppercase letter", primitive: true }, unicodeLtmo: { body: new K.UnicodeChar("Ltmo"), formals: [], description: "a Unicode character in Lt, Lm, or Lo", primitive: true }, spaces: { body: new K.Star(new K.Apply("space")), formals: [] }, space: { body: new K.Range("\0", " "), formals: [], description: "a space" } });
        Wu.exports = se;
      });
      var Hu = h((Ys, Ku) => {
        "use strict";
        var vt = ye(), gi = qe(), zu = m(), te = $(), yi = Y();
        function U(e) {
          this.name = e;
        }
        U.prototype.sourceInterval = function(e, t) {
          return this.source.subInterval(e, t - e);
        };
        U.prototype.ensureSuperGrammar = function() {
          return this.superGrammar || this.withSuperGrammar(this.name === "BuiltInRules" ? vt.ProtoBuiltInRules : vt.BuiltInRules), this.superGrammar;
        };
        U.prototype.ensureSuperGrammarRuleForOverriding = function(e, t) {
          let u = this.ensureSuperGrammar().rules[e];
          if (!u)
            throw te.cannotOverrideUndeclaredRule(e, this.superGrammar.name, t);
          return u;
        };
        U.prototype.installOverriddenOrExtendedRule = function(e, t, u, r) {
          let n = zu.getDuplicates(t);
          if (n.length > 0)
            throw te.duplicateParameterNames(e, n, r);
          let i = this.ensureSuperGrammar().rules[e], s = i.formals, l = s ? s.length : 0;
          if (t.length !== l)
            throw te.wrongNumberOfParameters(e, l, t.length, r);
          return this.install(e, t, u, i.description, r);
        };
        U.prototype.install = function(e, t, u, r, n) {
          return this.rules[e] = { body: u.introduceParams(t), formals: t, description: r, source: n }, this;
        };
        U.prototype.withSuperGrammar = function(e) {
          if (this.superGrammar)
            throw new Error("the super grammar of a GrammarDecl cannot be set more than once");
          return this.superGrammar = e, this.rules = Object.create(e.rules), e.isBuiltIn() || (this.defaultStartRule = e.defaultStartRule), this;
        };
        U.prototype.withDefaultStartRule = function(e) {
          return this.defaultStartRule = e, this;
        };
        U.prototype.withSource = function(e) {
          return this.source = new gi(e).interval(0, e.length), this;
        };
        U.prototype.build = function() {
          let e = new vt(this.name, this.ensureSuperGrammar(), this.rules, this.defaultStartRule), t = [], u = false;
          return Object.keys(e.rules).forEach((r) => {
            let { body: n } = e.rules[r];
            try {
              n.assertChoicesHaveUniformArity(r);
            } catch (i) {
              t.push(i);
            }
            try {
              n.assertAllApplicationsAreValid(r, e);
            } catch (i) {
              t.push(i), u = true;
            }
          }), u || Object.keys(e.rules).forEach((r) => {
            let { body: n } = e.rules[r];
            try {
              n.assertIteratedExprsAreNotNullable(e, []);
            } catch (i) {
              t.push(i);
            }
          }), t.length > 0 && te.throwErrors(t), this.source && (e.source = this.source), e;
        };
        U.prototype.define = function(e, t, u, r, n) {
          if (this.ensureSuperGrammar(), this.superGrammar.rules[e])
            throw te.duplicateRuleDeclaration(e, this.name, this.superGrammar.name, n);
          if (this.rules[e])
            throw te.duplicateRuleDeclaration(e, this.name, this.name, n);
          let i = zu.getDuplicates(t);
          if (i.length > 0)
            throw te.duplicateParameterNames(e, i, n);
          return this.install(e, t, u, r, n);
        };
        U.prototype.override = function(e, t, u, r, n) {
          return this.ensureSuperGrammarRuleForOverriding(e, n), this.installOverriddenOrExtendedRule(e, t, u, n), this;
        };
        U.prototype.extend = function(e, t, u, r, n) {
          if (!this.ensureSuperGrammar().rules[e])
            throw te.cannotExtendUndeclaredRule(e, this.superGrammar.name, n);
          let s = new yi.Extend(this.superGrammar, e, u);
          return s.source = u.source, this.installOverriddenOrExtendedRule(e, t, s, n), this;
        };
        Ku.exports = U;
      });
      var Bt = h((Xs, Zu) => {
        "use strict";
        var vi = ye(), $u = Hu(), E = Y();
        function Ju() {
        }
        Ju.prototype = { currentDecl: null, currentRuleName: null, newGrammar(e) {
          return new $u(e);
        }, grammar(e, t, u, r, n) {
          let i = new $u(t);
          return u && i.withSuperGrammar(u instanceof vi ? u : this.fromRecipe(u)), r && i.withDefaultStartRule(r), e && e.source && i.withSource(e.source), this.currentDecl = i, Object.keys(n).forEach((s) => {
            this.currentRuleName = s;
            let l = n[s], c = l[0], D = l[1], a = l[2], o = l[3], p = this.fromRecipe(l[4]), A;
            i.source && D && D.sourceInterval && (A = i.source.subInterval(D.sourceInterval[0], D.sourceInterval[1] - D.sourceInterval[0])), i[c](s, o, p, a, A);
          }), this.currentRuleName = this.currentDecl = null, i.build();
        }, terminal(e) {
          return new E.Terminal(e);
        }, range(e, t) {
          return new E.Range(e, t);
        }, param(e) {
          return new E.Param(e);
        }, alt(...e) {
          let t = [];
          for (let u of e)
            u instanceof E.PExpr || (u = this.fromRecipe(u)), u instanceof E.Alt ? t = t.concat(u.terms) : t.push(u);
          return t.length === 1 ? t[0] : new E.Alt(t);
        }, seq(...e) {
          let t = [];
          for (let u of e)
            u instanceof E.PExpr || (u = this.fromRecipe(u)), u instanceof E.Seq ? t = t.concat(u.factors) : t.push(u);
          return t.length === 1 ? t[0] : new E.Seq(t);
        }, star(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Star(e);
        }, plus(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Plus(e);
        }, opt(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Opt(e);
        }, not(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Not(e);
        }, la(e) {
          return this.lookahead(e);
        }, lookahead(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Lookahead(e);
        }, lex(e) {
          return e instanceof E.PExpr || (e = this.fromRecipe(e)), new E.Lex(e);
        }, app(e, t) {
          return t && t.length > 0 && (t = t.map(function(u) {
            return u instanceof E.PExpr ? u : this.fromRecipe(u);
          }, this)), new E.Apply(e, t);
        }, splice(e, t) {
          return new E.Splice(this.currentDecl.superGrammar, this.currentRuleName, e.map((u) => this.fromRecipe(u)), t.map((u) => this.fromRecipe(u)));
        }, fromRecipe(e) {
          let t = e[0] === "grammar" ? e.slice(1) : e.slice(2), u = this[e[0]](...t), r = e[1];
          return r && r.sourceInterval && this.currentDecl && u.withSource(this.currentDecl.sourceInterval(...r.sourceInterval)), u;
        } };
        Zu.exports = Ju;
      });
      var Qu = h((eo, Bi) => {
        Bi.exports = { name: "ohm-js", version: "16.6.0", description: "An object-oriented language for parsing and pattern matching", repository: "https://github.com/harc/ohm", keywords: ["parser", "compiler", "pattern matching", "pattern-matching", "ometa", "ometa/js", "ometa-js", "ometajs", "rapid", "prototyping"], homepage: "https://ohmjs.org", bugs: "https://github.com/harc/ohm/issues", main: "index.js", module: "dist/ohm.esm.js", files: ["src", "dist", "extras", "third_party", "index.d.ts"], types: "index.d.ts", scripts: { prebootstrap: "bash scripts/prebootstrap", bootstrap: "bash scripts/bootstrap --test || (echo 'Bootstrap failed.' && mv -v dist/ohm-grammar.js.old dist/ohm-grammar.js && mv -v dist/built-in-rules.js.old dist/built-in-rules.js && mv -v dist/operations-and-attributes.js.old dist/operations-and-attributes.js)", build: "yarn build-debug && webpack --mode=production", "build-debug": "webpack --mode=development && yarn build-esm && node scripts/generate-types.mjs", "build-esm": "rollup -c rollup.config.mjs", clean: "rm -f dist/ohm.js dist/ohm.min.js", lint: "eslint . --ignore-path ../.eslintignore", format: "prettier . --write --ignore-path ../.prettierignore --config ../.prettierrc && eslint . --ignore-path ../.eslintignore --fix", test: "ava && ava --config ava-ts.config.js test/test-typings.ts", "test-watch": "ava --watch", "pre-commit": "yarn run lint && yarn run build && yarn run test", prepublishOnly: "bash scripts/prepublishOnly", prepack: "cp ../../README.md . && yarn build", postpack: "rm README.md", postpublish: "echo '\u{1F449}  Now go to https://github.com/harc/ohm/releases and create a release.'", "unsafe-bootstrap": "bash scripts/bootstrap", "update-contributors": "bash scripts/update-contributors", watch: "webpack --mode=development --watch" }, license: "MIT", author: "Alex Warth <alexwarth@gmail.com> (http://tinlizzie.org/~awarth)", contributors: ["Patrick Dubroy <pdubroy@gmail.com>", "Meixian Li <lmeixian@gmail.com>", "Marko R\xF6der <m.roeder@photon-software.de>", "Tony Garnock-Jones <tonygarnockjones@gmail.com>", "Saketh Kasibatla <sake.kasi@gmail.com>", "Lionel Landwerlin <llandwerlin@gmail.com>", "Jason Merrill <jwmerrill@gmail.com>", "Ray Toal <rtoal@lmu.edu>", "Yoshiki Ohshima <Yoshiki.Ohshima@acm.org>", "megabuz <3299889+megabuz@users.noreply.github.com>", "Jonathan Edwards <JonathanMEdwards@gmail.com>", "Milan Lajto\u0161 <milan.lajtos@me.com>", "Neil Jewers <njjewers@uwaterloo.ca>", "stagas <gstagas@gmail.com>", "AngryPowman <angrypowman@qq.com>", "Arthur Carabott <arthurc@gmail.com>", "Casey Olson <casey.m.olson@gmail.com>", "Daniel Tomlinson <DanielTomlinson@me.com>", "Ian Harris <ian@fofgof.xyz>", "Justin Chase <justin.m.chase@gmail.com>", "Leslie Ying <acetophore@users.noreply.github.com>", "Luca Guzzon <luca.guzzon@gmail.com>", "Mike Niebling <(none)>", "Patrick Dubroy <patrick@sourcegraph.com>", "Pierre Donias <pierre.donias@gmail.com>", "Stan Rozenraukh <stan@stanistan.com>", "Stephan Seidt <stephan.seidt@gmail.com>", "Steve Phillips <steve@tryingtobeawesome.com>", "Szymon Kaliski <kaliskiszymon@gmail.com>", "Thomas Nyberg <tomnyberg@gmail.com>", "Vse Mozhet Byt <vsemozhetbyt@gmail.com>", "Wil Chung <10446+iamwilhelm@users.noreply.github.com>", "Zachary Sakowitz <zsakowitz@gmail.com>", "abego <ub@abego-software.de>", "acslk <d_vd415@hotmail.com>", "codeZeilen <codeZeilen@users.noreply.github.com>", "kassadin <kassadin@foxmail.com>", "owch <bowenrainyday@gmail.com>", "sfinnie <scott.finnie@gmail.com>"], dependencies: {}, devDependencies: { "@ohm-js/cli": "^1.0.0", "@rollup/plugin-commonjs": "^21.0.1", "@rollup/plugin-json": "^4.1.0", "@rollup/plugin-node-resolve": "^13.1.3", ava: "^3.15.0", "ava-spec": "^1.1.1", dedent: "^0.7.0", eslint: "^7.9.0", "eslint-config-google": "^0.14.0", "eslint-plugin-ava": "^11.0.0", "eslint-plugin-camelcase-ohm": "^0.2.1", "eslint-plugin-no-extension-in-require": "^0.2.0", husky: "^4.2.5", jsdom: "^9.9.1", json: "^9.0.6", markscript: "^0.5.0", "node-static": "^0.7.11", "ohm-grammar-ecmascript": "^1.0.0", rollup: "^2.63.0", "ts-loader": "^8.0.4", "ts-node": "^9.0.0", typescript: "^4.0.3", "walk-sync": "^2.2.0", webpack: "^4.44.2", "webpack-cli": "^3.3.12" }, engines: { node: ">=0.12.1" } };
      });
      var Xu = h((to, Yu) => {
        "use strict";
        Yu.exports = typeof __GLOBAL_OHM_VERSION__ == "string" ? __GLOBAL_OHM_VERSION__ : Qu().version;
      });
      var ve = h((tr) => {
        "use strict";
        var er = Bt();
        function Ii(e) {
          return typeof e == "function" ? e.call(new er()) : (typeof e == "string" && (e = JSON.parse(e)), new er().fromRecipe(e));
        }
        tr.makeRecipe = Ii;
      });
      var rr = h((ro, ur) => {
        var { makeRecipe: xi } = ve();
        ur.exports = xi(["grammar", { source: `BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}` }, "BuiltInRules", null, null, { alnum: ["define", { sourceInterval: [18, 78] }, "an alpha-numeric character", [], ["alt", { sourceInterval: [60, 78] }, ["app", { sourceInterval: [60, 66] }, "letter", []], ["app", { sourceInterval: [73, 78] }, "digit", []]]], letter: ["define", { sourceInterval: [82, 142] }, "a letter", [], ["alt", { sourceInterval: [107, 142] }, ["app", { sourceInterval: [107, 112] }, "lower", []], ["app", { sourceInterval: [119, 124] }, "upper", []], ["app", { sourceInterval: [131, 142] }, "unicodeLtmo", []]]], digit: ["define", { sourceInterval: [146, 177] }, "a digit", [], ["range", { sourceInterval: [169, 177] }, "0", "9"]], hexDigit: ["define", { sourceInterval: [181, 254] }, "a hexadecimal digit", [], ["alt", { sourceInterval: [219, 254] }, ["app", { sourceInterval: [219, 224] }, "digit", []], ["range", { sourceInterval: [231, 239] }, "a", "f"], ["range", { sourceInterval: [246, 254] }, "A", "F"]]], ListOf: ["define", { sourceInterval: [258, 336] }, null, ["elem", "sep"], ["alt", { sourceInterval: [282, 336] }, ["app", { sourceInterval: [282, 307] }, "NonemptyListOf", [["param", { sourceInterval: [297, 301] }, 0], ["param", { sourceInterval: [303, 306] }, 1]]], ["app", { sourceInterval: [314, 336] }, "EmptyListOf", [["param", { sourceInterval: [326, 330] }, 0], ["param", { sourceInterval: [332, 335] }, 1]]]]], NonemptyListOf: ["define", { sourceInterval: [340, 388] }, null, ["elem", "sep"], ["seq", { sourceInterval: [372, 388] }, ["param", { sourceInterval: [372, 376] }, 0], ["star", { sourceInterval: [377, 388] }, ["seq", { sourceInterval: [378, 386] }, ["param", { sourceInterval: [378, 381] }, 1], ["param", { sourceInterval: [382, 386] }, 0]]]]], EmptyListOf: ["define", { sourceInterval: [392, 434] }, null, ["elem", "sep"], ["seq", { sourceInterval: [438, 438] }]], listOf: ["define", { sourceInterval: [438, 516] }, null, ["elem", "sep"], ["alt", { sourceInterval: [462, 516] }, ["app", { sourceInterval: [462, 487] }, "nonemptyListOf", [["param", { sourceInterval: [477, 481] }, 0], ["param", { sourceInterval: [483, 486] }, 1]]], ["app", { sourceInterval: [494, 516] }, "emptyListOf", [["param", { sourceInterval: [506, 510] }, 0], ["param", { sourceInterval: [512, 515] }, 1]]]]], nonemptyListOf: ["define", { sourceInterval: [520, 568] }, null, ["elem", "sep"], ["seq", { sourceInterval: [552, 568] }, ["param", { sourceInterval: [552, 556] }, 0], ["star", { sourceInterval: [557, 568] }, ["seq", { sourceInterval: [558, 566] }, ["param", { sourceInterval: [558, 561] }, 1], ["param", { sourceInterval: [562, 566] }, 0]]]]], emptyListOf: ["define", { sourceInterval: [572, 682] }, null, ["elem", "sep"], ["seq", { sourceInterval: [685, 685] }]], applySyntactic: ["define", { sourceInterval: [685, 710] }, null, ["app"], ["param", { sourceInterval: [707, 710] }, 0]] }]);
      });
      var nr = h(() => {
        "use strict";
        var Si = ye();
        Si.BuiltInRules = rr();
      });
      var sr = h((so, ir) => {
        var { makeRecipe: bi } = ve();
        ir.exports = bi(["grammar", { source: `OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}` }, "OperationsAndAttributes", null, "AttributeSignature", { AttributeSignature: ["define", { sourceInterval: [29, 58] }, null, [], ["app", { sourceInterval: [54, 58] }, "name", []]], OperationSignature: ["define", { sourceInterval: [62, 100] }, null, [], ["seq", { sourceInterval: [87, 100] }, ["app", { sourceInterval: [87, 91] }, "name", []], ["opt", { sourceInterval: [92, 100] }, ["app", { sourceInterval: [92, 99] }, "Formals", []]]]], Formals: ["define", { sourceInterval: [104, 143] }, null, [], ["seq", { sourceInterval: [118, 143] }, ["terminal", { sourceInterval: [118, 121] }, "("], ["app", { sourceInterval: [122, 139] }, "ListOf", [["app", { sourceInterval: [129, 133] }, "name", []], ["terminal", { sourceInterval: [135, 138] }, ","]]], ["terminal", { sourceInterval: [140, 143] }, ")"]]], name: ["define", { sourceInterval: [147, 187] }, "a name", [], ["seq", { sourceInterval: [168, 187] }, ["app", { sourceInterval: [168, 177] }, "nameFirst", []], ["star", { sourceInterval: [178, 187] }, ["app", { sourceInterval: [178, 186] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [191, 223] }, null, [], ["alt", { sourceInterval: [207, 223] }, ["terminal", { sourceInterval: [207, 210] }, "_"], ["app", { sourceInterval: [217, 223] }, "letter", []]]], nameRest: ["define", { sourceInterval: [227, 257] }, null, [], ["alt", { sourceInterval: [242, 257] }, ["terminal", { sourceInterval: [242, 245] }, "_"], ["app", { sourceInterval: [252, 257] }, "alnum", []]]] }]);
      });
      var or = h(() => {
        "use strict";
        var Re = yt(), _i = Z();
        _i.awaitBuiltInRules((e) => {
          let t = sr();
          wi(e), Pi(t);
        });
        function wi(e) {
          let t = { empty() {
            return this.iteration();
          }, nonEmpty(u, r, n) {
            return this.iteration([u].concat(n.children));
          } };
          Re.BuiltInSemantics = Re.createSemantics(e, null).addOperation("asIteration", { emptyListOf: t.empty, nonemptyListOf: t.nonEmpty, EmptyListOf: t.empty, NonemptyListOf: t.nonEmpty });
        }
        function Pi(e) {
          Re.prototypeGrammarSemantics = e.createSemantics().addOperation("parse", { AttributeSignature(t) {
            return { name: t.parse(), formals: [] };
          }, OperationSignature(t, u) {
            return { name: t.parse(), formals: u.children.map((r) => r.parse())[0] || [] };
          }, Formals(t, u, r) {
            return u.asIteration().children.map((n) => n.parse());
          }, name(t, u) {
            return this.sourceString;
          } }), Re.prototypeGrammar = e;
        }
      });
      var ar = h(() => {
        "use strict";
        nr();
        or();
      });
      var lr = h((po, cr) => {
        var { makeRecipe: Oi } = ve();
        cr.exports = Oi(["grammar", { source: `Ohm {

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
}` }, "Ohm", null, "Grammars", { Grammars: ["define", { sourceInterval: [9, 32] }, null, [], ["star", { sourceInterval: [24, 32] }, ["app", { sourceInterval: [24, 31] }, "Grammar", []]]], Grammar: ["define", { sourceInterval: [36, 83] }, null, [], ["seq", { sourceInterval: [50, 83] }, ["app", { sourceInterval: [50, 55] }, "ident", []], ["opt", { sourceInterval: [56, 69] }, ["app", { sourceInterval: [56, 68] }, "SuperGrammar", []]], ["terminal", { sourceInterval: [70, 73] }, "{"], ["star", { sourceInterval: [74, 79] }, ["app", { sourceInterval: [74, 78] }, "Rule", []]], ["terminal", { sourceInterval: [80, 83] }, "}"]]], SuperGrammar: ["define", { sourceInterval: [87, 116] }, null, [], ["seq", { sourceInterval: [106, 116] }, ["terminal", { sourceInterval: [106, 110] }, "<:"], ["app", { sourceInterval: [111, 116] }, "ident", []]]], Rule_define: ["define", { sourceInterval: [131, 181] }, null, [], ["seq", { sourceInterval: [131, 170] }, ["app", { sourceInterval: [131, 136] }, "ident", []], ["opt", { sourceInterval: [137, 145] }, ["app", { sourceInterval: [137, 144] }, "Formals", []]], ["opt", { sourceInterval: [146, 156] }, ["app", { sourceInterval: [146, 155] }, "ruleDescr", []]], ["terminal", { sourceInterval: [157, 160] }, "="], ["app", { sourceInterval: [162, 170] }, "RuleBody", []]]], Rule_override: ["define", { sourceInterval: [188, 248] }, null, [], ["seq", { sourceInterval: [188, 235] }, ["app", { sourceInterval: [188, 193] }, "ident", []], ["opt", { sourceInterval: [194, 202] }, ["app", { sourceInterval: [194, 201] }, "Formals", []]], ["terminal", { sourceInterval: [214, 218] }, ":="], ["app", { sourceInterval: [219, 235] }, "OverrideRuleBody", []]]], Rule_extend: ["define", { sourceInterval: [255, 305] }, null, [], ["seq", { sourceInterval: [255, 294] }, ["app", { sourceInterval: [255, 260] }, "ident", []], ["opt", { sourceInterval: [261, 269] }, ["app", { sourceInterval: [261, 268] }, "Formals", []]], ["terminal", { sourceInterval: [281, 285] }, "+="], ["app", { sourceInterval: [286, 294] }, "RuleBody", []]]], Rule: ["define", { sourceInterval: [120, 305] }, null, [], ["alt", { sourceInterval: [131, 305] }, ["app", { sourceInterval: [131, 170] }, "Rule_define", []], ["app", { sourceInterval: [188, 235] }, "Rule_override", []], ["app", { sourceInterval: [255, 294] }, "Rule_extend", []]]], RuleBody: ["define", { sourceInterval: [309, 362] }, null, [], ["seq", { sourceInterval: [324, 362] }, ["opt", { sourceInterval: [324, 328] }, ["terminal", { sourceInterval: [324, 327] }, "|"]], ["app", { sourceInterval: [329, 362] }, "NonemptyListOf", [["app", { sourceInterval: [344, 356] }, "TopLevelTerm", []], ["terminal", { sourceInterval: [358, 361] }, "|"]]]]], TopLevelTerm_inline: ["define", { sourceInterval: [385, 408] }, null, [], ["seq", { sourceInterval: [385, 397] }, ["app", { sourceInterval: [385, 388] }, "Seq", []], ["app", { sourceInterval: [389, 397] }, "caseName", []]]], TopLevelTerm: ["define", { sourceInterval: [366, 418] }, null, [], ["alt", { sourceInterval: [385, 418] }, ["app", { sourceInterval: [385, 397] }, "TopLevelTerm_inline", []], ["app", { sourceInterval: [415, 418] }, "Seq", []]]], OverrideRuleBody: ["define", { sourceInterval: [422, 491] }, null, [], ["seq", { sourceInterval: [445, 491] }, ["opt", { sourceInterval: [445, 449] }, ["terminal", { sourceInterval: [445, 448] }, "|"]], ["app", { sourceInterval: [450, 491] }, "NonemptyListOf", [["app", { sourceInterval: [465, 485] }, "OverrideTopLevelTerm", []], ["terminal", { sourceInterval: [487, 490] }, "|"]]]]], OverrideTopLevelTerm_superSplice: ["define", { sourceInterval: [522, 543] }, null, [], ["terminal", { sourceInterval: [522, 527] }, "..."]], OverrideTopLevelTerm: ["define", { sourceInterval: [495, 562] }, null, [], ["alt", { sourceInterval: [522, 562] }, ["app", { sourceInterval: [522, 527] }, "OverrideTopLevelTerm_superSplice", []], ["app", { sourceInterval: [550, 562] }, "TopLevelTerm", []]]], Formals: ["define", { sourceInterval: [566, 606] }, null, [], ["seq", { sourceInterval: [580, 606] }, ["terminal", { sourceInterval: [580, 583] }, "<"], ["app", { sourceInterval: [584, 602] }, "ListOf", [["app", { sourceInterval: [591, 596] }, "ident", []], ["terminal", { sourceInterval: [598, 601] }, ","]]], ["terminal", { sourceInterval: [603, 606] }, ">"]]], Params: ["define", { sourceInterval: [610, 647] }, null, [], ["seq", { sourceInterval: [623, 647] }, ["terminal", { sourceInterval: [623, 626] }, "<"], ["app", { sourceInterval: [627, 643] }, "ListOf", [["app", { sourceInterval: [634, 637] }, "Seq", []], ["terminal", { sourceInterval: [639, 642] }, ","]]], ["terminal", { sourceInterval: [644, 647] }, ">"]]], Alt: ["define", { sourceInterval: [651, 685] }, null, [], ["app", { sourceInterval: [661, 685] }, "NonemptyListOf", [["app", { sourceInterval: [676, 679] }, "Seq", []], ["terminal", { sourceInterval: [681, 684] }, "|"]]]], Seq: ["define", { sourceInterval: [689, 704] }, null, [], ["star", { sourceInterval: [699, 704] }, ["app", { sourceInterval: [699, 703] }, "Iter", []]]], Iter_star: ["define", { sourceInterval: [719, 736] }, null, [], ["seq", { sourceInterval: [719, 727] }, ["app", { sourceInterval: [719, 723] }, "Pred", []], ["terminal", { sourceInterval: [724, 727] }, "*"]]], Iter_plus: ["define", { sourceInterval: [743, 760] }, null, [], ["seq", { sourceInterval: [743, 751] }, ["app", { sourceInterval: [743, 747] }, "Pred", []], ["terminal", { sourceInterval: [748, 751] }, "+"]]], Iter_opt: ["define", { sourceInterval: [767, 783] }, null, [], ["seq", { sourceInterval: [767, 775] }, ["app", { sourceInterval: [767, 771] }, "Pred", []], ["terminal", { sourceInterval: [772, 775] }, "?"]]], Iter: ["define", { sourceInterval: [708, 794] }, null, [], ["alt", { sourceInterval: [719, 794] }, ["app", { sourceInterval: [719, 727] }, "Iter_star", []], ["app", { sourceInterval: [743, 751] }, "Iter_plus", []], ["app", { sourceInterval: [767, 775] }, "Iter_opt", []], ["app", { sourceInterval: [790, 794] }, "Pred", []]]], Pred_not: ["define", { sourceInterval: [809, 824] }, null, [], ["seq", { sourceInterval: [809, 816] }, ["terminal", { sourceInterval: [809, 812] }, "~"], ["app", { sourceInterval: [813, 816] }, "Lex", []]]], Pred_lookahead: ["define", { sourceInterval: [831, 852] }, null, [], ["seq", { sourceInterval: [831, 838] }, ["terminal", { sourceInterval: [831, 834] }, "&"], ["app", { sourceInterval: [835, 838] }, "Lex", []]]], Pred: ["define", { sourceInterval: [798, 862] }, null, [], ["alt", { sourceInterval: [809, 862] }, ["app", { sourceInterval: [809, 816] }, "Pred_not", []], ["app", { sourceInterval: [831, 838] }, "Pred_lookahead", []], ["app", { sourceInterval: [859, 862] }, "Lex", []]]], Lex_lex: ["define", { sourceInterval: [876, 892] }, null, [], ["seq", { sourceInterval: [876, 884] }, ["terminal", { sourceInterval: [876, 879] }, "#"], ["app", { sourceInterval: [880, 884] }, "Base", []]]], Lex: ["define", { sourceInterval: [866, 903] }, null, [], ["alt", { sourceInterval: [876, 903] }, ["app", { sourceInterval: [876, 884] }, "Lex_lex", []], ["app", { sourceInterval: [899, 903] }, "Base", []]]], Base_application: ["define", { sourceInterval: [918, 979] }, null, [], ["seq", { sourceInterval: [918, 963] }, ["app", { sourceInterval: [918, 923] }, "ident", []], ["opt", { sourceInterval: [924, 931] }, ["app", { sourceInterval: [924, 930] }, "Params", []]], ["not", { sourceInterval: [932, 963] }, ["alt", { sourceInterval: [934, 962] }, ["seq", { sourceInterval: [934, 948] }, ["opt", { sourceInterval: [934, 944] }, ["app", { sourceInterval: [934, 943] }, "ruleDescr", []]], ["terminal", { sourceInterval: [945, 948] }, "="]], ["terminal", { sourceInterval: [951, 955] }, ":="], ["terminal", { sourceInterval: [958, 962] }, "+="]]]]], Base_range: ["define", { sourceInterval: [986, 1041] }, null, [], ["seq", { sourceInterval: [986, 1022] }, ["app", { sourceInterval: [986, 1001] }, "oneCharTerminal", []], ["terminal", { sourceInterval: [1002, 1006] }, ".."], ["app", { sourceInterval: [1007, 1022] }, "oneCharTerminal", []]]], Base_terminal: ["define", { sourceInterval: [1048, 1106] }, null, [], ["app", { sourceInterval: [1048, 1056] }, "terminal", []]], Base_paren: ["define", { sourceInterval: [1113, 1168] }, null, [], ["seq", { sourceInterval: [1113, 1124] }, ["terminal", { sourceInterval: [1113, 1116] }, "("], ["app", { sourceInterval: [1117, 1120] }, "Alt", []], ["terminal", { sourceInterval: [1121, 1124] }, ")"]]], Base: ["define", { sourceInterval: [907, 1168] }, null, [], ["alt", { sourceInterval: [918, 1168] }, ["app", { sourceInterval: [918, 963] }, "Base_application", []], ["app", { sourceInterval: [986, 1022] }, "Base_range", []], ["app", { sourceInterval: [1048, 1056] }, "Base_terminal", []], ["app", { sourceInterval: [1113, 1124] }, "Base_paren", []]]], ruleDescr: ["define", { sourceInterval: [1172, 1231] }, "a rule description", [], ["seq", { sourceInterval: [1210, 1231] }, ["terminal", { sourceInterval: [1210, 1213] }, "("], ["app", { sourceInterval: [1214, 1227] }, "ruleDescrText", []], ["terminal", { sourceInterval: [1228, 1231] }, ")"]]], ruleDescrText: ["define", { sourceInterval: [1235, 1266] }, null, [], ["star", { sourceInterval: [1255, 1266] }, ["seq", { sourceInterval: [1256, 1264] }, ["not", { sourceInterval: [1256, 1260] }, ["terminal", { sourceInterval: [1257, 1260] }, ")"]], ["app", { sourceInterval: [1261, 1264] }, "any", []]]]], caseName: ["define", { sourceInterval: [1270, 1338] }, null, [], ["seq", { sourceInterval: [1285, 1338] }, ["terminal", { sourceInterval: [1285, 1289] }, "--"], ["star", { sourceInterval: [1290, 1304] }, ["seq", { sourceInterval: [1291, 1302] }, ["not", { sourceInterval: [1291, 1296] }, ["terminal", { sourceInterval: [1292, 1296] }, `
`]], ["app", { sourceInterval: [1297, 1302] }, "space", []]]], ["app", { sourceInterval: [1305, 1309] }, "name", []], ["star", { sourceInterval: [1310, 1324] }, ["seq", { sourceInterval: [1311, 1322] }, ["not", { sourceInterval: [1311, 1316] }, ["terminal", { sourceInterval: [1312, 1316] }, `
`]], ["app", { sourceInterval: [1317, 1322] }, "space", []]]], ["alt", { sourceInterval: [1326, 1337] }, ["terminal", { sourceInterval: [1326, 1330] }, `
`], ["lookahead", { sourceInterval: [1333, 1337] }, ["terminal", { sourceInterval: [1334, 1337] }, "}"]]]]], name: ["define", { sourceInterval: [1342, 1382] }, "a name", [], ["seq", { sourceInterval: [1363, 1382] }, ["app", { sourceInterval: [1363, 1372] }, "nameFirst", []], ["star", { sourceInterval: [1373, 1382] }, ["app", { sourceInterval: [1373, 1381] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [1386, 1418] }, null, [], ["alt", { sourceInterval: [1402, 1418] }, ["terminal", { sourceInterval: [1402, 1405] }, "_"], ["app", { sourceInterval: [1412, 1418] }, "letter", []]]], nameRest: ["define", { sourceInterval: [1422, 1452] }, null, [], ["alt", { sourceInterval: [1437, 1452] }, ["terminal", { sourceInterval: [1437, 1440] }, "_"], ["app", { sourceInterval: [1447, 1452] }, "alnum", []]]], ident: ["define", { sourceInterval: [1456, 1489] }, "an identifier", [], ["app", { sourceInterval: [1485, 1489] }, "name", []]], terminal: ["define", { sourceInterval: [1493, 1531] }, null, [], ["seq", { sourceInterval: [1508, 1531] }, ["terminal", { sourceInterval: [1508, 1512] }, '"'], ["star", { sourceInterval: [1513, 1526] }, ["app", { sourceInterval: [1513, 1525] }, "terminalChar", []]], ["terminal", { sourceInterval: [1527, 1531] }, '"']]], oneCharTerminal: ["define", { sourceInterval: [1535, 1579] }, null, [], ["seq", { sourceInterval: [1557, 1579] }, ["terminal", { sourceInterval: [1557, 1561] }, '"'], ["app", { sourceInterval: [1562, 1574] }, "terminalChar", []], ["terminal", { sourceInterval: [1575, 1579] }, '"']]], terminalChar: ["define", { sourceInterval: [1583, 1660] }, null, [], ["alt", { sourceInterval: [1602, 1660] }, ["app", { sourceInterval: [1602, 1612] }, "escapeChar", []], ["seq", { sourceInterval: [1621, 1660] }, ["not", { sourceInterval: [1621, 1626] }, ["terminal", { sourceInterval: [1622, 1626] }, "\\"]], ["not", { sourceInterval: [1627, 1632] }, ["terminal", { sourceInterval: [1628, 1632] }, '"']], ["not", { sourceInterval: [1633, 1638] }, ["terminal", { sourceInterval: [1634, 1638] }, `
`]], ["range", { sourceInterval: [1639, 1660] }, "\0", "\u{10FFFF}"]]]], escapeChar_backslash: ["define", { sourceInterval: [1703, 1758] }, null, [], ["terminal", { sourceInterval: [1703, 1709] }, "\\\\"]], escapeChar_doubleQuote: ["define", { sourceInterval: [1765, 1822] }, null, [], ["terminal", { sourceInterval: [1765, 1771] }, '\\"']], escapeChar_singleQuote: ["define", { sourceInterval: [1829, 1886] }, null, [], ["terminal", { sourceInterval: [1829, 1835] }, "\\'"]], escapeChar_backspace: ["define", { sourceInterval: [1893, 1948] }, null, [], ["terminal", { sourceInterval: [1893, 1898] }, "\\b"]], escapeChar_lineFeed: ["define", { sourceInterval: [1955, 2009] }, null, [], ["terminal", { sourceInterval: [1955, 1960] }, "\\n"]], escapeChar_carriageReturn: ["define", { sourceInterval: [2016, 2076] }, null, [], ["terminal", { sourceInterval: [2016, 2021] }, "\\r"]], escapeChar_tab: ["define", { sourceInterval: [2083, 2132] }, null, [], ["terminal", { sourceInterval: [2083, 2088] }, "\\t"]], escapeChar_unicodeCodePoint: ["define", { sourceInterval: [2139, 2243] }, null, [], ["seq", { sourceInterval: [2139, 2221] }, ["terminal", { sourceInterval: [2139, 2145] }, "\\u{"], ["app", { sourceInterval: [2146, 2154] }, "hexDigit", []], ["opt", { sourceInterval: [2155, 2164] }, ["app", { sourceInterval: [2155, 2163] }, "hexDigit", []]], ["opt", { sourceInterval: [2165, 2174] }, ["app", { sourceInterval: [2165, 2173] }, "hexDigit", []]], ["opt", { sourceInterval: [2188, 2197] }, ["app", { sourceInterval: [2188, 2196] }, "hexDigit", []]], ["opt", { sourceInterval: [2198, 2207] }, ["app", { sourceInterval: [2198, 2206] }, "hexDigit", []]], ["opt", { sourceInterval: [2208, 2217] }, ["app", { sourceInterval: [2208, 2216] }, "hexDigit", []]], ["terminal", { sourceInterval: [2218, 2221] }, "}"]]], escapeChar_unicodeEscape: ["define", { sourceInterval: [2250, 2309] }, null, [], ["seq", { sourceInterval: [2250, 2291] }, ["terminal", { sourceInterval: [2250, 2255] }, "\\u"], ["app", { sourceInterval: [2256, 2264] }, "hexDigit", []], ["app", { sourceInterval: [2265, 2273] }, "hexDigit", []], ["app", { sourceInterval: [2274, 2282] }, "hexDigit", []], ["app", { sourceInterval: [2283, 2291] }, "hexDigit", []]]], escapeChar_hexEscape: ["define", { sourceInterval: [2316, 2371] }, null, [], ["seq", { sourceInterval: [2316, 2339] }, ["terminal", { sourceInterval: [2316, 2321] }, "\\x"], ["app", { sourceInterval: [2322, 2330] }, "hexDigit", []], ["app", { sourceInterval: [2331, 2339] }, "hexDigit", []]]], escapeChar: ["define", { sourceInterval: [1664, 2371] }, "an escape sequence", [], ["alt", { sourceInterval: [1703, 2371] }, ["app", { sourceInterval: [1703, 1709] }, "escapeChar_backslash", []], ["app", { sourceInterval: [1765, 1771] }, "escapeChar_doubleQuote", []], ["app", { sourceInterval: [1829, 1835] }, "escapeChar_singleQuote", []], ["app", { sourceInterval: [1893, 1898] }, "escapeChar_backspace", []], ["app", { sourceInterval: [1955, 1960] }, "escapeChar_lineFeed", []], ["app", { sourceInterval: [2016, 2021] }, "escapeChar_carriageReturn", []], ["app", { sourceInterval: [2083, 2088] }, "escapeChar_tab", []], ["app", { sourceInterval: [2139, 2221] }, "escapeChar_unicodeCodePoint", []], ["app", { sourceInterval: [2250, 2291] }, "escapeChar_unicodeEscape", []], ["app", { sourceInterval: [2316, 2339] }, "escapeChar_hexEscape", []]]], space: ["extend", { sourceInterval: [2375, 2394] }, null, [], ["app", { sourceInterval: [2387, 2394] }, "comment", []]], comment_singleLine: ["define", { sourceInterval: [2412, 2458] }, null, [], ["seq", { sourceInterval: [2412, 2443] }, ["terminal", { sourceInterval: [2412, 2416] }, "//"], ["star", { sourceInterval: [2417, 2429] }, ["seq", { sourceInterval: [2418, 2427] }, ["not", { sourceInterval: [2418, 2423] }, ["terminal", { sourceInterval: [2419, 2423] }, `
`]], ["app", { sourceInterval: [2424, 2427] }, "any", []]]], ["lookahead", { sourceInterval: [2430, 2443] }, ["alt", { sourceInterval: [2432, 2442] }, ["terminal", { sourceInterval: [2432, 2436] }, `
`], ["app", { sourceInterval: [2439, 2442] }, "end", []]]]]], comment_multiLine: ["define", { sourceInterval: [2465, 2501] }, null, [], ["seq", { sourceInterval: [2465, 2487] }, ["terminal", { sourceInterval: [2465, 2469] }, "/*"], ["star", { sourceInterval: [2470, 2482] }, ["seq", { sourceInterval: [2471, 2480] }, ["not", { sourceInterval: [2471, 2476] }, ["terminal", { sourceInterval: [2472, 2476] }, "*/"]], ["app", { sourceInterval: [2477, 2480] }, "any", []]]], ["terminal", { sourceInterval: [2483, 2487] }, "*/"]]], comment: ["define", { sourceInterval: [2398, 2501] }, null, [], ["alt", { sourceInterval: [2412, 2501] }, ["app", { sourceInterval: [2412, 2443] }, "comment_singleLine", []], ["app", { sourceInterval: [2465, 2487] }, "comment_multiLine", []]]], tokens: ["define", { sourceInterval: [2505, 2520] }, null, [], ["star", { sourceInterval: [2514, 2520] }, ["app", { sourceInterval: [2514, 2519] }, "token", []]]], token: ["define", { sourceInterval: [2524, 2600] }, null, [], ["alt", { sourceInterval: [2532, 2600] }, ["app", { sourceInterval: [2532, 2540] }, "caseName", []], ["app", { sourceInterval: [2543, 2550] }, "comment", []], ["app", { sourceInterval: [2553, 2558] }, "ident", []], ["app", { sourceInterval: [2561, 2569] }, "operator", []], ["app", { sourceInterval: [2572, 2583] }, "punctuation", []], ["app", { sourceInterval: [2586, 2594] }, "terminal", []], ["app", { sourceInterval: [2597, 2600] }, "any", []]]], operator: ["define", { sourceInterval: [2604, 2669] }, null, [], ["alt", { sourceInterval: [2615, 2669] }, ["terminal", { sourceInterval: [2615, 2619] }, "<:"], ["terminal", { sourceInterval: [2622, 2625] }, "="], ["terminal", { sourceInterval: [2628, 2632] }, ":="], ["terminal", { sourceInterval: [2635, 2639] }, "+="], ["terminal", { sourceInterval: [2642, 2645] }, "*"], ["terminal", { sourceInterval: [2648, 2651] }, "+"], ["terminal", { sourceInterval: [2654, 2657] }, "?"], ["terminal", { sourceInterval: [2660, 2663] }, "~"], ["terminal", { sourceInterval: [2666, 2669] }, "&"]]], punctuation: ["define", { sourceInterval: [2673, 2709] }, null, [], ["alt", { sourceInterval: [2687, 2709] }, ["terminal", { sourceInterval: [2687, 2690] }, "<"], ["terminal", { sourceInterval: [2693, 2696] }, ">"], ["terminal", { sourceInterval: [2699, 2702] }, ","], ["terminal", { sourceInterval: [2705, 2709] }, "--"]]] }]);
      });
      var hr = h((Do, ke) => {
        "use strict";
        var Ni = Bt(), St = ye(), xt = ot(), pr = m(), Be = $(), bt = Y(), _t = Z(), qi = Xu(), { makeRecipe: Li } = ve(), Te, It = Object.create(bt.PExpr.prototype), Ri = (e) => !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
        function wt(e, t, u) {
          let r = new Ni(), n, i, s, l = false;
          return (u || Te).createSemantics().addOperation("visit", { Grammars(a) {
            return a.children.map((o) => o.visit());
          }, Grammar(a, o, p, A, f) {
            let _ = a.visit();
            n = r.newGrammar(_, t), o.child(0) && o.child(0).visit(), A.children.map((re) => re.visit());
            let B = n.build();
            if (B.source = this.source.trimmed(), _ in t)
              throw Be.duplicateGrammarDeclaration(B, t);
            return t[_] = B, B;
          }, SuperGrammar(a, o) {
            let p = o.visit();
            if (p === "null")
              n.withSuperGrammar(null);
            else {
              if (!t || !(p in t))
                throw Be.undeclaredGrammar(p, t, o.source);
              n.withSuperGrammar(t[p]);
            }
          }, Rule_define(a, o, p, A, f) {
            i = a.visit(), s = o.children.map((me) => me.visit())[0] || [], !n.defaultStartRule && n.ensureSuperGrammar() !== St.ProtoBuiltInRules && n.withDefaultStartRule(i);
            let _ = f.visit(), B = p.children.map((me) => me.visit())[0], re = this.source.trimmed();
            return n.define(i, s, _, B, re);
          }, Rule_override(a, o, p, A) {
            i = a.visit(), s = o.children.map((B) => B.visit())[0] || [];
            let f = this.source.trimmed();
            n.ensureSuperGrammarRuleForOverriding(i, f), l = true;
            let _ = A.visit();
            return l = false, n.override(i, s, _, null, f);
          }, Rule_extend(a, o, p, A) {
            i = a.visit(), s = o.children.map((B) => B.visit())[0] || [];
            let f = A.visit(), _ = this.source.trimmed();
            return n.extend(i, s, f, null, _);
          }, RuleBody(a, o) {
            return r.alt(...o.visit()).withSource(this.source);
          }, OverrideRuleBody(a, o) {
            let p = o.visit(), A = p.indexOf(It);
            if (A >= 0) {
              let f = p.slice(0, A), _ = p.slice(A + 1);
              return _.forEach((B) => {
                if (B === It)
                  throw Be.multipleSuperSplices(B);
              }), new bt.Splice(n.superGrammar, i, f, _).withSource(this.source);
            } else
              return r.alt(...p).withSource(this.source);
          }, Formals(a, o, p) {
            return o.visit();
          }, Params(a, o, p) {
            return o.visit();
          }, Alt(a) {
            return r.alt(...a.visit()).withSource(this.source);
          }, TopLevelTerm_inline(a, o) {
            let p = i + "_" + o.visit(), A = a.visit(), f = this.source.trimmed(), _ = !(n.superGrammar && n.superGrammar.rules[p]);
            l && !_ ? n.override(p, s, A, null, f) : n.define(p, s, A, null, f);
            let B = s.map((re) => r.app(re));
            return r.app(p, B).withSource(A.source);
          }, OverrideTopLevelTerm_superSplice(a) {
            return It;
          }, Seq(a) {
            return r.seq(...a.children.map((o) => o.visit())).withSource(this.source);
          }, Iter_star(a, o) {
            return r.star(a.visit()).withSource(this.source);
          }, Iter_plus(a, o) {
            return r.plus(a.visit()).withSource(this.source);
          }, Iter_opt(a, o) {
            return r.opt(a.visit()).withSource(this.source);
          }, Pred_not(a, o) {
            return r.not(o.visit()).withSource(this.source);
          }, Pred_lookahead(a, o) {
            return r.lookahead(o.visit()).withSource(this.source);
          }, Lex_lex(a, o) {
            return r.lex(o.visit()).withSource(this.source);
          }, Base_application(a, o) {
            let p = o.children.map((A) => A.visit())[0] || [];
            return r.app(a.visit(), p).withSource(this.source);
          }, Base_range(a, o, p) {
            return r.range(a.visit(), p.visit()).withSource(this.source);
          }, Base_terminal(a) {
            return r.terminal(a.visit()).withSource(this.source);
          }, Base_paren(a, o, p) {
            return o.visit();
          }, ruleDescr(a, o, p) {
            return o.visit();
          }, ruleDescrText(a) {
            return this.sourceString.trim();
          }, caseName(a, o, p, A, f) {
            return p.visit();
          }, name(a, o) {
            return this.sourceString;
          }, nameFirst(a) {
          }, nameRest(a) {
          }, terminal(a, o, p) {
            return o.children.map((A) => A.visit()).join("");
          }, oneCharTerminal(a, o, p) {
            return o.visit();
          }, escapeChar(a) {
            try {
              return pr.unescapeCodePoint(this.sourceString);
            } catch (o) {
              throw o instanceof RangeError && o.message.startsWith("Invalid code point ") ? Be.invalidCodePoint(a) : o;
            }
          }, NonemptyListOf(a, o, p) {
            return [a.visit()].concat(p.children.map((A) => A.visit()));
          }, EmptyListOf() {
            return [];
          }, _terminal() {
            return this.sourceString;
          } })(e).visit();
        }
        function Ti(e, t) {
          let u = Te.match(e, "Grammars");
          if (u.failed())
            throw Be.grammarSyntaxError(u);
          return wt(u, t);
        }
        function ki(e, t) {
          let u = Dr(e, t), r = Object.keys(u);
          if (r.length === 0)
            throw new Error("Missing grammar definition");
          if (r.length > 1) {
            let i = u[r[1]].source;
            throw new Error(_t.getLineAndColumnMessage(i.sourceString, i.startIdx) + "Found more than one grammar definition -- use ohm.grammars() instead.");
          }
          return u[r[0]];
        }
        function Dr(e, t) {
          let u = xt.extend(xt.asNamespace(t));
          if (typeof e != "string")
            if (Ri(e))
              e = e.toString();
            else
              throw new TypeError("Expected string as first argument, got " + pr.unexpectedObjToString(e));
          return Ti(e, u), u;
        }
        function ji(e) {
          throw new Error("grammarFromScriptElement was removed in Ohm v16.0. See https://ohmjs.org/d/gfs for more info.");
        }
        function Mi(e) {
          throw new Error("grammarsFromScriptElements was removed in Ohm v16.0. See https://ohmjs.org/d/gfs for more info.");
        }
        ke.exports = { createNamespace: xt.createNamespace, grammar: ki, grammars: Dr, grammarFromScriptElement: ji, grammarsFromScriptElements: Mi, makeRecipe: Li, ohmGrammar: null, pexprs: bt, util: _t, version: qi };
        ke.exports._buildGrammar = wt;
        ar();
        _t.announceBuiltInRules(St.BuiltInRules);
        ke.exports.ohmGrammar = Te = lr();
        St.initApplicationParser(Te, wt);
      });
      var Cr = h((ho, dr) => {
        "use strict";
        var { assert: oe } = m();
        function Gi(e, t, u) {
          return u(t[e]);
        }
        function Vi(e, t, u) {
          return t[e].map(u);
        }
        function Ar(e) {
          let t = e.split(/ ?\[\]/);
          return t.length === 2 ? Vi.bind(null, t[0]) : Gi.bind(null, e);
        }
        function mr(e, t, u) {
          return e.map((r) => r(t, u));
        }
        function Ui(e) {
          return typeof e == "string" ? mr.bind(null, [Ar(e)]) : Array.isArray(e) ? mr.bind(null, e.map(Ar)) : (oe(typeof e == "function", "Expected a string, Array, or function"), oe(e.length === 2, "Expected a function of arity 2, got " + e.length), e);
        }
        function fr(e) {
          return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(e);
        }
        function Er(e) {
          return e.trim();
        }
        function Wi(e) {
          let t = e.split(/[()]/).map(Er);
          if (t.length === 3 && t[2] === "") {
            let u = t[0], r = [];
            if (t[1].length > 0 && (r = t[1].split(",").map(Er)), fr(u) && r.every(fr))
              return { name: u, formals: r };
          }
          throw new Error("Invalid operation signature: " + e);
        }
        function je(e) {
          this._shapes = e.shapes, this._getTag = e.getTag, this.Adapter = function(t, u) {
            this._adaptee = t, this._family = u;
          }, this.Adapter.prototype.valueOf = function() {
            throw new Error("heeey!");
          }, this.operations = {}, this._arities = /* @__PURE__ */ Object.create(null), this._getChildren = /* @__PURE__ */ Object.create(null), Object.keys(this._shapes).forEach((t) => {
            let u = this._shapes[t];
            this._getChildren[t] = Ui(u), typeof u != "function" && (this._arities[t] = Array.isArray(u) ? u.length : 1);
          }), this._wrap = (t) => new this.Adapter(t, this);
        }
        je.prototype.wrap = function(e) {
          return this._wrap(e);
        };
        je.prototype._checkActionDict = function(e) {
          Object.keys(e).forEach((t) => {
            oe(t in this._getChildren, "Unrecognized action name '" + t + "'");
            let u = e[t];
            if (oe(typeof u == "function", "Key '" + t + "': expected function, got " + u), t in this._arities) {
              let r = this._arities[t], n = e[t].length;
              oe(n === r, "Action '" + t + "' has the wrong arity: expected " + r + ", got " + n);
            }
          });
        };
        je.prototype.addOperation = function(e, t) {
          let u = Wi(e), { name: r } = u;
          this._checkActionDict(t), this.operations[r] = { name: r, formals: u.formals, actions: t };
          let n = this;
          return this.Adapter.prototype[r] = function(...i) {
            let s = n._getTag(this._adaptee);
            oe(s in n._getChildren, "getTag returned unrecognized tag '" + s + "'"), oe(s in t, "No action for '" + s + "' in operation '" + r + "'");
            let l = /* @__PURE__ */ Object.create(null);
            for (let [a, o] of Object.entries(i))
              l[u.formals[a]] = o;
            let c = this.args;
            this.args = l;
            let D = t[s].apply(this, n._getChildren[s](this._adaptee, n._wrap));
            return this.args = c, D;
          }, this;
        };
        dr.exports = je;
      });
      var Pt = h((Ao, gr) => {
        "use strict";
        var Fr = { _terminal() {
          return this.sourceString;
        }, _nonterminal(...e) {
          let { ctorName: t } = this._node, { mapping: u } = this.args;
          if (!Object.prototype.hasOwnProperty.call(u, t)) {
            if (this.isLexical())
              return this.sourceString;
            let i = e.filter((s) => !s.isTerminal());
            if (i.length === 1)
              return i[0].toAST(u);
          }
          if (typeof u[t] == "number")
            return e[u[t]].toAST(u);
          let r = u[t] || e, n = { type: t };
          for (let i in r) {
            let s = u[t] && u[t][i];
            typeof s == "number" ? n[i] = e[s].toAST(u) : typeof s == "string" || typeof s == "boolean" || s === null ? n[i] = s : typeof s == "object" && s instanceof Number ? n[i] = Number(s) : typeof s == "function" ? n[i] = s.call(this, e) : s === void 0 && (e[i] && !e[i].isTerminal() ? n[i] = e[i].toAST(u) : delete n[i]);
          }
          return n;
        }, _iter(...e) {
          return this._node.isOptional() ? this.numChildren === 0 ? null : e[0].toAST(this.args.mapping) : e.map(function(t) {
            return t.toAST(this.args.mapping);
          }, this);
        }, NonemptyListOf(e, t, u) {
          return [e.toAST(this.args.mapping)].concat(u.toAST(this.args.mapping));
        }, EmptyListOf() {
          return [];
        } };
        function zi(e, t) {
          if (typeof e.failed != "function" || e.failed())
            throw new Error("toAST() expects a succesful MatchResult as first parameter");
          t = Object.assign({}, t);
          let u = Object.assign({}, Fr);
          for (let i in t)
            typeof t[i] == "function" && (u[i] = t[i], delete t[i]);
          return e._cst.grammar.createSemantics().addOperation("toAST(mapping)", u)(e).toAST(t);
        }
        function Ki(e) {
          if (typeof e.createSemantics != "function")
            throw new Error("semanticsToAST() expects a Grammar as parameter");
          return e.createSemantics().addOperation("toAST(mapping)", Fr);
        }
        gr.exports = { helper: zi, semantics: Ki };
      });
      var vr = h((mo, yr) => {
        "use strict";
        yr.exports = { VisitorFamily: Cr(), semanticsForToAST: Pt().semantics, toAST: Pt().helper };
      });
      var xr = h((fo, Ir) => {
        "use strict";
        var Br = hr();
        Br.extras = vr();
        Ir.exports = Br;
      });
      var Ot = h((Eo, Sr) => {
        "use strict";
        var Hi = xr(), $i = Hi.makeRecipe(["grammar", { source: `Filter {\r
    Exp = BoolOr\r
    \r
    BoolOr\r
        = BoolOr orOperation BoolAnd -- or\r
        | BoolAnd\r
\r
    BoolAnd \r
        = BoolAnd andOperation PriExp  --and\r
        | PriExp\r
        \r
    PriExp \r
        = "(" Exp ")" -- paren\r
        | ComparisonExp\r
\r
    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | NonEqualityExpr | StartsWithExpr | EndsWithExpr | exactElement\r
\r
    EqualityExpr = propertySequence "=" expressionConst\r
    \r
    LessThanExpr = propertySequence "<" expressionConst\r
    \r
    MoreThanExpr = propertySequence ">" expressionConst\r
    \r
    LessThanOrEqualExpr = propertySequence "<=" expressionConst\r
    \r
    MoreThanOrEqualExpr = propertySequence ">=" expressionConst\r
\r
    NonEqualityExpr = propertySequence nonEqualSign expressionConst\r
\r
    StartsWithExpr = propertySequence likeWord startsWithConst\r
\r
    EndsWithExpr = propertySequence likeWord endsWithConst\r
\r
    propertySequence = property | directProperty\r
                    \r
    property \r
        =  propertySequence "." categoryOrProperty --ofPropertySequence\r
        | directAnyPropertySequence "." categoryOrProperty --ofDirectAnyPropertySequence\r
        | directAnyProperty "." categoryOrProperty --ofDirectAny\r
                    \r
    directProperty \r
        = categoryOrProperty "." categoryOrProperty --ofCategory\r
        | anyProperty "." categoryOrProperty --ofAnyProperty\r
        \r
    directAnyPropertySequence = propertySequence "." anyProperty\r
        \r
    directAnyProperty = directAnyProperty "." anyProperty --sequenced\r
        | categoryOrProperty "." anyProperty --ofCategory\r
        | anyProperty "." anyProperty --ofAny\r
        \r
    exactElement = propertySequence "!" --ofPropertySequence\r
        | categoryOrProperty "!" --ofCategory\r
    \r
    categoryOrProperty (element category or property)\r
        = "[" identificator "]" --inBrackets \r
        | alnum+ --value\r
\r
    nonEqualSign = "<>" | "!="\r
        \r
    andOperation = andWord | "&&" | "&"\r
\r
    andWord = ("A" | "a")("N" | "n")("D" | "d")\r
    \r
    orOperation = orWord | "||" | "|"\r
\r
    orWord = ("O" | "o")("R" | "r")\r
\r
    likeWord = ("L" | "l")("I" | "i")("K" | "k")("E" | "e")\r
    \r
    anyProperty = "*"\r
    \r
    identificator = (~"]" ~"[" any)+\r
    \r
    expressionConst = textConst | number\r
\r
    startsWithConst\r
        = "\\"" likeTextValue "%\\""\r
\r
    endsWithConst\r
        = "\\"%" likeTextValue "\\""\r
    \r
    textConst (target text value)\r
        = "\\"" textValue "\\""\r
        \r
    textValue = textChar*\r
\r
    likeTextValue = likeTextChar*\r
    \r
    textChar\r
        = "\\\\\\""\r
        | (~"\\"" any)\r
\r
    likeTextChar\r
        = "\\\\\\""\r
        | "\\\\%"\r
        | (~("\\"" | "%") any)\r
        \r
    number\r
      = positiveNumber\r
      | negativeNumber\r
      \r
    negativeNumber = "-" positiveNumber\r
    \r
    positiveNumber = realNumber | integerNumber\r
      \r
    integerNumber = digit+\r
    \r
    realNumber = digit* "." digit+\r
}` }, "Filter", null, "Exp", { Exp: ["define", { sourceInterval: [14, 26] }, null, [], ["app", { sourceInterval: [20, 26] }, "BoolOr", []]], BoolOr_or: ["define", { sourceInterval: [56, 88] }, null, [], ["seq", { sourceInterval: [56, 82] }, ["app", { sourceInterval: [56, 62] }, "BoolOr", []], ["app", { sourceInterval: [63, 74] }, "orOperation", []], ["app", { sourceInterval: [75, 82] }, "BoolAnd", []]]], BoolOr: ["define", { sourceInterval: [38, 107] }, null, [], ["alt", { sourceInterval: [56, 107] }, ["app", { sourceInterval: [56, 82] }, "BoolOr_or", []], ["app", { sourceInterval: [100, 107] }, "BoolAnd", []]]], BoolAnd_and: ["define", { sourceInterval: [135, 169] }, null, [], ["seq", { sourceInterval: [135, 162] }, ["app", { sourceInterval: [135, 142] }, "BoolAnd", []], ["app", { sourceInterval: [143, 155] }, "andOperation", []], ["app", { sourceInterval: [156, 162] }, "PriExp", []]]], BoolAnd: ["define", { sourceInterval: [115, 187] }, null, [], ["alt", { sourceInterval: [135, 187] }, ["app", { sourceInterval: [135, 162] }, "BoolAnd_and", []], ["app", { sourceInterval: [181, 187] }, "PriExp", []]]], PriExp_paren: ["define", { sourceInterval: [222, 242] }, null, [], ["seq", { sourceInterval: [222, 233] }, ["terminal", { sourceInterval: [222, 225] }, "("], ["app", { sourceInterval: [226, 229] }, "Exp", []], ["terminal", { sourceInterval: [230, 233] }, ")"]]], PriExp: ["define", { sourceInterval: [203, 267] }, null, [], ["alt", { sourceInterval: [222, 267] }, ["app", { sourceInterval: [222, 233] }, "PriExp_paren", []], ["app", { sourceInterval: [254, 267] }, "ComparisonExp", []]]], ComparisonExp: ["define", { sourceInterval: [275, 442] }, null, [], ["alt", { sourceInterval: [291, 442] }, ["app", { sourceInterval: [291, 303] }, "EqualityExpr", []], ["app", { sourceInterval: [306, 318] }, "LessThanExpr", []], ["app", { sourceInterval: [321, 333] }, "MoreThanExpr", []], ["app", { sourceInterval: [336, 355] }, "LessThanOrEqualExpr", []], ["app", { sourceInterval: [358, 377] }, "MoreThanOrEqualExpr", []], ["app", { sourceInterval: [380, 395] }, "NonEqualityExpr", []], ["app", { sourceInterval: [398, 412] }, "StartsWithExpr", []], ["app", { sourceInterval: [415, 427] }, "EndsWithExpr", []], ["app", { sourceInterval: [430, 442] }, "exactElement", []]]], EqualityExpr: ["define", { sourceInterval: [450, 501] }, null, [], ["seq", { sourceInterval: [465, 501] }, ["app", { sourceInterval: [465, 481] }, "propertySequence", []], ["terminal", { sourceInterval: [482, 485] }, "="], ["app", { sourceInterval: [486, 501] }, "expressionConst", []]]], LessThanExpr: ["define", { sourceInterval: [513, 564] }, null, [], ["seq", { sourceInterval: [528, 564] }, ["app", { sourceInterval: [528, 544] }, "propertySequence", []], ["terminal", { sourceInterval: [545, 548] }, "<"], ["app", { sourceInterval: [549, 564] }, "expressionConst", []]]], MoreThanExpr: ["define", { sourceInterval: [576, 627] }, null, [], ["seq", { sourceInterval: [591, 627] }, ["app", { sourceInterval: [591, 607] }, "propertySequence", []], ["terminal", { sourceInterval: [608, 611] }, ">"], ["app", { sourceInterval: [612, 627] }, "expressionConst", []]]], LessThanOrEqualExpr: ["define", { sourceInterval: [639, 698] }, null, [], ["seq", { sourceInterval: [661, 698] }, ["app", { sourceInterval: [661, 677] }, "propertySequence", []], ["terminal", { sourceInterval: [678, 682] }, "<="], ["app", { sourceInterval: [683, 698] }, "expressionConst", []]]], MoreThanOrEqualExpr: ["define", { sourceInterval: [710, 769] }, null, [], ["seq", { sourceInterval: [732, 769] }, ["app", { sourceInterval: [732, 748] }, "propertySequence", []], ["terminal", { sourceInterval: [749, 753] }, ">="], ["app", { sourceInterval: [754, 769] }, "expressionConst", []]]], NonEqualityExpr: ["define", { sourceInterval: [777, 840] }, null, [], ["seq", { sourceInterval: [795, 840] }, ["app", { sourceInterval: [795, 811] }, "propertySequence", []], ["app", { sourceInterval: [812, 824] }, "nonEqualSign", []], ["app", { sourceInterval: [825, 840] }, "expressionConst", []]]], StartsWithExpr: ["define", { sourceInterval: [848, 906] }, null, [], ["seq", { sourceInterval: [865, 906] }, ["app", { sourceInterval: [865, 881] }, "propertySequence", []], ["app", { sourceInterval: [882, 890] }, "likeWord", []], ["app", { sourceInterval: [891, 906] }, "startsWithConst", []]]], EndsWithExpr: ["define", { sourceInterval: [914, 968] }, null, [], ["seq", { sourceInterval: [929, 968] }, ["app", { sourceInterval: [929, 945] }, "propertySequence", []], ["app", { sourceInterval: [946, 954] }, "likeWord", []], ["app", { sourceInterval: [955, 968] }, "endsWithConst", []]]], propertySequence: ["define", { sourceInterval: [976, 1020] }, null, [], ["alt", { sourceInterval: [995, 1020] }, ["app", { sourceInterval: [995, 1003] }, "property", []], ["app", { sourceInterval: [1006, 1020] }, "directProperty", []]]], property_ofPropertySequence: ["define", { sourceInterval: [1070, 1130] }, null, [], ["seq", { sourceInterval: [1070, 1109] }, ["app", { sourceInterval: [1070, 1086] }, "propertySequence", []], ["terminal", { sourceInterval: [1087, 1090] }, "."], ["app", { sourceInterval: [1091, 1109] }, "categoryOrProperty", []]]], property_ofDirectAnyPropertySequence: ["define", { sourceInterval: [1142, 1220] }, null, [], ["seq", { sourceInterval: [1142, 1190] }, ["app", { sourceInterval: [1142, 1167] }, "directAnyPropertySequence", []], ["terminal", { sourceInterval: [1168, 1171] }, "."], ["app", { sourceInterval: [1172, 1190] }, "categoryOrProperty", []]]], property_ofDirectAny: ["define", { sourceInterval: [1232, 1286] }, null, [], ["seq", { sourceInterval: [1232, 1272] }, ["app", { sourceInterval: [1232, 1249] }, "directAnyProperty", []], ["terminal", { sourceInterval: [1250, 1253] }, "."], ["app", { sourceInterval: [1254, 1272] }, "categoryOrProperty", []]]], property: ["define", { sourceInterval: [1048, 1286] }, null, [], ["alt", { sourceInterval: [1070, 1286] }, ["app", { sourceInterval: [1070, 1109] }, "property_ofPropertySequence", []], ["app", { sourceInterval: [1142, 1190] }, "property_ofDirectAnyPropertySequence", []], ["app", { sourceInterval: [1232, 1272] }, "property_ofDirectAny", []]]], directProperty_ofCategory: ["define", { sourceInterval: [1341, 1395] }, null, [], ["seq", { sourceInterval: [1341, 1382] }, ["app", { sourceInterval: [1341, 1359] }, "categoryOrProperty", []], ["terminal", { sourceInterval: [1360, 1363] }, "."], ["app", { sourceInterval: [1364, 1382] }, "categoryOrProperty", []]]], directProperty_ofAnyProperty: ["define", { sourceInterval: [1407, 1457] }, null, [], ["seq", { sourceInterval: [1407, 1441] }, ["app", { sourceInterval: [1407, 1418] }, "anyProperty", []], ["terminal", { sourceInterval: [1419, 1422] }, "."], ["app", { sourceInterval: [1423, 1441] }, "categoryOrProperty", []]]], directProperty: ["define", { sourceInterval: [1314, 1457] }, null, [], ["alt", { sourceInterval: [1341, 1457] }, ["app", { sourceInterval: [1341, 1382] }, "directProperty_ofCategory", []], ["app", { sourceInterval: [1407, 1441] }, "directProperty_ofAnyProperty", []]]], directAnyPropertySequence: ["define", { sourceInterval: [1473, 1533] }, null, [], ["seq", { sourceInterval: [1501, 1533] }, ["app", { sourceInterval: [1501, 1517] }, "propertySequence", []], ["terminal", { sourceInterval: [1518, 1521] }, "."], ["app", { sourceInterval: [1522, 1533] }, "anyProperty", []]]], directAnyProperty_sequenced: ["define", { sourceInterval: [1569, 1614] }, null, [], ["seq", { sourceInterval: [1569, 1602] }, ["app", { sourceInterval: [1569, 1586] }, "directAnyProperty", []], ["terminal", { sourceInterval: [1587, 1590] }, "."], ["app", { sourceInterval: [1591, 1602] }, "anyProperty", []]]], directAnyProperty_ofCategory: ["define", { sourceInterval: [1626, 1673] }, null, [], ["seq", { sourceInterval: [1626, 1660] }, ["app", { sourceInterval: [1626, 1644] }, "categoryOrProperty", []], ["terminal", { sourceInterval: [1645, 1648] }, "."], ["app", { sourceInterval: [1649, 1660] }, "anyProperty", []]]], directAnyProperty_ofAny: ["define", { sourceInterval: [1685, 1720] }, null, [], ["seq", { sourceInterval: [1685, 1712] }, ["app", { sourceInterval: [1685, 1696] }, "anyProperty", []], ["terminal", { sourceInterval: [1697, 1700] }, "."], ["app", { sourceInterval: [1701, 1712] }, "anyProperty", []]]], directAnyProperty: ["define", { sourceInterval: [1549, 1720] }, null, [], ["alt", { sourceInterval: [1569, 1720] }, ["app", { sourceInterval: [1569, 1602] }, "directAnyProperty_sequenced", []], ["app", { sourceInterval: [1626, 1660] }, "directAnyProperty_ofCategory", []], ["app", { sourceInterval: [1685, 1712] }, "directAnyProperty_ofAny", []]]], exactElement_ofPropertySequence: ["define", { sourceInterval: [1751, 1792] }, null, [], ["seq", { sourceInterval: [1751, 1771] }, ["app", { sourceInterval: [1751, 1767] }, "propertySequence", []], ["terminal", { sourceInterval: [1768, 1771] }, "!"]]], exactElement_ofCategory: ["define", { sourceInterval: [1804, 1839] }, null, [], ["seq", { sourceInterval: [1804, 1826] }, ["app", { sourceInterval: [1804, 1822] }, "categoryOrProperty", []], ["terminal", { sourceInterval: [1823, 1826] }, "!"]]], exactElement: ["define", { sourceInterval: [1736, 1839] }, null, [], ["alt", { sourceInterval: [1751, 1839] }, ["app", { sourceInterval: [1751, 1771] }, "exactElement_ofPropertySequence", []], ["app", { sourceInterval: [1804, 1826] }, "exactElement_ofCategory", []]]], categoryOrProperty_inBrackets: ["define", { sourceInterval: [1912, 1946] }, null, [], ["seq", { sourceInterval: [1912, 1933] }, ["terminal", { sourceInterval: [1912, 1915] }, "["], ["app", { sourceInterval: [1916, 1929] }, "identificator", []], ["terminal", { sourceInterval: [1930, 1933] }, "]"]]], categoryOrProperty_value: ["define", { sourceInterval: [1959, 1973] }, null, [], ["plus", { sourceInterval: [1959, 1965] }, ["app", { sourceInterval: [1959, 1964] }, "alnum", []]]], categoryOrProperty: ["define", { sourceInterval: [1851, 1973] }, "element category or property", [], ["alt", { sourceInterval: [1912, 1973] }, ["app", { sourceInterval: [1912, 1933] }, "categoryOrProperty_inBrackets", []], ["app", { sourceInterval: [1959, 1965] }, "categoryOrProperty_value", []]]], nonEqualSign: ["define", { sourceInterval: [1981, 2007] }, null, [], ["alt", { sourceInterval: [1996, 2007] }, ["terminal", { sourceInterval: [1996, 2e3] }, "<>"], ["terminal", { sourceInterval: [2003, 2007] }, "!="]]], andOperation: ["define", { sourceInterval: [2023, 2058] }, null, [], ["alt", { sourceInterval: [2038, 2058] }, ["app", { sourceInterval: [2038, 2045] }, "andWord", []], ["terminal", { sourceInterval: [2048, 2052] }, "&&"], ["terminal", { sourceInterval: [2055, 2058] }, "&"]]], andWord: ["define", { sourceInterval: [2066, 2109] }, null, [], ["seq", { sourceInterval: [2076, 2109] }, ["alt", { sourceInterval: [2077, 2086] }, ["terminal", { sourceInterval: [2077, 2080] }, "A"], ["terminal", { sourceInterval: [2083, 2086] }, "a"]], ["alt", { sourceInterval: [2088, 2097] }, ["terminal", { sourceInterval: [2088, 2091] }, "N"], ["terminal", { sourceInterval: [2094, 2097] }, "n"]], ["alt", { sourceInterval: [2099, 2108] }, ["terminal", { sourceInterval: [2099, 2102] }, "D"], ["terminal", { sourceInterval: [2105, 2108] }, "d"]]]], orOperation: ["define", { sourceInterval: [2121, 2154] }, null, [], ["alt", { sourceInterval: [2135, 2154] }, ["app", { sourceInterval: [2135, 2141] }, "orWord", []], ["terminal", { sourceInterval: [2144, 2148] }, "||"], ["terminal", { sourceInterval: [2151, 2154] }, "|"]]], orWord: ["define", { sourceInterval: [2162, 2193] }, null, [], ["seq", { sourceInterval: [2171, 2193] }, ["alt", { sourceInterval: [2172, 2181] }, ["terminal", { sourceInterval: [2172, 2175] }, "O"], ["terminal", { sourceInterval: [2178, 2181] }, "o"]], ["alt", { sourceInterval: [2183, 2192] }, ["terminal", { sourceInterval: [2183, 2186] }, "R"], ["terminal", { sourceInterval: [2189, 2192] }, "r"]]]], likeWord: ["define", { sourceInterval: [2201, 2256] }, null, [], ["seq", { sourceInterval: [2212, 2256] }, ["alt", { sourceInterval: [2213, 2222] }, ["terminal", { sourceInterval: [2213, 2216] }, "L"], ["terminal", { sourceInterval: [2219, 2222] }, "l"]], ["alt", { sourceInterval: [2224, 2233] }, ["terminal", { sourceInterval: [2224, 2227] }, "I"], ["terminal", { sourceInterval: [2230, 2233] }, "i"]], ["alt", { sourceInterval: [2235, 2244] }, ["terminal", { sourceInterval: [2235, 2238] }, "K"], ["terminal", { sourceInterval: [2241, 2244] }, "k"]], ["alt", { sourceInterval: [2246, 2255] }, ["terminal", { sourceInterval: [2246, 2249] }, "E"], ["terminal", { sourceInterval: [2252, 2255] }, "e"]]]], anyProperty: ["define", { sourceInterval: [2268, 2285] }, null, [], ["terminal", { sourceInterval: [2282, 2285] }, "*"]], identificator: ["define", { sourceInterval: [2297, 2329] }, null, [], ["plus", { sourceInterval: [2313, 2329] }, ["seq", { sourceInterval: [2314, 2327] }, ["not", { sourceInterval: [2314, 2318] }, ["terminal", { sourceInterval: [2315, 2318] }, "]"]], ["not", { sourceInterval: [2319, 2323] }, ["terminal", { sourceInterval: [2320, 2323] }, "["]], ["app", { sourceInterval: [2324, 2327] }, "any", []]]]], expressionConst: ["define", { sourceInterval: [2341, 2377] }, null, [], ["alt", { sourceInterval: [2359, 2377] }, ["app", { sourceInterval: [2359, 2368] }, "textConst", []], ["app", { sourceInterval: [2371, 2377] }, "number", []]]], startsWithConst: ["define", { sourceInterval: [2385, 2436] }, null, [], ["seq", { sourceInterval: [2412, 2436] }, ["terminal", { sourceInterval: [2412, 2416] }, '"'], ["app", { sourceInterval: [2417, 2430] }, "likeTextValue", []], ["terminal", { sourceInterval: [2431, 2436] }, '%"']]], endsWithConst: ["define", { sourceInterval: [2444, 2493] }, null, [], ["seq", { sourceInterval: [2469, 2493] }, ["terminal", { sourceInterval: [2469, 2474] }, '"%'], ["app", { sourceInterval: [2475, 2488] }, "likeTextValue", []], ["terminal", { sourceInterval: [2489, 2493] }, '"']]], textConst: ["define", { sourceInterval: [2505, 2565] }, "target text value", [], ["seq", { sourceInterval: [2546, 2565] }, ["terminal", { sourceInterval: [2546, 2550] }, '"'], ["app", { sourceInterval: [2551, 2560] }, "textValue", []], ["terminal", { sourceInterval: [2561, 2565] }, '"']]], textValue: ["define", { sourceInterval: [2581, 2602] }, null, [], ["star", { sourceInterval: [2593, 2602] }, ["app", { sourceInterval: [2593, 2601] }, "textChar", []]]], likeTextValue: ["define", { sourceInterval: [2610, 2639] }, null, [], ["star", { sourceInterval: [2626, 2639] }, ["app", { sourceInterval: [2626, 2638] }, "likeTextChar", []]]], textChar: ["define", { sourceInterval: [2651, 2700] }, null, [], ["alt", { sourceInterval: [2671, 2700] }, ["terminal", { sourceInterval: [2671, 2677] }, '\\"'], ["seq", { sourceInterval: [2689, 2700] }, ["not", { sourceInterval: [2690, 2695] }, ["terminal", { sourceInterval: [2691, 2695] }, '"']], ["app", { sourceInterval: [2696, 2699] }, "any", []]]]], likeTextChar: ["define", { sourceInterval: [2708, 2786] }, null, [], ["alt", { sourceInterval: [2732, 2786] }, ["terminal", { sourceInterval: [2732, 2738] }, '\\"'], ["terminal", { sourceInterval: [2750, 2755] }, "\\%"], ["seq", { sourceInterval: [2767, 2786] }, ["not", { sourceInterval: [2768, 2781] }, ["alt", { sourceInterval: [2770, 2780] }, ["terminal", { sourceInterval: [2770, 2774] }, '"'], ["terminal", { sourceInterval: [2777, 2780] }, "%"]]], ["app", { sourceInterval: [2782, 2785] }, "any", []]]]], number: ["define", { sourceInterval: [2802, 2856] }, null, [], ["alt", { sourceInterval: [2818, 2856] }, ["app", { sourceInterval: [2818, 2832] }, "positiveNumber", []], ["app", { sourceInterval: [2842, 2856] }, "negativeNumber", []]]], negativeNumber: ["define", { sourceInterval: [2870, 2905] }, null, [], ["seq", { sourceInterval: [2887, 2905] }, ["terminal", { sourceInterval: [2887, 2890] }, "-"], ["app", { sourceInterval: [2891, 2905] }, "positiveNumber", []]]], positiveNumber: ["define", { sourceInterval: [2917, 2960] }, null, [], ["alt", { sourceInterval: [2934, 2960] }, ["app", { sourceInterval: [2934, 2944] }, "realNumber", []], ["app", { sourceInterval: [2947, 2960] }, "integerNumber", []]]], integerNumber: ["define", { sourceInterval: [2974, 2996] }, null, [], ["plus", { sourceInterval: [2990, 2996] }, ["app", { sourceInterval: [2990, 2995] }, "digit", []]]], realNumber: ["define", { sourceInterval: [3008, 3038] }, null, [], ["seq", { sourceInterval: [3021, 3038] }, ["star", { sourceInterval: [3021, 3027] }, ["app", { sourceInterval: [3021, 3026] }, "digit", []]], ["terminal", { sourceInterval: [3028, 3031] }, "."], ["plus", { sourceInterval: [3032, 3038] }, ["app", { sourceInterval: [3032, 3037] }, "digit", []]]]] }]);
        Sr.exports = $i;
      });
      var us = {};
      Mr(us, { computeExpression: () => ts, filterElements: () => es });
      var Tt = Mt(Ot());
      var Nt = (e, t) => {
        if (e.length > t)
          throw new Error("Template categories count should not exceed target categories array");
        let u = [];
        return Ie(u, [], e, 0, t), u;
      }, Me = (e, t) => {
        let u = [];
        for (let r = e.length; r <= t; r++)
          u = u.concat(Nt(e, r));
        return u;
      }, Ie = (e, t, u, r, n) => {
        if (t.length === n) {
          r === u.length && e.push(t);
          return;
        }
        if (r < u.length && u[r] !== "*") {
          t.push(u[r]), Ie(e, t, u, r + 1, n);
          return;
        }
        if (r >= u.length) {
          t.push("*"), Ie(e, t, u, r, n);
          return;
        }
        if (u[r] === "*") {
          let i = n - t.length;
          for (let s = 2; s < i; ++s) {
            let l = [...t];
            for (let c = 0; c < s; ++c)
              l.push("*");
            Ie(e, l, u, r + 1, n);
          }
          t.push("*"), Ie(e, t, u, r + 1, n);
        }
      };
      var xe = (e, t) => {
        if (t.length > e.length)
          return false;
        let u = Nt(t, e.length);
        for (let r of u)
          if (Ji(e, r))
            return true;
        return false;
      }, Ji = (e, t) => {
        for (let u = 0; u < t.length; u++)
          if (t[u] !== "*" && e[u] !== t[u])
            return false;
        return true;
      };
      var ae = (e, t, u = 1e-5) => Math.abs(e - t) < u, br = (e, t, u = 1e-5) => e < t && !ae(e, t, u), _r = (e, t, u = 1e-5) => e > t && !ae(e, t, u), wr = (e, t, u = 1e-5) => e < t || ae(e, t, u), Pr = (e, t, u = 1e-5) => e > t || ae(e, t, u);
      var Zi = (e) => e.type === "number", Qi = (e) => typeof e == "number", Yi = (e) => typeof e == "string", qt = (e, t, u) => {
        for (; e.indexOf(t) >= 0; )
          e = e.replace(t, u);
        return e;
      }, ue = (e, t) => (u, r, n) => {
        let i = u.getPropertyDefinition(), s = n.getPropertyDefinition();
        return Zi(s) ? (l, c) => xe(c.categoriesList, i.categories) ? Me(i.categories, c.categoriesList.length).map((a) => c.getPropertyValue(i.propertyName, a)).filter(Qi).reduce((a, o) => a || e(o, s.value, l), false) : false : (l, c) => {
          if (!xe(c.categoriesList, i.categories))
            return false;
          let D = Me(i.categories, c.categoriesList.length), a = l.stringCaseSensitive ? s.value : s.value.toLocaleLowerCase();
          return D.map((o) => c.getPropertyValue(i.propertyName, o)).filter(Yi).map((o) => l.stringCaseSensitive ? o : o.toLocaleLowerCase()).reduce((o, p) => o || t(p, a), false);
        };
      }, Or = { exactElement: (e) => {
        let t = e.getPropertyDefinition();
        return (u, r) => xe(r.categoriesList, t.categories);
      }, EqualityExpr: ue((e, t, u) => ae(e, t, u.tolerance), (e, t) => e === t), LessThanExpr: ue((e, t, u) => br(e, t, u.tolerance), (e, t) => e < t), LessThanOrEqualExpr: ue((e, t, u) => wr(e, t, u.tolerance), (e, t) => e <= t), MoreThanExpr: ue((e, t, u) => _r(e, t, u.tolerance), (e, t) => e > t), MoreThanOrEqualExpr: ue((e, t, u) => Pr(e, t, u.tolerance), (e, t) => e >= t), BoolAnd_and: (e, t, u) => (r, n) => e.compile()(r, n) && u.compile()(r, n), BoolOr_or: (e, t, u) => (r, n) => e.compile()(r, n) || u.compile()(r, n), PriExp_paren: (e, t, u) => (r, n) => t.compile()(r, n), NonEqualityExpr: ue((e, t, u) => !ae(e, t, u.tolerance), (e, t) => e !== t), StartsWithExpr: ue((e, t, u) => false, (e, t) => e.startsWith(t)), EndsWithExpr: ue((e, t, u) => false, (e, t) => e.endsWith(t)) }, Lt = (e, t) => {
        let u = e.getPropertyDefinition(), r = t.getPropertyDefinition(), n = [...u.categories];
        return u.type === "property-value" && n.push(u.propertyName), { type: "property-value", propertyName: r.value, categories: n };
      }, Rt = (e) => {
        let t = e.getPropertyDefinition();
        if (t.type === "exact-category")
          return t;
        let u = [...t.categories];
        return u.push(t.propertyName), { type: "exact-category", categories: u };
      }, Nr = (e) => {
        let t = e.getPropertyDefinition();
        if (t.type === "property-value")
          return t;
        let u = [...t.categories];
        return { type: "property-value", propertyName: u.pop(), categories: u };
      }, Ge = (e, t) => ({ type: "simple", value: typeof t == "function" ? t(e.sourceString) : e.sourceString }), Ve = { exactElement_ofCategory: (e, t) => ({ type: "exact-category", categories: [e.getPropertyDefinition().value] }), categoryOrProperty_inBrackets: (e, t, u) => Ge(t), categoryOrProperty_value: (e) => Ge(e), exactElement_ofPropertySequence: (e, t) => Rt(e), property_ofPropertySequence: (e, t, u) => Lt(e, u), property_ofDirectAny: (e, t, u) => Lt(e, u), property_ofDirectAnyPropertySequence: (e, t, u) => Lt(e, u), directAnyProperty_ofCategory: (e, t, u) => ({ type: "exact-category", categories: [e.getPropertyDefinition().value, "*"] }), directAnyPropertySequence: (e, t, u) => Rt(e), directAnyProperty_sequenced: (e, t, u) => {
        let n = [...Rt(e).categories];
        return n.push("*"), { type: "exact-category", categories: n };
      }, propertySequence: (e) => Nr(e), directProperty_ofCategory: (e, t, u) => {
        let r = e.getPropertyDefinition(), n = u.getPropertyDefinition();
        return { type: "exact-category", categories: [r.value, n.value] };
      }, directProperty_ofAnyProperty: (e, t, u) => ({ type: "exact-category", categories: ["*", u.getPropertyDefinition().value] }), number: (e) => ({ type: "number", value: parseFloat(e.sourceString) }), textConst: (e, t, u) => t.getPropertyDefinition(), startsWithConst: (e, t, u) => t.getPropertyDefinition(), endsWithConst: (e, t, u) => t.getPropertyDefinition(), textValue: (e) => Ge(e, (t) => qt(t, '\\"', '"')), likeTextValue: (e) => Ge(e, (t) => qt(qt(t, '\\"', '"'), "\\%", "%")) }, qr = { propertySequence: (e) => {
        let t = Nr(e);
        return (u) => xe(u.categoriesList, t.categories) ? Me(t.categories, u.categoriesList.length).map((n) => u.getPropertyValue(t.propertyName, n)).find((n) => n !== void 0) : void 0;
      } };
      var Ae = class extends Error {
        shortMessage;
        constructor(t, u) {
          super(t), this.shortMessage = u;
        }
      };
      var Ue = class {
        semantics = Tt.default.createSemantics();
        constructor() {
          this.semantics.addOperation("getPropertyDefinition", Ve), this.semantics.addOperation("getPropertyValue", qr);
        }
        createPropertyQuery(t) {
          let u = Tt.default.match(t, "propertySequence");
          if (u.failed())
            throw new Ae(u.message, u.shortMessage);
          return this.semantics(u).getPropertyValue();
        }
      };
      var kt = Mt(Ot());
      var We = class {
        semantics = kt.default.createSemantics();
        settings;
        constructor(t) {
          this.settings = t || { tolerance: 1e-5, stringCaseSensitive: true }, this.semantics.addOperation("getPropertyDefinition", Ve), this.semantics.addOperation("compile", Or);
        }
        createFilter(t) {
          let u = kt.default.match(t);
          if (u.failed())
            throw new Ae(u.message, u.shortMessage);
          return this.semantics(u).compile().bind(null, this.settings);
        }
      };
      var Se = class {
        attributesCaseSensitive;
        attributesIdsByName = /* @__PURE__ */ new Map();
        internalRefsAttributes = /* @__PURE__ */ new Set();
        constructor(t, u) {
          this.attributesCaseSensitive = u;
          let r = -1, n = -1;
          t.enumAttributes((i, s) => {
            let l = u ? s.name : s.name.toLocaleLowerCase(), c = this.attributesIdsByName.get(l) || [];
            c.push(i), this.attributesIdsByName.set(l, c), s.name === "name" && s.category === "__name__" && (r = i), s.name === "instanceof_objid" && s.category === "__instanceof__" && s.dataType === 11 && (n = i), s.category === "__internalref__" && s.dataType === 11 && this.internalRefsAttributes.add(i);
          }), this.nameAttributeId = r, this.instanceOfAttributeId = n;
        }
        nameAttributeId;
        instanceOfAttributeId;
        findAttributesIdsByName(t) {
          let u = this.attributesCaseSensitive ? t : t.toLocaleLowerCase();
          return this.attributesIdsByName.get(u) || [];
        }
        isInternalRefAttribute(t) {
          return this.internalRefsAttributes.has(t);
        }
      };
      var be = class {
        dbId;
        propertyDatabase;
        attributes;
        categoryNodesDbIds;
        constructor(t, u, r) {
          this.dbId = t, this.propertyDatabase = u, this.attributes = r, this.categoryNodesDbIds = Xi(t, u);
        }
        get categoriesList() {
          return this.categoryNodesDbIds.map((t) => this.getNodePropertyValue(t, this.attributes.nameAttributeId));
        }
        getPropertyValue(t, u) {
          if (!this.compareCategories(u))
            return;
          let r = this.categoryNodesDbIds[u.length - 1];
          return this.attributes.findAttributesIdsByName(t).map((n) => this.getNodePropertyValue(r, n)).find((n) => n !== void 0);
        }
        compareCategories(t) {
          for (let u = 0; u < t.length; u++)
            if (t[u] !== "*" && this.categoriesList[u] !== t[u])
              return false;
          return true;
        }
        getNodePropertyValue(t, u) {
          let r, n;
          return this.propertyDatabase.enumObjectProperties(t, (i, s) => {
            i === u && (r = this.propertyDatabase.getAttrValue(i, s)), r === void 0 && i === this.attributes.instanceOfAttributeId && (n = this.propertyDatabase.getAttrValue(i, s));
          }), u !== this.attributes.nameAttributeId && this.attributes.isInternalRefAttribute(u) ? typeof r == "number" ? this.getNodePropertyValue(r, this.attributes.nameAttributeId) : void 0 : (r === void 0 && typeof n == "number" && (r = this.getNodePropertyValue(n, u)), r);
        }
      }, Xi = (e, t) => {
        let u = [], r = e;
        for (; r !== null; ) {
          let n = t.findParent(r);
          n !== null && u.push(r), r = n;
        }
        return u.reverse();
      };
      var es = (e, t) => {
        try {
          let u = [], { lmvQuery: r, lmvQueryOptions: n } = t, s = new We(n).createFilter(r), l = new Se(e, n.attributesCaseSensitive);
          return e.enumObjects((c) => {
            if (n.leafNodesOnly && e.getNodeNameAndChildren({ dbId: c }) !== void 0)
              return;
            let D = new be(c, e, l);
            s(D) && u.push(c);
          }), { dbIds: u, error: null };
        } catch (u) {
          return { dbIds: [], error: u };
        }
      }, ts = (e, t) => {
        try {
          let { nodeId: u, propertyQuery: r, caseSensitive: n } = t, s = new Ue().createPropertyQuery(r), l = new Se(e, n), c = new be(u, e, l);
          return { result: s(c), error: null };
        } catch (u) {
          return { result: void 0, error: u };
        }
      };
      return Gr(us);
    };
    module.exports = { engine: engine2 };
  }
});

// build/obj/index.js
var import_engine = __toESM(require_engine());
async function query(model, query2, options) {
  const propertyDatabase = model.getPropertyDb();
  const engineModule = import_engine.engine.toString();
  const code = `function userFunction(pdb, tag) { const engine = ${engineModule}; return engine().filterElements(pdb, tag); }`;
  return propertyDatabase.executeUserFunction(code, { lmvQuery: query2, lmvQueryOptions: options });
}
async function computeExpressionValue(model, dbId, query2, attributesCaseSensitive = true) {
  const propertyDatabase = model.getPropertyDb();
  const engineModule = import_engine.engine.toString();
  const code = `function userFunction(pdb, tag) { const engine = ${engineModule}; return engine().computeExpression(pdb, tag); }`;
  return propertyDatabase.executeUserFunction(code, { nodeId: dbId, propertyQuery: query2, caseSensitive: attributesCaseSensitive });
}
export {
  computeExpressionValue,
  query
};
