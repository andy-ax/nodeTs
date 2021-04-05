import {RouterHelper} from './routerHelper';

export class Router {
    constructor() {

    }

    addRouteReg() {
        //添加路由映射正则
        routeMod.addRule(':username',/:username/g,'([0-9a-zA-Z_]+)');
        routeMod.addRule(':room',/:room/g,'room(\\\d+)');
        routeMod.addRule(':css',/:css/g,'([0-9a-zA-Z_]+\\\.css)');
        routeMod.addRule(':js',/:js/g,'([0-9a-zA-Z_]+\\\.js)');
        routeMod.addRule(':img',/:img/g,'([0-9a-zA-Z_]+\\\.(?:png|jpg))');
        routeMod.addRule(':font',/:font/g,'([0-9a-zA-Z_]+\\\.(?:eot|svg|ttf|woff))');
    }
}
