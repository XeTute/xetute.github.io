function countWords(text) // Naive, only counts spaces
{
    let count = 1;
    for (let x = 0; x < text.length; ++x)
        { if (text[x] === ' ') { ++count; } }
    return count;
}

function ensureMaxChars(str, maxchars) { return str.length > maxchars ? str.substring(0, maxchars - 3) + '...' : str; }
function ensureMaxDigits(x, maxdigits)
{
    const xstr = String(x);
    return ((xstr.length > maxdigits) ? ((xstr.substring(0, maxdigits)[maxdigits - 1] === '.') ? xstr.substring(0, maxdigits + 1) : xstr.substring(0, maxdigits)) : xstr);
}

function toggleThoughts(button)
{
    const container = button.nextElementSibling;
    const isVisible = container.style.display === 'block';
    container.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Show Thoughts' : 'Hide Thoughts';
    if (!isVisible)
    {
        setTimeout(() =>
        { container.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 200);
    }
}

function generateSystemPrompt(username)
{
    let buffer =
    `You are a helpful assistant for ${username}.\nYou may think through the "<think>thoughts</think>answer" format.
    Your thoughts, if, should include a structured plan on how you're going to approach the user's query. Nobody except yourself sees your thoughts.
    You can generate images; example: ![description](https://image.pollinations.ai/p/encoded%20URI%20of%20an%20image%20description?model=turbo&width=XXXX&height=XXXX&seed=XX&nologo=true&enhance=true). These images may take some time to load; tell the user.
    Markdown is fully supported.. If the user queries content which includes insults on religions, on God, on any eastern country (except Afghanistan), or is sexually-suggestive, you will not engage in that chat.`;
    return buffer;
}