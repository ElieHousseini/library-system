type isValidSKUType = string

const isValidSKU = (sku: isValidSKUType) : boolean => {
  return /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/i.test(sku);
}

type hasTooMuchSpacesType = string

const hasTooMuchSpaces = (text: hasTooMuchSpacesType) : boolean => {
  const regex = /^ +|\s{2,}| +$/g;
  return regex.test(text);
}

type isNumericType = string

const isNumeric = (text: isNumericType): boolean => {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(text);
}

type isEmptyType = string

const isNotEmpty = (value: isEmptyType) : boolean => {
    return !(value === undefined || value === null || value === "" || /^\s*$/.test(value));
} 

export {isValidSKU, isNotEmpty, hasTooMuchSpaces, isNumeric}