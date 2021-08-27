import mojo from '../lib/core.js';
import jsonConfigPlugin from '../lib/plugins/json-config.js';
import {app} from './support/js/jsonconfig-app/app.js';
import Path from '@mojojs/path';
import t from 'tap';

t.test('JSONConfig app', async t => {
  const ua = await app.newTestUserAgent({tap: t});

  await t.test('External app with config', async t => {
    t.same(app.config, {name: 'Bond. James Bond', drink: 'Martini', car: 'Aston Martin'});
    (await ua.getOk('/')).statusIs(200).bodyIs('My name is Bond. James Bond.');
  });

  await ua.stop();

  t.test('Named config file', t => {
    const app = mojo();
    app.log.level = 'debug';
    app.config = {name: 'overridden', extra: 'option'};
    const file = Path.currentFile()
      .dirname()
      .child('support', 'js', 'jsonconfig-app', 'custom', 'named.json')
      .toString();
    app.plugin(jsonConfigPlugin, {file});
    t.same(app.config, {name: 'namedConfig', extra: 'option', deep: {option: ['deep']}});
    t.end();
  });

  t.test('Named config file with custom mode', t => {
    const app = mojo({mode: 'test'});
    app.config = {name: 'overridden', extra: 'option'};
    const file = Path.currentFile()
      .dirname()
      .child('support', 'js', 'jsonconfig-app', 'custom', 'named.json')
      .toString();
    app.plugin(jsonConfigPlugin, {file});
    t.same(app.config, {name: 'namedConfig', extra: 'required', deep: {option: ['deep']}});
    t.end();
  });
});
