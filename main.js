async function sleep(ms) { await new Promise(r => setTimeout(r, ms)); }
function maxchars(string, chars) { return (string.length <= chars) ? string : (string.substring(0, chars - 3) + "..."); }

async function isAuthorized(ref) { try { await ref.pb.collection("accounts").authRefresh(); return true; } catch { return false; }}
async function updateData(newdata, ref) { try { await ref.pb.collection("accounts").update(ref.pb.authStore.record.id, { data: newdata }); return true; } catch (e) { console.error("Failed updating userdata:", e); return false; } }

function getOverlay(id)
{
    const overlay = document.createElement("div");
    overlay.id = id;
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.textAlign = "center";
    overlay.style.zIndex = 10;
    return overlay;
}

async function fadeinOverlay(id)
{
    const overlay = document.getElementById(id);
    overlay.style.backdropFilter = "blur(0px)";
    overlay.style.opacity = 0;

    let to1sec = 1 / 12;
    for (let x = 0; x < 12; ++x)
    {
        await sleep(to1sec);
        overlay.style.backdropFilter = `blur(${x}px)`;
        overlay.style.opacity = x * to1sec;
    }
}

async function fadeoutOverlay(id)
{
    const overlay = document.getElementById(id);
    overlay.style.backdropFilter = "blur(12px)";
    overlay.style.opacity = 1;

    let to1sec = 1 / 12;
    for (let x = 12; x >= 0; --x)
    {
        await sleep(to1sec);
        overlay.style.backdropFilter = `blur(${x}px)`;
        overlay.style.opacity = x * to1sec;
    }
}

function getOverlayText(message)
{
    const eightypercent = 0.8 * document.body.getBoundingClientRect().width;
    const text = document.createElement("p");
    text.textContent = message;
    text.style.margin = "15px";
    text.style.padding = "20px";
    text.style.borderBottom = "2px solid var(--border-color-dark-mode)";
    text.style.width = "fit-content";
    text.style.maxWidth = (500 < eightypercent) ? "500px" : `${eightypercent}px`;
    return text;
}

function myAlert(message)
{
    const id = `overlay-${Date.now()}`;
    const overlay = getOverlay(id);
    const text = getOverlayText(message);
    const button = document.createElement("button");

    button.textContent = "Close";
    button.onclick = async () => { await fadeoutOverlay(id); document.getElementById(id).remove(); };

    overlay.appendChild(text);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    fadeinOverlay(id);
}

function myAlertImage(imgdata)
{
    const id = `overlay-${Date.now()}`;
    const overlay = getOverlay(id);
    const image = document.createElement("img");
    const button = document.createElement("button");

    image.style.maxWidth = "80%";
    image.style.maxHeight = "80%";
    image.style.borderRadius = "25px";
    image.style.border = "2px solid var(--border-color-dark-mode);";
    image.src = imgdata;

    button.textContent = "Close";
    button.onclick = async () => { await fadeoutOverlay(id); document.getElementById(id).remove(); };

    overlay.appendChild(image);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    fadeinOverlay(id);
}

function myConfirm(message)
{   return new Promise((resolve) => {

    const id = `overlay-${Date.now()}`;
    const overlay = getOverlay(id);
    const btns = document.createElement("div");
    const text = getOverlayText(message);
    const confirm = document.createElement("button");
    const cancel = document.createElement("button");

    btns.style.flexDirection = "row";
    btns.style.maxHeight = "fit-content";
    btns.appendChild(cancel);
    btns.appendChild(confirm);

    confirm.textContent = "Confirm";
    confirm.onclick = async () => { await fadeoutOverlay(id); document.getElementById(id).remove(); resolve(true); }

    cancel.textContent = "Cancel";
    cancel.onclick = async () => { await fadeoutOverlay(id); document.getElementById(id).remove(); resolve(false); }

    overlay.appendChild(text);
    overlay.appendChild(btns);
    document.body.appendChild(overlay);
    fadeinOverlay(id);
    });
}

function myPrompt(message, fillwith="")
{   return new Promise((resolve) => {

    const eightypercent = 0.8 * document.body.getBoundingClientRect().width;
    const id = `overlay-${Date.now()}`;
    const overlay = getOverlay(id);
    const input = document.createElement("textarea");
    const button = document.createElement("button");

    input.placeholder = message;
    input.textContent = fillwith;
    input.style.margin = "5px";
    input.style.padding = "10px";
    input.style.borderBottom = "2px solid var(--border-color-dark-mode)";
    input.style.maxWidth = (500 < eightypercent) ? "500px" : `${eightypercent}px`;
    input.style.maxHeight = "fit-content";

    button.textContent = "Done";
    button.onclick = async () => { if (input.value) { await fadeoutOverlay(id); document.getElementById(id).remove(); resolve(input.value); } }

    overlay.appendChild(input);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    fadeinOverlay(id);
    input.focus();
    });
}
