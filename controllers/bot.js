const User = require("../models/User");
const Code = require("../models/Code");
const promisify = require("util").promisify;
const { sendMessage } = require("../utils/whatsappApi");
const voucherCodes = require("voucher-code-generator");

// @desc    Bot webhook
// @route   POST /api/bot/webhook
// @access  Public
const botWebhook = async (req, res) => {
  const RedisClient = req.app.get("RedisClient");

  // Create Redis synchronous functions
  // const redisHget = promisify(client.hget).bind(client);
  const redisHmset = promisify(RedisClient.hmset).bind(RedisClient);
  const redisExists = promisify(RedisClient.exists).bind(RedisClient);
  const redisHgetAll = promisify(RedisClient.hgetall).bind(RedisClient);
  const redisdel = promisify(RedisClient.del).bind(RedisClient);
  const redisExpire = promisify(RedisClient.expire).bind(RedisClient);

  const clientPhone = "966576808049";

  console.log(req.body.typeWebhook);
  try {
    if (req.body.typeWebhook === "incomingMessageReceived") {
      const instanceId = process.env.INCTANCE_ID;
      const instanceToken = process.env.INCTANCE_TOKEN;
      const chatId = req.body.senderData.chatId;
      const redisChatId = clientPhone + chatId;
      const textMessage = req.body.messageData.textMessageData.textMessage;
      const pendingExists = await redisExists(redisChatId);
      let isPending = pendingExists ? true : false;
      let pendingReservation = await redisHgetAll(redisChatId);

      if (isPending) {
        if (pendingReservation.lang === "1") {
          if (textMessage === "A" || textMessage === "a") {
            let text = "تم ازالتك من قائمة الانتظار 😞\n\n";
            text += "remmsh.com";

            await sendMessage(text, chatId, null, instanceId, instanceToken);
            await redisdel(redisChatId);
          } else if (textMessage === "#") {
            await redisHmset(redisChatId, "lang", "2");
            text = `Welcome 🔊\n\n`;
            text += `1️⃣ Restaurants 🥗\n`;
            text += `2️⃣ Coffees ☕\n\n`;
            text += `للعربية ارسل علامة #️⃣`;

            await sendMessage(text, chatId, null, instanceId, instanceToken);
            await redisHmset(redisChatId, "serviceQSend", true);
            await redisHmset(redisChatId, "choiseQSend", false);
            await redisHmset(redisChatId, "service", "");
            await redisHmset(redisChatId, "codeSent", "");
          } else {
            const users = await User.find({ isActive: true });
            const usersArray = users.map((user) => {
              return {
                id: user._id,
                type: user.type,
                name: user.nameAr,
                discount: user.discount,
                location: user.location,
              };
            });

            const coffees = usersArray.filter((user) => user.type === "coffee");

            const restaurants = usersArray.filter(
              (user) => user.type === "resturant"
            );

            if (
              pendingReservation.serviceQSend &&
              (!pendingReservation.service || pendingReservation.service === "")
            ) {
              let text;
              if (textMessage === "1" || textMessage === "١") {
                await redisHmset(redisChatId, "service", "1");

                text = "الرجاء اختيار المطعم:\n\n";
                restaurants.forEach((restaurant, i) => {
                  text += `${i + 1}- ${restaurant.name} *${
                    restaurant.discount
                  }%*\n`;
                });
                text += "\n";
                text += `للقائمة السابقة ارسل 0️⃣ \n`;
                await redisHmset(redisChatId, "choiseQSend", true);
              } else if (textMessage === "2" || textMessage === "٢") {
                await redisHmset(redisChatId, "service", "2");

                text = "الرجاء اختيار الكافي:\n\n";
                coffees.forEach((coffee, i) => {
                  text += `${i + 1}- ${coffee.name} *${coffee.discount}%*\n`;
                });
                text += "\n";
                text += `للقائمة السابقة ارسل 0️⃣ \n`;

                await redisHmset(redisChatId, "choiseQSend", true);
              } else {
                text = `\u202B`;
                text += `مرحباً بك 🔊\n\n`;
                text += `1️⃣ مطاعم 🥗\n`;
                text += `2️⃣ كافيهات ☕\n\n`;
                text += `\u202C`;
                text += `For English send #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            } else if (
              pendingReservation.serviceQSend &&
              pendingReservation.service === "1" &&
              pendingReservation.choiseQSend &&
              (!pendingReservation.codeSent ||
                pendingReservation.codeSent === "")
            ) {
              let text;
              if (textMessage === "0") {
                text = `\u202B`;
                text += `مرحباً بك 🔊\n\n`;
                text += `1️⃣ مطاعم 🥗\n`;
                text += `2️⃣ كافيهات ☕\n\n`;
                text += `\u202C`;
                text += `For English send #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              } else if (
                parseInt(textMessage) > 0 &&
                parseInt(textMessage) <= restaurants.length
              ) {
                const code = voucherCodes.generate({
                  length: 8,
                })[0];
                text = `الخصم: *${
                  restaurants[parseInt(textMessage) - 1].discount
                }%*\n`;
                text += `كود الخصم: *${code}*\n\n`;
                text += `📍 الموقع:\n`;
                text += `${
                  restaurants[parseInt(textMessage) - 1].location
                }\n\n`;
                text += `فخورين لمساعدتك\n`;
                text += `Zoro`;

                await Code.create({
                  user: restaurants[parseInt(textMessage) - 1].id,
                  code,
                });

                await redisdel(redisChatId);
              } else {
                await redisHmset(redisChatId, "service", "");
                text = `الاختيار المدخل غير صحيح\n`;
                text += "الرجاء اختيار المطعم:\n\n";
                restaurants.forEach((restaurant, i) => {
                  text += `${i + 1}- ${restaurant.name} ${
                    restaurant.discount
                  }%\n`;
                });

                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "codeSent", false);
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            } else if (
              pendingReservation.serviceQSend &&
              pendingReservation.service === "2" &&
              pendingReservation.choiseQSend &&
              (!pendingReservation.codeSent ||
                pendingReservation.codeSent === "")
            ) {
              let text;
              if (textMessage === "0") {
                text = `\u202B`;
                text += `مرحباً بك 🔊\n\n`;
                text += `1️⃣ مطاعم 🥗\n`;
                text += `2️⃣ كافيهات ☕\n\n`;
                text += `\u202C`;
                text += `For English send #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              } else if (
                parseInt(textMessage) > 0 &&
                parseInt(textMessage) <= coffees.length
              ) {
                const code = voucherCodes.generate({
                  length: 8,
                })[0];

                text = `الخصم: *${
                  coffees[parseInt(textMessage) - 1].discount
                }%*\n`;
                text += `كود الخصم: *${code}*\n\n`;
                text += `📍 الموقع:\n`;
                text += `${coffees[parseInt(textMessage) - 1].location}\n\n`;
                text += `فخورين لمساعدتك\n`;
                text += `Zoro`;

                await Code.create({
                  user: coffees[parseInt(textMessage) - 1].id,
                  code,
                });

                await redisdel(redisChatId);
              } else {
                await redisHmset(redisChatId, "service", "");
                text = `الاختيار المدخل غير صحيح\n`;
                text += "الرجاء اختيار الكافي:\n\n";
                coffees.forEach((coffee, i) => {
                  text += `${i + 1}- ${coffee.name} ${coffee.discount}%\n`;
                });

                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "codeSent", false);
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            }
          }
        } else if (pendingReservation.lang === "2") {
          if (textMessage === "A" || textMessage === "a") {
            let text = "We are sorry to see you go 😔\n\n";
            text += "You have been removed from the waiting list\n\n";
            text += `Zoro`;

            await sendMessage(text, chatId, null, instanceId, instanceToken);
            await redisdel(redisChatId);
          } else if (textMessage === "#") {
            await redisHmset(redisChatId, "lang", "1");
            text = `\u202B`;
            text += `مرحباً بك 🔊\n\n`;
            text += `1️⃣ مطاعم 🥗\n`;
            text += `2️⃣ كافيهات ☕\n\n`;
            text += `\u202C`;
            text += `For English send #️⃣`;

            await sendMessage(text, chatId, null, instanceId, instanceToken);
            await redisHmset(redisChatId, "serviceQSend", true);
            await redisHmset(redisChatId, "choiseQSend", false);
            await redisHmset(redisChatId, "service", "");
            await redisHmset(redisChatId, "codeSent", "");
          } else {
            const users = await User.find({ isActive: true });
            const usersArray = users.map((user) => {
              return {
                id: user._id,
                type: user.type,
                name: user.name,
                discount: user.discount,
                location: user.location,
              };
            });

            const coffees = usersArray.filter((user) => user.type === "coffee");

            const restaurants = usersArray.filter(
              (user) => user.type === "resturant"
            );

            if (
              pendingReservation.serviceQSend &&
              (!pendingReservation.service || pendingReservation.service === "")
            ) {
              let text;
              if (textMessage === "1" || textMessage === "١") {
                await redisHmset(redisChatId, "service", "1");

                text = "Please choose a restaurant:\n\n";
                restaurants.forEach((restaurant, i) => {
                  text += `${i + 1}- ${restaurant.name} *${
                    restaurant.discount
                  }%*\n`;
                });
                text += "\n";
                text += `For previos menu send 0️⃣ \n`;
                await redisHmset(redisChatId, "choiseQSend", true);
              } else if (textMessage === "2" || textMessage === "٢") {
                await redisHmset(redisChatId, "service", "2");

                text = "Please choose a coffee:\n\n";
                coffees.forEach((coffee, i) => {
                  text += `${i + 1}- ${coffee.name} *${coffee.discount}%*\n`;
                });
                text += "\n";
                text += `For previos menu send 0️⃣ \n`;

                await redisHmset(redisChatId, "choiseQSend", true);
              } else {
                text = `Welcome 🔊\n\n`;
                text += `1️⃣ Restaurants 🥗\n`;
                text += `2️⃣ Coffees ☕\n\n`;
                text += `للعربية ارسل علامة #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            } else if (
              pendingReservation.serviceQSend &&
              pendingReservation.service === "1" &&
              pendingReservation.choiseQSend &&
              (!pendingReservation.codeSent ||
                pendingReservation.codeSent === "")
            ) {
              let text;
              if (textMessage === "0") {
                text = `Welcome 🔊\n\n`;
                text += `1️⃣ Restaurants 🥗\n`;
                text += `2️⃣ Coffees ☕\n\n`;
                text += `للعربية ارسل علامة #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              } else if (
                parseInt(textMessage) > 0 &&
                parseInt(textMessage) <= restaurants.length
              ) {
                const code = voucherCodes.generate({
                  length: 8,
                })[0];
                text = `Discount: *${
                  restaurants[parseInt(textMessage) - 1].discount
                }%*\n`;
                text += `Discount code: *${code}*\n\n`;
                text += `📍 Location:\n${
                  restaurants[parseInt(textMessage) - 1].location
                }\n\n`;
                text += `Happy to assist you\n`;
                text += `Zoro`;

                await Code.create({
                  user: restaurants[parseInt(textMessage) - 1].id,
                  code,
                });

                await redisdel(redisChatId);
              } else {
                await redisHmset(redisChatId, "service", "");
                text = `Incorrect choice\n`;
                text += "Please choose a restaurant:\n\n";
                restaurants.forEach((restaurant, i) => {
                  text += `${i + 1}- ${restaurant.name} ${
                    restaurant.discount
                  }%\n`;
                });

                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "codeSent", false);
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            } else if (
              pendingReservation.serviceQSend &&
              pendingReservation.service === "2" &&
              pendingReservation.choiseQSend &&
              (!pendingReservation.codeSent ||
                pendingReservation.codeSent === "")
            ) {
              let text;
              if (textMessage === "0") {
                text = `Welcome 🔊\n\n`;
                text += `1️⃣ Restaurants 🥗\n`;
                text += `2️⃣ Coffees ☕\n\n`;
                text += `للعربية ارسل علامة #️⃣`;
                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "service", "");
              } else if (
                parseInt(textMessage) > 0 &&
                parseInt(textMessage) <= coffees.length
              ) {
                const code = voucherCodes.generate({
                  length: 8,
                })[0];

                text = `Discount: *${
                  coffees[parseInt(textMessage) - 1].discount
                }%*\n`;
                text += `Discount code: *${code}*\n\n`;
                text += `📍 Location:\n${
                  coffees[parseInt(textMessage) - 1].location
                }\n\n`;
                text += `Happy to assist you\n`;
                text += `Zoro`;

                await Code.create({
                  user: coffees[parseInt(textMessage) - 1].id,
                  code,
                });

                await redisdel(redisChatId);
              } else {
                await redisHmset(redisChatId, "service", "");

                text = `Incorrect choice\n`;
                text += "Please choose a coffee:\n\n";
                coffees.forEach((coffee, i) => {
                  text += `${i + 1}- ${coffee.name} ${coffee.discount}%\n`;
                });

                await redisHmset(redisChatId, "serviceQSend", true);
                await redisHmset(redisChatId, "choiseQSend", false);
                await redisHmset(redisChatId, "codeSent", false);
              }
              await sendMessage(text, chatId, null, instanceId, instanceToken);
            }
          }
        }
      } else {
        let text = "";

        if (textMessage.match(/^[a-zA-Z0-9]/)) {
          text = `Welcome 🔊\n\n`;
          text += `1️⃣ Restaurants 🥗\n`;
          text += `2️⃣ Coffees ☕\n\n`;
          text += `للعربية ارسل علامة #️⃣`;
          await redisHmset(redisChatId, "lang", "2");
        } else if (textMessage.match(/^[\u0600-\u06FF]/)) {
          text = `\u202B`;
          text += `مرحباً بك 🔊\n\n`;
          text += `1️⃣ مطاعم 🥗\n`;
          text += `2️⃣ كافيهات ☕\n\n`;
          text += `\u202C`;
          text += `For English send #️⃣`;
          await redisHmset(redisChatId, "lang", "1");
        } else {
          text = `\u202B`;
          text += `مرحباً بك 🔊\n\n`;
          text += `1️⃣ مطاعم 🥗\n`;
          text += `2️⃣ كافيهات ☕\n\n`;
          text += `\u202C`;
          text += `For English send #️⃣`;
          await redisHmset(redisChatId, "lang", "1");
        }

        await sendMessage(text, chatId, null, instanceId, instanceToken);
        await redisHmset(redisChatId, "chatId", chatId);
        await redisHmset(redisChatId, "serviceQSend", true);
        await redisExpire(redisChatId, 86400);
      }
    }
    return res.send();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  botWebhook,
};
