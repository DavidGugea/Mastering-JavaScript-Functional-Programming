const traverseDom = (node, depth = 0) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    for (let i = 0; i < node.children.length; i++) {
        traverseDom(node.children[i], depth + 1);
    }
}

const traverseDom2 = (node, depth = 0) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    Array.from(node.children).forEach(child => traverseDom2(child, depth + 1));
}