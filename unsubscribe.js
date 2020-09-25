
const emailAlreadyExistsQuote = 'Zadaná emailová adresa není přihlášena k odběru upozornění. Pokud se chcete přihlásit od upozornění, klikněte <a href="https://kdyvolit.cz/unsubscribe">zde</a>.';
const invalidEmailQuote = "Zadaná adresa není platná. Zadejte prosím platnou emailovou adresu."
const otherErrorQuote = "Neočekávaná chyba. Zkuste to prosím znovu. Překontrolujte zadanou emailovou adresu a zda jste přihlášeni k odběru.";
const successQuote = "Úspěšně jste zrušili svůj odběr";
const loadingQuote = "Čekejte prosím ...";

const submitMail = () => {
    let email = document.getElementById('email-input').value;
    let p = document.getElementById('email-result')


    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
        p.style.color = 'var(--warning-red)'
        p.innerHTML = invalidEmailQuote;
        return
    } else {
        console.log('Submiting mail', email)
        p.style.color = 'var(--title-off-black)';
        p.innerHTML = loadingQuote;
        firebase.functions().httpsCallable('addEmail')({ email: email }).then(res => {
            // console.log(res.data);
            if (res.data.data.error) {
                p.style.color = 'var(--warning-red)'
                p.innerHTML = invalidEmailQuote;
            } else {
                p.style.color = 'var(--title-off-black)';
                p.innerHTML = successQuote;
            }
        }).catch(err => {
            p.style.color = 'var(--warning-red)'
            p.innerHTML = otherErrorQuote;
        });
    }
}