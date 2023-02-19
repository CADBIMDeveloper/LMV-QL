# LMV-QL
A query language for filtering model elements in [Autodesk Platform Services (formerly Forge) viewer](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)

> Check out our [demo application](https://lmv-ql.cadbim.dev) with a sample viewer extension
> which allows to run several predefined LMV-QL filters and also allows you
> to test you own filters on the basic sample model

## Usage

### Quick tour
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
}
```
### Filter language

#### Introducion: Simple filter
LMV-QL designed to make filters on model element properties. Let's imagine we want to make a simple filter for model floors with specified `Area` property value.
![floor properties](./assets/viewer-model-element.png)
There are several possible options to that, depending on what you need:
- you can provide exact path:
`Floors.Floor.[Generic 150mm].Floor.Area = 105.9`
In that case LMV-QL would search elements only inside that subtree
- you can replace any path of your query with `*` symbol:
`*.Floor.Area = 105.9`
- or even search among all elements of your model like:
`*.Area = 105.9`
But what if some other element of your model has `Area` property and it's value is 105.9 squared meters and you want to searcg only among floors? Then use something like that:
`Floors.*.Area = 105.9`

#### Introducion: Complex filter demo
