var Package = require('dgeni').Package;

// Define the `base` package
module.exports = new Package('base')

// A set of pseudo processors that act as markers to help position real processors at the right
// place in the pipeline
.processor({ name: 'reading-files' })
.processor({ name: 'files-read', $runAfter: ['reading-files'] })
.processor({ name: 'processing-docs', $runAfter: ['files-read'] })
.processor({ name: 'docs-processed', $runAfter: ['processing-docs'] })
.processor({ name: 'adding-extra-docs', $runAfter: ['docs-processed'] })
.processor({ name: 'extra-docs-added', $runAfter: ['adding-extra-docs'] })
.processor({ name: 'rendering-docs', $runAfter: ['extra-docs-added'] })
.processor({ name: 'docs-rendered', $runAfter: ['rendering-docs'] })
.processor({ name: 'writing-files', $runAfter: ['docs-rendered'] })
.processor({ name: 'files-written', $runAfter: ['writing-files'] })

// Real processors for this package
.processor(require('./processors/read-files'))
.processor(require('./processors/render-docs'))
.processor(require('./processors/unescape-comments'))
.processor(require('./processors/write-files'))
.processor(require('./processors/debugDumpProcessor'))

// Helper services
.factory(require('./services/templateFinder'))
.factory(require('./services/encodeCodeBlock'))
.factory(require('./services/trimIndentation'))
.factory(require('./services/createDocMessage'));
