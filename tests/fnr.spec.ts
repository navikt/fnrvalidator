'use strict'

import { fnr, dnr, hnr, tnr, dnrAndHnr, dnrAndTnr, type ValidationResult, type ErrorResult } from '../src/validator.ts'

function deepEqual(a: ValidationResult | ErrorResult | string, b: ValidationResult | ErrorResult | string): boolean {
   if (a === b) return true
   if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
   const keysA = Object.keys(a)
   const keysB = Object.keys(b)
   if (keysA.length !== keysB.length) return false
   for (const key of keysA) {
      if (!deepEqual((a as Record<string, ValidationResult | ErrorResult | string>)[key], (b as Record<string, ValidationResult | ErrorResult | string>)[key])) return false
   }
   return true
}

function assertEqual(actual: ValidationResult | ErrorResult | string, expected: ValidationResult | ErrorResult | string, testName: string): void {
   if (!deepEqual(actual, expected)) {
      throw new Error(`${testName}\n\nExpected: ${JSON.stringify(expected)}\nReceived: ${JSON.stringify(actual)}`)
   }
}

// fnr

{
   const result = fnr("13097248022")
   assertEqual(result, { status: "valid", type: "fnr" }, "fnr › should accept a valid one")
}

{
   const result = fnr("29029648784")
   assertEqual(result, { status: "valid", type: "fnr" }, "fnr › should accept a standard leap year")
}

{
   const result = fnr("29020075838")
   assertEqual(result, { status: "valid", type: "fnr" }, "fnr › should accept year 00 as valid leap year")
}

{
   const result = fnr("29020112345")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match", "invalid date"] }, "fnr › should reject if date is > 28 feb in a non leap year")
}

{
   const result = fnr("15021951940")
   assertEqual(result, { status: "valid", type: "fnr" }, "fnr › should compensate for checksum digits that are 11")
}

{
   const result = fnr("1234567890")
   assertEqual(result, { status: "invalid", reasons: ["fnr, dnr or hnr must consist of 11 digits"] }, "fnr › should reject if less than 11 digits")
}

{
   const result = fnr("123456789101")
   assertEqual(result, { status: "invalid", reasons: ["fnr, dnr or hnr must consist of 11 digits"] }, "fnr › should reject if more than 11 digits")
}

{
   const result = fnr("1234567891A")
   assertEqual(result, { status: "invalid", reasons: ["fnr, dnr or hnr must consist of 11 digits"] }, "fnr › should reject if non-digits are present")
}

{
   const result = fnr("13097248032")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match"] }, "fnr › should reject if checksum 1 is invalid")
}

{
   const result = fnr("13097248023")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match"] }, "fnr › should reject if checksum 2 is invalid")
}

{
   const result = fnr("32127248022")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match", "invalid date"] }, "fnr › should reject if day is invalid")
}

{
   const result = fnr("13137248022")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match", "invalid date"] }, "fnr › should reject if month is invalid")
}

// dnr

{
   const result = dnr("53097248016")
   assertEqual(result, { status: "valid", type: "dnr" }, "dnr › should accept a valid one")
}

// hnr

{
   const result = hnr("13527248013")
   assertEqual(result, { status: "valid", type: "hnr" }, "hnr › should accept a valid one")
}

// tnr

{
   const result = tnr("10915596784")
   assertEqual(result, { status: "valid", type: "tnr" }, "tnr › should accept a valid one")
}

// dnr-and-hnr

{
   const result = dnrAndHnr("68467038838")
   assertEqual(result, { status: "valid", type: "dnr-and-hnr" }, "dnr-and-hnr › should accept a valid one")
}

// dnr-and-tnr

{
   const result = dnrAndTnr("50846202355")
   assertEqual(result, { status: "valid", type: "dnr-and-tnr" }, "dnr-and-tnr › should accept a valid one")
}

// New 2032 checksum standard

{
   const result = fnr("02013299997")
   assertEqual(result, { status: "valid", type: "fnr" }, "New 2032 checksum standard › should accept person born 02.01.2032 with new checksum")
}

{
   const result = fnr("30108299920")
   assertEqual(result, { status: "valid", type: "fnr" }, "New 2032 checksum standard › should accept person 1 born 30.10.1982 with new checksum (rest=0)")
}

{
   const result = fnr("30108299939")
   assertEqual(result, { status: "valid", type: "fnr" }, "New 2032 checksum standard › should accept person 2 born 30.10.1982 with new checksum (rest=1)")
}

{
   const result1 = fnr("30108299920")
   const result2 = fnr("30108299939")
   assertEqual(result1.status, "valid", "New 2032 checksum standard › should accept multiple valid k1 values for same birth date and individual number")
   assertEqual(result2.status, "valid", "New 2032 checksum standard › should accept multiple valid k1 values for same birth date and individual number")
}

{
   const result = fnr("02013299987")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match"] }, "New 2032 checksum standard › should still reject invalid checksums with new standard")
}

{
   const result = fnr("02013299996")
   assertEqual(result, { status: "invalid", reasons: ["checksums don't match"] }, "New 2032 checksum standard › should still reject invalid k2 with new standard")
}

{
   const result = dnr("70108299914")
   assertEqual(result, { status: "valid", type: "dnr" }, "New 2032 checksum standard › should work with dnr using new checksum standard")
}

console.log("All tests passed")
