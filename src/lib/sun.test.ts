import { describe, it, expect } from "vitest";
import { parseTimeFromISO, computeDaylight, computeNoon, parseSunData } from "./sun";

describe("parseTimeFromISO", () => {
  it("extracts time portion from ISO string", () => {
    expect(parseTimeFromISO("2024-06-15T05:23")).toBe("05:23");
  });

  it("returns fallback for string without T", () => {
    expect(parseTimeFromISO("2024-06-15")).toBe("—");
  });
});

describe("computeDaylight", () => {
  it("calculates exact hours and minutes", () => {
    expect(computeDaylight("06:00", "18:00")).toBe("12h 00m");
  });

  it("pads single-digit minutes", () => {
    expect(computeDaylight("05:23", "20:08")).toBe("14h 45m");
  });

  it("handles sub-hour daylight", () => {
    expect(computeDaylight("12:00", "12:45")).toBe("0h 45m");
  });

  it("handles long summer days", () => {
    expect(computeDaylight("02:55", "22:15")).toBe("19h 20m");
  });
});

describe("computeNoon", () => {
  it("returns midpoint of rise and set", () => {
    expect(computeNoon("06:00", "18:00")).toBe("12:00");
  });

  it("pads hours and minutes", () => {
    expect(computeNoon("05:30", "20:30")).toBe("13:00");
  });

  it("rounds to nearest minute", () => {
    // rise 06:01, set 18:00 → mid = (361 + 1080) / 2 = 720.5 → 721 min → 12:01
    expect(computeNoon("06:01", "18:00")).toBe("12:01");
  });
});

describe("parseSunData", () => {
  it("extracts and computes all fields", () => {
    const data = {
      daily: {
        time: ["2024-06-15"],
        sunrise: ["2024-06-15T05:23"],
        sunset: ["2024-06-15T21:08"],
      },
    };

    const result = parseSunData(data);

    expect(result.rise).toBe("05:23");
    expect(result.set).toBe("21:08");
    expect(result.length).toBe("15h 45m");
    expect(result.noon).toBe("13:16");
  });
});
