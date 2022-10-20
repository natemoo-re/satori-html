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
    const result = await satori(html`<div>Hello world</div>`, {
      width: 100,
      height: 100,
      fonts,
    });
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });

  it("should handle basic css", async () => {
    const result = await satori(
      html`<div style="color: red">Hello world</div>`,
      {
        width: 100,
        height: 100,
        fonts,
      }
    );
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });

  it("should handle style", async () => {
    const result = await satori(
      html`<div>Hello world</div>
        <style>
          div {
            color: red;
          }
        </style>`,
      {
        width: 100,
        height: 100,
        fonts,
      }
    );
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });

  it("should handle tailwind", async () => {
    const result = await satori(
      html`<div class="bg-gray-50 flex">
        <div
          class="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8"
        >
          <h2
            class="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left"
          >
            <span>Ready to dive in?</span>
            <span class="text-indigo-600">Start your free trial today.</span>
          </h2>
          <div class="mt-8 flex md:mt-0">
            <div class="flex rounded-md shadow">
              <a
                href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                >Get started</a
              >
            </div>
            <div class="ml-3 flex rounded-md shadow">
              <a
                href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                >Learn more</a
              >
            </div>
          </div>
        </div>
      </div> `,
      {
        width: 800,
        height: 150,
        fonts,
      }
    );
    expect(toImage(result, 100)).toMatchImageSnapshot();
  });
});
