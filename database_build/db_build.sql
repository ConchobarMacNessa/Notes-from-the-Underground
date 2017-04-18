BEGIN;

DROP TABLE IF EXISTS users, articles CASCADE;

CREATE TABLE users (
  id            SERIAL        PRIMARY KEY,
  github_id     VARCHAR(20)   UNIQUE,
  username      VARCHAR(20)   UNIQUE,
  password      VARCHAR(64),
  avatar_url    VARCHAR(500)  NOT NULL
);

CREATE TABLE articles (
  id            SERIAL          PRIMARY KEY,
  author_id     INTEGER         REFERENCES users(id),
  title         VARCHAR(100)    NOT NULL,
  body_text     VARCHAR(20000)  NOT NULL
);

INSERT INTO user (username, github_id, display_name, password, avatar_url)
VALUES
('Wordsworth', NULL, daffodils, 'http://www.wellsedd.com/Images/WilliamWordsworth(PublicDomain).jpg');

INSERT INTO articles (author_id, title, body_text)
VALUES (1, 'Most Sweet It Is With Unuplifted Eyes', 'Most sweet it is with unuplifted eyes
To pace the ground, if path be there or none,
While a fair region round the traveller lies
Which he forbears again to look upon;
Pleased rather with some soft ideal scene,
The work of Fancy, or some happy tone
Of meditation, slipping in between
The beauty coming and the beauty gone.
If Thought and Love desert us from that day,
Let us break off all commerce with the Muse:
With Thought and Love companions of our way,
Whate’er the senses take or may refuse,
The Mind’s internal heaven shall shed her dews
Of inspiration on the humblest lay.');

COMMIT;
