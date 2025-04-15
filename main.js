async function sleep(ms) { await new Promise(r => setTimeout(r, ms)); }
function maxchars(string, chars) { return (string.length <= chars) ? string : (string.substring(0, chars - 3) + "..."); }

async function isAuthorized(pb) { try { await pb.collection("accounts").authRefresh(); return true; } catch { return false; }}
async function updateData(newdata, ref) { try { await ref.pb.collection("accounts").update(ref.pb.authStore.record.id, { data: newdata }); return true; } catch (e) { console.error("Failed updating userdata:", e); return false; } }

function myAlert(message)
{
    const id = `overlay-${Date.now()}`;
    const eightypercent = 0.8 * document.body.getBoundingClientRect().width;

    const overlay = document.createElement("div");
    const text = document.createElement("p");
    const button = document.createElement("button");

    overlay.id = id;
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.textAlign = "center";
    overlay.style.background = "var(--background-color-dark-mode)";
    overlay.style.opacity = 0.8;

    text.textContent = message;
    text.style.margin = "15px";
    text.style.padding = "20px";
    text.style.borderBottom = "2px solid var(--border-color-dark-mode)";
    text.style.width = "fit-content";
    text.style.maxWidth = (500 < eightypercent) ? "500px" : `${eightypercent}px`;

    button.textContent = "Close";
    button.setAttribute("onclick", `document.getElementById("${id}").remove();`);

    overlay.appendChild(text);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
}

function myConfirm(message)
{   return new Promise((resolve) => {
    const id = `overlay-${Date.now()}`;
    const eightypercent = 0.8 * document.body.getBoundingClientRect().width;

    const overlay = document.createElement("div");
    const btns = document.createElement("div");
    const text = document.createElement("p");
    const confirm = document.createElement("button");
    const cancel = document.createElement("button");

    overlay.id = id;
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.textAlign = "center";
    overlay.style.background = "var(--background-color-dark-mode)";
    overlay.style.opacity = 0.8;

    btns.style.flexDirection = "row";
    btns.style.maxHeight = "fit-content";
    btns.appendChild(cancel);
    btns.appendChild(confirm);

    text.textContent = message;
    text.style.margin = "15px";
    text.style.padding = "20px";
    text.style.borderBottom = "2px solid var(--border-color-dark-mode)";
    text.style.width = "fit-content";
    text.style.maxWidth = (500 < eightypercent) ? "500px" : `${eightypercent}px`;

    confirm.textContent = "Confirm";
    confirm.onclick = () => { document.getElementById(id).remove(); resolve(true); }

    cancel.textContent = "Cancel";
    cancel.onclick = () => { document.getElementById(id).remove(); resolve(false); }

    overlay.appendChild(text);
    overlay.appendChild(btns);
    document.body.appendChild(overlay);
    });
}

function myPrompt(message)
{   return new Promise((resolve) => {
    const id = `overlay-${Date.now()}`;
    const eightypercent = 0.8 * document.body.getBoundingClientRect().width;

    const overlay = document.createElement("div");
    const text = document.createElement("p");
    const input = document.createElement("input");
    const button = document.createElement("button");

    overlay.id = id;
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.textAlign = "center";
    overlay.style.background = "var(--background-color-dark-mode)";
    overlay.style.opacity = 0.8;

    input.placeholder = message;
    input.style.margin = "5px";
    input.style.padding = "10px";
    input.style.borderBottom = "2px solid var(--border-color-dark-mode)";
    input.style.maxWidth = (500 < eightypercent) ? "500px" : `${eightypercent}px`;
    input.style.maxHeight = "fit-content";

    button.textContent = "Done";
    button.onclick = () => { if (input.value) { document.getElementById(id).remove(); resolve(input.value); } }

    overlay.appendChild(text);
    overlay.appendChild(input);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    input.focus();
    });
}