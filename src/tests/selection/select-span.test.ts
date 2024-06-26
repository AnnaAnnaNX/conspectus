import { assert, describe, it } from "vitest";
import { fragmentFromString, selectSpan } from "@/tests/selection/selection";

describe("selectSpan", () => {
  it("fragmentFromString", () => {
    const stringHTML = `<div>test</div>`;
    const fragment = fragmentFromString(stringHTML);
    const text = fragment.textContent;
    assert.equal(text, "test");
  });

  it("I", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one </span><span class="new">two </span><span class="all">three</span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function
    const spanElement = fragment.querySelector("span");
    if (!spanElement) throw new Error("empty span");
    if (!(spanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectSpan(spanElement, 4, 8, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });

  it("I - select text from the beginning", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="new">one two </span><span class="all">three</span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function
    const spanElement = fragment.querySelector("span");
    if (!spanElement) throw new Error("empty span");
    if (!(spanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectSpan(spanElement, 0, 8, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });

  it("I - select text from the end", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one </span><span class="new">two three</span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function
    const spanElement = fragment.querySelector("span");
    if (!spanElement) throw new Error("empty span");
    if (!(spanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectSpan(spanElement, 4, 13, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });
});
