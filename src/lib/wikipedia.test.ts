import { describe, it, expect } from "vitest";
import { toEvent, toPerson } from "./wikipedia";

const makePage = (title: string) => ({ title, thumbnail: undefined });

describe("toEvent", () => {
  it("maps year, text, and computes ago relative to selectedYear", () => {
    const entry = { year: 1969, text: "Apollo 11 lands on the Moon.", pages: [makePage("Apollo_11")] };
    const result = toEvent(entry, 2024);

    expect(result.y).toBe("1969");
    expect(result.body).toBe("Apollo 11 lands on the Moon.");
    expect(result.ago).toBe("55 yrs");
    expect(result.wikiTitle).toBe("Apollo_11");
  });

  it("handles entry with no pages", () => {
    const entry = { year: 1776, text: "Declaration of Independence signed.", pages: [] };
    const result = toEvent(entry, 2024);

    expect(result.wikiTitle).toBeUndefined();
    expect(result.ago).toBe("248 yrs");
  });
});

describe("toPerson", () => {
  it("splits name and role at first comma", () => {
    const entry = {
      year: 1889,
      text: "Charlie Chaplin, English actor and filmmaker",
      pages: [makePage("Charlie_Chaplin")],
    };
    const result = toPerson(entry);

    expect(result.name).toBe("Charlie Chaplin");
    expect(result.role).toBe("English actor and filmmaker");
    expect(result.year).toBe("1889");
    expect(result.wikiTitle).toBe("Charlie_Chaplin");
  });

  it("uses full text as name when no comma present", () => {
    const entry = { year: 1452, text: "Leonardo da Vinci", pages: [makePage("Leonardo_da_Vinci")] };
    const result = toPerson(entry);

    expect(result.name).toBe("Leonardo da Vinci");
    expect(result.role).toBe("");
  });

  it("trims whitespace from name and role", () => {
    const entry = { year: 1900, text: "Ada Lovelace , mathematician", pages: [] };
    const result = toPerson(entry);

    expect(result.name).toBe("Ada Lovelace");
    expect(result.role).toBe("mathematician");
  });
});
