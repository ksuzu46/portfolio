/**
 * ecosystem.config.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 * @description PM2 configuration file which run yarn start
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
