export class CreateUserDto {
  declare name: string;
  declare email: string;
  declare password: string;
  declare birthdate?: Date;
}

export class UpdateUserDto {
  declare name: string;
  declare birthdate?: Date;
}
