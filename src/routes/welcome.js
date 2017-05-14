const request = require('request');
const env = require('env2')('./config.env');
const cookieAuthModule = require('hapi-auth-cookie');
const qs = require('querystring');
const connect = require('../database/db_connect');
const post = require('./../database/post_poems');

const appId = process.env.APP_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = `${process.env.BASE_URL}/welcome`;

module.exports = {
  method: 'GET',
  path: '/welcome{facebookCode?}',
  config: {
    auth: false,
    handler: (req, reply) => {
      request.post(`https://graph.facebook.com/v2.9/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${req.url.query.code}`,
      (error, response, body) => {
        const accessToken = JSON.parse(body).access_token;

        const headers = {
          'User-Agent': 'Notes-from-the-Underground',
          Authorization: `token ${accessToken}`,
        };
        const url = `https://graph.facebook.com/me?access_token=${accessToken}`;
        request(url, (err, res, body2) => {
          if (err) {
            return err;
          }
          const parsedBody = JSON.parse(body2);
          const userDetails = {};
          userDetails.username = parsedBody.name;
          const userId = parsedBody.id;

          const imageUrl = `https://graph.facebook.com/${userId}?fields=picture.type(large)&access_token=${accessToken}`;
          request(imageUrl, (err2, res2, body3) => {
            if (err2) {
              return err2;
            }
            const parsed = JSON.parse(body3);
            userDetails.avatar_url = parsed.picture.data.url;
            post.fbUser(userDetails, (err3) => {
              if (err3) {
                return err;
              }
            });
            req.cookieAuth.set({ accessToken, username: userDetails.username, avatar_url: userDetails.avatar_url });
            reply.redirect('/');
          });
        });
      });
    },
  },
};
