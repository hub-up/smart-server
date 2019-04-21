'use strict';

const rootDir = process.cwd();
const appInfo = require(`${rootDir}/src/models/app-info/app-info.model.js`);
const supergoose = require(`${rootDir}/__tests__/supergoose.js`);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('`appInfo` model', () => {
  const obj = { name: 'demo', description: 'good', url: 'https://demo.com' };
  const update = { name: 'better demo', description: 'better', url: 'https://demo.com' };
  it('can `post` a new record', async () => {
    const record = await appInfo.post(obj);
    expect(record).toMatchObject(obj);
  });
  beforeAll(() => {
    appInfo.post(obj);
    appInfo.post(update);
  });
  it('can `get` all records', async () => {
    const record = await appInfo.get();
    expect(record.length).toBe(3);
    expect(record[1]).toMatchObject(update);
  });
  it('can `get` a record by `name`', async () => {
    const record = await appInfo.get(update.name);
    expect(record).toMatchObject(update);
  });

  it('can `patch` a record', async () => {
    const { id } = await appInfo.post(obj);
    const record = await appInfo.patch(id, update);
    expect(record).toMatchObject(update);
  });
  it('can `put` a record', async () => {
    const { id } = await appInfo.post(obj);
    const record = await appInfo.put(id, update);
    expect(record).toMatchObject(update);
  });
  it('can `delete` a record', async () => {
    const { id } = await appInfo.post(obj);
    const record = await appInfo.delete(id);
    expect(record).toMatchObject({});
  });
});
