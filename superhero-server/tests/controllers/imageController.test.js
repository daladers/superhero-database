const imageController = require('../../controllers/imageController');
const Superhero = require('../../models/superhero');

jest.mock('../../models/superhero');

describe('Image Controller', () => {

  test('should upload images for a superhero', async () => {
    const req = { params: { id: '123' }, files: [{ filename: '1.png' }, { filename: '2.png' }] };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockSuperhero = { images: [], save: jest.fn().mockResolvedValue(true) };

    Superhero.findById = jest.fn().mockResolvedValue(mockSuperhero);

    await imageController.uploadImages(req, res);

    expect(Superhero.findById).toHaveBeenCalledWith('123');
    expect(mockSuperhero.images).toContain('/uploads/1.png');
    expect(res.json).toHaveBeenCalledWith(mockSuperhero);
  });

  test('should remove a specific image from a superhero', async () => {
    const req = { params: { id: '123' }, body: { imageUrl: '/uploads/1.png' } };
    const res = { json: jest.fn() };
    const mockSuperhero = { images: ['/uploads/1.png'], save: jest.fn() };

    Superhero.findById = jest.fn().mockResolvedValue(mockSuperhero);
    jest.spyOn(require('../../utils/fileUtils'), 'deleteFiles').mockImplementation(jest.fn());

    await imageController.removeImage(req, res);

    expect(mockSuperhero.images).not.toContain('/uploads/1.png');
    expect(res.json).toHaveBeenCalledWith(mockSuperhero);
  });
});
