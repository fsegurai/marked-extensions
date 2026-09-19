// Imports the aggregated local extension styles (see ../../styles/extensions.css).
// The vite.config manualChunks rule isolates this module so its CSS is emitted as
// a dedicated, predictable asset (dist/assets/extensions-<hash>.css) rather than
// merged into the shared markdown chunk. HMR on the package styles still works.
import '../../styles/extensions.css';
