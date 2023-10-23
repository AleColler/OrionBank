import { Request, Response } from "express";
import { AutenticacaoDto } from "../../Application/DTOs/AutenticacaoDto";
import { AutenticacaoService } from "../../Application/Services/AutenticacaoService";

export class AutenticacaoController {   

    /* Rota: /autenticacao */
    async EfetuarAutenticacao(request: Request, response: Response) {
        try {

            const {
                login,
                senha
            } = request.body;

            const autenticacaoDto = { Login: login, Senha: senha } as AutenticacaoDto

            const _autenticacaoServices = new AutenticacaoService();
            const autorizado = await _autenticacaoServices.EfetuarLogin(autenticacaoDto);
            
            if(autorizado.Codigo === undefined) {
                return response.status(401).json({
                    status: "Não autorizado",
                    message: "Documento federal ou senha inválido."
                });
            }

            return response.status(200).send(autorizado);

        } catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }
    }
}