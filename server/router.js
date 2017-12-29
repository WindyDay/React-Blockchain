var connection = require('./connection');

const fetch = require('isomorphic-fetch')


module.exports = {
    configure: function (app) {

        //API
        app.get('/api/get', function (req, res) {
            //console.log(req.headers);
            Users.get(req.headers, res);
        });

        app.post('/api/post', function (req, res) {
            //console.log(req.headers.Email);
            Users.post(req.body, res);
        });

        // app.put('/api/put', function(req, res) {
        //     Users.put(req.body, res);
        // });

        // app.delete('/api/delete', function(req, res) {
        //     Users.delete(req.body.MSSV, res);
        // });
    }
};

var Users = {
    get: function (field_data, res) //Read
    {
        //console.log(field_data);
        console.log(field_data.email);
        connection.acquire(function (err, con) {
            con.query('select * from users where Email=?', [field_data.email], function (err, result) {
                con.release();
                console.log(result);
                res.send(result);
            });
        });
    },

    post: function (field_data, res) //Create 
    {
        try {
            connection.acquire(function (err, con) {
                con.query('insert into users set ?', field_data, function (err, result) {
                    //con.release();
                    if (err) {
                        res.status(400)
                        res.send({
                            status: 400,
                            message: 'USERS_MANAGER: Creation failed'
                        });
                    } else {
                        console.log('Created new user successfully!');
                        console.log('Creating wallet');
                        try {
                            //----------------------
                            fetch('https://api.kcoin.club/generate-address')
                                .then(function (response) {
                                    if (response.status >= 400) {
                                        console.log('Creating wallet failed due to https://api.kcoin.club/generate-address not working');
                                        throw new Error("Bad response from server");
                                    }
                                    return response.json();
                                })
                                .then(function (stories) {

                                    connection.acquire(function (err, con) {
                                        console.log('Connected to dbs');
                                        con.query('INSERT INTO wallets (UserID, privateKey, publicKey, address) VALUES ((select id from users where Email=?), ?, ?, ?)', [field_data.Email , stories.privateKey, stories.publicKey, stories.address], function (err, result) {
                                            con.release();
                                            if (err) {
                                                console.log('Creation failed');
                                                console.log(err);
                                                console.log(field_data);
                                                res.status(400)
                                                res.send({
                                                    status: 400,
                                                    message: 'USERS_MANAGER: Creation failed'
                                                });
                                            } else {
                                                console.log('Created user\'s wallet successfully!');

                                                res.status(201)
                                                res.send({
                                                    status: 201,
                                                    message: 'USERS_MANAGER: Created new user and wallet successfully'
                                                });
                                            }
                                        });
                                    });
                                });



                            //----------------------
                        } catch (err) {
                            console.log(err);
                        }

                        // res.status(201)
                        // res.send({
                        //     status: 201,
                        //     message: 'USERS_MANAGER: Created new user successfully'
                        // });
                    }
                });
            });
        } catch (err) {}

    }
}

// put: function(field_data, res) //update
// {
//     connection.acquire(function(err, con) {
//         con.query('update sinhvien set MSSV=?, HoTen=? where MSSV = ?', [field_data.MSSV, field_data.HoTen, field_data.oldID], function(err, result) {
//           con.release();
//           if (err) {
//             res.send({status: 1, message: 'STUDENT_MANAGER: update failed', field_data});
//           } else {
//             res.send({status: 0, message: 'STUDENT_MANAGER: updated successfully'});
//           }
//         });
//       });
// },