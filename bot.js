// ---------------------------- WELCOME TO *BUDDY BOT* ----------------------------
// ----------- ALL THE GENERAL INFORMATION REGARDING THIS DISCORD BOT 👇 -------------
// https://locrian-newsstand-826.notion.site/Buddy-Bot-e8d3eb337da541f3b8d2041a08554f38

// --------------------------------------------------------------------------------------------
// ----------------- Random number generator for "/random" ------------------------
// --------------------------------------------------------------------------------------------

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// ----------------- Discord.js ------------------------
// --------------------------------------------------------------------------------------------
const discord = require("discord.js");

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login("OTA1NjEzMTM5MDc5NDcxMTE0.YYMn9Q.0OESeDvz_tl96h4EEAdaY-rCnZY");

client.on('ready', () => {
    console.log("This bot is working");
    client.user.setActivity('Fetch');
})
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// ----------------- Sequelize.js ------------------------
// --------------------------------------------------------------------------------------------

const { Sequelize, DataTypes } = require("sequelize/dist")

const sequelize = new Sequelize('postgres://postgres:Rocketman@09@localhost:5433/postgres')

try{
    (async() =>{
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    })()
}catch(error){
    console.error('Unable to connect to the database:', error)
}

const slangs = sequelize.define('slangs',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    slang:{
        type: DataTypes.STRING,
        // allowNull: false
    },
    meaning:{
        type: DataTypes.STRING,
        // allowNull:false
    },
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
console.log(slangs === sequelize.models.slangs); //true

client.on('messageCreate', (msg) => {
    if(!msg.author.bot && msg.mentions.has(client.user.id)) { 
        //client.user.id == "905613139079471114" but, actually in Discord, the bot id is -> <@!905613139079471114> OR <@905613139079471114> 
        if (msg.content.toLowerCase().slice(msg.content.indexOf(">") + 2, ) === "/random"){
            (async() => {
                const random = await slangs.findOne({ where: {id: randomIntFromInterval(1553, 2963)  } }) 
                const content = `${random.slang} -> ${random.meaning}`
                console.log(content)
                msg.reply({
                    content
                })
            })();
        }else {
            (async() =>{
                const lol = await slangs.findOne({ where: { slang: msg.content.toUpperCase().slice(msg.content.indexOf(">") + 2, )} });
                if (lol === null) {
                    const content = 'uh-oh, I think you mistyped something, try typing again. or look at my "ABOUT ME" section to learn more.'
                    console.log(msg.content)
                    console.log(content);
                    console.log(msg.author.id)
                    console.log(msg.mentions.has(client.user.id))
                    if(msg.author.id !== client.user.id){
                        msg.reply({
                            content
                        })
                    }
                }else {
                    //   console.log(lol instanceof lol); // true
                    const content = `${msg.content.toUpperCase().slice(msg.content.indexOf(">") + 2, )} -> ${lol.meaning}` 
                    console.log(msg.content)
                    console.log(content); // The whole line that gets printed out on Discord by this bot.
                    console.log(msg.author.id)
                    if(msg.author.id !== client.user.id){
                        msg.reply({
                            content
                        })}}})()
                    }
                }
                // console.log(client.user.id) //prints the id of the bot.
            })
            
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------