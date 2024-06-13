import Service from "../service/flashcards.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getFlashcards = async (req, res) => {
    try {
      const { deckId } = req.params;
      const flashcards = await this.service.getFlashcards(deckId);
      res.json(flashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  saveFlashcard = async (req, res) => {
    try {
      const { deckId, vocab, sourceLang, targetLang } = req.body;
      await this.service.saveFlashcard(deckId, vocab, sourceLang, targetLang);
      res.status(200).json({ message: "OK" });
    } catch (error) {
      console.error("Error saving flashcard:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  getFlashcardById = async (req, res) => {
    try {
      const { flashcardId } = req.params;
      console.log('Flashcard ID:', flashcardId); // Agregar esta línea para imprimir el ID de la flashcard
      const flashcard = await this.service.getFlashcardById(flashcardId);
      console.log('Flashcard:', flashcard); // Agregar esta línea para imprimir la flashcard obtenida
      res.json(flashcard);
    } catch (error) {
      console.error("Error fetching flashcard by id:", error.message);
      res.status(400).json({ error: error.message });
    }
};

}


export default Controller;
