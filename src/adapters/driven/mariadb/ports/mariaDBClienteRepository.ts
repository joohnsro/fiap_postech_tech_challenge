import conexao from "../conexao";
import { ClienteType } from "../../../../core/domain/cliente";
import ClienteRepository from "../../../../core/application/ports/clienteRepository";

export default class MariaDBClienteRepository implements ClienteRepository {

    async criaCliente(cliente: ClienteType): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO clientes (nome, cpf) VALUES ('${cliente.nome}', '${cliente.cpf}')`,
            (err: Error, rows: ClienteType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
            
    }

    async encontraClientePorCPF(cpf: string): Promise<ClienteType> {
        const con = await conexao();
        return await con.query(
            `SELECT * FROM clientes WHERE cpf = '${cpf}'`, 
            (err: Error, rows: ClienteType[]) => {
                if (err) return err;
                return rows;
            })
            .then((response:ClienteType[]) => response[0]);
    }

}