const express = require('express');
const router = express.Router();
const gamesController = require('../app/controllers/GamesController');

//[GET] /courses/:slug
router.post('/handle-form-actions',gamesController.handleFormActions)
router.post('/handle-trash-form-actions',gamesController.handleTrashFormActions)
router.get('/create',gamesController.create);//route tạo mới
router.get('/:id/edit',gamesController.edit);//route get edit
/* router.get('/:id/restore',gamesController.restore); */
router.post('/store',gamesController.store);//route lưu trữ
router.patch('/:id/restore',gamesController.restore);//route khôi phục
router.delete('/:id/destroy',gamesController.destroy);//route xoá vĩnh viễn
router.put('/:id',gamesController.update);//route cạp nhật
router.delete('/:id',gamesController.delete);//route xoá mềm
router.get('/:slug',gamesController.show)

module.exports = router;

