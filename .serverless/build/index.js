"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var namematcher_exports = {};
__export(namematcher_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(namematcher_exports);
var namesList = [
  "David Smith \u5927\u536B \u65AF\u5BC6\u65AF",
  "Yueling Zhang \u6708\u6797\u5F20",
  "Huawen Wu \u534E\u6587\u5434",
  "Annie Lee \u674E\u5B89\u59AE",
  "vineeth"
];
var handler = async (event) => {
  const inputName = event.queryStringParameters?.name || "";
  if (!inputName.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Input name cannot be empty or null"
      })
    };
  }
  const bestMatch = findBestMatch(inputName, namesList);
  if (!bestMatch) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Match not found"
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Ready to match",
      input: inputName,
      match: bestMatch
    })
  };
};
function findBestMatch(input, names) {
  const inputParts = input.trim().toLowerCase().split(/\s+/).sort();
  let bestMatch = null;
  let bestMatchScore = -1;
  for (const name of names) {
    const nameParts = name.trim().toLowerCase().split(/\s+/).sort();
    if (inputParts.every((part) => nameParts.some((namePart) => namePart.includes(part)))) {
      return name;
    }
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=index.js.map
