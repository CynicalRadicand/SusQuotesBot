const Discord = require('discord.js')
const { receiveMessageOnPort } = require('worker_threads')
const client = new Discord.Client()

// Does things on ready
client.on('ready', () => {
    // Connected as bot name
    console.log("Connected as: " + client.user.tag)

    // sets the status of the bot
    client.user.setActivity("You Sleep" , { type: "WATCHING" })


    // send to specific channel
    // client.channels.cache.get('523426180552982535').send("Ni Howdy", { files: ["C:/Users/farsa/Pictures/Phoenix-NO-U.gif"] })

    // logs the servers the bot is connected to
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        // logs all channel names, types, ids
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
            
            // sends hello message in all general chats
            if (channel.name == "general" || channel.name == "bot-testing") {
                channel.send("Who be Sussin?")
            }

            
        })
    });
})

// event for when there is a message sent
client.on('message', (receivedMessage) => {
    // if the sender is the bot then return
    if (receivedMessage.author == client.user) {
        return
    }

    // make string array
    var msgArray = receivedMessage.content.split(" ")

    // add quotes to random word
    var randNum = Math.floor(Math.random()*msgArray.length);
    var randWord = msgArray[randNum];
    msgArray[randNum] = `\"${randWord}\"`;

    var sendString = `${msgArray.join(' ')}`;

    // change nickname
    receivedMessage.guild.member(client.user).setNickname(receivedMessage.member.user.username);

    //send
    receivedMessage.channel.send(sendString);
    // delete original
    //receivedMessage.delete();


    /*if (msgFormat.includes("i'm") || receivedMessage.content.toLowerCase().includes("i am ") || msgFormat.includes("im")) {
        
        // format message to remove im
        var you = receivedMessage.content.toLowerCase()
        you = you.split("im ").pop()
        you = you.split("i'm ").pop()
        you = you.split("i am ").pop()
        
        // responds in  channel
        receivedMessage.channel.send("Hello " + you + ", I'm Cynical's Bot! 🙃")
        // reacts with emote
        receivedMessage.react("😑")
    } */
    


    // Check if the bot's user was tagged in the message
    if (receivedMessage.mentions.has(client.user)) {
        // reset nickname
        receivedMessage.guild.member(client.user).setNickname("Sus Bot")
        
        // Send acknowledgement message
        receivedMessage.channel.send("No U")
    }
})

// logs the bot in with the token
client.login("ODYwNjcwODQyNTM1MjgwNjcw.YN-oLw.I9_WGA7xl8yizaChrxYGtKd6M1I")