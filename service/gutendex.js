import axios from "axios";

class Service {
  constructor() {
    this.baseURL = "https://gutendex.com/books";
  }

  getBooks = async (code) => {
    const url = `${this.baseURL}/?topic=children&languages=${code}`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Gutendex API.");
    }
  };

  getText = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Gutendex API.");
    }
  };
}

export default Service;
