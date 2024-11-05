#!/bin/bash
#The relative file paths assumes you are executing the script from the base directory of the repository.

#If you are using an env variable to store your database url where you run this script you can delete this line
DATABASE_URL = "Your Database Url Goes Here"
#Make sure you do not version control your database url.

psql --dbname=${DATABASE_URL} -f ./db/sql/challenges_upsert.sql