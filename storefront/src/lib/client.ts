import Medusa from "@medusajs/medusa-js";

const client = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 });

export default client;
