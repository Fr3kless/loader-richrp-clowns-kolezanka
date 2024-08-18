exports("Load", function(code)
    local status, err = pcall(load(code))
    if(err ~= nil) then
        error(err)
    end
end)

CreateThread(function()
    exports['kolezanka']:Init()
end)