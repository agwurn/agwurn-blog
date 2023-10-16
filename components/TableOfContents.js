import remark from "remark";
import reactRenderer from 'remark-react'

function TableOfContents({ markdownContent }) {
  const headings = [];

  remark()
    .use(reactRenderer)
    .processSync(markdownContent, (err, file) => {
      file.children.forEach((child) => {
        if (child.type === 'heading') {
          headings.push({
            level: child.depth,
            title: child.children[0].value,
          })
        }
      })
    })

  return (
    <div className="table-of-contents">
      <h2>TableOfContents</h2>
      <ul>
        {headings.map()}
      </ul>
    </div>
  )
}