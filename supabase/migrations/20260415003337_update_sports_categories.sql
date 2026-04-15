/*
  # Update Sports Categories

  ## Summary
  Replaces existing sports categories with the 10 required sports for the African Sports Mini Games.

  ## Changes
  - Deactivates all existing sports categories
  - Inserts 10 new sports: Martial Arts, Chess, Skating, Ballet, Modern Dance,
    Football, Swimming, Rugby, Gymnastics, and Archery

  ## Sports Added
  - Martial Arts (icon: shield)
  - Chess (icon: brain)
  - Skating (icon: circle)
  - Ballet (icon: music)
  - Modern Dance (icon: music2)
  - Football (icon: goal)
  - Swimming (icon: waves)
  - Rugby (icon: trophy)
  - Gymnastics (icon: star)
  - Archery (icon: target)
*/

UPDATE sports_categories SET is_active = false;

INSERT INTO sports_categories (name, description, icon, min_age, max_age, registration_fee, is_active)
VALUES
  ('Martial Arts', 'Develop discipline, focus, and self-defence skills through structured martial arts training and competition.', 'shield', 6, 18, 500.00, true),
  ('Chess', 'Sharpen your mind through strategic board game competition across rapid and classical formats.', 'brain', 6, 18, 300.00, true),
  ('Skating', 'Showcase speed and artistry in roller skating competitions across multiple performance categories.', 'circle', 7, 18, 450.00, true),
  ('Ballet', 'Express grace and precision through classical ballet performances and choreographed routines.', 'music', 6, 18, 400.00, true),
  ('Modern Dance', 'Explore creativity and movement in contemporary and modern dance showcase competitions.', 'music2', 7, 18, 400.00, true),
  ('Football', 'Compete in exciting 5-a-side and 7-a-side football tournaments across all age categories.', 'goal', 8, 18, 600.00, true),
  ('Swimming', 'Race through the water in freestyle, backstroke, breaststroke, and butterfly disciplines.', 'waves', 6, 18, 500.00, true),
  ('Rugby', 'Build teamwork and strength competing in fast-paced tag and contact rugby tournaments.', 'trophy', 10, 18, 550.00, true),
  ('Gymnastics', 'Demonstrate strength, flexibility, and balance across floor, beam, and vault events.', 'star', 5, 18, 500.00, true),
  ('Archery', 'Test precision and focus as you aim for the bullseye in recurve and compound bow events.', 'target', 8, 18, 450.00, true)
ON CONFLICT DO NOTHING;
