"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yoga_1 = require("yoga");
/*
type Query {
  hello(name: String!): String!
  user(name: String!): User!
}
*/
exports.Query = yoga_1.queryType({
    definition: function (t) {
        t.string('hello', {
            args: {
                name: yoga_1.stringArg(),
            },
            resolve: function (root, _a) {
                var name = _a.name;
                return "Hello " + name;
            },
        });
        t.list.field('users', {
            type: 'User',
            resolve: function (root, args, ctx) {
                return ctx.data.users;
            },
        });
    },
});
//# sourceMappingURL=Query.js.map