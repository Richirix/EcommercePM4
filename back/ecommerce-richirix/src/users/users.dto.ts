import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNumber,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword';

export class CreateUserDto {
  /**
   * El nombre del usuario, debe tener entre 3 y 80 caracteres.
   * @example Ricardo
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  /**
   * El email del usuario , debe ser un email valido
   * @example rrz@gmail.com
   */
  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  email: string;

  /**
   * La contraseña del usuario, debe cumplir con los requisitos de seguridad.
   * Debe tener al menos una letra mayúscula, una minúscula, un número, un carácter especial (!@#$%^&*) y tener entre 8 y 15 caracteres.
   * @example Ricardo123!
   */
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número, un carácter especial (!@#$%^&*) y debe tener entre 8 y 15 caracteres.',
    },
  )
  password: string;

  /**
   * Confirmación de la contraseña. Debe coincidir con el campo "password".
   * @example Ricardo123!
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * El número de teléfono del usuario.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber({}, { message: 'El teléfono debe ser un número.' })
  phone: number;

  /**
   * La dirección del usuario, debe tener entre 3 y 80 caracteres.
   * @example Calle Falsa 123
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address: string;

  /**
   * El país del usuario, debe tener entre 5 y 20 caracteres.
   * @example Mexico
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20, {
    message: 'El país debe tener entre 5 y 20 caracteres.',
  })
  country: string;

  /**
   * La ciudad del usuario, debe tener entre 5 y 20 caracteres.
   * @example Tlaxcala
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres.',
  })
  city: string;

}

export class UsersLogingDto {
  /**
   * El email del usuario, debe ser un email válido.
   * @example rrz@gmail.com
   */
  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  email: string;

  /**
   * La contraseña del usuario, debe cumplir con los requisitos de seguridad.
   * @example Ricardo123!
   */
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número, un carácter especial (!@#$%^&*) y debe tener entre 8 y 15 caracteres.',
    },
  )
  password: string;
}
