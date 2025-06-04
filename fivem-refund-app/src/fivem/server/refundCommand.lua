local function claimRefund(playerIdentifier)
    -- Check if the playerIdentifier is valid
    if not playerIdentifier then
        return "Invalid player identifier."
    end

    -- Fetch the refund associated with the playerIdentifier from the database
    local refund = MySQL.Sync.fetchAll("SELECT * FROM refunds WHERE player_identifier = @identifier AND claimed = 0", {
        ['@identifier'] = playerIdentifier
    })

    -- Check if a refund exists
    if #refund == 0 then
        return "No unclaimed refunds found for this player."
    end

    -- Process the refund (this is where you would add your logic to handle the refund)
    -- For example, you might want to update the refund status in the database
    MySQL.Sync.execute("UPDATE refunds SET claimed = 1 WHERE player_identifier = @identifier", {
        ['@identifier'] = playerIdentifier
    })

    return "Refund claimed successfully."
end

RegisterCommand("claimrefund", function(source, args, rawCommand)
    local playerIdentifier = args[1] -- Assuming the player identifier is passed as the first argument
    local result = claimRefund(playerIdentifier)
    TriggerClientEvent("chat:addMessage", source, {
        args = { "Refund System", result }
    })
end, false)