import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class TwinwordApiClient {
  constructor() {
    this.baseURL =
      "https://twinword-word-graph-dictionary.p.rapidapi.com/example/";
    this.apiKey = process.env.RAPIDAPI_API_KEY;
  }

  async getSentence(word) {
    const options = {
      method: "GET",
      url: this.baseURL,
      params: {
        entry: word,
      },
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.example[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Twinword's examples API.");
    }
  }
}

export default TwinwordApiClient;
