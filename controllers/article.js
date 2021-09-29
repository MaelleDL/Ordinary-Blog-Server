const Article = require('../models/Article');
const fs = require('fs');

exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.article);
  console.log(articleObject);
  const article = new Article({
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  article.save()
    .then(() => res.status(201).json({ message: 'Article enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error: error }));
};

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
    {
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
  Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      const filename = article.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Article supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => resizeTo.status(500).json({ error }));
};

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => res.status(200).json(articles))
    .catch(error=> res.status(400).json({ error: error }));
};