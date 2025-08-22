import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UtilsService } from 'src/commons/utils/util.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = UtilsService.extractHeaderToken(req);
    // verificar chave de assinatura do token
    // verificar se o token existe na requisição(se estiver vazio nós retornamos um erro e pegamos informações do usuário que tentou acessar a rota ou usar o recurso)
    // caso tenha o token e a assinatura esteja correta ele pode continuar
  }
}
