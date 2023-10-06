describe('template spec', () => {
  it('make a rest request', () => {
    cy.visit('https://example.cypress.io');

    let element;
    cy.request('https://jsonplaceholder.typicode.com/todos/1').as('todo');
    cy.get('@todo').then((todo) => {
      expect(todo.status).to.eq(200);
      element = todo.body;
      // eslint-disable-next-line no-console
      console.log({ todo: todo.body });
    });
  });

  it('make a graphql request', () => {
    cy.visit('https://example.cypress.io');

    cy.request({
      method: 'POST',
      url: 'https://graphqlzero.almansi.me/api',
      headers: { 'content-type': 'application/json' },
      body: {
        query: `
          {
            user(id: 1) {
              id
              name
            }
          }
        `,
      },
    }).as('user');

    cy.get('@user').then((todo) => {
      expect(todo.status).to.eq(200);
      // eslint-disable-next-line no-console
      console.log({ user: todo.body.data.user });
    });
  });
});
