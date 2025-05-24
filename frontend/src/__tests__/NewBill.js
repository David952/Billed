/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

import { ROUTES } from "../constants/routes.js"
import mockStore from "../__mocks__/store.js"

import { localStorageMock } from "../__mocks__/localStorage.js"
jest.mock("../app/store", () => mockStore)

let newBillInstance 
let onNavigate

describe("Given I am connected as an employee", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(mockStore, "bills").mockImplementation(() => ({
      list: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({})
    }))
    onNavigate = (pathName) => {
      document.body.innerHTML = ROUTES({pathName})
    }
    Object.defineProperty(window, "localStorage", {value: localStorageMock})
    window.localStorage.setItem("user", JSON.stringify({
      type: "Employee",
      email: "test@test.com"
    }))
    const setupNewBillInstance = () => new NewBill({document, onNavigate, store: mockStore, localStorage})
    document.body.innerHTML = NewBillUI()
    newBillInstance = setupNewBillInstance()
    
  })
  describe("When I am on NewBill Page and I upload a file", () => {
    let fileInput
    let handleChangeFile
    beforeEach(() => {
      fileInput = screen.getByTestId("file")
      handleChangeFile = jest.spyOn(newBillInstance, "handleChangeFile")
      fileInput.addEventListener("change", handleChangeFile)
    })
    const simulateFileUpload = (file) => {
      fireEvent.change(fileInput, {target: {files: file ? [file] : []}})
    }
    test("Then it should accept png, jpeg and jpg files", async () => {
      const file = new File(["test"], "test.jpg", {type: "image/jpg"})
      simulateFileUpload(file)
      expect(handleChangeFile).toHaveBeenCalled()
      await waitFor(() => expect(fileInput.files[0]).toBe(file))
    })
    test("Then it should reject unsupported file type", () => {
      window.alert = jest.fn()
      const file = new File(["test"], "test.pdf", {type: "application/pdf"})
      simulateFileUpload(file)
      expect(handleChangeFile).toHaveBeenCalled()
      expect(window.alert).toHaveBeenCalledWith("Le fichier téléchargé n'est pas une image. Veuillez télécharger un fichier au format jpg, jpeg ou png.")
    })
  })
  describe("When I am on NewBills Page and I submit the form", () => {
    let form
    let handleSubmit;

    beforeEach(() => {
      form = screen.getByTestId("form-new-bill");
      handleSubmit = jest.spyOn(newBillInstance, "handleSubmit");
      form.addEventListener("submit", handleSubmit);
    });
    
    test("Then it should call the handleSubmit method", () => {
      fireEvent.submit(form);

      expect(handleSubmit).toHaveBeenCalled();
    });
});
})
