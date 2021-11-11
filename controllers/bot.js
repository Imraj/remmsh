const User = require("../models/User");
const Code = require("../models/Code");
const promisify = require("util").promisify;
const { sendMessage, setReaded, setUnreaded } = require("../utils/whatsappApi");
const { getCode } = require("../utils/generateCode");

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
    if (
      req.body.typeWebhook === "incomingMessageReceived" ||
      req.body.typeWebhook === "outgoingMessageReceived"
    ) {
      const instanceId = process.env.INCTANCE_ID;
      const instanceToken = process.env.INCTANCE_TOKEN;
      const chatId = req.body.senderData.chatId;
      const redisChatId = clientPhone + chatId;
      const textMessage = req.body.messageData.textMessageData.textMessage;
      const pendingExists = await redisExists(redisChatId);
      let isPending = pendingExists ? true : false;
      let pendingReservation = await redisHgetAll(redisChatId);

      if (
        req.body.typeWebhook === "incomingMessageReceived" &&
        (!pendingReservation?.customerService ||
          pendingReservation?.customerService === "false")
      ) {
        if (isPending) {
          if (pendingReservation.lang === "1") {
            if (textMessage === "#") {
              await redisHmset(redisChatId, "lang", "2");
              let text = `*Zoro 🥷🏼*\n`;
              text += `*Live discount codes 🔥*\n\n`;
              text += `*Choose a service*\n\n`;
              text += `1️⃣ Restaurants 🥗\n`;
              text += `2️⃣ Coffees ☕\n`;
              text += `3️⃣ Lounge 🛋️\n\n`;
              text += `*للعربية ارسل علامة #️⃣*`;

              await sendMessage(text, chatId, null, instanceId, instanceToken);
              await redisHmset(redisChatId, "serviceQSend", true);
              await redisHmset(redisChatId, "choiseQSend", false);
              await redisHmset(redisChatId, "service", "");
              await redisHmset(redisChatId, "codeSent", false);
            } else {
              const users = await User.find({ isActive: true });

              const usersArray = users.map((user) => {
                return {
                  id: user._id,
                  type: user.type,
                  name: user.nameAr,
                  discount: user.discount,
                  location: user.location,
                  ShowSocialMediaLinkes: user.ShowSocialMediaLinkes,
                  instagram: user.instagram || "",
                  snapchat: user.snapchat || "",
                  twitter: user.twitter || "",
                };
              });

              console.log("usersArray", usersArray);

              const coffees = usersArray.filter(
                (user) => user.type === "coffee"
              );

              const restaurants = usersArray.filter(
                (user) => user.type === "resturant"
              );

              const lounges = usersArray.filter(
                (user) => user.type === "lounge"
              );

              console.log("coffees", coffees);
              console.log("restaurants", restaurants);
              console.log("lounges", lounges);

              if (
                pendingReservation.serviceQSend &&
                (!pendingReservation.service ||
                  pendingReservation.service === "")
              ) {
                let text;
                if (textMessage === "1" || textMessage === "١") {
                  await redisHmset(redisChatId, "service", "1");

                  text = "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  console.log("Resturents", restaurants);
                  restaurants.forEach((restaurant, i) => {
                    text += `*${i + 1}*- ${restaurant.name} *${
                      restaurant.discount
                    }%*\n\n`;
                  });

                  text += `للقائمة السابقة ارسل 0️⃣`;
                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all reseturants
                  await User.updateMany(
                    { type: "resturant", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else if (textMessage === "2" || textMessage === "٢") {
                  await redisHmset(redisChatId, "service", "2");

                  text = "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  coffees.forEach((coffee, i) => {
                    text += `*${i + 1}*- ${coffee.name} *${
                      coffee.discount
                    }%*\n\n`;
                  });
                  text += `للقائمة السابقة ارسل 0️⃣`;

                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all coffees
                  await User.updateMany(
                    { type: "coffee", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else if (textMessage === "3" || textMessage === "٣") {
                  await redisHmset(redisChatId, "service", "3");

                  text = "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  lounges.forEach((lounge, i) => {
                    text += `*${i + 1}*- ${lounge.name} *${
                      lounge.discount
                    }%*\n\n`;
                  });
                  text += `للقائمة السابقة ارسل 0️⃣ `;

                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all lounges
                  await User.updateMany(
                    { type: "lounge", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else {
                  text = `\u202B`;
                  text += `*زورو 🥷🏼*\n`;
                  text += `*أكواد خصم لايف 🔥*\n\n`;
                  text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
                  text += `1️⃣ مطاعم 🥗\n`;
                  text += `2️⃣ كافيهات ☕\n`;
                  text += `3️⃣ لاونج 🛋️\n\n`;
                  text += `\u202C`;
                  text += `*For English send #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "1" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `\u202B`;
                  text += `*زورو 🥷🏼*\n`;
                  text += `*أكواد خصم لايف 🔥*\n\n`;
                  text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
                  text += `1️⃣ مطاعم 🥗\n`;
                  text += `2️⃣ كافيهات ☕\n`;
                  text += `3️⃣ لاونج 🛋️\n\n`;
                  text += `\u202C`;
                  text += `*For English send #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= restaurants.length
                ) {
                  const code = await getCode();

                  text = `*${restaurants[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `الخصم💰: *${
                    restaurants[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `كود الخصم🥳: *${code}*\n\n`;
                  text += `📍 الموقع:\n`;
                  text += `${
                    restaurants[parseInt(textMessage) - 1].location
                  }\n\n`;

                  if (
                    restaurants[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (restaurants[parseInt(textMessage) - 1].instagram) {
                      text += `*انستقرام*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (restaurants[parseInt(textMessage) - 1].snapchat) {
                      text += `*سناب شات*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (restaurants[parseInt(textMessage) - 1].twitter) {
                      text += `*تويتر*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].twitter
                      }\n`;
                    }
                    text += `\n`;
                  }

                  text += `للإقتراحات او الشكاوى ارسل 🅰️\n\n`;
                  text += `*🥷🏼Z*`;

                  await Code.create({
                    user: restaurants[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: restaurants[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `الاختيار المدخل غير صحيح ⭕️\n\n`;
                  text += "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  restaurants.forEach((restaurant, i) => {
                    text += `*${i + 1}*- ${restaurant.name} ${
                      restaurant.discount
                    }%\n\n`;
                  });

                  text += `للقائمة السابقة ارسل 0️⃣ \n`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "2" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `\u202B`;
                  text += `*زورو 🥷🏼*\n`;
                  text += `*أكواد خصم لايف 🔥*\n\n`;
                  text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
                  text += `1️⃣ مطاعم 🥗\n`;
                  text += `2️⃣ كافيهات ☕\n`;
                  text += `3️⃣ لاونج 🛋️\n\n`;
                  text += `\u202C`;
                  text += `*For English send #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= coffees.length
                ) {
                  const code = await getCode();

                  text = `*${coffees[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `الخصم💰: *${
                    coffees[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `كود الخصم🥳: *${code}*\n\n`;
                  text += `📍 الموقع:\n`;
                  text += `${coffees[parseInt(textMessage) - 1].location}\n\n`;

                  if (
                    coffees[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (coffees[parseInt(textMessage) - 1].instagram) {
                      text += `*انستقرام*\n`;
                      text += `${
                        coffees[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (coffees[parseInt(textMessage) - 1].snapchat) {
                      text += `*سناب شات*\n`;
                      text += `${
                        coffees[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (coffees[parseInt(textMessage) - 1].twitter) {
                      text += `*تويتر*\n`;
                      text += `${coffees[parseInt(textMessage) - 1].twitter}\n`;
                    }
                    text += `\n`;
                  }

                  text += `للإقتراحات او الشكاوى ارسل 🅰️\n\n`;
                  text += `*🥷🏼Z*`;

                  await Code.create({
                    user: coffees[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: coffees[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `الاختيار المدخل غير صحيح ⭕️\n\n`;
                  text += "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  coffees.forEach((coffee, i) => {
                    text += `*${i + 1}*- ${coffee.name} ${
                      coffee.discount
                    }%\n\n`;
                  });

                  text += `للقائمة السابقة ارسل 0️⃣ \n`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "3" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `\u202B`;
                  text += `*زورو 🥷🏼*\n`;
                  text += `*أكواد خصم لايف 🔥*\n\n`;
                  text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
                  text += `1️⃣ مطاعم 🥗\n`;
                  text += `2️⃣ كافيهات ☕\n`;
                  text += `3️⃣ لاونج 🛋️\n\n`;
                  text += `\u202C`;
                  text += `*For English send #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= lounges.length
                ) {
                  const code = await getCode();

                  text = `*${lounges[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `الخصم💰: *${
                    lounges[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `كود الخصم🥳: *${code}*\n\n`;
                  text += `📍 الموقع:\n`;
                  text += `${lounges[parseInt(textMessage) - 1].location}\n\n`;

                  if (
                    lounges[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (lounges[parseInt(textMessage) - 1].instagram) {
                      text += `*انستقرام*\n`;
                      text += `${
                        lounges[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (lounges[parseInt(textMessage) - 1].snapchat) {
                      text += `*سناب شات*\n`;
                      text += `${
                        lounges[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (lounges[parseInt(textMessage) - 1].twitter) {
                      text += `*تويتر*\n`;
                      text += `${lounges[parseInt(textMessage) - 1].twitter}\n`;
                    }
                    text += `\n`;
                  }

                  text += `للإقتراحات او الشكاوى ارسل 🅰️\n\n`;
                  text += `*🥷🏼Z*`;

                  await Code.create({
                    user: lounges[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: lounges[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `الاختيار المدخل غير صحيح ⭕️\n\n`;
                  text += "*لكود الخصم ارسل رقم الخيار المطلوب😁*\n";
                  text += "⏬\n⏬\n\n";

                  lounges.forEach((lounge, i) => {
                    text += `*${i + 1}*- ${lounge.name} ${
                      lounge.discount
                    }%\n\n`;
                  });

                  text += `للقائمة السابقة ارسل 0️⃣ \n`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              }
            }
          } else if (pendingReservation.lang === "2") {
            if (textMessage === "#") {
              await redisHmset(redisChatId, "lang", "1");
              let text = `\u202B`;
              text += `*زورو 🥷🏼*\n`;
              text += `*أكواد خصم لايف 🔥*\n\n`;
              text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
              text += `1️⃣ مطاعم 🥗\n`;
              text += `2️⃣ كافيهات ☕\n`;
              text += `3️⃣ لاونج 🛋️\n\n`;
              text += `\u202C`;
              text += `*For English send #️⃣*`;

              await sendMessage(text, chatId, null, instanceId, instanceToken);
              await redisHmset(redisChatId, "serviceQSend", true);
              await redisHmset(redisChatId, "choiseQSend", false);
              await redisHmset(redisChatId, "service", "");
              await redisHmset(redisChatId, "codeSent", false);
            } else {
              const users = await User.find({ isActive: true });
              const usersArray = users.map((user) => {
                return {
                  id: user._id,
                  type: user.type,
                  name: user.name,
                  discount: user.discount,
                  location: user.location,
                  ShowSocialMediaLinkes: user.ShowSocialMediaLinkes,
                  instagram: user.instagram,
                  snapchat: user.snapchat,
                  twitter: user.twitter,
                };
              });

              const coffees = usersArray.filter(
                (user) => user.type === "coffee"
              );

              const restaurants = usersArray.filter(
                (user) => user.type === "resturant"
              );

              const lounges = usersArray.filter(
                (user) => user.type === "lounge"
              );

              if (
                pendingReservation.serviceQSend &&
                (!pendingReservation.service ||
                  pendingReservation.service === "")
              ) {
                let text;
                if (textMessage === "1" || textMessage === "١") {
                  await redisHmset(redisChatId, "service", "1");

                  text = "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";

                  restaurants.forEach((restaurant, i) => {
                    text += `*${i + 1}*- ${restaurant.name} *${
                      restaurant.discount
                    }%*\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;
                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all reseturants
                  await User.updateMany(
                    { type: "resturant", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else if (textMessage === "2" || textMessage === "٢") {
                  await redisHmset(redisChatId, "service", "2");

                  text = "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";
                  coffees.forEach((coffee, i) => {
                    text += `*${i + 1}*- ${coffee.name} *${
                      coffee.discount
                    }%*\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;

                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all coffees
                  await User.updateMany(
                    { type: "coffee", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else if (textMessage === "3" || textMessage === "٣") {
                  await redisHmset(redisChatId, "service", "3");

                  text = "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";

                  lounges.forEach((lounge, i) => {
                    text += `*${i + 1}*- ${lounge.name} *${
                      lounge.discount
                    }%*\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;

                  await redisHmset(redisChatId, "choiseQSend", true);

                  //Update total seen for all lounges
                  await User.updateMany(
                    { type: "lounge", isActive: true },
                    { $inc: { totalSeen: 1 } }
                  );
                } else {
                  text = `*Zoro 🥷🏼*\n`;
                  text += `*Live discount codes 🔥*\n\n`;
                  text += `*Choose a service*\n\n`;
                  text += `1️⃣ Restaurants 🥗\n`;
                  text += `2️⃣ Coffees ☕\n`;
                  text += `3️⃣ Lounge 🛋️\n\n`;
                  text += `*للعربية ارسل علامة #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "1" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `*Zoro 🥷🏼*\n`;
                  text += `*Live discount codes 🔥*\n\n`;
                  text += `*Choose a service*\n\n`;
                  text += `1️⃣ Restaurants 🥗\n`;
                  text += `2️⃣ Coffees ☕\n`;
                  text += `3️⃣ Lounge 🛋️\n\n`;
                  text += `*للعربية ارسل علامة #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= restaurants.length
                ) {
                  const code = await getCode();

                  text = `*${restaurants[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `Discount💰: *${
                    restaurants[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `Discount code🥳: *${code}*\n\n`;
                  text += `📍 Location:\n${
                    restaurants[parseInt(textMessage) - 1].location
                  }\n\n`;

                  if (
                    restaurants[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (restaurants[parseInt(textMessage) - 1].instagram) {
                      text += `*Instagram*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (restaurants[parseInt(textMessage) - 1].snapchat) {
                      text += `*Snapchat*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (restaurants[parseInt(textMessage) - 1].twitter) {
                      text += `*Twitter*\n`;
                      text += `${
                        restaurants[parseInt(textMessage) - 1].twitter
                      }\n`;
                    }
                    text += `\n`;
                  }

                  text += `For suggestions or complaints send 🅰️🅰️\n\n`;
                  text += `*Z🥷🏼*`;

                  await Code.create({
                    user: restaurants[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: restaurants[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `Incorrect choice ⭕️\n\n`;
                  text += "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";

                  restaurants.forEach((restaurant, i) => {
                    text += `*${i + 1}*- ${restaurant.name} ${
                      restaurant.discount
                    }%\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "2" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `*Zoro 🥷🏼*\n`;
                  text += `*Live discount codes 🔥*\n\n`;
                  text += `*Choose a service*\n\n`;
                  text += `1️⃣ Restaurants 🥗\n`;
                  text += `2️⃣ Coffees ☕\n`;
                  text += `3️⃣ Lounge 🛋️\n\n`;
                  text += `*للعربية ارسل علامة #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= coffees.length
                ) {
                  const code = await getCode();

                  text = `*${coffees[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `Discount💰: *${
                    coffees[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `Discount code🥳: *${code}*\n\n`;
                  text += `📍 Location:\n${
                    coffees[parseInt(textMessage) - 1].location
                  }\n\n`;

                  if (
                    coffees[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (coffees[parseInt(textMessage) - 1].instagram) {
                      text += `*Instagram*\n`;
                      text += `${
                        coffees[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (coffees[parseInt(textMessage) - 1].snapchat) {
                      text += `*Snapchat*\n`;
                      text += `${
                        coffees[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (coffees[parseInt(textMessage) - 1].twitter) {
                      text += `*Twitter*\n`;
                      text += `${coffees[parseInt(textMessage) - 1].twitter}\n`;
                    }
                    text += `\n`;
                  }

                  text += `For suggestions or complaints send 🅰️🅰️\n\n`;
                  text += `*Z🥷🏼*`;

                  await Code.create({
                    user: coffees[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: coffees[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `Incorrect choice ⭕️\n\n`;
                  text += "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";
                  coffees.forEach((coffee, i) => {
                    text += `*${i + 1}*- ${coffee.name} ${
                      coffee.discount
                    }%\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              } else if (
                pendingReservation.serviceQSend &&
                pendingReservation.service === "3" &&
                pendingReservation.choiseQSend &&
                (!pendingReservation.codeSent ||
                  pendingReservation.codeSent === false)
              ) {
                let text;
                if (textMessage === "0") {
                  text = `*Zoro 🥷🏼*\n`;
                  text += `*Live discount codes 🔥*\n\n`;
                  text += `*Choose a service*\n\n`;
                  text += `1️⃣ Restaurants 🥗\n`;
                  text += `2️⃣ Coffees ☕\n`;
                  text += `3️⃣ Lounge 🛋️\n\n`;
                  text += `*للعربية ارسل علامة #️⃣*`;
                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", false);
                  await redisHmset(redisChatId, "service", "");
                } else if (
                  parseInt(textMessage) > 0 &&
                  parseInt(textMessage) <= coffees.length
                ) {
                  const code = await getCode();

                  text = `*${lounges[parseInt(textMessage) - 1].name}*\n\n`;
                  text += `Discount💰: *${
                    lounges[parseInt(textMessage) - 1].discount
                  }%*\n`;
                  text += `Discount code🥳: *${code}*\n\n`;
                  text += `📍 Location:\n${
                    lounges[parseInt(textMessage) - 1].location
                  }\n\n`;

                  if (
                    lounges[parseInt(textMessage) - 1].ShowSocialMediaLinkes
                  ) {
                    if (lounges[parseInt(textMessage) - 1].instagram) {
                      text += `*Instagram*\n`;
                      text += `${
                        lounges[parseInt(textMessage) - 1].instagram
                      }\n`;
                    }
                    if (lounges[parseInt(textMessage) - 1].snapchat) {
                      text += `*Snapchat*\n`;
                      text += `${
                        lounges[parseInt(textMessage) - 1].snapchat
                      }\n`;
                    }
                    if (lounges[parseInt(textMessage) - 1].twitter) {
                      text += `*Twitter*\n`;
                      text += `${lounges[parseInt(textMessage) - 1].twitter}\n`;
                    }
                    text += `\n`;
                  }

                  text += `For suggestions or complaints send 🅰️🅰️\n\n`;
                  text += `*Z🥷🏼*`;

                  await Code.create({
                    user: lounges[parseInt(textMessage) - 1].id,
                    code,
                  });

                  //Update to total engagement
                  await User.findOneAndUpdate(
                    { _id: lounges[parseInt(textMessage) - 1].id },
                    { $inc: { totalEngagement: 1 } }
                  );

                  await redisdel(redisChatId);
                } else {
                  text = `Incorrect choice ⭕️\n\n`;
                  text += "*Choose an option for the discount code😁*\n";
                  text += "⏬\n⏬\n\n";

                  lounges.forEach((lounge, i) => {
                    text += `*${i + 1}*- ${lounge.name} ${
                      lounge.discount
                    }%\n\n`;
                  });

                  text += `For previos menu send 0️⃣`;

                  await redisHmset(redisChatId, "serviceQSend", true);
                  await redisHmset(redisChatId, "choiseQSend", true);
                  await redisHmset(redisChatId, "codeSent", false);
                }
                await sendMessage(
                  text,
                  chatId,
                  null,
                  instanceId,
                  instanceToken
                );
              }
            }
          }
        } else if (textMessage === "AA" || textMessage === "aa") {
          let text = "Thank you for reaching out\n\n";
          text += "*Could you please send your inquiry* ";
          text += "and you will be hearing from us in the next 24 hours\n\n";
          text += "Zoro";

          await redisHmset(redisChatId, "chatId", chatId);
          await redisHmset(redisChatId, "lang", "2");
          await redisExpire(redisChatId, 86400);
          await redisHmset(redisChatId, "customerService", true);
          //Make the instance to mark thr incoming messages as unreaded
          await setUnreaded(instanceId, instanceToken);

          await sendMessage(text, chatId, null, instanceId, instanceToken);
        } else if (textMessage === "A" || textMessage === "a") {
          let text = "شكرا لك على التواصل مع خدمة العملاء\n\n";
          text += "*الرجاء ارسال استفسارك*\n";
          text += "وسيتم الرد عليك خلال ٢٤ ساعة\n\n";
          text += "Zoro";

          await redisHmset(redisChatId, "chatId", chatId);
          await redisHmset(redisChatId, "lang", "1");
          await redisExpire(redisChatId, 86400);
          await redisHmset(redisChatId, "customerService", true);
          //Make the instance to mark thr incoming messages as unreaded
          await setUnreaded(instanceId, instanceToken);

          await sendMessage(text, chatId, null, instanceId, instanceToken);
        } else {
          //Make the instance to mark the incoming messages as readed
          await setReaded(instanceId, instanceToken);

          let text = "";

          if (textMessage.match(/^[a-zA-Z0-9]/)) {
            text = `*Zoro 🥷🏼*\n`;
            text += `*Live discount codes 🔥*\n\n`;
            text += `*Choose a service*\n\n`;
            text += `1️⃣ Restaurants 🥗\n`;
            text += `2️⃣ Coffees ☕\n`;
            text += `3️⃣ Lounge 🛋️\n\n`;
            text += `*للعربية ارسل علامة #️⃣*`;
            await redisHmset(redisChatId, "lang", "2");
          } else if (textMessage.match(/^[\u0600-\u06FF]/)) {
            text = `\u202B`;
            text += `*زورو 🥷🏼*\n`;
            text += `*أكواد خصم لايف 🔥*\n\n`;
            text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
            text += `1️⃣ مطاعم 🥗\n`;
            text += `2️⃣ كافيهات ☕\n`;
            text += `3️⃣ لاونج 🛋️\n\n`;
            text += `\u202C`;
            text += `*For English send #️⃣*`;
            await redisHmset(redisChatId, "lang", "1");
          } else {
            text = `\u202B`;
            text += `*زورو 🥷🏼*\n`;
            text += `*أكواد خصم لايف 🔥*\n\n`;
            text += `*ارسل رقم الخدمة المطلوبة:*\n\n`;
            text += `1️⃣ مطاعم 🥗\n`;
            text += `2️⃣ كافيهات ☕\n`;
            text += `3️⃣ لاونج 🛋️\n\n`;
            text += `\u202C`;
            text += `*For English send #️⃣*`;
            await redisHmset(redisChatId, "lang", "1");
          }

          await sendMessage(text, chatId, null, instanceId, instanceToken);
          await redisHmset(redisChatId, "chatId", chatId);
          await redisHmset(redisChatId, "serviceQSend", true);
          await redisExpire(redisChatId, 86400);
        }
      } else if (
        req.body.typeWebhook === "outgoingMessageReceived" &&
        pendingReservation?.customerService === "true"
      ) {
        if (textMessage === "**") {
          await redisdel(redisChatId);
          //Make the instance to mark the incoming messages as readed
          await setReaded(instanceId, instanceToken);
          let text;
          if (pendingReservation.lang === "2") {
            text = `Happy to assest you, see you later`;
            text += `😊\n\n`;
            text += `The conversation has been closed by the employee`;
          } else {
            text = `سعدنا بالحديث معك، نراك في وقت اخر`;
            text += `😊\n\n`;
            text += `تم اقفال المحادثة من قبل الموظف`;
          }
          await sendMessage(text, chatId, null, instanceId, instanceToken);
        }
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
