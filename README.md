# Deno - REST API
This is an example of how to implement standard REST API with Deno and Oak

# Generate .env file
This project uses MongoDB for storing the data, so in order to use it you will need to create a db. You can do it here: https://cloud.mongodb.com

After db is created you will need to add **.env** file to the projects root. The variables you will need to populate are:
```
DB_CLUSTER=
DB_USER=
DB_PASSWORD=
```
all of those can be found under you db preferences at the place where you've created it.

# Live reload
If you want to use live reload feature - install **denon** with: 

`deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.3.2/denon.ts`


# Run the project 

`denon start` or `deno app.ts`
