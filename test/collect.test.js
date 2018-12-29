
/* eslint-env node, mocha */
const assert = require('assert');
const path = require('path');
const {Application} = require('spectron');
let jsdom = require('jsdom').JSDOM;


// construct paths
const baseDir = path.join(__dirname, '..');
const electronBinary = path.join(baseDir, 'node_modules', '.bin', 'electron');

// utility functions
const sleep = time => new Promise(r => setTimeout(r, time));

describe('Collect test launch', function() {
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

    it('Click picture with id 1', async () => {
        await app.client.waitUntilWindowLoaded();

        const html1 = await app.client.getHTML('body');
        var dom1 = new jsdom(html1);
        var uid_pic = dom1.window.document.getElementById('pic_0').getAttribute("name")
        await app.client.click("#collect_0");
        await app.client.click("#collects");
        await sleep(2000);
        await app.client.waitUntilWindowLoaded();

        const html2 = await app.client.getHTML('body');
        var dom2 = new jsdom(html2);
        var list = [];
        var i = 0;
        while(1){
            var tmp = dom2.window.document.getElementById('pic_' + i)
            if(tmp){
                var tmp_name = tmp.getAttribute("name");
                list.push(tmp_name);
            }
            else{
                break;
            }
            i = i + 1;
        } 

        //cancel collect on pic_0
        await app.client.click("#home");
        await sleep(2000);
        await app.client.waitUntilWindowLoaded();
        await app.client.click("#collect_0");

        assert.ok(list.indexOf(uid_pic) >= 0);
    });

});
