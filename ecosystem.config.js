/**
 * ecosystem.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 * @description Setting for PM2
 */

module.exports = {
    apps : [{
        name: 'portfolio',
        script: 'yarn',
        cwd: '/home/ec2-user/portfolio',
        interpreter: '/bin/bash',
        args: 'start',
        instances: 1,
        autorestart: true,
        max_memory_restart: '512M',
    }],
};
