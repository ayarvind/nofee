import app from './app';
import run from '../kafka/consumers/notification-status'

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  try {
    run()
  } catch (error) {
    console.log("Failed to initiate consumer");
  }
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
