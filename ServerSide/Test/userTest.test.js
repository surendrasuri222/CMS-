//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/usermodel');

//Require the dev-dependencies

let chai = require('chai');
const request = require('supertest');

let chaiHttp = require('chai-http');
let server = require('../server');
const jwt = require('jsonwebtoken');
let should = chai.should();
let { expect } = chai.expect;
const sinon = require('sinon');


chai.use(chaiHttp);

const validTempUser = {
    "userName": "Sam",
    "email": "sam1234@gmail.com",
    "password": "secret@123",
    "role": "guest",
    "gender": "Male",
    "age": "22",
    "interest": "[Sports,Music,Academics]"

}


const invalidTempUser = {
    "userName": "Leo",
    "password": "secret@123",
    "role": "guest",

}


//Test the /GET route

describe('Test /GET user', () => {



    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        done();
    });

    it("should get user by id", (done) => {
        const id = "65c86e8b6429530bde3ba26f";
        request(server)
            .get(`/api/users/${id}`)
            .end(function (err, res) {

                res.should.have.status(200);
            });
        done();
    });


    it("should get user by id", (done) => {
        const id = "65c86e8b6429530bde3ba26f";
        request(server)
            .get(`/api/users/${id}`)
            .end(function (err, res) {

                res.should.have.be.a('array');
            });
        done();
    });




    it('it should post a user', (done) => {

        chai.request(server)
            .post('/api/users/add')
            .send(validTempUser)
            .end((err, res) => {
                res.should.have.status(201);

                res.body.should.be.a('object');
                res.body.should.have.property('userName');
                res.body.should.have.property('password');
                res.body.should.have.property('email');
                res.body.should.have.property('role');
                res.body.should.have.property('gender');
                res.body.should.have.property('age');
                res.body.should.have.property('interest');

            });
        done();
    })




}); //end of describe