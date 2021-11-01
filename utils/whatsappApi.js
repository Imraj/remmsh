const axios = require("axios");

const BASE_URL = "https://api.green-api.com";

const sendMessage = (
  message,
  chatId,
  phoneNumber,
  instanceId,
  instanceToken
) => {
  let chatIdToSend;
  if (phoneNumber) {
    chatIdToSend = `${phoneNumber}@c.us`;
  } else {
    chatIdToSend = chatId;
  }

  try {
    axios.post(
      `${BASE_URL}/waInstance${instanceId}/SendMessage/${instanceToken}`,
      {
        chatId: chatIdToSend,
        message: message,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const setWebhook = (path, instanceId, instanceToken) => {
  try {
    axios.post(
      `${BASE_URL}/waInstance${instanceId}/SetSettings/${instanceToken}`,
      {
        webhookUrl: `${process.env.APP_URL}/${path}`,
        outgoingWebhook: "yes",
        stateWebhook: "yes",
        incomingWebhook: "yes",
        deviceWebhook: "no",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const createInstance = async (path) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/partner/createInstance/${process.env.GREEN_API_PARTNER_TOKEN}`,
      {
        typeInstance: "whatsapp",
        typeAccount: "production",
        webhookUrl: `${process.env.APP_URL}/${path}`,
        markIncomingMessagesReaded: "yes",
        markIncomingMessagesReadedOnReply: "no",
        partnerUserUiid: "325471d3-69aa-43c5-9153-2086274aeef9",
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getInstanceQr = async (instanceId, instanceToken) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/waInstance${instanceId}/qr/${instanceToken}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteInstance = async (instanceId) => {
  try {
    await axios.post(
      `${BASE_URL}/partner/deleteInstanceAccount/${process.env.GREEN_API_PARTNER_TOKEN}`,
      {
        idInstance: instanceId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const setUnreaded = (instanceId, instanceToken) => {
  try {
    axios.post(
      `${BASE_URL}/waInstance${instanceId}/SetSettings/${instanceToken}`,
      {
        markIncomingMessagesReaded: "no",
        markIncomingMessagesReadedOnReply: "no",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const setReaded = (instanceId, instanceToken) => {
  try {
    axios.post(
      `${BASE_URL}/waInstance${instanceId}/SetSettings/${instanceToken}`,
      {
        markIncomingMessagesReaded: "yes",
        markIncomingMessagesReadedOnReply: "no",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessage,
  setWebhook,
  createInstance,
  getInstanceQr,
  deleteInstance,
  setUnreaded,
  setReaded,
};
