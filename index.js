module.exports = {
    /* rules: [], */
    parser: {
        fileEnding: "json",
        parser: require('./lib/parser')
    },
    generator: {
        fileEnding: "json",
        generator: require('./lib/generator')
    }
    /* ,
        dependencies: [] */
    /* {
        pluginName: "",
        version: ""
    } */
}