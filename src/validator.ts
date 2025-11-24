'use strict'

type LENGTH_ERROR = 'fnr, dnr or hnr must consist of 11 digits';
type CHECKSUM_ERROR = "checksums don't match";
type DATE_ERROR = 'invalid date';
type ErrorReason = LENGTH_ERROR | CHECKSUM_ERROR | DATE_ERROR;
type OkResult = { status: 'valid'; type: NrType };
type NrType = 'dnr' | 'fnr' | 'hnr' | 'tnr' | 'dnr-and-hnr' | 'dnr-and-tnr';
type ErrorResult = { status: 'invalid'; reasons: ErrorReason[] };
type ValidationResult = OkResult | ErrorResult;

const elevenDigits = new RegExp('^\\d{11}$')

export const fnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const dnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const hnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const tnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const dnrAndHnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const dnrAndTnr = (digits: string): ValidationResult => {
   return idnr(digits)
}

export const getType = (digits: string): NrType => {
   let nrs = digits.split("").map(Number)
   if (nrs[0] >= 4 && nrs[2] >= 8) {
      return 'dnr-and-tnr'
   }
   if (nrs[0] >= 4 && nrs[2] >= 4) {
      return 'dnr-and-hnr'
   }
   if (nrs[0] >= 4) {
      return 'dnr'
   } 
   if (nrs[2] >= 8) {
      return "tnr"
   } 
   if (nrs[2] >= 4) {
      return 'hnr'
   }
   return 'fnr'
}

export const idnr = (digits: string): ValidationResult => {
   const type = getType(digits)
   return validate(digits, type)
}

const validate = (digits: string, type: NrType): ValidationResult => {
   if (!elevenDigits.test(digits)) {
      return {
         status: "invalid",
         reasons: ["fnr, dnr or hnr must consist of 11 digits"]
      }
   }

   const errMsgs = [...checksums(digits), ...birthdate(digits, type)]

   return errMsgs.length == 0 ? {status: "valid", type} :
      {
         status: "invalid",
         reasons: errMsgs
      }
}

const checksums = (digits: string): Array<CHECKSUM_ERROR> => {
   let nrs = digits.split("").map(Number)
   
   // Calculate the weighted sum for k1
   const k1Sum = 3 * nrs[0] + 7 * nrs[1] + 6 * nrs[2] + 1 * nrs[3] + 8 * nrs[4] +
      9 * nrs[5] + 4 * nrs[6] + 5 * nrs[7] + 2 * nrs[8]
   
   // https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/nytt-fodselsnummer-fra-2032/
   // New standard (2032): k1 can be calculated with rest values 0, 1, 2, or 3
   // This allows for 4 possible valid values for k1
   const validK1Values: number[] = []
   
   for (let rest = 0; rest <= 3; rest++) {
      let k1 = (11 + rest) - (k1Sum % 11)
      
      // If k1 > 10, subtract 11
      if (k1 > 10) {
         k1 = k1 - 11
      }
      
      // Discard if k1 = 10
      if (k1 !== 10) {
         validK1Values.push(k1)
      }
   }
   
   const k1Actual = nrs[9]
   
   // Check if the actual k1 is one of the valid values
   if (!validK1Values.includes(k1Actual)) {
      return ["checksums don't match"]
   }
   
   // Calculate k2 using the actual k1 value (same as before, only one valid value)
   let k2 = 11 - ((5 * nrs[0] + 4 * nrs[1] + 3 * nrs[2] + 2 * nrs[3] + 7 *
      nrs[4] + 6 * nrs[5] + 5 * nrs[6] + 4 * nrs[7] + 3 * nrs[8] + 2 * k1Actual) % 11)
   
   if (k2 === 11) k2 = 0
   
   // k2 must be less than 10 and match the actual value
   return k2 < 10 && k2 === nrs[10] ? [] : ["checksums don't match"]
}

// copied from https://stackoverflow.com/questions/5812220/how-to-validate-a-date
const birthdate = (digits: string, type: NrType): Array<DATE_ERROR> => {
   if (type === 'dnr') {
      digits = (Number(digits.substring(0, 1)) - 4) + digits.substring(1)
   } else if (type === 'hnr') {
      digits = digits.substring(0, 2) + (Number(digits.substring(2, 3)) - 4) + digits.substring(3)
   } else if (type === 'tnr') {
      digits = digits.substring(0, 2) + (Number(digits.substring(2, 3)) - 8) + digits.substring(3)
   } else if (type === 'dnr-and-hnr') {
      digits = (Number(digits.substring(0, 1)) - 4) + digits.substring(1, 2) + (Number(digits.substring(2, 3)) - 4) + digits.substring(3)
   } else if (type === 'dnr-and-tnr') {
      digits =  Number(digits.substring(0, 1)) -4 + digits.substring(1, 2) + (Number(digits.substring(2, 3)) - 8) + digits.substring(3)
   }

   const day = Number(digits.substring(0, 2))
   const month = Number(digits.substring(2, 4))
   const yearString = digits.substring(4, 6)
   const year = yearString == '00' ? 2000 : Number(yearString)

   // set year 00 default to 2000 instead of 1900
   const date = new Date(Date.UTC(year, month - 1, day))

   return (date && (date.getUTCMonth() + 1) == month && date.getUTCDate() == day) ?
      [] : ["invalid date"]
 }

