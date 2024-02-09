// when user initializes game, save name and start time to cookie
// and pass those details to database
// database will have session and user
//   user database will have id, username, password = null, array of sessions
//   session database will have id, user.id, start_time, and end_time (initializes at null until game completion)
//   character database will have id, name, posX, posY

// game start will take username, start_time and add to cookie
// cookie will pass to database and initialize:
//   user entry (if not exists)
//   session entry with user.id and start_time
