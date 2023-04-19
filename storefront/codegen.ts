import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/shop-api",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__graphql__/": {
      plugins: ["typescript"],
      preset: "client",
    },
  },
};

export default config;
