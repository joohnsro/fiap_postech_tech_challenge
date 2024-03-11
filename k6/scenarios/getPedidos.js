import http from "k6/http";
import { sleep, check, fail } from "k6";
import { Trend, Rate, Counter } from "k6/metrics";

export let getPedidosDuration = new Trend('get_pedidos_duration');
export let getPedidosFailRate = new Rate('get_pedidos_fail_rate');
export let getPedidosSuccessRate = new Rate('get_pedidos_success_rate');
export let getPedidosReqs = new Rate('get_pedidos_reqs');

export default () => {
    let res = http.get('http://127.0.0.1:59938/pedidos');

    getPedidosDuration.add(res.timings.duration);
    getPedidosReqs.add(1);
    getPedidosFailRate.add(res.status == 0 || res.status > 399);
    getPedidosSuccessRate.add(res.status < 399);

    let durationMsg = 'Max duration 8000/1000s';
    if ( !check(res, {
        'max-duration': r => r.timings.duration < 8000,
    }) ) {
        fail(durationMsg);
    }

    sleep(1);
}