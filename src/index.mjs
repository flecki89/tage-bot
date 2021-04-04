import dayjs from 'dayjs';
import { TwitterClient } from 'twitter-api-client';
import schedule from 'node-schedule';
import { config } from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('.env')) {
  log('log', '.env file exists. Load variables from there.');
  config();
}

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
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

const job = schedule.scheduleJob(process.env.JOB_SCHEDULE, () => {
  tweet();
});

log('log', '🟢 TageBot started');
logNextExecution();

