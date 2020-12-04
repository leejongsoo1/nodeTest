var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var pathUtil = require('path');

var router = express.Router();

var uploadDir = 'C:\\Users\\lee55\\Desktop\\웹개발실무\\nodeTest\\project\\public\\uploads';


router.post('/uploadImg', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.keepExtenstion = true;
    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }

        var img = files.img_file;
        var ext = pathUtil.extname(img.name);
        var newFileName = req.user.nickName + ext;
        var newPath = uploadDir + pathUtil.sep + newFileName;

        fs.renameSync(img.path, newPath);

        res.statusCode = 302;
        res.setHeader('Location', '../users/mypage');
        res.end();
    });
});


module.exports = router;