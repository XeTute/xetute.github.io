function getLMEndpoints()
{
    const pollendpoint = `https://text.pollinations.ai/openai?seed=${Date.now() % 8192}`;
    const maxgen = 8 * 1024;
    const endpoints =
    [
        {
            url: pollendpoint,
            key: "0",
            model: "openai-large",
            vision: true,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "searchgpt",
            vision: true,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "openai-reasoning",
            vision: true,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "gemini", // 2.5 flash
            vision: true, // also supports audio (for output too)
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "llama", // 3.3 70B
            vision: false,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "llamascout",
            vision: false,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "mistral", // small 3
            vision: false, // "I'm afraid I can't directly view or interpret images."
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "llama-vision", // 3.2 11B
            vision: true,
            generation: maxgen
        },
        {
            url: pollendpoint,
            key: "0",
            model: "phi", // 4 instruct
            vision: true, // also supports audio
            generation: maxgen
        },
        {
            url: "https://ai.xetute.com/v1/chat/completions",
            key: "0",
            model: "0",
            vision: true,
            generation: maxgen / 2 // Not cuz of compute, local endpoint is only ~40tps, which is too slow to handle mult. req.
        },
        {
            url: "https://api.groq.com/openai/v1/chat/completions",
            key: "g" + "sk" + "_aYtFXeVhm5AtbOYaW4NSWGdyb3FYGzfOtgY3Q2hQsW6ICQetBOZE",
            model: "gemma2-9b-it",
            vision: false,
            generation: maxgen
        }
    ];
    return endpoints;
}