import FlashcardDAO from "../model/DAO/rivalearnPSQL.js";
import TwinwordApiClient from "./twinword.js";
import DeeplApiClient from "./deepl.js";

class Service {
  constructor() {
    this.model = new FlashcardDAO();
    this.twinwordApiClient = new TwinwordApiClient();
    this.deeplApiClient = new DeeplApiClient();
  }

  async getFlashcards(deckId) {
    try {
      const flashcards = await this.model.getFlashcards(deckId);
      return flashcards;
    } catch (error) {
      throw error;
    }
  }

  
  async getFlashcardById(flashcardId) {
    try {
      const flashcard = await this.model.getFlashcardById(flashcardId);
      return flashcard;
    } catch (error) {
      throw error;
    }
  }



  async getSentence(sourceLang, word) {
    let englishWord;
    if (sourceLang !== "en") {
      englishWord = await this.deeplApiClient.translate(
        word,
        sourceLang,
        "en-US"
      );
    } else {
      englishWord = word;
    }
    const sentence = await this.twinwordApiClient.getSentence(englishWord);
    return sentence;
  }

  async saveFlashcard(deckId, vocab, sourceLang, targetLang) {
    try {
      let sourceToTargetCode = await this.formatLangCode(sourceLang);
      const translatedVocab = await this.deeplApiClient.translate(
        vocab,
        sourceLang,
        targetLang
      );
      const sentence = await this.getSentence(sourceLang, vocab);
      const sourceLangSentence = await this.deeplApiClient.translate(
        sentence,
        "en",
        sourceToTargetCode
      );
      const targetLangSentence = await this.deeplApiClient.translate(
        sentence,
        "en",
        targetLang
      );
      await this.model.saveFlashcard(
        deckId,
        vocab,
        translatedVocab,
        sourceLangSentence,
        targetLangSentence
      );
    } catch (error) {
      throw error;
    }
  }

  async formatLangCode(code) {
    let formattedCode = code;
    if (code === "en") {
      formattedCode = "en-US";
    } else if (code === "pt") {
      formattedCode = "pt-BR";
    }
    return formattedCode;
  }
}

export default Service;
