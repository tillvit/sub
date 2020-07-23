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
const levenshtein = require('node-levenshtein')

//Repl.it start
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//Declare Globals
var key = process.env.HYPIXEL_API_KEY
var upC = ""
var kj = []
var keys = []
var kp = [["c2189a914ed846b9a137ed92cec5257f","c2189a914ed846b9a137ed92cec5257f"],["dae29cb637bb4193a737aaef10315b72","b305db79094d4e828d7f500f0d82fac2"],["dae29cb637bb4193a737aaef10315b72","724c64a2fc8b4842852b6b4c2c6ef241"],["7f058ec852f44cfc97b46166ababac70","e1ed1823b443477d96b4281b194e17ab"],["672ef79b4d0a4805bc529d1ae44bc26b","672ef79b4d0a4805bc529d1ae44bc26b"]]
var timerNames = ["Magma Boss", "Dark Auction", "Bank", "New Year", "Spooky Fest", "Winter Fest", "Travelling Zoo"]
var timers = [0,0,0,0,0,0,0]
var commands = [["=help","Lists commands"],["=skills <ign> <profile>", "Shows the skills of a player in a profile"],["=profiles <ign>", "Lists the profiles of a player"],["=bazaar <margin/profit/smart/worst>\nor\n=bazaar info <product>", "Shows best products to flip in the bazaar"],["=test", "Test command run at your own risk"]]
var testCommandMessages = ["is bipolar", "gae", ", 15 seconds could ping you 15 times in discord"];
var itemNames = {"BROWN_MUSHROOM":"Brown Mushroom","INK_SACK:3":"Cocoa Beans","INK_SACK:4":"Lapis Lazuli","TARANTULA_WEB":"Tarantula Web","CARROT_ITEM":"Carrot","ENCHANTED_POTATO":"Enchanted Potato","ENCHANTED_SLIME_BALL":"Enchanted Slimeball","ENCHANTED_RED_MUSHROOM":"Enchanted Red Mushroom","ENCHANTED_GOLDEN_CARROT":"Enchanted Golden Carrot","ENCHANTED_RABBIT_HIDE":"Enchanted Rabbit Hide","ENCHANTED_BIRCH_LOG":"Enchanted Birch Wood","ENCHANTED_GUNPOWDER":"Enchanted Gunpowder","ENCHANTED_MELON":"Enchanted Melon","ENCHANTED_SUGAR":"Enchanted Sugar","CACTUS":"Cactus","ENCHANTED_BLAZE_ROD":"Enchanted Blaze Rod","ENCHANTED_CAKE":"Enchanted Cake","PUMPKIN":"Pumpkin","ENCHANTED_BROWN_MUSHROOM":"Enchanted Brown Mushroom","WHEAT":"Wheat","ENCHANTED_RAW_SALMON":"Enchanted Raw Salmon","ENCHANTED_GLISTERING_MELON":"Enchanted Glistering Melon","PRISMARINE_SHARD":"Prismarine Shard","PROTECTOR_FRAGMENT":"Protector Dragon Fragment","ENCHANTED_EMERALD":"Enchanted Emerald","ENCHANTED_SPIDER_EYE":"Enchanted Spider Eye","RED_MUSHROOM":"Red Mushroom","MUTTON":"Mutton","ENCHANTED_MELON_BLOCK":"Enchanted Melon Block","DIAMOND":"Diamond","WISE_FRAGMENT":"Wise Dragon Fragment","COBBLESTONE":"Cobblestone","SPIDER_EYE":"Spider Eye","RAW_FISH":"Raw Fish","ENCHANTED_PUFFERFISH":"Enchanted Pufferfish","POTATO_ITEM":"Potato","ENCHANTED_HUGE_MUSHROOM_1":"Enchanted Brown Mushroom Block","ENCHANTED_COBBLESTONE":"Enchanted Cobblestone","ENCHANTED_HUGE_MUSHROOM_2":"Enchanted Red Mushroom Block","ICE_BAIT":"Ice Bait","PORK":"Raw Porkchop","PRISMARINE_CRYSTALS":"Prismarine Crystals","ICE":"Ice","HUGE_MUSHROOM_1":"Brown Mushroom Block","HUGE_MUSHROOM_2":"Red Mushroom Block","LOG_2:1":"Dark Oak Wood","ENCHANTED_SNOW_BLOCK":"Enchanted Snow Block","GOLDEN_TOOTH":"Golden Tooth","STRING":"String","RABBIT_FOOT":"Rabbit's Foot","REDSTONE":"Redstone","ENCHANTED_CACTUS_GREEN":"Enchanted Cactus Green","ENCHANTED_CARROT_ON_A_STICK":"Was Temporarily: Enchanted Carrot on a Stick","ENCHANTED_LAPIS_LAZULI_BLOCK":"Enchanted Lapis Block","ENCHANTED_ENDSTONE":"Enchanted End Stone","ENCHANTED_COOKIE":"Enchanted Cookie","ENCHANTED_SAND":"Enchanted Sand","ENCHANTED_STRING":"Enchanted String","STRONG_FRAGMENT":"Strong Dragon Fragment","SLIME_BALL":"Slimeball","SNOW_BALL":"Snowball","HOLY_FRAGMENT":"Holy Dragon Fragment","ENCHANTED_ACACIA_LOG":"Enchanted Acacia Wood","ENCHANTED_EGG":"Enchanted Egg","SAND":"Sand","RAW_CHICKEN":"Raw Chicken","ENCHANTED_LAPIS_LAZULI":"Enchanted Lapis Lazuli","ENCHANTED_GHAST_TEAR":"Enchanted Ghast Tear","ENCHANTED_COCOA":"Enchanted Cocoa Bean","CARROT_BAIT":"Carrot Bait","SEEDS":"Seeds","ENCHANTED_LEATHER":"Enchanted Leather","ENCHANTED_SPONGE":"Enchanted Sponge","HAY_BLOCK":"Hay Bale","FLINT":"Flint","INK_SACK":"Ink Sack","ENCHANTED_ROTTEN_FLESH":"Enchanted Rotten Flesh","WOLF_TOOTH":"Wolf Tooth","ENCHANTED_SPRUCE_LOG":"Enchanted Spruce Wood","ENCHANTED_GRILLED_PORK":"Enchanted Grilled Pork","ENCHANTED_NETHER_STALK":"Enchanted Nether Wart","ENCHANTED_REDSTONE_BLOCK":"Enchanted Redstone Block","ENCHANTED_QUARTZ_BLOCK":"Enchanted Quartz Block","GREEN_CANDY":"Green Candy","ENCHANTED_REDSTONE":"Enchanted Redstone","ENCHANTED_REDSTONE_LAMP":"Enchanted Redstone Lamp","GRAVEL":"Gravel","MELON":"Melon","ENCHANTED_LAVA_BUCKET":"Enchanted Lava Bucket","ENCHANTED_PACKED_ICE":"Enchanted Packed Ice","RAW_FISH:3":"Pufferfish","ENCHANTED_PRISMARINE_SHARD":"Enchanted Prismarine Shard","ENCHANTED_IRON_BLOCK":"Enchanted Iron Block","BONE":"Bone","RAW_FISH:2":"Clownfish","RAW_FISH:1":"Raw Salmon","REVENANT_FLESH":"Revenant Flesh","ENCHANTED_GLOWSTONE":"Enchanted Glowstone","ENCHANTED_PORK":"Enchanted Pork","FEATHER":"Feather","NETHERRACK":"Netherrack","WHALE_BAIT":"Whale Bait","SPONGE":"Sponge","BLAZE_ROD":"Blaze Rod","ENCHANTED_DARK_OAK_LOG":"Enchanted Dark Oak Wood","YOUNG_FRAGMENT":"Young Dragon Fragment","ENCHANTED_CLOWNFISH":"Enchanted Clownfish","ENCHANTED_GOLD":"Enchanted Gold","ENCHANTED_RAW_CHICKEN":"Enchanted Raw Chicken","ENCHANTED_WATER_LILY":"Enchanted Lily Pad","LOG:1":"Spruce Wood","CATALYST":"Catalyst","LOG:3":"Jungle Wood","LOG:2":"Birch Wood","BLESSED_BAIT":"Blessed Bait","ENCHANTED_GLOWSTONE_DUST":"Enchanted Glowstone Dust","ENCHANTED_INK_SACK":"Enchanted Ink Sack","ENCHANTED_CACTUS":"Enchanted Cactus","ENCHANTED_SUGAR_CANE":"Enchanted Sugar Cane","ENCHANTED_COOKED_SALMON":"Enchanted Cooked Salmon","ENCHANTED_SEEDS":"Enchanted Seeds","LOG":"Oak Wood","GHAST_TEAR":"Ghast Tear","UNSTABLE_FRAGMENT":"Unstable Dragon Fragment","ENCHANTED_ENDER_PEARL":"Enchanted Ender Pearl","PURPLE_CANDY":"Purple Candy","ENCHANTED_FERMENTED_SPIDER_EYE":"Enchanted Fermented Spider Eye","SPIKED_BAIT":"Spiked Bait","ENCHANTED_GOLD_BLOCK":"Enchanted Gold Block","ENCHANTED_JUNGLE_LOG":"Enchanted Jungle Wood","ENCHANTED_FLINT":"Enchanted Flint","IRON_INGOT":"Iron Ingot","ENCHANTED_EMERALD_BLOCK":"Enchanted Emerald Block","ENCHANTED_CLAY_BALL":"Enchanted Clay","GLOWSTONE_DUST":"Glowstone Dust","GOLD_INGOT":"Gold Ingot","REVENANT_VISCERA":"Revenant Viscera","TARANTULA_SILK":"Tarantula Silk","ENCHANTED_MUTTON":"Enchanted Mutton","SUPER_COMPACTOR_3000":"Super Compactor 3000","SUPER_EGG":"Super Enchanted Egg","ENCHANTED_IRON":"Enchanted Iron","STOCK_OF_STONKS":"Stock of Stonks","ENCHANTED_HAY_BLOCK":"Enchanted Hay Bale","ENCHANTED_PAPER":"Enchanted Paper","ENCHANTED_BONE":"Enchanted Bone","ENCHANTED_DIAMOND_BLOCK":"Enchanted Diamond Block","SPOOKY_BAIT":"Spooky Bait","SUPERIOR_FRAGMENT":"Superior Dragon Fragment","EMERALD":"Emerald","ENCHANTED_RABBIT_FOOT":"Enchanted Rabbit Foot","LIGHT_BAIT":"Light Bait","HOT_POTATO_BOOK":"Hot Potato Book","ENCHANTED_ICE":"Enchanted Ice","CLAY_BALL":"Clay","OLD_FRAGMENT":"Old Dragon Fragment","GREEN_GIFT":"Green Gift","PACKED_ICE":"Packed Ice","WATER_LILY":"Lily Pad","LOG_2":"Acacia Wood","HAMSTER_WHEEL":"Hamster Wheel","ENCHANTED_OBSIDIAN":"Enchanted Obsidian","ENCHANTED_COAL":"Enchanted Coal","ENCHANTED_QUARTZ":"Enchanted Quartz","COAL":"Coal","ENDER_PEARL":"Ender Pearl","ENCHANTED_COAL_BLOCK":"Enchanted Block of Coal","ENCHANTED_PRISMARINE_CRYSTALS":"Enchanted Prismarine Crystals","ENCHANTED_WET_SPONGE":"Enchanted Wet Sponge","ENCHANTED_RAW_FISH":"Enchanted Raw Fish","ENDER_STONE":"End Stone","QUARTZ":"Nether Quartz","FOUL_FLESH":"Foul Flesh","RAW_BEEF":"Raw Beef","ENCHANTED_EYE_OF_ENDER":"Enchanted Eye of Ender","ENCHANTED_CARROT_STICK":"Enchanted Carrot on a Stick","RECOMBOBULATOR_3000":"Recombobulator 3000","SUGAR_CANE":"Sugar Cane","MAGMA_CREAM":"Magma Cream","RED_GIFT":"Red Gift","ENCHANTED_RAW_BEEF":"Enchanted Raw Beef","ENCHANTED_FEATHER":"Enchanted Feather","ENCHANTED_SLIME_BLOCK":"Enchanted Slime Block","ENCHANTED_OAK_LOG":"Enchanted Oak Wood","RABBIT_HIDE":"Rabbit Hide","WHITE_GIFT":"White Gift","RABBIT":"Raw Rabbit","SULPHUR":"Gunpowder","NETHER_STALK":"Nether Wart","DARK_BAIT":"Dark Bait","ENCHANTED_CARROT":"Enchanted Carrot","ENCHANTED_PUMPKIN":"Enchanted Pumpkin","ROTTEN_FLESH":"Rotten Flesh","ENCHANTED_COOKED_FISH":"Enchanted Cooked Fish","OBSIDIAN":"Obsidian","MINNOW_BAIT":"Minnow Bait","ENCHANTED_MAGMA_CREAM":"Enchanted Magma Cream","ENCHANTED_FIREWORK_ROCKET":"Enchanted Firework Rocket","LEATHER":"Leather","ENCHANTED_COOKED_MUTTON":"Enchanted Cooked Mutton","ENCHANTED_RABBIT":"Enchanted Raw Rabbit","ENCHANTED_BREAD":"Enchanted Bread","FUMING_POTATO_BOOK":"Fuming Potato Book","ENCHANTED_CHARCOAL":"Enchanted Charcoal","ENCHANTED_BLAZE_POWDER":"Enchanted Blaze Powder","SUMMONING_EYE":"Summoning Eye","FISH_BAIT":"Fish Bait","SNOW_BLOCK":"Snow Block","ENCHANTED_BAKED_POTATO":"Enchanted Baked Potato","COMPACTOR":"Compactor","ENCHANTED_DIAMOND":"Enchanted Diamond"};
var itemIDs = {}

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
      return
    }
  }
  request.send(null)
  if (hasFailed || json["success"] == false || json["products"] == null){
    return []
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
  return products
}

//Bot Functions
function bazaar(msg) {
  var hasFailed = false;
  console.log("Bazaar called by <@" + msg.author + ">")
  logger.write(getCurPSTDate() + "Bazaar called by <@" + msg.author + ">" + '\n')
  var args = msg.content.split(" ")
  if (args.length == 1){
    const embed = new MessageEmbed()
    .setTitle("Missing second argument!")
    .setColor(0xff0000)
    .setDescription("Try: =bazaar <margin/profit/smart/worst>\nor =bazaar info <product");
    msg.channel.send(embed);
    console.log("Bazaar failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
    return
  }

  var desiredProduct = ""
  var autocorrected = false

  if (args[1] == "info") {
    var query = msg.content.substring(13)
    var suggestions = []
    var lowestDiff = 99999
    for (var key in itemIDs) {
      var difference = levenshtein.compare(query.toLowerCase(), key.toLowerCase())
      if (difference < lowestDiff) {
        lowestDiff = difference
        suggestions = []
        suggestions.push(itemIDs[key])
      }else if (difference == lowestDiff) {
        suggestions.push(itemIDs[key])
      }
    }
    console.log(suggestions)
    console.log(lowestDiff)
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
      msg.channel.send(embed);
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return
    }else {
      const embed = new MessageEmbed()
      .setTitle("Couldn't find the product " + '"' + query + '"')
      .setColor(0xff0000)
      msg.channel.send(embed);
      console.log("Bazaar failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Bazaar failed by <@" + msg.author + ">\n")
      return
    }
    console.log("product to find: " + desiredProduct)
    console.log(autocorrected)
  }

  var products = fetchProducts()
  
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
      embed.setTitle("Top Bazaar products by Margin:")
      products.sort(function(a, b) {
        return b[3] - a[3];
      });
      break;
    case "profit":
      embed.setTitle("Top Bazaar products by Profit (%):")
      products.sort(function(a, b) {
        return b[4] - a[4];
      });
      break;
    case "smart":
      embed.setTitle("Top Bazaar flips:")
      products.sort(function(a, b) {
        return b[10] - a[10];
      });
      break;
    case "worst":
      embed.setTitle("Worst Bazaar flips:")
      products.sort(function(a, b) {
        return a[10] - b[10];
      });
      break;
    case "info":
      for (var i = 0 ; i < products.length; i ++) {
        if (itemIDs[products[i][0]] == desiredProduct) {
          embed.setTitle(itemNames[desiredProduct] + " (" + Math.round(((products[i][10] - lowestScore) / (highestScore - lowestScore))*1000)/10 + ")")
          if (autocorrected) {
            embed.addField("Autocorrected to " + itemNames[desiredProduct] ,"Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)",true)
          }else{
            embed.setDescription("Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)")
          }
          msg.channel.send(embed);
          console.log("Bazaar finished by <@" + msg.author + ">")
          logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
          finInfo = true;
          break;
        }
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
    console.log(products[i])
    embed.addField(products[i][0] + " (" + Math.round(((products[i][10] - lowestScore) / (highestScore - lowestScore))*1000)/10 + ")" ,"Buy Price: " + toKM(products[i][1]) + "\nSell Price: " + toKM(products[i][2]) + "\nBuy Volume: " + toKM(products[i][6]) + "\nSell Volume: " + toKM(products[i][5]) + "\nInstant Buys: " + toKM(products[i][8]) + "\nInstant Sells: " + toKM(products[i][9]) + "\nMargin: " + toKM(products[i][3]) + " (" + products[i][4] + "%)",true)
  }


  msg.channel.send(embed);
  console.log("Bazaar finished by <@" + msg.author + ">")
  logger.write(getCurPSTDate() + "Bazaar finished by <@" + msg.author + ">\n")
}

function skills(msg) {
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
          
          var request = new XMLHttpRequest();
          request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
          
          request.onload = function() {
            if (request.responseText == "Something went wrong") {
                const embed = new MessageEmbed()
                .setTitle("Invalid Username!")
                .setColor(0xff0000)
                msg.channel.send(embed);
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
            console.log("Skills failed by <@" + msg.author + ">")
            logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
            return
          }
          
          var uuid = getUUID(args[1])
          if (uuid == "") {
            const embed = new MessageEmbed()
            .setTitle("An error occured!")
            .setColor(0xff0000)
            .setDescription("Something went wrong with the Mojang API! Try again later!");
            msg.channel.send(embed);
            hasFailed = true
          }

          if (hasFailed){
            console.log("Skills failed by <@" + msg.author + ">")
            logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
            return
          }

          for (i = 0; i < profiles.length; i++) {
            request = new XMLHttpRequest();
            request.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0], false);
            request.responseType = 'json';
            request.onload = function() {
              try{
                profiles[i][2] = JSON.parse(request.responseText)["profile"]["members"][uuid]["last_save"];
              } catch (err) {
                console.log(err)
                console.log(request.responseText)
                logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                const embed = new MessageEmbed()
                .setTitle("An error occured!")
                .setColor(0xff0000)
                .setDescription("Something went wrong with the Hypixel API! Try again later!");
                msg.channel.send(embed);
                hasFailed = true
                return
              }
            };
            request.send(null);
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
          msg.channel.send(embed);
          return
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
        hasFailed = true
        return
  }
  if (hasFailed){
    console.log("Skills finished by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills finished by <@" + msg.author + ">\n")
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

  var uuid = getUUID(args[1])
  if (uuid == "") {
    const embed = new MessageEmbed()
    .setTitle("An error occured!")
    .setColor(0xff0000)
    .setDescription("Try again later!");
    msg.channel.send(embed);
    hasFailed = true
    return
  }
  if (hasFailed){
    console.log("Skills failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
    return
  }
  
  if (profileID == ""){
      for (i = 0; i < profiles.length; i++) {
        request = new XMLHttpRequest();
        request.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0], false);
        request.responseType = 'json';
        request.onload = function() {
          try{
            profiles[i][2] = JSON.parse(request.responseText)["profile"]["members"][uuid]["last_save"];
          } catch (err) {
            console.log(err)
            console.log(request.responseText)
            logger.write(getCurPSTDate() + "Error parsing JSON!\n")
            const embed = new MessageEmbed()
            .setTitle("An error occured!")
            .setColor(0xff0000)
            .setDescription("Something went wrong with the Hypixel API! Try again later!");
            msg.channel.send(embed);
            hasFailed = true
            return
          }
        };
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
      msg.channel.send(embed);
      return
  }
                
  request = new XMLHttpRequest();
  request.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + key + "&profile=" + profileID, false);
  request.responseType = 'json';
  var data = {};
  request.onload = function() {
    const embed = new MessageEmbed()
    .setTitle(args[1] + "'s skills:")
    .setColor(0x00ffff);
    var member;
    try{
      member = JSON.parse(request.responseText)["profile"]["members"][uuid];
    } catch (err) {
      console.log(err);
      console.log(request.responseText)
      logger.write(getCurPSTDate() + "Error parsing JSON!\n")
      return
      hasFailed = true;
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
      request = new XMLHttpRequest();
      request.open("GET", "https://api.hypixel.net/player?key=" + key + "&uuid=" + uuid, false);
      request.responseType = 'json';
      var desc = 
      request.onload = function(){
        try{
          var json = JSON.parse(request.responseText)
          var skills = [["Mining", "skyblock_excavator"],["Combat","skyblock_combat"],["Foraging","skyblock_gatherer"],["Fishing","skyblock_angler"],["Farming","skyblock_harvester"],["Taming","skyblock_domesticator"],["Alchemy","skyblock_concoctor"],["Enchanting","skyblock_augmentation"]]
          for (var i = 0; i < skills.length; i ++) {
            if ((json["player"]["achievements"][skills[i][1]]) == null){
              embed.addField(skills[i][0],"Level 0",true)
            }else{
              embed.addField(skills[i][0],"Level " + json["player"]["achievements"][skills[i][1]],true)
            }
          }
          embed.setDescription("This player's Skills API was disabled, so results are less accurate.")
        } catch (err) {
          console.log(err);
          console.log(request.responseText)
          logger.write(getCurPSTDate() + "Error parsing JSON!\n")
          return
          hasFailed = true;
        }
      }
      request.send(null)
    }
    msg.channel.send(embed);
    return
  }       
  if (hasFailed){
    console.log("Skills failed by <@" + msg.author + ">")
    logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
    const embed = new MessageEmbed()
    .setTitle("An error occured!")
    .setColor(0xff0000)
    .setDescription("Something went wrong with the Hypixel API! Try again later.");
    msg.channel.send(embed);
    return
    return
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
    logger.write(getCurPSTDate() + "Profiles called by <@" + msg.author + ">\n")
    var profiles = [];
    var hasFailed = false;
    var args = msg.content.split(" ");
    var request = new XMLHttpRequest();
    request.open("GET", "https://sky.lea.moe/api/" + args[1] + "/profiles?html", false);
    
    request.onload = function() {
      if (request.responseText == "Something went wrong") {
          const embed = new MessageEmbed()
          .setTitle("Invalid Username!")
          .setColor(0xff0000)
          msg.channel.send(embed);
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
      console.log("Skills finished by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Skills finished by <@" + msg.author + ">\n")
      return
    }
    
    var uuid = getUUID(args[1])
    if (uuid == "") {
      const embed = new MessageEmbed()
      .setTitle("An error occured!")
      .setColor(0xff0000)
      .setDescription("Try again later!");
      msg.channel.send(embed);
      hasFailed = true
    }

    if (hasFailed){
      console.log("Skills failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
      return
    }

    for (i = 0; i < profiles.length; i++) {
      request = new XMLHttpRequest();
      request.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + profiles[i][0], false);
      request.responseType = 'json';
      request.onload = function() {
        try{
          profiles[i][2] = JSON.parse(request.responseText)["profile"]["members"][uuid]["last_save"];
        } catch (err) {
          console.log(err)
          console.log(request.responseText)
          logger.write(getCurPSTDate() + "Error parsing JSON!\n")
          const embed = new MessageEmbed()
          .setTitle("An error occured!")
          .setColor(0xff0000)
          .setDescription("Try again later!");
          msg.channel.send(embed);
          hasFailed = true
          return
        }
      };
      request.send(null);
    }
    if (hasFailed){
      console.log("Skills failed by <@" + msg.author + ">")
      logger.write(getCurPSTDate() + "Skills failed by <@" + msg.author + ">\n")
      return
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
    msg.channel.send(embed);
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

function findKeys(){
    console.log("Checking API keys...")
    logger.write(getCurPSTDate() + "Checking API keys...\n")
    kj = []
    var it = 0
    for (it = 0; it < kp.length; it ++) {
        console.log("Checking Profile #" + it)
        logger.write(getCurPSTDate() + "Checking Profile #" + it + "\n")
        var rt = new XMLHttpRequest();
        rt.open("GET", "https://api.hypixel.net/skyblock/profile?key=" + process.env.HYPIXEL_API_KEY + "&profile=" + kp[it][0], false);
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
                  console.log(request.responseText)
                  logger.write(getCurPSTDate() + "Error parsing JSON!\n")
                  return
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
        if (msg.content.startsWith("=skills")) {
            skills(msg)
        }
        if (msg.content.startsWith("=bazaar")) {
            bazaar(msg)
        }
        if (msg.content.startsWith("=help")) {
            help(msg)
        }
        if (msg.content.startsWith("=profiles")) {
            profiles(msg)
        }
        if (msg.content.startsWith("=test")) {
            test(msg)
        }
    } 
});

//Log into bot
client.login(process.env.DISCORD_TOKEN);