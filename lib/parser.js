"use strict";

const espree = require('espree');
const fs = require("fs");
const path = require("path");

function checkForFile(sString) {
    const curDir = process.cwd();
    const stat = fs.lstatSync(path.resolve(curDir, sString));
    var sResturnString = "";
    if (stat.isFile()) {
        sResturnString = fs.readFileSync(path.resolve(curDir, sString));
    }
    return sResturnString;
}

function createAst(sCodeString, iECMAVersion) {
    try {
        return espree.parse(sCodeString, {
            range: false,
            loc: true,
            comment: true,
            tokens: false,
            ecmaVersion: iECMAVersion
        })
    } catch (error) {
        console.log(error);
    }
}

function setupECMAVersion(sGiven) {
    switch (sGiven) {
        case "2015":
            return 6;
        case "2016":
            return 7;
        case "2017":
            return 8;
        case "2018":
            return 9
        case "2019":
            return 10
        case "":
        case undefined:
            return 5;
        default:
            return parseInt(sGiven, 10);
    }
}

function parse(oOptions) {
    var ast = null;
    if (typeof oOptions === "string") {
        var sJSON = checkForFile(oOptions);
        sJSON = "var a = " + sJSON;
        ast = createAst(sJSON, setupECMAVersion());
    } else {
        var filePath = oOptions.file;
        var codeString = oOptions.code;
        var ecmaVer = oOptions.version;
        if (!filePath && !codeString) {
            throw "Error, whether file nor code given";
        }

        if (filePath) {
            var sJSON = checkForFile(filePath);
            sJSON = "var a = " + sJSON;
            ast = createAst(sJSON, setupECMAVersion(ecmaVer));
        }

        if (codeString) {
            //just check if we have correct json
            var sJSON = JSON.stringify(JSON.parse(codeString));
            sJSON = "var a = " + sJSON;
            ast = createAst(sJSON, setupECMAVersion(ecmaVer));
        }
    }
    return ast.body[0].declarations[0].init;
}

module.exports = {
    parse: parse
}