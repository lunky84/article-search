const articles = require('./searchIndex')

test('does something', () => {
    const articlesIn = [{
        id: "file",
        content: "data"
    }, {
        id: "file",
        content: "data"
    },
    {
        id: "file",
        content: "data"
    }];
    const articlesOut = [{
        id: "file",
        content: "data"
    }];

	expect(articles.removeDuplicates(articlesIn)).toStrictEqual(articlesOut);
})