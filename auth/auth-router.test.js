const supertest = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

afterAll(async () => {
    await db('users').truncate()
})

describe('endpoints tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy()
    })
    describe('tests the register functionality', () => {
        describe('you can register', () => {
            it('recieves a 201', () => {
                return supertest(server)
                    .post('/api/auth/register')
                    .send({username: "uniquename", password: "password"})
                    // .expect('Content-Type', /json/)
                    .expect(201)
            })
            it('returns a 400 if you dont send valid user', () => {
                return supertest(server)
                    .post('/api/auth/register')
                    .send({username: "seconduniqueusername"})
                    .expect(400)
            })
            it('returns 500 if your username is not unique', () => {
                return supertest(server)
                    .post('/api/auth/register')
                    .send({username: "uniquename", password: "password"})
                    .expect(500)
            })
        })
    })
    describe('tests the login functionality', () => {
        describe('you can login', () => {
            it('receives a 401 if you dont provide credentials', () => {
                return supertest(server)
                    .post('/api/auth/login')
                    .send({username: "notunique", password: "password"})
                    .expect(401)
            })
            it('receives a 200 upon successful login', () => {
                return supertest(server)
                    .post('/api/auth/login')
                    .send({username: "uniquename", password: "password"}) 
                    .expect(200)
            })

        })
    })
    describe('tests the jokes endpoint', () => {
        it('you can get the jokes if youre logged in', () => {
            return supertest(server)
                    .get('/api/jokes')
                    .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibWFyYzIiLCJpYXQiOjE1OTAxNjI0MjksImV4cCI6MTU5MDI0ODgyOX0.F6_OWXjzrMrtOC4c0YXTirW20cflZkOLfIfM-2R1ykA")
                    .expect(200)
        })
        it('gives you a 401 if you dont have a valid token', () => {
            return supertest(server)
                    .get('/api/jokes')
                    .set('Authorization', 'a;laskdjf;lkj;')
                    .then(response => {
                        expect(response.status).toBe(401)
                })
        })
    })
})