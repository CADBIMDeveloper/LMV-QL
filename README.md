# LMV-QL
LMV-QL is a query language for filtering model elements in [Autodesk Platform Services (formerly Forge) viewer](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)

> Check out our [demo application](https://lmv-ql.cadbim.dev) with a sample viewer extension
> which allows to run several predefined LMV-QL filters and also allows you
> to test you own filters on the basic sample model


## Table of Contents
- [Quick tour](#quick-tour)
- [Introduction](#introduction)
  * [Simple filters](#simple-filters)
  * [Complex filters](#complex-filters)
  * [Units](#units)
- [Query language](#query-language)
  * [Identificators: hierarchy and element property definition](#identificators-hierarchy-and-element-property-definition)
  * [Elements in hierarchy filters](#elements-in-hierarchy-filters)
  * [Simple filters by property value](#simple-filters-by-property-value)
    - [Numerical properties](#numerical-properties)
    - [String properties](#string-properties)
    - [IN / NOT IN](#in--not-in)
  * [Logical filters](#logical-filters)
    - [AND operator](#and-operator)
    - [OR operator](#or-operator)
    - [NOT operator](#not-operator)
    - [Brackets](#brackets)
  * [Selection expressions](#selection-expressions)
    - [Simple properties selection](#simple-properties-selection)
    - [Filtered properties selection](#filtered-properties-selection)
    - [Aggregation functions](#aggregation-functions)
    - [Aggregation functions with grouping](#aggregation-functions-with-grouping)
    - [All node properties selector](#all-node-properties-selector)
- [Headless LMV-QL: query model without viewer](#headless-lmv-ql-query-model-without-viewer)
- [Query settings](#query-settings)

## Quick tour
- install the package: `npm install lmv-ql`
- import query:
```ts
import { query } from "lmv-ql";
```
- run your LMV query
```ts
const filterOptions = {
  displayUnits: viewer.prefs.get(Autodesk.Viewing.Private.Prefs.DISPLAY_UNITS),
  displayUnitsPrecision: viewer.prefs.get(Autodesk.Viewing.Private.Prefs.DISPLAY_UNITS_PRECISION)
};

const queryResults = await query(viewer.model, lmvQuery, filterOptions);

if (!queryResults.error) {
  const dbIds = queryResults.dbIds;
  // do whatever you want with the elements db ids returned by filter engine
  const rows = queryResults.rows;
  // consume query results if you provided selection expressions in your query
  for(const row of queryResults.rows) {
    for(const column of queryResults.columns) {
      const value = row.values[column];
      // do whatever you want with this information
    }
  }
}
```
## Introduction
### Simple filters
LMV-QL designed to make filters on model element properties. Let's imagine we want to make a simple filter for model floors with specified `Area` property value.
![floor properties](./assets/viewer-model-element.png)

There are several possible options to that, depending on what you need:
- you can provide exact path:
`Floors.Floor.[Generic 150mm].Floor.Area = 105.9`
In that case LMV-QL would search elements only inside that subtree (Floors -> Floor -> Generic 150mm -> Floor)
- you can replace any path of your query with `*` symbol:
`*.Floor.Area = 105.9`
- or even search among all elements of your model like:
`*.Area = 105.9`
But what if some other element of your model has `Area` property and it's value is 105.9 squared meters and you want to searcg only among floors? Then use something like that:
`Floors.*.Area = 105.9`
- or maybe you want to query all elements which areas are more than 50 square meters?
`*.Area > 50`

### Complex filters
LMV-QL designed to be able to make queries on models with a complex structure. Let's say, we want to query rectangular mullions from specific curtain wall from [Revit sample file](https://lmv-ql.cadbim.dev)

The main problem is that we need to check properties from different levels of hierarch of the model tree. To do that with LMV-QL we should use logical operators. 

First of all we need to distinguish curtain walls [from our model](https://lmv-ql.cadbim.dev). We can do that by dimensions:
![curtain wall properties](./assets/complex-filter-curtain-wall.png)

So we are ready to write the first part of our filter:

`*.[Curtain Wall].Length = 6202 and *.[Curtain Wall].Area = 26.5`

Then we need to distinguish rectangular mullions from other curtain wall components. We can do that by checking `Type Name` property. If it ends with "rectangular", then we found our mullion object:
![mullion properties](./assets/complex-filter-mullion-properties.png)

So, let's add this to our filter:
`*.[Curtain Wall].Length = 6202 and *.[Curtain Wall].Area = 26.5 && *.[Type Name] like "%rectangular"`

and check it:
![curtain wall mullions search results](./assets/complex-filter-results.png)

### Units

LMV-QL follows the same rules of formatting and values comparison as Autodesk Platform Services viewer does. You can provide `displayUnits` and `displayUnitsPrecision` in the options object when you perform your query like
```ts
const filterOptions = {
  displayUnits: viewer.prefs.get(Autodesk.Viewing.Private.Prefs.DISPLAY_UNITS),
  displayUnitsPrecision: viewer.prefs.get(Autodesk.Viewing.Private.Prefs.DISPLAY_UNITS_PRECISION)
};

const queryResults = await query(viewer.model, lmvQuery, filterOptions);
```
So user can copy numerical values from properties panel directly to the filter query string: `*.Floor.Area = 38.5`

![default settings query](./assets/floor-area-query-with-default-settings.png)

However, if we change precision, we also need to fix the filter string: `*.Floor.Area = 38.46`
![adjusted precision settings](./assets/floor-area-query-with-adjusted-precision-settings.png)

If we are changing display units, then we also should adjust the filter string: `*.Floor.Area = 413.98`
![adjusted display units](./assets/floor-area-query-with-adjusted-display-units-settings.png)

## Query language

### Identificators: hierarchy and element property definition 

You need to join with `.` symbol model tree item names and property into a single string To define LMV-QL hierarchy position and property, e.g. `SomeCategory.SomeSubCategory.SomeProperty`. If your item or property name contains spaces or dots `.` symbols, then put it inside `[` and `]` symbols like `Floors.Floor.[Generic 150mm].Floor.Area`

You can replace any part of the hierarchy path with `*` (except the latest), which would mean `any` in that case
Valid identificators:
- `Floors.Floor.[Generic 150mm].Floor.Area`
- `Floors.*.Area`
- `*.Area`

`Floors.*` - not valid, e.g. any property is not supported

### Elements in hierarchy filters

You can provide a valid identificator with following `!` sign to filter all sub items from model tree. Valid filters:
- `[Plumbing Fixtures]!`
- `Walls.[Curtain Wall]!`
- `Walls.[Curtain Wall].[SH_Curtain wall].[Curtain Wall].[System Panel]!`

`Walls.*!` is not a valid filter

### Simple filters by property value

#### Numerical properties

- property value equal to `identificator = value`:
`Walls.[Basic Wall].*.Width = 300`
- greater than value `identificator > value`:
`*.Floor.Area > 100`
- greater than or equal to value `identificator >= value`
`*.Floor.Area >= 100`
- less than value `identificator < value`
`*.Floor.Area < 100`
- less than or equal to value `identificator <= value`:
`*.Floor.Area <= 100`
- property not equal to value `identificator <> value` or `identificator != value`. Both options are valid:
`*.Floor.Area <> 9` or `*.Floor.Area != 9`

#### String properties

- property value equal to `identificator = value`:
`*.Mark = "207"`
- property value not equal to `identificator <> value` or `identificator != value`. Both options are valid:
`*.Mark <> "205"` or `*.Mark != "205"`
- property value starts with `identificator like "start text%"`:
`*.name like "RPC%"`
- property value ends with `identificator like "%-some further text"`:
`*.name like "%- 300mm Concrete"`

If you want to include a text with quotes like `some "value" of something` then you need to escape quotes with `\` sign:
`category.element.property = "some \"value\" of something"`

If you want to include `%` sign into `like` expression you also need to escape it with `\` sign:
`category.element.property like "%some \% of something"`

>LMV-QL also supports reversed order of aruments, e.g. you can write something like `5 <= *.property and property <= 7`

>LMV-QL also can compare two properties values: `*.Mark = *.[Type Mark]`

#### IN / NOT IN
LMV-QL can check if the model element property is in some list of string or numerical values.

Example:
```
*.Mark in ["204", "207"]
```

LMV-QL also allows to check if the model element proerty is not in the list.

Example:
```
Doors! && *.Mark not in ["204", "207"]
```
> This query selects all doors, , excluding those which Mark property is equal to `204` or `207`

### Logical filters

#### AND operator

LMV-QL allows to define `AND` filter as:
- `and` (case insensitive)
- `&&`
- `&`

Valid `and` filters samples:
- `Windows! and *.Level = "Level 1 Living Rm."`
- `Walls.[Curtain Wall].*.[Assembly Code] = "B2020200" 
&& *.[Type Name] = "64 x 128 rectangular"`

#### OR operator

LMV-QL allows to define `OR` filter as:
- `or` (case insensitive)
- `||`
- `|`

Valid `or` filters samples:
- `*.Mark = "207" or *.Mark = "204"`
- `*.Level = "Level 1" || *.Level = "Level 1 Living Rm."`

#### NOT operator

LMV-QL allows to define `NOT` filter with
- `not` word (case-insensitive), e.g. `not(some_valid_filter)`
- `!` sign, e.g. `!(some_valid_filter)`

Examples:
- `!(Walls! or Floors!)` - all elements matches except those in `Walls` or `Floors` top model tree categorires
- all floors, except those which areas is less than 50 or more than 100: `Floors! and not(*.Floor.Area >= 50 and *.Floor.Area <= 100)`

#### Brackets

LMV-QL allows to combine filters using brackets. Example:
- `Windows! and (*.Level = "Level 1 Living Rm."
or *.name = "M_Skylight")`

### Selection expressions

LMV-QL can contain:
- filter expressions as it was described above
- properties query expressions:
  - with filter expression as well
  - without filter expression
  - with aggregation functions (sum, min, max, avg, count)
  - with an ability to group by single or multiple fields
  - `*` - no filter and returns all property values
  - with filter, returning all property values

#### Simple properties selection

You can use LMV-QL to collect required properties value from the entire model using simple selection expressions without filtering part:
```
*.ElementId as id, *.name as name, *.[Type Name] as type_name
```

Run this query in our [demo application](https://lmv-ql.cadbim.dev) and you'll see query results:
![simple-select-query](./assets/simple-select-query.png)

#### Filtered properties selection

LMV-QL allows to combine selection expressions with filter expressions. Let's collect several properties from [demo model](https://lmv-ql.cadbim.dev) model floors:
```
Floors! -> *.[Type Name] as type_name, *.Area as area, *.Volume as volume, *.Thickness as thickness, *.Perimeter as perimeter
```
![filtered-selection-expression](./assets/filtered-selection-expression.png)

#### Aggregation functions

LMV-QL can aggregate the data collected from model elements properties with the following aggregation functions:
- sum (summs numerical properties values)
- min (gets minimal property value among elements)
- max (gets maximum property value among elements)
- avg (gets average property value among elements)
- count (gets elements count)

The following query will calculate total, maximum, mininimum and average area of all floors in the model:
```
Floors! -> sum(*.Area) as total_area, max(*.Area) as max_area, min(*.Area) as min_area, avg(*.Area) as avg_area, count() as count
```
> You can omit filter part `Floors! ->` to perform calculation on all element in the model

![grouping-query](./assets/grouping-query.png)

**Important note**: you can't mix simple properties selection with aggregation functions, but you can use multiple aggregation functions in the same query as shown above

#### Aggregation functions with grouping

LMV-QL can perform grouping elements by fields you provided in your query.

The following query will calculate total, maximum, mininimum and average area of all walls in the model, grouped by wall type:
```
Walls! -> sum(*.Area) as total_area, max(*.Area) as max_area, min(*.Area) as min_area, avg(*.Area) as avg_area, count() as count group by *.[Type Name]
```

> You can omit filter part `Walls! ->` to perform calculation on all element in the model

![grouping-aggregated-query](./assets/grouping-aggregated-query.png)

#### All node properties selector
You can tell LMV_QL to return all property values with `*` sign like:
```
Walls! -> *
```
Or even simpler `*` expression is also valid to get all nodes properties values

## Headless LMV-QL: query model without viewer
> [!IMPORTANT]
> This is an experimental feature.

You can run LMV-QL queries without adding an entire APS Viewer application, e.g. without `Autodesk.Viewer.GuiViewer3D` (but you still need to reference viewer library and initialize the environment with `Autodesk.Viewing.Initializer`).

A code snippet:
```ts
Autodesk.Viewing.Document.load(urn, async doc => {
  const root = doc.getRoot();
  const bubbleNode = root.getDefaultGeometry(); // or whatever you want

  const queryResults = await headlessQuery(doc, bubbleNode, filterExpression, options);

  /* Do whatever you want with query results */
});
```

## Query settings

Queries settings are defined by:
```ts
{
  attributesCaseSensitive: boolean;
  stringCaseSensitive: boolean;
  leafNodesOnly: boolean;
  displayUnits: string;
  displayUnitsPrecision: number | string;
  dbIds: number[];
  modelBrowserExcludeRoot: boolean;
  modelName: string;
}
```

- `attributesCaseSensitive` defines if indentificators (item in the model tree and property names) are case-sensitive. Default `true`
- `stringCaseSensitive` defines if string comparison is case-sensitive or not, e.g. if `stringCaseSensitive` is `true` then `*.[some property value] = "some text"` would return the element if it's `some property value` is "some text", but not "Some text". Default `true`
- `leafNodesOnly` - if `true` then filter engine returns only leaf nodes from the model tree. Default `true`
- `displayUnits`. Viewer display units. Default is `""` which means "File units". Possible values can be taken from:
```js 
Autodesk.Viewing.Private.displayUnitsEnum
```
- `displayUnitsPrecision`. Viewer display units precision. Default is `""` which means "File precision". Possible values can be taken from:
```js
Autodesk.Viewing.Private.displayUnitsPrecisionEnum
```
- `dbIds` forces LMV-QL to perform query only on the ids were provided by user. Default value is `[]` - perform the query on the entire model

- `modelBrowserExcludeRoot`. Default value is `true`. Set `false` to force users to add model name to queries. Value can be taken from `viewer.config.modelBrowserExcludeRoot`. See also [Root object not visible in Model browser](https://aps.autodesk.com/blog/root-object-not-visible-model-browser) 

- `modelName`. Taken into account only if `modelBrowserExcludeRoot` is `false`. The value could be taken from `model.getDocumentNode().getModelName()` or, probably model config.