// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here

    // afterAll(async()=>{
    //     await db.sync({ force: true });
    // })


    test('return music with the id given', async()=>{
        const response = await request(app).get('/musicians/1')
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Mick Jagger',
            instrument: 'Voice'
            }))
    })

    test("Return all musician", async()=>{
        const response = await request(app).get('/musicians')
        expect(response.body.length).toBe(3)
    })

    test("Add Musician", async()=>{
        const response = await request(app).post('/musicians').send({
            name: 'Mick Jagger',
            instrument: 'Voice'
            })
        expect(response.body).toEqual(expect.objectContaining({
           name: 'Mick Jagger',
            instrument: 'Voice'
          }))
    })

    test('Verify that PUT /musicians/:id request updates the musician array with the provided', async()=>{
        const response = await request(app).put('/musicians/3').send({
            name: 'Zayn Malik',
            instrument: 'Voice'
            })
          expect(response.body).toEqual(expect.objectContaining({
            name: 'Zayn Malik',
            instrument: 'Voice'
          }))
    })

    test('Test that DELETE /musicians/:id deletes the musician with the provided id from the db', async()=>{
        const response = await request(app).delete('/musicians/3')
          expect(response.body).toEqual(expect.objectContaining({
           name: 'Zayn Malik',
            instrument: 'Voice'
          }))
    })

    
})

describe("Band endpoints",()=>{
  test('return band with the id given', async()=>{
    const response = await request(app).get('/bands/1')
    expect(response.body).toEqual(expect.objectContaining({
         name: 'The Beatles',
          genre: 'Rock'
        }))
})

test("Return all bands", async()=>{
    const response = await request(app).get('/bands')
    expect(response.body.length).toBe(3)
})

test("return an error if the values passed in the musician post method is invalid", async()=>{
  const response = await request(app).post('/musicians').send({
    name: 'Zayn Malik'
  })

  expect(response.body.error[0].msg).toBe('Invalid value')
})
})