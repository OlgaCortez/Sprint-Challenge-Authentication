const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');

describe('GET /jokes', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should return status 201 on login', async () => {    
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'phoebe', password: 'test' })
    
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'phoebe', password: 'test' })
            expect(loginResponse.status).toBe(200)
        console.log(loginResponse.body)

    })

    it('should return a token', async () => {    
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'phoebe', password: 'test' })
    
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'phoebe', password: 'test' })
            expect(loginResponse.body.message).toMatch('Welcome phoebe!')
        console.log(loginResponse.body)

    })


})

describe('POST /register', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should register member to db', async () => {        
        const newUser = await request(server).post('/api/auth/register')
            .send({ username: 'phoebe', password: 'test' })
            expect(newUser.body.username).toMatch(/phoebe/)
        
    })

    it('should return a status of 201', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'phoebe', password: 'test' })
        expect(response.status).toBe(201)
    })

})