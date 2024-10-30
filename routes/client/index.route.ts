import {topicRoutes} from './topic.route'
import {songRoutes} from './song.route'
import {searchRoutes} from './search.route'
import {favoriteSongRoutes} from './favorite-song.route'
import {Express} from "express"

const clientRoutes=(app :Express) :void=>{
    app.use('/topics',topicRoutes)
    app.use('/songs',songRoutes)
    app.use('/favorite-songs',favoriteSongRoutes)
    app.use('/search',searchRoutes)
}
export default clientRoutes   