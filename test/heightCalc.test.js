var expect = require("chai").expect;
var fixHeight = require("../public/assets/js/fixHeight");

describe("fixHeight() function", function() {
    it("should take the height of two divs (left and right), and determine which is shortest, then return the top margin that should be applied to the shortest", function() {
        expect(fixHeight(600,280)[0]).to.equal("right");
        expect(fixHeight(600,280)[1]).to.equal(160);
    })
})