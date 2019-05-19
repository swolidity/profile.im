"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yoga_1 = require("yoga");
/*
type User {
  id: ID!
  name: String!
}
*/
exports.User = yoga_1.objectType({
    name: 'User',
    definition: function (t) {
        t.id('id');
        t.string('name');
    },
});
//# sourceMappingURL=User.js.map