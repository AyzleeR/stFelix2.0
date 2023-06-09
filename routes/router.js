import express from "express";

const router = express.Router();

//appel des controllers

import { IndexController } from "../controllers/index.js";
import { ServeController } from "../controllers/serve.js";
import { TeamController } from "../controllers/team.js";
import { GalleryController } from "../controllers/gallery.js";
import { ContactController } from "../controllers/contact.js";
import { LoginController, LoginSubmit, Logout } from "../controllers/login.js";
import { AdminController, NewAdmin, AddNewAdmin, UpdateAdmin ,DeleteAdmin,UpdateCarrouselPicture, UpdateIndexText, AddBrand, DeleteBrand, AddCategory, AddBenefit,
     DeleteCategory, DeleteBenefit, UpdateCategory, UpdateBenefit, AddPictureInGallery, DeletePictureInGallery, UpdateInfos, UpdateSchedule ,AddNewSchedule,
      DeleteSchedule } from "../controllers/admin.js"

// Middleware qui bloque les routes si on est pas connecté
const adminCheckMiddleware = (roles) => (req, res, next) => {
    if (roles.includes(req.session.role)) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Affiche la page d'accueil
router.get('/', IndexController);

// Affiche la page des services et prix
router.get('/serve', ServeController);

// Affiche la page des services et prix
router.get('/team', TeamController);

// Affiche la page des services et prix
router.get('/galerie',  GalleryController);

// Affiche la page des services et prix
router.get('/contact', ContactController);

//affiche la formulaire de login
router.get('/login', LoginController);

//s'identifier a l'aide du  formulaire
router.post('/login', LoginSubmit);

//ce déconnecter
router.get('/logout', Logout);

//Affiche la page admin
router.get('/admin', adminCheckMiddleware(['main', 'second']) ,AdminController)
// router.get('/admin' ,AdminController);

//Affiche la page pour ajouter un nouvel admin
router.get('/addnewadmin',adminCheckMiddleware(['main']),NewAdmin)
// router.get('/addnewadmin',NewAdmin);

//Ajout d'un nouvel administrateur a l'aide du formulaire
router.post('/addnewadmin',  adminCheckMiddleware(['main']) ,AddNewAdmin);
// router.post('/addnewadmin',AddNewAdmin);

//Modification d'un admin
router.post('/updateadmin',adminCheckMiddleware(['main']) ,UpdateAdmin);
// router.post('/updateadmin',UpdateAdmin);

//Suppression d'un admin secondaire
router.delete('/admin/:id',  adminCheckMiddleware(['main']) ,DeleteAdmin);
// router.delete('/admin/:id' ,DeleteAdmin);

//Update des photos dans le carrousel via un formulaire
// router.post('/addcarrouselpicture', UpdateCarrouselPicture);
router.post('/addcarrouselpicture',adminCheckMiddleware(['main']) , UpdateCarrouselPicture);

//Update du text dans l'accueil
router.post('/updateindextext',  adminCheckMiddleware(['main']) ,UpdateIndexText);
// router.post('/updateindextext',UpdateIndexText);

//Ajout d'une marque dans la page d'accueil
router.post('/addbrand',  adminCheckMiddleware(['main']) ,AddBrand);
// router.post('/addbrand',AddBrand);

//Suppression d'une marque
router.delete('/brand/:id',  adminCheckMiddleware(['main']) ,DeleteBrand);
// router.delete('/brand/:id',DeleteBrand);

//Ajout d'une catégorie dans la page prestation
router.post('/addcategory',  adminCheckMiddleware(['main']) ,AddCategory);
// router.post('/addcategory',AddCategory);

//Ajout d'une prestation et d'un prix liés à une catégorie
router.post('/addbenefit',  adminCheckMiddleware(['main']) ,AddBenefit);
// router.post('/addbenefit',AddBenefit);

//Modification d'un catégorie dans la page prestation
// router.post('/updatecategory',UpdateCategory);
router.post('/updatecategory',  adminCheckMiddleware(['main']) ,UpdateCategory);

// Modification d'une prestation
router.post('/updatebenefit',  adminCheckMiddleware(['main']) ,UpdateBenefit);
// router.post('/updatebenefit' ,UpdateBenefit);

//Suppression d'une catégorie de prestation
router.delete('/category/:id', adminCheckMiddleware(['main']) , DeleteCategory);
// router.delete('/category/:id', DeleteCategory);

//Suppression d'une prestation
router.delete('/benefit/:id', adminCheckMiddleware(['main']) , DeleteBenefit);
// router.delete('/benefit/:id',  DeleteBenefit);

//Ajout d'une photo dans la galerie
router.post('/addpictureingallery',  adminCheckMiddleware(['main', 'second']) ,AddPictureInGallery);
// router.post('/addpictureingallery',  AddPictureInGallery);

//Suppression d'une photo dans la galerie
router.delete('/picture/:id', adminCheckMiddleware(['main', 'second']) , DeletePictureInGallery);
// router.delete('/picture/:id',  DeletePictureInGallery);

//Modification des informations diverses
router.post('/updateinfos', adminCheckMiddleware(['main', 'second']) , UpdateInfos)
// router.post('/updateinfos',  UpdateInfos)

//Modification d'un horaire
// router.post('/updateschedule', UpdateSchedule)
router.post('/updateschedule',adminCheckMiddleware(['main', 'second']) ,UpdateSchedule)

//Ajout d'un nouvel horaire
router.post('/addnewschedule', adminCheckMiddleware(['main']) , AddNewSchedule)
// router.post('/addnewschedule',  AddNewSchedule)

//Suppression d'un horaire
router.delete('/schedule/:id', adminCheckMiddleware(['main']) , DeleteSchedule);
// router.delete('/schedule/:id',  DeleteSchedule);

export default router;