import { UserModel } from "./auth.model";

export const storeUser = async (user: { userId: string, email: string, password: string }) => {
	const { userId, email, password } = user;
	const newUser = new UserModel({
		userId,
		email,
		password,
	})
	await newUser.save();
	return user;
}
