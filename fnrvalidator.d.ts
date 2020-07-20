type LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
type CHECKSUM_ERROR = "checksums don't match";
type DATE_ERROR = 'invalid date';
type ErrorReason = LENGTH_ERROR | CHECKSUM_ERROR | DATE_ERROR;
type OkResult = { status: 'valid'; type: 'dnr' | 'fnr' };
type ErrorResult = { status: 'invalid'; reasons: ErrorReason[] };
type ValidationResult = OkResult | ErrorResult;

declare module '@navikt/fnrvalidator' {
    export function fnr(value: string): ValidationResult;
    export function dnr(value: string): ValidationResult;
    export function idnr(value: string): ValidationResult;
}
