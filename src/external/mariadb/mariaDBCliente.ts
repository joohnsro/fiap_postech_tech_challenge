import conexao from "./conexao";
import { AdicionaClienteDTO, ClienteDTO } from "../../common/types/cliente";
import { ClienteDataSourceInterface } from "../../common/interfaces/datasource";

export default class MariaDBCliente implements ClienteDataSourceInterface {
    
    async criarCliente(cliente: AdicionaClienteDTO): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO clientes (nome, cpf) VALUES ('${cliente.nome}', '${cliente.cpf}')`,
            (err: Error, rows: ClienteDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async (id: any) => {
                await con.end()
                return id.insertId
            })
            
    }

    async encontrarClientePorCPF(cpf: string): Promise<ClienteDTO[]> {
        const con = await conexao();
        return await con.query(
            `SELECT * FROM clientes WHERE cpf = '${cpf}'`, 
            (err: Error, rows: ClienteDTO[]) => {
                if (err) return err;
                return rows;
            })
            .then(async (response:ClienteDTO[]) => {
                await con.end()
                return response
            });
    }

}