import * as deepl from "deepl-node";

class DeeplApiClient {
  constructor() {
    this.apiKey = process.env.DEEPL_API_KEY;
    this.translator = new deepl.Translator(this.apiKey);
  }

  async translate(text, sourceLang, targetLang) {
    try {
      const res = await this.translator.translateText(
        text,
        sourceLang,
        targetLang
      );
      return res.text;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching DeepL API.");
    }
  }
}

export default DeeplApiClient;
