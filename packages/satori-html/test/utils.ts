import { beforeAll, expect } from "vitest";
import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import type { SatoriOptions } from "satori";
import { fileURLToPath } from "node:url";

export function initFonts(callback: (fonts: SatoriOptions["fonts"]) => void) {
  beforeAll(async () => {
    const fontPath = new URL("./assets/Inter-Regular.woff", import.meta.url);
    const fontData = await fs.readFile(fontPath);
    callback([
      {
        name: "Roboto",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ]);
  });
}

export function toImage(svg: string, width: number = 100) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
    font: {
      // As system fallback font
      fontFiles: [
        fileURLToPath(new URL("./assets/Inter-Regular.woff", import.meta.url)),
      ],
      loadSystemFonts: false,
      defaultFontFamily: "Playfair Display",
    },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}

expect.extend({ toMatchImageSnapshot });
