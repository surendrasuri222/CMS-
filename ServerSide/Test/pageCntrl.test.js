process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies

let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../server');
chai.should();
let expect = chai.expect();

chai.use(chaiHttp);

const SamplePage = {
    "PageTitle": "The divine Comedy",
    "category": "Comedy",
    "director": "Mr. Bala Vighnesh",
    "description": "The Girl in Room 105 is the eighth novel and the tenth book overall written by the Indian author Chetan Bhagat."

}


describe('/Test Pages', () => {
    it('it should GET all the pages', (done) => {
        chai.request(server)
            .get('/api/page')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        done();
    });

    it('it should post a page', (done) => {

        chai.request(server)
            .post('/api/page')
            .send(SamplePage)
            .end((err, res) => {
                res.should.have.status(201);

                res.body.should.be.a('object');
                res.body.should.have.property('PageTite');
                res.body.should.have.property('category');
                res.body.should.have.property('director');
                res.body.should.have.property('description');

            });
        done();
    })



    it('should update a page successfully', (done) => {
        const id = '1234567890'; // sample id
        const modifiedValue = { PageTitle: 'Modified Title', category: 'Modified Category', director: 'modified author', description: 'Modified Discription' };
        const expectedResult = { ...modifiedValue, _id: id }; // Expected result after update

        chai.request(server)
            .put(`/api/page/${id}`)
            .send(modifiedValue)
            .end((err, res) => {
                expect(res).to.have.status(204);
                expect(res.body).to.deep.equal(expectedResult);

            });
        done();
    });
    it('should handle page not found error', (done) => {
        const id = '1234567890'; // sample id
        const modifiedValue = { PageTitle: 'Modified Title', category: 'Modified Category', director: 'modified author', description: 'Modified Discription' };
        const errorMessage = 'Page not found';

        chai.request(server)
            .put(`/api/page/${id}`)
            .send(modifiedValue)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal(`Item not found ${errorMessage}`);

            });
        done();
    });

    it('should delete a page successfully', (done) => {
        const id = '1234567890'; // sample id

        chai.request(server)
            .delete(`/api/page/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.text).to.equal("deleted sucessfuly");

            });
        done();
    });

    it('should handle page not found error', (done) => {
        const id = '1234567890'; // sample id

        chai.request(server)
            .delete(`/api/page/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal("id not found");

            });
        done();
    });

    it('should retrieve a page successfully', (done) => {
        const id = '65c86bf2d71bb918cb7dc9a6'; // sample id

        chai.request(server)
            .get(`/api/page/${id}`)
            .end((err, res) => {
                chai.expect(res.body).to.have.property("_id", id);
                res.should.have.status(200)
                res.should.be.a.Arguments('object');


            });
        done();
    });


    it('should handle missing page ID', (done) => {
        const id = "";

        chai.request(server)
            .get(`/api/page/${id}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.text).to.equal(`Page Id:${id} does not exist`);

            });
        done();
    });




})