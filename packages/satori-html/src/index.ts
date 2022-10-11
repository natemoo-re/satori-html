import {
  parse,
  html as __html,
  walk,
  ELEMENT_NODE,
  DOCUMENT_NODE,
  TEXT_NODE,
} from "ultrahtml";

const camelize = (ident: string) =>
  ident.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
const cssToObject = (str: string) => {
  let obj: Record<string, string> = {};
  let t = 0;
  let pair = ["", ""];
  let flags: Record<string, number> = {};
  for (const c of str) {
    if (!flags["("] && c === ":") {
      t = 1;
    } else if (c === ";") {
      const [decl = "", value = ""] = pair;
      obj[camelize(decl.trim())] = value.trim();
      t = 0;
      pair = ["", ""];
    } else {
      pair[t] += c;
      switch (c) {
        case "(": {
          flags[c]++;
          break;
        }
        case ")": {
          flags["("]--;
          break;
        }
      }
    }
  }
  const [decl = "", value = ""] = pair;
  if (decl.trim() && value.trim()) {
    obj[camelize(decl.trim())] = value.trim();
  }

  return obj;
};

interface VNode {
  type: string;
  props: {
    style?: Record<string, any>;
    children?: string | VNode | VNode[];
    [prop: string]: any;
  };
}
export async function html(
  templates: string | TemplateStringsArray,
  ...expressions: any[]
): Promise<VNode> {
  const result = __html.call(null, templates, ...expressions);
  const doc = parse(result.value.trim());

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
  await walk(doc, (node, parent, index) => {
    let newNode: any = {};
    if (node.type === DOCUMENT_NODE) {
      nodeMap.set(node, root);
    } else if (node.type === ELEMENT_NODE) {
      newNode.type = node.name;
      const { style, "": _, ...props } = node.attributes;
      if (typeof style === "string") {
        props["style"] = cssToObject(style);
      }
      props.children = [];
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
}
