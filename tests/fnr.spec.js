'use strict'

const validator = require('../src/validator')
const chai = require('chai')
const expect = chai.expect

describe("fnr", function () {

   it("should accept a valid one", function () {
      const result = validator.fnr("13097248022")
      return expect(result).to.deep.equal({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept a standard leap year", function () {
      const result = validator.fnr("29029648784")
      return expect(result).to.deep.equal({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept year 00 as valid leap year", function () {
      const result = validator.fnr("29020075838")
      return expect(result).to.deep.equal({
         status: "valid",
         type: "fnr"
      })
   })

   it("should compensate for checksum digits that are 11", function () {
      const result = validator.fnr("15021951940")
      return expect(result).to.deep.equal({
         status: "valid",
         type: "fnr"
      })
   })

   it("should reject if less than 11 digits", function () {
      const result = validator.fnr("1234567890")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr or dnr must consist of 11 digits"]
      })
   })

   it("should reject if more than 11 digits", function () {
      const result = validator.fnr("123456789101")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr or dnr must consist of 11 digits"]
      })
   })

   it("should reject if non-digits are present", function () {
      const result = validator.fnr("1234567891A")
      return expect(result).to.deep.equal({
         status: "invalid",
         reasons: ["fnr or dnr must consist of 11 digits"]
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

   it("should accept valid synthetic NAV users", function () {
      const dollyUsersFnr = [
         "15507600333",
         "29422059278",
         "05440355678",
         "12429400544",
         "12505209719",
         "21483609245",
         "21528704651",
      ]
      dollyUsersFnr.forEach(dollyUser => {
         const result = validator.fnr(dollyUser)
         expect(result).to.deep.equal({
            status: "valid",
            type: "fnr"
         })
      })

   })

   it("should accept valid synthetic Skatt users", function () {
      const skattUserFnr = [
         "17912099997",
         "29822099635",
         "05840399895",
         "12829499914",
         "12905299938",
         "21883649874",
         "21929774873",
      ]
      skattUserFnr.forEach(skattUser => {
         const result = validator.fnr(skattUser)
         expect(result).to.deep.equal({
            status: "valid",
            type: "fnr"
         })
      })

   })
})

describe("dnr", function () {
   // dnr is identical to fnr except for the first digit
   it("should accept a valid one", function () {
      const result = validator.dnr("53097248016")
      return expect(result).to.deep.equal({
         status: "valid",
         type: "dnr"
      })
   })

   it("should accept valid synthetic NAV users with dnr", function () {
      const dollyUsersDnr = [
         "55507608360",
         "69422056629",
         "45440356293",
         "52429405181",
         "52505209540",
         "61483601467",
         "61528703428",
      ]
      dollyUsersDnr.forEach(dollyUser => {
         const result = validator.fnr(dollyUser)
         expect(result).to.deep.equal({
            status: "valid",
            type: "dnr"
         })
      })

   })

   it("should accept valid synthetic Skatt users with dnr", function () {
      const skattUsersDnr = [
         "57912075186",
         "69822075096",
         "45840375084",
         "52829400197",
         "52905200100",
         "61883600222",
         "61929750062"
      ]
      skattUsersDnr.forEach(skattUser => {
         const result = validator.fnr(skattUser)
         expect(result).to.deep.equal({
            status: "valid",
            type: "dnr"
         })
      })

   })

})
