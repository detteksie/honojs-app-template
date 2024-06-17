export class RegisterDto {
  declare password: string;
  declare name: string;
  declare email: string;
  declare username: string;
  declare birthdate?: Date;
}

export class LoginDto {
  declare userSession: string;
  declare password: string;
}
