/*********************************************************
  
  /_/_/_  /_  /_  /_/_          skyblock
  /_      /_  /_  /_  /_        
  /_/_/_  /_  /_  /_/_          update
      /_  /_  /_  /_  /_
  /_/_/_  /_/_/_  /_/_          bot     created by tillvit

*********************************************************/


//Declare Requires
const $ = require('jquery');
const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { exec } = require('child_process');
const {distance, closest} = require('fastest-levenshtein')

//Repl.it start
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot is running!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//Declare Globals
var finishedProfiles = 0;
var upC = ""
var kj = []
var keys = []
var kp = [["c2189a914ed846b9a137ed92cec5257f","c2189a914ed846b9a137ed92cec5257f"],["dae29cb637bb4193a737aaef10315b72","b305db79094d4e828d7f500f0d82fac2"],["dae29cb637bb4193a737aaef10315b72","724c64a2fc8b4842852b6b4c2c6ef241"],["7f058ec852f44cfc97b46166ababac70","e1ed1823b443477d96b4281b194e17ab"],["672ef79b4d0a4805bc529d1ae44bc26b","672ef79b4d0a4805bc529d1ae44bc26b"]]
var timerNames = ["Magma Boss", "Dark Auction", "Bank", "New Year", "Spooky Fest", "Winter Fest", "Travelling Zoo"]
var timers = [0,0,0,0,0,0,0]
var commands = [["=help","Lists commands"],["=skills <ign> <profile>", "Shows the skills of a player in a profile"],["=profiles <ign>", "Lists the profiles of a player"],["=bazaar <margin/profit/smart/worst>\nor\n=bazaar info <product>\nor =bazaar crafts <orders/insta> <margin/profit>", "Shows best products to flip/craft in the bazaar"],["=test", "Test command run at your own risk"]]
var testCommandMessages = ["is bipolar", "gae", ", 15 seconds could ping you 15 times in discord"];
var itemNames = {"BROWN_MUSHROOM":"Brown Mushroom","INK_SACK:3":"Cocoa Beans","INK_SACK:4":"Lapis Lazuli","TARANTULA_WEB":"Tarantula Web","CARROT_ITEM":"Carrot","ENCHANTED_POTATO":"Enchanted Potato","ENCHANTED_SLIME_BALL":"Enchanted Slimeball","ENCHANTED_RED_MUSHROOM":"Enchanted Red Mushroom","ENCHANTED_GOLDEN_CARROT":"Enchanted Golden Carrot","ENCHANTED_RABBIT_HIDE":"Enchanted Rabbit Hide","ENCHANTED_BIRCH_LOG":"Enchanted Birch Wood","ENCHANTED_GUNPOWDER":"Enchanted Gunpowder","ENCHANTED_MELON":"Enchanted Melon","ENCHANTED_SUGAR":"Enchanted Sugar","CACTUS":"Cactus","ENCHANTED_BLAZE_ROD":"Enchanted Blaze Rod","ENCHANTED_CAKE":"Enchanted Cake","PUMPKIN":"Pumpkin","ENCHANTED_BROWN_MUSHROOM":"Enchanted Brown Mushroom","WHEAT":"Wheat","ENCHANTED_RAW_SALMON":"Enchanted Raw Salmon","ENCHANTED_GLISTERING_MELON":"Enchanted Glistering Melon","PRISMARINE_SHARD":"Prismarine Shard","PROTECTOR_FRAGMENT":"Protector Dragon Fragment","ENCHANTED_EMERALD":"Enchanted Emerald","ENCHANTED_SPIDER_EYE":"Enchanted Spider Eye","RED_MUSHROOM":"Red Mushroom","MUTTON":"Mutton","ENCHANTED_MELON_BLOCK":"Enchanted Melon Block","DIAMOND":"Diamond","WISE_FRAGMENT":"Wise Dragon Fragment","COBBLESTONE":"Cobblestone","SPIDER_EYE":"Spider Eye","RAW_FISH":"Raw Fish","ENCHANTED_PUFFERFISH":"Enchanted Pufferfish","POTATO_ITEM":"Potato","ENCHANTED_HUGE_MUSHROOM_1":"Enchanted Brown Mushroom Block","ENCHANTED_COBBLESTONE":"Enchanted Cobblestone","ENCHANTED_HUGE_MUSHROOM_2":"Enchanted Red Mushroom Block","ICE_BAIT":"Ice Bait","PORK":"Raw Porkchop","PRISMARINE_CRYSTALS":"Prismarine Crystals","ICE":"Ice","HUGE_MUSHROOM_1":"Brown Mushroom Block","HUGE_MUSHROOM_2":"Red Mushroom Block","LOG_2:1":"Dark Oak Wood","ENCHANTED_SNOW_BLOCK":"Enchanted Snow Block","GOLDEN_TOOTH":"Golden Tooth","STRING":"String","RABBIT_FOOT":"Rabbit's Foot","REDSTONE":"Redstone","ENCHANTED_CACTUS_GREEN":"Enchanted Cactus Green","ENCHANTED_CARROT_ON_A_STICK":"Was Temporarily: Enchanted Carrot on a Stick","ENCHANTED_LAPIS_LAZULI_BLOCK":"Enchanted Lapis Block","ENCHANTED_ENDSTONE":"Enchanted End Stone","ENCHANTED_COOKIE":"Enchanted Cookie","ENCHANTED_SAND":"Enchanted Sand","ENCHANTED_STRING":"Enchanted String","STRONG_FRAGMENT":"Strong Dragon Fragment","SLIME_BALL":"Slimeball","SNOW_BALL":"Snowball","HOLY_FRAGMENT":"Holy Dragon Fragment","ENCHANTED_ACACIA_LOG":"Enchanted Acacia Wood","ENCHANTED_EGG":"Enchanted Egg","SAND":"Sand","RAW_CHICKEN":"Raw Chicken","ENCHANTED_LAPIS_LAZULI":"Enchanted Lapis Lazuli","ENCHANTED_GHAST_TEAR":"Enchanted Ghast Tear","ENCHANTED_COCOA":"Enchanted Cocoa Bean","CARROT_BAIT":"Carrot Bait","SEEDS":"Seeds","ENCHANTED_LEATHER":"Enchanted Leather","ENCHANTED_SPONGE":"Enchanted Sponge","HAY_BLOCK":"Hay Bale","FLINT":"Flint","INK_SACK":"Ink Sack","ENCHANTED_ROTTEN_FLESH":"Enchanted Rotten Flesh","WOLF_TOOTH":"Wolf Tooth","ENCHANTED_SPRUCE_LOG":"Enchanted Spruce Wood","ENCHANTED_GRILLED_PORK":"Enchanted Grilled Pork","ENCHANTED_NETHER_STALK":"Enchanted Nether Wart","ENCHANTED_REDSTONE_BLOCK":"Enchanted Redstone Block","ENCHANTED_QUARTZ_BLOCK":"Enchanted Quartz Block","GREEN_CANDY":"Green Candy","ENCHANTED_REDSTONE":"Enchanted Redstone","ENCHANTED_REDSTONE_LAMP":"Enchanted Redstone Lamp","GRAVEL":"Gravel","MELON":"Melon","ENCHANTED_LAVA_BUCKET":"Enchanted Lava Bucket","ENCHANTED_PACKED_ICE":"Enchanted Packed Ice","RAW_FISH:3":"Pufferfish","ENCHANTED_PRISMARINE_SHARD":"Enchanted Prismarine Shard","ENCHANTED_IRON_BLOCK":"Enchanted Iron Block","BONE":"Bone","RAW_FISH:2":"Clownfish","RAW_FISH:1":"Raw Salmon","REVENANT_FLESH":"Revenant Flesh","ENCHANTED_GLOWSTONE":"Enchanted Glowstone","ENCHANTED_PORK":"Enchanted Pork","FEATHER":"Feather","NETHERRACK":"Netherrack","WHALE_BAIT":"Whale Bait","SPONGE":"Sponge","BLAZE_ROD":"Blaze Rod","ENCHANTED_DARK_OAK_LOG":"Enchanted Dark Oak Wood","YOUNG_FRAGMENT":"Young Dragon Fragment","ENCHANTED_CLOWNFISH":"Enchanted Clownfish","ENCHANTED_GOLD":"Enchanted Gold","ENCHANTED_RAW_CHICKEN":"Enchanted Raw Chicken","ENCHANTED_WATER_LILY":"Enchanted Lily Pad","LOG:1":"Spruce Wood","CATALYST":"Catalyst","LOG:3":"Jungle Wood","LOG:2":"Birch Wood","BLESSED_BAIT":"Blessed Bait","ENCHANTED_GLOWSTONE_DUST":"Enchanted Glowstone Dust","ENCHANTED_INK_SACK":"Enchanted Ink Sack","ENCHANTED_CACTUS":"Enchanted Cactus","ENCHANTED_SUGAR_CANE":"Enchanted Sugar Cane","ENCHANTED_COOKED_SALMON":"Enchanted Cooked Salmon","ENCHANTED_SEEDS":"Enchanted Seeds","LOG":"Oak Wood","GHAST_TEAR":"Ghast Tear","UNSTABLE_FRAGMENT":"Unstable Dragon Fragment","ENCHANTED_ENDER_PEARL":"Enchanted Ender Pearl","PURPLE_CANDY":"Purple Candy","ENCHANTED_FERMENTED_SPIDER_EYE":"Enchanted Fermented Spider Eye","SPIKED_BAIT":"Spiked Bait","ENCHANTED_GOLD_BLOCK":"Enchanted Gold Block","ENCHANTED_JUNGLE_LOG":"Enchanted Jungle Wood","ENCHANTED_FLINT":"Enchanted Flint","IRON_INGOT":"Iron Ingot","ENCHANTED_EMERALD_BLOCK":"Enchanted Emerald Block","ENCHANTED_CLAY_BALL":"Enchanted Clay","GLOWSTONE_DUST":"Glowstone Dust","GOLD_INGOT":"Gold Ingot","REVENANT_VISCERA":"Revenant Viscera","TARANTULA_SILK":"Tarantula Silk","ENCHANTED_MUTTON":"Enchanted Mutton","SUPER_COMPACTOR_3000":"Super Compactor 3000","SUPER_EGG":"Super Enchanted Egg","ENCHANTED_IRON":"Enchanted Iron","STOCK_OF_STONKS":"Stock of Stonks","ENCHANTED_HAY_BLOCK":"Enchanted Hay Bale","ENCHANTED_PAPER":"Enchanted Paper","ENCHANTED_BONE":"Enchanted Bone","ENCHANTED_DIAMOND_BLOCK":"Enchanted Diamond Block","SPOOKY_BAIT":"Spooky Bait","SUPERIOR_FRAGMENT":"Superior Dragon Fragment","EMERALD":"Emerald","ENCHANTED_RABBIT_FOOT":"Enchanted Rabbit Foot","LIGHT_BAIT":"Light Bait","HOT_POTATO_BOOK":"Hot Potato Book","ENCHANTED_ICE":"Enchanted Ice","CLAY_BALL":"Clay","OLD_FRAGMENT":"Old Dragon Fragment","GREEN_GIFT":"Green Gift","PACKED_ICE":"Packed Ice","WATER_LILY":"Lily Pad","LOG_2":"Acacia Wood","HAMSTER_WHEEL":"Hamster Wheel","ENCHANTED_OBSIDIAN":"Enchanted Obsidian","ENCHANTED_COAL":"Enchanted Coal","ENCHANTED_QUARTZ":"Enchanted Quartz","COAL":"Coal","ENDER_PEARL":"Ender Pearl","ENCHANTED_COAL_BLOCK":"Enchanted Block of Coal","ENCHANTED_PRISMARINE_CRYSTALS":"Enchanted Prismarine Crystals","ENCHANTED_WET_SPONGE":"Enchanted Wet Sponge","ENCHANTED_RAW_FISH":"Enchanted Raw Fish","ENDER_STONE":"End Stone","QUARTZ":"Nether Quartz","FOUL_FLESH":"Foul Flesh","RAW_BEEF":"Raw Beef","ENCHANTED_EYE_OF_ENDER":"Enchanted Eye of Ender","ENCHANTED_CARROT_STICK":"Enchanted Carrot on a Stick","RECOMBOBULATOR_3000":"Recombobulator 3000","SUGAR_CANE":"Sugar Cane","MAGMA_CREAM":"Magma Cream","RED_GIFT":"Red Gift","ENCHANTED_RAW_BEEF":"Enchanted Raw Beef","ENCHANTED_FEATHER":"Enchanted Feather","ENCHANTED_SLIME_BLOCK":"Enchanted Slime Block","ENCHANTED_OAK_LOG":"Enchanted Oak Wood","RABBIT_HIDE":"Rabbit Hide","WHITE_GIFT":"White Gift","RABBIT":"Raw Rabbit","SULPHUR":"Gunpowder","NETHER_STALK":"Nether Wart","DARK_BAIT":"Dark Bait","ENCHANTED_CARROT":"Enchanted Carrot","ENCHANTED_PUMPKIN":"Enchanted Pumpkin","ROTTEN_FLESH":"Rotten Flesh","ENCHANTED_COOKED_FISH":"Enchanted Cooked Fish","OBSIDIAN":"Obsidian","MINNOW_BAIT":"Minnow Bait","ENCHANTED_MAGMA_CREAM":"Enchanted Magma Cream","ENCHANTED_FIREWORK_ROCKET":"Enchanted Firework Rocket","LEATHER":"Leather","ENCHANTED_COOKED_MUTTON":"Enchanted Cooked Mutton","ENCHANTED_RABBIT":"Enchanted Raw Rabbit","ENCHANTED_BREAD":"Enchanted Bread","FUMING_POTATO_BOOK":"Fuming Potato Book","ENCHANTED_CHARCOAL":"Enchanted Charcoal","ENCHANTED_BLAZE_POWDER":"Enchanted Blaze Powder","SUMMONING_EYE":"Summoning Eye","FISH_BAIT":"Fish Bait","SNOW_BLOCK":"Snow Block","ENCHANTED_BAKED_POTATO":"Enchanted Baked Potato","COMPACTOR":"Compactor","ENCHANTED_DIAMOND":"Enchanted Diamond"};
var itemIDs = {}

var crafts = {"ENCHANTED_POTATO":{"POTATO_ITEM":160},"ENCHANTED_SLIME_BALL":{"SLIME_BALL":160},"ENCHANTED_RED_MUSHROOM":{"RED_MUSHROOM":160},"ENCHANTED_GOLDEN_CARROT":{"ENCHANTED_CARROT":128,"CARROT_ITEM":32,"GOLD_INGOT":29},"ENCHANTED_RABBIT_HIDE":{"RABBIT_HIDE":576},"ENCHANTED_BIRCH_LOG":{"LOG:2":160},"ENCHANTED_GUNPOWDER":{"SULPHUR":160},"ENCHANTED_MELON":{"MELON":160},"ENCHANTED_SUGAR":{"SUGAR_CANE":160},"ENCHANTED_BLAZE_ROD":{"ENCHANTED_BLAZE_POWDER":160},"ENCHANTED_BROWN_MUSHROOM":{"BROWN_MUSHROOM":160},"ENCHANTED_RAW_SALMON":{"RAW_FISH:1":160},"ENCHANTED_GLISTERING_MELON":{"GOLD_INGOT":228,"MELON":256},"ENCHANTED_EMERALD":{"EMERALD":160},"ENCHANTED_SPIDER_EYE":{"SPIDER_EYE":160},"ENCHANTED_MELON_BLOCK":{"ENCHANTED_MELON":160},"ENCHANTED_PUFFERFISH":{"RAW_FISH:3":160},"ENCHANTED_PRISMARINE_SHARD":{"PRISMARINE_SHARD":160},"ENCHANTED_HUGE_MUSHROOM_1":{"HUGE_MUSHROOM_1":576},"ENCHANTED_COBBLESTONE":{"COBBLESTONE":160},"ENCHANTED_HUGE_MUSHROOM_2":{"HUGE_MUSHROOM_2":576},"ICE_BAIT":{"ICE_BAIT":1,"RAW_FISH":1},"HUGE_MUSHROOM_1":{"BROWN_MUSHROOM":9},"HUGE_MUSHROOM_2":{"RED_MUSHROOM":9},"ENCHANTED_SNOW_BLOCK":{"SNOW_BLOCK":160},"GOLDEN_TOOTH":{"ENCHANTED_GOLD":32,"WOLF_TOOTH":128},"ENCHANTED_LAPIS_LAZULI_BLOCK":{"ENCHANTED_LAPIS_LAZULI":160},"ENCHANTED_ENDSTONE":{"ENDER_STONE":160},"ENCHANTED_COOKIE":{"ENCHANTED_COCOA":128,"WHEAT":32},"ENCHANTED_SAND":{"SAND":160},"ENCHANTED_STRING":{"STRING":160},"ENCHANTED_ACACIA_LOG":{"LOG:2":160},"ENCHANTED_LAPIS_LAZULI":{"INK_SACK:4":160},"ENCHANTED_GHAST_TEAR":{"GHAST_TEAR":5},"ENCHANTED_COCOA":{"INK_SACK:3":160},"CARROT_BAIT":{"CARROT_ITEM":1,"RAW_FISH":1},"ENCHANTED_LEATHER":{"LEATHER":576},"ENCHANTED_SPONGE":{"SPONGE":40},"HAY_BLOCK":{"WHEAT":9},"ENCHANTED_ROTTEN_FLESH":{"ROTTEN_FLESH":160},"ENCHANTED_SPRUCE_LOG":{"LOG:1":160},"ENCHANTED_GRILLED_PORK":{"ENCHANTED_PORK":160},"ENCHANTED_NETHER_STALK":{"NETHER_STALK":160},"ENCHANTED_REDSTONE_BLOCK":{"ENCHANTED_REDSTONE":160},"ENCHANTED_QUARTZ_BLOCK":{"ENCHANTED_QUARTZ":160},"ENCHANTED_REDSTONE":{"REDSTONE":160},"ENCHANTED_REDSTONE_LAMP":{"ENCHANTED_REDSTONE":128,"ENCHANTED_GLOWSTONE_DUST":32},"ENCHANTED_LAVA_BUCKET":{"ENCHANTED_COAL_BLOCK":2,"ENCHANTED_IRON":3},"ENCHANTED_PACKED_ICE":{"ENCHANTED_ICE":160},"ENCHANTED_IRON_BLOCK":{"ENCHANTED_IRON":160},"ENCHANTED_GLOWSTONE":{"ENCHANTED_GLOWSTONE_DUST":160},"ENCHANTED_PORK":{"PORK":160},"WHALE_BAIT":{"FISH_BAIT":1,"LIGHT_BAIT":1,"DARK_BAIT":1,"BLESSED_BAIT":1},"ENCHANTED_DARK_OAK_LOG":{"LOG_2:1":160},"ENCHANTED_CLOWNFISH":{"RAW_FISH:2":160},"ENCHANTED_GOLD":{"GOLD_INGOT":160},"ENCHANTED_RAW_CHICKEN":{"RAW_CHICKEN":160},"ENCHANTED_WATER_LILY":{"WATER_LILY":160},"BLESSED_BAIT":{"RAW_FISH":1,"GOLD_INGOT":9,"PRISMARINE_CRYSTALS":1},"ENCHANTED_GLOWSTONE_DUST":{"GLOWSTONE_DUST":160},"ENCHANTED_INK_SACK":{"INK_SACK":80},"ENCHANTED_CACTUS":{"ENCHANTED_CACTUS_GREEN":160},"ENCHANTED_SUGAR_CANE":{"ENCHANTED_SUGAR":160},"ENCHANTED_COOKED_SALMON":{"ENCHANTED_RAW_SALMON":160},"ENCHANTED_SEEDS":{"SEEDS":160},"ENCHANTED_ENDER_PEARL":{"ENDER_PEARL":20},"ENCHANTED_FERMENTED_SPIDER_EYE":{"ENCHANTED_SPIDER_EYE":64,"BROWN_MUSHROOM":64,"SUGAR_CANE":64},"SPIKED_BAIT":{"RAW_FISH:3":1,"RAW_FISH":1},"ENCHANTED_GOLD_BLOCK":{"ENCHANTED_GOLD":160},"ENCHANTED_JUNGLE_LOG":{"LOG:3":160},"ENCHANTED_FLINT":{"FLINT":160},"ENCHANTED_EMERALD_BLOCK":{"ENCHANTED_EMERALD":160},"ENCHANTED_CLAY_BALL":{"CLAY_BALL":160},"REVENANT_VISCERA":{"ENCHANTED_STRING":32,"REVENANT_FLESH":128},"TARANTULA_SILK":{"TARANTULA_WEB":128,"ENCHANTED_FLINT":32},"ENCHANTED_MUTTON":{"MUTTON":160},"SUPER_COMPACTOR_3000":{"ENCHANTED_COBBLESTONE":448,"ENCHANTED_REDSTONE_BLOCK":1},"SUPER_EGG":{"ENCHANTED_EGG":144},"ENCHANTED_IRON":{"IRON_INGOT":160},"ENCHANTED_HAY_BLOCK":{"HAY_BLOCK":144},"ENCHANTED_PAPER":{"SUGAR_CANE":192},"ENCHANTED_BONE":{"BONE":160},"ENCHANTED_DIAMOND_BLOCK":{"ENCHANTED_DIAMOND":160},"SPOOKY_BAIT":{"RAW_FISH":1,"PUMPKIN":1},"ENCHANTED_RABBIT_FOOT":{"RABBIT_FOOT":160},"LIGHT_BAIT":{"PRISMARINE_CRYSTALS":2,"RAW_FISH":1},"HOT_POTATO_BOOK":{"ENCHANTED_BAKED_POTATO":1,"SUGAR_CANE":3},"ENCHANTED_ICE":{"ICE":160},"PACKED_ICE":{"ICE":9},"ENCHANTED_OBSIDIAN":{"OBSIDIAN":160},"ENCHANTED_COAL":{"COAL":160},"ENCHANTED_QUARTZ":{"QUARTZ":160},"ENCHANTED_COAL_BLOCK":{"ENCHANTED_COAL":160},"ENCHANTED_PRISMARINE_CRYSTALS":{"PRISMARINE_CRYSTALS":80},"ENCHANTED_WET_SPONGE":{"ENCHANTED_SPONGE":40},"ENCHANTED_RAW_FISH":{"RAW_FISH":160},"ENCHANTED_EYE_OF_ENDER":{"BLAZE_ROD":32,"ENCHANTED_ENDER_PEARL":16},"ENCHANTED_CARROT_STICK":{"LOG":1,"ENCHANTED_CARROT":64},"ENCHANTED_RAW_BEEF":{"RAW_BEEF":160},"ENCHANTED_FEATHER":{"FEATHER":160},"ENCHANTED_SLIME_BLOCK":{"ENCHANTED_SLIME_BALL":160},"ENCHANTED_OAK_LOG":{"LOG":160},"ENCHANTED_CARROT":{"CARROT_ITEM":160},"ENCHANTED_PUMPKIN":{"PUMPKIN":160},"ENCHANTED_COOKED_FISH":{"ENCHANTED_RAW_FISH":160},"ENCHANTED_MAGMA_CREAM":{"MAGMA_CREAM":160},"ENCHANTED_FIREWORK_ROCKET":{"ENCHANTED_GUNPOWDER":64,"SUGAR_CANE":18},"ENCHANTED_COOKED_MUTTON":{"ENCHANTED_MUTTON":160},"ENCHANTED_RABBIT":{"RABBIT":160},"ENCHANTED_BREAD":{"WHEAT":60},"ENCHANTED_CHARCOAL":{"COAL":128,"LOG":32},"ENCHANTED_BLAZE_POWDER":{"BLAZE_ROD":160},"FISH_BAIT":{"RAW_FISH":2,"RAW_FISH:1":1},"SNOW_BLOCK":{"SNOW_BALL":4},"ENCHANTED_BAKED_POTATO":{"ENCHANTED_POTATO":160},"ENCHANTED_DIAMOND":{"DIAMOND":160},"COMPACTOR":{"ENCHANTED_COBBLESTONE":7,"ENCHANTED_REDSTONE":1},"MINNOW_BAIT":{"RAW_FISH":1,"RAW_FISH:1":1}}


//Helper Functions

function pad2(number) {
  return (number < 10 ? '0' : '') + number
}

function toKM(number) {
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
  return ("[" + nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate() + "-" + pad2(nd.getHours()) + ":" + pad2(nd.getMinutes()) + ":" + pad2(nd.getSeconds()) + "] ")
}

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
                  if (!Array.isArray(item) && typeof item == "object"){
                    iterate(item, stack + '.list');
                  }else if (!keys.includes(item)){
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

function getJSON(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "json"
    var json;
    request.onload = function() {
      try{
        json = JSON.parse(request.responseText);
        resolve(json);
      } catch (err) {
        console.log(err)
        console.log(request.status)
        console.log(request.responseText)
        logger.write(getCurPSTDate() + "Error parsing JSON!\n")
        reject(err)
      }
    }
    request.send(null)
  });
}

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

function getUUID(ign) {
  var r = new XMLHttpRequest();
  var uuid = ""
  r.open("GET", "https://api.mojang.com/users/profiles/minecraft/" + ign, false);
  r.responseType = "json";
  r.onload = function () {
    try {
      json = JSON.parse(r.responseText)
      uuid = json.id;
    } catch (err) {
      console.log(err);
      console.log(request.responseText)
      logger.write(getCurPSTDate() + "Error parsing JSON!\n")
      return ""
    }
  };
  r.send(null)
  return uuid;
}

function capitalize(str) {
  if (str.length == 0) {
    return str
  }else{
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
}

function getItemName(id) {
  if (id in itemNames) {
    return itemNames[id]
  }else{
    var words = id.split("_")
    var str = ""
    for (var i = 0; i < words.length; i ++) {
      if (words[i] == "ITEM"){
        continue
      }
      str += capitalize(words[i]) + " "
    }
    return str.trim()
  }
}

function fetchProducts() {
  return new Promise(function (resolve, reject) {
    var hasFailed = false
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.hypixel.net/skyblock/bazaar?key=" + process.env.HYPIXEL_API_KEY, false);
    request.responseType = "json"
    var json;
    request.onload = function() {
      try{
        json = JSON.parse(request.responseText);
      } catch (err) {
        console.log(err)
        console.log(request.responseText)
        logger.write(getCurPSTDate() + "Error parsing JSON!\n")
        
        hasFailed = true
        reject(err)
      }
    }
    request.send(null)
    if (hasFailed || json["success"] == false || json["products"] == null){
      resolve([])
    }
    var products = []
    for (var key in json["products"]) {
      //0: NAME
      //1: BUY
      //2: SELL
      //3: MARGIN
      //4: PROFIT
      //5: S VOLUME
      //6: B VOLUME
      //7: VOLUME DIFF
      //8: INSTA BUYS
      //9: INSTA SELLS
      //10: SMART SCORE
      var product = ["NAME",0,0,0,0,0,0,0]
      var status = json["products"][key]
      if (status["buy_summary"].length == 0 || status["sell_summary"].length == 0) {
        continue;
      }

      product[0] = getItemName(key)
      product[1] = Math.round(parseFloat(status["buy_summary"][0]["pricePerUnit"],10)*10)/10
      product[2] = Math.round(parseFloat(status["sell_summary"][0]["pricePerUnit"],10)*10)/10
      product[3] = Math.round((product[1]-product[2])*10)/10
      product[4] = Math.round(product[3]/product[1]*10000)/100
      product[5] = status["quick_status"]["buyVolume"]
      product[6] = status["quick_status"]["sellVolume"]
      product[7] = (product[5]-product[6])
      product[8] = status["quick_status"]["sellMovingWeek"]
      product[9] = status["quick_status"]["buyMovingWeek"]
      if (product[7] < 0) {
        product[10] = (0.5*product[4]+2*(product[5]/product[6]))+3*Math.log2(product[2])*(-1)
      }else{
        product[10] = (0.5*product[4]+2*(product[5]/product[6]))+3*Math.log2(product[2])
      }
      var multiplier = (((product[8]/7 + product[9]/7) / 2)/((product[5] + product[6]) / 2))
      if (multiplier > 0.5){
        product[10] = product[10] * 1
      }else{
        product[10] = product[10] * multiplier
      }
      products.push(product)
    }
    resolve(products)
  });
}

//Bot Functions
async function bazaar(msg) {
  var hasFailed = false;
  console.log("Bazaar called by <@" + msg.author + ">")
  logger.write(getCurPSTDate() + "Bazaar called by <@" + msg.author + ">" + '\n')
  var args = msg.content.split(" ")
  if (args.length == 1){
    const embed = new MessageEmbed()
    .setTitle("Missing second argument!")
    .setColor(0xff0000)
    .setDescription("Try: =bazaar <margin/profit/smart/worst>\nor =bazaar info <product>\nor =bazaar crafts <orders/insta> <margin/profit>");
    msg.channel.send(embed);
    console.log("Bazaar failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
    return
  }
  var loadingMSG = await msg.channel.send("Loading...")
  try{
    var products = await fetchProducts()
  } catch (err) {
    console.log(err)
  }

  if (args[1] == "crafts" || args[1] == "c") {
    if (args[2] != null && (args[2] == "orders" || args[2] == "o")) {
      if (args[3] == null) {
        const embed = new MessageEmbed()
        .setTitle("Missing fourth argument!")
        .setColor(0xff0000)
        .setDescription("Try: =bazaar crafts orders <margin/profit>");
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        console.log("Bazaar failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
        return 
      }
      if (args[3] != "margin" && args[3] != "profit" && args[3] != "m" && args[3] != "p") {
        const embed = new MessageEmbed()
        .setTitle("Invalid fourth argument!")
        .setColor(0xff0000)
        .setDescription("Try: =bazaar crafts orders <margin/profit>");
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        console.log("Bazaar failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
        return 
      }
      var productDict = {}
      var craftables = []
      for (var i = 0; i < products.length; i ++) {
        productDict[itemIDs[products[i][0]]] = products[i];
      }
      var prodNotFound = false
      for (var item in crafts) {
        //id, cost, sell, profit, %
        var newItem = [item,0,0,0,0]
        for (var ingredient in crafts[item]) {
          if (productDict[ingredient] == null) {
            console.log("couldn't find product: " + ingredient)
            prodNotFound = true
            continue
          }
          newItem[1] += (productDict[ingredient][2] + 0.1) * crafts[item][ingredient]
        }
        newItem[1] = Math.round(newItem[1]*10)/10
        newItem[2] = Math.round((productDict[item][1]-0.1)*10)/10
        newItem[3] = Math.round((newItem[2] - newItem[1])*10)/10
        newItem[4] = Math.round(newItem[3]/newItem[1]*1000)/10
        craftables.push(newItem)
      }
      const embed = new MessageEmbed()
      .setColor(0x00ffff)
      
      if (args[3] == "margin" || args[3] == "m") {
        embed.setTitle("Top Crafts by Margin (Buy/Sell Orders)")
        craftables.sort(function(a, b) {
          return b[3] - a[3];
        });
      }else{
        embed.setTitle("Top Crafts by Profit % (Buy/Sell Orders)")
        craftables.sort(function(a, b) {
          return b[4] - a[4];
        });
      }
      
      if (prodNotFound) {
        embed.setDescription("(Order/Sell all mats at +0.1/0.1)\nCouldn't fetch the prices of some items, so recipes needing them are not shown.")
      }else{
        embed.setDescription("(Order/Sell all mats at +0.1/0.1)")
      }
      for (var i = 0; i < 9; i ++) {
        var desc = "Order:\n"
        for (var ingredient in crafts[craftables[i][0]]) {
          desc += crafts[craftables[i][0]][ingredient] + "x " + itemNames[ingredient] + " (" + productDict[ingredient][1] + " ea)\n"
        }
        desc += "Spend **" + toKM(craftables[i][1]) + "** and sell for **" + toKM(craftables[i][2]) + "** for a profit of **" + toKM(craftables[i][3]) + "** (" + craftables[i][4] + "%)"
        embed.addField(itemNames[craftables[i][0]],desc,true)
        
      }
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar finished by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
      return
    }else if (args[2] != null && (args[2] == "insta" || args[2] == "i")){
      if (args[3] == null) {
        const embed = new MessageEmbed()
        .setTitle("Missing fourth argument!")
        .setColor(0xff0000)
        .setDescription("Try: =bazaar crafts insta <margin/profit>");
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        console.log("Bazaar failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
        return 
      }
      if (args[3] != "margin" && args[3] != "profit" && args[3] != "m" && args[3] != "p") {
        const embed = new MessageEmbed()
        .setTitle("Invalid fourth argument!")
        .setColor(0xff0000)
        .setDescription("Try: =bazaar crafts insta <margin/profit>");
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        console.log("Bazaar failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
        return 
      }
      var productDict = {}
      var craftables = []
      for (var i = 0; i < products.length; i ++) {
        productDict[itemIDs[products[i][0]]] = products[i];
      }
      var prodNotFound = false
      for (var item in crafts) {
        //id, cost, sell, profit, %
        var newItem = [item,0,0,0,0]
        for (var ingredient in crafts[item]) {
          if (productDict[ingredient] == null) {
            console.log("couldn't find product: " + ingredient)
            prodNotFound = true
            continue
          }
          newItem[1] += productDict[ingredient][1] * crafts[item][ingredient]
        }
        newItem[1] = Math.round(newItem[1]*10)/10
        newItem[2] = Math.round(productDict[item][2]*10)/10
        newItem[3] = Math.round((newItem[2] - newItem[1])*10)/10
        newItem[4] = Math.round(newItem[3]/newItem[1]*1000)/10
        craftables.push(newItem)
      }
      const embed = new MessageEmbed()
      .setColor(0x00ffff)
      
      if (args[3] == "margin" || args[3] == "m") {
        embed.setTitle("Top Crafts by Margin (Insta Buy/Sell)")
        craftables.sort(function(a, b) {
          return b[3] - a[3];
        });
      }else{
        embed.setTitle("Top Crafts by Profit % (Insta Buy/Sell)")
        craftables.sort(function(a, b) {
          return b[4] - a[4];
        });
      }
      
      if (prodNotFound) {
        embed.setDescription("Couldn't fetch the prices of some items, so recipes needing them are not shown.")
      }
      for (var i = 0; i < 9; i ++) {
        var desc = "Buy:\n"
        for (var ingredient in crafts[craftables[i][0]]) {
          desc += crafts[craftables[i][0]][ingredient] + "x " + itemNames[ingredient] + " (" + productDict[ingredient][1] + " ea)\n"
        }
        desc += "Spend **" + toKM(craftables[i][1]) + "** and sell for **" + toKM(craftables[i][2]) + "** for a profit of **" + toKM(craftables[i][3]) + "** (" + craftables[i][4] + "%)"
        embed.addField(itemNames[craftables[i][0]],desc,true)
        
      }
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar finished by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
      return
    }else{
      const embed = new MessageEmbed()
      .setTitle("Missing third argument!")
      .setColor(0xff0000)
      .setDescription("Try: =bazaar crafts <orders/insta> <margin/profit>");
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return 
    }
  }

  var desiredProduct = ""
  var autocorrected = false

  if (args[1] == "info" || args[1] == "i") {
    var words = msg.content.split(" ")
    words.splice(0,2)
    var query = words.join(" ")
    if (query == "") {
      const embed = new MessageEmbed()
      .setTitle("Missing third argument!")
      .setColor(0xff0000)
      .setDescription("Try: =bazaar info <product>");
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return
    }
    var suggestions = []
    var lowestDiff = 99999
    for (var key in itemIDs) {
      var difference = distance(query.toLowerCase(), key.toLowerCase())
      if (difference < lowestDiff) {
        lowestDiff = difference
        suggestions = []
        suggestions.push(itemIDs[key])
      }else if (difference == lowestDiff) {
        suggestions.push(itemIDs[key])
      }
    }

    if (suggestions.length == 1 && lowestDiff == 0) {
      autocorrected = false
      desiredProduct = suggestions[0]
    }else if (suggestions.length == 1 && lowestDiff < 10) {
      desiredProduct = suggestions[0]
      autocorrected = true
    }else if (lowestDiff < 7 && suggestions.length < 3) {
      const embed = new MessageEmbed()
      .setTitle("Couldn't find the product " + '"' + query + '"')
      .setColor(0xff0000)
      var description = "Did you mean: \n";
      for (var i = 0; i < suggestions.length; i ++) {
        description += itemNames[suggestions[i]] + "\n"
      }
      embed.setDescription(description);
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return
    }else {
      const embed = new MessageEmbed()
      .setTitle("Couldn't find the product " + '"' + query + '"')
      .setColor(0xff0000)
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return
    }
  }

  
  
  if (products.length == 0) {
    const embed = new MessageEmbed()
    .setTitle("An error occured!")
    .setColor(0xff0000)
    .setDescription("Something went wrong with the Hypixel API! Try again later!");
    msg.channel.send(embed);
    console.log("Bazaar failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
    return
  }

  const embed = new MessageEmbed()
  .setColor(0x00ffff)
  
  var lowestScore = 999999999
  var highestScore = -999999999
  for (var i = 0; i < products.length; i ++) {
    if (products[i][10] < lowestScore) {
      lowestScore = products[i][10]
    }
    if (products[i][10] > highestScore) {
      highestScore = products[i][10]
    }
  }

  
  var finInfo = false
  args[1] = args[1].toLowerCase()

  switch (args[1]){
    case "margin":
    case "m":
      embed.setTitle("Top Bazaar products by Margin:")
      products.sort(function(a, b) {
        return b[3] - a[3];
      });
      break;
    case "profit":
    case "p":
      embed.setTitle("Top Bazaar products by Profit (%):")
      products.sort(function(a, b) {
        return b[4] - a[4];
      });
      break;
    case "smart":
    case "s":
      embed.setTitle("Top Bazaar flips:")
      products.sort(function(a, b) {
        return b[10] - a[10];
      });
      break;
    case "worst":
    case "w":
      embed.setTitle("Worst Bazaar flips:")
      products.sort(function(a, b) {
        return a[10] - b[10];
      });
      break;
    case "info":
    case "i":
      for (var i = 0 ; i < products.length; i ++) {
        if (itemIDs[products[i][0]] == desiredProduct) {
          embed.setTitle(itemNames[desiredProduct] + " (" + Math.round(((products[i][10] - lowestScore) / (highestScore - lowestScore))*1000)/10 + ")")
          if (autocorrected) {
            embed.addField("Autocorrected to " + itemNames[desiredProduct] ,"Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)",true)
          }else{
            embed.setDescription("Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)")
          }
          finInfo = true;
          break;
        }
      }
      var productDict = {}
      var craftables = []
      var prodNotFound = false
      for (var i = 0; i < products.length; i ++) {
        productDict[itemIDs[products[i][0]]] = products[i];
      }
      var item = desiredProduct
      //id, cost, sell, profit, %
      var newItem = [item,0,0,0,0]
      for (var ingredient in crafts[item]) {
        if (productDict[ingredient] == null) {
          console.log("couldn't find product: " + ingredient)
          prodNotFound = true
          continue
        }
        newItem[1] += productDict[ingredient][1] * crafts[item][ingredient]
      }
      newItem[1] = Math.round(newItem[1]*10)/10
      newItem[2] = Math.round(productDict[item][2]*10)/10
      newItem[3] = Math.round((newItem[2] - newItem[1])*10)/10
      newItem[4] = Math.round(newItem[3]/newItem[1]*1000)/10
      craftables.push(newItem)
      if (!prodNotFound) {
        var desc = "Buy:\n"
        for (var ingredient in crafts[craftables[0][0]]) {
          desc += crafts[craftables[0][0]][ingredient] + "x " + itemNames[ingredient] + " (" + productDict[ingredient][1] + " ea)\n"
        }
        desc += "Spend **" + toKM(craftables[0][1]) + "** and sell for **" + toKM(craftables[0][2]) + "** for a profit of **" + toKM(craftables[0][3]) + "** (" + craftables[0][4] + "%)"
        embed.addField("Crafing with Insta Buy",desc,true)

        craftables = []
        //id, cost, sell, profit, %
        var newItem = [item,0,0,0,0]
        for (var ingredient in crafts[item]) {
          if (productDict[ingredient] == null) {
            console.log("couldn't find product: " + ingredient)
            prodNotFound = true
            continue
          }
          newItem[1] += (productDict[ingredient][2] + 0.1) * crafts[item][ingredient]
        }
        newItem[1] = Math.round(newItem[1]*10)/10
        newItem[2] = Math.round((productDict[item][1]-0.1)*10)/10
        newItem[3] = Math.round((newItem[2] - newItem[1])*10)/10
        newItem[4] = Math.round(newItem[3]/newItem[1]*1000)/10
        craftables.push(newItem)
        var desc = "Order:\n"
        for (var ingredient in crafts[craftables[0][0]]) {
          desc += crafts[craftables[0][0]][ingredient] + "x " + itemNames[ingredient] + " (" + productDict[ingredient][1] + " ea)\n"
        }
        desc += "Spend **" + toKM(craftables[0][1]) + "** and sell for **" + toKM(craftables[0][2]) + "** for a profit of **" + toKM(craftables[0][3]) + "** (" + craftables[0][4] + "%)"
        embed.addField("Crafing with Orders",desc,true)
      }else {
        embed.addField("Couldn't fetch an item's price!","Try again later",true)
      }
      if (finInfo){
        msg.channel.send(embed);
        console.log("Bazaar finished by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
      }
      if (!finInfo) {
        const embed = new MessageEmbed()
        .setTitle("An error occured!")
        .setColor(0xff0000)
        .setDescription("Something went wrong! Try again later!");
        msg.channel.send(embed);
        console.log("Bazaar failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
        finInfo = true
      }
      break;
    default:
      const embed2 = new MessageEmbed()
      .setTitle("Invalid second argument!")
      .setColor(0xff0000)
      .setDescription("Try: =bazaar <margin/profit/smart/worst>\nor =bazaar info <product>");
      msg.channel.send(embed2);
      hasFailed = true;
  }
  if (finInfo) {
    return
  }
  if (hasFailed) {
    console.log("Bazaar failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
    return
  }
  

  for (var i = 0; i < 9; i ++) {
    embed.addField(products[i][0] + " (" + Math.round(((products[i][10] - lowestScore) / (highestScore - lowestScore))*1000)/10 + ")" ,"Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)",true)
  }


  msg.channel.send(embed);
  console.log("Bazaar finished by <@" + msg.author + ">")
  logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
}

async function skills(msg) {
  var hasFailed = false;
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
          console.log("Skills failed by <@" + msg.author + ">")
          logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
          return
      }
      if (args.length == 2) {
          var loadingMSG = await msg.channel.send("Loading...")
          var request = new XMLHttpRequest();
          request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
          
          request.onload = function() {
            if (request.responseText == "Something went wrong") {
                const embed = new MessageEmbed()
                .setTitle("Invalid Username!")
                .setColor(0xff0000)
                hasFailed = true
                loadingMSG.edit("‫")
                loadingMSG.edit(embed)
                return
            }
            var d = request.responseText.split("<tr>")
            for (i = 0; i < d.length; i++) { 
                d[i] = d[i].split("</td><td>")
                if (d[i][1] != undefined) {
                  var newItem = [d[i][0].substring(4), d[i][1],0]
                  profiles.push(newItem)
                }
            }
          };
          request.send(null);

          if (hasFailed){
            console.log("Skills failed by <@" + msg.author + ">")
            logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
            return
          }

          loadingMSG.edit("Loading... " + Math.round((1/(1+profiles.length))*100) +  "%")
          
          var uuid = await getUUID(args[1])
          if (uuid == "") {
            const embed = new MessageEmbed()
            .setTitle("An error occured! (SU.1)")
            .setColor(0xff0000)
            .setDescription("Something went wrong with the Mojang API! Try again later!");
            hasFailed = true
            loadingMSG.edit("‫")
            loadingMSG.edit(embed)
          }

          if (hasFailed){
            console.log("Skills failed by <@" + msg.author + ">")
            logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
            return
          }
          for (i = 0; i < profiles.length; i++) {
            try{
              var json = await getJSON("https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0])
              profiles[i][2] = json["profile"]["members"][uuid]["last_save"];
            } catch (err) {
              console.log(err)
              logger.write(getCurPSTDate() + "Error parsing JSON!\n")
              const embed = new MessageEmbed()
              .setTitle("An error occured! (S2.1)")
              .setColor(0xff0000)
              .setDescription("Something went wrong with the Hypixel API! Try again later!");
              hasFailed = true
              loadingMSG.edit("‫")
              loadingMSG.edit(embed)
            }
            loadingMSG.edit("Loading... " + Math.round(((1+i)/(1+profiles.length))*100) + "%")
          }

          if (hasFailed){
            console.log("Skills failed by <@" + msg.author + ">")
            logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
            return
          }
          profiles.sort(function(a,b){
              return b[2] - a[2];
          });
          var desc = "Try: " + msg.content + " <profile>\n\n"
          desc = desc + "**" + args[1] + "'s profiles:**\n"
          desc = desc + "*Sorted by last played*\n"
          for (i=0; i < profiles.length; i++) {
              desc += profiles[i][1] + "\n"
          }
          const embed = new MessageEmbed()
          .setTitle("Missing profile argument!")
          .setColor(0xff0000)
          .setDescription(desc);
          loadingMSG.edit("‫")
          loadingMSG.edit(embed)
          console.log("Skills finished by <@" + msg.author + ">")
          logger.write(getCurPSTDate() + "Skills finished by <@" + msg.author + ">\n")
          return
      }
  }
  var loadingMSG = await msg.channel.send("Loading...")
  var profileID = ""
  var profiles = []
  var request = new XMLHttpRequest();
  request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
  request.onload = function() {
    if (request.responseText == "Something went wrong") {
        const embed = new MessageEmbed()
        .setTitle("Invalid Username!")
        .setColor(0xff0000)
        hasFailed = true
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        return
    }
    
    var d = request.responseText.split("<tr>")

    for (i = 0; i < d.length; i++) { 
      d[i] = d[i].split("</td><td>")
      if (d[i][1] != undefined) {
        var newItem = [d[i][0].substring(4), d[i][1],0]
        profiles.push(newItem)
        if (d[i][1] == args[2].charAt(0).toUpperCase() + args[2].slice(1)) {
            profileID = d[i][0].substring(4)
        }
      }
    }
  }
  request.send(null);
  if (hasFailed){
    console.log("Skills finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills finished by <@" + msg.author + ">\n")
    return
  }
  loadingMSG.edit("‫Loading... 33%")

  var uuid = getUUID(args[1])
  if (uuid == "") {
    const embed = new MessageEmbed()
    .setTitle("An error occured with the Mojang API")
    .setColor(0xff0000)
    .setDescription("Try again later!");
    hasFailed = true
    loadingMSG.edit("‫")
    loadingMSG.edit(embed)
    return
  }
  if (hasFailed){
    console.log("Skills failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
    return
  }
  
  
  if (profileID == ""){
    for (i = 0; i < profiles.length; i++) {
      try{
        var json = await getJSON("https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0])
        profiles[i][2] = json["profile"]["members"][uuid]["last_save"];
      } catch (err) {
        console.log(err)
        logger.write(getCurPSTDate() + "Error parsing JSON!\n")
        const embed = new MessageEmbed()
        .setTitle("An error occured! (S3.1)")
        .setColor(0xff0000)
        .setDescription("Something went wrong with the Hypixel API! Try again later!");
        hasFailed = true
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        return
      }
      if (hasFailed){
        console.log("Skills failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
        return
      }
      request.send(null);
    }
    
    profiles.sort(function(a,b){
        return b[2] - a[2];
    });
    var desc = "Try: =skills " + args[1] + " <profile>\n\n"
    desc = desc + "**" + args[1] + "'s profiles:**\n"
    desc = desc + "*Sorted by last played*\n"
    for (i=0; i < profiles.length; i++) {
        desc += profiles[i][1] + "\n"
    }
    const embed = new MessageEmbed()
    .setTitle("Profile doesn't exist!")
    .setColor(0xff0000)
    .setDescription(desc); 
    loadingMSG.edit("‫")
    loadingMSG.edit(embed)
    return
  }

  const embed = new MessageEmbed()
  .setTitle(args[1] + "'s skills:")
  .setColor(0x00ffff);
  var member;
  var data = {};         
  try {
    var json = await getJSON("https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profileID)
    member = json["profile"]["members"][uuid];
  } catch (err) {
    console.log(err);
    console.log(json)
    logger.write(getCurPSTDate() + "Error parsing JSON!\n")
    hasFailed = true;
    const embed = new MessageEmbed()
    .setTitle("An error occured! (S3.2)")
    .setColor(0xff0000)
    .setDescription("Something went wrong with the Hypixel API! Try again later.");
    loadingMSG.edit("‫")
    loadingMSG.edit(embed)
    return
  }

  loadingMSG.edit("‫Loading... 66%")

  //PARSE API STAGE 1
  var skillValues = [0,50,175,375,675,1175,1925,2925,4425,6425,9925,14925,22425,32425,47425,67425,97425,147425,222425,322425,522425,822425,1222425,1722425,2322425,3022425,3822425,4722425,4722425,6822425,8022425,9322425,10722425,12222425,13822425,15522425,17322425,19222425,21222425,23322425,25522425,27822425,30222425,32722425,35322425,38072425,40972425,44072425,47472425,51172425,55172425,Infinity]
  var rune = [0,50,150,275,435,635,885,1200,1600,2100,2725,3510,4510,5760,7325,9325,11825,14950,18950,23950,30200,38050,47850,60100,75400,94450,Infinity]
  var sdesc = ""
  var count = 0;
  var avg = 0;
  var avgCount = 0;
  for (var k in member) {
    if (k.startsWith("experience_skill_")) {
      count++;
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
        if (k != "experience_skill_runecrafting" && k != "experience_skill_carpentry"){
          avg += level + (Math.round((xp-skillValues[level])/(skillValues[level+1]-skillValues[level])*1000)/1000)
          avgCount++;
        }
      }
    }
  }

  //API DISABLED
  if (count == 0) {
    try{
      var jsonTwo = await getJSON("https://api.hypixel.net/player?key=" + process.env.HYPIXEL_API_KEY + "&uuid=" + uuid) 
      var skills = [["Mining", "skyblock_excavator"],["Combat","skyblock_combat"],["Foraging","skyblock_gatherer"],["Fishing","skyblock_angler"],["Farming","skyblock_harvester"],["Taming","skyblock_domesticator"],["Alchemy","skyblock_concoctor"],["Enchanting","skyblock_augmentation"]]
      for (var i = 0; i < skills.length; i ++) {
        if ((jsonTwo["player"]["achievements"][skills[i][1]]) == null){
          embed.addField(skills[i][0],"Level 0",true)
        }else{
          embed.addField(skills[i][0],"Level " + jsonTwo["player"]["achievements"][skills[i][1]],true)
        }
      }
      embed.setDescription("This player's Skills API was disabled, so results are less accurate.")
    } catch (err) {
      console.log(jsonTwo)
      console.log(err);
      logger.write(getCurPSTDate() + "Error parsing JSON!\n")
      console.log("Skills failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
      const embed = new MessageEmbed()
      .setTitle("An error occured! (S3.3)")
      .setColor(0xff0000)
      .setDescription("Something went wrong with the Hypixel API! Try again later.");
      hasFailed = true;
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      return
    }
  }else{
    embed.setTitle(args[1] + "'s skills: (Average Skill Level: " + Math.round((avg/avgCount)*100)/100 + ")")
  }  
  loadingMSG.edit("‫")
  loadingMSG.edit(embed)

  // if (hasFailed){
  //   console.log("Skills failed by <@" + msg.author + ">")
  //   logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
  //   const embed = new MessageEmbed()
  //   .setTitle("An error occured!")
  //   .setColor(0xff0000)
  //   .setDescription("Something went wrong with the Hypixel API! Try again later.");
  //   msg.channel.send(embed);
  //   return
  // }
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

async function profiles(msg) {
    console.log("Profiles called by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Profiles called by <@" + msg.author + ">\n")
    var profiles = [];
    var hasFailed = false;
    var args = msg.content.split(" ");
    var loadingMSG = await msg.channel.send("Loading...")
    var request = new XMLHttpRequest();
    request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
    
    request.onload = function() {
      if (request.responseText == "Something went wrong") {
          const embed = new MessageEmbed()
          .setTitle("Invalid Username!")
          .setColor(0xff0000)
          loadingMSG.edit("‫")
          loadingMSG.edit(embed)
          //msg.channel.send(embed);
          hasFailed = true
          return
      }
      var d = request.responseText.split("<tr>")
      for (i = 0; i < d.length; i++) { 
          d[i] = d[i].split("</td><td>")
          if (d[i][1] != undefined) {
            var newItem = [d[i][0].substring(4), d[i][1],0]
            profiles.push(newItem)
          }
      }
    };
    request.send(null);

    if (hasFailed){
      console.log("Profiles finished by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Profiles finished by <@" + msg.author + ">\n")
      return
    }

    loadingMSG.edit("Loading... " + Math.round((1/(1+profiles.length))*100) +  "%")

    
    
    var uuid = await getUUID(args[1])
    if (uuid == "") {
      const embed = new MessageEmbed()
      .setTitle("An error occured with the Mojang API! (PU.1)")
      .setColor(0xff0000)
      .setDescription("Try again later!");
      loadingMSG.edit("‫")
      loadingMSG.edit(embed)
      hasFailed = true
    }

    if (hasFailed){
      console.log("Profiles failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Profiles failed by <@" + msg.author + ">\n")
      return
    }
    for (i = 0; i < profiles.length; i++) {
      try{
        var json = await getJSON("https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0])
        profiles[i][2] = json["profile"]["members"][uuid]["last_save"];
      } catch (err) {
        logger.write(getCurPSTDate() + "Error parsing JSON!\n")
        console.log(err)
        console.log(json)
        const embed = new MessageEmbed()
        .setTitle("An error occured! (P.1)")
        .setColor(0xff0000)
        .setDescription("Try again later!");
        loadingMSG.edit("‫")
        loadingMSG.edit(embed)
        console.log("Profiles failed by <@" + msg.author + ">")
        logger.write(getCurPSTDate() + "Profiles failed by <@" + msg.author + ">\n")
        return
      }
      loadingMSG.edit("Loading... " + Math.round(((1+i)/(1+profiles.length))*100) +  "%")
    }
    profiles.sort(function(a,b){
        return b[2] - a[2];
    });
    var desc = ""
    desc = desc + "*Sorted by last played*\n"
    for (i=0; i < profiles.length; i++) {
        desc += profiles[i][1] + "\n"
    }
    const embed = new MessageEmbed()
    .setTitle(args[1] + "'s profiles")
    .setColor(0x00ffff)
    .setDescription(desc);
    loadingMSG.edit("‫")
    loadingMSG.edit(embed)
    console.log("Profiles finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Profiles finished by <@" + msg.author + ">\n")
}

function test(msg) {
  var randomNumber = getRandomInt(3)
  msg.channel.send("<@" + msg.author + "> " + testCommandMessages[randomNumber])
  if (randomNumber == 2) {
      for(var i = 0; i < 14; i ++) {
          msg.channel.send("<@" + msg.author + "> " + testCommandMessages[randomNumber])
      }
  }
}

//Periodic Functions
function findUpdate(){
  console.log("Checking for an update...")
  logger.write(getCurPSTDate() + "Checking for an update...\n")
  var rt = new XMLHttpRequest();
  rt.open("GET", "https://api.hypixel.net/skyblock/news?key=" + process.env.HYPIXEL_API_KEY, true);
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
            console.log(request.responseText)
            logger.write(getCurPSTDate() + "Error parsing JSON!\n")
            const embed = new MessageEmbed()
            .setTitle("An error occured!")
            .setColor(0xff0000)
            .setDescription("Try again later.");
            msg.channel.send(embed);
            return
          }
      } else {
          
      }
  };
  rt.send(null);
}

function processKeys(){
  if (finishedProfiles == kp.length){
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
              console.log("Something was changed: +" + dif.length + ", -" + dif2.length)
              logger.write(getCurPSTDate() + "Something was changed: +" + dif.length + ", -" + dif2.length + "\n")
              fs.writeFile('newFields.txt', keys.join("\n"), function (err) {
                  if (err) throw err;
                  console.log('Saved to file!');
                  logger.write(getCurPSTDate() + "Saved to file!\n")
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
  }
}

function findKeys(){
  
    finishedProfiles = 0
    console.log("Checking API keys...")
    logger.write(getCurPSTDate() + "Checking API keys...\n")
    kj = []
    var it = 0
    var failed = false
    for (it = 0; it < kp.length; it ++) {
        if (failed == true) {
          break;
        }
        console.log("Checking Profile #" + it)
        logger.write(getCurPSTDate() + "Checking Profile #" + it + "\n")
        var rt = new XMLHttpRequest();
        rt.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + kp[it][0], true);
        rt.responseType = 'json';
        var data = {};
        rt.onload = function() {
          if (rt.readyState == 4){
            var status = rt.status;
            console.log("status: " + rt.status)
            if (status === 200) {
              try{
                json = JSON.parse(rt.responseText);

                iterate(json, "")
                finishedProfiles += 1
                console.log("P: " + finishedProfiles + "/" + kp.length)
                processKeys()
              } catch (err) {
                console.log(err)

                logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                return
              }
            } else {
              failed = true;
            }
          }
        };
        rt.send(null);
    }
}
//Clean Directory

exec('rm .node-xmlhttprequest-sync-*', (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  } else {
  }
});


//Start logging
var logFileName = getCurPSTDate().replace(/:/gi,"_").replace("[","").slice(0,-2) + ".txt"
console.log("saving files to: " + logFileName)
var logger = fs.createWriteStream('logs/' + logFileName, {
  flags: 'a'
})
logger.write(getCurPSTDate() + 'saving files to: ' + logFileName + '\n')

//Open Files
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

// create itemIDs
for (var key in itemNames) {
    if (itemNames.hasOwnProperty(key)) {
        itemIDs[itemNames[key]] = key;
    }
}

//Start Bot
client.on('ready', () => {
    
    channel = client.channels.cache.get('729889897485434991')
    
    console.log(`Logged in as ${client.user.tag}!`);
    logger.write(getCurPSTDate() + `Logged in as ${client.user.tag}!` + "\n")
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
        client.user.setActivity("=help | created by tillvit");
    }, 5000);
    setInterval(function(){ 
        getTime()
    }, 60000);
});

//Message Receieved
client.on('message', msg => {
    if (msg.channel.type == "dm" || msg.channel.name == "bot") {
      var cList = msg.content.split(" ")
      if (cList.length == 0) {
        return
      }
      var cmd = cList[0]
      if (cmd == "=skills" || cmd == "=s") {
          skills(msg)
      }
      if (cmd == "=bazaar" || cmd == "=b") {
          bazaar(msg)
      }
      if (cmd == "=help" || cmd == "=h") {
          help(msg)
      }
      if (cmd == "=profiles" || cmd == "=p") {
          profiles(msg)
      }
      if (cmd == "=test" || cmd == "=t") {
          test(msg)
      }
    } 
});

//Log into bot
client.login(process.env.DISCORD_TOKEN);