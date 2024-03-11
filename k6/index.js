import { group, sleep } from "k6";
import GetPedidos from "./scenarios/getPedidos.js";

export default () => {
    group('Endpoint Get Pedidos', () => {
        GetPedidos();
    });

    sleep(1);
}