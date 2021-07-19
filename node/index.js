const
    {ApolloServer} = require('apollo-server'),
    {readFileSync} = require('fs'),
    typeDefs = readFileSync('./typeDefs.graphql', 'utf-8'),
    {users, categories, goods, orders} = require('./init-data');

const resolvers = {

    Query: {
        getGood: (good, {goodId}) => goods.find(item => item.id === goodId),
        getGoods: () => goods,
        getGoodsOnCategory: (parent, {categoryId}) => goods.filter(item => item.categoryId === categoryId),
        getUser: (parent, {id}) => users.find(item => item.id === id),
        getUsers: () => users
    },

    Mutation: {
        addGood(good, args) {
            const newGood = {
                id: String(goods.length + 1),
                ...args
            };
            goods.push(newGood);
            return newGood;
        },

        addOrder(order, args) {
            const newOrder = {
                id: String(orders.length + 1),
                ...args
            };
            orders.push(newOrder);
            return newOrder
        }
    },

    Category: {
        goodIds: ({id}) => goods.filter(item => item.categoryId === id)
    },

    Good: {
        categoryId: ({categoryId}) => categories.find(item => item.id === categoryId)
    },

    User: {
        orderIds: ({id}) => orders.filter(({userId}) => userId === id)
    },

    Order: {
        buyer: ({userId}) => users.find(item => item.id === userId),
        goodIds: ({goodIds}) => goodIds.map(productId => goods.find(({id}) => id === productId))
    },

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen()
    .then(({url}) => console.log(`Server activated on ${url}`));