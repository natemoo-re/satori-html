import { describe, it, expect } from "vitest";
import { html } from "../src/index";
import { initFonts, toImage } from "./utils";
import satori, { SatoriOptions } from "satori";

describe("svg", () => {
  let fonts: SatoriOptions["fonts"];
  initFonts((f) => {
    fonts = f;
  });

  it("should handle basic html", async () => {
    const result = await satori(await html`<div>Hello world</div>`, {
      width: 100,
      height: 100,
      fonts,
    });
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });

  it("should handle basic css", async () => {
    const result = await satori(
      await html`<div style="color: red">Hello world</div>`,
      {
        width: 100,
        height: 100,
        fonts,
      }
    );
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });
});
