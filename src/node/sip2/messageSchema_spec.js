var should = require("should"),
    MessageSchema = require("./messageSchema");

describe("sip2/messageSchema", function() {
    var schema = new MessageSchema("23", "patronStatusRequest")
        .withFixedParameter("language", 3, "string")
        .withFixedParameter("transactionDate", 18, "date")
        .withNamedParameter("institutionId", "AO", "string")
        .withNamedParameter("patronIdentifier", "AA", "string")
        .withNamedParameter("terminalPassword", "AC", "string")
        .withNamedParameter("patronPassword", "AD", "string");

    describe("Simple", function() {
        it("should have an id", function() {
            schema.id.should.equal("23");
        });
        it("should have a name", function() {
            schema.name.should.equal("patronStatusRequest");
        });
        it("should be impossible to change the id", function() {
            schema.id = "changed";
            schema.id.should.equal("23");
        });
        it("should be impossible to change the name", function() {
            schema.name = "changed";
            schema.name.should.equal("patronStatusRequest");
        });
    });
    describe("Fixed Parameters", function() {
        it("should have two fixed parameters", function() {
            schema.numFixedParameters.should.equal(2);
        });
        it("should have a first fixed parameter called 'language'", function() {
            schema.getFixedParameterByPosition(0).name.should.equal("language");
        });
        it("should not have a third fixed parameter", function() {
            should.not.exist(schema.getFixedParameterByPosition(3));
        });
        it("should have a fixed parameter called 'transactionDate'", function() {
            should.exist(schema.getFixedParameterByName("transactionDate"));
        });
        it("should not have a fixed parameter called 'unknown'", function() {
            should.not.exist(schema.getFixedParameterByName("unknown"));
        });
    });
    describe("Named Parameters", function() {
        it("should have four named parameters", function() {
            schema.numNamedParameters.should.equal(4);
        });
        it("should have a named parameter 'AO' called 'institutionId'", function() {
            schema.getNamedParameterByKey("AO").name.should.equal("institutionId");
        });
        it("should have a named parameter called 'institutionId'", function() {
            should.exist(schema.getNamedParameterByName("institutionId"));
        });
    });
});


