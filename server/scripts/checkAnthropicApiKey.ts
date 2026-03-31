import axios from "axios";

const apiKey = process.env.ANTHROPIC_API_KEY || "YOUR_ANTHROPIC_API_KEY_HERE";

async function checkAnthropicApiKey() {
  if (!apiKey || apiKey === "YOUR_ANTHROPIC_API_KEY_HERE") {
    console.error("Please set your ANTHROPIC_API_KEY environment variable or replace it in the script.");
    process.exit(1);
  }

  try {
    // Anthropic's /v1/complete endpoint is a simple way to check key validity
    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      {
        prompt: "\n\nHuman: Hello\n\nAssistant:",
        model: "claude-2",
        max_tokens_to_sample: 1
      },
      {
        headers: {
          "x-api-key": apiKey,
          "content-type": "application/json"
        }
      }
    );
    if (response.data && response.data.completion !== undefined) {
      console.log("✅ Anthropic API key is valid.");
    } else {
      console.error("❌ Unexpected response, check your API key and try again.");
    }
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.error("❌ Invalid Anthropic API key (401 Unauthorized).");
    } else {
      console.error("❌ Error while checking key:", err.message || err);
    }
  }
}

checkAnthropicApiKey();
