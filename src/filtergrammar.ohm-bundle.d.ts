// AUTOGENERATED FILE
// This file was generated from filtergrammar.ohm by `ohm generateBundles`.

import {
  ActionDict,
  Grammar,
  IterationNode,
  Node,
  NonterminalNode,
  Semantics,
  TerminalNode
} from 'ohm-js';

export interface FilterActionDict<T> extends ActionDict<T> {
  Expr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FilterWithSelectExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  FilterWithAggregatedSelectExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  FilterWithGroupedAggregedSelectExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: NonterminalNode, arg4: NonterminalNode) => T;
  FilterExpr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  BoolOr_or?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  BoolOr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  BoolAnd_and?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  BoolAnd?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  PriExp_paren?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  PriExp?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ComparisonExp?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  NotExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  EqualityExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  LessThanExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  MoreThanExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  LessThanOrEqualExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  MoreThanOrEqualExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  NonEqualityExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  StartsWithExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  EndsWithExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  InExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  NotInExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode, arg3: TerminalNode, arg4: NonterminalNode, arg5: TerminalNode) => T;
  AggregatedSelectionWithGroups?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  AggregatedSelectionClause?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AggregatedFuncsExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  AnyAggregatedFuncExpr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AggregatedNamedFuncExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  AggregatedFuncExpr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AggregatedCountExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode) => T;
  AggregatedSumExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  AggregatedMinExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  AggregatedMaxExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  AggregatedAvgExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  PropertiesSelectExpr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  PropertiesExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  ConstantsListExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  PropertyIdentifierExpr?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  NamedPropertyExpr?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  propertyNameIdentifier?: (this: NonterminalNode, arg0: IterationNode) => T;
  propertySequence?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  property_ofPropertySequence?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  property_ofDirectAnyPropertySequence?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  property_ofDirectAny?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  property?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  directProperty_ofCategory?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directProperty_ofAnyProperty?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directProperty?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  directAnyPropertySequence?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directAnyProperty_sequenced?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directAnyProperty_ofCategory?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directAnyProperty_ofAny?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  directAnyProperty?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  exactElement_ofPropertySequence?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode) => T;
  exactElement_ofCategory?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode) => T;
  exactElement?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  categoryOrProperty_inBrackets?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  categoryOrProperty_value?: (this: NonterminalNode, arg0: IterationNode) => T;
  categoryOrProperty?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  groupedBy?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  avgWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  maxWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  minWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  sumWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  countWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  asWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  nonEqualSign?: (this: NonterminalNode, arg0: TerminalNode) => T;
  andOperation?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  andWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  orOperation?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  orWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  likeWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  notOperation?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  notWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  inWord?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  anyProperty?: (this: NonterminalNode, arg0: TerminalNode) => T;
  identificator?: (this: NonterminalNode, arg0: IterationNode) => T;
  expressionConst?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  startsWithConst?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  endsWithConst?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  textConst?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  textValue?: (this: NonterminalNode, arg0: IterationNode) => T;
  likeTextValue?: (this: NonterminalNode, arg0: IterationNode) => T;
  textChar?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  likeTextChar?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  number?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  negativeNumber?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  positiveNumber?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  integerNumber?: (this: NonterminalNode, arg0: IterationNode) => T;
  realNumber?: (this: NonterminalNode, arg0: IterationNode, arg1: TerminalNode, arg2: IterationNode) => T;
}

export interface FilterSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: FilterActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: FilterActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: FilterActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: FilterActionDict<T>): this;
}

export interface FilterGrammar extends Grammar {
  createSemantics(): FilterSemantics;
  extendSemantics(superSemantics: FilterSemantics): FilterSemantics;
}

declare const grammar: FilterGrammar;
export default grammar;

