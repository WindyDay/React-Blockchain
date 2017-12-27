var connection = require('./connection');

module.exports = {
    configure: function(app) {
        
        //API
        app.get('/api/get', function(req, res) {
            console.log('/api/get');
            Users.get(res);
        });

        app.post('/api/post', function(req, res) {
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
    get: function(res) //Read
    {
        connection.acquire(function(err, con) {
            con.query('select * from users', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    },

    post: function(field_data, res)//Create 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into users set ?', field_data, function(err, result) 
            {
                con.release();
                if (err) {
                    res.status(400)
                    res.send({status: 400, message: 'USERS_MANAGER: Creation failed'});
                } else {
                    res.status(201)
                    res.send({status: 201, message: 'USERS_MANAGER: Created new user successfully'});
                }
            });
        });
    },

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

}