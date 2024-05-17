export class RegisterDto {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
}

export class LoginDto {
  email: string;
  password: string;
}
