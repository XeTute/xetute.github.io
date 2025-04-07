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