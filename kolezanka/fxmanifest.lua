fx_version 'cerulean'
game "gta5"
lua54 'yes'

client_scripts {
    -- 'client/main.lua',
    'client/lib.lua'
}

server_scripts {
    'server/main.lua',
    'server/lib.lua'
}

files {
    'server/luamin.js',
    'server/luaparse.js',
}

shared_scripts {
    'shared/cryptico/*.js',
    'shared/encoder.js',
}

exports {
    "Init"
}