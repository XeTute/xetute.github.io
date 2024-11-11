
        const pb = new PocketBase(link); // link in pocketbase.umd.js

        let email, password, authData = undefined;

        async function autoSignIn(referSuccess, referFail)
        {
            try { authData = await pb.collection('users').authRefresh(); }
            catch
            {
                if (referFail !== undefined) window.location.href = referFail; // For auth page
                return false;
            }
            if (authData.record.verified && (referSuccess !== undefined)) window.location.href = referSuccess;
            else if (!authData.record.verified && (referFail !== undefined)) window.location.href = referFail;
            else if (!authData.record.verified) return false; 
            return true;
        }

        async function signIn(emailID, passID, referSuccess, referFail)
        {
            email = document.getElementById(emailID).value;
            password = document.getElementById(passID).value;

            try { authData = await pb.collection('users').authWithPassword(email, password); }
            catch { if (referFail !== undefined) window.location.href = referFail; return false; }

            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            if (referSuccess !== undefined && authData.record.verified) window.location.href = referSuccess;
            return true;
        }

        async function signUp(emailID, passID1, passID0, noteID)
        {
            email = document.getElementById(emailID).value;
            password = document.getElementById(passID0).value;

            console.log(document.getElementById(emailID).value);
            const data =
            {
                "password": password,
                "passwordConfirm": document.getElementById(passID1).value,
                "email": email,
                "verified": false, // If you're reading this, try setting it to true to feel like a hacker till you get an error.
            };

            try { authData = await pb.collection('users').create(data); }
            catch { return false; }

            try { await pb.collection('users').requestVerification(email); }
            catch { return false; }
            document.getElementById(noteID).innerHTML = '<p style="color:green">Send verification Email</p>';
            return true;
        }

        function switchForm(elem0, elem1)
        {
            if (document.getElementById(elem0).style.display === 'none')
            {
                document.getElementById(elem0).style.display = 'flex';
                document.getElementById(elem1).style.display = 'none';
            }
            else
            {
                document.getElementById(elem1).style.display = 'flex';
                document.getElementById(elem0).style.display = 'none';
            }
        }

        function getImageURL(collectionID, recID, filename) { return `${link}api/files/${collectionID}/${recID}/${filename}`; }
