/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import "@testing-library/jest-dom";
import Bills from "../containers/Bills.js";
import mockStore from "../__mocks__/store.js";
import router from "../app/Router.js";

jest.mock("../app/store", () => mockStore);

describe("Given I am connected as an employee", () => {
	describe("When I am on Bills Page", () => {
		test("Then bill icon in vertical layout should be highlighted", async () => {
			Object.defineProperty(window, "localStorage", { value: localStorageMock });
			window.localStorage.setItem(
				"user",
				JSON.stringify({
					type: "Employee",
				})
			);
			const root = document.createElement("div");
			root.setAttribute("id", "root");
			document.body.append(root);
			router();
			window.onNavigate(ROUTES_PATH.Bills);
			await waitFor(() => screen.getByTestId("icon-window"));
			const windowIcon = screen.getByTestId("icon-window");
			//to-do write expect expression
			expect(windowIcon).toHaveClass("active-icon");
		});
		test("Then bills should be ordered from earliest to latest", () => {
			document.body.innerHTML = BillsUI({ data: bills });
			const dates = screen
				.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i)
				.map((a) => a.innerHTML);
			const antiChrono = (a, b) => (a < b ? 1 : -1);
			const datesSorted = [...dates].sort(antiChrono);
			expect(dates).toEqual(datesSorted);
		});
	});
	describe("When error occurs an API", () => {
		beforeEach(() => {
			jest.spyOn(mockStore, "bills");
			Object.defineProperty(window, "localStorage", { value: localStorageMock });
			window.localStorage.setItem(
				"user",
				JSON.stringify({
					type: "Employee",
					email: "employee@example.com",
				})
			);
			document.body.innerHTML = '<div id="root"></div>';
			router();
		});
		test("Should fetch bills from an API and fails with 404 message error", async () => {
			mockStore.bills.mockImplementationOnce(() => {
				return {
					list: () => Promise.reject(new Error("Erreur 404")),
				};
			});
			window.onNavigate(ROUTES_PATH.Bills);
			await new Promise(process.nextTick);
			const message = await screen.getByText(/Erreur 404/);
			expect(message).toBeTruthy();
		});
		test("Should fetch bills from an API fails with 500 message error", async () => {
			mockStore.bills.mockImplementationOnce(() => {
				return {
					list: () => Promise.reject(new Error("Erreur 500")),
				};
			});
			window.onNavigate(ROUTES_PATH.Bills);
			await new Promise(process.nextTick);
			const message = await screen.getByText(/Erreur 500/);
			expect(message).toBeTruthy();
		});
	});
	describe("When I click on the icon", () => {
		test("Should call the handleClickIconEye function", () => {
			document.body.innerHTML = `
				<div data-testId="icon-eye"></div>
			`;
			const onNavigate = jest.fn();
			const billsInstance = new Bills({
				document,
				onNavigate,
				store: null,
				localStorage: window.localStorage,
			});
			billsInstance.handleClickIconEye = jest.fn();
			const icon = document.querySelector(`[data-testId="icon-eye"]`);
			icon.addEventListener("click", () => {
				billsInstance.handleClickIconEye(icon);
			});
			icon.click();
			expect(billsInstance.handleClickIconEye).toHaveBeenCalledWith(icon);
		});
	});
	describe("When I click on the bottom to create a new bill", () => {
		test("Shoud calls the onNavigate function with the new bill route", () => {
			const onNavigate = jest.fn();
			const document = {
				querySelector: jest.fn(),
				querySelectorAll: jest.fn(),
			};
			const localStorage = window.localStorage;
			const store = null;
			const bills = new Bills({
				document,
				onNavigate,
				localStorage,
				store,
			});
			bills.handleClickNewBill();
			expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH["NewBill"]);
		});
	});
	describe("When I am on the bill page and I click on the eye icon", () => {
		test("Should open the modal", () => {
			const document = {
				querySelector: jest.fn().mockReturnValue({
					getAttribute: jest.fn(),
					addEventListener: jest.fn(),
				}),
				querySelectorAll: jest.fn().mockReturnValue([
					{
						click: jest.fn(),
						getAttribute: jest.fn(),
						addEventListener: jest.fn(),
					},
				]),
			};
			const onNavigate = jest.fn();
			const localStorage = window.localStorage;
			const store = null;
			const bills = new Bills({
				document,
				onNavigate,
				localStorage,
				store,
			});
			const handleClickIconEye = jest.spyOn(bills, "handleClickIconEye");
			const iconEye = document.querySelector(`div[data-testId="icon-eye"]`);
			const modalMock = jest.fn();
			$.fn.modal = modalMock;
			bills.handleClickIconEye(iconEye);
			expect(handleClickIconEye).toHaveBeenCalled();
			expect(modalMock).toHaveBeenCalled();
		});
	});
});
