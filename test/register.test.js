/* eslint-env node, mocha */
const assert = require('assert');
const path = require('path');
const {Application} = require('spectron');

// construct paths
const baseDir = path.join(__dirname, '..');
const electronBinary = path.join(baseDir, 'node_modules', '.bin', 'electron');

// utility functions
const sleep = time => new Promise(r => setTimeout(r, time));

describe('Register test launch', function() {
    this.timeout(30000);

    const app = new Application({
        path: electronBinary,
        args: [baseDir],
    });

    before(() => app.start());

    after(() => app.stop());


    it('Shows the login window', async () => {
        await app.client.waitUntilWindowLoaded();
        const count = await app.client.getWindowCount();
        assert.equal(count, 1);
    });
    // it('Shows the login window', async () => {
    //     await app.client.waitUntilWindowLoaded();
    //     const count = await app.client.getWindowCount();
    //     assert.equal(count, 1);
    // });

    it('Shows the login window', async () => {
        await app.client.waitUntilWindowLoaded();
        const count = await app.client.getWindowCount();
        assert.equal(count, 1);
    });


    it('Enter register page', async () => {
        await sleep(2000);
        // get login form
        const loginFormTwo = await app.client.getHTML('#login-form');
        assert.ok(loginFormTwo);

        // fill out login form
        //await app.client.setValue('#userName', "y@qq.com");
        //await app.client.setValue('#password', "111111");
        await app.client.click('#reg-link');
        await app.client.waitUntilWindowLoaded();
        const regFormTwo = await app.client.getHTML('#reg-form');
        assert.ok(regFormTwo);
        await sleep(2000);


        // check that index-layout is there
        //const layout = await app.client.getHTML('#index-layout');
        //assert.ok(layout);
    });

    it('Register Fail with wrongly formatted email', async () => {
        // get login form
        const regFormTwo = await app.client.getHTML('#reg-form');
        assert.ok(regFormTwo);

        // fill out login form
        await app.client.setValue('#email', "yy");
        await app.client.setValue('#password', "111111");
        await app.client.setValue('#confirm', "111111");
        //await sleep(20000000);
        await app.client.click('#reg-btn');
        await app.client.waitUntilWindowLoaded();
        // check that index-layout is there
        const reg_btn = await app.client.getHTML('#reg-btn');
        assert.ok(reg_btn);
    });

    it('Register Fail with inconsistant passwords', async () => {
        // get login form
        const regFormTwo = await app.client.getHTML('#reg-form');
        assert.ok(regFormTwo);

        // fill out login form
        await app.client.setValue('#email', "yy@qq.com");
        await app.client.setValue('#password', "111311");
        await app.client.setValue('#confirm', "111111");
        //await sleep(20000000);
        await app.client.click('#reg-btn');
        await app.client.waitUntilWindowLoaded();
        // check that index-layout is there
        const reg_btn = await app.client.getHTML('#reg-btn');
        assert.ok(reg_btn);
    });

    it('Register Fail with registered email', async () => {
        // get login form
        const regFormTwo = await app.client.getHTML('#reg-form');
        assert.ok(regFormTwo);

        // fill out login form
        await app.client.setValue('#email', "y@qq.com");
        await app.client.setValue('#password', "111111");
        await app.client.setValue('#confirm', "111111");
        //await sleep(20000000);
        await app.client.click('#reg-btn');
        await app.client.waitUntilWindowLoaded();
        // check that index-layout is there
        const reg_btn = await app.client.getHTML('#reg-btn');
        assert.ok(reg_btn);
    });

    it('Register Fail with too short password', async () => {
        // get login form
        const regFormTwo = await app.client.getHTML('#reg-form');
        assert.ok(regFormTwo);

        // fill out login form
        await app.client.setValue('#email', "yy@qq.com");
        await app.client.setValue('#password', "111");
        await app.client.setValue('#confirm', "111");
        //await sleep(20000000);
        await app.client.click('#reg-btn');
        await app.client.waitUntilWindowLoaded();
        // check that index-layout is there
        const reg_btn = await app.client.getHTML('#reg-btn');
        assert.ok(reg_btn);
    });

    // it('Register success', async () => {
    //     // get login form
    //     const regFormTwo = await app.client.getHTML('#reg-form');
    //     assert.ok(regFormTwo);
    //
    //     // fill out login form
    //     await app.client.setValue('#email', "yyy@qq.com");
    //     await app.client.setValue('#password', "111111");
    //     await app.client.setValue('#confirm', "111111");
    //     //await sleep(20000000);
    //     await app.client.click('#reg-btn');
    //     await app.client.waitUntilWindowLoaded();
    //     // check that index-layout is there
    //     const reg_btn = await app.client.getHTML('#reg-btn');
    //     assert.ok(reg_btn);
    // });

});
