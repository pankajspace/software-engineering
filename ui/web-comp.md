[UI](ui-quick.md)

# Web Components: A Detailed Explanation with Examples

Web Components are a set of web platform APIs that allow developers to create custom, reusable, encapsulated HTML elements. These custom elements can be used across web projects regardless of the framework or library you're using (like React, Angular, Vue, etc.), making them highly versatile and reusable. Web Components consist of several core technologies that enable this behavior.

## Core Technologies of Web Components

1. Custom Elements: Define new HTML elements.
2. Shadow DOM: Encapsulates the internal structure of an element, ensuring that styles and markup do not leak out or get affected by external styles.
3. HTML Templates: Define reusable pieces of HTML that can be stamped out at runtime.
4. ES Modules: Enable the use of JavaScript modules to structure and encapsulate functionality in a clean way.

Let’s break down each one in more detail with examples.

---

## 1. Custom Elements

Custom Elements allow you to define new HTML tags or extend existing ones. This feature provides the foundation for creating Web Components.

### Example: Defining a Simple Custom Element

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Element Example</title>
</head>
<body>

  <my-element></my-element>

  <script>
    class MyElement extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = '<p>Hello, I am a custom element!</p>';
      }
    }

    // Define the new element
    customElements.define('my-element', MyElement);
  </script>
</body>
</html>
```

---

## 2. Shadow DOM

The Shadow DOM provides encapsulation to your element’s internal DOM structure. This means the styles and markup inside a shadow DOM are scoped to the element, and won't affect or be affected by the external document.

### Example: Shadow DOM

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shadow DOM Example</title>
</head>
<body>

  <shadow-element></shadow-element>

  <script>
    class ShadowElement extends HTMLElement {
      constructor() {
        super();
        // Attach a shadow DOM to the element
        const shadow = this.attachShadow({ mode: 'open' });

        // Create some HTML and style within the shadow DOM
        shadow.innerHTML = `
          <style>
            p {
              color: red;
              font-weight: bold;
            }
          </style>
          <p>This is inside Shadow DOM!</p>
        `;
      }
    }

    customElements.define('shadow-element', ShadowElement);
  </script>

  <p>This is outside the Shadow DOM and won't be affected by the styles in the shadow DOM.</p>

</body>
</html>
```

---

## 3. HTML Templates

HTML Templates allow you to define reusable HTML fragments that are inert (i.e., not rendered) until they are explicitly added to the DOM. This is useful for Web Components because it allows you to define complex structures that can be cloned and reused multiple times.

### Example: HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Template Example</title>
</head>
<body>

  <template id="my-template">
    <style>
      p {
        color: blue;
      }
    </style>
    <p>This is a template content!</p>
  </template>

  <template-element></template-element>

  <script>
    class TemplateElement extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        // Grab the template content
        const template = document.getElementById('my-template');
        const content = template.content.cloneNode(true);
        
        // Attach the template content to the shadow DOM
        shadow.appendChild(content);
      }
    }

    customElements.define('template-element', TemplateElement);
  </script>

</body>
</html>
```

---

## 4. ES Modules

Web Components are often encapsulated in ES Modules, which make it easier to organize and reuse code. ES Modules allow you to import and export components across files.

### Example: ES Module Usage

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ES Module Example</title>
  <script type="module" src="my-element.js"></script>
</head>
<body>

  <my-element></my-element>

</body>
</html>
```

my-element.js
```javascript
export class MyElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<p>Hello from ES Module!</p>';
  }
}

// Register the element
customElements.define('my-element', MyElement);
```

---

## Combining All Core Technologies in a Single Example

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete Web Component Example</title>
  <script type="module" src="my-component.js"></script>
</head>
<body>

  <my-component></my-component>

</body>
</html>
```

### my-component.js

```javascript
// Define a reusable template with styles
const template = document.createElement('template');
template.innerHTML = `
  <style>
    p {
      color: green;
      font-size: 1.2em;
    }
    button {
      padding: 10px;
      font-size: 1em;
    }
  </style>
  <div>
    <p>This is a Web Component with Shadow DOM and a Template!</p>
    <button id="toggle-btn">Click Me</button>
    <p id="output"></p>
  </div>
`;

export class MyComponent extends HTMLElement {
  constructor() {
    super();

    // Attach Shadow DOM
    this.attachShadow({ mode: 'open' });

    // Clone the template and attach it to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Accessing elements inside the Shadow DOM
    this.output = this.shadowRoot.querySelector('#output');
    const button = this.shadowRoot.querySelector('#toggle-btn');

    // Add event listener for the button
    button.addEventListener('click', () => {
      this.output.textContent = 'Button Clicked!';
    });
  }
}

// Define the custom element
customElements.define('my-component', MyComponent);
```

---

## Browser Support

Most modern browsers support Web Components natively, but for older browsers, there are polyfills available:
- [Web Components Polyfills](https://github.com/webcomponents/polyfills)

## Benefits of Web Components:
- Encapsulation: The styles and behavior of Web Components are scoped to the element itself, ensuring no conflicts with the global scope or other parts of the application.
- Reusability: You can create components that are portable across different projects and frameworks, making them highly reusable.
- Framework Agnostic: Web Components are not tied to any specific JavaScript framework, which allows you to use them in any front-end stack (React, Angular, Vue, etc.).
- Interoperability: Custom elements can be used just like standard HTML elements, and they work well with other web technologies.

---

## Conclusion

Web Components are a powerful, standard-based approach to building reusable, encapsulated custom elements. With Custom Elements, Shadow DOM, HTML Templates, and ES Modules, you can build highly modular and maintainable web applications that work across frameworks and environments.

# References
1. [Using custom elements MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
2. [Using shadow DOM MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
3. [Using templates and slots MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)

---

[<- README](../README.md)
