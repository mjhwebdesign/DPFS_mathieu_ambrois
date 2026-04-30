=========================================================================================

# EIKON - IMAGE MANIAC - EXPRESS.JS - LOCAL SETUP

=========================================================================================

## 1. IMPORT DATABASE

From the ROOT folder go to `DER-SQL` and import in this order:

1- structure.sql
2- data.sql

## 2. CONFIGUREDATABASE CONNECTION

Edit the `config.js` located in:

EIKON > database > config

Update the necessary information to connect your database to the Express.js app (username, password, etc.).

## 3. INSTALL DEPENDENCIES

Open a new terminal and navigate to the project folder (EIKON):

```bash
cd path/to/EIKON
npm install
```

## 4. RUN THE APP

From project Folder run:

```bash
npm start
```

Or if you have nodemon installed:

```bash
nodemon
```

EIKON app will run in http://localhost:3000/

## 5. USERS

You can either create a guest user at http://localhost:3000/login

Or use the following credentials:

> **Guest**:
> username: guest@guest.com
> password: Guest_78000

> **Admin**:
> username: admin@admin.com
> password: Admin_78000

The admin account allows access to:
http://localhost:3000/admin
(CRUD operations for products and users)

## 6. React Dashboard

For the React dashboard, see the README file in:

```bash
path/to/dashboard
```
