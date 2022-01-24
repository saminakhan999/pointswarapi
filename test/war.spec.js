const request = require('supertest');
const app = require('../app');

describe('war', () => {
    test('responds to GET / with a 200 on success', function(done) {
        request(app)
            .get('/war')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    test('retrieves a person by name', (done) => {
        request(app)
            .get('/war/gobza')
            .expect(200)
            .expect({ name: 'gobza', points: 100000000000000000000 }, done);
    });


    test('Create a person with POST /with status 201', (done) => {
        request(app)
        .post('/war')
        .expect('Content-Type', /json/)
        .send({
            name: "noob",
            points: 0
        })
    
        .expect((res) => {
            res.body.name = 'noob',
            res.body.points = 0
        })
        .expect(201, done)

    });

    test('Update a person with PATCH', (done) => {
        request(app)
        .patch('/war/gobsa')
        .expect('Content-Type', /json/)
        .send({
            points: 648484
        })
    
        .expect((res) => {
            res.body.points = 648484
        })
        .expect(200, done)

    });




    test('responds to DELETE / with status 204', (done) => {
        request(app)
            .delete('/war')
            .expect(204, done);
    });
});
