import 'common/styles/reset.scss'
import './index.sass'
import { getQueryString } from 'util'

let appName = getQueryString('appName') || '考拉有借'
$('.app-name').text(appName)