// INTERFACES
import { IUser } from "../user/interface";

export default class UserDto {
  static usersArrayDTO(users: IUser[]): Partial<IUser>[] {
    return users.map((user) => UserDto.userDTO(user));
  }

  static userDTO(user: IUser): Partial<IUser> {
    return {
      id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      phone: user.phone,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      address: user.address,
      status: user.status,
      role: user.role,
    };
  }
}
