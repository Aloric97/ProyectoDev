let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')


//assertion style
chai.should()

chai.use(chaiHttp)

describe('Products API', () => {


    /**
    * Test the GET route
    */
    describe("GET /api/product", () => {
        it("It should GET all the products", (done) => {
            chai.request(app)
                .get("/api/product")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(0);
                    done();
                })
        })
    })

    /**
     *
     * 
        * Test the POST route
        */
    describe("POST /api/product", () => {
        it("It should POST a new product", (done) => {
            const product = {
                name: "test",
                description: "test",
                price: 100,
                stock: 10
            }
            chai.request(server)
                .post("/api/product")
                .send(product)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        })
    })

    /**
     * 
     * test the get by id 
     */
    describe("GET /api/product/:id", () => {
        it("It should GET a product by ID", (done) => {
            const productId = "99999";
            chai.request(server)
                .get("/api/product/" + productId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('description');
                    response.body.should.have.property('price');
                    response.body.should.have.property('stock');
                    done();
                })
        })
    })
})