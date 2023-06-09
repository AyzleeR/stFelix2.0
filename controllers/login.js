import pool from "../config/database.js";
import bcrypt from 'bcrypt';

export const LoginController = function (req, res) {
    pool.query("SELECT * FROM Info", (error, infosResult) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur de base de données");
          return;
        }
        res.render('layout', { template: 'login_form', info: infosResult  });
      });
}

export const LoginSubmit = function (req, res) {
    const { email, password } = req.body;
    
    pool.query('SELECT * from User WHERE email = ?', [email], function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            if (result.length < 1) {
                res.redirect('/login');
            } else {
                bcrypt.compare(password, result[0].password, function(error, isAllowed) {
                    if (isAllowed) {
                        req.session.role = result[0].role;
                        req.session.user = {email:result[0].email}
                        res.redirect('/admin');
                    } else {
                        res.redirect('/login');
                    }
                })
            }

        }
    });
}

export const Logout = function (req, res) {
    req.session.destroy(function (error){
        if(error) {
            console.log(error);
        }else{
            res.redirect('/')
        }
        
    })
}