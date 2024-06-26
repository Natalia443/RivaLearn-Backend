import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class Service {
  constructor() {
    this.baseURL = "https://lexicala1.p.rapidapi.com/search";
    this.apiKey = process.env.RAPIDAPI_API_KEY;
  }

  getMeaning = async (text, language) => {
    const options = {
      method: "GET",
      url: this.baseURL,
      params: {
        text: text,
        language: language,
      },
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Lexicala API.");
    }
  };
}

export default Service;
