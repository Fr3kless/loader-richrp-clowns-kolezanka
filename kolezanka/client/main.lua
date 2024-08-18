local a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
local b = ""
math.randomseed(math.random(1111, 9999) * math.random(1,9))
e = {}
for c in a:gmatch "." do
    table.insert(e, c)
end
for d = 1, 8 do
    b = b .. e[math.random(1, #e)]
end

exports('Init', function()
    local resourceName = GetInvokingResource()

    if resourceName == 'kolezanka' then
        return
    end

    RegisterNetEvent(resourceName..':'..b)
    TriggerServerEvent(resourceName..':receiveCode', b)
    AddEventHandler(resourceName..':'..b, function(tmp)
        exports[resourceName]:Load(exports['kolezanka']:DecipherSource(tmp, 'MENZL2VN9VYMWGDXFHSTD4GXS7MP4W8W724MD28C'))
    end)
end)