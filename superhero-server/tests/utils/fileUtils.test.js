const fs = require("fs");
const path = require("path");
const { deleteFiles } = require("../../utils/fileUtils");

jest.mock("fs");

describe("File Utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should delete files from filesystem", () => {
    const imageUrls = ["uploads/1.png", "uploads/2.png"];
    deleteFiles(imageUrls);
    imageUrls.forEach((url) => {
      const imagePath = path.join(__dirname, "../..", url);
      expect(fs.unlink).toHaveBeenCalledWith(imagePath, expect.any(Function));
    });
  });
});
