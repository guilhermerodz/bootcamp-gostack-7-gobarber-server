import mongoose from 'mongoose';

import database from '../../src/database';
import Cache from '../../src/lib/Cache';

export default function truncate(
  options = {
    sql: true,
    mongo: true,
    cache: true,
  }
) {
  const sqlTruncate = Object.values(database.connection.models).map(model =>
    model.truncate({
      cascade: true,
    })
  );

  const mongoTruncate = mongoose.modelNames().map(modelName => {
    const model = mongoose.model(modelName);

    return model.deleteMany({});
  });

  const cacheTruncate = Cache.truncate();

  const promises = [];

  if (options.sql) promises.push(...sqlTruncate);
  if (options.mongo) promises.push(...mongoTruncate);
  if (options.cache) promises.push(cacheTruncate);

  return Promise.all(promises);
}
