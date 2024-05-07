import FlashcardDAO from "../model/DAO/rivalearnPSQL.js";
import TwinwordApiClient from "./twinword.js";
import DeeplApiClient from "./deepl.js";

class Service {
  constructor() {
    this.model = new FlashcardDAO();
    this.twinwordApiClient = new TwinwordApiClient();
    this.deeplApiClient = new DeeplApiClient();
  }

  async getFlashcards(deckname) {
    try {
      const deckId = await this.model.getDeckId(deckname);
      const flashcards = await this.model.getFlashcards(deckId);
      return flashcards;
    } catch (error) {
      throw error;
    }
  }

  async getSentence(sourceLang, word) {
    let englishWord;
    if (sourceLang !== "en-US") {
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

  async saveFlashcard(deckname, vocab, sourceLang, targetLang) {
    try {
      const deckId = await this.model.getDeckId(deckname);
      const translatedVocab = await this.deeplApiClient.translate(
        vocab,
        sourceLang,
        targetLang
      );
      const sentence = await this.getSentence(sourceLang, vocab);
      const sourceLangSentence = await this.deeplApiClient.translate(
        sentence,
        "en-US",
        sourceLang
      );
      const targetLangSentence = await this.deeplApiClient.translate(
        sentence,
        "en-US",
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
}

export default Service;
