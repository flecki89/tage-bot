import dayjs from 'dayjs';
import { TwitterClient } from 'twitter-api-client';

const twitterClient = new TwitterClient({
    apiKey: 'yd0F0RFuTQg134s3zLQkfbBZz',
    apiSecret: '983QsDRP6BpwC2xF8Rdboh4VojtkIUSIro8l2HfGQRYwAFnB8S',
    accessToken: '1378483748656779264-rz35pULM40ENERSNDhNrmLSXGpRkOW',
    accessTokenSecret: 'qT4oCMZ86Q6m13w2bY2C4RsEMTM1YCkjb7pZoEJ6ijNal',
  });

  let then = dayjs('2021-07-12');
  let remainingDays = Math.ceil(then.diff(dayjs(),'day',true));
  let daysLabel = remainingDays === 1 || remainingDays === -1 ? 'Tag' : 'Tage';

  let reply_to = 1378508268981608448n;
  let tweet = `Noch ${remainingDays} ${daysLabel}`;

  console.log('🐦 ' + tweet);

  twitterClient.tweets.statusesUpdate({status: tweet, in_reply_to_status_id: reply_to})
  .then((res) => {
    console.log('Tweet has been posted', res);
  })
  .catch((e) => {
    console.error('Uh Oh! Something went wrong', e);
  })