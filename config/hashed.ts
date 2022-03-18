import { hashSync, compareSync }from 'bcrypt';

const saltRounds = 10;

export const hashPasswordSync = (plainTextPwd: string) => {
	return hashSync(plainTextPwd, saltRounds);
};

export const comparePassword = (plainTextPwd: string, hashPassword: string) => {
	return compareSync(plainTextPwd, hashPassword);	
}
