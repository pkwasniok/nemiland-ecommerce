import Medusa, { MedusaError } from "@medusajs/medusa-js";

const client = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 1 });

export default client;
