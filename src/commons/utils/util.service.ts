import { Request } from 'express';

export class UtilsService {
  static extractHeaderToken(
    header: string,
    typeToken: string,
    req: Request,
  ): string | undefined {
    const authHeader = req.headers[header];

    if (!authHeader || Array.isArray(authHeader)) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    if (type != typeToken) {
      return undefined;
    }

    return token;
  }

  static isValidUUID(id: string): boolean {
    if (typeof id !== 'string') {
      return false;
    }
    const uuidRegex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    return uuidRegex.test(id);
  }

  static isValidEmail(email: string): boolean {
    if (!email) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidCpf(cpf: string): boolean {
    let soma: number = 0;
    let resto: number = 0;

    if (cpf == '00000000000') {
      return false;
    }
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1), i) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
      resto = 0;
    }
    if (resto != parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
}
