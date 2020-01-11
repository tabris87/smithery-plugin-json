module.exports = {
    rules: [],
    parser: {
        fileEnding: "json",
        parser: require('./lib/parser')
    },
    generator: {
        fileEnding: [] || "",
        generator: require('./lib/generator')
    },
    dependencies: []
    /* {
        pluginName: "",
        version: ""
    } */
}