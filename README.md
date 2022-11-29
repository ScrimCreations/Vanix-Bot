# Vanix-Bot
A discord bot for the vanix discord server


## Setup 
1. run `npm install` to install all the dependencies
2. fill out .env file with the example below 
```env
    TOKEN=your token hereTOKEN= The token of the discord bot
    CLIENT_ID= The app ID of the app you created in discord developer portal
    GUILD_ID= ID of the guild you want to use the bot in
    SERVERINVITE= The invite link to the server you want for /accept command
    OWNERID= ID of the owner of the bot 
    ADMINROLEID= ID of the role that can use the admin commands
    MODROLEID= ID of the role that you want to be able to have mod commands
    LOGCHANNELID=ID OF THE CHANNEL WHERE YOU WANT TO LOG THE COMMANDS
```
3. run `tsc` to compile the typescript files 
4. run `npm run start` to start the bot