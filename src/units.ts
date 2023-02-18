/*
These code is borrowed from Autodesk viewer, because we have to pack it into the function code running inside a web worker
where we don't have any access to the global scope, e.g. Autodesk namespace
see webpack://LMV/src/measurement/UnitFormatter.js, webpack://LMV/src/measurement/DisplayUnits.js
 */

export function convertUnits(fromUnits: string | undefined, toUnits: string | undefined, calibrationFactor: number, d: number, type?: string, dpi?: number) {
    fromUnits = fixUnitString(fromUnits);
    toUnits = fixUnitString(toUnits);

    calibrationFactor = calibrationFactor ? calibrationFactor : 1;
    dpi = dpi || 72;

    if (fromUnits === toUnits && calibrationFactor === 1)
        return d;

    const M = ModelUnits;
    const U = UnitScales;

    var toFactor = 1;
    switch (toUnits) {
        case M.MILLIMETER: toFactor = 1 / U[M.MILLIMETER]; break;
        case M.CENTIMETER: toFactor = 1 / U[M.CENTIMETER]; break;
        case M.METER: toFactor = 1; break;
        case M.INCH: toFactor = 1 / U[M.INCH]; break;
        case M.FOOT: toFactor = 1 / U[M.FOOT]; break;
        case "ft-and-fractional-in": toFactor = 1 / U[M.FOOT]; break;
        case "ft-and-decimal-in": toFactor = 1 / U[M.FOOT]; break;
        case "decimal-in": toFactor = 1 / U[M.INCH]; break;
        case "decimal-ft": toFactor = 1 / U[M.FOOT]; break;
        case "fractional-in": toFactor = 1 / U[M.INCH]; break;
        case "m-and-cm": toFactor = 1; break;
        case M.POINT: toFactor = 1 / U[M.INCH] * dpi; break;
    }


    var fromFactor = 1;
    switch (fromUnits) {
        case M.MILLIMETER: fromFactor = U[M.MILLIMETER]; break;
        case M.CENTIMETER: fromFactor = U[M.CENTIMETER]; break;
        case M.METER: fromFactor = U[M.METER]; break;
        case M.INCH: fromFactor = U[M.INCH]; break;
        case M.FOOT: fromFactor = U[M.FOOT]; break;
        case "ft-and-fractional-in": fromFactor = U[M.FOOT]; break;
        case "ft-and-decimal-in": fromFactor = U[M.FOOT]; break;
        case "decimal-in": fromFactor = U[M.INCH]; break;
        case "decimal-ft": fromFactor = U[M.FOOT]; break;
        case "fractional-in": fromFactor = U[M.INCH]; break;
        case "m-and-cm": fromFactor = 1; break;
        case M.POINT: fromFactor = U[M.INCH] / dpi; break;
    }


    if (type === "square") {
        return d ? d * Math.pow(toFactor * fromFactor * calibrationFactor, 2) : 0;
    } else if (type === "cube") {
        return d ? d * Math.pow(toFactor * fromFactor * calibrationFactor, 3) : 0;
    }
    return d ? d * toFactor * fromFactor * calibrationFactor : 0;
}


function fixUnitString(unit?: string): string | undefined {
    var _unit;
    unit = (_unit = unit) === null || _unit === void 0 ? void 0 : _unit.toLowerCase();
    //Why are translators not using standard strings for those?!?!?!?
    switch (unit) {
        case 'meter':
        case 'meters':
        case 'm':
            return ModelUnits.METER;
        case 'foot':
        case 'feet':
        case 'ft':
            return ModelUnits.FOOT;
        case 'feet and inches':
        case 'inch':
        case 'inches':
        case 'in':
            return ModelUnits.INCH;
        case 'centimeter':
        case 'centimeters':
        case 'cm':
            return ModelUnits.CENTIMETER;
        case 'millimeter':
        case 'millimeters':
        case 'mm':
            return ModelUnits.MILLIMETER;
        case 'point':
        case 'points':
        case 'pt':
            return ModelUnits.POINT;
        default:
            return unit;
    }

}

export const ModelUnits = {
    METER: 'm',
    CENTIMETER: 'cm',
    MILLIMETER: 'mm',
    FOOT: 'ft',
    INCH: 'in',
    POINT: 'pt'
} as const;


const UnitScales = {
    [ModelUnits.METER]: 1.0,
    [ModelUnits.CENTIMETER]: 0.01,
    [ModelUnits.MILLIMETER]: 0.001,
    [ModelUnits.FOOT]: 0.3048,
    [ModelUnits.INCH]: 0.0254,
    [ModelUnits.POINT]: 0.0254 / 72 //A typographical point is 1/72 of an international inch
} as const;