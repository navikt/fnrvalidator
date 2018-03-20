'use strict'

const validator = require('../src/validator')
const chai = require('chai')
const expect = chai.expect

describe("fnr", function () {

   it("should accept a valid one", function () {
      const result = validator.fnr("13097248022")
      return expect(result).to.deep.equal({
         status: "valid"
      })
   })
   
   it("should reject if less than 11 digits", function () {
      const result = validator.fnr("1234567890")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr must consist of 11 digits"]
      })
   })

   it("should reject if more than 11 digits", function () {
      const result = validator.fnr("123456789101")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr must consist of 11 digits"]
      })
   })

   it("should reject if non-digits are present", function () {
      const result = validator.fnr("1234567891A")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr must consist of 11 digits"]
      })
   })

   it("should reject if checksum 1 is invalid", function () {
      const result = validator.fnr("13097248032")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should reject if checksum 2 is invalid", function () {
      const result = validator.fnr("13097248023")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should reject if day is invalid", function () {
      const result = validator.fnr("32127248022")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["checksums don't match", "invalid date"]
      })
   })

   it("should reject if month is invalid", function () {
      const result = validator.fnr("13137248022")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["checksums don't match", "invalid date"]
      })
   })

})

describe("dnr", function () {
   // dnr is identical to fnr except for the first digit
   it("should accept a valid one", function () {
      const result = validator.dnr("53097248016")
      return expect(result).to.deep.equal({
         status: "valid"
      })
   })
})
