# Task Manager Demo

This project is a small front-end demo built with **HTML, CSS, and JavaScript**. It combines three things in one page:

1. A **task manager** with add, edit, delete, and complete actions.
2. An **event propagation demo** showing capturing vs bubbling.
3. A **browser rendering pipeline** explanation for HTML and CSS processing.

---

## 1) Source files

### `index(2).html`
This file defines the page structure:

- A top header with the app title and theme toggle button.
- An input row with:
  - a text input for task title,
  - a category dropdown,
  - an add/update button.
- A task list container.
- An event propagation section with nested boxes:
  - grandparent,
  - parent,
  - child.
- A browser rendering pipeline section showing:
  - HTML → parsing → tokenization → DOM tree,
  - CSS → CSSOM,
  - DOM tree + CSSOM → render tree.

### `script(1).js`
This file provides the interactivity:

- Loads tasks from `localStorage`.
- Renders task cards dynamically.
- Supports:
  - add task,
  - update task,
  - delete task,
  - toggle complete/incomplete.
- Handles dark/light theme switching.
- Implements the event propagation demo:
  - capturing mode,
  - bubbling mode,
  - output log for the order in which events fire.

### `style(2).css`
This file controls the visual design:

- Global reset for spacing and sizing.
- Light and dark theme styles.
- Layout for the header, input row, task cards, event section, and rendering pipeline cards.
- Completed task styling with reduced opacity and strikethrough.
- Button, input, and select styling.
- Nested box styling for capturing/bubbling demo.

---

## 2) How the task manager works

The task manager stores tasks in an array and saves them in `localStorage`, so the data stays even after refreshing the page.

Each task has:

- `title`
- `category`
- `status`

The main workflow is:

1. User types a task.
2. User selects a category.
3. User clicks **Add Task**.
4. The task is added to the array and saved in `localStorage`.
5. The UI re-renders the list.

When editing, the app fills the input fields with the selected task and changes the button text to **Update Task**.

---

## 3) Parsing

**Parsing** is the process of reading raw HTML and converting it into a structure the browser can understand.

In simple words:

- The browser first reads the HTML text.
- It checks whether the structure is valid.
- Then it builds the internal document structure step by step.

Parsing happens before the browser can build the DOM tree.

---

## 4) Tokenization

**Tokenization** is the first part of turning HTML into something the browser can process.

The browser breaks the HTML into small pieces called **tokens**, such as:

- opening tags,
- closing tags,
- attribute names,
- attribute values,
- text content.

Example:

```html
<h1>Task Manager</h1>
```

This gets broken into tokens like:

- start tag: `h1`
- text: `Task Manager`
- end tag: `h1`

Tokenization is needed before parsing can build the DOM.

---

## 5) DOM Tree

**DOM** stands for **Document Object Model**.

After tokenization and parsing, the browser creates the **DOM tree**.

The DOM tree is a hierarchical tree representation of the HTML document. Each element becomes a node in the tree.

For this project, the DOM includes nodes like:

- `main`
- `.top`
- `.input-row`
- `#tasks`
- `.event-propagation`
- `.explanation`

The DOM tree is what JavaScript interacts with when it selects elements using:

```js
document.querySelector(...)
```

---

## 6) CSSOM Tree

**CSSOM** stands for **CSS Object Model**.

The browser reads the CSS file and converts it into a tree-like structure called the CSSOM tree.

It contains:

- selectors,
- declarations,
- computed style rules.

For example, rules like:

```css
.dark {
  background-color: #810B38;
  color: #F1E2D1;
}
```

become part of the CSSOM.

The CSSOM helps the browser know how each DOM element should look.

---

## 7) Render Tree

The **render tree** is created by combining:

- the **DOM tree**
- the **CSSOM tree**

It contains only the elements that need to be displayed on the screen, along with their computed styles.

Not every DOM node appears in the render tree. For example:

- elements with `display: none` are skipped.

The render tree is used for:

- layout,
- painting,
- actual visual output on the screen.

So the browser flow is:

```text
HTML -> Parsing -> Tokenization -> DOM Tree
CSS  -> CSSOM
DOM Tree + CSSOM -> Render Tree -> Layout -> Paint
```

---

## 8) Event Capturing

**Event capturing** is the phase where an event travels **from the window/document down to the target element**.

In this project:

- clicking inside the nested boxes can be observed in capturing mode,
- the event moves from **grandparent → parent → child**.

Capturing is useful when you want parent elements to handle an event **before** the target element processes it.

---

## 9) Event Bubbling

**Event bubbling** is the opposite phase.

After the target element receives the event, it travels **back upward** through its parents.

In this project:

- the event can move from **child → parent → grandparent**.

Bubbling is the default behavior for many DOM events and is widely used in JavaScript applications.

---

## 10) Event Delegation

**Event delegation** is a technique where you attach one event listener to a parent element instead of adding listeners to many child elements.

Why it helps:

- less code,
- better performance,
- works well for dynamically created elements.

In this project, delegation is relevant because the task cards are created dynamically. Instead of attaching separate listeners to every button manually, a parent-level listener can catch events from child elements.

Example idea:

```js
tasksDiv.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // handle action
  }
});
```

---

## 11) What this demo teaches

This project is useful because it shows both:

- **front-end UI logic**
- **browser internals**

You learn how:

- HTML becomes DOM,
- CSS becomes CSSOM,
- DOM + CSSOM become the render tree,
- JavaScript controls the page,
- event capturing and bubbling work,
- event delegation simplifies dynamic UI handling.

---

## 12) Quick summary

- **Parsing**: browser reads and interprets HTML.
- **Tokenization**: HTML is broken into tokens.
- **DOM Tree**: HTML structure becomes a tree.
- **CSSOM Tree**: CSS rules become a tree.
- **Render Tree**: DOM + CSSOM create the visual structure.
- **Event Capturing**: event moves from top to target.
- **Event Bubbling**: event moves from target back to top.
- **Event Delegation**: one parent listener handles child events.

---

## 13) Files in this project

- `index(2).html`
- `script(1).js`
- `style(2).css`

These three files together build the full demo page.
