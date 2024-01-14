import {
  parse,
  html as __html,
  walkSync,
  ELEMENT_NODE,
  DOCUMENT_NODE,
  TEXT_NODE,
  DoctypeNode,
} from "ultrahtml";
import inlineCSS from "ultrahtml/transformers/inline";

const TW_NAMES = new Set([
  /[mp](t|b|r|l|x|y)?-/,
  `color-`,
  `flex`,
  `h-`,
  `w-`,
  `min-w-`,
  `min-h-`,
  `max-w-`,
  `max-h-`,
  `leading-`,
  `text-`,
  `opacity-`,
  `font-`,
  `aspect-`,
  `tint-`,
  `bg-`,
  `opacity-`,
  `shadow-`,
  `rounded`,
  `top-`,
  `right-`,
  `bottom-`,
  `left-`,
  `inset-`,
  `border`,
  `elevation-`,
  `tracking-`,
  `z-`,
]);
const inliner = inlineCSS({ useObjectSyntax: true });
const tw = (doc: DoctypeNode) => {
  walkSync(doc, (node) => {
    if (node.type !== ELEMENT_NODE) return;
    if (node.attributes.class && !node.attributes.tw) {
      const classNames = node.attributes.class.split(/\s+/);
      let match = false;
      for (const name of TW_NAMES) {
        if (match) break;
        for (const item of classNames) {
          if (match) break;
          if (item.indexOf(":") > -1) {
            match = true;
          } else if (typeof name === "string") {
            match = item.startsWith(name);
          } else {
            match = name.test(item);
          }
        }
      }
      if (match) {
        node.attributes.tw = node.attributes.class;
      }
    }
  });
};
const camelize = (ident: string) =>
  ident.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

interface VNode {
  type: string;
  props: {
    style?: Record<string, any>;
    children?: string | VNode | VNode[];
    [prop: string]: any;
  };
}

export interface SatoriHtmlOptions {
  tailwind?: boolean;
}

export function htmlWithOption(options?: SatoriHtmlOptions) {
  return function html(
    templates: string | TemplateStringsArray,
    ...expressions: any[]
  ): VNode {
    const result = __html.call(null, templates, ...expressions);
    let doc = parse(result.value.trim());
    inliner(doc);

    if (options?.tailwind) {
      tw(doc);
    }

    const nodeMap = new WeakMap();
    let root: VNode = {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        },
        children: [],
      },
    };
    walkSync(doc, (node, parent, index) => {
      let newNode: any = {};
      if (node.type === DOCUMENT_NODE) {
        nodeMap.set(node, root);
      } else if (node.type === ELEMENT_NODE) {
        newNode.type = node.name;
        const { style, "": _, ...props } = node.attributes as any;
        if (typeof style === "object") {
          props["style"] = {};
          for (const [decl, value] of Object.entries(style)) {
            props["style"][camelize(decl)] = value;
          }
        }
        props.children = [] as unknown as string;
        Object.assign(newNode, { props });
        nodeMap.set(node, newNode);
        if (parent) {
          const newParent = nodeMap.get(parent);
          newParent.props.children[index] = newNode;
        }
      } else if (node.type === TEXT_NODE) {
        newNode = node.value.trim();
        if (newNode.trim()) {
          if (parent) {
            const newParent = nodeMap.get(parent);
            if (parent.children.length === 1) {
              newParent.props.children = newNode;
            } else {
              newParent.props.children[index] = newNode;
            }
          }
        }
      }
    });

    return root;
  };
}

export const html = htmlWithOption({ tailwind: true });
