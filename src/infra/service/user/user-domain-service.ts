/**
 * ROLES
 * 
 * At least one upper case English letter, (?=.*?[A-Z])
 * At least one lower case English letter, (?=.*?[a-z])
 * At least one digit, (?=.*?[0-9])
 * At least one special character, (?=.*?[#?!@$%^&*-])
 * Minimum eight in length .{8,} (with the anchors)
 * **/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const REGEX_EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class UserDomainService {

    public static validatePassword(password: string) {
        return PASSWORD_REGEX.test(password)
    }

    // TODO - move validate from entity [REGEX_EMAIL]
    public static validateEmail(email: string) {
        //
        throw new Error("not inplemented at!")
    }
}