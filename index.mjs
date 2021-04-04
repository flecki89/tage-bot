import dayjs from 'dayjs';
import { TwitterClient } from 'twitter-api-client';
import schedule from 'node-schedule';

const twitterClient = new TwitterClient({
  apiKey: 'yd0F0RFuTQg134s3zLQkfbBZz',
  apiSecret: '983QsDRP6BpwC2xF8Rdboh4VojtkIUSIro8l2HfGQRYwAFnB8S',
  accessToken: '1378483748656779264-rz35pULM40ENERSNDhNrmLSXGpRkOW',
  accessTokenSecret: 'qT4oCMZ86Q6m13w2bY2C4RsEMTM1YCkjb7pZoEJ6ijNal',
});

function tweet(dryRun = false) {
  let then = dayjs('2021-04-02T21:00:00').add(100, 'day'); // Announcement has been posted on April 2nd, 23:00
  let remainingDays = Math.ceil(then.diff(dayjs(), 'day', true));
  let daysLabel = remainingDays === 1 || remainingDays === -1 ? 'Tag' : 'Tage';

  let reply_to = 1378508268981608448n;
  let tweet = `Noch ${remainingDays} ${daysLabel}`;

  log('log', '🐦 Tweet: ' + tweet);

  if (dryRun) {
    log('log', `✔ Tweet has been posted (id: DRYRUN)`);
    return;
  }

  twitterClient.tweets.statusesUpdate({ status: tweet, in_reply_to_status_id: reply_to })
    .then((res) => {
      log('log', `✔ Tweet has been posted (id: ${res.id})`);
    })
    .catch((e) => {
      log('error', '❌ Uh Oh! Something went wrong', e);
    })
    .finally(() => {
      logNextExecution();
    })
}

function log(type = 'log', ...args) {
  console[type](`[${dayjs().format()}]`, ...args);
}

function logNextExecution() {
  log('info', 'Next job execution will be at', dayjs(job.nextInvocation()).format());
}

const job = schedule.scheduleJob('*/5 */1 * * * *', () => {
  tweet();
});

log('log', '🟢 TageBot started');
logNextExecution();

