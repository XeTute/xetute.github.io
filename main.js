async function sleep(ms) { await new Promise(r => setTimeout(r, ms)); }
function maxchars(string, chars) { return (string.length < chars) ? string : (string.substring(0, chars - 2) + ".."); }

async function isAuthorized(pb) { try { await pb.collection("accounts").authRefresh(); return true; } catch { return false; }}
async function updateData(newdata, pb) { try { await pb.collection("accounts").update(pb.authStore.record.id, { data: newdata }); return true; } catch (e) { console.error("Failed updating userdata:", e); return false; } }