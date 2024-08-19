loader = {}
loader.codeSent = {}
loader.codeStore = {}
loader.cipherKey = "MENZL2VN9VYMWGDXFHSTD4GXS7MP4W8W724MD28C"

exports('Init', function()
    local resourceName = GetInvokingResource()

    if not resourceName or resourceName == 'kolezanka' then
        return
    end

    if loader.codeStore and loader.codeStore[resourceName] then
        return
    end

    if not loader.codeStore[resourceName] then
        loader.codeStore[resourceName] = {}
    end

    if not loader.codeSent[resourceName] then
        loader.codeSent[resourceName] = {}
    end

    local clientScripts = json.decode(GetResourceMetadata(resourceName, "my_data_extra", GetNumResourceMetadata(resourceName, "my_data_extra") - 1))

    for k,v in pairs(clientScripts) do
        local rawCode = LoadResourceFile(resourceName, v)
        local codeHash = exports['kolezanka']:CipherSource(rawCode, loader.cipherKey)

        loader.codeStore[resourceName][k] = codeHash
    end

    RegisterNetEvent(resourceName..':receiveCode')
    AddEventHandler(resourceName..':receiveCode', function(key)
        loader.sendCode(source, resourceName, key)
    end)
end)

loader.sendCode = function(source, resourceName, key)
    if not loader.codeSent[resourceName][source] then
        for k,v in pairs(loader.codeStore[resourceName]) do
            TriggerClientEvent(resourceName..':'..key, source, v)

            if k == #loader.codeStore[resourceName] then
                loader.codeSent[resourceName][source] = true
            end
        end
    end
end
