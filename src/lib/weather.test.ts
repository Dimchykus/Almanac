import { describe, it, expect } from "vitest";
import {
  formatCoord,
  degreesToCompass,
  weatherCodeToDesc,
  uvToLabel,
  parseWeatherData,
  type OpenMeteoEra5Response,
} from "./weather";

describe("formatCoord", () => {
  it("formats NE quadrant", () => {
    expect(formatCoord(51.5, 0.12)).toBe("51.50°N · 0.12°E");
  });

  it("formats SW quadrant", () => {
    expect(formatCoord(-33.87, -70.65)).toBe("33.87°S · 70.65°W");
  });

  it("formats zero coordinates", () => {
    expect(formatCoord(0, 0)).toBe("0.00°N · 0.00°E");
  });
});

describe("degreesToCompass", () => {
  it("returns N for 0°", () => expect(degreesToCompass(0)).toBe("N"));
  it("returns N for 360°", () => expect(degreesToCompass(360)).toBe("N"));
  it("returns E for 90°", () => expect(degreesToCompass(90)).toBe("E"));
  it("returns S for 180°", () => expect(degreesToCompass(180)).toBe("S"));
  it("returns W for 270°", () => expect(degreesToCompass(270)).toBe("W"));
  it("returns NE for 45°", () => expect(degreesToCompass(45)).toBe("NE"));
  it("returns NNE for 22.5°", () => expect(degreesToCompass(22.5)).toBe("NNE"));
  it("returns SW for 225°", () => expect(degreesToCompass(225)).toBe("SW"));
});

describe("weatherCodeToDesc", () => {
  it("returns Clear sky for 0", () => expect(weatherCodeToDesc(0)).toBe("Clear sky"));
  it("returns Partly cloudy for 2", () => expect(weatherCodeToDesc(2)).toBe("Partly cloudy"));
  it("returns Slight rain for 61", () => expect(weatherCodeToDesc(61)).toBe("Slight rain"));
  it("returns Thunderstorm for 95", () => expect(weatherCodeToDesc(95)).toBe("Thunderstorm"));
  it("returns Variable for unknown code", () => expect(weatherCodeToDesc(999)).toBe("Variable"));
  it("returns Fog for 45", () => expect(weatherCodeToDesc(45)).toBe("Fog"));
  it("returns Snow for 71", () => expect(weatherCodeToDesc(71)).toBe("Snow"));
});

describe("uvToLabel", () => {
  it("Low for 0", () => expect(uvToLabel(0)).toBe("Low"));
  it("Low for 2", () => expect(uvToLabel(2)).toBe("Low"));
  it("Moderate for 3", () => expect(uvToLabel(3)).toBe("Moderate"));
  it("Moderate for 5", () => expect(uvToLabel(5)).toBe("Moderate"));
  it("High for 6", () => expect(uvToLabel(6)).toBe("High"));
  it("Very High for 8", () => expect(uvToLabel(8)).toBe("Very High"));
  it("Extreme for 11", () => expect(uvToLabel(11)).toBe("Extreme"));
});

describe("parseWeatherData", () => {
  const makeData = (overrides: Partial<OpenMeteoEra5Response> = {}): OpenMeteoEra5Response => ({
    daily: {
      time: ["2024-06-15"],
      temperature_2m_max: [28.4],
      temperature_2m_min: [14.1],
      wind_speed_10m_max: [22.7],
      wind_direction_10m_dominant: [270],
      weather_code: [1],
      ...overrides.daily,
    },
    hourly: {
      time: Array.from({ length: 24 }, (_, i) => `2024-06-15T${String(i).padStart(2, "0")}:00`),
      temperature_2m: Array(24).fill(20),
      relative_humidity_2m: Array(24).fill(65),
      surface_pressure: Array(24).fill(1013.2),
      uv_index: Array(24).fill(3),
      ...overrides.hourly,
    },
  });

  it("rounds temperatures", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.hi).toBe(28);
    expect(result.lo).toBe(14);
    expect(result.now).toBe(20);
  });

  it("formats wind with direction and speed", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.wind).toBe("W 23 km/h");
  });

  it("formats humidity as percentage string", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.humidity).toBe("65%");
  });

  it("formats pressure with hPa unit", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.pressure).toBe("1013 hPa");
  });

  it("formats uv with label and value", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.uv).toBe("Moderate · 3");
  });

  it("passes through location and coord", () => {
    const result = parseWeatherData(makeData(), "Paris", "48.85°N · 2.35°E");
    expect(result.location).toBe("Paris");
    expect(result.coord).toBe("48.85°N · 2.35°E");
  });

  it("translates weather code to description", () => {
    const result = parseWeatherData(makeData(), "London", "51.50°N · 0.12°W");
    expect(result.desc).toBe("Mainly clear");
  });
});
