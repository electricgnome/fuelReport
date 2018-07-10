-- SELECT DISTINCT card_number, department, vehicle_id, driver FROM reports ORDER BY card_number

-- SELECT date, reports.card_number, reports.department, "firstName", "lastName", Vehicle_id, merchant, odometer, units, product, cost FROM reports INNER JOIN users ON reports.card_number = users.card_number WHERE date = '2018-06-18' ORDER BY date, card_number



-- SELECT card_number, count(*) FROM users GROUP BY card_number HAVING count(*) >1


-- 0302 - 1, 0666 - 1

-- SELECT date, reports.card_number, reports.department, "firstName", "lastName", Vehicle_id, merchant, odometer, units, product, cost 
-- FROM reports 
-- INNER JOIN users ON reports.card_number = users.card_number
-- INNER JOIN (select card_number, count(*) from reports where date = '2018-06-25' group by card_number having count(*) > 1) a on a.card_number = reports.card_number
-- WHERE date = '2018-06-25' 
-- ORDER BY date, card_number



-- SELECT users.card_number, users.id FROM reports INNER JOIN users ON users.card_number = reports.card_number order by reports.card_number

-- TRUNCATE TABLE logs