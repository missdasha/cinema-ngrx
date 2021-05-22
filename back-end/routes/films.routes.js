const { Router } = require('express');
const router = Router();
const Film = require('../models/Film');
const OperationalError = require('../helpers/OperationalError');
const { formQuery } = require('../helpers/routeHelpers');
const { 
  FILMS_IS_ADDED_MESSAGE,
  FILM_IS_NOT_FOUND_MESSAGE, 
  DUPLICATED_FILM_TITLE_MESSAGE, 
  DUPLICATED_FILM_IMAGE_MESSAGE
} = require('../config/constants');

router.post('/new', async (req, res, next) => {
  try {
    const { title, imageSrc } = req.body;
    
    const filmWithDuplicatedTitle = await Film.findOne({ title });
    if (filmWithDuplicatedTitle) {
      return next(new OperationalError(DUPLICATED_FILM_TITLE_MESSAGE, 403));
    }
    const filmWithDuplicatedImage = await Film.findOne({ imageSrc });
    if (filmWithDuplicatedImage) {
      return next(new OperationalError(DUPLICATED_FILM_IMAGE_MESSAGE, 403));
    }

    const newFilm = new Film(req.body);
    const film = await newFilm.save();
    res.status(201).json({ message: FILMS_IS_ADDED_MESSAGE, data: film });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const query = formQuery(req.query);
    const films = await Film
                        .find({ endDate: { $gt: Date.now() / 1000 } })
                        .select(query)
                        .populate({
                          path: 'seances',
                          populate: { path: 'cinema' }
                        })
    return res.status(200).json(films);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/newest', async (req, res, next) => {
  try {
    const films = await Film
                        .find({ endDate: { $gt: Date.now() / 1000 } })
                        .sort('-startDate')
                        .limit(2)
                        .populate('seances')
                        .select('title genres age imageSrc');
    return res.status(200).json(films);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:filmId', async (req, res, next) => {
  try {
    const query = formQuery(req.query);
    const film = await Film
                        .findById(req.params.filmId)
                        .select(query)
                        .populate({
                          path: 'seances',
                          populate: { path: 'cinema', select: 'city name -_id' }
                        });                    
    if (film) {
      return res.status(200).json(film);
    }
    next(new OperationalError(FILM_IS_NOT_FOUND_MESSAGE, 404));
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
