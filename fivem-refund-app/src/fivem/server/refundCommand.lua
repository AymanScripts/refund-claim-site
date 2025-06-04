local MySQL = require('mysql-async')

RegisterCommand('claimrefund', function(source, args, rawCommand)
    local playerIdentifier = GetPlayerIdentifier(source, 0) -- Get the player's identifier
    if not playerIdentifier then
        TriggerClientEvent('chat:addMessage', source, { args = { 'Refund', 'You must be logged in to claim a refund.' } })
        return
    end

    MySQL.Async.fetchAll('SELECT * FROM refunds WHERE player_identifier = @identifier AND is_claimed = 0', {
        ['@identifier'] = playerIdentifier
    }, function(refunds)
        if #refunds == 0 then
            TriggerClientEvent('chat:addMessage', source, { args = { 'Refund', 'No unclaimed refunds found for your account.' } })
            return
        end

        for _, refund in ipairs(refunds) do
            MySQL.Async.execute('UPDATE refunds SET is_claimed = 1 WHERE id = @id', {
                ['@id'] = refund.id
            }, function(rowsChanged)
                if rowsChanged > 0 then
                    TriggerClientEvent('chat:addMessage', source, { args = { 'Refund', 'Refund claimed successfully!' } })
                else
                    TriggerClientEvent('chat:addMessage', source, { args = { 'Refund', 'Failed to claim refund. Please try again later.' } })
                end
            end)
        end
    end)
end, false)