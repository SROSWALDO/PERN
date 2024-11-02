import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {

    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    test('sgould crate a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - testing",
            price: 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
    })
})

describe('GET /api/products', () => {
    test('FET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
})

describe('GET /api/products/:id', () => {
    test('Should return a 404 response for a non-existent product', async () => {
        const productID = 2000
        const response = await request(server).get(`/api/products/${productID}`)
        expect(response.status).toBe(404)
    })

    test('Should check a valid ID in the url', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
    })
})

describe('PUT /api/products/:id', () => {
    test('should display validation error messages when u[dating a product', async() => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})

describe('DELETE /api/products/:id', () => {
    test('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    test('Should return a 404 response for a non existent products', async () => {
        const productID = 2000
        const response = await request(server).delete(`/api/products/${productID}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    })

    test('Shpuld delete a product', async() => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.status).not.toBe(404)
    })
})