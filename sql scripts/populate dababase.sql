DELETE FROM artists;
INSERT INTO artists VALUES 
(default, "Tiesto", "Tijs Michiel", "Verwest", null),
(default, "Armin", "Armin", "Buuren", null),
(default, "Martin Garrix", "Martijn Gerard", "Garritsen", null),
(default, "David Guetta", "David", "Guetta", null),
(default, "Sam Martin", "Sam", "Martin", null);

DELETE FROM genres;
INSERT INTO genres VALUES 
(default, "Techno"),
(default, "Pop"),
(default, "Rap"),
(default, "House"),
(default, "Electro house");

DELETE FROM tickets;
DELETE FROM shows;
INSERT INTO shows VALUES
(default, 1, 2, "One last night in Berlin", '2019-08-1 15:00:00', 20000),
(default, 4, 4, "Rise Festival", '2019-08-1 18:00:00', 15000),
(default, 2, 5, "In the Clouds", '2019-08-2 14:00:00', 18500),
(default, 3, 1, "Music and Madness", '2019-08-2 17:00:00', 16300),
(default, 4, 4, "The Promised Land", '2019-08-2 22:00:00', 20000);

INSERT INTO tickets VALUES
(default, 1, 3),
(default, 1, 5),
(default, 1, 1),
(default, 1, 7),
(default, 1, 2),
(default, 1, 4),

(default, 2, 2),
(default, 2, 6),
(default, 2, 5),
(default, 2, 7),
(default, 2, 3),
(default, 2, 1),

(default, 3, 2),
(default, 3, 2),
(default, 3, 4),
(default, 3, 5),
(default, 3, 7),
(default, 3, 6),

(default, 4, 4),
(default, 4, 1),
(default, 4, 1),
(default, 4, 1),
(default, 4, 3),
(default, 4, 2),

(default, 5, 3),
(default, 5, 2),
(default, 5, 2),
(default, 5, 1),
(default, 5, 1),
(default, 5, 7);