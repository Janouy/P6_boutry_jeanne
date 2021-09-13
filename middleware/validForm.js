//ce middleware ne permet pas l'envoi de données 'Sauce' avec que des espaces//
module.exports = (req, res, next) =>{
    try {
        const body = (req.body.name)? req.body : JSON.parse(req.body.sauce);
        const dataName =body.name.trim();
        const dataManu = body.manufacturer.trim();
        const dataDescr = body.description.trim();
        const dataPepper = body.mainPepper.trim();
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