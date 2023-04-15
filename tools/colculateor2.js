"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeObjectToJsonFile = exports.calculateAverageLoadTime = void 0;
const test_1 = require("@playwright/test");
const fs = __importStar(require("fs"));
async function calculateAverageLoadTime(results) {
    let totalLoadTime = 0;
    const browser = await test_1.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    for (const result of results) {
        const time = Date.now();
        await Promise.all([
            page.goto(result.link, { timeout: 60000 }),
            page.waitForNavigation({ timeout: 100000 }),
        ]);
        const timeSpent = (Date.now() - time) / 1000;
        result.loadtime = timeSpent.toString();
        totalLoadTime += timeSpent;
    }
    const averageTime = totalLoadTime / results.length;
    await browser.close();
    return averageTime;
}
exports.calculateAverageLoadTime = calculateAverageLoadTime;
async function writeObjectToJsonFile(objectToWrite, filePath) {
    const resultJson = JSON.stringify(objectToWrite);
    fs.writeFileSync(filePath, resultJson);
    console.log(`JSON written to ${filePath}:`, resultJson);
}
exports.writeObjectToJsonFile = writeObjectToJsonFile;
