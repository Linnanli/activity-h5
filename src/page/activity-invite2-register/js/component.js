import md5 from 'md5'
import sha512 from 'sha512'
import RulesAlert from '../components/rules-alert'
import ResultAlert from '../components/result-alert'
import rulesConf from './config'
import Protocol from 'components/protocol'

window.md5 = md5;
window.sha512 = sha512;

class Components {
    params = null
    constructor(params) {
        this.params = params
        this.ruleBtn = $('#rules-btn');
        this.protocolLink = $('#register-protocol-link');
        this.rulesAlert = new RulesAlert({
            appName: params.appName
        });
        this.rulesAlert.setContain('活动规则', rulesConf);
        this.protocol = new Protocol();
        this.resultAlert = new ResultAlert();
        this.bindEvent();
    }

    bindEvent() {
        let { 
            appName,
            companyName,
            shortCompanyName
        } = this.params
        this.ruleBtn.on('click', () => {
            this.rulesAlert.show();
        });
        this.protocolLink.on('click', (e) => {
            this.protocol.show(appName,companyName,shortCompanyName);
            e.preventDefault();
        });
    }
}

export default Components