const superheroController = require("../../controllers/superheroController");
const Superhero = require("../../models/superhero");

jest.mock("../../models/superhero");

describe("Superhero Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new superhero", async () => {
    const req = {
      body: {
        nickname: "Ironman",
        real_name: "Tony Stark",
        origin_description: "Genius billionaire",
        superpowers: "Technology",
        catch_phrase: "I am Ironman",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Superhero.prototype.save = jest.fn().mockResolvedValue(req.body);

    await superheroController.createSuperhero(req, res);

    expect(Superhero.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test("should get a paginated list of superheroes", async () => {
    const req = { query: { page: "1", limit: "5" } };
    const res = { json: jest.fn() };
    const mockData = [{ nickname: "Ironman" }, { nickname: "Spiderman" }];

    Superhero.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockResolvedValue(mockData),
    });
    Superhero.countDocuments = jest.fn().mockResolvedValue(10);

    await superheroController.getSuperheroes(req, res);

    expect(res.json).toHaveBeenCalledWith({
      superheroes: mockData,
      totalPages: 2,
      currentPage: 1,
    });
  });

  test("should get a specific superhero by ID", async () => {
    const req = { params: { id: "123" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockSuperhero = { nickname: "Ironman", real_name: "Tony Stark" };

    Superhero.findById = jest.fn().mockResolvedValue(mockSuperhero);

    await superheroController.getSuperheroById(req, res);

    expect(Superhero.findById).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith(mockSuperhero);
  });

  test("should update a superhero", async () => {
    const req = { params: { id: "123" }, body: { nickname: "UpdatedName" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockUpdatedSuperhero = { nickname: "UpdatedName" };

    Superhero.findByIdAndUpdate = jest
      .fn()
      .mockResolvedValue(mockUpdatedSuperhero);

    await superheroController.updateSuperhero(req, res);

    expect(Superhero.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, {
      new: true,
    });
    expect(res.json).toHaveBeenCalledWith(mockUpdatedSuperhero);
  });

  test("should delete a superhero and associated images", async () => {
    const req = { params: { id: "123" } };
    const res = { json: jest.fn() };
    const mockSuperhero = { images: ["/uploads/1.png"] };

    Superhero.findByIdAndDelete = jest.fn().mockResolvedValue(mockSuperhero);
    const deleteFiles = jest
      .spyOn(require("../../utils/fileUtils"), "deleteFiles")
      .mockImplementation(jest.fn());

    await superheroController.deleteSuperhero(req, res);

    expect(Superhero.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(deleteFiles).toHaveBeenCalledWith(mockSuperhero.images);
    expect(res.json).toHaveBeenCalledWith({ message: "Superhero deleted" });
  });
});
