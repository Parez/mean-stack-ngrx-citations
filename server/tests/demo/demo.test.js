/**
 * Created by baunov on 04/11/16.
 */
const expect = require("expect");

function toBeTested(x, y)
{
    return x*y;
}

 it("Should multiply two numbers", () => {
    var res = toBeTested(10,11);

     expect(res).toBe(110).toBeA("number");
 });