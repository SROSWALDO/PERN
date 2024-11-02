import request from 'supertest'
import server from "../server";


describe('GET /api', () => {
    test('should send back and json response', async () => {
        const res = await request(server).get('/api')
        
        expect(res.status).toBe(200)
        
    })
})