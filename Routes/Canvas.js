const router = require('express').Router();
const canvas = require('canvas');
const path = require('path');
const jimp = require('jimp');


/**
 * @swagger
 * /canvas/gay:
 *   get:
 *     description: Make a image gay
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/gay', async (req, res) => {
    
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });


    let toLayer;
    try{
        toLayer = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };
    
    const gay = await canvas.loadImage(path.join(__dirname + '../../Assets', 'gay.png'));
    
    const Canvas = canvas.createCanvas(toLayer.width, toLayer.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(toLayer, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(gay, 0, 0, Canvas.width, Canvas.height);

    res.set({'Content-Type': 'image/png'});
    res.status(200).send(Canvas.toBuffer());
});


/**
 * @swagger
 * /canvas/greyscale:
 *   get:
 *     description: Add a greyscale filter to a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/greyscale', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.greyscale();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


/**
 * @swagger
 * /canvas/invert:
 *   get:
 *     description: Add a invert filter to a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/invert', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.invert();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


/**
 * @swagger
 * /canvas/sepia:
 *   get:
 *     description: Add a sepia filter to a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/sepia', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.sepia();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


/**
 * @swagger
 * /canvas/resize:
 *   get:
 *     description: Resize a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: x
 *         description: The new width of the image
 *         in: query
 *         required: true
 *         type: string
 *       - name: y
 *         description: The new height of the image
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/resize', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let x = req.urlParams.x;
    let y = req.urlParams.y;

    if(!x && !y) return res.json({
        error: true,
        message: 'Missing both x and y params, Please give atleast one.'
    });

    if(y) {
        y = parseInt(y);
        if(!y) return res.status(400).json({
            error: true,
            message: 'Param y is not a number.'
        });
        if(y > 2000) return res.status(400).json({
            error: true,
            message: 'Param y can not be larger then 2000'
        });
    };
    if(x) {
        x = parseInt(x);
        if(!x) return res.status(400).json({
            error: true,
            message: 'Param x is not a number.'
        });
        if(x > 2000) return res.status(400).json({
            error: true,
            message: 'Param x can not be larger then 2000'
        });
    };

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.resize(x || jimp.AUTO, y || jimp.AUTO);
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


module.exports = {
    end: '/canvas/',
    router,
};