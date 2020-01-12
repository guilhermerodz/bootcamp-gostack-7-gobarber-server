import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.values(database.connection.models).map(model =>
      model.truncate({
        cascade: true,
      })
    )
  );
}
