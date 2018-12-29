/* eslint-env node, mocha */
const assert = require('assert');
const path = require('path');
const {Application} = require('spectron');

// construct paths
const baseDir = path.join(__dirname, '..');
const electronBinary = path.join(baseDir, 'node_modules', '.bin', 'electron');

// utility functions
const sleep = time => new Promise(r => setTimeout(r, time));

describe('Login test launch', function() {
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

    it('Login Fail with invalid username', async () => {
        // get login form
        const loginFormTwo = await app.client.getHTML('#login-form');
        assert.ok(loginFormTwo);

        // fill out login form
        await app.client.setValue('#userName', "yy@qq.com");
        await app.client.setValue('#password', "111111");
        await app.client.click('#login-btn');
        await app.client.waitUntilWindowLoaded();
        await sleep(2000);


        // check that index-layout is there
        const login_btn = await app.client.getHTML('#login-btn');
        assert.ok(login_btn);
    });

    it('Login Fail with invalid password', async () => {
        // get login form
        const loginFormTwo = await app.client.getHTML('#login-form');
        assert.ok(loginFormTwo);

        // fill out login form
        await app.client.setValue('#userName', "y@qq.com");
        await app.client.setValue('#password', "1111111");
        await app.client.click('#login-btn');
        await app.client.waitUntilWindowLoaded();
        await sleep(2000);


        // check that index-layout is there
        const login_btn = await app.client.getHTML('#login-btn');
        assert.ok(login_btn);
    });

    it('Login Success', async () => {
        // get login form
        const loginFormTwo = await app.client.getHTML('#login-form');
        assert.ok(loginFormTwo);

        // fill out login form
        await app.client.setValue('#userName', "testwallpaper@outlook.com");
        await app.client.setValue('#password', "111111");
        await app.client.click('#login-btn');
        await app.client.waitUntilWindowLoaded();
        await sleep(2000);


        // check that index-layout is there
        const layout = await app.client.getHTML('#index-layout');
        assert.ok(layout);
    });

});
