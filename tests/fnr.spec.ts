'use strict'

import { fnr, dnr, hnr, tnr, dnrAndHnr, dnrAndTnr } from '../src/validator'

describe("fnr", function () {

   it("should accept a valid one", function () {
      const result = fnr("13097248022")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept a standard leap year", function () {
      const result = fnr("29029648784")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept year 00 as valid leap year", function () {
      const result = fnr("29020075838")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should reject if date is > 28 feb in a non leap year", function () {
      const result = fnr("29020112345")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match", "invalid date"]
      })
   })

   it("should compensate for checksum digits that are 11", function () {
      const result = fnr("15021951940")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should reject if less than 11 digits", function () {
      const result = fnr("1234567890")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["fnr, dnr or hnr must consist of 11 digits"]
      })
   })

   it("should reject if more than 11 digits", function () {
      const result = fnr("123456789101")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["fnr, dnr or hnr must consist of 11 digits"]
      })
   })

   it("should reject if non-digits are present", function () {
      const result = fnr("1234567891A")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["fnr, dnr or hnr must consist of 11 digits"]
      })
   })

   it("should reject if checksum 1 is invalid", function () {
      const result = fnr("13097248032")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should reject if checksum 2 is invalid", function () {
      const result = fnr("13097248023")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should reject if day is invalid", function () {
      const result = fnr("32127248022")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match", "invalid date"]
      })
   })

   it("should reject if month is invalid", function () {
      const result = fnr("13137248022")
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match", "invalid date"]
      })
   })

})

describe("dnr", function () {
   // dnr is identical to fnr except for the first digit
   it("should accept a valid one", function () {
      const result = dnr("53097248016")
      return expect(result).toEqual({
         status: "valid",
         type: "dnr"
      })
   })
})

describe("hnr", function () {
   // hnr is identical to fnr except for the third digit
   it("should accept a valid one", function () {
      const result = hnr("13527248013")
      return expect(result).toEqual({
         status: "valid",
         type: "hnr"
      })
   })
})
describe("tnr", function () {
   // tnr is identical to fnr except for the third digit which is increased with 8
   it("should accept a valid one", function () {
      const result = tnr("10915596784");
      return expect(result).toEqual({
         status: "valid",
         type: "tnr",
      });
   });
})


describe("dnr-and-hnr", function () {
   // combined dnr and hnr - so both first and third digit is increased with 4
   it("should accept a valid one", function () {
      const result = dnrAndHnr("68467038838");
      return expect(result).toEqual({
         status: "valid",
         type: "dnr-and-hnr",
      });
   });
})
;

describe("dnr-and-tnr", function () {
   // combined dnr and tnr - so first digit is increased with 4 and third digit is increased with 8
   it("should accept a valid one", function () {
      const result = dnrAndTnr("50846202355");
      return expect(result).toEqual({
         status: "valid",
         type: "dnr-and-tnr",
      });
   });
})
;

describe("New 2032 checksum standard", function () {
   // Tests for the new checksum calculation that allows multiple valid k1 values
   
   it("should accept person born 02.01.2032 with new checksum", function () {
      // Example from spec: fødselsdato='020132', individnummer='999', k1=9, k2=7
      const result = fnr("02013299997")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept person 1 born 30.10.1982 with new checksum (rest=0)", function () {
      // Example from spec: fødselsdato='301082', individnummer='999', k1=2, k2=0
      const result = fnr("30108299920")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept person 2 born 30.10.1982 with new checksum (rest=1)", function () {
      // Example from spec: fødselsdato='301082', individnummer='999', k1=3, k2=9
      const result = fnr("30108299939")
      return expect(result).toEqual({
         status: "valid",
         type: "fnr"
      })
   })

   it("should accept multiple valid k1 values for same birth date and individual number", function () {
      // Both k1 values should be valid for the same person
      const result1 = fnr("30108299920") // k1=2 (rest=0)
      const result2 = fnr("30108299939") // k1=3 (rest=1)
      
      expect(result1.status).toBe("valid")
      expect(result2.status).toBe("valid")
   })

   it("should still reject invalid checksums with new standard", function () {
      // Invalid k1 value that doesn't match any of the 4 possible values
      const result = fnr("02013299987") // Wrong k1 (should be 9)
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should still reject invalid k2 with new standard", function () {
      // Valid k1 but invalid k2
      const result = fnr("02013299996") // k1=9 is correct, but k2 should be 7
      return expect(result).toEqual({
         status: "invalid",
         reasons: ["checksums don't match"]
      })
   })

   it("should work with dnr using new checksum standard", function () {
      // DNR version of 30.10.1982 with new checksum: day+40 = 70
      // Using the same individual number 999 as the fnr example
      const result = dnr("70108299914")
      return expect(result).toEqual({
         status: "valid",
         type: "dnr"
      })
   })
})
