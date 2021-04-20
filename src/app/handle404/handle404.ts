export class Handle404 {
    static handle404 (res: any, msg?: string) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: resource not found.');
        res.end(msg||'');
    }
}