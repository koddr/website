require('dotenv').config();

module.exports = {
    email: process.env.SHOSTAK_DEV_EMAIL,
    telegram: process.env.SHOSTAK_DEV_TELEGRAM,
    legal_info: {
        OGRNIP: process.env.SHOSTAK_DEV_LEGAL_INFO_OGRNIP,
        INN: process.env.SHOSTAK_DEV_LEGAL_INFO_INN
    }
};