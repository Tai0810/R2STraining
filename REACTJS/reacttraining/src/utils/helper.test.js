import { formatCurrency, formatPhoneNumber, getTodo } from "./helper";

describe("Test formatCurrency", () => {
  test("should return 0 if input is 0", () => {
    expect(formatCurrency(0)).toBe("0");
  });

  test("should return 1,000 if input is 1000", () => {
    expect(formatCurrency(1000)).toBe("1,000");
  });

  test("should return 1,010 if input is 1010", () => {
    expect(formatCurrency(1010)).toBe("1,010");
  });

  test("should return 1,010,000 if input is 1010000", () => {
    expect(formatCurrency(1010000)).toBe("1,010,000");
  });

  test("should return 110,003 if input is 110003", () => {
    expect(formatCurrency(110003)).toBe("110,003");
  });
});

describe("Test formatPhoneNumber", () => {
  test("should return (+84) 123 333 234 if input is +84123333234", () => {
    expect(formatPhoneNumber("+84123333234")).toBe("(+84) 123 333 234");
  });

  test("should return (+65) 8344 1234 if input is +6583441234", () => {
    expect(formatPhoneNumber("+6583441234")).toBe("(+65) 8344 1234");
  });

  test("should return (+1) 834 123 1234 if input is +18341231234", () => {
    expect(formatPhoneNumber("+18341231234")).toBe("(+1) 834 123 1234");
  });

  test("should return (+353) 834 123 1234 if input is +3538341231234", () => {
    expect(formatPhoneNumber("+3538341231234")).toBe("(+353) 834 123 1234");
  });

  test("should return (+353) 834 12 if input is +35383412", () => {
    expect(formatPhoneNumber("+35383412")).toBe("(+353) 834 12");
  });
});

describe("Test getTodo", () => {
  const todoList = [
    {
      id: 1,
      value: "Value 1",
    },
    {
      id: 2,
      value: "Value 2",
    },
    {
      id: 3,
      value: "Value 3",
    },
  ];
  test("should return 2nd todo in the list", () => {
    const expectedData = {
      id: 3,
      value: "Value 3",
    };
    expect(getTodo(todoList, 2)).toEqual(expectedData);
  });
  test("should return null if index is empty or negative", () => {
    expect(getTodo(todoList)).toBeNull();
    expect(getTodo(todoList, -1)).toBeNull();
  });
  test("should return undifined if index index does not exist in the list", () => {
    expect(getTodo(todoList, 5)).toBeUndefined();
  });
});

