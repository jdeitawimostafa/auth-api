'use strict';

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../src/auth/middleware/bearer.js');
const v1Route = require('../src/routes/v1.js');
const v2Route = require('../src/routes/v2.js');

const mockRequest = supergoose(server);

let users = {
    admin: { username: 'admin', password: 'password' },
    editor: { username: 'editor', password: 'password' },
    user: { username: 'user', password: 'password' },
  };

  let foodObj = {
      name:'apple',
      calories:'22',
      type:'FRUIT'
  }

describe('bearer-token',() => {
    

        Object.keys(users).forEach(userType => {
      
          describe(`${userType} users`, () => {
    it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)

      });

      it('can signin with basic', async () => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)

      });

      it('can create one by using v1 api', async () => {

        const response = await mockRequest.post('/api/v1/food').send(foodObj);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(foodObj.username)

      });


    })
});

       
    
});