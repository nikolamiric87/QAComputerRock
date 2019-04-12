import { Selector, ClientFunction } from 'testcafe';


fixture `Test Page`
    .page `https://iskljucenja.rs/`;

    const getLocation = ClientFunction(() => window.location.href);
    const entryEmail = Selector('input').withAttribute('type', 'text');
    const entryPassword = Selector('input').withAttribute('name', 'password');
    const submitLogin = Selector('button').withAttribute('type', 'submit');
    const setLanguage = Selector('a').withText('LATINICA');
    const hoverAdress1 = Selector('h3').withText('Adresa 1');
    const submitAdress1 = Selector('button').withAttribute('onclick', "toggle_adress_input('0')");
    const enterLocation = Selector('.input_field.input_field_dashboard').withText('Opština u Beogradu');
    const submitLocation = Selector('option').withText('Palilula');
    const enterStreet = Selector('input').withAttribute('placeholder', 'Ime ulice');
    const enterNumber = Selector('input').withAttribute('placeholder', 'Broj');
    const add = Selector('button').withAttribute('onclick', "onNewAddressSubmitClick('0')");
    const submitAdress2 = Selector('button').withAttribute('onclick', "toggle_adress_input('1')");
    const withdraw = Selector('button').withAttribute('onclick', "cancelAddAddressForm(event, '1')");
    const questions = Selector('a').withText('ČESTA PITANJA');
    const sendEmail = Selector('input').withAttribute('placeholder', 'Unesite e-mail adresu');
    const sendSubmit = Selector('button').withText('Pošaljite');
    const buttonDelete = Selector('button').withText('Izbrišite nalog');

    test(`Complete test`, async t => {

        await t
            .setTestSpeed(0.9)
            .maximizeWindow()
            .expect(getLocation()).contains('iskljucenja')
            .hover('.wellcome_page__app_image_and_description')
            .typeText(entryEmail, 'miric')
            .typeText(entryEmail, 'niolamiric@yahoo.com', { replace: true })
            .typeText(entryEmail, 'k', { caretPos: 2 })
            .expect(entryEmail.value).eql('nikolamiric@yahoo.com')
            .typeText(entryPassword, 'nikola4444')
            .click(submitLogin)
            .wait(5000)
            .click(setLanguage)
            .hover(hoverAdress1)
            .click(submitAdress1)
            .click(enterLocation)
            .click(submitLocation)
            .typeText(enterStreet, 'Stanoja Glavasa')
            .typeText(enterNumber, '1')
            .click(add)
            .click(submitAdress2)
            .click(withdraw)
            .click(questions)
            .navigateTo('https://iskljucenja.rs/dashboard?language=srpski-latinica')
            .wait(5000)
            .typeText(sendEmail, 'nikolamiric87@gmail.com')
            .click(sendSubmit)
            .wait(4000)
            .navigateTo('https://iskljucenja.rs/dashboard?language=srpski-latinica')
            .wait(3000)
            .setNativeDialogHandler((type, text, url) => {
                switch (type) {
                    case 'confirm':
                        switch (text) {
                            case 'Da li zaista želite da izbrišete nalog?':
                                return true;
                            default:
                                throw 'Unexpected confirm dialog!';
                        }
                }
            })
            .click(buttonDelete)
            .wait(3000)
    });

