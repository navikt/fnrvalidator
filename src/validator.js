'use strict'

const elevenDigits = new RegExp('^\\d{11}$')

const fnr = (digits) => {
   return validate(digits, false)
}

const dnr = (digits) => {
   return validate(digits, true)
}

const validate = (digits, isDnr) => {
   if (!elevenDigits.test(digits)) {
      return {
         status: "invalid",
         reasons: ["fnr must consist of 11 digits"]
      }
   }

   const errMsgs = [...checksums(digits), ...birthdate(digits, isDnr)]

   return errMsgs.length == 0 ? {status: "valid"} : 
      {
         status: "invalid",
         reasons: errMsgs
      }
}

const checksums = (digits) => {
   let k1 = 11 - ((3 * digits[0] + 7 * digits[1] + 6 * digits[2] + 1 * digits[3] + 8 * digits[4] +
      9 * digits[5] + 4 * digits[6] + 5 * digits[7] + 2 * digits[8]) % 11)
   let k2 = 11 - ((5 * digits[0] + 4 * digits[1] + 3 * digits[2] + 2 * digits[3] + 7 *
      digits[4] + 6 * digits[5] + 5 * digits[6] + 4 * digits[7] + 3 * digits[8] + 2 * k1) % 11)

   if (k1 === 11) k1 = 0
   if (k2 === 11) k2 = 0
   
   return k1 < 10 && k2 < 10 && k1 == digits[9] && k2 == digits[10] ? 
      [] : ["checksums don't match"]
}

// copied from https://stackoverflow.com/questions/5812220/how-to-validate-a-date
const birthdate = (digits, isDnr) => {
   if (isDnr) {
      digits = (digits.substring(0, 1) - 4) + digits.substring(1)
   }

   const day = digits.substring(0, 2)
   const month = digits.substring(2, 4)
   const year = digits.substring(4, 6)
   const date = new Date(year, month - 1, day)
   return (date && (date.getMonth() + 1) == month && date.getDate() == day) ? 
      [] : ["invalid date"]
 }

 exports.fnr = fnr
 exports.dnr = dnr
