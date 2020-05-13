import * as pkg from '../package.json'

// Set the banner content
let banner = ['/*!\n',
    ' * HeathShults.com - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ` * Copyright 2020-${(new Date()).getFullYear()}`, ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

exports.default = banner
