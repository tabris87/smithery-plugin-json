"use strict";

const espree = require('espree');

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

function parse(sCodeString, oOptions) {
    var ecmaVer = oOptions.version;

    //just check if we have correct json
    var sJSON = JSON.stringify(JSON.parse(sCodeString));
    sJSON = "var a = " + sJSON;

    //parse the 'javascript variable' and return the JSON part only
    var ast = createAst(sJSON, setupECMAVersion(ecmaVer));
    return ast.body[0].declarations[0].init;
}

module.exports = {
    parse: parse
}