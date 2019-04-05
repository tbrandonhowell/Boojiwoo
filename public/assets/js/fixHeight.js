console.log("fixHeight() loaded");

var fixHeight = function(leftHeight,rightHeight) {
    if (leftHeight > rightHeight) {
      console.log("left is larger");
      var newTopMargin = (leftHeight - rightHeight) / 2;
      console.log({newTopMargin});
      var marginToAdjust = "right";
      console.log({marginToAdjust});
    } else if (leftHeight < rightHeight) {
      console.log("right is larger");
      var newTopMargin = (rightHeight - leftHeight) / 2;
      console.log({newTopMargin});
      var marginToAdjust = "left";
      console.log({marginToAdjust});
    } else {
      var marginToAdjust = "none";
      var newTopMargin = "";
    }
    return [marginToAdjust,newTopMargin];
  }

  module.exports = fixHeight;