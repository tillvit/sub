const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

var upC = ""
var $ = require('jquery');
var fetch = require('node-fetch');
var moment = require('moment');
const fs = require('fs');
const path = require('path');

var key = process.env.HYPIXEL_API_KEY

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var toKM = function(number) {
    if (number == Infinity) {
        return number;
    }
    if (number > 1000000) {
        return Math.round(number/1000)/1000 + "M"
    }
    if (number > 1000) {
        return Math.round(number/1)/1000 + "K"
    }
    return number
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getCurPSTDate(){
  var d = new Date();
  var localTime = d.getTime();
  var localOffset = d.getTimezoneOffset() * 60000;
  var utc = localTime + localOffset;
  var offset = -7;   
  var currentTime = utc + (3600000*offset);
  var nd = new Date(currentTime)
  return ("[" + nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate() + "-" + nd.getHours() + ":" + nd.getMinutes() + ":" + nd.getSeconds() + "] ")
}
var kj = []
var keys = []
var kp = [["c2189a914ed846b9a137ed92cec5257f","c2189a914ed846b9a137ed92cec5257f"],["dae29cb637bb4193a737aaef10315b72","b305db79094d4e828d7f500f0d82fac2"],["dae29cb637bb4193a737aaef10315b72","724c64a2fc8b4842852b6b4c2c6ef241"],["7f058ec852f44cfc97b46166ababac70","e1ed1823b443477d96b4281b194e17ab"],["672ef79b4d0a4805bc529d1ae44bc26b","672ef79b4d0a4805bc529d1ae44bc26b"]]
//var kp = [["672ef79b4d0a4805bc529d1ae44bc26b","672ef79b4d0a4805bc529d1ae44bc26b"]]
function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          // if (property == "tutorial"){
          //   console.log(stack + '.' + property + ": " + JSON.stringify(obj[property]))
          //   console.log(typeof obj[property])
          //   console.log(Array.isArray(obj[property]))
          // }
            if (typeof obj[property] == "object") {
              if (Array.isArray(obj[property])) {
                obj[property].forEach(function (item, index) {
                  if (!keys.includes(item)){
                    keys.push(item)
                  }
                });
              }else{
                iterate(obj[property], stack + '.' + property);
              }
            } else {
                if (isNaN(property) && !keys.includes(property)){
                    keys.push(property)
                }
            }
        }
    }
}
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            //a[a2[i]] = true;
        }
    }

    for (var k in a) {
        if (k != "") {
            diff.push(k);
        }
    }

    return diff;
}
function ConvertMinutes(num){
    if (num < 0) {
        return ("NOW")
    }
    d = Math.floor(num/1440); // 60*24
    h = Math.floor((num-(d*1440))/60);
    m = Math.floor(num%60);
    s = Math.floor((num - Math.floor(num)) * 60)
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }
    if (h < 10) {
        h = "0" + h
    }
    if (d < 1) {
        if (h < 1) {
            return(m + ":" + s);
        }else{
            return(h + ":"+m+ ":"+s);
        }
    }else{
        return(d+":" + h + ":"+m+ ":"+s);
    }
    
  
}
function UpdateTimers(){
    let now = Date.now();
    var m = moment.duration(timers[0] - now).asMinutes();
    // channel.bulkDelete(100).then(() => {});
    const embed = new MessageEmbed()
    .setTitle("Timers")
    .setColor(0x333333)
    for (var i = 0; i < timerNames.length; i ++) {
        m = moment.duration(timers[i] - now).asMinutes();
        embed.addField(timerNames[i],ConvertMinutes(m))
    }
    channel.messages.fetch("729899847821557761").then(m => {
        m.edit("");
        m.edit(embed);
    });
}
var timerNames = ["Magma Boss", "Dark Auction", "Bank", "New Year", "Spooky Fest", "Winter Fest", "Travelling Zoo"]
var timers = [0,0,0,0,0,0,0]
function getTime(path) {
    var paths = ["bosstimer/magma/estimatedSpawn","darkauction/estimate","bank/interest/estimate","newyear/estimate","spookyFestival/estimate","winter/estimate","zoo/estimate"]
    for (var i = 0; i < paths.length; i ++){
        let now = Date.now();
        var rt = new XMLHttpRequest();
        rt.open("GET", "https://hypixel-api.inventivetalent.org/api/skyblock/" + paths[i], false);
        rt.responseType = "json"
        rt.onload = function() {
            try{
              data = JSON.parse(rt.responseText)
              //console.log(data)
              //console.log(data["estimate"])
              timers[i] = data["estimate"]
            } catch (err) {
              console.log(err)
            }

        }
        rt.send(null);
    }     
}
var logFileName = getCurPSTDate().replace(/:/gi,"_").replace("[","").slice(0,-2) + ".txt"
console.log("saving files to: " + logFileName)
var logger = fs.createWriteStream('logs/' + logFileName, {
  flags: 'a'
})
logger.write(getCurPSTDate() + 'saving files to: ' + logFileName + '\n')



fs.readFile(__dirname + '/newFields.txt', {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        kj = data.split("\n")
    } else {
        console.log(err);
        logger.write(getCurPSTDate() + 'error reading newFields.txt ' + err + '\n')
    }
});

fs.readFile(__dirname + '/lastUpdateCode.txt', {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      upC = data.replace(/(\r\n|\n|\r)/gm,"")
    } else {
      console.log(err);
      logger.write(getCurPSTDate() + 'error reading lastUpdateCode.txt ' + err + '\n')
    }
});
var commands = [["=help","Lists commands"],["=skills <ign> <profile>", "Shows the skills of a player in a profile"],["=profiles <ign>", "Lists the profiles of a player"],["=test", "Test command run at your own risk"]]

function skills(msg) {
    console.log("Skills called by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills called by <@" + msg.author + ">" + '\n')
    var profiles = [];
    var args = msg.content.split(" ");
      if (args.length < 3) {
        if (args.length == 1) {
            const embed = new MessageEmbed()
            .setTitle("Missing player and profile argument!")
            .setColor(0xff0000)
            .setDescription("Try: " + msg.content + " <ign> <profile>");
            msg.channel.send(embed);
            return
        }
        if (args.length == 2) {
            
            var request = new XMLHttpRequest();
            request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
            
            request.onload = function() {
                    if (request.responseText == "Something went wrong") {
                        const embed = new MessageEmbed()
                        .setTitle("Invalid Username!")
                        .setColor(0xff0000)
                        
                        msg.channel.send(embed);
                        return
                    }
                    var d = request.responseText.split("<tr>")
                    for (i = 0; i < d.length; i++) { 
                        d[i] = d[i].split("</td><td>")
                        if (d[i][1] != undefined) {
                            profiles.push(d[i][1])
                        }
                    }
                    var desc = "Try: " + msg.content + " <profile>\n\n"
                    desc = desc + "**" + args[1] + "'s profiles:**\n"
                    for (i=0; i < profiles.length; i++) {
                        desc += profiles[i] + "\n"
                    }
                    const embed = new MessageEmbed()
                    .setTitle("Missing profile argument!")
                    .setColor(0xff0000)
                    .setDescription(desc);
                    msg.channel.send(embed);
                    return
                
            };
            request.send(null);
            
        }
    }
    var profileID = ""
    var profiles = []
    var request = new XMLHttpRequest();
    request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
    
    request.onload = function() {


            if (request.responseText == "Something went wrong") {
                const embed = new MessageEmbed()
                .setTitle("Invalid Username!")
                .setColor(0xff0000)
                
                msg.channel.send(embed);
                return
            }
            var d = request.responseText.split("<tr>")

            for (i = 0; i < d.length; i++) { 
                d[i] = d[i].split("</td><td>")
                if (d[i][1] != undefined) {
                    profiles.push(d[i][1])
                    if (d[i][1] == args[2].charAt(0).toUpperCase() + args[2].slice(1)) {
                        profileID = d[i][0].substring(4)
                    }
                }
            }
            if (profileID == ""){
                var desc = "Try: =skills " + args[1] + " <profile>\n\n"
                desc = desc + "**" + args[1] + "'s profiles:**\n"
                for (i=0; i < profiles.length; i++) {
                    desc += profiles[i] + "\n"
                }
                const embed = new MessageEmbed()
                .setTitle("Profile doesn't exist!")
                .setColor(0xff0000)
                .setDescription(desc);
                msg.channel.send(embed);
                return
            }else{
                var r = new XMLHttpRequest();
                r.open("GET", "https://api.mojang.com/users/profiles/minecraft/" + args[1], true);
                r.responseType = 'json';
                var uuid = ""
                r.onload = function() {
                    var status = r.status;
                    if (status === 200) {
                        try{
                          uuid = JSON.parse(r.responseText).id;
                        } catch (err) {
                          logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                        }
                        var rt = new XMLHttpRequest();
                        rt.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + key + "&profile=" + profileID, true);
                        rt.responseType = 'json';
                        var data = {};
                        rt.onload = function() {
                            var status = rt.status;
                            if (status === 200) {
                                const embed = new MessageEmbed()
                                .setTitle(args[1] + "'s skills:")
                                .setColor(0x00ffff);
                                var member;
                                try{
                                  member = JSON.parse(rt.responseText)["profile"]["members"][uuid];
                                } catch (err) {
                                  console.log(err);
                                  logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                                  return
                                }
                                var skillValues = [0,50,175,375,675,1175,1925,2925,4425,6425,9925,14925,22425,32425,47425,67425,97425,147425,222425,322425,522425,822425,1222425,1722425,2322425,3022425,3822425,4722425,4722425,6822425,8022425,9322425,10722425,12222425,13822425,15522425,17322425,19222425,21222425,23322425,25522425,27822425,30222425,32722425,35322425,38072425,40972425,44072425,47472425,51172425,55172425,Infinity]
                                var rune = [0,50,150,275,435,635,885,1200,1600,2100,2725,3510,4510,5760,7325,9325,11825,14950,18950,23950,30200,38050,47850,60100,75400,94450,Infinity]
                                var sdesc = ""
                                var count = 0;
                                for (var k in member) {
                                    if (k.startsWith("experience_skill_")) {
                                        count ++;
                                        if (k == "experience_skill_runecrafting"){
                                            sdesc = ""
                                            var xp = member[k]
                                            var level = 0
                                            while (rune[level] < xp) {
                                                level = level + 1;
                                            }
                                            level = level - 1
                                            sdesc += "Level: " + level + "\n"
                                            sdesc += "Progress: " + toKM(Math.round(xp-rune[level])).toString() + "/" + toKM(rune[level+1]-rune[level]).toString() +" (" + (Math.round((xp-rune[level])/(rune[level+1]-rune[level])*100000)/1000) + "%)\n"
                                            if (Math.round(xp/94450*10000)/100 > 100){
                                                sdesc += "MAX LEVEL ACHIEVED\n"
                                            }else{
                                                sdesc += Math.round(xp/94450*10000)/100 + "% to level 25\n"
                                            }
                                            embed.addField(k.substring(17).charAt(0).toUpperCase() + k.substring(17).slice(1),sdesc,true)
                                        }else{
                                            sdesc = ""
                                            var xp = member[k]
                                            var level = 0
                                            while (skillValues[level] < xp) {
                                                level = level + 1;
                                            }
                                            level = level - 1
                                            sdesc += "Level: " + level + "\n"
                                            sdesc += "Progress: " + toKM(Math.round(xp-skillValues[level])).toString() + "/" + toKM(skillValues[level+1]-skillValues[level]).toString() +" (" + (Math.round((xp-skillValues[level])/(skillValues[level+1]-skillValues[level])*100000)/1000) + "%)\n"
                                            if (Math.round(xp/55172425*10000)/100 > 100){
                                                sdesc += "MAX LEVEL ACHIEVED\n"
                                            }else{
                                                sdesc += Math.round(xp/55172425*10000)/100 + "% to level 50\n"
                                            }
                                            embed.addField(k.substring(17).charAt(0).toUpperCase() + k.substring(17).slice(1),sdesc,true)
                                        }
                                    }
                                }


                                
                                if (count == 0) {
                                    embed.setTitle(args[1] + "'s Skills API is disabled!")
                                    .setColor(0xff0000);
                                }
                                msg.channel.send(embed);
                                return
                            } else {
                                console.log("Error in skills called by <@" + msg.author + "> sb api")
                                logger.write(getCurPSTDate() + "Error in skills called by <@" + msg.author + "> sb api\n")
                                const embed = new MessageEmbed()
                                .setTitle("An error occured!")
                                .setColor(0xff0000)
                                .setDescription("Try again later");
                                msg.channel.send(embed);
                                return
                            }
                        };
                        rt.send(null);
                    } else {
                        console.log("Error in skills called by <@" + msg.author + "> mojang api")
                        logger.write(getCurPSTDate() + "Error in skills called by <@" + msg.author + "> mojang api\n")
                        const embed = new MessageEmbed()
                        .setTitle("An error occured!")
                        .setColor(0xff0000)
                        .setDescription("Try again later");
                        msg.channel.send(embed);
                        return
                    }
                };
                r.send(null);
                
            }
            
        
    }
    request.send(null);
    console.log("Skills finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills finished by <@" + msg.author + ">\n")
}
function help(msg) {
    console.log("Help called by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Help called by <@" + msg.author + ">\n")
    const embed = new MessageEmbed()
    .setTitle("Commands")
    .setColor(0x00ffff);
    for (var i = 0; i < commands.length; i++) {
        embed.addField(commands[i][0],commands[i][1],true)
    }
    msg.channel.send(embed);
    console.log("Help finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Help finished by <@" + msg.author + ">\n")
}
function profiles(msg) {
    console.log("Profiles called by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Profiles finished by <@" + msg.author + ">\n")
    var profiles = [];
    var args = msg.content.split(" ");
    var request = new XMLHttpRequest();
    request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4){
            if (request.responseText == "Something went wrong") {
                const embed = new MessageEmbed()
                .setTitle("Invalid Username!")
                .setColor(0xff0000)
                        
                msg.channel.send(embed);
                return
            }
            var d = request.responseText.split("<tr>")

            for (i = 0; i < d.length; i++) { 
                 d[i] = d[i].split("</td><td>")
                if (d[i][1] != undefined) {
                    profiles.push(d[i][1])
                }
            }
            var desc = ""
            for (i=0; i < profiles.length; i++) {
                desc += profiles[i] + "\n"
            }
            const embed = new MessageEmbed()
            .setTitle(args[1] + "'s profiles")
            .setColor(0x00ffff)
            .setDescription(desc);
            msg.channel.send(embed);
            return
        }
    };
    console.log("Profiles finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Profiles finished by <@" + msg.author + ">\n")
}
function findUpdate(){
  console.log("Checking for an update...")
  logger.write(getCurPSTDate() + "Checking for an update...\n")
  var rt = new XMLHttpRequest();
  rt.open("GET", "https://api.hypixel.net/skyblock/news?key=" + key, false);
  rt.responseType = 'json';
  rt.onload = function() {
      var status = rt.status;
      if (status === 200) {
          try{
            json = JSON.parse(rt.responseText);
            if (json["success"] == true) {
              var newLink = json["items"][0]["link"];
              if (newLink != upC) {
                fs.writeFile('lastUpdateCode.txt', newLink, function (err) {
                    if (err) throw err;
                  });
                upC = newLink;
                client.channels.cache.get('729856965471109130').send(upC);
              }
            }
          } catch (err) {
            console.log(err)
            logger.write(getCurPSTDate() + "Error parsing JSON!\n")
          }
      } else {
          
      }
  };
  rt.send(null);
}
function findKeys(){
    console.log("Checking API keys...")
    logger.write(getCurPSTDate() + "Checking API keys...\n")
    kj = []
    var it = 0
    for (it = 0; it < kp.length; it ++) {
        console.log("Checking Profile #" + it)
        logger.write(getCurPSTDate() + "Checking Profile #" + it + "\n")
        var rt = new XMLHttpRequest();
        rt.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + key + "&profile=" + kp[it][0], false);
        rt.responseType = 'json';
        var data = {};
        rt.onload = function() {
            var status = rt.status;
            if (status === 200) {
                
                
                try{
                  json = JSON.parse(rt.responseText);
                  iterate(json, "")
                } catch (err) {
                  console.log(err)
                  logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                }
            } else {
                
            }
        };
        rt.send(null);
    }
    var tg = ""
    const embed = new MessageEmbed()
    .setTitle("Something Changed!")
    .setColor(0x00ff00)
    var out = []
    fs.readFile(__dirname + '/newFields.txt', {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            kj = data.split("\n")
            dif = arr_diff(keys, kj)
            dif2 = arr_diff(kj, keys)
            console.log(dif.length)
            console.log(dif2.length)

            if (dif.length != 0 || dif2.length != 0) {
                console.log("Something was changed: +" + dif + ", -" + dif2)
                logger.write(getCurPSTDate() + "Something was changed: +" + dif + ", -" + dif2 + "\n")
                fs.writeFile('newFields.txt', keys.join("\n"), function (err) {
                    if (err) throw err;
                    console.log('Saved to file!');
                    logger.write(getCurPSTDate() + "Saved to file!n")
                    });
                if (dif.length != 0) {
                    tg += "**Added:**\n"
                    for (var i = 0; i < 25 && i < dif.length; i ++){
                        tg += dif[i] + "\n"
                    }
                    if (dif.length > 25) {
                        tg += "_and " + (dif.length - 25) + " more_\n"
                    }
                }
                if (dif2.length != 0) {
                    tg += "\n**Removed:**\n"
                    for (var i = 0; i < 25 && i < dif2.length; i ++){
                        tg += dif2[i] + "\n"
                    }
                    if (dif2.length > 25) {
                        tg += "_and " + (dif2.length - 25) + " more_\n"
                    }
                }
                embed.setDescription(tg);
                client.channels.cache.get('729856965471109130').send(embed);
                kj = keys.slice();
            }
            
        } else {
            console.log(err);
            logger.write(getCurPSTDate() + "Error reading newFields.txt while checking keys!\n")
        }
    });
    //kj = ["a"]
   
    
}
client.on('ready', () => {
    
    channel = client.channels.cache.get('729889897485434991')
    
    console.log(`Logged in as ${client.user.tag}!`);
    logger.write(getCurPSTDate() + `Logged in as ${client.user.tag}!` + "\n")
    client.user.setActivity("=help | created by tillvit");
    findKeys()
    findUpdate() 
    setInterval(function(){ 
        findKeys() 
        findUpdate()
    }, 120000);
    getTime()
    UpdateTimers()
    setInterval(function(){ 
        UpdateTimers()
    }, 5000);
    setInterval(function(){ 
        getTime()
    }, 60000);
});

var testCommandMessages = ["is bipolar", "gae", ", 15 seconds could ping you 15 times in discord"];


client.on('message', msg => {
    if (msg.channel.type == "dm" || msg.channel.name == "bot") {
        if (msg.content.startsWith("=skills")) {
            skills(msg)
        }
        if (msg.content.startsWith("=help")) {
            help(msg)
        }
        if (msg.content.startsWith("=profiles")) {
            profiles(msg)
        }
        if (msg.content.startsWith("=test")) {
            //msg.channel.bulkDelete(1)
            var randomNumber = getRandomInt(3)
            msg.channel.send("<@" + msg.author + "> " + testCommandMessages[randomNumber])
            if (randomNumber == 2) {
                for(var i = 0; i < 14; i ++) {
                    msg.channel.send("<@" + msg.author + "> " + testCommandMessages[randomNumber])
                }

            }

        }
    } 
});

client.login(process.env.DISCORD_TOKEN);