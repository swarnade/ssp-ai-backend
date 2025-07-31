const { AzureOpenAI } = require('openai');
const apiKey = process.env.Azure_Openai_Key;
const endpoint=  process.env.Azure_Openai_Endpoint;
async function azuregpt(input, model){
    const apiVersion = "2024-12-01-preview";
    const deployment = model;
    const options = { endpoint, apiKey, deployment, apiVersion };

    const client = new AzureOpenAI(options);

    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input }
            ],
            model,
        });

        if (response?.error !== undefined && response.status !== "200") {
            throw response.error;
        }

        const output = response.choices[0].message.content;
        return output;

    } catch (err) {
        return { error: err };
    }
}
module.exports=azuregpt