DROP TABLE person, workout_category,exercise,favorite_exercise,exercise_category_link,workout,workout_exercise_link;
CREATE TABLE person(
    id          SERIAL          NOT NULL UNIQUE
    ,name       VARCHAR(200)    NOT NULL
    ,email      VARCHAR(200)    NOT NULL UNIQUE
    ,quote      TEXT
);

CREATE TABLE workout_category(
    id              SERIAL          NOT NULL UNIQUE
    ,name           VARCHAR(200)    NOT NULL
);
CREATE TABLE exercise(
    id              SERIAL          NOT NULL UNIQUE
    ,name           VARCHAR(200)    NOT NULL
    ,description    TEXT            
    ,category       INT             NOT NULL
    ,FOREIGN KEY (category)         REFERENCES workout_category(id)
);
CREATE TABLE favorite_exercise(
    id              SERIAL          NOT NULL UNIQUE
    ,exercise_id    INT             NOT NULL
    ,user_id        INT             NOT NULL
    ,FOREIGN KEY (exercise_id)      REFERENCES exercise(id)
    ,FOREIGN KEY (user_id)          REFERENCES person(id)
);
CREATE TABLE exercise_category_link(
    exercise_id     INT             NOT NULL UNIQUE
    ,category_id    INT             NOT NULL
    ,FOREIGN KEY (exercise_id)      REFERENCES exercise(id)
    ,FOREIGN KEY (category_id)      REFERENCES workout_category(id)
);
CREATE TABLE workout(
    id              SERIAL          NOT NULL UNIQUE
    ,name           VARCHAR(200)    NOT NULL
    ,description    TEXT            NOT NULL
);
CREATE TABLE workout_exercise_link(
    id              SERIAL          NOT NULL UNIQUE
    ,workout_id     INT             NOT NULL
    ,exercise_id    INT             NOT NULL
    ,FOREIGN KEY (exercise_id)      REFERENCES exercise(id)
    ,FOREIGN KEY (workout_id)       REFERENCES workout(id)
);

CREATE USER the_user WITH PASSWORD 'the_user';
GRANT SELECT, INSERT, UPDATE ON person, workout_category,exercise,favorite_exercise,exercise_category_link,workout,workout_exercise_link TO the_user;


