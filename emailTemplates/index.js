const emailActions = require('../configs/email.actions');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!'
    },
    [emailActions.ORDER]: {
        templateName: 'order',
        subject: 'Cool!'
    },
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Update name'
    },
    [emailActions.LOGIN]: {
        templateName: 'login',
        subject: 'You in our system'
    },
    [emailActions.LOGOUT]: {
        templateName: 'logout',
        subject: 'You logout from account'
    },
    [emailActions.DELETE]: {
        templateName: 'delete',
        subject: 'You delete your account'
    }

}