export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
}

export class UpdateUserDto {
  name: string;
  birthdate?: Date;
}
