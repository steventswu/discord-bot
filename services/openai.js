require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function aiAssistant(prompt) {
  try {
    const { data } = await openai.createCompletion({
      model: process.env.OPEN_AI_GPT_MODEL,
      prompt,
      max_tokens: Number(process.env.OPEN_AI_MAX_TOKENS),
    });
    const [choices] = data.choices;

    return choices.text.trim(); // OpenAI 回傳時都會有許多空白，因此要使用 trim 去除前後空白
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return `對不起，我發生 **${error.response.status} - ${error.response.statusText}** 錯誤，所以不知道該怎麼回你 QQ`;
  }
}

module.exports = {
  aiAssistant,
};
