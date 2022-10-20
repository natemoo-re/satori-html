import { describe, it, expect } from "vitest";
import { html } from "../src/index";

const wrap = (...children: any[]) => ({
  type: "div",
  props: {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
    children,
  },
});

describe("html", () => {
  it("works as a simple tagged template", async () => {
    const result = html`<div>Hello world</div>`;
    expect(result).toEqual(
      wrap({
        type: "div",
        props: {
          children: "Hello world",
        },
      })
    );
  });

  it("works as a complex tagged template", async () => {
    const result = html`<div>Hello ${"world"}</div>`;
    expect(result).toEqual(
      wrap({
        type: "div",
        props: {
          children: "Hello world",
        },
      })
    );
  });

  it("works as a function", async () => {
    const result = html(`<div>Hello world</div>`);
    expect(result).toEqual(
      wrap({
        type: "div",
        props: {
          children: "Hello world",
        },
      })
    );
  });

  it("should handle basic styles", async () => {
    const result = html`<div style="color: red; border-top: 1px solid green;">
      Hello world
    </div>`;
    expect(result).toEqual(
      wrap({
        type: "div",
        props: {
          style: {
            borderTop: "1px solid green",
            color: "red",
          },
          children: "Hello world",
        },
      })
    );
  });

  it("inlines css", async () => {
    const result = html`<div class="cool">Hello world</div>
      <style>
        .cool {
          color: red;
        }
      </style>`;
    expect(result).toEqual(
      wrap({
        type: "div",
        props: {
          style: {
            color: "red",
          },
          class: "cool",
          children: "Hello world",
        },
      })
    );
  });
});
