import helloWebpack from 'component/hello-webpack/index'
import { funcA } from '@/util'

$('#app').append(helloWebpack.show('hello webpacksss'));

// if (module.hot) {
//     module.hot.accept("./component/hello-webpack/index", function () {
//         helloWebpack = require('component/hello-webpack/index');
//     });
// }