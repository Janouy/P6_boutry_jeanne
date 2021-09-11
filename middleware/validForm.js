//ce middleware ne permet pas l'envoi de données 'Sauce' avec que des espaces//
module.exports = (req, res, next) =>{
    try {
        const dataName = req.body.name.trim();
        const dataManu = req.body.manufacturer.trim();
        const dataDescr = req.body.description.trim();
        const dataPepper = req.body.mainPepper.trim();
        if (dataName == '' || dataManu =='' || dataDescr =='' || dataPepper == '') {
          throw 'Ce champ ne doit pas etre vide';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
}; 