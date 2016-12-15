/**
 * Created by baunov on 29/10/16.
 */
const _ = require("lodash");

var testObj1 = {id: "isahfaasdf33", first: "SomeName", last: "SomeLast", other: "Sif", likes: 1, dislikes: 4};
var testObj2 = {ifirst: "SomeOthe", last: "Last2", other: "sdf", likes: 6, dislikes: 4};

console.log(_.pick(testObj1, ["id", "first"]));
console.log(_.pick(testObj2, ["id", "last"]));



