# LMV-QL
A query language for filtering model elements in [Autodesk Platform Services (formerly Forge) viewer](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)

## Usage

### Quick tour
- install the package: `npm install lmv-ql`
- import query:
```ts
import { query } from "lmv-ql";
```
- run your LMV query
```ts
const queryResults = await query(viewer.model, lmvQuery, filterOptions);
if (!queryResults.error) {
  const dbIds = queryResults.dbIds;
  // do whatever you want with the elements db ids returned by filter engine
}
```
