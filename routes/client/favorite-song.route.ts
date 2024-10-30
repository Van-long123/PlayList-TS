import express, {Router} from 'express';
import * as controller from '../../controllers/client/favorite-song.controller'
const router:Router=Router(); //c2 
router.get('/',controller.index)

export const favoriteSongRoutes:Router = router